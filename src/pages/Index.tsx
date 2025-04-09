
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ContestGrid from '@/components/ContestGrid';
import { useContestStore } from '@/store/contestStore';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { fetchContests, isLoading } = useContestStore();

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <FilterBar />
        <div className="min-h-[300px]">
          <ContestGrid />
          {isLoading && (
            <div className="fixed inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-4 rounded-lg shadow-lg animate-pulse">
                Loading contests...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
