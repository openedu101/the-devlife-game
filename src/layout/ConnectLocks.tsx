import React, { useEffect, useState } from 'react'
import ProfileModal from '../components/ProfileModal';

interface Profile {
  id: number;
  name: string;
  avatarUrl: string;
  group: string;
  wallet_address: string;
  isMentor?: boolean;
  ref_list?: string[];
  groupMembers?: { id: number; name: string; role: 'Mentor' | 'Member' }[];
}

// Placeholder function to fetch avatars from the database
const fetchTeamAvatars = async (): Promise<Profile[]> => {
  // Replace with actual API call to fetch avatars from the database
  return [
    {
      id: 1,
      name: "Current User",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=",
      group: "Team",
      wallet_address: "0x123456789",
      isMentor: true,
      ref_list: ["User 2", "User 3"],
      groupMembers: [
        { id: 2, name: "User 2", role: 'Member' },
        { id: 3, name: "User 3", role: 'Member' },
        // Thêm các thành viên khác nếu cần
      ],
    },
    // {
    //   id: 2,
    //   name: "User 2",
    //   avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
    //   group: "Team",
    // },
    // {
    //   id: 3,
    //   name: "User 3",
    //   avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
    //   group: "Team",
    // },
    // {
    //   id: 4,
    //   name: "User 4",
    //   avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 1, name: "User 1", role: 'Mentor' }, { id: 2, name: "grou", role: 'Member' },],
    //   group: "Team",
    // },
    {
      id: 5,
      name: "Hacker 1",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 6,
      name: "Hacker 2",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 7,
      name: "Hacker 3",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 8,
      name: "Hacker 4",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 9,
      name: "Hacker 5",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 10,
      name: "Hacker 6",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 11,
      name: "Hacker 7",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 12,
      name: "Hacker 8",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
    {
      id: 13,
      name: "Hacker 9",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=", wallet_address: "0x123456", isMentor: false, ref_list: [], groupMembers: [{ id: 2, name: "grou", role: 'Member' },],
      group: "Hacker",
    },
  ];
};

interface Props { }

const ConnectLocks: React.FC<Props> = (): JSX.Element => {

  const [avatars, setAvatars] = useState<Profile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // data đưa vào Modal 
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

  // Giả sử đoạn mã này được thêm vào trong component `ConnectLocks`
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [teamAvatars, setTeamAvatars] = useState<Profile[]>([]);

  // Hàm này có thể được sử dụng để lấy thông tin người dùng hiện tại, ví dụ từ API hoặc từ trạng thái nào đó của ứng dụng
  const fetchCurrentUser = async (): Promise<Profile> => {
    // Thay thế bằng logic thực tế để lấy thông tin người dùng hiện tại
    return {
      id: 1,
      name: "Current User",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=",
      group: "Team",
      wallet_address: "0x123456789",
      isMentor: true,
      ref_list: ["User 2", "User 3"],
      groupMembers: [
        { id: 2, name: "User 2", role: 'Member' },
        { id: 3, name: "User 3", role: 'Member' },
        // Thêm các thành viên khác nếu cần
      ],
    };
  };

  useEffect(() => {
    // Fetch database
    const fetchData = async () => {
      const teamData = await fetchTeamAvatars();
      const currentUserData = await fetchCurrentUser();
      setAvatars(teamData);
      setCurrentUser(currentUserData);
      // lay ra user trong cung team voi nguoi dung hien tai
      const groupTeams: Profile[] = teamData
        .filter((avatar) => avatar.group === currentUserData.group)
        .slice(0, 4);
      // set Data 
      setTeamAvatars(groupTeams);
    };

    fetchData();
  }, []);
  // hiển thị các hacker trong hệ thống ( check người chơi khác team )
  const hackerAvatars = avatars.filter((avatar) => avatar.group !== "Team");

  const openModal = (user: Profile) => {
    setSelectedUser(user);
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToGroup = () => {
    // Logic để thêm user vào nhóm, ví dụ gọi API
    console.log('Adding user to group...');
    // Sau khi thêm thành công, cập nhật state để hiển thị
    // Giả sử đây là response sau khi thêm thành viên mới
    const newUser: Profile = {
      id: 10, // Giả sử ID người dùng hiện tại
      name: "User new",
      avatarUrl: "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=",
      group: "Team",
      wallet_address: "0x123456789",
      isMentor: true,
      ref_list: ["User 2", "User 3"],
      groupMembers: [
        { id: 4, name: "User 4", role: 'Member' },
        { id: 5, name: "User 5", role: 'Member' },
      ],
    };
    // data khi them mot nguoi choi moi vao team
    setTeamAvatars([...teamAvatars, newUser]);
  };
  const isMobile: boolean = window.innerWidth < 768;

  return (
    <div className="mt-2 p-2 light-bg ">
      {/* Left side */}
      <div className={`${isMobile ? "flex-col mb-2 h-full": "flex mb-2 h-full"}`}>
        {isMobile ? (
          <div className="w-full p-2 overflow-hidden">
            <h2 className="text-xl font-bold mb-4 overflow-hidden">Team Name</h2>
            <div className="grid grid-cols-4 gap-2 ">
              {/* Ô đầu tiên là chính mình */}

              {teamAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="relative cursor-pointer"
                  onClick={() => openModal(avatar)}
                >
                  <img
                    src={`${avatar.avatarUrl}${avatar.name}`}
                    alt={avatar.name}
                    className="w-full h-auto rounded-full mb-1 transition-transform duration-300 hover:scale-110 object-cover"
                    style={{ maxHeight: "100px", maxWidth: "100%" }} // Điều chỉnh kích thước tối đa cho ảnh
                  />
                </div>
              ))}
              {/* Nếu team chưa đầy, hiển thị nút '+' để thêm user */}
              {teamAvatars.length <= 3 && (
                <div
                  className="flex justify-center items-center w-8 h-auto rounded-full bg-dark p-1 transition-transform duration-300 hover:scale-110 border border-solid border-sky-50"
                  onClick={handleAddToGroup}
                  style={{ maxHeight: "100px", maxWidth: "100%" }} // Điều chỉnh kích thước tối đa cho ảnh
                >
                  +
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-1/4 p-2 overflow-hidden">
            <h2 className="text-xl font-bold mb-4 overflow-hidden">Team Name</h2>
            <div className="grid grid-cols-2 gap-2 ">
              {/* Ô đầu tiên là chính mình */}

              {teamAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="relative cursor-pointer"
                  onClick={() => openModal(avatar)}
                >
                  <img
                    src={`${avatar.avatarUrl}${avatar.name}`}
                    alt={avatar.name}
                    className="w-full h-auto rounded-full mb-1 transition-transform duration-300 hover:scale-110 object-cover"
                    style={{ maxHeight: "100px", maxWidth: "100%" }} // Điều chỉnh kích thước tối đa cho ảnh
                  />
                </div>
              ))}
              {/* Nếu team chưa đầy, hiển thị nút '+' để thêm user */}
              {teamAvatars.length <= 3 && (
                <div
                  className="flex justify-center items-center w-8 h-auto rounded-full bg-dark p-1 transition-transform duration-300 hover:scale-110 border border-solid border-sky-50"
                  onClick={handleAddToGroup}
                  style={{ maxHeight: "100px", maxWidth: "100%" }} // Điều chỉnh kích thước tối đa cho ảnh
                >
                  +
                </div>
              )}
            </div>
          </div>
        )}
        {/*<div className="self-center mx-2 border-r border-white h-[60%]"></div>*/}
        {/* Right side */}
        {isMobile ? (
          <div
            className="flex-1 p-2"
            style={{ maxHeight: "14rem" }}
          >
            <h2 className="text-xl font-bold mb-2">Hacker</h2>
            <div
              className="mt-5 overflow-y-auto"
              style={{ maxHeight: "calc(14rem - 3rem)" }}
            >
              {Array.from(
                { length: Math.ceil(hackerAvatars.length / 4) },
                (_, i) => (
                  <div key={i} className="flex space-x-4 mb-4">
                    {hackerAvatars.slice(i * 4, i * 4 + 4).map((avatar) => (
                      <div
                        key={avatar.id}
                        className="group flex flex-col items-center w-1/5 cursor-pointer"
                        onClick={() => openModal(avatar)}
                      >
                        <img
                          src={`${avatar.avatarUrl}${avatar.name}`}
                          alt={avatar.name}
                          className="w-full h-auto rounded-full mb-1 transition-transform duration-300 hover:scale-105 object-cover"
                          style={{ maxHeight: "100px", maxWidth: "100%" }}
                        />
                        <span className="text-sm md:text-md group-hover:text-black text-center">
                          {avatar.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(!isModalOpen)}
              user={selectedUser}
              currentUser={currentUser}
            />
          </div>

        ) : (
          <div
            className="flex-1 p-2"
            style={{ maxHeight: "14rem" }}
          >
            <h2 className="text-xl font-bold mb-2">Hacker</h2>
            <div
              className="mt-5 overflow-y-auto"
              style={{ maxHeight: "calc(14rem - 3rem)" }}
            >
              {Array.from(
                { length: Math.ceil(hackerAvatars.length / 4) },
                (_, i) => (
                  <div key={i} className="flex space-x-4 mb-4">
                    {hackerAvatars.slice(i * 4, i * 4 + 4).map((avatar) => (
                      <div
                        key={avatar.id}
                        className="group flex flex-col items-center w-1/5 cursor-pointer"
                        onClick={() => openModal(avatar)}
                      >
                        <img
                          src={`${avatar.avatarUrl}${avatar.name}`}
                          alt={avatar.name}
                          className="w-full h-auto rounded-full mb-1 transition-transform duration-300 hover:scale-105 object-cover"
                          style={{ maxHeight: "100px", maxWidth: "100%" }}
                        />
                        <span className="text-sm md:text-md group-hover:text-black text-center">
                          {avatar.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(!isModalOpen)}
              user={selectedUser}
              currentUser={currentUser}
            />
          </div>

        )}
      </div>
    </div>
  );
};
export default ConnectLocks
