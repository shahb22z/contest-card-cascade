
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContestStore } from '@/store/contestStore';
import { ChevronDown } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { 
    countries, 
    states, 
    filters, 
    setFilter, 
    clearFilters 
  } = useContestStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <Select
            value={filters.country || ""}
            onValueChange={(value) => setFilter('country', value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Countries</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <Select
            value={filters.state || ""}
            onValueChange={(value) => setFilter('state', value || null)}
            disabled={!filters.country}
          >
            <SelectTrigger>
              <SelectValue placeholder={filters.country ? "Select State" : "Select Country First"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {filters.country && states[filters.country]?.map(state => (
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
            onClick={clearFilters}
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
