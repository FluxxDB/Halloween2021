import { CollectionService, Players } from "@rbxts/services";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";
import { Tag } from "types/enum/tags";

let clicked = false;

@Interaction({
    interactionId: "PlayerCharacter",
    interactionText: () => "",
    shouldShowInteraction: () => !clicked,
    maxDistance: 5,
    holdDuration: 1.5,
})
export class PlayerInteraction implements OnInteracted {
    public onInteracted(obj: BasePart) {
        print("Interacted with:", obj.GetFullName());
        clicked = true;
        CollectionService.AddTag(Players.LocalPlayer.Character as Model, Tag.InteractionKey);
    }
}
