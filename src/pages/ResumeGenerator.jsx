import { useState } from 'react';

export default function ResumeGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Resume:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">📝 Resume Builder</h2>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-200"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            placeholder="e.g. Experienced frontend developer with 4+ years building scalable web apps..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. JavaScript, React, Tailwind, Git"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            placeholder="e.g. Software Engineer at XYZ, 2021–Present..."
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            placeholder="e.g. BSc Computer Science, FAST-NUCES"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md"
          >
            ➤ Generate Resume
          </button>
        </div>
      </form>
    </div>
  );
}
