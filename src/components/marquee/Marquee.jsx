import { motion } from 'framer-motion';

const Marquee = () => {
  const mlTech = [
    'Machine Learning', 'Deep Learning', 'LLMs', 'Neural Networks', 
    'Computer Vision', 'NLP', 'Vector Databases', 'PyTorch', 
    'TensorFlow', 'Scikit-Learn', 'Agentic AI', 'RAG Pipelines',
    'Model Optimization', 'Production ML'
  ];

  // Extend for seamless looping
  const extended = [...mlTech, ...mlTech, ...mlTech];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative h-16 bg-white border-y border-gray-100 flex items-center overflow-hidden"
    >
      <div className="animate-marquee flex items-center space-x-12">
        {extended.map((item, index) => (
          <div key={index} className="flex items-center space-x-6 whitespace-nowrap">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-lg font-bold text-gray-800 tracking-tight">
              {item}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Marquee;
