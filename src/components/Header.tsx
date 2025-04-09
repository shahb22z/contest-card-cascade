
import React from 'react';
import { useContestStore } from '@/store/contestStore';

const Header: React.FC = () => {
  const { filteredContests, contests } = useContestStore();
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent animate-pulse-light">
        Upcoming Contests
      </h1>
      <p className="text-gray-500 mt-2">
        {filteredContests.length} of {contests.length} contests available
      </p>
    </div>
  );
};

export default Header;
