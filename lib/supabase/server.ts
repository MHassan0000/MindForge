import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createClient = async () => {
    const { getToken } = await auth();

    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            global: {
                // Get the custom Supabase token from Clerk
                fetch: async (url, options = {}) => {
                    const clerkToken = await getToken({ template: "supabase" });

                    // Insert the Clerk token into the headers
                    const headers = new Headers(options?.headers);
                    headers.set("Authorization", `Bearer ${clerkToken}`);

                    // Now call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        }
    );
};
