import { GoogleGenAI } from "@google/genai";

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const generateDocsFromFiles = async (files: File[], customPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fileContents = await Promise.all(
    files.map(async (file) => {
      const content = await readFileAsText(file);
      return `--- FILE: ${file.name} ---\n\`\`\`\n${content}\n\`\`\``;
    })
  );

  const fullPrompt = `
You are an expert technical writer. Your task is to generate clear, concise, and comprehensive documentation in Markdown format from the provided source files.

The documentation should include the following sections where applicable:
1.  **Overview**: A high-level summary of the project's purpose based on the provided files.
2.  **Features**: A bulleted list of key features.
3.  **Getting Started / Installation**: How to set up and run the project, if inferable.
4.  **API Reference / Component Breakdown**: Detailed explanation of functions, classes, components, etc.
5.  **Usage Examples**: Code snippets showing how to use the project.

${customPrompt ? `The user has provided this additional guidance: "${customPrompt}"` : ''}

Here are the files:

${fileContents.join('\n\n')}
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating documentation:", error);
    throw new Error("Failed to generate documentation from the Gemini API.");
  }
};
