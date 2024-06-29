import React from "react";
import { Team } from "./Team";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { UpdateTeamResponse } from "../types";

interface ConnectLocksProps {
  updateTeamData: UpdateTeamResponse | undefined;
  setUpdateTeamData: React.Dispatch<
    React.SetStateAction<UpdateTeamResponse | undefined>
  >;
  sendMessage: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter
  ) => void;
}

const ConnectLocks = ({
  updateTeamData,
  setUpdateTeamData,
  sendMessage,
}: ConnectLocksProps) => {
  // data đưa vào Modal

  // Giả sử đoạn mã này được thêm vào trong component `ConnectLocks`

  // Hàm này có thể được sử dụng để lấy thông tin người dùng hiện tại, ví dụ từ API hoặc từ trạng thái nào đó của ứng dụng
  // const fetchCurrentUser = async (): Promise<Profile> => {
  //   // Thay thế bằng logic thực tế để lấy thông tin người dùng hiện tại
  //   return {
  //     id: 1,
  //     name: "Current User",
  //     avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=",
  //     group: "Team",
  //     wallet_address: "0x123456789",
  //     isMentor: true,
  //     ref_list: ["User 2", "User 3"],
  //     groupMembers: [
  //       { id: 2, name: "User 2", role: "Member" },
  //       { id: 3, name: "User 3", role: "Member" },
  //       // Thêm các thành viên khác nếu cần
  //     ],
  //   };
  // };

  // useEffect(() => {
  //   // Fetch database
  //   const fetchData = async () => {
  //     const teamData = await fetchTeamAvatars();
  //     const currentUserData = await fetchCurrentUser();
  //     setAvatars(teamData);
  //     setCurrentUser(currentUserData);
  //     // lay ra user trong cung team voi nguoi dung hien tai
  //     const groupTeams: Profile[] = teamData
  //       .filter((avatar) => avatar.group === currentUserData.group)
  //       .slice(0, 4);
  //     // set Data
  //     setTeamAvatars(groupTeams);
  //   };

  //   fetchData();
  // }, []);
  // hiển thị các hacker trong hệ thống ( check người chơi khác team )

  return (
    <div className="mt-2 p-2 light-bg ">
      {/* Left side */}
      <div className="flex mb-2 h-full">
        <Team
          updateTeamData={updateTeamData}
          setUpdateTeamData={setUpdateTeamData}
          sendMessage={sendMessage}
        />

        {/*<div className="self-center mx-2 border-r border-white h-[60%]"></div>*/}
        {/* Right side */}
        {/* <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
          user={selectedUser}
          currentUser={currentUser}
        /> */}
      </div>
    </div>
  );
};
export default ConnectLocks;
