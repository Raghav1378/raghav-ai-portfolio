import { motion } from 'framer-motion';

const Blog = () => {
  const posts = [
    {
      title: 'How I Built an AI Financial Assistant',
      excerpt: 'A deep dive into creating ArthMitra, from concept to deployment, including the AI models, security features, and user experience design.',
      date: 'Mar 15, 2026'
    },
    {
      title: 'Integrating Machine Learning into Web Apps',
      excerpt: 'Best practices and lessons learned from embedding ML models into full-stack applications using FastAPI and React.',
      date: 'Feb 20, 2026'
    },
    {
      title: 'FastAPI for AI Product Development',
      excerpt: 'Why FastAPI is the ideal backend for AI products, with examples of async endpoints, dependency injection, and automatic docs.',
      date: 'Jan 10, 2026'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Oversized "06" in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[18rem] md:text-[24rem] font-extrabold text-gray-50 select-none leading-none">06</span>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center"
        >
          Articles
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md p-8 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer hover:border-blue-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm mt-auto">
                <span className="text-gray-500 font-medium tracking-wide">📅 {post.date}</span>
                <span className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                  Read <span>&rarr;</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
