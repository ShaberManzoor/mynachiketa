"use client";
import React, { useEffect, useState } from "react";

interface UserData {
  id: string;
  username: string;
  perfs: {
    blitz?: { rating: number };
    rapid?: { rating: number };
    classical?: { rating: number };
  };
  count: {
    all: number;
  };
  profile?: {
    bio?: string;
    image?: string;
  };
}

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    try {
      const response = await fetch(`https://lichess.org/api/user/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        Lichess Profile Viewer
      </h1>
      <div className="flex gap-4 items-center mb-8 w-full max-w-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Lichess username"
          className="w-full p-3 border-2 border-gray-300 rounded-l-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchData}
          className="w-32 bg-gray-800 text-white py-3 rounded-r-md hover:bg-blue-700 transition duration-300"
        >
          Fetch Profile
        </button>
      </div>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {userData && (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={userData.profile?.image || "/avatar.png"}
              alt={`${userData.username}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData.username}
              </h2>
              <p className="text-gray-600 mt-2">
                {userData.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-xl text-gray-800">Games Played:</p>
            <p className="text-lg">{userData.count.all}</p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-800">Ratings:</p>
            <ul className="space-y-2 text-lg text-gray-700">
              {userData.perfs.blitz && (
                <li>Blitz: {userData.perfs.blitz.rating}</li>
              )}
              {userData.perfs.rapid && (
                <li>Rapid: {userData.perfs.rapid.rating}</li>
              )}
              {userData.perfs.classical && (
                <li>Classical: {userData.perfs.classical.rating}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
