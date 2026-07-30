import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'raghavramani2004@gmail.com';
const REQUEST_TIMEOUT_MS = 15000;
const RETRY_ATTEMPTS = 1;

const fetchWithTimeout = async (url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Raghav's AI assistant. Ask me about his skills, projects, or experience!",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message, firing smoothly on chunk updates as well
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showThinking]);

  const buildHistory = (msgs) => {
    // Exclude the greeting and format to open-ai standard 'role' structure
    return msgs
      .slice(1)
      .map((m) => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.text,
      }));
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || isStreaming) return;

    const userMessage = { id: Date.now(), text: trimmed, isUser: true };
    const historyForAPI = buildHistory(messages);

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    const thinkingTimeout = setTimeout(() => {
      setShowThinking(true);
    }, 300);

    let lastError = null;

    for (let attempt = 0; attempt <= RETRY_ATTEMPTS; attempt += 1) {
      try {
        if (historyForAPI.length === 0) {
          const res = await fetchWithTimeout(`${API_URL}/chat/cached`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed, history: [] }),
          });

          clearTimeout(thinkingTimeout);
          setShowThinking(false);
          setIsLoading(false);

          if (!res.ok) throw new Error('Network error');
          const data = await res.json();

          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, text: data.reply, isUser: false },
          ]);
          return;
        }

        const res = await fetchWithTimeout(`${API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history: historyForAPI }),
        });

        if (!res.ok) throw new Error('Network error');

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No stream available');

        const decoder = new TextDecoder('utf-8');
        let botMessageId = Date.now() + 1;
        let responseText = '';

        setIsStreaming(true);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          if (responseText === '') {
            clearTimeout(thinkingTimeout);
            setShowThinking(false);
            setIsLoading(false);
            setMessages((prev) => [
              ...prev,
              { id: botMessageId, text: '', isUser: false },
            ]);
          }

          const chunk = decoder.decode(value, { stream: true });
          responseText += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, text: responseText }
                : msg
            )
          );
        }

        setIsStreaming(false);
        return;
      } catch (error) {
        lastError = error;
        if (attempt < RETRY_ATTEMPTS) {
          await wait(600);
          continue;
        }
      }
    }

    clearTimeout(thinkingTimeout);
    setShowThinking(false);
    setIsLoading(false);
    setIsStreaming(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: lastError?.name === 'AbortError'
          ? 'The chatbot is taking too long to respond. Please try again in a moment.'
          : `Something went wrong. Reach Raghav at ${CONTACT_EMAIL}`,
        isUser: false,
      },
    ]);
  };

  return (
    <div className="relative">
      {/* Floating chat bubble */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center z-50 shadow-lg cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white text-2xl font-light leading-none"
            >
              ×
            </motion.span>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-3 left-3 sm:right-6 sm:left-auto w-auto sm:w-[360px] md:w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
            style={{ maxHeight: '78vh' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  R
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">Raghav's AI</p>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] px-3 sm:px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                    {/* Blinking cursor if this is the currently streaming message */}
                    {!message.isUser && isStreaming && message.id === messages[messages.length - 1]?.id && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block ml-0.5"
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Thinking placeholder that appears only between 300ms and the initial stream chunk */}
              {showThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] px-4 py-2.5 bg-gray-100 text-gray-500 rounded-2xl rounded-bl-sm text-sm italic">
                    Thinking...
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Raghav…"
                  disabled={isLoading || isStreaming}
                  className="flex-1 px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || isStreaming || !input.trim()}
                  className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
