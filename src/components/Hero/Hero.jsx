import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiSettings, FiBox, FiFileText, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), {
    stiffness: 100,
    damping: 30
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section className="hero">
      <motion.div 
        className="parallax-bg"
        style={{ y: backgroundY }}
      />
      
      <motion.div 
        className="content-wrapper"
        style={{ y: contentY }}
      >
        <div className="hero-content">
          <motion.div 
            className="hero-text-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="typing-container">
                <span className="typing-text">Engineering the</span>
              </div>
              <br />
              <div className="typing-container">
                <span className="typing-text delay-1">Future of</span>
              </div>
              <br />
              <div className="typing-container">
                <span className="typing-text delay-2">Innovation</span>
              </div>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We combine precision engineering with innovative design to create solutions 
              that define the next generation of mechanical excellence.
            </motion.p>

            <motion.button
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="button-content">
                <span className="button-text">Get Started</span>
                <span className="circle-arrow">
                  <FiArrowRight />
                </span>
              </span>
              <span className="button-gradient" />
              <span className="hover-effect" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="services-preview"
            style={{ y }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { 
                icon: <FiSettings />, 
                title: "Mechanical Design", 
                desc: "Precision in every detail" 
              },
              { 
                icon: <FiBox />, 
                title: "Systems Engineering", 
                desc: "Integrated solutions" 
              },
              { 
                icon: <FiFileText />, 
                title: "Technical Innovation", 
                desc: "Future-focused development" 
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="service-preview-card hover-line"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.8, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <span className="service-icon">{service.icon}</span>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;