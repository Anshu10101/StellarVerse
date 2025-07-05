"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spaceQuizQuestions } from "@/constants/quizData";
import { audioPlayer } from "@/utils/audio";

interface QuizCategoryCardProps {
  title: string;
  description: string;
  difficulty: string;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === spaceQuizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      audioPlayer.playCorrect();
    } else {
      audioPlayer.playWrong();
    }
    
    setShowExplanation(true);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < spaceQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-[#0a0a1a]/90 backdrop-blur-lg rounded-xl border border-purple-500/30 p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed! 🎉</h2>
          <p className="text-2xl text-purple-400 mb-6">
            Your Score: {score} / {spaceQuizQuestions.length}
          </p>
          <p className="text-gray-300 mb-8">
            {score === spaceQuizQuestions.length
              ? "Perfect score! You're a space expert! 🌟"
              : score >= spaceQuizQuestions.length / 2
              ? "Great job! Keep exploring the cosmos! 🚀"
              : "Keep learning about space! Try again! 💫"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartQuiz}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentQuizQuestion = spaceQuizQuestions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex justify-between items-center">
          <span className="text-purple-400">
            Question {currentQuestion + 1}/{spaceQuizQuestions.length}
          </span>
          <span className="text-purple-400">Score: {score}</span>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-[#0a0a1a]/90 backdrop-blur-lg rounded-xl border border-purple-500/30 p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {currentQuizQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === null
                    ? "bg-purple-900/20 hover:bg-purple-900/30 border border-purple-500/30"
                    : selectedAnswer === index
                    ? index === currentQuizQuestion.correctAnswer
                      ? "bg-green-500/20 border-green-500"
                      : "bg-red-500/20 border-red-500"
                    : index === currentQuizQuestion.correctAnswer
                    ? "bg-green-500/20 border-green-500"
                    : "bg-purple-900/20 border-purple-500/30"
                }`}
              >
                <span className="text-white">{option}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-500/30"
              >
                <p className="text-gray-300">{currentQuizQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="w-full bg-purple-900/20 rounded-full h-2">
          <motion.div
            className="bg-purple-600 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentQuestion + 1) / spaceQuizQuestions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

function QuizCategoryCard({ title, description, difficulty }: QuizCategoryCardProps) {
  return (
    <div className="bg-black/30 border border-purple-500/30 rounded-lg p-5 hover:border-purple-400 transition-all cursor-pointer">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-purple-400">Difficulty: {difficulty}</span>
        <span className="text-sm bg-purple-900/50 px-3 py-1 rounded-full text-white">Coming Soon</span>
      </div>
    </div>
  );
} 