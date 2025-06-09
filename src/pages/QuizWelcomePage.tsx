import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { BookOpen, Dumbbell, FileQuestion, ArrowLeft, Sparkles } from 'lucide-react';

const QuizWelcomePage = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();

  const quizCategories = [
    {
      id: 'memory-verse',
      title: 'Memory Verse',
      description: 'Recite and explain selected Bible verses from Luke, Matthew, Proverbs, and Corinthians',
      icon: BookOpen,
      borderColor: 'hover:border-orange-200'
    },
    {
      id: 'exercise',
      title: 'Exercise',
      description: 'Describe biblical eras, name key figures, and identify the books where their stories are found',
      icon: Dumbbell,
      borderColor: 'hover:border-orange-200'
    },
    {
      id: 'past-questions',
      title: 'Past Questions',
      description: 'Answer random questions from previous weeks\' materials and test your comprehensive knowledge',
      icon: FileQuestion,
      borderColor: 'hover:border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome {getGreeting()}! 🎯
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please select a category to begin your revision. Each quiz includes voice recording with a 60-second timer.
          </p>
        </div>

        {/* Quiz Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {quizCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/quiz/${category.id}`)}
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent ${category.borderColor}`}
              >
                <div className="text-center">
                  <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 border-2 border-orange-primary group-hover:bg-orange-50 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-orange-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed min-h-[4.5rem]">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-center text-gray-700 font-medium group-hover:text-gray-900">
                    <span>Start Quiz</span>
                    <Sparkles className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Quiz Instructions</h3>
            <div className="grid md:grid-cols-3 gap-6 text-orange-700">
              <div className="space-y-2">
                <div className="text-3xl">🎤</div>
                <p className="font-medium">Voice Recording</p>
                <p className="text-sm">Answer using your voice</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">⏱️</div>
                <p className="font-medium">60 Second Timer</p>
                <p className="text-sm">Complete within time limit</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">📧</div>
                <p className="font-medium">Instant Feedback</p>
                <p className="text-sm">Receive feedback via Joseph Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizWelcomePage;