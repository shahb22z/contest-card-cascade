
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Contest, useContestStore } from '@/store/contestStore';

interface ContestCardProps {
  contest: Contest;
  index: number;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, index }) => {
  const { selectedContestId, selectContest } = useContestStore();
  const isSelected = selectedContestId === contest.id;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate animation delay based on index for staggered animation
  const animationDelay = `${index * 100}ms`;

  const handleCardClick = () => {
    selectContest(contest.id);
  };

  return (
    <Card 
      className={`h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 opacity-0 animate-card-enter hover:scale-[1.02] cursor-pointer ${
        isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : ''
      }`}
      style={{ animationDelay }}
      onClick={handleCardClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={`${contest.imageUrl}?w=600&h=300&fit=crop`} 
          alt={contest.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-500 hover:bg-purple-600">{contest.category}</Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl line-clamp-1">{contest.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-purple-500">
          <Calendar size={14} />
          <span>{formatDate(contest.date)} • {contest.time}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{contest.description}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          <span className="line-clamp-1">
            {contest.location.city}, {contest.location.state}, {contest.location.country}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-gray-500">By {contest.organizer}</div>
        <Badge variant="outline" className={`${
          isSelected ? 'bg-purple-200 text-purple-800' : 'bg-purple-50 text-purple-700'
        } hover:bg-purple-100 border-purple-200`}>
          {isSelected ? 'Selected' : 'View Details'}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
