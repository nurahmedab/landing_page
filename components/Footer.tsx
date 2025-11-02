import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} DocuGenius. All rights reserved.</p>
        <p className="mt-1">Powered by Google Gemini API</p>
      </div>
    </footer>
  );
};

export default Footer;
