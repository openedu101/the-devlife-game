import React from "react";

interface Profile {
  id: number;
  name: string;
  avatarUrl: string;
  group: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
}

const ProifileModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white m-4 rounded-lg max-h-[70%] w-[70%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] flex flex-col justify-center items-center relative shadow-lg">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="absolute -top-20 w-40 h-40 rounded-full object-cover border-4 border-white shadow-sm"
        />
        <h2 className="mt-20 text-xl font-bold text-gray-800">
          {user.name}#{user.id}
        </h2>
        <p className="text-md md:text-lg text-gray-600 mt-2">
          Group: {user.group}
        </p>
        {/* Thêm các input và button cho các chức năng cập nhật thông tin, rời nhóm, v.v. */}
        <div className="absolute top-4 right-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProifileModal;
