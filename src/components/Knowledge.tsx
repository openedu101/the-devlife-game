import { useState, useEffect } from 'react';
import { questions } from './utils/Questions';
import Fireworks from './ui/Fireworks';

const getFontSize = (text: string) => {
  return text.length > 20 ? 'text-sm' : 'text-base';
};

const Knowledge = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
    const savedQuestion = localStorage.getItem('currentQuestion');
    return savedQuestion ? JSON.parse(savedQuestion) : 0;
  });
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? JSON.parse(savedScore) : 0;
  });
  const [exp, setExp] = useState<number>(() => {
    const savedExp = localStorage.getItem('exp');
    return savedExp ? JSON.parse(savedExp) : 0;
  });
  const [showFireworks, setShowFireworks] = useState<boolean>(() => {
    const savedShowFireworks = localStorage.getItem('showFireworks');
    return savedShowFireworks ? JSON.parse(savedShowFireworks) : false;
  }); // State to show fireworks
  const [newRole, setNewRole] = useState<string>(() => {
    const savedRole = localStorage.getItem('newRole');
    return savedRole ? savedRole : '';
  }); // State to store new role

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('exp', JSON.stringify(exp));
    localStorage.setItem('showFireworks', JSON.stringify(showFireworks));
    localStorage.setItem('newRole', newRole);
  }, [currentQuestion, score, exp, showFireworks, newRole]);

  const handleAnswerClick = (answer: any) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setExp(exp + 10); // Increase exp if answered correctly
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const getRole = (score: number) => {
    if (score < 10) return "Newbie";
    if (score < 30) return "Intern";
    if (score < 60) return "Fresher";
    if (score < 90) return "Junior";
    return "Senior";
  };

  const getRoleImage = (role: string) => {
    switch (role) {
      case "Newbie":
        return "/assets/UI/newbie.png";
      case "Intern":
        return "/assets/UI/intern.png";
      case "Fresher":
        return "/assets/UI/fresher.png";
      case "Junior":
        return "/assets/UI/junior.png";
      case "Senior":
        return "/assets/UI/senior.png";
      default:
        return "/assets/UI/console_1.png";
    }
  };

  useEffect(() => {
    const role = getRole(score);
    if (role !== newRole) {
      setNewRole(role);
      setShowFireworks(true); // Show fireworks when role changes
    }
  }, [score]); // Only depend on score

  const handleClaim = () => {
    setShowFireworks(false); // Hide fireworks when claim button is clicked
  };

  const role = getRole(score);
  const roleImage = getRoleImage(role);

  return (
    <div className="sm:w-full w-1/4 p-2 nes-container bg-[#de90bd] rounded-[24px] flex flex-col justify-between">
      {showFireworks && (
        <Fireworks role={newRole} roleImage={getRoleImage(newRole)} onClaim={handleClaim} />
      )}
      <div>
        <div className="flex justify-between items-center text-white mb-2">
          <div>KNOWLEDGE</div>
        </div>
        {currentQuestion < questions.length ? (
          <>
            <div className="nes-balloon from-left nes-pointer p-2">
              <div className="text-black cursor-pointer">{questions[currentQuestion].question}</div>
            </div>
            <div className="flex justify-end">
              <div className="p-2">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`ml-5 text-black cursor-pointer ${getFontSize(answer)}`}
                    onClick={() => handleAnswerClick(answer)}
                    style={{ color: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'][index % 5] }}
                  >
                    <li className='nes-balloon from-right nes-pointer'>
                      {answer}
                    </li>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-center items-center'>
              <img
                src={roleImage}
                alt={role}
                className="mt-4 rounded-lg"
                style={{ width: "40%", height: "auto" }}
              />
            </div>

            <div className='flex justify-center items-center'>
              <div className="text-white mt-5 text-center">
                {role}. Exp: {exp}
              </div>
            </div>

            
          </>
        ) : (
          <div className="text-white">
            You have completed all the questions! Your score is: {score}. Your exp is: {exp}
          </div>
        )}
      </div>
    </div>
  );
};

export default Knowledge;