import React, { useEffect, useState } from 'react'

interface Props { }

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
    { id: 1, name: 'User 1', avatarUrl: 'https://picsum.photos/200', group: 'Team' },
    { id: 2, name: 'User 2', avatarUrl: 'https://picsum.photos/200', group: 'Team' },
    { id: 3, name: 'User 3', avatarUrl: 'https://picsum.photos/200', group: 'Team' },
    { id: 4, name: 'User 4', avatarUrl: 'https://picsum.photos/200', group: 'Team' },
    { id: 5, name: 'Hacker 1', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 6, name: 'Hacker 2', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 7, name: 'Hacker 3', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 8, name: 'Hacker 4', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 9, name: 'Hacker 5', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 10, name: 'Hacker 6', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 11, name: 'Hacker 7', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 12, name: 'Hacker 8', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
    { id: 13, name: 'Hacker 9', avatarUrl: 'https://picsum.photos/200', group: 'Hacker' },
  ];
};


const ConnectLocks: React.FC<Props> = ({ }: Props): JSX.Element => {
  const [avatars, setAvatars] = useState<Profile[]>([]);
  const [showAllHackers, setShowAllHackers] = useState<boolean>(false);

  useEffect(() => {
    // Fetch avatars from the database
    const fetchData = async () => {
      const teamData = await fetchTeamAvatars();
      setAvatars(teamData);
    };

    fetchData();
  }, []);

  const teamAvatars = avatars.filter(avatar => avatar.group === 'Team').slice(0, 4);
  const hackerAvatars = avatars.filter(avatar => avatar.group !== 'Team');

  return (
    <div className="mt-2 p-2 light-bg h-60">
      {/* Left side */}
      <div className="flex mb-2 h-full">
        <div className="w-1/4 p-2">
          <h2 className="text-xl font-bold mb-2 overflow-hidden">Team Name</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {teamAvatars.map(avatar => (
              <div key={avatar.id} className="relative">
                <img src={avatar.avatarUrl} alt={avatar.name} className="w-auto h-full h-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
        {/* Right side */}
        <div className="flex-1 p-2 overflow-hidden h-[14rem]">
          <h2 className="text-xl font-bold mb-2 ">Hacker</h2>
          <div className="mt-5 overflow-y-auto h-full">
            {Array.from({ length: Math.ceil(hackerAvatars.length / 4) }, (_, i) => (
              <div key={i} className="flex space-x-4 mb-4">
                {hackerAvatars.slice(i * 4, i * 4 + 4).map(avatar => (
                  <div key={avatar.id} className="flex flex-col items-center w-1/5">
                    <img src={avatar.avatarUrl} alt={avatar.name} className="w-auto h-20 rounded-full mb-1" />
                    <span className="text-sm text-center">{avatar.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>        </div>

      </div>
    </div>
  )
}

export default ConnectLocks
