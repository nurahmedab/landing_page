import React from 'react';
import { CodeIcon } from './icons/CodeIcon';
import { ZapIcon } from './icons/ZapIcon';
import { UploadIcon } from './icons/UploadIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{children}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Choose DocuGenius?</h2>
          <p className="mt-4 text-lg text-slate-400">The smart, fast, and easy way to document your projects.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={<ZapIcon />} title="AI-Powered Speed">
            Leverage Google's powerful Gemini model to generate documentation in a fraction of the time it takes to write it by hand.
          </FeatureCard>
          <FeatureCard icon={<UploadIcon />} title="Multi-File Support">
            Upload multiple source files at once. DocuGenius analyzes your entire project to create cohesive and context-aware documentation.
          </FeatureCard>
          <FeatureCard icon={<CodeIcon />} title="Developer Focused">
            Get well-structured, readable Markdown output that you can directly use in your READMEs, wikis, or project websites.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
