import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Experience from './components/experience/Experience';
import CurrentlyBuilding from './components/currentlybuilding/CurrentlyBuilding';
import Chatbot from './components/chatbot/Chatbot';
import CustomCursor from './components/cursor/CustomCursor';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Highly premium simulated preloader logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600); // Allow the 100% to sit nicely before sliding out
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 3; // Randomly jumps between 3 and 18
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('raghavramani2004@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    // AI Engineer Way: Upload file to our own backend first
    if (file) {
      try {
        console.log("[AI-Dev] Starting file upload...");
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: uploadData
        });
        
        const uploadResult = await uploadRes.json();
        console.log("[AI-Dev] Upload result:", uploadResult);

        if (uploadResult.success) {
          const currentMessage = formData.get('message');
          const attachmentUrl = uploadResult.url.startsWith('http') 
            ? uploadResult.url 
            : `${API_URL}${uploadResult.url}`;
          
          const newMessage = `${currentMessage}\n\n📎 Attachment: ${attachmentUrl}`;
          formData.set('message', newMessage);
          console.log("[AI-Dev] Final Message with link:", newMessage);
        } else {
          console.error("[AI-Dev] Backend upload success=false:", uploadResult);
        }
      } catch (err) {
        console.error("[AI-Dev] Upload failed, sending message without attachment:", err);
      }
    } else {
      console.log("[AI-Dev] No file selected for upload.");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    if (result.success) {
      setIsSubmitting(false);
      setIsSuccess(true);
      e.target.reset(); // Clear form
      
      // Allow user to see "Success" before scrolling
      setTimeout(() => {
        setIsSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      {/* Exquisite Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
          >
            <div className="flex flex-col w-64 md:w-80">
              <div className="flex justify-between items-end mb-3 overflow-hidden px-1">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="text-4xl font-black tracking-tighter"
                >
                  RR<span className="text-blue-500">.</span>
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-6xl font-light text-gray-500 tabular-nums tracking-tighter"
                >
                  {Math.min(progress, 100)}%
                </motion.span>
              </div>
              <div className="h-[2px] w-full bg-gray-800 relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-blue-500 transition-all duration-75 ease-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="currently-building">
        <CurrentlyBuilding />
      </section>
      <section>
        <Chatbot />
      </section>
      <section id="contact">
        <CustomCursor />
        <footer className="bg-gray-900 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Let's Build Something<span className="text-blue-500">.</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">I'm always open to discussing AI engineering projects, internships, or building something ambitious together.</p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <input type="hidden" name="access_key" value="8fa6edb4-4155-4dc6-97b9-e05ce2f6412d" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-5 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <textarea
                name="message"
                required
                placeholder="What do you want to build?"
                rows="4"
                className="w-full px-5 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>

              {/* Attachment Field - Linked to your FastAPI Backend */}
              <div className="relative group">
                <label className="flex items-center gap-3 w-full px-5 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl cursor-pointer hover:bg-gray-800/50 hover:border-blue-500/50 transition-all">
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">Attach a file (Processed via AI Backend)</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      const fileName = e.target.files[0]?.name;
                      if (fileName) {
                        e.target.previousElementSibling.textContent = fileName;
                        e.target.parentElement.classList.add('border-blue-500');
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white font-bold tracking-wide rounded-2xl hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
            <div className="flex justify-center flex-wrap gap-8 mt-16 text-sm font-medium">
              <a href="https://github.com/Raghav1378" className="flex items-center gap-2 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/raghavramani/" className="flex items-center gap-2 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://x.com/RamaniRagh763" className="flex items-center gap-2 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </a>
              <button onClick={handleCopy} className="flex items-center gap-2 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-all focus:outline-none">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zM4.5 5a.5.5 0 0 0-.5.5v.724l7.632 5.342a.5.5 0 0 0 .578 0L19.841 6.224A.5.5 0 0 0 20 6.014V5.5a.5.5 0 0 0-.5-.5h-15zm15.5 2.536l-7.464 5.225a2.5 2.5 0 0 1-2.894 0L2 7.536v10.964a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.536z"/>
                </svg>
                {copied ? <span className="text-blue-500 font-bold tracking-wider">COPIED!</span> : 'raghavramani2004@gmail.com'}
              </button>
            </div>
            <p className="mt-12 text-gray-500 text-sm tracking-wide">&copy; 2026 RAGHAV RAMANI. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </section>
    </>
  );
}

export default App;
