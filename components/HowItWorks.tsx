import React from 'react';

const Step: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500 text-white font-bold text-2xl">
        {number}
      </div>
    </div>
    <div className="ml-4">
      <h4 className="text-lg leading-6 font-bold text-white">{title}</h4>
      <p className="mt-2 text-base text-slate-400">{children}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get Your Docs in 3 Simple Steps</h2>
        </div>
        <div className="max-w-3xl mx-auto grid md:grid-cols-1 gap-10">
          <Step number="1" title="Upload Your Files">
            Click or drag and drop your source code files into the upload area. You can add multiple files from your project.
          </Step>
          <Step number="2" title="Provide Context (Optional)">
            Give the AI some extra instructions or context to tailor the documentation to your specific needs.
          </Step>
          <Step number="3" title="Generate & Copy">
            Hit the generate button and watch the AI work. Your new documentation will appear, ready to be copied and used.
          </Step>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
