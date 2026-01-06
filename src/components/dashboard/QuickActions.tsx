import { FileText, Download, BookOpen, ArrowRight } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Browse Legal Resources',
      icon: <FileText className="w-5 h-5" />,
      description: 'Access legal templates and guides',
    },
    {
      title: 'Download Templates',
      icon: <Download className="w-5 h-5" />,
      description: 'Get ready-to-use documents',
    },
    {
      title: 'View Guides',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Step-by-step tutorials',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
              {action.icon}
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </div>
      ))}
    </div>
  );
}

