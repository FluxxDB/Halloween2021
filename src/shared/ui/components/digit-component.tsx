import Roact from "@rbxts/roact";

const digits = new Map([
    ["0", "rbxassetid://7882797174"],
    ["1", "rbxassetid://7882797022"],
    ["2", "rbxassetid://7882796869"],
    ["3", "rbxassetid://7882796658"],
    ["4", "rbxassetid://7882796432"],
    ["5", "rbxassetid://7882796214"],
    ["6", "rbxassetid://7882795982"],
    ["7", "rbxassetid://7882795778"],
    ["8", "rbxassetid://7882795615"],
    ["9", "rbxassetid://7882795418"],
    ["%", "rbxassetid://7882797318"],
]);

type IProps = Roact.PropsWithChildren<{
    Digit: string;
    Position: UDim2;
    Size: UDim2;
    ImageTransparency: Roact.Binding<number>;
}>;

class DigitComponent extends Roact.PureComponent<IProps> {
    public render() {
        return (
            <imagelabel
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={this.props.Position}
                Size={this.props.Size}
                BackgroundTransparency={1}
                ImageColor3={Color3.fromRGB(177, 177, 177)}
                Image={digits.get(this.props.Digit)}
                ImageTransparency={this.props.ImageTransparency}
            >
                <uiaspectratioconstraint AspectRatio={0.667364} />
            </imagelabel>
        );
    }
}
export default DigitComponent;
