import Rodux from "@rbxts/rodux";

export interface ActionSetCorruption extends Rodux.Action<"SetCorruption"> {
    corruption: number;
}
