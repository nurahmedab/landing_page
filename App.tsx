import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DocumentationGenerator from './components/DocumentationGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DocumentationGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
