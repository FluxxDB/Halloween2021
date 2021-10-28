import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players, RunService, Workspace } from "@rbxts/services";

const player = Players.LocalPlayer;
const currentCamera = Workspace.CurrentCamera as Camera;

@Controller()
export class camera implements OnInit, OnStart {
	onInit() {}
	onStart() {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		const rootPart = character.WaitForChild("HumanoidRootPart") as MeshPart;
		if (!(currentCamera || rootPart)) return;

		currentCamera.CameraType = Enum.CameraType.Scriptable;
		RunService.BindToRenderStep("FirstPersonCamera", Enum.RenderPriority.Camera.Value + 1, () => {
			currentCamera.CFrame = rootPart.CFrame.mul(new CFrame(0, 0, 0));
		});
	}
}
