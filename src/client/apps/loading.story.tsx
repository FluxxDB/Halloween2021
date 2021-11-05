import Roact from "@rbxts/roact";
import ScaleComponent from "shared/ui/components/scale-component";
import LoadingApp from "./loading";

export = (target: Instance) => {
    const mount = Roact.mount(
        <LoadingApp AssetSize={20} Index={3}>
            <ScaleComponent />
        </LoadingApp>,
        target,
    );

    return () => {
        Roact.unmount(mount);
    };
};
