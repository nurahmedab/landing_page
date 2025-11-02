import React from 'react';

const Hero: React.FC = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Instant Documentation with the Power of AI
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
          Stop writing docs manually. Upload your source files, and let DocuGenius leverage the Gemini API to generate clean, comprehensive documentation in seconds.
        </p>
        <button
          onClick={scrollToGenerator}
          className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
        >
          Start Generating
        </button>
      </div>
    </section>
  );
};

export default Hero;
