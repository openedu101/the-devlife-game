import React, { useState } from "react";
import { ChangeGroupNameModal, ChangeNameModal, FindGroupModal, LeaveGroupModal } from "./ActionModal";

interface Profile {
  id: number;
  name: string;
  wallet_address: string;
  avatarUrl: string;
  group: string;
  isMentor: boolean;
  ref_list?: string[];
  groupMembers?: { id: number; name: string; role: 'Mentor' | 'Member' }[];// Thông tin thành viên trong nhóm
}


interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
  currentUser?: Profile; // Người dùng hiện tại đang xem modal
}

const ProfileModal: React.FC<Props> = ({ isOpen, onClose, user, currentUser }) => {
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>('');

  if (!isOpen || !user) return null;

  const isCurrentUser = currentUser?.id === user.id;

  const handleAction = (type: string) => {
    setActionType(type);
    setShowActionModal(true);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false)
  }
  // Các hàm xử lý chức năng (ví dụ: đổi tên, tìm group, rời group, đổi tên group nếu là mentor)
  const handleChangeName = async () => {
    // Mock logic for changing name, typically involves an API call
    console.log("Changing name...");
    // Close modal after action
    handleCloseActionModal();
  };

  const handleFindGroup = async () => {
    // Mock logic for finding a group
    console.log("Finding group...");
    // Close modal after action
    handleCloseActionModal();
  };

  const handleLeaveGroup = async () => {
    // Mock logic for leaving a group
    console.log("Leaving group...");
    // Close modal after action
    handleCloseActionModal();
  };

  const handleChangeGroupName = async () => {
    // Mock logic for changing group name, this would typically be allowed only for mentors
    console.log("Changing group name...");
    // Close modal after action
    handleCloseActionModal();
  };

  const renderActionModal = () => {
    switch (actionType) {
      case 'changeName':
        return <ChangeNameModal handle={handleChangeName} onClose={handleCloseActionModal} />;
      case 'findGroup':
        return <FindGroupModal handle={handleFindGroup} onClose={handleCloseActionModal} />;
      case 'leaveGroup':
        return <LeaveGroupModal handle={handleLeaveGroup} onClose={handleCloseActionModal} />;
      case 'changeGroupName':
        return <ChangeGroupNameModal handle={handleChangeGroupName} onClose={handleCloseActionModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white m-4 rounded-lg max-h-[50%] w-[50%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] flex flex-col justify-center items-center relative shadow-lg   dark:bg-gray-700">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="absolute -top-20 w-40 h-40 rounded-full object-cover border-4 border-white shadow-sm"
        />
        <h2 className="mt-20 text-xl font-bold text-sky-300">
          {user.name}#{user.id}
        </h2>
        <p className="text-md md:text-lg text-sky-300 mt-2">
          Group: {user.group}
        </p>
        {/* Thêm các input và button cho các chức năng cập nhật thông tin, rời nhóm, v.v. */}
        <div className="absolute top-4 right-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sky-200 font-bold py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="h-full text-sky-200 ">
          {/* Nội dung modal */}
          <p>Wallet Address: {user.wallet_address}</p>
          {isCurrentUser && user.ref_list && (
            <>
              <h3>Referral List:</h3>
              <ul className="text-sky-200">
                {user.ref_list.map((ref, index) => (
                  <li className="text-sky-200" key={index}>{ref}</li>
                ))}
              </ul>
            </>
          )}
          {user.groupMembers && (
            <>
              <h3>Group Members:</h3>
              <ul>
                {user.groupMembers.map((member) => (
                  <li key={member.id}>{member.name}#{member.id} - {member.role} </li>
                ))}
              </ul>
            </>
          )}
          {isCurrentUser && (
            <div className="flex gap-2 m-2">
              <button onClick={() => handleAction('changeName')}>Change Name</button>
              <button onClick={() => handleAction('findGroup')}>Find Group</button>
              <button onClick={() => handleAction('leaveGroup')}>Leave Group</button>
              {user.isMentor && <button onClick={() => handleAction('changeGroupName')}>Change Group Name</button>}
            </div>
          )}

        </div>

      {showActionModal && (
        <div className="absolute inset-0 bg-white p-4 rounded-lg shadow-lg m-4 flex flex-col justify-center items-center dark:bg-gray-700 stroke-lime-50 border border-solid border-sky-50">
          {renderActionModal()}
        </div>
      )}
      </div>

    </div>
  );
};

export default ProfileModal;
