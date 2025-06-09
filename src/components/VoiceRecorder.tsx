import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Trash2, Send, Clock } from 'lucide-react';

interface VoiceRecorderProps {
  onSubmit: (audioBlob: Blob) => void;
  timeLimit?: number;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSubmit, timeLimit = 60 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setHasRecording(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeLeft(timeLimit);

      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setHasRecording(false);
    setAudioBlob(null);
    setTimeLeft(timeLimit);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const submitRecording = () => {
    if (audioBlob) {
      onSubmit(audioBlob);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && hasRecording && audioBlob) {
      setTimeout(() => {
        submitRecording();
      }, 1000);
    }
  }, [timeLeft, hasRecording, audioBlob]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100">
      <div className="text-center space-y-6">
        {/* Timer */}
        <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-orange-primary'}`}>
          <Clock className="w-8 h-8 inline-block mr-2" />
          {formatTime(timeLeft)}
        </div>

        {/* Recording Status */}
        <div className="space-y-4">
          {isRecording && (
            <div className="flex items-center justify-center space-x-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Recording...</span>
            </div>
          )}

          {/* Controls */}
          {!hasRecording ? (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-medium transition-all duration-200 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-orange-primary hover:bg-orange-600'
              }`}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={playRecording}
                className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
                disabled={timeLeft === 0}
              >
                <Play className="w-6 h-6" />
              </button>
              
              <button
                onClick={deleteRecording}
                className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
                disabled={timeLeft === 0}
              >
                <Trash2 className="w-6 h-6" />
              </button>
              
              <button
                onClick={submitRecording}
                className="px-6 py-3 bg-orange-primary hover:bg-orange-600 text-white rounded-xl flex items-center space-x-2 transition-all duration-200 font-medium"
                disabled={timeLeft === 0}
              >
                <Send className="w-5 h-5" />
                <span>Submit</span>
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <p className="text-gray-600 text-sm">
          {!hasRecording 
            ? "Click the microphone to start recording your answer"
            : "Play to review, delete to re-record, or submit your answer"
          }
        </p>

        {timeLeft === 0 && hasRecording && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-orange-700 font-medium">
              Time's up! Your recording will be submitted automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;