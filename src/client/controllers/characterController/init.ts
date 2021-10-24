import { Controller, OnInit, OnStart } from "@flamework/core";
import { RemoteId } from "shared/remoteId";
import { Remotes } from "shared/remotes";

@Controller({
	loadOrder: 0,
})
export class characterController implements OnInit, OnStart {
	onInit() {}
	onStart() {
		Remotes.Client.WaitFor(RemoteId.Spawn).then((ElRemote) => {
			ElRemote.SendToServer("Farded");
		});
	}
}
