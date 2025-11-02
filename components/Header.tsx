import React from 'react';

const Header: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md shadow-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-white">
              Docu<span className="text-cyan-400">Genius</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => scrollTo('features')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</button>
              <button onClick={() => scrollTo('how-it-works')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">How It Works</button>
              <button onClick={() => scrollTo('generator')} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Generator</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
