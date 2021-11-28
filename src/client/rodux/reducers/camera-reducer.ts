import Rodux from "@rbxts/rodux";
import { ActionSetCameraControl } from "../actions/camera-actions";

export interface ICameraReducer {
    cameraControl: boolean;
}

const InitialState: ICameraReducer = {
    cameraControl: false,
};

export type CameraActions = ActionSetCameraControl;

export const cameraReducer = Rodux.createReducer<ICameraReducer, CameraActions>(InitialState, {
    SetCameraControl: (state, action) => {
        return {
            ...state,
            cameraControl: action.cameraControl,
        };
    },
});
