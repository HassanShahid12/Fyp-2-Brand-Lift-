import { useAuth } from '../contexts/AuthContext';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { StatsCard } from '../components/dashboard/StatsCard';
import { SurveyCard } from '../components/dashboard/SurveyCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ProgressOverview } from '../components/dashboard/ProgressOverview';
import { CheckCircle, Target, FileText, PieChart } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const surveyCompleted = localStorage.getItem('surveyCompleted') === 'true';
  const surveyResults = surveyCompleted ? JSON.parse(localStorage.getItem('surveyResults') || '{}') : null;

  const userName = user?.user_metadata?.full_name || user?.email || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={userName} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Survey Status"
            value={surveyCompleted ? "Completed" : "Not Completed"}
            icon={<CheckCircle className="w-6 h-6" />}
            color="blue"
            description={surveyCompleted ? "Survey finished" : "Start survey to begin"}
          />
          <StatsCard
            title="Business Domain"
            value={surveyResults?.primaryDomain || "Complete Survey to Predict"}
            icon={<Target className="w-6 h-6" />}
            color="green"
            description={surveyResults?.confidence ? `${surveyResults.confidence}% confidence` : "Awaiting survey"}
          />
          <StatsCard
            title="Legal Resources"
            value={surveyResults?.legalRequirements?.length || 0}
            icon={<FileText className="w-6 h-6" />}
            color="purple"
            description="Available resources"
          />
          <StatsCard
            title="Overall Progress"
            value={surveyCompleted ? "100%" : "0%"}
            icon={<PieChart className="w-6 h-6" />}
            color="orange"
            description="Completion status"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 60% */}
          <div className="lg:col-span-2 space-y-6">
            <SurveyCard surveyCompleted={surveyCompleted} />
            <QuickActions />
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-1">
            <ProgressOverview surveyCompleted={surveyCompleted} surveyResults={surveyResults} />
          </div>
        </div>
      </div>
    </div>
  );
}

