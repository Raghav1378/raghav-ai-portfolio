import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const items = [
  {
    status: 'ACTIVE',
    label: 'Legal Research AI Engine',
    sub: '7-stage agentic pipeline · ingesting 74 years of Supreme Court data',
  },
  {
    status: 'WORK',
    label: 'AI/ML Intern @ AASVAA Innovation Labs',
    sub: 'Production AI systems · FastAPI + Qdrant + React',
  },
  {
    status: 'LEARNING',
    label: 'Full Stack Expansion — React + Node.js',
    sub: 'Building toward complete AI product ownership',
  },
];

const statusConfig = {
  ACTIVE: {
    dotClass: 'cb-dot-active',
    color: '#22c55e',
    borderColor: '#22c55e',
    label: 'ACTIVE',
    labelColor: '#22c55e',
  },
  WORK: {
    dotClass: 'cb-dot-work',
    color: '#a855f7',
    borderColor: '#a855f7',
    label: 'WORK',
    labelColor: '#a855f7',
  },
  LEARNING: {
    dotClass: 'cb-dot-learning',
    color: '#3b82f6',
    borderColor: '#3b82f6',
    label: 'LEARNING',
    labelColor: '#3b82f6',
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const titles = ['Building', 'Shipping', 'Learning', 'Innovating', 'Coding'];

const CurrentlyBuilding = () => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const currentWord = titles[wordIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2500); // Wait longer at the end
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : (Math.random() * 100) + 100); // Random typing speed for human feel
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cb-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.8; }
        }
        @keyframes cb-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes cb-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cb-dot-active {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          animation: cb-pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .cb-dot-work {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #a855f7;
          animation: cb-breathe 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .cb-dot-learning {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          background-size: 200% auto;
          animation: cb-shimmer 2s linear infinite;
          flex-shrink: 0;
        }
        .cb-row {
          position: relative;
          overflow: hidden;
        }
        .cb-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--cb-accent);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.2s ease;
          border-radius: 0 2px 2px 0;
        }
        .cb-row:hover::before {
          transform: scaleY(1);
        }
      `}</style>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="relative py-24 bg-white overflow-hidden"
      >


        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section title with blinking cursor */}
          <motion.h2
            variants={rowVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center"
          >
            Currently{' '}
            <span className="text-blue-600 drop-shadow-sm">
              {displayText}
            </span>
            <span
              style={{
                opacity: cursorVisible ? 1 : 0,
                display: 'inline-block',
                marginLeft: '6px',
                color: '#2563eb',
              }}
            >
              ▋
            </span>
          </motion.h2>

          {/* Cards */}
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {items.map((item, index) => {
              const cfg = statusConfig[item.status];
              return (
                <motion.div
                  key={index}
                  variants={rowVariants}
                  className="cb-row"
                  style={{ '--cb-accent': cfg.borderColor }}
                >
                  <div
                    className="flex items-center gap-5 px-6 py-5 rounded-2xl"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Animated dot */}
                    <div className={cfg.dotClass} />

                    {/* Status badge */}
                    <span
                      className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-md shrink-0"
                      style={{
                        color: cfg.labelColor,
                        background: cfg.labelColor + '18',
                        border: `1px solid ${cfg.labelColor}33`,
                      }}
                    >
                      {cfg.label}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-semibold text-base truncate">
                        {item.label}
                      </p>
                      <p className="text-gray-500 text-sm mt-0.5 truncate">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CurrentlyBuilding;
