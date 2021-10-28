import { IClientStore } from "client/rodux/rodux";
import { ClassDecorator } from "types/interfaces/flamework";
import { Scene } from "types/enum/scene";

export interface IAppConfig {
    /** Debug name for app. */
    name: string;
    /** Only show this app if we are in one of these scenes. */
    requiredScenes?: Scene[];
    /** Show this app on any part with this CollectionService tag. */
    tag?: string;
    /** Display order of Surface/ScreenGui. */
    displayOrder?: number;
    /** Ignore topbar inset if rendering with a ScreenGui. */
    ignoreGuiInset?: boolean;
    /** If this is specified then the root component will be connected to Rodux. */
    mapStateToProps?: (state: IClientStore) => unknown;
}

export declare function App(opts: IAppConfig): ClassDecorator;
