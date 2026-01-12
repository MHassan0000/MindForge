'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import getVapi from "@/lib/vapi/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedContent from './AnimatedContent';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);


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
                <div className="relative flex-1 rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 lg:p-12">
                    {/* Dynamic Background Glow */}
                    <div
                        className={cn(
                            "absolute inset-0 opacity-20 transition-all duration-1000 blur-3xl",
                            callStatus === CallStatus.ACTIVE ? "opacity-30" : "opacity-10"
                        )}
                        style={{ backgroundColor: color }}
                    />

                    {/* Companion Avatar Wrapper */}
                    <div className="relative z-10 w-full max-w-[300px] aspect-square flex items-center justify-center">
                        {/* Static State */}
                        <div
                            className={cn(
                                'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out',
                                callStatus === CallStatus.ACTIVE ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                            )}
                        >
                            <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-black/40 ring-4 ring-white/10 shadow-xl backdrop-blur-sm">
                                <Image
                                    src={`/icons/${subject}.svg`}
                                    alt={subject}
                                    width={100}
                                    height={100}
                                    className="drop-shadow-lg"
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
                            <div className="relative w-64 h-64 rounded-full flex items-center justify-center bg-black/60 ring-1 ring-white/20 shadow-2xl backdrop-blur-md">
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={soundwaves}
                                    loop={true}
                                    className="w-48 h-48 opacity-80"
                                />
                                {/* Overlay Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={60}
                                        height={60}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/icons/user.png';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8 text-center space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">{name}</h2>
                        <p className={cn(
                            "text-sm font-medium px-3 py-1 rounded-full inline-block transition-colors",
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
                    </div>

                    {/* Footer Controls */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                        {/* Mic Toggle */}
                        <Button
                            size="icon"
                            variant="secondary"
                            className={cn(
                                "w-14 h-14 rounded-full shadow-lg border border-white/10 transition-all",
                                isMuted ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"
                            )}
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </Button>

                        {/* Call Control */}
                        <Button
                            className={cn(
                                "h-14 px-8 rounded-full font-bold text-lg shadow-xl transition-all border border-white/10",
                                callStatus === CallStatus.ACTIVE
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-blue-600 hover:bg-blue-500 text-white"
                            )}
                            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                            disabled={callStatus === CallStatus.CONNECTING}
                        >
                            {callStatus === CallStatus.ACTIVE ? (
                                <span className="flex items-center gap-2"><PhoneOff className="w-5 h-5" /> End Session</span>
                            ) : callStatus === CallStatus.CONNECTING ? (
                                <span className="animate-pulse">Connecting...</span>
                            ) : callStatus === CallStatus.FINISHED ? (
                                <span className="flex items-center gap-2"><Phone className="w-5 h-5" /> Restart Session</span>
                            ) : (
                                <span className="flex items-center gap-2"><Phone className="w-5 h-5" /> Start Session</span>
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