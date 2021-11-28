import { Dependency } from "@flamework/core";
import BoatTween from "@rbxts/boat-tween";
import { Workspace } from "@rbxts/services";
import CameraController from "../camera-controller";

const camera = Workspace.CurrentCamera as Camera;

export default class Cutscene {
    cameraController: CameraController = Dependency<CameraController>();

    private playTransition(nodeCFrame: CFrame, nodeType: String, duration: number) {
        if (nodeType === "Instant") {
            camera.CFrame = nodeCFrame;
        } else if (nodeType === "Gradual") {
            const tween = BoatTween.Create(camera, {
                Time: duration,
                EasingStyle: nodeType as BoatTweenDataStyle,
                EasingDirection: "In",
                Goal: { CFrame: nodeCFrame },
            });

            tween.Play();
            tween.Completed.Wait();
        } else {
            error(`Type: ${nodeType} does not exist.`);
        }
    }

    public play(sequenceFolder: Folder) {
        this.cameraController.setState(false);

        for (const [, node] of ipairs(sequenceFolder.GetChildren())) {
            if (!node.IsA("CFrameValue")) return;

            const stringType = node.GetAttribute("Type") as String | undefined;
            const duration = node.GetAttribute("Duration") as number | undefined;
            let transitionDuration = node.GetAttribute("TransitionDuration") as number | undefined;
            let nodeType;
            if (stringType) {
                nodeType = stringType;
            } else {
                nodeType = "Instant";
                transitionDuration = 0;
            }

            if (!transitionDuration) {
                nodeType = "Instant";
                transitionDuration = 0;
            }

            task.wait(duration || 0.5);
            this.playTransition(node.Value, nodeType, transitionDuration);
        }
    }
}
