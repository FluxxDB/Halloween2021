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
    private logoMotor = new Flipper.SingleMotor(1);
    private barStatus: Roact.Binding<number>;
    private logoStatus: Roact.Binding<number>;
    private isReady = false;

    constructor(props: IProps) {
        super(props);

        const { motor } = this;
        const { logoMotor } = this;
        const [barStatus, setBarStatus] = Roact.createBinding(motor.getValue());
        const [logoStatus, setLogoStatus] = Roact.createBinding(logoMotor.getValue());

        this.barStatus = barStatus;
        this.logoStatus = logoStatus;
        motor.onStep(setBarStatus);
        logoMotor.onStep(setLogoStatus);
    }

    didUpdate() {
        if (this.getProgress() === 100) {
            task.delay(1.5, () => {
                this.motor.setGoal(
                    new Flipper.Spring(0.5, {
                        frequency: 10,
                        dampingRatio: 0.4,
                    }),
                );

                task.delay(1.5, () => {
                    this.logoMotor.setGoal(
                        new Flipper.Linear(0, {
                            velocity: 0.3,
                        }),
                    );

                    task.delay(6, () => {
                        this.isReady = true;
                        this.logoMotor.setGoal(
                            new Flipper.Linear(1, {
                                velocity: 0.4,
                            }),
                        );
                    });
                });
            });
        }
    }

    public render() {
        return (
            <frame
                Size={UDim2.fromScale(1, 1)}
                BorderSizePixel={0}
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                BackgroundTransparency={this.logoStatus.map(() => {
                    if (this.isReady) return 1;
                    return 0;
                })}
            >
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
                    Visible={this.logoStatus.map(() => {
                        if (this.isReady) return false;
                        return true;
                    })}
                >
                    <uiaspectratioconstraint AspectRatio={1} />
                </textlabel>
                <imagelabel
                    Size={UDim2.fromScale(1, 1)}
                    BackgroundTransparency={1}
                    ImageColor3={Color3.fromRGB(0, 0, 0)}
                    Image={"rbxassetid://7907834813"}
                    Visible={this.logoStatus.map(() => {
                        if (this.isReady) return false;
                        return true;
                    })}
                />

                <frame
                    Size={this.barStatus.map((dt) => {
                        return UDim2.fromScale(1, dt);
                    })}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    BackgroundTransparency={this.logoStatus.map((dt) => {
                        if (this.isReady) return dt;
                        return 0;
                    })}
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
                    BackgroundTransparency={this.logoStatus.map((dt) => {
                        if (this.isReady) return dt;
                        return 0;
                    })}
                    BorderSizePixel={0}
                    ZIndex={4}
                />

                <imagelabel
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={UDim2.fromScale(0.5, 0.5)}
                    Size={UDim2.fromScale(0.4, 0.4)}
                    BackgroundTransparency={1}
                    ZIndex={5}
                    Image={"http://www.roblox.com/asset/?id=7912589791"}
                    ImageTransparency={this.logoStatus.map((dt) => dt)}
                >
                    <uiaspectratioconstraint AspectRatio={7.30526} />
                </imagelabel>
            </frame>
        );
    }

    private getProgress() {
        return math.floor((this.props.Index / this.props.AssetSize) * 100);
    }
}

export default LoadingApp;
