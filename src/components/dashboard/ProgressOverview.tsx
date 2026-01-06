import { Clock, CheckCircle, Target } from 'lucide-react';

interface ProgressOverviewProps {
  surveyCompleted?: boolean;
  surveyResults?: any;
}

export function ProgressOverview({ surveyCompleted, surveyResults }: ProgressOverviewProps) {
  const activities = [
    {
      type: 'survey',
      title: surveyCompleted ? 'Survey Completed' : 'Survey Started',
      time: '2 hours ago',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    {
      type: 'domain',
      title: surveyResults?.primaryDomain ? `Domain Predicted: ${surveyResults.primaryDomain}` : 'Awaiting domain prediction',
      time: surveyResults ? '1 hour ago' : 'Pending',
      icon: <Target className="w-4 h-4 text-blue-500" />,
    },
  ];

  const recommendedResources = surveyResults?.legalRequirements?.slice(0, 3) || [
    'Company Registration Guide',
    'Tax Registration Steps',
    'Intellectual Property Basics',
  ];

  // Helper function to get the title from a resource (handles both objects and strings)
  const getResourceTitle = (resource: any): string => {
    if (typeof resource === 'string') {
      return resource;
    }
    if (resource && typeof resource === 'object' && resource.title) {
      return resource.title;
    }
    return 'Resource';
  };

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="mt-1">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Resources</h3>
        <div className="space-y-3">
          {recommendedResources.map((resource: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="text-sm text-gray-700">{getResourceTitle(resource)}</span>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

