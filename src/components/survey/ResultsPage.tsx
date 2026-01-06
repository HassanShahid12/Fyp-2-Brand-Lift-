import { Target, CheckCircle, Scale, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DomainResult } from '../../lib/domainPredictor';

interface ResultsPageProps {
  results: DomainResult;
}

export function ResultsPage({ results }: ResultsPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Domain Prediction Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center mb-4">
            <Target className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Your Predicted Domain</h1>
              <p className="text-blue-100">Based on your survey responses</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-2 capitalize">{results.primaryDomain}</h2>
            <div className="flex items-center gap-2">
              <span className="text-lg">Confidence:</span>
              <div className="flex-1 bg-white/30 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all"
                  style={{ width: `${results.confidence}%` }}
                />
              </div>
              <span className="text-lg font-semibold">{results.confidence}%</span>
            </div>
          </div>
          {results.secondaryDomains.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-blue-100 mb-2">Also relevant:</p>
              <div className="flex gap-2 flex-wrap">
                {results.secondaryDomains.map((domain) => (
                  <span
                    key={domain}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legal Requirements Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Scale className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Legal Requirements for Your Startup</h2>
          </div>
          <div className="space-y-4">
            {results.legalRequirements.map((req, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{req.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{req.description}</p>
                  {req.resources && (
                    <a
                      href="/legal-requirements"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/legal-requirements');
                      }}
                      className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                    >
                      View Resources →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Requirements Button */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <button
            onClick={() => navigate('/legal-requirements')}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Scale className="w-5 h-5" />
            <span>Legal Requirements for Your Startup</span>
          </button>
        </div>

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Legal Checklist (PDF)</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

