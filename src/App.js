import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import PageTransition from './components/PageTransition/PageTransition';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from './Model';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [setCurrentSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  useEffect(() => {
    const handleLoad = async () => {
      // Increase loading time to 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      setIsLoading(false);
      
      // Wait for loading screen transition
      setTimeout(() => {
        setShowContent(true);
      }, 800);
    };

    handleLoad();
    
    const handleScroll = () => {
      if (!isManualNavigation) {  // Only update scroll state if not manually navigating
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualNavigation]);

  const handleSectionChange = async (sectionId) => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setIsManualNavigation(true);
    setIsTransitioning(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200)); // Increased wait time
    setCurrentSection(sectionId.replace('#', ''));
    
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
    
    await new Promise(resolve => setTimeout(resolve, 1300)); // Increased wait time
    setIsTransitioning(false);
    
    // Reset manual navigation flag after a short delay
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 100);
  };

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      
      <AnimatePresence>
        {isTransitioning && <PageTransition />}
        
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Cursor />
            <motion.div
              className={`navbar ${isScrolled ? 'scrolled' : ''}`}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Navbar onNavigate={handleSectionChange} />
            </motion.div>

            <main>
              <section id="home">
                <Hero />
              </section>
              <div style={{ 
                width: '100vw', 
                height: '100vh',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <div style={{ width: '50%', height: '100%' }}>
                  <Canvas
                    camera={{ position: [5, 5, 5], fov: 45 }}
                    style={{ background: '#000000' }}
                  >
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.7} />
                      <pointLight position={[10, 10, 10]} intensity={1.5} />
                      <Model 
                        scale={[0.2, 0.2, 0.2]}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                      />
                      <OrbitControls 
                        autoRotate
                        enableZoom={true}
                        enablePan={true}
                        minDistance={2}
                        maxDistance={10}
                      />
                      <Environment preset="sunset" />
                      <gridHelper args={[10, 10]} />
                    </Suspense>
                  </Canvas>
                </div>
              </div>

              <section id="services">
                <Services />
              </section>
              
              <section id="testimonials">
                <Testimonials />
              </section>
              
              <section id="contact">
                <Contact />
              </section>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;