import Rodux from "@rbxts/rodux";

export interface ActionSetCameraControl extends Rodux.Action<"SetCameraControl"> {
    cameraControl: boolean;
}
