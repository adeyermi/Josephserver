import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User, ArrowRight, BookOpen } from 'lucide-react';

const UserEntryPage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender) return;

    setIsSubmitting(true);
    
    // Simulate admin email notification
    console.log(`Joseph Group notification: ${gender === 'male' ? 'Brother' : 'Sister'} ${name} has started revision.`);
    
    setUser({ name: name.trim(), gender: gender as 'male' | 'female' });
    
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cream">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-orange-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-cream rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border-2 border-orange-primary">
            <BookOpen className="w-10 h-10 text-orange-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to JOSEPH</h1>
          <p className="text-gray-600">Joseph Group Revision Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-primary focus:border-transparent transition-all duration-200 bg-cream/50"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  gender === 'male'
                    ? 'border-orange-primary bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 bg-cream/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">👨</div>
                  <span className="font-medium">Male</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  gender === 'female'
                    ? 'border-orange-primary bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 bg-cream/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">👩</div>
                  <span className="font-medium">Female</span>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim() || !gender || isSubmitting}
            className="w-full bg-orange-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span>Begin Revision</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEntryPage;