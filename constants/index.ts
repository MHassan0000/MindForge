import { Brain, MessageSquare, Target, Zap, Users, Sparkles } from "lucide-react";
export const subjects = [
    "maths",
    "language",
    "science",
    "history",
    "coding",
    "economics",
];

export const subjectsColors = {

    science: "#8AB4F8",   // cool research blue (Google Dark–style)
    maths: "#F6C177",     // muted amber, intelligent not playful
    language: "#9ADBC5",  // soft teal, calm + learning-friendly
    coding: "#F38BA8",    // controlled rose, modern dev vibe
    history: "#D6B98C",   // aged parchment / academic warmth
    economics: "#7DD3A6",


};


export const features = [
    {
        icon: Brain,
        title: "AI-Powered Learning",
        description: "Personalized tutoring that adapts to your learning style and pace in real-time.",
        color: "blue",
    },
    {
        icon: MessageSquare,
        title: "Natural Conversations",
        description: "Learn through voice-based dialogue, just like talking to a real tutor.",
        color: "purple",
    },
    {
        icon: Target,
        title: "Goal-Oriented",
        description: "Set learning objectives and track your progress with detailed analytics.",
        color: "green",
    },
    {
        icon: Zap,
        title: "Instant Feedback",
        description: "Get real-time corrections and explanations to accelerate your learning.",
        color: "yellow",
    },
    {
        icon: Users,
        title: "Expert Companions",
        description: "Choose from specialized AI tutors across science, maths, languages & more.",
        color: "pink",
    },
    {
        icon: Sparkles,
        title: "Adaptive Curriculum",
        description: "Content that evolves based on your strengths, weaknesses, and interests.",
        color: "orange",
    },
];
export const NavItems = [
    {
        name: "Companions",
        href: "/companion"
    },
    {
        name: "Affiliate",
        href: "/affiliate"
    },
    {
        name: "Pricing",
        href: "/subscription"
    },
    {
        name: "My Journey",
        href: "/profile"
    },

]

export const voices = {
    male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
    female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const recentSessions = [
    {
        id: "1",
        subject: "science",
        name: "Neura the Brainy Explorer",
        topic: "Neural Network of the Brain",
        duration: 45,
        color: "#E5D0FF",
    },
    {
        id: "2",
        subject: "maths",
        name: "Countsy the Number Wizard",
        topic: "Derivatives & Integrals",
        duration: 30,
        color: "#FFDA6E",
    },
    {
        id: "3",
        subject: "language",
        name: "Verba the Vocabulary Builder",
        topic: "English Literature",
        duration: 30,
        color: "#BDE7FF",
    },
    {
        id: "4",
        subject: "coding",
        name: "Codey the Logic Hacker",
        topic: "Intro to If-Else Statements",
        duration: 45,
        color: "#FFC8E4",
    },
    {
        id: "5",
        subject: "history",
        name: "Memo, the Memory Keeper",
        topic: "World Wars: Causes & Consequences",
        duration: 15,
        color: "#FFECC8",
    },
    {
        id: "6",
        subject: "economics",
        name: "The Market Maestro",
        topic: "The Basics of Supply & Demand",
        duration: 10,
        color: "#C8FFDF",
    },
];