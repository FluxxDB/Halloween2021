import { Controller, Flamework, OnStart, OnTick, Reflect } from "@flamework/core";
import Log from "@rbxts/log";
import { ClientStore } from "client/rodux/rodux";
import { DecoratorMetadata } from "types/interfaces/flamework";
import CharacterController from "../character-controller";
import { Cutscene, ICutsceneConfig, OnEventMarkerReached, OnInit } from "./cutscene-decorator";

type Ctor = OnInit | OnEventMarkerReached;

interface ICutsceneInfo {
    ctor: Ctor;
    config: ICutsceneConfig;
    identifier: string;
}

const cutsceneKey = `flamework:decorators.${Flamework.id<typeof Cutscene>()}`;

// const overlapParams = new OverlapParams();
// overlapParams.CollisionGroup = CollisionGroup.Interactable;
// overlapParams.MaxParts = 20;

// const maxInteractionDistance = 20;

@Controller({})
export default class CutsceneController implements OnInit, OnStart, OnTick {
    private log = Log.ForScript();
    private registeredCutscenes = new Map<string, ICutsceneInfo>();
    private currentRoduxState = ClientStore.getState();

    constructor(private readonly characterController: CharacterController) {}

    /** @hidden */
    public onInit() {
        for (const [ctor, identifier] of Reflect.objToId) {
            const config = Reflect.getOwnMetadata<DecoratorMetadata<ICutsceneConfig>>(ctor, cutsceneKey)?.arguments[0];

            if (config) {
                if (!Flamework.implements<OnInit>(ctor))
                    return Log.ForScript().Warn(`Class "{Identifier}" does not implement OnInteracted`, identifier);

                this.registeredCutscenes.set(config.name, { ctor, config, identifier });
                Log.Verbose(`Registered interaction with ID "{Id}" ({Identifier})`, config.name, identifier);
            }
        }
    }

    public getCutscene(name: string) {
        return this.registeredCutscenes.get(name);
    }
}
