import Rodux from "@rbxts/rodux";

export interface ActionSetAssetSize extends Rodux.Action<"SetAssetSize"> {
    assetSize: number;
}

export interface ActionSetIndex extends Rodux.Action<"SetIndex"> {
    index: number;
}
