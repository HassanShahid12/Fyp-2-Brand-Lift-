import { Question } from '../../lib/surveyQuestions';

interface QuestionCardProps {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const handleChange = (optionValue: string) => {
    if (question.type === 'radio') {
      onChange(optionValue);
    } else {
      // Checkbox
      const currentValue = Array.isArray(value) ? value : [];
      if (currentValue.includes(optionValue)) {
        onChange(currentValue.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValue, optionValue]);
      }
    }
  };

  const isSelected = (optionValue: string) => {
    if (question.type === 'radio') {
      return value === optionValue;
    }
    return Array.isArray(value) && value.includes(optionValue);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <label className="block text-lg font-semibold text-gray-900 mb-4">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              isSelected(option.value)
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type={question.type}
              name={question.id}
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

