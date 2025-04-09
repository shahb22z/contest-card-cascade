
import { create } from 'zustand';

// Types
export interface Round {
  id: string;
  contestId: string;
  name: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  venue?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

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

interface UserLocation {
  country: string;
  state: string;
  city: string;
}

interface ContestStore {
  contests: Contest[];
  filteredContests: Contest[];
  rounds: Round[];
  selectedContestId: string | null;
  userLocation: UserLocation;
  isLoading: boolean;
  // Actions
  setContests: (contests: Contest[]) => void;
  setUserLocationFilters: () => void;
  fetchContests: () => Promise<void>;
  selectContest: (contestId: string) => void;
  getContestRounds: (contestId: string) => Round[];
}

export const useContestStore = create<ContestStore>((set, get) => ({
  contests: [],
  filteredContests: [],
  rounds: [],
  selectedContestId: null,
  // Simulated user's location - in a real app this would come from geolocation API or user profile
  userLocation: {
    country: "India",
    state: "Delhi",
    city: "Delhi"
  },
  isLoading: false,
  
  setContests: (contests) => {
    set({ contests });
  },
  
  setUserLocationFilters: () => {
    const { contests, userLocation } = get();
    
    // Filter contests based on user's location (country and city)
    const filtered = contests.filter(contest => 
      contest.location.country === userLocation.country && 
      contest.location.state === userLocation.state
    );
    
    set({ filteredContests: filtered });
  },
  
  selectContest: (contestId) => {
    set({ selectedContestId: contestId });
  },
  
  getContestRounds: (contestId) => {
    return get().rounds.filter(round => round.contestId === contestId);
  },
  
  fetchContests: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      const contests = getMockContests();
      const rounds = getMockRounds();
      set({ contests, rounds });
      get().setUserLocationFilters();
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
  },
  {
    id: "13",
    title: "Delhi Tech Hackathon",
    description: "Join the largest coding competition in Delhi. Build innovative solutions for urban challenges.",
    date: "2025-06-10",
    time: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    location: {
      country: "India",
      state: "Delhi",
      city: "Delhi"
    },
    category: "Technology",
    organizer: "Delhi Tech Association"
  },
  {
    id: "14",
    title: "Indian Classical Music Competition",
    description: "Showcase your talent in Indian classical music and get recognized by renowned musicians.",
    date: "2025-07-05",
    time: "05:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    location: {
      country: "India",
      state: "Delhi",
      city: "Delhi"
    },
    category: "Music",
    organizer: "Cultural Heritage Foundation"
  },
  {
    id: "15",
    title: "Delhi Fashion Week",
    description: "The biggest fashion event in Delhi showcasing both traditional and contemporary designs.",
    date: "2025-08-12",
    time: "03:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    location: {
      country: "India",
      state: "Delhi",
      city: "Delhi"
    },
    category: "Fashion",
    organizer: "Indian Fashion Council"
  }
];

// Mock rounds data
const getMockRounds = (): Round[] => [
  {
    id: "r1",
    contestId: "13",
    name: "Round 1: Preliminary",
    description: "Initial coding challenge to assess basic algorithm knowledge",
    date: "2025-06-10",
    time: "10:00 AM",
    duration: "2 hours",
    venue: "Online",
    status: "upcoming"
  },
  {
    id: "r2",
    contestId: "13",
    name: "Round 2: Semi-Final",
    description: "Advanced problem solving with focus on optimization",
    date: "2025-06-15",
    time: "02:00 PM", 
    duration: "3 hours",
    venue: "Delhi Tech Hub",
    status: "upcoming"
  },
  {
    id: "r3",
    contestId: "13",
    name: "Round 3: Final",
    description: "Live coding challenge with real-world problems",
    date: "2025-06-20",
    time: "11:00 AM",
    duration: "4 hours",
    venue: "Delhi Convention Center",
    status: "upcoming"
  },
  {
    id: "r4",
    contestId: "14",
    name: "Round 1: Audition",
    description: "Perform a classical piece of your choice",
    date: "2025-07-05",
    time: "05:00 PM",
    duration: "15 minutes per participant",
    venue: "Delhi Music Academy",
    status: "upcoming"
  },
  {
    id: "r5",
    contestId: "14",
    name: "Round 2: Final Performance",
    description: "Perform with accompanying orchestra",
    date: "2025-07-12",
    time: "06:00 PM",
    duration: "20 minutes per finalist",
    venue: "Delhi Concert Hall",
    status: "upcoming"
  },
  {
    id: "r6",
    contestId: "15",
    name: "Round 1: Portfolio Review",
    description: "Submit your fashion design portfolio",
    date: "2025-08-12",
    time: "03:00 PM",
    duration: "1 day for review",
    venue: "Online Submission",
    status: "upcoming"
  },
  {
    id: "r7",
    contestId: "15",
    name: "Round 2: Design Challenge",
    description: "Create a design based on the provided theme",
    date: "2025-08-15",
    time: "10:00 AM",
    duration: "8 hours",
    venue: "Delhi Fashion Institute",
    status: "upcoming"
  },
  {
    id: "r8",
    contestId: "15",
    name: "Round 3: Runway Show",
    description: "Present your final designs on the runway",
    date: "2025-08-20",
    time: "07:00 PM",
    duration: "3 hours",
    venue: "Delhi Fashion Week Venue",
    status: "upcoming"
  }
];
