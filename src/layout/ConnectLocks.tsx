import React, { Profiler, useEffect, useState } from "react";
import ProifileModal from "../components/ProifileModal";

interface Props {}
// Define the type for the avatar
interface Profile {
  id: number;
  name: string;
  avatarUrl: string;
  group: string;
}

// Placeholder function to fetch avatars from the database
const fetchTeamAvatars = async (): Promise<Profile[]> => {
  // Replace with actual API call to fetch avatars from the database
  return [
    {
      id: 1,
      name: "User 1",
      avatarUrl: "https://picsum.photos/200",
      group: "Team",
    },
    {
      id: 2,
      name: "User 2",
      avatarUrl: "https://picsum.photos/200",
      group: "Team",
    },
    {
      id: 3,
      name: "User 3",
      avatarUrl: "https://picsum.photos/200",
      group: "Team",
    },
    {
      id: 4,
      name: "User 4",
      avatarUrl: "https://picsum.photos/200",
      group: "Team",
    },
    {
      id: 5,
      name: "Hacker 1",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 6,
      name: "Hacker 2",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 7,
      name: "Hacker 3",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 8,
      name: "Hacker 4",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 9,
      name: "Hacker 5",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 10,
      name: "Hacker 6",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 11,
      name: "Hacker 7",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 12,
      name: "Hacker 8",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
    {
      id: 13,
      name: "Hacker 9",
      avatarUrl: "https://picsum.photos/200",
      group: "Hacker",
    },
  ];
};

const ConnectLocks: React.FC<Props> = ({}: Props): JSX.Element => {
  const [avatars, setAvatars] = useState<Profile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  useEffect(() => {
    // Fetch avatars from the database
    const fetchData = async () => {
      const teamData = await fetchTeamAvatars();
      setAvatars(teamData);
    };

    fetchData();
  }, []);

  const teamAvatars = avatars
    .filter((avatar) => avatar.group === "Team")
    .slice(0, 4);
  const hackerAvatars = avatars.filter((avatar) => avatar.group !== "Team");

  const openModal = (user: Profile) => {
    setSelectedUser(user);
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="mt-2 p-2 light-bg h-60">
      {/* Left side */}
      <div className="flex mb-2 h-full">
        <div className="w-1/4 p-2 overflow-hidden">
          <h2 className="text-xl font-bold mb-4 overflow-hidden">Team Name</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {teamAvatars.map((avatar) => (
              <div
                key={avatar.id}
                className="relative cursor-pointer"
                onClick={() => openModal(avatar)}
              >
                <img
                  src={avatar.avatarUrl}
                  alt={avatar.name}
                  className="w-full h-auto rounded-full mb-1 transition-transform duration-300 hover:scale-110 object-cover"
                  style={{ maxHeight: "100px", maxWidth: "100%" }} // Điều chỉnh kích thước tối đa cho ảnh
                />
              </div>
            ))}
          </div>
        </div>
        {/*<div className="self-center mx-2 border-r border-white h-[60%]"></div>*/}
        {/* Right side */}
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
                        src={avatar.avatarUrl}
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
          <ProifileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectLocks;
