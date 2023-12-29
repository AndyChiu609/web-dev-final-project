export type CardItem = {
    id: string;
    title: string;
    description: string;
    rowContent: string;
    unemotionalContent: string;
    imageUrl?:string;
    date: string;
}

export type WritingItem = {
    id: string;
    rowContent: string;
    unemotionalContent: string;
    writer?: string;
}

export type CommentItem = {
    id: string;
    content: string;
    username: string;
    timestamp: string;
    cardId: string;
}

export type Message = {
    role: "user"| "system"| "assistant";
    content: string| null;
}