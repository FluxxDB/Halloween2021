import { ClassDecorator } from "types/interfaces/flamework";

export interface ICutsceneConfig {
    name: string;
    playbackSpeed: number;
}

export interface OnInit {
    onInit(cutscene: typeof Cutscene): void;
}

export interface OnEventMarkerReached {}

export declare function Cutscene(opts: ICutsceneConfig): ClassDecorator;
