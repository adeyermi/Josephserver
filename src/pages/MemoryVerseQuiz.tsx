import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import VoiceRecorder from '../components/VoiceRecorder';
import { ArrowLeft, BookOpen, Check } from 'lucide-react';

const MemoryVerseQuiz = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();
  const [selectedVersion, setSelectedVersion] = useState<'KJV' | 'NIV' | null>(null);
  const [currentVerse, setCurrentVerse] = useState<any>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const verses = {
    KJV: [
      {
        reference: "Luke 24:26-27",
        text: "Ought not Christ to have suffered these things, and to enter into his glory? And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself."
      },
      {
        reference: "Matthew 1:18",
        text: "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost."
      },
      {
        reference: "Proverbs 21:20",
        text: "There is treasure to be desired and oil in the dwelling of the wise; but a foolish man spendeth it up."
      },
      {
        reference: "1 Corinthians 9:13-14",
        text: "Do ye not know that they which minister about holy things live of the things of the temple? and they which wait at the altar are partakers with the altar? Even so hath the Lord ordained that they which preach the gospel should live of the gospel."
      }
    ],
    NIV: [
      {
        reference: "Luke 24:26-27",
        text: "Did not the Messiah have to suffer these things and then enter his glory? And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself."
      },
      {
        reference: "Matthew 1:18",
        text: "This is how the birth of Jesus the Messiah came about: His mother Mary was pledged to be married to Joseph, but before they came together, she was found to be pregnant through the Holy Spirit."
      },
      {
        reference: "Proverbs 21:20",
        text: "The wise store up choice food and olive oil, but fools gulp theirs down."
      },
      {
        reference: "1 Corinthians 9:13-14",
        text: "Don't you know that those who serve in the temple get their food from the temple, and that those who serve at the altar share in what is offered on the altar? In the same way, the Lord has commanded that those who preach the gospel should receive their living from the gospel."
      }
    ]
  };

  const selectVersion = (version: 'KJV' | 'NIV') => {
    setSelectedVersion(version);
    const randomVerse = verses[version][Math.floor(Math.random() * verses[version].length)];
    setCurrentVerse(randomVerse);
  };

  const handleSubmit = (audioBlob: Blob) => {
    // Simulate sending email to admin
    console.log(`Sending memory verse recording to Joseph Group from ${getGreeting()}`);
    console.log('Recording blob size:', audioBlob.size);
    setShowThankYou(true);
  };

  const retry = () => {
    setCurrentVerse(null);
    setSelectedVersion(null);
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
            You may retry to test proficiency on another verse.
          </p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full bg-orange-primary hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200"
            >
              Try Another Verse
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
            <BookOpen className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Memory Verse Quiz</h1>
          <p className="text-gray-600 text-lg">
            Welcome {getGreeting()}! Please select a Bible version to begin.
          </p>
        </div>

        {!selectedVersion ? (
          /* Version Selection */
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => selectVersion('KJV')}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-orange-200"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">King James Version</h3>
                <p className="text-gray-600">Traditional English translation</p>
              </div>
            </button>
            
            <button
              onClick={() => selectVersion('NIV')}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-orange-200"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">New International Version</h3>
                <p className="text-gray-600">Modern English translation</p>
              </div>
            </button>
          </div>
        ) : (
          /* Quiz Interface */
          <div className="space-y-8">
            {/* Verse Display */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4">{currentVerse.reference} ({selectedVersion})</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{currentVerse.text}"
              </p>
              <div className="bg-orange-100 border border-orange-300 rounded-xl p-4">
                <p className="text-orange-700 font-medium">
                  Please recite and briefly explain this verse without checking the material.
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

export default MemoryVerseQuiz;