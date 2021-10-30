import { Controller, OnInit, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events } from "client/events";
import { ClientStore } from "client/rodux/rodux";

const pulseEvent = Events.Pulse;

@Controller({})
export default class corruptionController implements OnInit, OnStart {
    private corruption = 100;
    private clientPulsing = false;
    private clientStart = 0;

    /** @hidden */
    public onInit() {
        pulseEvent.connect((serverStart, serverPulsing) => {
            this.clientPulsing = serverPulsing;
            this.clientStart = serverStart;
        });
    }

    /** @hidden */
    public onStart() {
        task.defer(() => {
            while (this.corruption >= 1) {
                if (this.clientPulsing) {
                    const interval = Workspace.GetServerTimeNow() - this.clientStart;
                    this.corruption -= interval;
                }

                ClientStore.dispatch({ type: "SetCorruption", corruption: this.corruption });
                task.wait(1 / 3);
            }
        });
    }
}
