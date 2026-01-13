'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import getVapi from "@/lib/vapi/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { Mic, MicOff, Phone, PhoneOff, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedContent from './AnimatedContent';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice, duration }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [timeRemaining, setTimeRemaining] = useState<number>(duration * 60);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const hasWarnedRef = useRef<boolean>(false); // Track if 1-min warning was given


    const groupedMessages = useMemo(() => {
        const result: SavedMessage[] = [];
        for (const msg of messages) {
            const lastMsg = result[result.length - 1];
            if (lastMsg && lastMsg.role === msg.role) {
                // Append to existing message from same role
                lastMsg.content += ' ' + msg.content;
            } else {
                // Start new message group
                result.push({ role: msg.role, content: msg.content });
            }
        }
        return result;
    }, [messages]);

    useEffect(() => {
        if (lottieRef.current) {
            if (isSpeaking) {
                lottieRef.current.play()
            } else {
                lottieRef.current.stop()
            }
        }
    }, [isSpeaking])

    useEffect(() => {
        let vapi: ReturnType<typeof getVapi>;
        try {
            vapi = getVapi();
        } catch {
            return;
        }

        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId);
        };

        const onMessage = (message: VapiMessage) => {

            if (message.type === 'transcript' && message.transcriptType === 'final') {
                if (message.role === 'user' || message.role === 'assistant') {
                    const newMessage: SavedMessage = {
                        role: message.role,
                        content: message.transcript || ""
                    };
                    // Append to end to maintain chronological order
                    setMessages((prev) => [...prev, newMessage]);
                }
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = () => {
            setCallStatus(CallStatus.INACTIVE);
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, [companionId]);

    // Session duration timer
    useEffect(() => {
        if (callStatus === CallStatus.ACTIVE) {
            // Start countdown timer
            timerRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    // 1 minute warning - only once
                    if (prev <= 60 && prev > 55 && !hasWarnedRef.current) {
                        hasWarnedRef.current = true;
                        try {
                            const vapi = getVapi();
                            vapi.say("Just a heads up, we have about one minute left in our session.", false);
                        } catch {
                            // Silent fail
                        }
                    }

                    if (prev <= 1) {
                        // Time's up - inform user and end session
                        try {
                            const vapi = getVapi();
                            vapi.say("Our time is up for today. Great session! See you next time.", true);
                            setTimeout(() => {
                                vapi.stop();
                            }, 3000);
                        } catch {
                            // Silent fail
                        }
                        setCallStatus(CallStatus.FINISHED);
                        addToSessionHistory(companionId);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            // Clear timer when not active
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            // Reset timer and warning flag when starting fresh
            if (callStatus === CallStatus.INACTIVE) {
                setTimeRemaining(duration * 60);
                hasWarnedRef.current = false;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [callStatus, companionId, duration]);

    // Format time remaining as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleMicrophone = useCallback(() => {
        try {
            const vapi = getVapi();
            const currentMuteState = vapi.isMuted();
            vapi.setMuted(!currentMuteState);
            setIsMuted(!currentMuteState);
        } catch {
            // Silent fail
        }
    }, []);

    const handleCall = useCallback(async () => {
        setCallStatus(CallStatus.CONNECTING);
        setMessages([]);

        const vapi = getVapi();
        const assistantConfig = configureAssistant(voice, style);

        // Retry logic for flaky first connections
        const maxRetries = 2;
        let lastError: unknown;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                await vapi.start(assistantConfig, {
                    variableValues: { subject, topic, style },
                });
                return; // Success - exit
            } catch (e) {
                lastError = e;
                if (attempt < maxRetries) {
                    // Wait before retry
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }

        // All retries failed
        setCallStatus(CallStatus.INACTIVE);
    }, [voice, style, subject, topic]);

    const handleDisconnect = useCallback(() => {
        try {
            const vapi = getVapi();
            vapi.stop();
            setCallStatus(CallStatus.FINISHED);
        } catch {
            // Silent fail
        }
    }, []);

    const color = getSubjectColor(subject);

    return (
        <AnimatedContent>
            <div className="flex flex-col lg:flex-row gap-8 h-[700px] w-full">

                {/* Visualizer & Avatar Section */}
                <div className="relative flex-1 rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 shadow-2xl flex flex-col p-4 sm:p-8 lg:p-12">
                    {/* Dynamic Background Glow */}
                    <div
                        className={cn(
                            "absolute inset-0 opacity-20 transition-all duration-1000 blur-3xl",
                            callStatus === CallStatus.ACTIVE ? "opacity-30" : "opacity-10"
                        )}
                        style={{ backgroundColor: color }}
                    />

                    {/* Main Content Area - Centered in available space */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full z-10 min-h-0">
                        {/* Companion Avatar Wrapper */}
                        <div className="relative w-full max-w-60 sm:max-w-[300px] aspect-square flex items-center justify-center mb-6 sm:mb-8">
                            {/* Static State */}
                            <div
                                className={cn(
                                    'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out',
                                    callStatus === CallStatus.ACTIVE ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                                )}
                            >
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center bg-white ring-4 ring-white/10 shadow-xl backdrop-blur-sm">
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={100}
                                        height={100}
                                        className="drop-shadow-lg w-20 h-20 sm:w-24 sm:h-24"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/icons/user.png';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Active Call State (Waveform) */}
                            <div className={cn(
                                'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out',
                                callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            )}>
                                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center bg-white ring-1 ring-white/20 shadow-2xl backdrop-blur-md">
                                    <Lottie
                                        lottieRef={lottieRef}
                                        animationData={soundwaves}
                                        loop={true}
                                        className="w-40 h-40 sm:w-48 sm:h-48 opacity-80"
                                    />
                                    {/* Overlay Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={50}
                                            height={50}
                                            className="w-12 h-12 sm:w-16 sm:h-16"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/icons/user.png';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-3 sm:space-y-4 px-4 w-full">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight truncate px-2">{name}</h2>
                            <div className="flex flex-col items-center gap-2">
                                <p className={cn(
                                    "text-xs sm:text-sm font-medium px-3 py-1 rounded-full inline-block transition-colors",
                                    callStatus === CallStatus.ACTIVE ? "bg-green-500/20 text-green-400" :
                                        callStatus === CallStatus.CONNECTING ? "bg-yellow-500/20 text-yellow-400" :
                                            callStatus === CallStatus.FINISHED ? "bg-blue-500/20 text-blue-400" :
                                                "bg-zinc-800 text-zinc-400"
                                )}>
                                    {callStatus === CallStatus.ACTIVE ? "Listening & Speaking" :
                                        callStatus === CallStatus.CONNECTING ? "Connecting..." :
                                            callStatus === CallStatus.FINISHED ? "Session Ended" :
                                                "Ready to Start"}
                                </p>
                                {/* Timer Display */}
                                {callStatus === CallStatus.ACTIVE && (
                                    <p className={cn(
                                        "text-base sm:text-lg font-mono font-bold px-4 py-1 rounded-full",
                                        timeRemaining <= 60 ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-300"
                                    )}>
                                        {formatTime(timeRemaining)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Controls - Relative Position */}
                    <div className="relative z-20 mt-4 sm:mt-8 w-full flex justify-center gap-3 sm:gap-6 flex-wrap shrink-0">
                        {/* Mic Toggle */}
                        <Button
                            size="icon"
                            variant="secondary"
                            className={cn(
                                "rounded-full shadow-lg border border-white/10 transition-all w-12 h-12 sm:w-14 sm:h-14 shrink-0",
                                isMuted ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"
                            )}
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </Button>

                        {/* Call Control */}
                        <Button
                            className={cn(
                                "rounded-full font-bold shadow-xl transition-all border border-white/10 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg shrink-0 min-w-0 max-w-full",
                                callStatus === CallStatus.ACTIVE
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-blue-600 hover:bg-blue-500 text-white"
                            )}
                            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                            disabled={callStatus === CallStatus.CONNECTING}
                        >
                            {callStatus === CallStatus.ACTIVE ? (
                                <span className="flex items-center gap-2 truncate"><PhoneOff className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> End Session</span>
                            ) : callStatus === CallStatus.CONNECTING ? (
                                <span className="animate-pulse flex items-center gap-2 truncate"><Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin shrink-0" /> Connecting...</span>
                            ) : callStatus === CallStatus.FINISHED ? (
                                <span className="flex items-center gap-2 truncate"><Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> Restart Session</span>
                            ) : (
                                <span className="flex items-center gap-2 truncate"><Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> Start Session</span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Transcript / Chat Section */}
                <div className="lg:w-[400px] flex flex-col rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 backdrop-blur-sm shadow-xl">
                    <div className="p-6 border-b border-white/5 bg-zinc-900/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                <Image src={userImage} alt={userName} width={40} height={40} className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">{userName}</h3>
                                <p className="text-xs text-zinc-500">Session Transcript</p>
                            </div>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        {groupedMessages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 p-4">
                                <p className="text-sm">No messages yet.</p>
                                <p className="text-xs mt-1">Start the call to begin conversation.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 pb-4">
                                {groupedMessages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex flex-col gap-1 max-w-[90%] text-sm",
                                            msg.role === 'assistant' ? "self-start" : "self-end items-end ml-auto"
                                        )}
                                    >
                                        <span className="text-[10px] text-zinc-500 capitalize px-1">{msg.role}</span>
                                        <div className={cn(
                                            "px-4 py-3 rounded-2xl",
                                            msg.role === 'assistant'
                                                ? "bg-zinc-800 text-zinc-200 rounded-tl-none"
                                                : "bg-blue-600 text-white rounded-tr-none"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </AnimatedContent>
    );
}

export default CompanionComponent;