import { Interaction, OnInteracted } from "client/controllers/interactions/interactions-decorator";

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
        // eslint-disable-next-line no-return-assign
        task.delay(1, () => (clicked = false));
    }
}
