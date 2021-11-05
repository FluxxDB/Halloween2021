import Roact from "@rbxts/roact";
import Flipper from "@rbxts/flipper";
import { App } from "client/controllers/app/app-decorator";
import { IClientStore } from "client/rodux/rodux";
import DigitComponent from "shared/ui/components/digit-component";
import { Scene } from "types/enum/scene";

type IProps = Roact.PropsWithChildren<{
    Corruption: number;
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
        return identity<IProps>({ Corruption: store.gameState.corruption });
    },
})
class CounterApp extends Roact.PureComponent<IProps, IState> {
    private motor = new Flipper.SingleMotor(1);
    private pumpStatus: Roact.Binding<number>;

    constructor(props: IProps) {
        super(props);

        const { motor } = this;
        const [pumpStatus, setPumpStatus] = Roact.createBinding(motor.getValue());

        this.pumpStatus = pumpStatus;
        motor.onStep(setPumpStatus);
    }

    didUpdate() {
        this.motor.setGoal(new Flipper.Instant(0.6));
        this.motor.step(0);
        this.motor.setGoal(
            new Flipper.Spring(1, {
                frequency: 1,
                dampingRatio: 1,
            }),
        );
    }

    public render() {
        return (
            <frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
                <DigitComponent
                    Digit={tostring(getDigit(this.props.Corruption, 2))}
                    Position={UDim2.fromScale(1 / 6, 0.5)}
                    Size={UDim2.fromScale(1 / 3, 1)}
                    ImageTransparency={this.pumpStatus.map((dt) => dt)}
                />
                <DigitComponent
                    Digit={tostring(getDigit(this.props.Corruption, 1))}
                    Position={UDim2.fromScale(0.5, 0.5)}
                    Size={UDim2.fromScale(1 / 3, 1)}
                    ImageTransparency={this.pumpStatus.map((dt) => dt)}
                />
                <DigitComponent
                    Digit={"%"}
                    Position={UDim2.fromScale(5 / 6, 0.5)}
                    Size={UDim2.fromScale(1 / 3, 1.2)}
                    ImageTransparency={this.pumpStatus.map((dt) => dt)}
                />
            </frame>
        );
    }
}

export default CounterApp;
