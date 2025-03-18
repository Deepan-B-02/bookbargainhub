
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  category: string[];
  coverImage: string;
  sellerName: string;
  sellerRating: number;
  location: string;
  dateAdded: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export const categories = [
  { id: 'fiction', name: 'Fiction', count: 234 },
  { id: 'non-fiction', name: 'Non-Fiction', count: 156 },
  { id: 'science', name: 'Science & Technology', count: 89 },
  { id: 'arts', name: 'Arts & Photography', count: 112 },
  { id: 'business', name: 'Business & Economics', count: 67 },
  { id: 'children', name: 'Children\'s Books', count: 198 },
  { id: 'comics', name: 'Comics & Graphic Novels', count: 76 },
  { id: 'education', name: 'Education & Teaching', count: 45 },
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    price: 14.99,
    originalPrice: 24.99,
    condition: 'like-new',
    category: ['fiction', 'fantasy'],
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580',
    sellerName: 'Book Haven',
    sellerRating: 4.8,
    location: 'Seattle, WA',
    dateAdded: '2023-10-12',
    featured: true,
    bestSeller: true,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 18.99,
    condition: 'new',
    category: ['non-fiction', 'self-help'],
    coverImage: 'https://images.unsplash.com/photo-1571167530149-c1105da82639?auto=format&fit=crop&q=80&w=376&h=580',
    sellerName: 'PageTurner Books',
    sellerRating: 4.9,
    location: 'Portland, OR',
    dateAdded: '2023-10-05',
    featured: true,
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.',
    price: 22.50,
    originalPrice: 28.99,
    condition: 'new',
    category: ['fiction', 'science-fiction'],
    coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=390&h=580',
    sellerName: 'Nebula Books',
    sellerRating: 4.7,
    location: 'Austin, TX',
    dateAdded: '2023-09-28',
    bestSeller: true,
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    price: 12.99,
    originalPrice: 17.99,
    condition: 'good',
    category: ['non-fiction', 'memoir', 'biography'],
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=376&h=580',
    sellerName: 'Memoir Depot',
    sellerRating: 4.5,
    location: 'Boston, MA',
    dateAdded: '2023-10-01',
  },
  {
    id: '5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
    price: 15.99,
    condition: 'new',
    category: ['business', 'finance', 'self-help'],
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=386&h=580',
    sellerName: 'Finance Reads',
    sellerRating: 4.6,
    location: 'Chicago, IL',
    dateAdded: '2023-09-25',
    featured: true,
  },
  {
    id: '6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A true classic of American literature, The Great Gatsby is a vivid and witty portrait of the American dream and its corruption.',
    price: 9.99,
    condition: 'fair',
    category: ['fiction', 'classics'],
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=387&h=580',
    sellerName: 'Classic Library',
    sellerRating: 4.4,
    location: 'New York, NY',
    dateAdded: '2023-09-15',
  },
  {
    id: '7',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution that explores the ways in which biology and history have defined us.',
    price: 19.99,
    condition: 'like-new',
    category: ['non-fiction', 'history', 'science'],
    coverImage: 'https://images.unsplash.com/photo-1503830469095-092a4a4e525e?auto=format&fit=crop&q=80&w=380&h=580',
    sellerName: 'History Hub',
    sellerRating: 4.9,
    location: 'San Francisco, CA',
    dateAdded: '2023-10-08',
    bestSeller: true,
  },
  {
    id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
    price: 11.50,
    originalPrice: 14.99,
    condition: 'good',
    category: ['fiction', 'fantasy', 'spiritual'],
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580',
    sellerName: 'Spiritual Books',
    sellerRating: 4.7,
    location: 'Denver, CO',
    dateAdded: '2023-09-20',
  },
];
