export type CardItem = {
    id: string;
    title: string;
    description: string;
    imageUrl?:string;
    date: string;
}

export type Message = {
    role: "user"| "system"| "assistant";
    content: string| null;
}