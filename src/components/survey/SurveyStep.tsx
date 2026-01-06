import { QuestionCard } from './QuestionCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SurveyStep as SurveyStepType } from '../../lib/surveyQuestions';
import { SurveyAnswers } from '../../lib/domainPredictor';

interface SurveyStepProps {
  step: SurveyStepType;
  currentStep: number;
  onAnswer: (questionId: string, value: string | string[]) => void;
  answers: SurveyAnswers;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export function SurveyStep({
  step,
  currentStep,
  onAnswer,
  answers,
  onNext,
  onPrevious,
  isLastStep,
}: SurveyStepProps) {
  const canProceed = step.questions.every((question) => {
    const answer = answers[question.id];
    if (question.required) {
      if (question.type === 'checkbox') {
        return Array.isArray(answer) && answer.length > 0;
      }
      return answer !== undefined && answer !== '';
    }
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{step.title}</h2>
        <p className="text-gray-600">Step {currentStep} of 8</p>
      </div>

      <div className="space-y-6 mb-8">
        {step.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => onAnswer(question.id, value)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>{isLastStep ? 'Submit' : 'Next'}</span>
          {!isLastStep && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

