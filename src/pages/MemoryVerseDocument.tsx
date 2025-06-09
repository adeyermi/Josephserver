import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, Home, Download, BookOpen } from 'lucide-react';

const MemoryVerseDocument = () => {
  const { getGreeting } = useUser();
  const navigate = useNavigate();

  const memoryVerses = [
    {
      reference: "Luke 24:26-27",
      kjv: "Ought not Christ to have suffered these things, and to enter into his glory? And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.",
      niv: "Did not the Messiah have to suffer these things and then enter his glory? And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself.",
      explanation: "This passage speaks to the necessity of Christ's suffering and the fulfillment of Old Testament prophecies concerning the Messiah."
    },
    {
      reference: "Matthew 1:18",
      kjv: "Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost.",
      niv: "This is how the birth of Jesus the Messiah came about: His mother Mary was pledged to be married to Joseph, but before they came together, she was found to be pregnant through the Holy Spirit.",
      explanation: "This verse introduces the miraculous conception of Jesus through the Holy Spirit, emphasizing the divine nature of Christ's incarnation."
    },
    {
      reference: "Proverbs 21:20",
      kjv: "There is treasure to be desired and oil in the dwelling of the wise; but a foolish man spendeth it up.",
      niv: "The wise store up choice food and olive oil, but fools gulp theirs down.",
      explanation: "This proverb contrasts wisdom and foolishness in managing resources, teaching the importance of careful stewardship and planning."
    },
    {
      reference: "1 Corinthians 9:13-14",
      kjv: "Do ye not know that they which minister about holy things live of the things of the temple? and they which wait at the altar are partakers with the altar? Even so hath the Lord ordained that they which preach the gospel should live of the gospel.",
      niv: "Don't you know that those who serve in the temple get their food from the temple, and that those who serve at the altar share in what is offered on the altar? In the same way, the Lord has commanded that those who preach the gospel should receive their living from the gospel.",
      explanation: "Paul explains the principle that those who serve in ministry should be supported by those who benefit from their service."
    }
  ];

  const downloadDocument = () => {
    // Simulate document download
    console.log('Downloading Memory Verse document for', getGreeting());
    alert('Memory Verse document download started!');
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
            <BookOpen className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Memory Verse Materials</h1>
          <p className="text-gray-600 text-lg">
            Study materials for {getGreeting()}
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

        {/* Memory Verses Content */}
        <div className="space-y-8">
          {memoryVerses.map((verse, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100">
              <h2 className="text-2xl font-bold text-orange-800 mb-6">{verse.reference}</h2>
              
              {/* KJV Version */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">King James Version (KJV)</h3>
                <p className="text-gray-600 italic leading-relaxed bg-orange-50 p-4 rounded-xl">
                  "{verse.kjv}"
                </p>
              </div>

              {/* NIV Version */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">New International Version (NIV)</h3>
                <p className="text-gray-600 italic leading-relaxed bg-orange-50 p-4 rounded-xl">
                  "{verse.niv}"
                </p>
              </div>

              {/* Explanation */}
              <div className="bg-orange-100 border border-orange-300 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Explanation</h3>
                <p className="text-orange-700 leading-relaxed">
                  {verse.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">Study Tips</h3>
          <div className="grid md:grid-cols-2 gap-6 text-orange-700">
            <div>
              <h4 className="font-semibold mb-2">Memorization Strategy</h4>
              <ul className="space-y-1 text-sm">
                <li>• Read the verse aloud multiple times</li>
                <li>• Break it into smaller chunks</li>
                <li>• Practice daily for consistency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Understanding Context</h4>
              <ul className="space-y-1 text-sm">
                <li>• Read surrounding verses</li>
                <li>• Study the historical background</li>
                <li>• Consider the author's purpose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryVerseDocument;