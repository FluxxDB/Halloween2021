import { Workspace, SoundService, RunService } from "@rbxts/services";
import { Controller, OnInit } from "@flamework/core";

const UserGameSettings = UserSettings().GetService("UserGameSettings");
const Volumes = new Map<SoundGroup, number>();
const VolumeScale = {
	[0]: 5,
	[1]: 5,
	[2]: 4,
	[3]: 3,
	[4]: 2.5,
	[5]: 2.25,
	[6]: 2,
	[7]: 1.75,
	[8]: 1.5,
	[9]: 1.25,
	[10]: 1,
};

@Controller()
export class AudioMaster implements OnInit {
	public onInit(): void {
		this.ListenToInstance(SoundService);
		this.ListenToInstance(Workspace);

		let lastVolume: number;

		task.spawn(() => {
			while (true) {
				task.wait(0.2);

				const currentVolume = UserGameSettings.MasterVolume;
				if (currentVolume === lastVolume) return;

				lastVolume = currentVolume;
				for (const [soundGroup, originalVolume] of Volumes) {
					soundGroup.Volume = originalVolume * VolumeScale[math.floor(currentVolume * 10) as 1];
				}
			}
		});
	}

	private ListenToInstance(instance: Instance): void {
		instance.DescendantAdded.Connect((descendant) => this.AddSound(descendant));
		for (const descendant of instance.GetDescendants()) {
			this.AddSound(descendant);
		}
	}

	private AddSound(sound: Instance): void {
		if (!sound.IsA("SoundGroup") || Volumes.has(sound)) return;
		Volumes.set(sound, sound.Volume);

		sound.AncestryChanged.Connect((object, parent) => {
			if (!parent) {
				Volumes.delete(object as SoundGroup);
			}
		});
	}
}
