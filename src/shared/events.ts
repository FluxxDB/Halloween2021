import { Networking } from "@flamework/networking";

interface ServerEvents {
    Ready(): void;
}

interface ClientEvents {
    Pulse(clockStart: number, corruption: number, pulsing: boolean): void;
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
