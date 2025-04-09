
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ContestGrid from '@/components/ContestGrid';
import ContestDetails from '@/components/ContestDetails';
import { useContestStore } from '@/store/contestStore';

const Index: React.FC = () => {
  const { fetchContests, isLoading, selectedContestId, selectContest } = useContestStore();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const handleSelectContest = (contestId: string) => {
    selectContest(contestId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <FilterBar />
        <div className="min-h-[300px]">
          <ContestGrid onSelectContest={handleSelectContest} />
          
          {isLoading && (
            <div className="fixed inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-4 rounded-lg shadow-lg animate-pulse">
                Loading contests...
              </div>
            </div>
          )}
          
          {showDetails && selectedContestId && (
            <ContestDetails contestId={selectedContestId} onClose={handleCloseDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
