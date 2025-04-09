
import React from 'react';
import { useContestStore } from '@/store/contestStore';

const FilterBar: React.FC = () => {
  const { userLocation } = useContestStore();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground mr-2">Showing contests in:</span>
        <span className="font-medium">{userLocation.city}, {userLocation.state}, {userLocation.country}</span>
      </div>
    </div>
  );
};

export default FilterBar;
