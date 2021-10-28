import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";

// const newCFrame = new CFrame
// const EmptyVector2 = new Vector2()
// const math_noise = math.noise
// const random = math.random
// const setseed = math.randomseed

// const Stepped = RunService.RenderStepped
// const Player = Players.LocalPlayer

// interface settings {
// 	WaveLength: number,
// 	Gravity: number,
// 	Direction: Vector2,
// 	PushPoint: Instance,
// 	Steepness: number,
// 	TimeModifier: number,
// 	MaxDistance: number,
// }

// const defaultArgs = {
// 	WaveLength: 85,
// 	Gravity: 1.5,
// 	Direction: new Vector2(1,0),
// 	PushPoint: undefined,
// 	Steepness: 1,
// 	TimeModifier: 4,
// 	MaxDistance: 1500,
// }

// function Gerstner(Position: Vector3, Wavelength: number, Direction: Vector2,Steepness: number, Gravity: number, Time: number) {
// 	const k = (2 * math.pi) / Wavelength
// 	const a = Steepness/k
// 	const d = Direction.Unit
// 	const c = math.sqrt(Gravity / k)
// 	const f = k * d.Dot(new Vector2(Position.X,Position.Z)) - c * Time
// 	const cosF = math.cos(f)

// 	const dX = (d.X * (a * cosF))
// 	const dY = a * math.sin(f)
// 	const dZ = ( d.Y * (a * cosF))
// 	return new Vector3(dX,dY,dZ)
// }

// function CreateSettings(s: settings,o: settings) {
// 	o = o || {}
// 	s = s || defaultArgs
// 	const n = {
// 		WaveLength = s.WaveLength || o.WaveLength || defaultArgs.WaveLength,
// 		Gravity = s.Gravity || o.Gravity || defaultArgs.Gravity,
// 		Direction = s.Direction || o.Direction || defaultArgs.Direction,
// 		PushPoint = s.PushPoint || o.PushPoint || defaultArgs.PushPoint,
// 		Steepness = s.Steepness || o.Steepness || defaultArgs.Steepness,
// 		TimeModifier = s.TimeModifier || o.TimeModifier || defaultArgs.TimeModifier,
// 		MaxDistance = s.MaxDistance || o.MaxDistance || defaultArgs.MaxDistance,
// 	}
// 	return n
// }

// function GetDirection(Settings: settings, WorldPos: Vector3) {
// 	let Direction = Settings.Direction
// 	const PushPoint = Settings.PushPoint

// 	if (PushPoint) {
// 		let PartPos = undefined;

// 		if (PushPoint.IsA("Attachment")) {
// 			PartPos = PushPoint.WorldPosition
// 		} else if (PushPoint.IsA("BasePart")) {
// 			PartPos = PushPoint.Position
// 		} else {
// 			warn("Invalid class for FollowPart, must be BasePart or Attachment")
// 			return
// 		}

// 		const unit = (PartPos.sub(WorldPos)).Unit
// 		Direction = new Vector2(unit.X,unit.Z)
// 	}

// 	return Direction
// }

// // function Wave.new(instance: instance, waveSettings: table | nil, bones: table | nil)
// // 	-- Get bones on our own
// // 	if bones == nil then
// // 		bones = {}
// // 		for _,v in pairs(instance:GetDescendants()) do
// // 			if v:IsA("Bone") then
// // 				table.insert(bones,v)
// // 			end
// // 		end
// // 	end

// // 	const Time = os.time()

// // 	return setmetatable({
// // 		_instance = instance,
// // 		_bones = bones,
// // 		_time = 0,
// // 		_connections = {},
// // 		_noise = {},
// // 		_settings = CreateSettings(waveSettings)
// // 	},Wave)
// // end

// function Update() {
// 	for (var v of this._bones) {
// 		const WorldPos = v.WorldPosition
// 		const Settings = this._settings
// 		let Direction = Settings.Direction

// 		if (Direction == EmptyVector2) {
// 			const Noise = this._noise[v]
// 			let NoiseX = Noise && this._noise[v].X
// 			let NoiseZ = Noise && this._noise[v].Z
// 			const NoiseModifier = 1

// 			if (!Noise) {
// 				this._noise[v] = {}
// 				NoiseX = math_noise(WorldPos.X/NoiseModifier,WorldPos.Z/NoiseModifier,1)
// 				NoiseZ = math_noise(WorldPos.X/NoiseModifier,WorldPos.Z/NoiseModifier,0)

// 				this._noise[v].X = NoiseX
// 				this._noise[v].Z = NoiseZ
// 			}

// 			Direction = new Vector2(NoiseX,NoiseZ)
// 		} else {
// 			Direction = GetDirection(Settings,WorldPos)
// 		}

// 		v.Transform = newCFrame(Gerstner(WorldPos,Settings.WaveLength,Direction,Settings.Steepness,Settings.Gravity,self._time))
// 	}
// }

// function Refresh() {
// 	for (var v of self._bones) {
// 		v.Transform = new CFrame()
// 	}
// }

// function UpdateSettings(waveSettings: settings) {
// 	self._settings = CreateSettings(waveSettings,self._settings)
// }

// function ConnectRenderStepped() {
// 	const Connection = Stepped.Connect(() => {
// 		if (!game.IsLoaded()) return

// 		const Character = Player.Character || Player.CharacterAdded.Wait()[1] as Model
// 		if (!Character) return

// 		const Settings = self._settings

// 		if (!Character || (Character.PrimaryPart.Position.sub(this._instance.Position)).Magnitude < Settings.MaxDistance) {
// 			const Time = (DateTime.now().UnixTimestampMillis/1000)/Settings.TimeModifier
// 			this._time = Time
// 			this.Update()
// 		} else {
// 			this.Refresh()
// 		}
// 	})

// 	table.insert(self._connections,Connection)
// 	return Connection
// }

// function Destroy() {
// 	self._instance = undefined
// 	for (var v of self._connections) {
// 		pcall(() => {}
// 			v:Disconnect()
// 	})
// 	}
// 	self._bones = {}
// 	self._settings = {}
// 	self = undefined
// }

// return Wave

@Controller({})
export class FleshFartGartController implements OnStart {
	onStart() {}
}
