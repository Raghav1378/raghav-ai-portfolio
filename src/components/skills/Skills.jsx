import { motion } from 'framer-motion';

const Skills = () => {
  const categories = [
    {
      title: 'GENERATIVE AI & AGENTS',
      color: 'bg-blue-500',
      skills: ['LangChain', 'LangGraph', 'MCP', 'RAG Pipelines', 'Prompt Engineering', 'AI Agents', 'LangSmith']
    },
    {
      title: 'ML & DEEP LEARNING',
      color: 'bg-green-500',
      skills: ['Supervised Learning', 'Anomaly Detection', 'Neural Networks', 'Ensemble Methods', 'NLP Pipelines', 'Model Explainability']
    },
    {
      title: 'INFERENCE & APIS',
      color: 'bg-red-500',
      skills: ['Groq API', 'Gemini API', 'Ollama', 'Claude API', 'OpenAI-compatible']
    },
    {
      title: 'BACKEND',
      color: 'bg-purple-500',
      skills: ['FastAPI', 'Python', 'Async Python', 'Qdrant']
    },
    {
      title: 'DATA & NLP',
      color: 'bg-amber-500',
      skills: ['Pandas', 'NumPy', 'Hugging Face', 'Sentence Transformers', 'spaCy', 'NLTK']
    },
    {
      title: 'FRONTEND & TOOLS',
      color: 'bg-cyan-500',
      skills: ['React', 'JavaScript', 'Node.js', 'Git', 'Docker', 'VS Code', 'uv']
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


      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">What I Work With</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900">
            Tech Arsenal<span className="text-blue-600">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="relative group p-[2px] rounded-[26px] overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Spinning Rainbow LED Trail (Hidden by default, shown on hover) */}
              <div
                className="absolute inset-[-150%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-700"
                style={{ background: 'conic-gradient(from 0deg, #FF3366, #FF9933, #33FF99, #33CCFF, #9933FF, #FF3366)' }}
              />

              {/* Inner White Box Layer */}
              <div className="relative h-full bg-white/95 backdrop-blur-md p-8 rounded-[24px] z-10 w-full transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${category.color} shadow-sm flex-shrink-0`} />
                  <h3 className="text-[1.1rem] font-extrabold tracking-wide text-gray-900 uppercase group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05, backgroundColor: '#2563eb', color: '#fff' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                      className="px-4 py-2 bg-gray-50/80 border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-600 transition-colors duration-200 cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
