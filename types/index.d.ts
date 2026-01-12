// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

enum Subject {
    maths = "maths",
    language = "language",
    science = "science",
    history = "history",
    coding = "coding",
    geography = "geography",
    economics = "economics",
    finance = "finance",
    business = "business",
}

type Companion = Models.DocumentList<Models.Document> & {
    $id: string;
    name: string;
    subject: Subject;
    topic: string;
    duration: number;
    bookmarked: boolean;
};

interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}

interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];
}

interface BuildClient {
    key?: string;
    sessionToken?: string;
}

interface CreateUser {
    email: string;
    name: string;
    image?: string;
    accountId: string;
}

interface SearchParams {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
    userName: string;
    width: number;
    height: number;
    className?: string;
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface CompanionComponentProps {
    companionId: string;
    subject: string;
    topic: string;
    name: string;
    userName: string;
    userImage: string;
    voice: string;
    style: string;
}

// Vapi Message Types
type VapiClientMessageType =
    | "transcript"
    | "hang"
    | "function-call"
    | "function-call-result"
    | "speech-update"
    | "metadata"
    | "conversation-update"
    | "model-output"
    | "voice-input"
    | "status-update"
    | "transfer-update"
    | "tool-calls"
    | "tool-calls-result"
    | "user-interrupted"
    | "language-changed";

type VapiServerMessageType =
    | "hang"
    | "function-call"
    | "end-of-call-report"
    | "conversation-update"
    | "transcript"
    | "speech-update"
    | "status-update"
    | "tool-calls"
    | "transfer-update"
    | "model-output"
    | "user-interrupted"
    | "language-changed"
    | "voice-input"
    | "assistant-request"
    | "phone-call-control"
    | "transfer-destination-request";

interface VapiMessage {
    type: string;
    role: "user" | "system" | "assistant";
    transcriptType?: "final" | "partial";
    transcript?: string;
}

interface VapiAssistantOverrides {
    variableValues?: Record<string, string>;
    clientMessages?: readonly VapiClientMessageType[];
    serverMessages?: readonly VapiServerMessageType[];
}