import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 60;
    const maxDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: 'rgba(148, 163, 184, 0.4)',
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - distance / maxDistance) * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const marqueeItems = [
    'Machine Learning', 'Full-Stack Systems', 'Generative AI',
    'React & Node.js', 'Python & FastAPI', 'LangChain & LangGraph',
    'Agentic AI', 'RAG Pipelines',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 bg-white overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      <div className="relative z-10 flex flex-col items-center mt-12">
        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex px-4 py-2 rounded-full border border-blue-100 bg-blue-50/50 backdrop-blur-md"
          >
            <span className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">
              AI & Full-Stack Engineer
            </span>
          </motion.div>
        </div>

        <div className="overflow-hidden mb-6 px-4 py-2">
          <motion.h1
            initial={{ y: '110%', rotateZ: 2 }}
            animate={{ y: 0, rotateZ: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-[1]"
          >
            <span className="text-gray-900">Raghav </span>
            <span className="text-blue-600">Ramani</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12 max-w-3xl">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl lg:text-[1.7rem] text-gray-500 font-light leading-relaxed px-4"
          >
            Building end-to-end{' '}
            <span className="text-gray-900 font-medium">intelligent products</span>{' '}
            with rigorous full-stack engineering.
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w-full sm:w-auto overflow-hidden p-2">
          <motion.a
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-3.5 bg-gray-900 text-white text-sm font-bold tracking-wide uppercase rounded-full shadow-lg shadow-gray-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            See My Work
          </motion.a>
          
          <motion.a
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1YcB4F_I7xqimI4zpSYlib6DcAVe6_FwF/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-8 py-3.5 bg-blue-50/50 border-2 border-blue-500/30 text-blue-600 text-sm font-bold tracking-wide uppercase rounded-full hover:border-blue-500 transition-all flex items-center justify-center gap-2 group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            
            <svg 
              className="w-4 h-4" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </motion.a>

          <motion.a
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-3.5 bg-transparent border-2 border-gray-200 text-gray-600 text-sm font-bold tracking-wide uppercase rounded-full hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center"
          >
            Let's Talk
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-gray-400 text-[11px] mb-3 font-bold uppercase tracking-[0.3em]">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ height: ['4px', '12px', '4px'], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Marquee — 2 copies, seamless loop */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-gray-50/80 backdrop-blur-md border-t border-gray-100 py-3 flex z-20">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 md:space-x-16 px-4 md:px-8">
              {marqueeItems.map((item, idx) => (
                <span key={idx} className="flex items-center space-x-8 md:space-x-16">
                  <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                    {item}
                  </span>
                  <span className="text-blue-500 font-black opacity-50">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;