import { Action } from "@rbxts/rodux";

export const enum LoadingActionName {
	Loaded = "Loaded",
	Skip = "Skip",
	AddAssets = "AddAssets",
}

export interface Loaded extends Action<LoadingActionName.Loaded> {}

export interface Skip extends Action<LoadingActionName.Skip> {}

export interface AddAssets extends Action<LoadingActionName.AddAssets> {
	assets: Array<Instance>;
}

export type LoadingActions = Loaded | Skip | AddAssets;
