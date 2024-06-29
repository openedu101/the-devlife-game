import React from 'react';

interface FireworksProps {
  role: string;
  roleImage: string;
  onClaim: () => void;
}

const Fireworks: React.FC<FireworksProps> = ({ role, roleImage, onClaim }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="text-white text-4xl mb-4">Congratulations!</div>
      <img src={roleImage} alt={role} className="w-1/5 h-auto mb-4" />
      <div className="text-white text-2xl mb-4">{role}</div>
      <button onClick={onClaim} className="nes-btn is-primary">Claim</button>
    </div>
  );
};

export default Fireworks;