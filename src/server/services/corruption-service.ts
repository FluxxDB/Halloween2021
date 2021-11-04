import { OnStart, Service } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/events";

const pulseEvent = Events.Pulse;

@Service({})
export default class corruptionService implements OnStart {
    private corruption = 100;
    private pulsing = false;
    private start = Workspace.GetServerTimeNow();

    /** @hidden */
    public onStart() {
        task.defer(() => {
            task.wait(6);

            this.startPulse();
            task.wait(10);
            this.stopPulse();
            print(this.corruption);
            task.wait(2);
            this.startPulse();
        });
    }

    public startPulse() {
        if (this.corruption <= 0 || this.pulsing) return;

        this.pulsing = true;
        this.start = Workspace.GetServerTimeNow();
        this.sendElapsedTime();

        task.defer(() => {
            while (this.pulsing) {
                const interval = Workspace.GetServerTimeNow() - this.start;
                if (interval >= this.corruption && this.pulsing) {
                    this.pulsing = false;
                    this.corruption -= interval;
                    this.sendElapsedTime();
                    break;
                }
                task.wait(1 / 3);
            }
        });
    }

    public stopPulse() {
        if (!this.pulsing) return;
        this.pulsing = false;
        this.corruption -= Workspace.GetServerTimeNow() - this.start;
        this.sendElapsedTime();
    }

    private sendElapsedTime() {
        pulseEvent.fire(Players.GetChildren()[0] as Player, this.start, this.corruption, this.pulsing);
    }

    public getCorruption() {
        return this.corruption;
    }
}
