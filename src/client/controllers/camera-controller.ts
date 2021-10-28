import { Controller, OnInit, Dependency } from "@flamework/core";
import { RunService, UserInputService, Workspace } from "@rbxts/services";
import CharacterController from "./character-controller";
import InputController from "./input-controller";

// const mouseIcon = "http://www.roblox.com/asset/?id=569021388";
const cameraOffset = new CFrame(0, 0.4, 0).add(new Vector3(0, 0, -0.1));
const smoothness = 0.15;
const currentCamera = Workspace.WaitForChild("Camera") as Camera;

let xAngle = 0;
let yAngle = 0;

@Controller({})
export default class CameraController implements OnInit {
    cameraEnabled = true;

    inputController: InputController = Dependency<InputController>();
    characterController: CharacterController = Dependency<CharacterController>();

    /** @hidden */
    public onInit(): void {
        currentCamera.CameraType = Enum.CameraType.Scriptable;

        UserInputService.InputChanged.Connect((i) => this.mouseUpdate(i));
        RunService.BindToRenderStep("FPS", Enum.RenderPriority.Camera.Value + 1, () => this.cameraUpdate());
    }

    private mouseUpdate(inputObject: InputObject) {
        if (inputObject.UserInputType === Enum.UserInputType.MouseMovement) {
            xAngle -= inputObject.Delta.X * smoothness;
            yAngle = math.clamp(yAngle - inputObject.Delta.Y * smoothness, -70, 80);
        }
    }

    private cameraUpdate() {
        if (this.cameraEnabled || this.inputController.getCharacterInputsEnabled()) {
            UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter;
        } else {
            UserInputService.MouseBehavior = Enum.MouseBehavior.Default;
            return;
        }

        const character = this.characterController.getCurrentCharacter();
        if (!character) return;

        const rootPart = character.HumanoidRootPart;
        const head = rootPart.Pelvis.Torso.Head;

        rootPart.CFrame = CFrame.Angles(0, math.rad(xAngle), 0).add(rootPart.Position);
        currentCamera.CFrame = head.TransformedWorldCFrame.mul(CFrame.Angles(math.rad(yAngle), 0, 0)).mul(cameraOffset);
    }
}