import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
    const normalizedSubject = subject.toLowerCase();
    return subjectsColors[normalizedSubject as keyof typeof subjectsColors] || subjectsColors.science;
};

export const configureAssistant = (voice: string, style: string) => {
    const voiceConfig = voices[voice as keyof typeof voices];
    const voiceId = voiceConfig?.[style as keyof typeof voiceConfig] || "sarah";

    return {
        name: "Companion",
        firstMessage: "Hello! Let's start the session. Today we'll be talking about {{topic}}.",
        transcriber: {
            provider: "deepgram" as const,
            model: "nova-2" as const,
            language: "en" as const,
        },
        voice: {
            provider: "11labs" as const,
            voiceId: voiceId,
            stability: 0.5,
            similarityBoost: 0.75,
        },
        model: {
            provider: "openai" as const,
            model: "gpt-4" as const,
            messages: [
                {
                    role: "system" as const,
                    content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

Tutor Guidelines:
- Stick to the given topic - {{topic}} and subject - {{subject}} and teach the student about it.
- Keep the conversation flowing smoothly while maintaining control.
- From time to time make sure that the student is following you and understands you.
- Break down the topic into smaller parts and teach the student one part at a time.
- Keep your style of conversation {{style}}.
- Keep your responses short, like in a real voice conversation.
- Do not include any special characters in your responses - this is a voice conversation.`,
                },
            ],
        },
    };
};