import Roact from "@rbxts/roact";
import Flipper from "@rbxts/flipper";
import { App } from "client/controllers/app/app-decorator";
import { IClientStore } from "client/rodux/rodux";
import { Scene } from "types/enum/scene";

type IProps = Roact.PropsWithChildren<{
    AssetSize: number;
    Index: number;
}>;

interface IState {}

@App({
    name: "loading",
    requiredScenes: [Scene.Menu],
    mapStateToProps: (store: IClientStore) => {
        return identity<IProps>({ AssetSize: store.loadingState.assetSize, Index: store.loadingState.index });
    },
    ignoreGuiInset: true,
})
class LoadingApp extends Roact.PureComponent<IProps, IState> {
    private motor = new Flipper.SingleMotor(0);
    private barStatus: Roact.Binding<number>;

    constructor(props: IProps) {
        super(props);

        const { motor } = this;
        const [barStatus, setBarStatus] = Roact.createBinding(motor.getValue());

        this.barStatus = barStatus;
        motor.onStep(setBarStatus);
    }

    didUpdate() {
        if (this.getProgress() === 100) {
            task.delay(1, () =>
                this.motor.setGoal(
                    new Flipper.Spring(0.5, {
                        frequency: 5,
                        dampingRatio: 1,
                    }),
                ),
            );
        }
    }

    public render() {
        return (
            <frame Size={UDim2.fromScale(1, 1)} BorderSizePixel={0} BackgroundColor3={Color3.fromRGB(255, 255, 255)}>
                <textlabel
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={UDim2.fromScale(0.5, 0.5)}
                    Size={UDim2.fromScale(
                        this.getProgress() === 100 ? 0.3 : 0.2,
                        this.getProgress() === 100 ? 0.3 : 0.2,
                    )}
                    BackgroundTransparency={1}
                    Text={`${tostring(this.getProgress()) === "100" ? "ERROR" : tostring(this.getProgress())}%`}
                    TextColor3={Color3.fromRGB(0, 0, 0)}
                    TextScaled={true}
                    Font={Enum.Font.SpecialElite}
                >
                    <uiaspectratioconstraint AspectRatio={1} />
                </textlabel>
                <imagelabel
                    Size={UDim2.fromScale(1, 1)}
                    BackgroundTransparency={1}
                    ImageColor3={Color3.fromRGB(0, 0, 0)}
                    Image={"rbxassetid://7907834813"}
                />

                <frame
                    Size={this.barStatus.map((dt) => {
                        return UDim2.fromScale(1, dt);
                    })}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    BorderSizePixel={0}
                    ZIndex={4}
                />
                <frame
                    AnchorPoint={new Vector2(0, 1)}
                    Size={this.barStatus.map((dt) => {
                        return UDim2.fromScale(1, dt);
                    })}
                    Position={UDim2.fromScale(0, 1)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    BorderSizePixel={0}
                    ZIndex={4}
                />
            </frame>
        );
    }

    private getProgress() {
        return math.floor((this.props.Index / this.props.AssetSize) * 100);
    }
}

export default LoadingApp;
