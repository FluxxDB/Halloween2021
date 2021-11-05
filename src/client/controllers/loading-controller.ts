import { Controller, OnStart } from "@flamework/core";
import { CollectionService, ContentProvider } from "@rbxts/services";
import { ClientStore } from "client/rodux/rodux";

@Controller({})
export default class LoadingController implements OnStart {
    /** @hidden */
    public onStart() {
        this.loadAssets(CollectionService.GetTagged("Preload"));
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
