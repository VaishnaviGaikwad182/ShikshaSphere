import {
  FlaskConical,
  Atom,
  Dna,
  Calculator,
  Award,
  Sparkles,
  Compass,
  Crown,
  BookOpen,
  Target,
  Trophy,
} from 'lucide-react';
import type { Module, User, Badge, Activity } from './types';

export const modules: Module[] = [
  {
    id: 'physics-101',
    title: 'Laws of Motion',
    description: 'Explore Newtonian physics and understand the principles that govern movement.',
    subject: 'Physics',
    icon: Atom,
    imageId: 'module-physics',
    culturalContext: "Relate concepts to the engineering marvels of ancient Odia temples, like the Konark Sun Temple's chariot wheels.",
    questions: {
      easy: [
        { id: 'p1e', text: 'What is inertia?', options: ['A force', 'Resistance to change in motion', 'Speed', 'Mass'], correctAnswer: 'Resistance to change in motion' },
        { id: 'p2e', text: 'Force equals mass times what?', options: ['Acceleration', 'Velocity', 'Distance', 'Time'], correctAnswer: 'Acceleration' },
      ],
      medium: [
        { id: 'p1m', text: 'What is the unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton' },
        { id: 'p2m', text: "Which law is known as the law of action-reaction?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"], correctAnswer: "Newton's Third Law" },
      ],
      hard: [
        { id: 'p1h', text: 'Calculate the force needed to accelerate a 2kg object at 5 m/s².', options: ['10N', '2.5N', '7N', '0.4N'], correctAnswer: '10N' },
      ],
    },
  },
  {
    id: 'chemistry-101',
    title: 'Chemical Reactions',
    description: 'Learn about the different types of chemical reactions and how they occur.',
    subject: 'Chemistry',
    icon: FlaskConical,
    imageId: 'module-chemistry',
    culturalContext: 'Connect reaction types to the traditional process of "Pakhala" (fermented rice) or the making of salt from seawater in coastal Odisha.',
    questions: {
      easy: [
        { id: 'c1e', text: 'What is H₂O?', options: ['Salt', 'Water', 'Sugar', 'Oxygen'], correctAnswer: 'Water' },
        { id: 'c2e', text: 'What is a combination reaction?', options: ['One reactant, multiple products', 'Two or more reactants, one product', 'Substances are exchanged', 'A substance breaks down'], correctAnswer: 'Two or more reactants, one product' },
      ],
      medium: [
        { id: 'c1m', text: 'What does a catalyst do in a reaction?', options: ['Slows it down', 'Speeds it up', 'Stops it', 'Changes color'], correctAnswer: 'Speeds it up' },
      ],
      hard: [
        { id: 'c1h', text: 'Balance the equation: H₂ + O₂ → H₂O', options: ['2H₂ + O₂ → 2H₂O', 'H₂ + O₂ → H₂O', 'H₂ + 2O₂ → 2H₂O', '2H₂ + 2O₂ → 4H₂O'], correctAnswer: '2H₂ + O₂ → 2H₂O' },
      ],
    },
  },
  {
    id: 'biology-101',
    title: 'The Cell',
    description: 'Discover the basic building block of life and its various components.',
    subject: 'Biology',
    icon: Dna,
    imageId: 'module-biology',
    culturalContext: 'Discuss biodiversity by exploring the unique ecosystems of Chilika Lake and the Bhitarkanika Mangroves.',
    questions: {
      easy: [
        { id: 'b1e', text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Cell Wall'], correctAnswer: 'Mitochondria' },
      ],
      medium: [
        { id: 'b1m', text: 'What is the function of the nucleus?', options: ['Energy production', 'Protein synthesis', 'Contains genetic material', 'Waste disposal'], correctAnswer: 'Contains genetic material' },
      ],
      hard: [
        { id: 'b1h', text: 'Which of these is not found in an animal cell?', options: ['Cell Membrane', 'Cytoplasm', 'Cell Wall', 'Nucleus'], correctAnswer: 'Cell Wall' },
      ],
    },
  },
  {
    id: 'math-101',
    title: 'Basic Geometry',
    description: 'Understand shapes, sizes, positions of figures, and properties of space.',
    subject: 'Mathematics',
    icon: Calculator,
    imageId: 'module-math',
    culturalContext: 'Analyze the geometric patterns found in Odia "Jhoti Chita" (a traditional art form) or the architecture of temples.',
    questions: {
      easy: [
        { id: 'm1e', text: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correctAnswer: '3' },
      ],
      medium: [
        { id: 'm1m', text: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°' },
      ],
      hard: [
        { id: 'm1h', text: 'What is the area of a circle with radius r?', options: ['2πr', 'πr', 'πr²', '2πr²'], correctAnswer: 'πr²' },
      ],
    },
  },
];

export const users: User[] = [
  { id: 'user-1', name: 'Ananya Das', avatarId: 'user-avatar-1', points: 1250, rank: 1 },
  { id: 'user-2', name: 'Bikram Sahoo', avatarId: 'user-avatar-2', points: 1100, rank: 2 },
  { id: 'user-3', name: 'Chitra Behera', avatarId: 'user-avatar-3', points: 980, rank: 3 },
  { id: 'user-4', name: 'Deepak Rout', avatarId: 'user-avatar-4', points: 850, rank: 4 },
  { id: 'user-5', name: 'Esha Pattanayak', avatarId: 'user-avatar-5', points: 720, rank: 5 },
];

export const badges: Badge[] = [
  { id: 'badge-1', title: 'Learning Pioneer', description: 'Completed your first module.', imageId: 'badge-pioneer', icon: Award },
  { id: 'badge-2', title: 'Subject Scholar', description: 'Achieved a score of 90% or higher.', imageId: 'badge-scholar', icon: Sparkles },
  { id: 'badge-3', title: 'Curiosity Compass', description: 'Explored a module in every subject.', imageId: 'badge-explorer', icon: Compass },
  { id: 'badge-4', title: 'Master of Motion', description: 'Mastered the Physics module.', imageId: 'badge-master', icon: Crown },
];

export const userBadges = ['badge-1', 'badge-2'];

export const activities: Activity[] = [
    { id: 'act-1', text: 'You earned the "Learning Pioneer" badge!', timestamp: '2 days ago', icon: Award },
    { id: 'act-2', text: 'You completed the "Laws of Motion" module.', timestamp: '2 days ago', icon: BookOpen },
    { id: 'act-3', text: 'You reached a 5-day streak!', timestamp: '3 days ago', icon: Target },
    { id: 'act-4', text: 'You topped the leaderboard in Physics.', timestamp: '4 days ago', icon: Trophy },
];

export const currentUser = {
    name: 'Ananya Das',
    learningStyle: 'Visual',
    knowledgeGaps: 'Struggles with applying formulas to real-world problems.'
};
