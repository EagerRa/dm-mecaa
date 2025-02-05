import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import './Contact.css';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formFields = [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email Address', type: 'email', pattern: /^\S+@\S+$/i },
        { name: 'message', label: 'Your Message', type: 'textarea' }
    ];

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5001/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Message sent to JSON Server successfully!');
                alert('Your message has been sent!');
            } else {
                console.error('Failed to send message:', response.statusText);
                alert('Failed to send your message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    const renderFormField = (field, index) => {
        const isTextarea = field.type === 'textarea';
        const Component = isTextarea ? 'textarea' : 'input';
        const delay = index * 0.1 + 0.2;

        return (
            <motion.div
                className={`form-group ${index < 2 ? 'dual-inputs' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                    duration: 0.6,
                    delay,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
                key={field.name}
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        duration: 0.4,
                        delay: delay + 0.2,
                        type: "spring",
                        stiffness: 200
                    }}
                >
                    <Component
                        {...register(field.name, {
                            required: true,
                            pattern: field.pattern
                        })}
                        placeholder=" "
                        type={field.type}
                        className={`form-input ${isTextarea ? 'textarea' : ''} ${errors[field.name] ? 'error' : ''}`}
                        rows={isTextarea ? "5" : undefined}
                    />
                    <label className="form-label">{field.label}</label>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <motion.section
            className="contact section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
        >
            <motion.div
                className="contact-container"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ y: -50 }}
                    whileInView={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    Let's Create Together
                </motion.h2>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                    {formFields.map((field, index) => renderFormField(field, index))}

                    <motion.button
                        type="submit"
                        className="submit-button"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                        }}
                        whileHover={{
                            scale: 1.02,
                            letterSpacing: "5px",
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        animate={{
                            boxShadow: [
                                "0 15px 35px -5px rgba(0, 0, 0, 0.5)",
                                "0 20px 40px -5px rgba(0, 0, 0, 0.6)",
                                "0 15px 35px -5px rgba(0, 0, 0, 0.5)"
                            ],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                    >
                        <motion.div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px"
                            }}
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Send Message
                            </motion.span>
                            <motion.span
                                animate={{
                                    x: [0, 5, 0],
                                    opacity: [1, 0.6, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                                style={{ fontSize: "1.2rem" }}
                            >
                                ›
                            </motion.span>
                        </motion.div>
                    </motion.button>
                </form>
            </motion.div>
        </motion.section>
    );
};

export default Contact;
