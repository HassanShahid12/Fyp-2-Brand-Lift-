import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { legalResources, LegalResource } from '../lib/legalResources';
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';

export function LegalResourcesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'guide' | 'authority' | 'template'>('all');
  const [active, setActive] = useState<LegalResource | null>(null);
  const navigate = useNavigate();

  const list = legalResources.filter((r) => {
    if (filter !== 'all' && r.type !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      (r.summary && r.summary.toLowerCase().includes(q)) ||
      (r.tags && r.tags.join(' ').toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resources"
                  className="border border-gray-200 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Browse Legal Resources</h1>
              <p className="text-gray-600 mt-1">Official guides, checklists and authority contacts to help you meet legal requirements.</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            {(['all', 'guide', 'authority', 'template'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded ${filter === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {list.map((r) => (
              <div key={r.id} className="border rounded p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{r.summary}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {r.authority && <span className="mr-2">{r.authority}</span>}
                      {r.jurisdiction && <span className="mr-2">• {r.jurisdiction}</span>}
                      {r.lastUpdated && <span>• Updated {r.lastUpdated}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {r.website && (
                      <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Visit <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => window.location.href = `/resources/${r.id}`}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {active && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{active.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{active.summary}</p>
                <div className="text-xs text-gray-500 mt-2">{active.authority && <span>{active.authority}</span>}</div>
              </div>
              <div>
                {active.website && (
                  <a href={active.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Visit official site <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }} className="bg-gray-100 px-3 py-1 rounded">Share link</button>
                <button onClick={() => { const saved = JSON.parse(localStorage.getItem('savedResources') || '[]'); if (!saved.includes(active.id)) { saved.push(active.id); localStorage.setItem('savedResources', JSON.stringify(saved)); } }} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                {active.email && <a href={`mailto:${active.email}`} className="bg-white border px-3 py-1 rounded hover:bg-gray-50">Email</a>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
