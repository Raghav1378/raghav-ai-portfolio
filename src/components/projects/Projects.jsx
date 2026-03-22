import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      index: 0,
      year: '2025',
      title: 'ArthMitra (AI Financial)',
      description: 'ArthMitra is an AI-powered financial security platform built on a multi-agent LangGraph system with RAG over RBI documents. It combines anomaly detection, NLP-based scam classification, and UPI transaction intelligence into one production-ready system.',
      tech: ['Python', 'FastAPI', 'React', 'MongoDB', 'NLP', 'AI APIs'],
      github: 'https://github.com/Raghav1378/Arthmitra'
    },
    {
      index: 1,
      year: '2026',
      title: 'Legal Research AI Engine',
      description: 'A next-generation structured research engine for legal professionals. Built with agentic precision, a 7-stage deterministic multi-agent pipeline, and specialized Hallucination Guards to ensure flawless, deterministic accuracy.',
      tech: ['Python', 'FastAPI', 'Groq Llama 3', 'RAG Engine', 'Agentic AI', 'MCP'],
      github: 'https://github.com/Raghav1378/Legal-AI'
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


      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-16 text-center"
        >
          Featured Projects<span className="text-blue-600">.</span>
        </motion.h2>

        {/* Responsive Grid Container (Balanced for 2 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map(project => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
