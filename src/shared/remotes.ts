import Net from "@rbxts/net";
import { RemoteId } from "shared/remoteId";

const Remotes = Net.Definitions.Create({
	[RemoteId.Ready]: Net.Definitions.ClientToServerEvent(),
	[RemoteId.Spawn]: Net.Definitions.ClientToServerEvent(),
});

export { Remotes };