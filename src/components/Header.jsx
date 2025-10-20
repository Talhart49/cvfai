import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">CVF.ai</Link>
      <nav className="space-x-4">
        {/* <Link to="/generate/resume" className="text-gray-700 hover:text-blue-600">Resume</Link> */}
        <Link to="/generate/cover-letter" className="text-gray-700 hover:text-blue-600">Cover Letter</Link>
      </nav>
    </header>
  );
}
