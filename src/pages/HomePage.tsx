import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { BookOpen, FileText, Brain, Sparkles } from 'lucide-react';

const HomePage = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-cream rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center border-2 border-orange-primary">
            <BookOpen className="w-12 h-12 text-orange-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome {getGreeting()}! 🙏
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to dive deeper into your revision journey? Choose your path below and strengthen your knowledge with God's guidance.
          </p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Revision Quiz */}
          <div 
            onClick={() => navigate('/quiz')}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-orange-200"
          >
            <div className="text-center">
              <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 border-2 border-orange-primary group-hover:bg-orange-50 transition-all duration-300">
                <Brain className="w-8 h-8 text-orange-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Revision Quiz</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Test your knowledge with interactive voice recordings. Practice memory verses, exercises, and past questions with timed challenges.
              </p>
              <div className="flex items-center justify-center text-orange-primary font-medium group-hover:text-orange-600">
                <span>Start Quiz</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-bounce" />
              </div>
            </div>
          </div>

          {/* Revision Documents */}
          <div 
            onClick={() => navigate('/documents')}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-orange-200"
          >
            <div className="text-center">
              <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 border-2 border-orange-primary group-hover:bg-orange-50 transition-all duration-300">
                <FileText className="w-8 h-8 text-orange-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Revision Documents</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access and download study materials. Review memory verses, exercises, and past questions at your own pace.
              </p>
              <div className="flex items-center justify-center text-orange-primary font-medium group-hover:text-orange-600">
                <span>View Documents</span>
                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Stay Strong in Faith</h3>
            <p className="text-orange-700 text-lg leading-relaxed">
              "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." - Proverbs 3:5-6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;