import { useParams, useNavigate } from 'react-router-dom';
import { legalResources } from '../lib/legalResources';
import { ExternalLink } from 'lucide-react';

export function LegalResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = legalResources.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold">Resource not found</h2>
            <p className="text-gray-600 mt-2">The requested resource does not exist.</p>
            <button onClick={() => navigate('/resources')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Back to resources</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{resource.title}</h1>
              <p className="text-sm text-gray-600 mt-1">{resource.authority} {resource.jurisdiction ? `• ${resource.jurisdiction}` : ''}</p>
            </div>
            <div>
              {resource.website && (
                <a href={resource.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                  Official site <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-4 text-gray-700">
            <p>{resource.summary}</p>

            {resource.phone && (
              <p className="mt-3"><strong>Phone:</strong> <a href={`tel:${resource.phone}`} className="text-blue-600 hover:underline">{resource.phone}</a></p>
            )}

            {resource.email && (
              <p className="mt-2"><strong>Email:</strong> <a href={`mailto:${resource.email}`} className="text-blue-600 hover:underline">{resource.email}</a></p>
            )}

            {resource.attachments && resource.attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Attachments</h3>
                <ul className="mt-2 space-y-1">
                  {resource.attachments.map((a) => (
                    <li key={a.url}><a href={a.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{a.name}</a></li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button onClick={() => { const saved = JSON.parse(localStorage.getItem('savedResources') || '[]'); if (!saved.includes(resource.id)) { saved.push(resource.id); localStorage.setItem('savedResources', JSON.stringify(saved)); } }} className="bg-blue-600 text-white px-3 py-2 rounded">Save</button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }} className="bg-gray-100 px-3 py-2 rounded">Share link</button>
              {resource.email && <a href={`mailto:${resource.email}`} className="bg-white border px-3 py-2 rounded hover:bg-gray-50">Email</a>}
              <button onClick={() => navigate('/resources')} className="ml-auto bg-white border px-3 py-2 rounded">Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
