import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to CVF.ai</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Instantly generate tailored resumes and compelling cover letters using AI — no paid tools required.
      </p>
      <div className="flex gap-4">
        <Link to="/generate/resume" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-blue-700">
          Generate Resume
        </Link>
        <Link to="/generate/cover-letter" className="bg-gray-800 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-gray-900">
          Generate Cover Letter
        </Link>
      </div>
    </div>
  );
}
