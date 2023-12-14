export type Card = {
    id: string;
    title: string;
    content: string;
    imageUrl?:string;
    date: string;
}

export type Message = {
    role: "user"| "system"| "assistant";
    content: string| null;
}