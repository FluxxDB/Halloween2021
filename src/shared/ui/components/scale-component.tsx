import Roact from "@rbxts/roact";
import { GuiService } from "@rbxts/services";

interface ScaleComponentState {}
interface ScaleComponentProps {
    minAxisSize?: number;
    maxAxisSize?: number;
    minScaleRatio?: number;
    maxScaleRatio?: number;
}

export default class ScaleComponent extends Roact.Component<ScaleComponentProps, ScaleComponentState> {
    private ref = Roact.createRef<UIScale>();
    private scaleBinding: Roact.Binding<number>;
    private updateScaleBinding: (newValue: number) => void;
    private viewportChangedListener?: RBXScriptConnection;

    static defaultProps = {
        minAxisSize: 320,
        maxAxisSize: 1080,
        minScaleRatio: 0.3,
        maxScaleRatio: 1,
    };

    constructor(props: ScaleComponentProps) {
        super(props);

        const [scaleBinding, updateScaleBinding] = Roact.createBinding(1);
        this.scaleBinding = scaleBinding;
        this.updateScaleBinding = updateScaleBinding;
    }

    render() {
        return (
            <uiscale
                Ref={this.ref}
                Key={"ScaleComponent"}
                Scale={this.scaleBinding}
                Event={{
                    AncestryChanged: () => {
                        this.updateScale();
                    },
                }}
            />
        );
    }

    public calculateRatio(minAxis: number, ignoreGuiInset: boolean) {
        let minAxisSize = this.props.minAxisSize!;

        if (!ignoreGuiInset) {
            const [guiInset] = GuiService.GetGuiInset();
            minAxisSize -= guiInset.Y;
        }

        const maxAxisSize = this.props.maxAxisSize!;
        const delta = maxAxisSize - minAxisSize;
        const ratio =
            ((minAxis - minAxisSize) / delta) * (this.props.maxScaleRatio! - this.props.minScaleRatio!) +
            this.props.minScaleRatio!;
        return math.clamp(ratio, 0.3, 1);
    }

    public clearListener() {
        const { viewportChangedListener } = this;
        if (viewportChangedListener) {
            viewportChangedListener.Disconnect();
            this.viewportChangedListener = undefined;
        }
    }

    public updateScale() {
        this.clearListener();
        const ref = this.ref.getValue();

        if (ref) {
            const viewport = ref.FindFirstAncestorWhichIsA("ScreenGui");
            if (viewport) {
                const ignoreGuiInset = viewport.IgnoreGuiInset;
                this.updateScaleBinding(
                    this.calculateRatio(math.min(viewport.AbsoluteSize.X, viewport.AbsoluteSize.Y), ignoreGuiInset),
                );

                this.viewportChangedListener = viewport.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
                    this.updateScaleBinding(
                        this.calculateRatio(math.min(viewport.AbsoluteSize.X, viewport.AbsoluteSize.Y), ignoreGuiInset),
                    );
                });
            }
        }
    }

    didMount() {
        this.updateScale();
    }

    didUpdate() {
        this.updateScale();
    }

    willUnmount() {
        this.clearListener();
    }
}
