import { Controller, Dependency } from "@flamework/core";
import { Lighting, TweenService, Workspace } from "@rbxts/services";
import CameraController from "./camera-controller";
import SoundController, { SoundType } from "./sound-controller";

const defaultInfo = new TweenInfo(0.9, Enum.EasingStyle.Quint, Enum.EasingDirection.InOut);

@Controller({})
export default class LightingController {
    soundController: SoundController = Dependency<SoundController>();
    cameraController: CameraController = Dependency<CameraController>();

    private blur: BlurEffect = Lighting.WaitForChild("Blur") as BlurEffect;
    private colorCorrection: ColorCorrectionEffect = Lighting.WaitForChild("ColorCorrection") as ColorCorrectionEffect;
    private lastPump = 0;

    private adrenalineVisual() {
        this.blur.Size = 15;
        this.colorCorrection.TintColor = Color3.fromRGB(184, 125, 128);

        TweenService.Create(this.colorCorrection, defaultInfo, { TintColor: Color3.fromRGB(255, 255, 255) }).Play();
        TweenService.Create(this.blur, defaultInfo, { Size: 2 }).Play();
    }

    public pumpAdrenaline(soundId?: number, soundProperties?: Omit<Partial<InstanceProperties<Sound>>, "Parent">) {
        const now = Workspace.GetServerTimeNow();
        if (now - this.lastPump < 0.85) return;
        this.lastPump = now;

        const cameraShaker = this.cameraController.getShaker();
        cameraShaker.ShakeOnce(17, 10, 0, 0.9);
        cameraShaker.Start();
        this.adrenalineVisual();

        if (soundId === undefined || soundProperties === (undefined || {})) return;
        const sfx = this.soundController.playSound({
            sound: soundId,
            soundType: SoundType.SoundEffect,
            soundProperties,
        });
        sfx.Ended.Connect(() => {
            sfx.Destroy();
        });
    }

    public getBlur() {
        return this.blur;
    }

    public getColorCorrection() {
        return this.colorCorrection;
    }
}
