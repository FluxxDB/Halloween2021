import { Controller, OnInit, OnStart } from "@flamework/core";
import { RemoteId } from "shared/remoteId";
import { Remotes } from "shared/remotes";

@Controller({
	loadOrder: 0,
})
export class characterController implements OnInit, OnStart {
	onInit() {}
	onStart() {
		const remote = Remotes.Client.Get(RemoteId.Spawn);
		remote.SendToServer();
	}
}
