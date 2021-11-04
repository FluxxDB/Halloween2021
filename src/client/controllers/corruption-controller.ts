/* eslint-disable no-loop-func */
import { Controller, Dependency, OnInit, OnStart } from "@flamework/core";
import CameraShaker from "@rbxts/camera-shaker";
import { SoundService, Workspace } from "@rbxts/services";
import { Events } from "client/events";
import { ClientStore } from "client/rodux/rodux";
import CameraController from "./camera-controller";

const pulseEvent = Events.Pulse;

function createSFX(parent: Instance, id: number, volume: number) {
    const sound = new Instance("Sound");
    sound.SoundId = `rbxassetid://${tostring(id)}`;
    sound.Volume = volume;
    sound.Parent = parent;
    return sound;
}

@Controller({})
export default class corruptionController implements OnInit, OnStart {
    cameraController: CameraController = Dependency<CameraController>();

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
        });
    }

    /** @hidden */
    public onStart() {
        task.defer(() => {
            while (this.corruption >= 1) {
                if (this.clientPulsing) {
                    const interval = Workspace.GetServerTimeNow() - this.clientStart;
                    this.corruption = math.floor(this.serverCorruption - interval);
                    ClientStore.dispatch({ type: "SetCorruption", corruption: this.corruption });

                    if (this.corruption !== this.lastCorruption) {
                        const sfx = createSFX(SoundService, 2610939724, 2);
                        this.lastCorruption = this.corruption;
                        sfx.Play();
                        sfx.Ended.Connect(() => {
                            sfx.Destroy();
                        });

                        const cameraShaker = this.cameraController.getShaker();
                        cameraShaker.ShakeOnce(17, 10, 0, 0.9);
                        cameraShaker.Start();
                    }
                }

                task.wait(1 / 6);
            }
        });
    }
}
