import { Networking } from "@flamework/networking";

interface ServerFunctions {}
interface ClientFunctions {}

export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
