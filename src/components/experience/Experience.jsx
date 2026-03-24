import { motion } from 'framer-motion';

const Experience = () => {
  const entries = [
    {
      year: 'Present',
      title: 'Legal AI System',
      category: 'Project',
      description: 'Architected a 7-stage deterministic multi-agent pipeline with hallucination guards, Qdrant vector retrieval, and Groq Llama 3 — ingesting 74 years of Indian Supreme Court judgments (1950–2024).',
    },
    {
      year: 'Feb 2026',
      title: 'AI/ML Intern at AASVAA',
      category: 'Internship',
      description: 'Developing production AI systems while expanding into full-stack architecture using React, FastAPI, Node.js, and Qdrant.',
    },
    {
      year: 'Nov 2025',
      title: 'LangChain Academy',
      category: 'Certification',
      description: 'Completed 9 official certifications across LangChain, LangGraph, LangSmith, and advanced agentic architectures.',
    },
    {
      year: 'Aug 2025',
      title: 'AI/ML Intern at Klear AI',
      category: 'Internship',
      description: 'Architected production RAG pipelines, LangGraph workflows, FastAPI microservices, and specialized MCP server integrations.',
    },
    {
      year: 'Jan 2025',
      title: 'ArthMitra AI',
      category: 'Project',
      description: 'Built an AI-powered financial security platform utilizing a multi-agent LangGraph system and financial RAG over RBI documents.',
    },
    {
      year: 'Jun 2024',
      title: 'Advanced GenAI Integration',
      category: 'Milestone',
      description: 'Transitioned deep into the GenAI stack, focusing specifically on LangChain, LangGraph, RAG pipelines, and multi-agent systems.',
    },
    {
      year: 'Nov 2023',
      title: 'GSEA University Winner',
      category: 'Achievement',
      description: 'Built an ML-powered stock market scam detection system using NLP classification. Won the university round of the Global Student Entrepreneur Awards for Suraksha Nivesh.',
    },
    {
      year: 'Aug 2023',
      title: 'Teaching Assistant (Java)',
      category: 'Work',
      description: 'Mentored 100+ students in Java, OOP, and DSA — sharpened core fundamentals while building real teaching and communication skills at Accio Job.',
    },
    {
      year: 'Aug 2022',
      title: 'Foundation in AI & ML',
      category: 'Education',
      description: 'Started B.Tech in CSE (AI & ML) at JECRC University, Jaipur, establishing core ML fundamentals, deep learning, NLP, and MLOps.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative py-24 bg-white overflow-hidden"
    >


      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section heading & Intro */}
        <div className="text-center mb-24 relative z-20">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8"
          >
            Experience Timeline<span className="text-blue-600">.</span>
          </motion.h2>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
              Started with pure ML/AI foundations in <strong className="font-semibold text-gray-900">2022</strong>. 
              Evolved into the agentic AI space, architecting multi-agent systems, complex RAG pipelines, and Model Context Protocol integrations. 
              Currently expanding into Full Stack AI Engineering, combining backend infrastructure, frontend interfaces, and deterministic AI systems. 
              Currently interning at <strong className="font-semibold text-blue-600">AASVAA Innovation Labs</strong> while building production AI models.
            </p>
          </motion.div>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical center line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-blue-200 to-transparent -translate-x-1/2 md:translate-x-0 md:-ml-0.5 rounded-full"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline entries */}
          <div className="space-y-16">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="relative flex flex-col md:flex-row md:items-center group cursor-default"
                >
                  {/* Left card */}
                  {isLeft ? (
                    <>
                      <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-14 text-left md:text-right relative z-10">
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-white border border-gray-100 rounded-[24px] shadow-lg p-8 inline-block w-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] group-hover:border-blue-200"
                        >
                          <div className={`flex items-center gap-3 mb-4 flex-wrap md:justify-end`}>
                            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wide bg-gray-50 text-gray-500 rounded-full transform group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                              {entry.year}
                            </span>
                            <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 rounded-full border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                              {entry.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-wide">{entry.title}</h3>
                          <p className="text-gray-500 font-medium leading-relaxed text-[15px]">{entry.description}</p>
                        </motion.div>
                      </div>
                      {/* Centre dot */}
                      <motion.div 
                         initial={{ scale: 0 }}
                         whileInView={{ scale: 1 }}
                         transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                         viewport={{ once: true }}
                         className="absolute left-6 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 border-[3px] border-white shadow-[0_0_10px_rgba(59,130,246,0.2)] z-20 group-hover:scale-[1.8] group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all duration-300 ease-out" 
                      />
                      <div className="hidden md:block w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block w-1/2" />
                      {/* Centre dot */}
                      <motion.div 
                         initial={{ scale: 0 }}
                         whileInView={{ scale: 1 }}
                         transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                         viewport={{ once: true }}
                         className="absolute left-6 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 border-[3px] border-white shadow-[0_0_10px_rgba(59,130,246,0.2)] z-20 group-hover:scale-[1.8] group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all duration-300 ease-out" 
                      />
                      <div className="w-full md:w-1/2 pl-16 md:pl-14 text-left relative z-10">
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-white border border-gray-100 rounded-[24px] shadow-lg p-8 inline-block w-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] group-hover:border-blue-200"
                        >
                          <div className={`flex items-center gap-3 mb-4 flex-wrap md:justify-start`}>
                            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wide bg-gray-50 text-gray-500 rounded-full transform group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                              {entry.year}
                            </span>
                            <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 rounded-full border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                              {entry.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-wide">{entry.title}</h3>
                          <p className="text-gray-500 font-medium leading-relaxed text-[15px]">{entry.description}</p>
                        </motion.div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
