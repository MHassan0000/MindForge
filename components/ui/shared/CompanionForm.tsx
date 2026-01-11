"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { subjects } from "@/constants";
import { Sparkles } from "lucide-react";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion name is required." }),
    subject: z.string().min(1, { message: "Subject is required." }),
    topic: z.string().min(1, { message: "Topic is required." }),
    voice: z.string().min(1, { message: "Voice is required." }),
    style: z.string().min(1, { message: "Style is required." }),
    duration: z.number().min(1, { message: "Duration is required." }),
});

type CompanionFormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
    const form = useForm<CompanionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 10,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: CompanionFormValues) => {
        const companion = await createCompanion(values);

        if (companion) {
            redirect(`/companion/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }
    };

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full col-span-2">
                        <div>
                            <h3 className="text-lg font-medium text-white">General Information</h3>
                            <p className="text-sm text-muted-foreground">
                                Give your AI companion a personality and expertise.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="text-white">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="e.g. Einstein, Ada, Newton"
                                            className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Subject</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white focus:ring-blue-500">
                                                <SelectValue placeholder="Select a subject" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                            {subjects.map((subject) => (
                                                <SelectItem key={subject} value={subject} className="focus:bg-zinc-800 focus:text-white capitalize cursor-pointer">
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="voice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Voice</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white focus:ring-blue-500">
                                                <SelectValue placeholder="Select a voice" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                            <SelectItem value="male" className="focus:bg-zinc-800 focus:text-white cursor-pointer">Male</SelectItem>
                                            <SelectItem value="female" className="focus:bg-zinc-800 focus:text-white cursor-pointer">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Style</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white focus:ring-blue-500">
                                                <SelectValue placeholder="Select a style" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                            <SelectItem value="casual" className="focus:bg-zinc-800 focus:text-white cursor-pointer">Casual</SelectItem>
                                            <SelectItem value="formal" className="focus:bg-zinc-800 focus:text-white cursor-pointer">Formal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel className="text-white">Duration (minutes)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isLoading}
                                            placeholder="e.g. 15"
                                            className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-white">Topic & Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isLoading}
                                        placeholder="Describe exactly what your companion should teach or discuss..."
                                        className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500 min-h-[150px] resize-none focus-visible:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex justify-center pt-4">
                        <Button size="lg" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 w-full md:w-auto shadow-lg shadow-blue-900/20">
                            {isLoading ? "Creating..." : (
                                <span className="flex items-center gap-2">
                                    Create Companion
                                    <Sparkles className="w-4 h-4 fill-white" />
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CompanionForm;