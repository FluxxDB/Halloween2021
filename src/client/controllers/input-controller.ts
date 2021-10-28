import { Controller } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";

@Controller({})
export default class InputController {
    private characterInputEnabled = true;
    private localPlayer = Players.LocalPlayer;

    public async setCharacterInputsEnabled(enabled: boolean) {
        this.characterInputEnabled = enabled;

        UserInputService.ModalEnabled = !enabled;

        const character = this.localPlayer.Character || this.localPlayer.CharacterAdded.Wait()[0];
        if (character) {
            const humanoid = character.WaitForChild("Humanoid");
            if (humanoid && humanoid.IsA("Humanoid")) {
                // TODO: Define default speed/jump values somewhere in case these change
                humanoid.WalkSpeed = enabled ? 16 : 0;
                humanoid.JumpPower = enabled ? 50 : 0;
            }

            const rootPart = character.WaitForChild("HumanoidRootPart");
            if (rootPart && rootPart.IsA("BasePart")) {
                rootPart.Anchored = !enabled;
            }
        }
    }

    public getCharacterInputsEnabled(): boolean {
        return this.characterInputEnabled;
    }
}
