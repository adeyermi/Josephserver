import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import VoiceRecorder from '../components/VoiceRecorder';
import { ArrowLeft, Dumbbell, Check, Shuffle } from 'lucide-react';

const ExerciseQuiz = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();
  const [currentEra, setCurrentEra] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const eras = [
    "Creation Era",
    "Patriarchal Era", 
    "Egyptian Bondage Era",
    "Wilderness Era",
    "Conquest Era",
    "Judges Era",
    "United Kingdom Era",
    "Divided Kingdom Era",
    "Exile Era",
    "Post-Exile Era",
    "Intertestamental Era",
    "Gospel Era",
    "Early Church Era"
  ];

  const selectRandomEra = () => {
    const randomEra = eras[Math.floor(Math.random() * eras.length)];
    setCurrentEra(randomEra);
  };

  const handleSubmit = (audioBlob: Blob) => {
    // Simulate sending email to admin
    console.log(`Sending exercise recording to Joseph Group from ${getGreeting()}`);
    console.log('Recording blob size:', audioBlob.size);
    console.log('Era discussed:', currentEra);
    setShowThankYou(true);
  };

  const retry = () => {
    setCurrentEra(null);
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
            You may retry to test proficiency on another era.
          </p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full bg-orange-primary hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Try Another Era
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
            <Dumbbell className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exercise Quiz</h1>
          <p className="text-gray-600 text-lg">
            Welcome {getGreeting()}! Test your knowledge of biblical eras.
          </p>
        </div>

        {!currentEra ? (
          /* Era Selection */
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md mx-auto border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Generate Random Era</h3>
              <p className="text-gray-600 mb-8">
                Click the button below to randomly select a biblical era for your exercise.
              </p>
              <button
                onClick={selectRandomEra}
                className="bg-orange-primary hover:bg-orange-600 text-white py-4 px-8 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <Shuffle className="w-6 h-6" />
                <span>Generate Random Era</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Interface */
          <div className="space-y-8">
            {/* Era Display */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-orange-800 mb-6 text-center">
                Selected Era: {currentEra}
              </h3>
              <div className="bg-orange-100 border border-orange-300 rounded-xl p-6">
                <h4 className="font-bold text-orange-800 mb-3">Your Task:</h4>
                <ul className="text-orange-700 space-y-2">
                  <li>• Describe the selected era in detail</li>
                  <li>• Name three important people from that era</li>
                  <li>• Mention the book(s) where their stories are found</li>
                </ul>
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

export default ExerciseQuiz;