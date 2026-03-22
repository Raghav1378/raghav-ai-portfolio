import { motion } from 'framer-motion';

const Stats = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Oversized "05" in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[18rem] md:text-[24rem] font-extrabold text-gray-50 select-none leading-none">05</span>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-20 text-center"
        >
          Impact in Numbers
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-7xl font-black text-blue-600 drop-shadow-lg">
              5+
            </p>
            <p className="text-xl font-bold text-gray-800 tracking-wide">
              AI Projects Built
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-7xl font-black text-blue-600 drop-shadow-lg">
              10+
            </p>
            <p className="text-xl font-bold text-gray-800 tracking-wide">
              Technologies Mastered
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-7xl font-black text-blue-600 drop-shadow-lg">
              3+
            </p>
            <p className="text-xl font-bold text-gray-800 tracking-wide">
              AI Systems Deployed
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
