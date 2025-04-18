
import React, { useEffect } from 'react';
import ContestCard from './ContestCard';
import { useContestStore } from '@/store/contestStore';
import { Skeleton } from '@/components/ui/skeleton';

interface ContestGridProps {
  onSelectContest: (contestId: string) => void;
}

const ContestGrid: React.FC<ContestGridProps> = ({ onSelectContest }) => {
  const { filteredContests, isLoading, setUserLocationFilters } = useContestStore();
  
  // Apply user location filters on initial load
  useEffect(() => {
    setUserLocationFilters();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-48 rounded-lg w-full" />
            <Skeleton className="h-6 rounded-lg w-3/4" />
            <Skeleton className="h-4 rounded-lg w-full" />
            <Skeleton className="h-4 rounded-lg w-full" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 rounded-lg w-1/3" />
              <Skeleton className="h-6 rounded-lg w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredContests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="text-2xl font-semibold mb-2">No contests found in your area</h3>
        <p className="text-gray-500 mb-6">There are currently no contests available in your location</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredContests.map((contest, index) => (
        <ContestCard 
          key={contest.id} 
          contest={contest} 
          index={index} 
          onSelect={onSelectContest}
        />
      ))}
    </div>
  );
};

export default ContestGrid;
