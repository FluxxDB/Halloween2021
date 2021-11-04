import Roact from "@rbxts/roact";
import { App } from "client/controllers/app/app-decorator";
import { IClientStore } from "client/rodux/rodux";
import DigitComponent from "shared/ui/components/digit-component";
import { Scene } from "types/enum/scene";

type IProps = Roact.PropsWithChildren<{
    corruption: number;
    pulsing: boolean;
}>;

interface IState {}

function getDigit(num: number, digit: number) {
    const n = 10 ** digit;
    const n1 = 10 ** (digit - 1);
    return math.floor((num % n) / n1);
}

@App({
    name: "counter",
    requiredScenes: [Scene.Menu],
    mapStateToProps: (store: IClientStore) => {
        return identity<IProps>({ corruption: store.gameState.corruption, pulsing: store.gameState.pulsing });
    },
})
class CounterApp extends Roact.PureComponent<IProps, IState> {
    public render() {
        return (
            <frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} Visible={this.props.pulsing}>
                <DigitComponent
                    digit={tostring(getDigit(this.props.corruption, 2))}
                    position={UDim2.fromScale(1 / 6, 0.5)}
                    size={UDim2.fromScale(1 / 3, 1)}
                />
                <DigitComponent
                    digit={tostring(getDigit(this.props.corruption, 1))}
                    position={UDim2.fromScale(0.5, 0.5)}
                    size={UDim2.fromScale(1 / 3, 1)}
                />
                <DigitComponent digit={"%"} position={UDim2.fromScale(5 / 6, 0.5)} size={UDim2.fromScale(1 / 3, 1.2)} />
            </frame>
        );
    }
}

export default CounterApp;
