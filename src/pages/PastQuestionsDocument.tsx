import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, Home, Download, FileQuestion } from 'lucide-react';

const PastQuestionsDocument = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Sample questions for each week (in a real app, these would be loaded from actual PDFs)
  const weeklyQuestions = {
    1: {
      title: "Creation and Early History",
      questions: [
        "Explain the significance of the creation account in Genesis 1-2 and what it teaches us about God's nature.",
        "Discuss the fall of man in Genesis 3 and its consequences for humanity.",
        "What lessons can we learn from the story of Cain and Abel?",
        "Describe the genealogies in Genesis and their importance in biblical history.",
        "How does the flood narrative demonstrate God's justice and mercy?"
      ]
    },
    2: {
      title: "The Patriarchs",
      questions: [
        "Describe Noah's faith and obedience during the flood and its significance.",
        "Explain God's covenant with Abraham and its importance for Israel and all nations.",
        "What can we learn from Abraham's willingness to sacrifice Isaac?",
        "Discuss Isaac's character and his role in continuing God's promise.",
        "How did Jacob's name change to Israel reflect his spiritual transformation?"
      ]
    },
    3: {
      title: "Joseph and Early Israel",
      questions: [
        "Discuss Joseph's journey from pit to palace and the lessons we can learn.",
        "How did God use Joseph's trials and difficulties for good?",
        "What does Joseph's forgiveness of his brothers teach us about reconciliation?",
        "Explain how Joseph's leadership in Egypt preserved many lives.",
        "Describe the migration of Jacob's family to Egypt and its significance."
      ]
    },
    4: {
      title: "Moses and the Exodus",
      questions: [
        "Explain the significance of Moses' burning bush experience and his calling.",
        "Discuss the ten plagues and how they demonstrated God's power over Egypt.",
        "What lessons do we learn from the institution of the Passover?",
        "Describe the crossing of the Red Sea and its spiritual significance.",
        "How did the wilderness experience prepare Israel for the Promised Land?"
      ]
    },
    5: {
      title: "Law and Wilderness",
      questions: [
        "Describe the giving of the Law at Mount Sinai and its importance.",
        "Explain the significance of the golden calf incident and its consequences.",
        "What do the wilderness wanderings teach us about faith and obedience?",
        "Discuss the role of the tabernacle in Israel's worship.",
        "How did the priestly system point forward to Christ?"
      ]
    },
    6: {
      title: "Conquest and Judges",
      questions: [
        "Discuss Joshua's leadership during the conquest of Canaan.",
        "Explain the significance of the battle of Jericho and God's intervention.",
        "What lessons do we learn from the period of the Judges?",
        "Describe the cycle of sin, oppression, and deliverance in Judges.",
        "How does the book of Ruth demonstrate God's providence?"
      ]
    },
    7: {
      title: "The United Kingdom",
      questions: [
        "Describe King David's heart after God and what made him special.",
        "Explain the significance of Solomon's wisdom and the building of the temple.",
        "What led to the division of the kingdom after Solomon's death?",
        "Discuss the importance of the Davidic covenant for messianic hope.",
        "How did the united kingdom represent the peak of Israel's earthly glory?"
      ]
    },
    8: {
      title: "Divided Kingdom and Exile",
      questions: [
        "Discuss the role of prophets in the divided kingdom period.",
        "Explain the reasons for exile and the lessons Israel needed to learn.",
        "How did God preserve His people through difficult times?",
        "Describe the return from exile and the rebuilding of Jerusalem.",
        "What hope did the prophets offer for the future Messiah?"
      ]
    }
  };

  const downloadWeek = (week: number) => {
    console.log(`Downloading Week ${week} document for`, getGreeting());
    alert(`Week ${week} Past Questions document download started!`);
  };

  if (selectedWeek) {
    const weekData = weeklyQuestions[selectedWeek as keyof typeof weeklyQuestions];
    return (
      <div className="min-h-screen p-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setSelectedWeek(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Week Selection</span>
            </button>
            
            <button
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-orange-primary">
              <FileQuestion className="w-10 h-10 text-orange-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Week {selectedWeek} Past Questions</h1>
            <h2 className="text-xl text-orange-600 font-semibold mb-4">{weekData.title}</h2>
            <p className="text-gray-600">Study materials for {getGreeting()}</p>
          </div>

          {/* Download Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => downloadWeek(selectedWeek)}
              className="bg-orange-primary hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>Download Week {selectedWeek} PDF</span>
            </button>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {weekData.questions.map((question, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/documents')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous Page</span>
          </button>
          
          <button
            onClick={() => navigate('/home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-orange-primary">
            <FileQuestion className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Past Questions Materials</h1>
          <p className="text-gray-600 text-lg">
            Select a week (1-8) to view and download past questions for {getGreeting()}
          </p>
        </div>

        {/* Week Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-orange-200"
            >
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold text-lg">{week}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Week {week}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {weeklyQuestions[week as keyof typeof weeklyQuestions].title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">How to Use Past Questions</h3>
          <div className="grid md:grid-cols-3 gap-6 text-orange-700">
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <h4 className="font-semibold mb-2">Select Week</h4>
              <p className="text-sm">Choose from weeks 1-8 based on your study focus</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📖</div>
              <h4 className="font-semibold mb-2">Review Questions</h4>
              <p className="text-sm">Study the questions and prepare comprehensive answers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💾</div>
              <h4 className="font-semibold mb-2">Download PDF</h4>
              <p className="text-sm">Save the materials for offline study and practice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastQuestionsDocument;