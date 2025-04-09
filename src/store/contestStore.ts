
import { create } from 'zustand';

// Types
export interface Contest {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  category: string;
  organizer: string;
}

interface ContestStore {
  contests: Contest[];
  filteredContests: Contest[];
  countries: string[];
  states: Record<string, string[]>;  // states by country
  filters: {
    country: string | null;
    state: string | null;
    searchTerm: string;
  };
  isLoading: boolean;
  // Actions
  setContests: (contests: Contest[]) => void;
  setFilter: (key: 'country' | 'state' | 'searchTerm', value: string | null) => void;
  clearFilters: () => void;
  fetchContests: () => Promise<void>;
}

export const useContestStore = create<ContestStore>((set, get) => ({
  contests: [],
  filteredContests: [],
  countries: [],
  states: {},
  filters: {
    country: null,
    state: null,
    searchTerm: '',
  },
  isLoading: false,
  
  setContests: (contests) => {
    const countries = [...new Set(contests.map(contest => contest.location.country))].sort();
    const states: Record<string, string[]> = {};
    
    // Group states by country
    countries.forEach(country => {
      const countryContests = contests.filter(c => c.location.country === country);
      states[country] = [...new Set(countryContests.map(c => c.location.state))].sort();
    });
    
    set({ 
      contests, 
      filteredContests: contests,
      countries,
      states
    });
  },
  
  setFilter: (key, value) => {
    const { contests, filters } = get();
    const newFilters = { ...filters, [key]: value };
    
    // If country changed and state is set, reset state if it doesn't belong to the new country
    if (key === 'country' && filters.state && 
        value !== null && 
        !get().states[value].includes(filters.state)) {
      newFilters.state = null;
    }

    // Apply filters
    let filtered = contests;
    
    if (newFilters.country) {
      filtered = filtered.filter(contest => 
        contest.location.country === newFilters.country
      );
    }
    
    if (newFilters.state) {
      filtered = filtered.filter(contest => 
        contest.location.state === newFilters.state
      );
    }
    
    if (newFilters.searchTerm) {
      const searchLower = newFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(contest => 
        contest.title.toLowerCase().includes(searchLower) || 
        contest.description.toLowerCase().includes(searchLower) ||
        contest.category.toLowerCase().includes(searchLower)
      );
    }
    
    set({ 
      filters: newFilters,
      filteredContests: filtered 
    });
  },
  
  clearFilters: () => {
    set(state => ({ 
      filters: {
        country: null,
        state: null,
        searchTerm: ''
      },
      filteredContests: state.contests 
    }));
  },
  
  fetchContests: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const contests = getMockContests();
      get().setContests(contests);
    } catch (error) {
      console.error("Failed to fetch contests:", error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Mock data generator
const getMockContests = (): Contest[] => [
  {
    id: "1",
    title: "National Coding Championship",
    description: "Join the largest coding competition in the US. Test your skills against top programmers.",
    date: "2025-05-15",
    time: "09:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    location: {
      country: "United States",
      state: "California",
      city: "San Francisco"
    },
    category: "Technology",
    organizer: "TechConf Inc."
  },
  {
    id: "2",
    title: "International Art Expo",
    description: "Showcase your artistic talents at this prestigious international exhibition.",
    date: "2025-06-20",
    time: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    location: {
      country: "France",
      state: "Île-de-France",
      city: "Paris"
    },
    category: "Art",
    organizer: "Global Art Foundation"
  },
  {
    id: "3",
    title: "Startup Pitch Competition",
    description: "Present your innovative business idea to top venture capitalists and investors.",
    date: "2025-05-25",
    time: "02:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    location: {
      country: "United States",
      state: "New York",
      city: "New York City"
    },
    category: "Business",
    organizer: "Venture Fund Network"
  },
  {
    id: "4",
    title: "Music Festival",
    description: "A celebration of diverse music genres featuring both established and emerging artists.",
    date: "2025-07-10",
    time: "04:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    location: {
      country: "United Kingdom",
      state: "England",
      city: "London"
    },
    category: "Music",
    organizer: "Sound Waves Productions"
  },
  {
    id: "5",
    title: "Data Science Hackathon",
    description: "Solve real-world problems using machine learning and data analysis.",
    date: "2025-06-05",
    time: "09:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    location: {
      country: "Canada",
      state: "Ontario",
      city: "Toronto"
    },
    category: "Technology",
    organizer: "Data Scientists Guild"
  },
  {
    id: "6",
    title: "Culinary Competition",
    description: "Showcase your culinary skills and compete for the title of Master Chef.",
    date: "2025-08-15",
    time: "11:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
    location: {
      country: "Italy",
      state: "Lazio",
      city: "Rome"
    },
    category: "Food",
    organizer: "Gourmet Association"
  },
  {
    id: "7",
    title: "Photography Contest",
    description: "Submit your best photographs and get a chance to be featured in National Geographic.",
    date: "2025-09-20",
    time: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1554080353-a576cf803bda",
    location: {
      country: "Japan",
      state: "Tokyo",
      city: "Tokyo"
    },
    category: "Photography",
    organizer: "World Photography Organization"
  },
  {
    id: "8",
    title: "Science Fair",
    description: "Present your scientific research and innovations to a panel of experts.",
    date: "2025-06-30",
    time: "09:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb",
    location: {
      country: "United States",
      state: "Massachusetts",
      city: "Boston"
    },
    category: "Science",
    organizer: "National Science Foundation"
  },
  {
    id: "9",
    title: "Marathon Championship",
    description: "Test your endurance in this challenging marathon across beautiful landscapes.",
    date: "2025-10-05",
    time: "07:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3",
    location: {
      country: "Australia",
      state: "New South Wales",
      city: "Sydney"
    },
    category: "Sports",
    organizer: "Global Athletics Association"
  },
  {
    id: "10",
    title: "Fashion Design Competition",
    description: "Present your unique fashion designs and get recognized by industry experts.",
    date: "2025-11-15",
    time: "06:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    location: {
      country: "France",
      state: "Île-de-France",
      city: "Paris"
    },
    category: "Fashion",
    organizer: "Fashion Council"
  },
  {
    id: "11",
    title: "Robotics Challenge",
    description: "Design and program robots to complete complex tasks.",
    date: "2025-07-25",
    time: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
    location: {
      country: "Germany",
      state: "Bavaria",
      city: "Munich"
    },
    category: "Technology",
    organizer: "Tech Innovation Lab"
  },
  {
    id: "12",
    title: "Literary Awards",
    description: "Submit your literary works for a chance to win prestigious awards and recognition.",
    date: "2025-08-30",
    time: "05:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
    location: {
      country: "United Kingdom",
      state: "England",
      city: "Oxford"
    },
    category: "Literature",
    organizer: "Literary Society"
  }
];
