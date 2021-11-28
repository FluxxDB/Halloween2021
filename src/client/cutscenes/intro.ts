import { Cutscene, OnInit } from "client/controllers/cutscene/cutscene-decorator";

@Cutscene({
    name: "Intro",
    playbackSpeed: 1,
})
export class Intro implements OnInit {
    /** @hidden */
    public onInit(Cutscene) {}
}
