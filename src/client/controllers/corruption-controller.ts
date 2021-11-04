/* eslint-disable no-loop-func */
import { Controller, Dependency, OnInit, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events } from "client/events";
import { ClientStore } from "client/rodux/rodux";
import LightingController from "./lighting-controller";

const pulseEvent = Events.Pulse;

@Controller({})
export default class corruptionController implements OnInit, OnStart {
    lightingController: LightingController = Dependency<LightingController>();

    private corruption = 100;
    private serverCorruption = 100;
    private lastCorruption = 100;
    private clientPulsing = false;
    private clientStart = 0;

    /** @hidden */
    public onInit() {
        pulseEvent.connect((serverStart, serverCorruption, serverPulsing) => {
            this.clientPulsing = serverPulsing;
            this.clientStart = serverStart;
            this.serverCorruption = serverCorruption - (Workspace.GetServerTimeNow() - serverStart);
            ClientStore.dispatch({ type: "SetPulsing", pulsing: this.clientPulsing });
            this.lightingController.pumpAdrenaline(2610939724, { Volume: 2 });
        });
    }

    /** @hidden */
    public onStart() {
        task.defer(() => {
            while (this.corruption >= 1) {
                if (this.clientPulsing) {
                    const interval = Workspace.GetServerTimeNow() - this.clientStart;
                    this.corruption = math.floor(this.serverCorruption - interval);

                    if (this.corruption !== this.lastCorruption) {
                        this.lastCorruption = this.corruption;
                        ClientStore.dispatch({ type: "SetCorruption", corruption: this.corruption });
                        this.lightingController.pumpAdrenaline(2610939724, { Volume: 2 });
                    }
                }

                task.wait(1 / 6);
            }
        });
    }
}
