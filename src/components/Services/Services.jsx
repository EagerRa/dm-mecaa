import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import "./Services.css"

const services = [
  {
    title: "Quantum Machinery Solutions",
    description:
      "Revolutionize your industry with our cutting-edge quantum-enhanced machinery. Our bespoke solutions redefine the boundaries of efficiency and precision in manufacturing.",
    image: "https://i.pinimg.com/736x/fb/d5/f3/fbd5f3edfbd3bf9c5c3c0224bb095e4e.jpg",
  },
  {
    title: "Nano-Engineering Innovations",
    description:
      "Harness the power of nanotechnology in product design. Our advanced engineering techniques create microscopic marvels that drive macroscopic changes in performance and capability.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "AI-Powered Document Ecosystem",
    description:
      "Experience the future of documentation with our AI-driven management system. Seamlessly integrate, analyze, and optimize your manufacturing data for unparalleled insights and efficiency.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const TypeWriter = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, delay);

      return () => clearInterval(interval);
    }
  }, [text, delay, isTyping]);

  return (
    <span onMouseEnter={() => setIsTyping(true)}>{displayText || text}</span>
  );
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    rotateX: -10,
    filter: 'blur(10px)'
  },
  visible: index => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: index * 0.2,
      duration: 0.8,
    }
  })
};

const Services = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="services" ref={ref}>
      <div className="services-content">
        <motion.h2
          className="services-title"
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.2,
                ease: "easeOut"
              }
            }
          }}
        >
          Pioneering the Future
        </motion.h2>
        <div className="services-list">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-item"
            >
              <motion.div 
                className="service-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ margin: "-100px" }}
              >
                <motion.h3 
                  className="service-card-title"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TypeWriter text={service.title} />
                </motion.h3>
                <motion.p 
                  className="service-card-description"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.description}
                </motion.p>
                <motion.button
                  className="service-button"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.4, 0.25, 1]
                    }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    y: 1,
                    transition: {
                      duration: 0.1
                    }
                  }}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                >
                  Explore Innovation
                </motion.button>
              </motion.div>
              <motion.div
                className="service-image"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                custom={index}
                viewport={{ margin: "-100px" }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={service.image || "/placeholder.svg"} alt={service.title} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

