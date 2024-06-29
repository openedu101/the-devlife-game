import React, { useState } from 'react';

const Knowledge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { question: "Prerequisites", answers: ["Answer1", "Answer2", "Answer3", "Answer4"] },
    // Thêm các câu hỏi khác ở đây
  ];

  const handleAnswerClick = () => {
    setScore(score + 1);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="sm:w-full w-1/4 p-2 nes-container bg-[#de90bd] rounded-[24px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-white mb-2">
          <div>KNOWLEDGE</div>
          <div>{currentQuestion + 1}/{questions.length}</div>
        </div>
        {currentQuestion < questions.length ? (
          <>
            <div className="nes-balloon from-left nes-pointer p-2">
              <div className="text-black cursor-pointer">{questions[currentQuestion].question}</div>
            </div>
            <div className="nes-balloon from-right nes-pointer p-2">
              <div className="text-black cursor-pointer" onClick={handleAnswerClick}>
                {questions[currentQuestion].answers.join(' ')}
              </div>
            </div>
          </>
        ) : (
          <div className="text-white">You have completed all the questions! Your score is: {score}</div>
        )}
      </div>
    </div>
  );
};

export default Knowledge;