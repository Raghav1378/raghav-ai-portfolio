import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative py-20 bg-white overflow-hidden"
    >


      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Text content */}
          <div className="space-y-6 relative z-10">
            {/* Subtle background glow behind text */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8"
            >
              Who I Am<span className="text-blue-600">.</span>
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-light"
            >
              I’m a 22-year-old engineering student from Jaipur who builds <strong className="font-bold text-gray-900">end-to-end AI systems</strong> that actually ship.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-light"
            >
              I work across the full stack backend infrastructure, agentic pipelines, vector databases, frontend interfaces  because I believe the only honest way to build AI products is to <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">own every layer</span>.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-light"
            >
              I don't theorize my way into understanding. I build through the walls until something real comes out the other side.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontSize: '1.2em',
                fontStyle: 'italic',
                borderLeft: '4px solid #2563eb',
                paddingLeft: '1.5rem',
                color: '#384152',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                marginTop: '1.5rem'
              }}
            >
              "I don't wait until I'm ready. I build until I understand."
            </motion.p>
          </div>

          {/* Right side: 3D Flip Card Profile Photo (Floating) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full flex justify-center lg:justify-end xl:pr-10"
          >
            {/* Perpetual Floating Animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] group [perspective:1000px]"
            >
              {/* Spinning Decorative Outer Ring */}
              <div className="absolute inset-[-15px] border-[2px] border-dashed border-blue-400/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-25px] border-[1px] border-solid border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

              {/* The Flipping Container */}
              <div className="w-full h-full relative transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-full cursor-pointer z-10">

                {/* Front side (Your Photo) */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-full overflow-hidden border-[8px] border-white bg-gray-100">
                  <img
                    src="/profile.jpeg"
                    alt="Raghav Ramani"
                    className="w-full h-full object-cover object-[center_top] transform scale-105"
                  />
                  {/* Minimalist Hover Hint */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500 rounded-full" />
                </div>

                {/* Back side (Information) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full overflow-hidden border-[6px] border-gray-900 bg-gray-900 flex flex-col items-center justify-center p-8 text-center text-white shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                  <h3 className="text-3xl md:text-4xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Raghav</h3>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-300 tracking-tight">Ramani</h3>

                  <p className="text-xs md:text-sm text-blue-400 font-bold mb-6 uppercase tracking-[0.2em] px-4 py-2 border border-blue-500/30 rounded-full bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    Full Stack AI Engineer
                  </p>

                  <div className="space-y-3 text-sm text-gray-300 w-3/4 mb-6">
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                      <span className="text-gray-500 uppercase text-[10px] tracking-widest">Location</span>
                      <span className="font-bold text-gray-200">India</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                      <span className="text-gray-500 uppercase text-[10px] tracking-widest">Focus</span>
                      <span className="font-bold text-blue-400">Fullstack & Agents</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700/50 pb-2">
                      <span className="text-gray-500 uppercase text-[10px] tracking-widest">Status</span>
                      <span className="font-bold text-green-400">Open to Opportunities</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="w-3/4 py-3 bg-blue-600 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Let's Connect
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
