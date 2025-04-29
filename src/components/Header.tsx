
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Animation for navbar items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  // Enhanced button hover animation
  const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-white py-4 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="/lovable-uploads/53c146e4-f9c5-4ca9-8078-3ffa83f940b7.png" alt="WealthWhiz Logo" className="h-12" />
          </motion.div>
          <span className="text-xl font-bold text-finance-primary group-hover:text-finance-secondary transition-colors duration-300">WealthWhiz</span>
        </Link>
        
        {/* Mobile menu button */}
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={buttonHoverVariants}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </motion.div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <motion.div variants={navItemVariants} initial="hidden" animate="visible">
            <Link 
              to="/dashboard" 
              className={`text-finance-dark hover:text-finance-secondary font-medium transition-colors duration-300 border-b-2 ${isActive('/dashboard') ? 'border-finance-primary' : 'border-transparent'}`}
            >
              Dashboard
            </Link>
          </motion.div>

          <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <Link 
              to="/calculator" 
              className={`text-finance-dark hover:text-finance-secondary font-medium transition-colors duration-300 border-b-2 ${isActive('/calculator') ? 'border-finance-primary' : 'border-transparent'}`}
            >
              Calculator
            </Link>
          </motion.div>

          <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <Link 
              to="/education" 
              className={`text-finance-dark hover:text-finance-secondary font-medium transition-colors duration-300 border-b-2 ${isActive('/education') ? 'border-finance-primary' : 'border-transparent'}`}
            >
              Education
            </Link>
          </motion.div>

          <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <Link 
              to="/resources" 
              className={`text-finance-dark hover:text-finance-secondary font-medium transition-colors duration-300 border-b-2 ${isActive('/resources') ? 'border-finance-primary' : 'border-transparent'}`}
            >
              Resources
            </Link>
          </motion.div>

          <motion.div 
            variants={navItemVariants} 
            initial="hidden" 
            animate="visible" 
            transition={{ delay: 0.4 }}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div variants={buttonHoverVariants}>
              <Button 
                variant="default" 
                className="bg-finance-primary hover:bg-finance-secondary transition-all duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </nav>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b z-50 md:hidden">
            <div className="container px-4 py-3 mx-auto flex flex-col space-y-3">
              <Link 
                to="/dashboard" 
                className={`text-finance-dark hover:text-finance-secondary py-2 font-medium ${isActive('/dashboard') ? 'text-finance-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/calculator" 
                className={`text-finance-dark hover:text-finance-secondary py-2 font-medium ${isActive('/calculator') ? 'text-finance-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                to="/education" 
                className={`text-finance-dark hover:text-finance-secondary py-2 font-medium ${isActive('/education') ? 'text-finance-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </Link>
              <Link 
                to="/resources" 
                className={`text-finance-dark hover:text-finance-secondary py-2 font-medium ${isActive('/resources') ? 'text-finance-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="default" 
                  className="bg-finance-primary hover:bg-finance-secondary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
