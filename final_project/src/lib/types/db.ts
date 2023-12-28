export type CardItem = {
    id: string;
    title: string;
    description: string;
    imageUrl?:string;
    date: string;
}

export type WritingItem = {
    id: string;
    rowContent: string;
    unemotionalContent: string;
    writer?: string;
}

export type Message = {
    role: "user"| "system"| "assistant";
    content: string| null;
}