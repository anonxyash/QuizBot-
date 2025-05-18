import { useLocation, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';

export default function PaperResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const paper = location.state?.paper;

  if (!paper) {
    navigate('/paper');
    return null;
  }

  const handleDownload = () => {
    const blob = new Blob([paper], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-paper.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Function to clean text from asterisks
  const cleanText = (text: string) => {
    return text.replace(/\*/g, '');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/paper')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Generator
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Paper
          </button>
        </div>

        {/* Paper Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* School Header */}
          <div className="text-center mb-8 font-serif">
            <h1 className="text-2xl font-bold mb-2 text-black">CENTRAL BOARD OF SECONDARY EDUCATION</h1>
            <div className="text-sm text-gray-800 space-y-1">
              <p>Sample Question Paper {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
              <p>Class: {location.state?.config?.class}</p>
              <p>Subject: {location.state?.config?.subject}</p>
              <p>Time: {location.state?.config?.marks === 80 ? '3 hours' : 
                       location.state?.config?.marks === 40 ? '2 hours' : '1 hour'}</p>
              <p>Maximum Marks: {location.state?.config?.marks}</p>
            </div>
          </div>

          {/* General Instructions */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 font-serif text-black">General Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-900">
              <li>All questions are compulsory.</li>
              <li>The question paper has {location.state?.config?.marks === 80 ? 'four' : 
                  location.state?.config?.marks === 40 ? 'three' : 'two'} sections.</li>
              <li>Internal choices have been provided in some questions.</li>
              <li>Draw neat and clean diagrams wherever required.</li>
            </ol>
          </div>

          {/* Question Paper Content */}
          <div className="space-y-6 font-serif leading-relaxed">
            {paper.split('\n').map((line, index) => {
              const cleanLine = cleanText(line);
              
              // Check if line is a section header
              if (cleanLine.trim().startsWith('Section') || cleanLine.trim().startsWith('SECTION')) {
                return (
                  <h2 key={index} className="text-lg font-bold text-black border-b-2 border-gray-200 pb-2 mt-8">
                    {cleanLine}
                  </h2>
                );
              }
              // Check if line is a question
              else if (/^\d+\./.test(cleanLine.trim())) {
                return (
                  <div key={index} className="pl-8 relative text-black font-medium">
                    <span className="absolute left-0 font-bold">{cleanLine.match(/^\d+/)?.[0]}.</span>
                    <span>{cleanLine.replace(/^\d+\./, '').trim()}</span>
                  </div>
                );
              }
              // Check if line is an option (a), b), etc.)
              else if (/^[a-d]\)/.test(cleanLine.trim().toLowerCase())) {
                return (
                  <div key={index} className="pl-12 text-gray-900">
                    <span className="font-medium">{cleanLine}</span>
                  </div>
                );
              }
              // Regular line
              else if (cleanLine.trim()) {
                return <p key={index} className="text-gray-900">{cleanLine}</p>;
              }
              // Empty line
              return <div key={index} className="h-4" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}