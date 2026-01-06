import { ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SurveyCardProps {
  surveyCompleted?: boolean;
}

export function SurveyCard({ surveyCompleted = false }: SurveyCardProps) {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  const handleViewResults = () => {
    navigate('/survey?view=results');
  };

  const handleRetakeSurvey = () => {
    localStorage.removeItem('surveyCompleted');
    localStorage.removeItem('surveyResults');
    navigate('/survey');
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-white/20 p-3 rounded-lg">
          <ClipboardCheck className="w-6 h-6" />
        </div>
        {!surveyCompleted && (
          <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
            Action Required
          </span>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2">Discover Your Business Domain</h2>
      <p className="text-blue-100 mb-6">
        Answer strategic questions about your startup to receive personalized domain prediction and tailored legal guidance for your specific industry.
      </p>
      {!surveyCompleted ? (
        <button
          onClick={handleStartSurvey}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full sm:w-auto"
        >
          Start Survey →
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={handleViewResults}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Results
          </button>
          <button
            onClick={handleRetakeSurvey}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Retake Survey
          </button>
        </div>
      )}
    </div>
  );
}

