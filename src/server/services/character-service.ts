import { OnStart, Service } from "@flamework/core";
import { CollectionService, PhysicsService, ServerStorage, Workspace, Players } from "@rbxts/services";
import { Events } from "server/events";
import { addToCollisionGroup } from "shared/util/physics-utils";
import { promiseRig } from "shared/util/rig-utils";
import { CollisionGroup } from "types/enum/collision-groups";
import { Tag } from "types/enum/tags";

PhysicsService.CreateCollisionGroup(CollisionGroup.Character);

const rigs = ServerStorage.WaitForChild("Rigs");
const entities = Workspace.WaitForChild("Entities");
const characters = entities.WaitForChild("Characters");

@Service({})
export default class CharacterService implements OnStart {
    /** @hidden */
    public onStart() {
        PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Character, CollisionGroup.Character, false);
        Players.PlayerAdded.Connect(({ CharacterAdded }) => CharacterAdded.Connect((c) => this.characterAdded(c)));

        Events.Ready.connect(async (player) => {
            const character = await promiseRig(rigs.WaitForChild("Default")?.Clone() as Model);
            character.Parent = characters;
            player.Character = character;
        });
    }

    private async characterAdded(character: Model) {
        addToCollisionGroup(character, CollisionGroup.Character);
        CollectionService.AddTag(character, Tag.PlayerCharacter);
    }
}
