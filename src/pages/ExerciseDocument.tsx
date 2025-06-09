import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, Home, Download, Dumbbell } from 'lucide-react';

const ExerciseDocument = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();

  const biblicalEras = [
    {
      name: "Creation Era",
      description: "The beginning of all things as recorded in Genesis 1-11",
      keyFigures: ["Adam", "Eve", "Noah"],
      books: ["Genesis"],
      timeframe: "Beginning of time - c. 2000 BC"
    },
    {
      name: "Patriarchal Era",
      description: "The time of the founding fathers of Israel",
      keyFigures: ["Abraham", "Isaac", "Jacob"],
      books: ["Genesis"],
      timeframe: "c. 2000 - 1700 BC"
    },
    {
      name: "Egyptian Bondage Era",
      description: "Israel's time of slavery in Egypt",
      keyFigures: ["Joseph", "Moses", "Aaron"],
      books: ["Genesis", "Exodus"],
      timeframe: "c. 1700 - 1400 BC"
    },
    {
      name: "Wilderness Era",
      description: "Israel's journey from Egypt to the Promised Land",
      keyFigures: ["Moses", "Aaron", "Joshua"],
      books: ["Exodus", "Leviticus", "Numbers", "Deuteronomy"],
      timeframe: "c. 1400 - 1360 BC"
    },
    {
      name: "Conquest Era",
      description: "The conquest and settlement of the Promised Land",
      keyFigures: ["Joshua", "Caleb", "Rahab"],
      books: ["Joshua"],
      timeframe: "c. 1400 - 1350 BC"
    },
    {
      name: "Judges Era",
      description: "The period of tribal leadership before the monarchy",
      keyFigures: ["Deborah", "Gideon", "Samson"],
      books: ["Judges", "Ruth"],
      timeframe: "c. 1350 - 1050 BC"
    },
    {
      name: "United Kingdom Era",
      description: "The golden age of Israel under three kings",
      keyFigures: ["Saul", "David", "Solomon"],
      books: ["1 Samuel", "2 Samuel", "1 Kings", "1 Chronicles", "2 Chronicles"],
      timeframe: "c. 1050 - 930 BC"
    },
    {
      name: "Divided Kingdom Era",
      description: "The split into Northern (Israel) and Southern (Judah) kingdoms",
      keyFigures: ["Elijah", "Elisha", "Isaiah"],
      books: ["1 Kings", "2 Kings", "2 Chronicles", "Prophetic books"],
      timeframe: "c. 930 - 586 BC"
    }
  ];

  const downloadDocument = () => {
    console.log('Downloading Exercise document for', getGreeting());
    alert('Exercise document download started!');
  };

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
        <div className="text-center mb-8">
          <div className="bg-cream rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-orange-primary">
            <Dumbbell className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exercise Materials</h1>
          <p className="text-gray-600 text-lg">
            Biblical Eras Study Guide for {getGreeting()}
          </p>
        </div>

        {/* Download Button */}
        <div className="text-center mb-8">
          <button
            onClick={downloadDocument}
            className="bg-orange-primary hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            <span>Download Document</span>
          </button>
        </div>

        {/* Biblical Eras Content */}
        <div className="space-y-8">
          {biblicalEras.map((era, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-orange-800">{era.name}</h2>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {era.timeframe}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed bg-orange-50 p-4 rounded-xl">
                {era.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Figures */}
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">Key Figures</h3>
                  <div className="space-y-2">
                    {era.keyFigures.map((figure, figureIndex) => (
                      <span key={figureIndex} className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
                        {figure}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Books */}
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">Biblical Books</h3>
                  <div className="space-y-2">
                    {era.books.map((book, bookIndex) => (
                      <span key={bookIndex} className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
                        {book}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">Study Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-6 text-orange-700">
            <div>
              <h4 className="font-semibold mb-2">Era Description</h4>
              <p className="text-sm">Provide a comprehensive overview of the era's significance and main events.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Figures</h4>
              <p className="text-sm">Name at least three important people and their contributions to the era.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Biblical Books</h4>
              <p className="text-sm">Identify the books where the stories and events of this era are recorded.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDocument;