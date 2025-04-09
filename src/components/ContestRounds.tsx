
import React from 'react';
import { useContestStore } from '@/store/contestStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Timer } from "lucide-react";

interface ContestRoundsProps {
  contestId: string;
}

const ContestRounds: React.FC<ContestRoundsProps> = ({ contestId }) => {
  const { getContestRounds } = useContestStore();
  const rounds = getContestRounds(contestId);

  if (rounds.length === 0) {
    return (
      <div className="mt-4 text-center py-8 border border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">No rounds available for this contest.</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'ongoing':
        return 'bg-green-500 hover:bg-green-600';
      case 'completed':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-purple-500 hover:bg-purple-600';
    }
  };

  return (
    <div className="mt-6 space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Contest Rounds</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rounds.map((round) => (
          <Card key={round.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="p-4 pb-2 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{round.name}</CardTitle>
                <Badge className={getStatusColor(round.status)}>
                  {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                {round.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} className="text-purple-500" />
                <span>{formatDate(round.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-purple-500" />
                <span>{round.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Timer size={16} className="text-purple-500" />
                <span>{round.duration}</span>
              </div>
              
              {round.venue && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-purple-500" />
                  <span>{round.venue}</span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 cursor-pointer">
                View Details
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContestRounds;
