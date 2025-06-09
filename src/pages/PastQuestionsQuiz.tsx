import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import VoiceRecorder from '../components/VoiceRecorder';
import { ArrowLeft, FileQuestion, Check, Shuffle } from 'lucide-react';

const PastQuestionsQuiz = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Sample questions for each week (in a real app, these would be loaded from PDFs)
  const weeklyQuestions = {
    1: [
      "Explain the significance of the creation account in Genesis 1-2.",
      "Discuss the fall of man and its consequences for humanity.",
      "What lessons can we learn from Cain and Abel's story?"
    ],
    2: [
      "Describe Noah's faith and obedience during the flood.",
      "Explain God's covenant with Abraham and its importance.",
      "What can we learn from Abraham's willingness to sacrifice Isaac?"
    ],
    3: [
      "Discuss Joseph's journey from pit to palace.",
      "How did God use Joseph's trials for good?",
      "What does Joseph's forgiveness of his brothers teach us?"
    ],
    4: [
      "Explain the significance of the burning bush experience.",
      "Discuss the ten plagues and God's power over Egypt.",
      "What lessons do we learn from the Passover?"
    ],
    5: [
      "Describe the giving of the Law at Mount Sinai.",
      "Explain the significance of the golden calf incident.",
      "What do the wilderness wanderings teach us about faith?"
    ],
    6: [
      "Discuss Joshua's leadership during the conquest of Canaan.",
      "Explain the significance of the battle of Jericho.",
      "What lessons do we learn from the period of the Judges?"
    ],
    7: [
      "Describe King David's heart after God.",
      "Explain the significance of Solomon's wisdom and the temple.",
      "What led to the division of the kingdom?"
    ],
    8: [
      "Discuss the role of prophets in the divided kingdom.",
      "Explain the reasons for exile and its lessons.",
      "How did God preserve His people through difficult times?"
    ]
  };

  const generateRandomWeek = () => {
    const week = Math.floor(Math.random() * 8) + 1;
    setSelectedWeek(week);
    
    const questions = weeklyQuestions[week as keyof typeof weeklyQuestions];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  };

  const handleSubmit = (audioBlob: Blob) => {
    // Simulate sending email to admin
    console.log(`Sending past questions recording to Joseph Group from ${getGreeting()}`);
    console.log('Recording blob size:', audioBlob.size);
    console.log('Week:', selectedWeek, 'Question:', currentQuestion);
    setShowThankYou(true);
  };

  const retry = () => {
    setSelectedWeek(null);
    setCurrentQuestion(null);
    setShowThankYou(false);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-cream">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md w-full text-center border border-orange-100">
          <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you {getGreeting()} for taking the quiz. You will receive feedback shortly via Joseph Group. 
            You may retry to test proficiency on another question.
          </p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full bg-orange-primary hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Try Another Question
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Back to Quiz Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quiz Menu</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-orange-primary">
            <FileQuestion className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Past Questions Quiz</h1>
          <p className="text-gray-600 text-lg">
            Welcome {getGreeting()}! Test your knowledge with previous weeks' materials.
          </p>
        </div>

        {!selectedWeek ? (
          /* Week Selection */
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md mx-auto border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Generate Random Week</h3>
              <p className="text-gray-600 mb-8">
                Click the button below to randomly select a week (1-8) and get a question from that week's materials.
              </p>
              <button
                onClick={generateRandomWeek}
                className="bg-orange-primary hover:bg-orange-600 text-white py-4 px-8 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <Shuffle className="w-6 h-6" />
                <span>Generate Random Week</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Interface */
          <div className="space-y-8">
            {/* Question Display */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <div className="text-center mb-6">
                <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-bold text-lg">
                  Week {selectedWeek}
                </span>
              </div>
              <h3 className="text-xl font-bold text-orange-800 mb-6 text-center">Question:</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                "{currentQuestion}"
              </p>
              <div className="bg-orange-100 border border-orange-300 rounded-xl p-4">
                <p className="text-orange-700 font-medium text-center">
                  Please provide a comprehensive answer based on your study materials.
                </p>
              </div>
            </div>

            {/* Voice Recorder */}
            <VoiceRecorder onSubmit={handleSubmit} timeLimit={60} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PastQuestionsQuiz;