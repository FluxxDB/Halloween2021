/* eslint-disable no-return-assign */
import { Controller, OnInit, Dependency } from "@flamework/core";
import CameraShaker from "@rbxts/camera-shaker";
import { RunService, UserInputService, Workspace } from "@rbxts/services";
import { ClientStore } from "client/rodux/rodux";
import CharacterController from "./character-controller";
import InputController from "./input-controller";

// const mouseIcon = "http://www.roblox.com/asset/?id=569021388";
// const cameraOffset = new CFrame(0, 0.4, 0).add(new Vector3(0, 0, -0.1));
const smoothness = 0.15;
const currentCamera = Workspace.WaitForChild("Camera") as Camera;

let xAngle = 0;
let yAngle = 0;
let bobbingTimer = 0;

@Controller({})
export default class CameraController implements OnInit {
    cameraEnabled = true;

    inputController: InputController = Dependency<InputController>();
    characterController: CharacterController = Dependency<CharacterController>();

    private cameraShaker = new CameraShaker(
        Enum.RenderPriority.Camera.Value,
        (shakeCFrame) => (currentCamera.CFrame = currentCamera.CFrame.mul(shakeCFrame)),
    );

    /** @hidden */
    public onInit(): void {
        // This is done due to roblox setting the camera type soon as the player gets added.
        currentCamera.CameraType = Enum.CameraType.Scriptable;
        currentCamera
            .GetPropertyChangedSignal("CameraType")
            .Connect(() => (currentCamera.CameraType = Enum.CameraType.Scriptable));

        UserInputService.InputChanged.Connect((i) => this.mouseUpdate(i));
        RunService.BindToRenderStep("FPS", Enum.RenderPriority.Camera.Value, () => this.cameraUpdate());
    }

    private mouseUpdate(inputObject: InputObject) {
        if (inputObject.UserInputType === Enum.UserInputType.MouseMovement) {
            xAngle -= inputObject.Delta.X * smoothness;
            yAngle = math.clamp(yAngle - inputObject.Delta.Y * smoothness, -70, 80);
        }
    }

    private cameraUpdate() {
        if (!ClientStore.getState().cameraState.cameraControl) return;

        if (this.cameraEnabled || this.inputController.getCharacterInputsEnabled()) {
            UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter;
        } else {
            UserInputService.MouseBehavior = Enum.MouseBehavior.Default;
            return;
        }

        const character = this.characterController.getCurrentCharacter();
        if (!character) return;

        const rootPart = character.HumanoidRootPart;
        let cameraOffset = rootPart.Camera.WorldCFrame;

        if (this.characterController.isMoving) {
            bobbingTimer += 1.5;
            cameraOffset = rootPart.Camera.WorldCFrame.add(new Vector3(0, math.sin(bobbingTimer / 8) / 5, 0));
        } else {
            bobbingTimer += 0.1;
            cameraOffset = rootPart.Camera.WorldCFrame.add(
                new Vector3(
                    math.sin(bobbingTimer / 8) / 6,
                    math.sin(bobbingTimer / 8) / 5,
                    math.sin(bobbingTimer / 8) / 6,
                ),
            );
        }

        currentCamera.CFrame = cameraOffset.mul(CFrame.Angles(math.rad(yAngle), 0, 0));
        rootPart.CFrame = CFrame.Angles(0, math.rad(xAngle), 0).add(rootPart.Position);
    }

    public setState(cameraControl: boolean) {
        ClientStore.dispatch({ type: "SetCameraControl", cameraControl });
    }

    public getShaker() {
        return this.cameraShaker;
    }
}
