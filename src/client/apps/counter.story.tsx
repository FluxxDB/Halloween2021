import Roact from "@rbxts/roact";
import ScaleComponent from "shared/ui/components/scale-component";
import CounterApp from "./counter";

export = (target: Instance) => {
    const mount = Roact.mount(
        <CounterApp corruption={69} pulsing={true}>
            <ScaleComponent />
        </CounterApp>,
        target,
    );

    return () => {
        Roact.unmount(mount);
    };
};
