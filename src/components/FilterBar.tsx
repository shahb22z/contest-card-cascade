
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContestStore } from '@/store/contestStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FilterBar: React.FC = () => {
  const { 
    states, 
    filters, 
    setFilter, 
    clearFilters 
  } = useContestStore();

  // Hardcoded user's country - in a real app this would come from user profile/geolocation
  const userCountry = "United States";
  
  // Set the country filter on component mount
  React.useEffect(() => {
    if (!filters.country) {
      setFilter('country', userCountry);
    }
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <div className="flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <span className="text-muted-foreground">Country: </span>
            <span className="ml-2 font-medium">{userCountry}</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <Select
            value={filters.state || "all"}
            onValueChange={(value) => setFilter('state', value === "all" ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states[userCountry]?.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search contests..."
            value={filters.searchTerm || ""}
            onChange={(e) => setFilter('searchTerm', e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => {
              clearFilters();
              setFilter('country', userCountry);
            }}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
