import Rodux from "@rbxts/rodux";

export interface ActionSetCorruption extends Rodux.Action<"SetCorruption"> {
    corruption: number;
}

export interface ActionSetPulsing extends Rodux.Action<"SetPulsing"> {
    pulsing: boolean;
}
