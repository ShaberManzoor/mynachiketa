"use client";
import React, { useEffect, useState } from "react";

type LeaderboardData = {
  id: string;
  username: string;
  perfs: {
    bullet: {
      rating: number;
      progress: number;
    };
  };
  online?: boolean;
};

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[] | null>(
    null
  );

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(
        `https://lichess.org/api/player/top/25/bullet`
      );
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboard(data.users);
      console.log(leaderboard);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md rounded-md p-6 w-full">
      <h3 className="text-3xl font-semibold mb-6 text-center">Leaderboard</h3>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex gap-8 border-b-[1px] border-b-white pb-4">
          <p className="text-lg font-semibold w-16 text-center">Rank</p>
          <p className="flex-1 text-lg font-semibold text-center">Username</p>
          <p className="text-lg font-semibold w-24 text-center">Ratings</p>
          <p className="text-lg font-semibold w-28 text-center">Progress</p>
        </div>
        {leaderboard &&
          leaderboard.map((player: any, ind: number) => (
            <div
              key={ind}
              className="flex gap-8 items-center border-b-[1px] border-b-gray-200 py-4 hover:bg-gray-800 transition-all"
            >
              <p className="w-16 text-center text-xl">{ind + 1}</p>
              <p className="flex-1 text-lg text-center text-xl">
                {player.username}
              </p>
              <p className="w-24 text-center text-xl">
                {player.perfs.bullet.rating}
              </p>
              <p className="w-28 text-center text-xl">
                {player.perfs.bullet.progress}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
