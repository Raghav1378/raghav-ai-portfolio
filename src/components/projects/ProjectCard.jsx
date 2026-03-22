import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: project.index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group bg-white border border-gray-100 rounded-[2rem] shadow-lg hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] hover:border-blue-200 transition-all duration-500 flex flex-col overflow-hidden relative"
    >
      {/* Blooming Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08), transparent 70%)' }}
      ></div>

      <div className="p-8 flex flex-col flex-1 relative z-10 bg-white/40 backdrop-blur-sm">
        {/* Accent hover gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
        
        {/* Year badge */}
        <span className="inline-flex items-center px-4 py-1.5 text-xs font-bold tracking-wide bg-blue-100 text-blue-700 rounded-full mb-6 self-start transform group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {project.year}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 relative z-10">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-1 relative z-10">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 group-hover:border-blue-100 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto relative z-10">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-blue-500/30"
          >
            GitHub
          </motion.a>
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
