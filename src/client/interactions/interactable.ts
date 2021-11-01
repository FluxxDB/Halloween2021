import { CollectionService, Players } from "@rbxts/services";
import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";
import { Tag } from "types/enum/tags";

let clicked = false;

@Interaction({
    interactionId: "InteractionKey",
    interactionText: "",
    shouldShowInteraction: () =>
        CollectionService.HasTag(Players.LocalPlayer.Character as Model, Tag.InteractionKey) && !clicked,
    maxDistance: 5,
    holdDuration: 1.5,
})
export class Interactable implements OnInteracted {
    public onInteracted(obj: BasePart) {
        print("Interacted with:", obj.GetFullName());
        clicked = true;
        // eslint-disable-next-line no-return-assign
        task.delay(1, () => (clicked = false));
    }
}
