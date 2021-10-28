import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/events";
import DefaultRig, { promiseRig } from "shared/util/rig-utils";

const player = Players.LocalPlayer;

@Controller({})
export default class CharacterController implements OnInit, OnStart {
    private currentCharacter?: DefaultRig;

    /** @hidden */
    public onInit(): void {
        if (player.Character) this.onCharacterAdded(player.Character);
        player.CharacterAdded.Connect((c) => this.onCharacterAdded(c));

        // eslint-disable-next-line no-return-assign
        player.CharacterRemoving.Connect(() => (this.currentCharacter = undefined));
    }

    /** @hidden */
    public onStart(): void {
        Events.Ready.fire();
    }

    public getCurrentCharacter() {
        return this.currentCharacter;
    }

    private async onCharacterAdded(model: Model) {
        const character = await promiseRig(model);
        this.currentCharacter = character;
    }
}
