import { Networking } from "@flamework/networking";

interface ServerEvents {
    Ready(): void;
}

interface ClientEvents {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
