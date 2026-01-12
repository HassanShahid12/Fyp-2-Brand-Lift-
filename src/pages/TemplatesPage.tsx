import { templates } from '../lib/templates';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TemplatesPage() {
  const navigate = useNavigate();

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <div className="mb-2">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
            <p className="text-sm text-gray-600 mt-1">Download and customize these starter templates to fit your business.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{t.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                </div>
                <button
                  onClick={() => handleDownload(t.filename, t.content)}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
