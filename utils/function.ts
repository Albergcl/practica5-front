import Axios from "axios"
import { Contact, Message } from "./types.ts";


const URL = "https://back-a-p4.onrender.com"


export async function getContacts(): Promise<Contact[]> {
    const res = await Axios.get(`${URL}/contacts`);
    return res.data.data;
}


export async function getContact(chatId: string): Promise<Contact | undefined> {
    const allContacts = await getContacts();
    return allContacts.find((c) => c.chatId === chatId);
}


export async function addContact(name: string , email: string, phone: string): Promise<Contact>{
    const res = await Axios.post(`${URL}/contacts`,{name,email,phone});
     return res.data.data;
}


export async function getMessage(chatId: string): Promise<Message[]> {
    const res = await Axios.get(`${URL}/messages/chat/${chatId}`);
    return res.data.data;
}


export async function sendMessage(content: string, chatId: string, isContactMessage = false): Promise<Message> {
    const res = await Axios.post(`${URL}/messages`, {content, chatId, isContactMessage, timestamp: new Date().toISOString()});
    return res.data.data;
}