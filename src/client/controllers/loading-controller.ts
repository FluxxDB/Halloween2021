import { Controller, Dependency, OnStart } from "@flamework/core";
import { CollectionService, ContentProvider } from "@rbxts/services";
import { ClientStore } from "client/rodux/rodux";
import CameraController from "./camera-controller";
import SoundController, { SoundType } from "./sound-controller";

@Controller({})
export default class LoadingController implements OnStart {
    soundController: SoundController = Dependency<SoundController>();
    cameraController: CameraController = Dependency<CameraController>();

    /** @hidden */
    public onStart() {
        this.loadAssets(CollectionService.GetTagged("Preload"));
        task.delay(2.35, () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const bgm = this.soundController.playSound({
                sound: 4491762324,
                soundType: SoundType.SoundEffect,
                fadeInTime: 1,
                soundProperties: { Volume: 0.325, Looped: true },
            });

            // TODO: Stop song after cutscene
            // const volumeTween = TweenService.Create(bgm, new TweenInfo(5, Enum.EasingStyle.Linear), { Volume: 0 });
            // volumeTween.Play();
            // volumeTween.Completed.Connect(() => {
            //     bgm.Destroy();
            // });

            this.cameraController.setState(true);
            print("reassigned state");
        });
    }

    public loadAssets(assets: Instance[]) {
        ClientStore.dispatch({ type: "SetAssetSize", assetSize: assets.size() });

        for (const [index, item] of ipairs(assets)) {
            ContentProvider.PreloadAsync([item], () => {
                ClientStore.dispatch({ type: "SetIndex", index });
            });
        }
    }
}
