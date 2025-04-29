
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [hasVisited, setHasVisited] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation(); // This ensures we're within Router context

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisitedBefore');
    if (visited) {
      setHasVisited(true);
      setShowSplash(false);
    } else {
      // Set the flag for future visits
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    // Hide splash screen after animation completes
    if (!visited) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Launch animation splash screen */}
      <AnimatePresence>
        {showSplash && !hasVisited && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0a1929] z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.4, 1],
                  repeat: 0
                }}
                className="flex flex-col items-center"
              >
                <img 
                  src="/lovable-uploads/53c146e4-f9c5-4ca9-8078-3ffa83f940b7.png" 
                  alt="WealthWhiz Logo" 
                  className="w-40 h-auto mb-4"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-white text-3xl font-bold mt-4"
              >
                WealthWhiz
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="text-white mt-2"
              >
                Your Financial Freedom Partner
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
