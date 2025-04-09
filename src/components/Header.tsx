
import React from 'react';
import { useContestStore } from '@/store/contestStore';

const Header: React.FC = () => {
  const { filteredContests, userLocation } = useContestStore();
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent animate-pulse-light">
        Contests Near You
      </h1>
      <p className="text-gray-500 mt-2">
        {filteredContests.length} contests available in {userLocation.city}, {userLocation.country}
      </p>
    </div>
  );
};

export default Header;
