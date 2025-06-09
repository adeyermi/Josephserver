import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { BookOpen, Dumbbell, FileQuestion, ArrowLeft, Download } from 'lucide-react';

const DocumentsWelcomePage = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();

  const documentCategories = [
    {
      id: 'memory-verse',
      title: 'Memory Verse',
      description: 'Access and download memory verse materials with biblical references and explanations',
      icon: BookOpen,
      borderColor: 'hover:border-orange-200'
    },
    {
      id: 'exercise',
      title: 'Exercise',
      description: 'Review exercise materials covering biblical eras, key figures, and their stories',
      icon: Dumbbell,
      borderColor: 'hover:border-orange-200'
    },
    {
      id: 'past-questions',
      title: 'Past Questions',
      description: 'Browse and download past questions from weeks 1-8 for comprehensive review',
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
            Welcome {getGreeting()}! 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the category you wish to read or download materials from. All documents are available for viewing and download.
          </p>
        </div>

        {/* Document Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {documentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/documents/${category.id}`)}
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
                    <span>View Materials</span>
                    <Download className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Document Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-orange-700">
              <div className="space-y-2">
                <div className="text-3xl">👁️</div>
                <p className="font-medium">View Online</p>
                <p className="text-sm">Read documents directly in your browser</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">💾</div>
                <p className="font-medium">Download</p>
                <p className="text-sm">Save materials for offline study</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🧭</div>
                <p className="font-medium">Easy Navigation</p>
                <p className="text-sm">Simple back and home buttons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsWelcomePage;