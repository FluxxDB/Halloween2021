import { Networking } from "@flamework/networking";

interface ServerEvents {
    Ready(): void;
}

interface ClientEvents {
    Pulse(clockStart: number, pulsing: boolean): void;
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
