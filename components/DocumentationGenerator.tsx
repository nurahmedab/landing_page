import React, { useState, useCallback, useRef } from 'react';
import type { UploadedFile } from '../types';
import { generateDocsFromFiles } from '../services/geminiService';
import { UploadIcon } from './icons/UploadIcon';
import { FileIcon } from './icons/FileIcon';
import { CopyIcon } from './icons/CopyIcon';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const formatContent = (text: string) => {
    let html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
        const language = code.split('\n')[0].trim();
        const actualCode = code.substring(code.indexOf('\n') + 1);
        return `<pre class="bg-slate-800 rounded-md p-4 overflow-x-auto text-sm my-4"><code class="language-${language}">${actualCode}</code></pre>`;
    });

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-8 mb-4">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-1 list-disc">$1</li>');
    html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Newlines
    html = html.replace(/\n/g, '<br />');
    html = html.replace(/<br \/><ul>/g, '<ul>');
    html = html.replace(/<\/ul><br \/>/g, '</ul>');
    html = html.replace(/<\/pre><br \/>/g, '</pre>');

    return { __html: html };
  };

  return <div className="prose prose-invert max-w-none text-slate-300" dangerouslySetInnerHTML={formatContent(content)} />;
};


const DocumentationGenerator: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: `${file.name}-${file.lastModified}`,
        file,
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleGenerate = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file.');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedDocs('');

    try {
      const result = await generateDocsFromFiles(files.map(f => f.file), prompt);
      setGeneratedDocs(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDocs);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: `${file.name}-${file.lastModified}`,
        file,
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  }

  return (
    <section id="generator" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Generate Your Documentation</h2>
          <p className="mt-4 text-lg text-slate-400">Upload files, provide context, and let the magic happen.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">1. Upload Files</h3>
            <div 
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
              <p className="mt-2 text-slate-400">Drag & drop files or click to browse</p>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map(({ id, file }) => (
                  <div key={id} className="bg-slate-700 p-2 rounded flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileIcon />
                      <span className="text-white truncate">{file.name}</span>
                    </div>
                    <button onClick={() => handleRemoveFile(id)} className="text-red-400 hover:text-red-300 font-bold">&times;</button>
                  </div>
                ))}
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mt-6 mb-4">2. Add Context (Optional)</h3>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g., 'Focus on the API endpoints' or 'Explain this for a beginner'"
              className="w-full h-24 bg-slate-700 text-white p-3 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            ></textarea>

            <button
              onClick={handleGenerate}
              disabled={isLoading || files.length === 0}
              className="w-full mt-6 bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'Generate Documentation'}
            </button>
          </div>

          {/* Output Area */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">3. Get Your Results</h3>
              {generatedDocs && (
                <button onClick={handleCopy} className="bg-slate-700 text-sm text-cyan-400 py-1 px-3 rounded-md hover:bg-slate-600 flex items-center gap-2">
                  <CopyIcon />
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="bg-slate-900 rounded-md min-h-[400px] p-4 text-slate-300 overflow-y-auto">
              {isLoading && <p>Generating documentation... Please wait.</p>}
              {error && <p className="text-red-400">{error}</p>}
              {generatedDocs ? <MarkdownRenderer content={generatedDocs} /> : !isLoading && !error && <p>Your generated documentation will appear here.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationGenerator;
