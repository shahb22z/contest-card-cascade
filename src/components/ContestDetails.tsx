
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from "lucide-react";
import { Contest, useContestStore } from '@/store/contestStore';
import ContestRounds from './ContestRounds';

interface ContestDetailsProps {
  contestId: string;
  onClose: () => void;
}

const ContestDetails: React.FC<ContestDetailsProps> = ({ contestId, onClose }) => {
  const { contests } = useContestStore();
  const contest = contests.find(c => c.id === contestId);
  
  if (!contest) return null;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-90">
        <div className="relative h-72 overflow-hidden">
          <img 
            src={`${contest.imageUrl}?w=1200&h=600&fit=crop`}
            alt={contest.title} 
            className="w-full h-full object-cover"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-purple-500 hover:bg-purple-600">{contest.category}</Badge>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{contest.title}</h2>
          
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-purple-500" />
              <span>{formatDate(contest.date)} • {contest.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-purple-500" />
              <span>
                {contest.location.city}, {contest.location.state}, {contest.location.country}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} className="text-purple-500" />
              <span>Organized by {contest.organizer}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">About this Contest</h3>
            <p className="text-gray-700">{contest.description}</p>
          </div>
          
          <ContestRounds contestId={contest.id} />
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
