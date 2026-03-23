import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen
          ? 'top-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[70%] max-w-6xl bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-200/50 rounded-3xl md:rounded-full py-3 px-6'
          : 'top-0 w-full bg-transparent py-8 px-6 sm:px-12'
          }`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo Section */}
          <motion.a
            href="#home"
            className="relative flex items-center justify-center w-10 h-10 group cursor-pointer"
          >
            <div className="absolute inset-0 border-[2px] border-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            <div className="absolute inset-0 border-[2px] border-transparent border-t-blue-600 border-l-blue-400 rounded-xl opacity-0 group-hover:opacity-100 group-hover:rotate-180 group-hover:scale-[1.3] transition-all duration-700" />
            <img 
              src="/favicon.png" 
              alt="Raghav Ramani Logo" 
              className="w-full h-full object-contain rounded-lg p-1 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10" 
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 font-semibold text-[14px]">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 rounded-full transition-colors duration-300 group text-gray-600 hover:text-blue-600"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-blue-50/80"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <motion.a
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              href="https://res.cloudinary.com/duobzi17g/raw/upload/v1774266194/resumes/k9a2wixeoemspqmho0q7.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all border-2 border-blue-500/30 hover:border-blue-500 bg-blue-50/50 text-blue-600 flex items-center gap-2 group"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              
              <svg 
                className="w-4 h-4" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </motion.a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all bg-gray-900 text-white hover:bg-blue-600 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)]"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-900 rounded-full"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-gray-900 rounded-full"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-900 rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden pt-8 pb-4 flex flex-col space-y-4"
            >
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors px-2"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={itemVariants} className="pt-4 flex flex-col space-y-3">
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href="https://res.cloudinary.com/duobzi17g/raw/upload/v1774266194/resumes/k9a2wixeoemspqmho0q7.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 border-2 border-blue-500/30 text-blue-600 bg-blue-50/30 font-bold rounded-2xl hover:border-blue-600 active:bg-blue-100 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </motion.a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600"
                >
                  Let's Talk
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[90] md:hidden bg-white/20 backdrop-blur-md"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
