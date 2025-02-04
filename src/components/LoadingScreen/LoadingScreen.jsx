import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ y: 0 }}
      animate={{ 
        y: isLoading ? 0 : '-100vh',
        position: isLoading ? 'fixed' : 'absolute'
      }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <motion.div 
        className="loading-content"
        animate={{
          scale: isLoading ? 1 : 0.5,
          y: isLoading ? 0 : -50
        }}
        transition={{ duration: 0.6 }}
      >
        <motion.img 
          src="/jpg_to_png-removebg-preview.png" 
          alt="FM MECA"
          className="loading-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
