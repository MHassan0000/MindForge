import Vapi from "@vapi-ai/web";

// Vapi instance - lazily initialized on client
let vapiInstance: Vapi | null = null;

const getVapi = (): Vapi => {
    if (typeof window === 'undefined') {
        throw new Error('Vapi can only be used on the client side');
    }

    if (!vapiInstance) {
        const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

        if (!token) {
            throw new Error('Voice service is not configured');
        }

        vapiInstance = new Vapi(token);
    }

    return vapiInstance;
};

export default getVapi;
