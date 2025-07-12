import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';
import { generateThreeCoverLetters } from '../utils/generateCoverLetterWithGroq';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();


export default function CoverLetterGenerator() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetters, setCoverLetters] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfText = await extractPdfText(reader.result);
        setResumeText(pdfText);
      };
      reader.readAsArrayBuffer(file);
    } else if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => setResumeText(reader.result);
      reader.readAsText(file);
    } else {
      alert('Only PDF and TXT files are supported for now.');
    }
  };

  const extractPdfText = async (pdfData) => {
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(' ');
      text += pageText + '\n';
    }

    return text;
  };


  const handleGenerate = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please upload a resume and enter job description');
      return;
    }

    setCoverLetters(['⏳ Generating...']);

    const results = await generateThreeCoverLetters({ resumeText, jobDescription });

    setCoverLetters(results);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('coverLetterPreview');
    const opt = {
      margin: 0.5,
      filename: 'cover_letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    import('html2pdf.js').then((html2pdf) => {
      html2pdf.default().from(element).set(opt).save();
    });
  };

  const extractSkills = (text) => {
    const keywords = [
      "JavaScript", "React", "Node.js", "MongoDB", "Express", "TypeScript", "HTML",
      "CSS", "Git", "Python", "Django", "SQL", "Tailwind", "REST", "Next.js", "Redux",
      "GraphQL", "AWS", "Firebase", "Agile"
    ];

    const found = new Set();
    const lowerText = text.toLowerCase();

    for (const word of keywords) {
      if (lowerText.includes(word.toLowerCase())) {
        found.add(word);
      }
    }

    return Array.from(found);
  };


  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">💌 Cover Letter Generator</h2>

      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Resume (PDF or TXT)</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Paste Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={5}
            placeholder="We're looking for a frontend engineer with 3+ years of React experience..."
          />
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow"
          >
            ➤ Generate Cover Letter
          </button>
        </div>

        {/* Output */}
        {coverLetters.length > 0 && (
          <div className="grid gap-6 mt-10">
            {coverLetters.map((text, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Option {index + 1}</h3>
                <pre className="whitespace-pre-wrap text-gray-700">{text}</pre>
              </div>
            ))}

            <div className="text-center mt-4">
              <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
              >
                🔄 Regenerate All
              </button>
            </div>
          </div>
        )}
        <div className="text-center mt-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow"
          >
            📥 Download as PDF
          </button>
        </div>
        {/* Download Button */}


      </div>
    </div>
  );
}
