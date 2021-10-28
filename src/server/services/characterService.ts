import { OnInit, Service } from "@flamework/core";
import { ServerStorage, Workspace } from "@rbxts/services";
import { RemoteId } from "shared/remoteId";
import { Remotes } from "shared/remotes";

const Spawn = Remotes.Server.Create(RemoteId.Spawn);

@Service({
	loadOrder: 0,
})
export class playerService implements OnInit {
	onInit() {
		const rigs = ServerStorage.WaitForChild("Rigs");
		const entities = Workspace.WaitForChild("Entities");
		const characters = entities.WaitForChild("Characters");
		const npcs = entities.WaitForChild("NPCs");

		Spawn.Connect((player) => {
			let character = player.Character;
			if (character) {
				character.Destroy();
			}

			character = rigs.FindFirstChild("Default")?.Clone() as Model;

			character.Parent = characters;
			player.Character = character;
		});
	}
}
