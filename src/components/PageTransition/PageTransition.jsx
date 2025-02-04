import { motion } from 'framer-motion';

const PageTransition = () => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{
        y: ["100%", "0%", "0%", "-100%"],
      }}
      transition={{
        duration: 2.5,
        times: [0, 0.3, 0.7, 1],
        ease: [0.645, 0.045, 0.355, 1]
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        zIndex: 9999,
        border: '40px solid rgba(40, 40, 40, 0.98)',
        boxSizing: 'border-box',
        borderRadius: '60px',  // Increased border radius for external corners
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.3, 0.7, 1]
        }}
        style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '30px',
          boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.3)' // Brightened inner glow
        }}
      />
      
      <motion.img
        src="/jpg_to_png-removebg-preview.png"
        alt="FM MECA"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.2, 1.2, 0.5]
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut"
        }}
        style={{
          width: '180px',  // Increased size
          height: 'auto',
          filter: `
            brightness(1.8)
            contrast(1.2)
            drop-shadow(0 0 25px rgb(250,128,114))
            drop-shadow(0 0 45px rgb(220,20,60))
            drop-shadow(0 0 65px rgb(139,0,0))
          `,
          animation: 'goldPulse 1.5s infinite alternate',  // Faster pulse
          zIndex: 1  // Ensure logo stays above effects
        }}
      />
    </motion.div>
  );
};

export default PageTransition;
