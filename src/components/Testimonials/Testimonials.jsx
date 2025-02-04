import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Very professional designer, he knows what the clients need and manage to satisfy the client in a very professional manners and a great quality of work",
    name: "Abdullah A.",
    location: "Dammam, Saudi Arabia",
    project: "Project: 3D design of a machine",
    stars: 5
  },
  {
    quote: "Excellant job with assisting in creating electrical assembly drawings. I look forward to working with him again soon",
    name: "Eric N.",
    location: "Merl West Coast, USA",
    project: "Project: Surface layout optimisation (Engineering)",
    stars: 5
  },
  {
    quote: "Very skilled and super responsive. We enjoyed working with him a lot and will hire him again in the future. Thank you.",
    name: "Stefan N.",
    location: "Neufeld, Germany",
    project: "Project: Technical documents assistance",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <motion.section 
      className="testimonials-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="testimonials-title"
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Here's what our customers say
      </motion.h2>

      <div className="testimonials-scroll-container">
        <div className="testimonials-gradient-left"></div>
        <div className="testimonials-container">
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${index}`}
                className="testimonials-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
              >
                <motion.div 
                  className="testimonials-stars"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="testimonials-star"
                      style={{ '--i': i }} // Add this line for star animation delay
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>

                <motion.p 
                  className="testimonials-quote"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonial.quote}"
                </motion.p>

                <div className="testimonials-footer">
                  <motion.div 
                    className="testimonials-client-info"
                    whileHover={{ color: "var(--accent-color)" }}
                  >
                    <h3 className="testimonials-client-name">{testimonial.name}</h3>
                    <p className="testimonials-client-location">{testimonial.location}</p>
                  </motion.div>
                  <motion.p 
                    className="testimonials-project"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.project}
                  </motion.p>
                </div>
              </motion.div>
            ))}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`second-${index}`}
                className="testimonials-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
              >
                <motion.div 
                  className="testimonials-stars"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="testimonials-star"
                      style={{ '--i': i }} // Add this line for star animation delay
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>

                <motion.p 
                  className="testimonials-quote"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonial.quote}"
                </motion.p>

                <div className="testimonials-footer">
                  <motion.div 
                    className="testimonials-client-info"
                    whileHover={{ color: "var(--accent-color)" }}
                  >
                    <h3 className="testimonials-client-name">{testimonial.name}</h3>
                    <p className="testimonials-client-location">{testimonial.location}</p>
                  </motion.div>
                  <motion.p 
                    className="testimonials-project"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.project}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="testimonials-gradient-right"></div>
      </div>
    </motion.section>
  );
};

export default Testimonials;