const express = require('express');
const db = require('../db');  // Adjust the path to your DB connection file
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

const router = express.Router();

// **1. Client Submits a Project Request**
router.post(
    '/projects',
    authenticateToken,
    authorizeRole('client'),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;

        try {
            await db.query(
                'INSERT INTO project_requests (client_id, title, description) VALUES (?, ?, ?)',
                [req.user.id, title, description]
            );

            res.status(201).json({ message: 'Project request submitted successfully' });
        } catch (err) {
            console.error('Error submitting project request:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// **2. Admin Approves or Declines a Project Request**
router.put(
    '/projects/:id/status',
    authenticateToken,
    authorizeRole('admin'),
    [
        body('status').isIn(['approved', 'declined']).withMessage('Invalid status'),
    ],
    async (req, res) => {
        const { status } = req.body;
        const projectId = req.params.id;

        try {
            const [project] = await db.query('SELECT * FROM project_requests WHERE id = ?', [projectId]);
            if (project.length === 0) {
                return res.status(404).json({ error: 'Project request not found' });
            }

            await db.query('UPDATE project_requests SET status = ? WHERE id = ?', [status, projectId]);

            res.json({ message: `Project request ${status}` });
        } catch (err) {
            console.error('Error updating project status:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// **3. Admin Assigns a Project to a Coworker**
router.post(
    '/projects/:id/assign',
    authenticateToken,
    authorizeRole('admin'),
    [
        body('coworker_id').notEmpty().withMessage('Coworker ID is required'),
    ],
    async (req, res) => {
        const { coworker_id } = req.body;
        const projectId = req.params.id;

        try {
            const [project] = await db.query('SELECT * FROM project_requests WHERE id = ?', [projectId]);
            if (project.length === 0 || project[0].status !== 'approved') {
                return res.status(400).json({ error: 'Project must be approved before assignment' });
            }

            await db.query(
                'INSERT INTO project_assignments (project_id, coworker_id) VALUES (?, ?)',
                [projectId, coworker_id]
            );

            res.json({ message: 'Project assigned to coworker successfully' });
        } catch (err) {
            console.error('Error assigning project:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// **4. Coworker Views Assigned Projects**
router.get(
    '/projects/assigned',
    authenticateToken,
    authorizeRole('coworker'),
    async (req, res) => {
        try {
            const [projects] = await db.query(
                `SELECT pr.id, pr.title, pr.description, pr.status, pr.created_at
         FROM project_requests pr
         JOIN project_assignments pa ON pr.id = pa.project_id
         WHERE pa.coworker_id = ?`,
                [req.user.id]
            );

            res.json({ projects });
        } catch (err) {
            console.error('Error fetching assigned projects:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
