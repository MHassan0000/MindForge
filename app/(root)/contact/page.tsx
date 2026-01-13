"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error("EmailJS Configuration Error: Missing Environment Variables");
            // Log which one is missing for debugging
            if (!serviceId) console.error("Missing NEXT_PUBLIC_EMAILJS_SERVICE_ID");
            if (!templateId) console.error("Missing NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
            if (!publicKey) console.error("Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");

            toast({
                variant: "destructive",
                title: "Configuration Error",
                description: "Contact form configuration is missing. Please contact the administrator.",
            });
            setIsLoading(false);
            return;
        }

        try {
            console.log("Sending email with Service ID:", serviceId); // Safe to log ID

            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: values.name,
                    from_email: values.email,
                    message: values.message,
                },
                publicKey
            );

            toast({
                title: "Message Sent!",
                description: "We've received your message and will get back to you soon.",
                className: "bg-green-500/10 border-green-500/20 text-green-400",
            });
            form.reset();
        } catch (error) {
            // Enhanced Error Logging
            console.error("EmailJS Error:", error);
            if (error && typeof error === 'object') {
                console.error("EmailJS Error Details:", JSON.stringify(error));
            }

            toast({
                variant: "destructive",
                title: "Error Sending Message",
                description: "Something went wrong. Please check your internet connection or try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 relative overflow-hidden">
            {/* Background Effects matching Hero/Footer */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxGluayIgdmlld0JveD0iMCAwIDcwMCA3MDAiIHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBvcGFjaXR5PSIxIj48ZGVmcz48ZmlsdGVyIGlkPSJubmlvaXNlRmlsdGVyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcYXJlbnQiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNubmlvaXNlRmlsdGVyKSIvPjwvZGVmcz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjcAwIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwIi8+PHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI3MDAiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="mb-10 text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-white">
                        Get in Touch
                    </h1>
                    <p className="text-gray-400">
                        Have questions or feedback? We'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Your name"
                                                {...field}
                                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="you@example.com"
                                                {...field}
                                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isLoading}
                                                placeholder="How can we help you?"
                                                className="min-h-[120px] resize-none bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Status Messages removed in favor of Toasts */}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-6 font-semibold text-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all rounded-xl shadow-lg shadow-blue-500/20"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
