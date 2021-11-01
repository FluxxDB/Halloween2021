import { OnStart, Service } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/events";

const pulseEvent = Events.Pulse;

@Service({})
export default class corruptionService implements OnStart {
    private corruption = 100;
    private pulsing = false;
    private start = 0;

    /** @hidden */
    public onStart() {}

    public startPulse() {
        if (this.corruption <= 0 || this.pulsing) return;

        this.start = Workspace.GetServerTimeNow();
        this.pulsing = true;
        this.sendElapsedTime();

        task.defer(() => {
            while (this.pulsing) {
                if (Workspace.GetServerTimeNow() - this.start <= 0) break;
                task.wait(1 / 3);
            }
            const interval = Workspace.GetServerTimeNow() - this.start;
            this.pulsing = false;
            this.corruption -= interval;
            this.sendElapsedTime();
        });
    }

    public stopPulse() {
        if (!this.pulsing) return;
        this.pulsing = false;
    }

    private sendElapsedTime() {
        pulseEvent.fire(Players.GetChildren()[1] as Player, Workspace.GetServerTimeNow() - this.start, this.pulsing);
    }

    public getCorruption() {
        return this.corruption;
    }
}
