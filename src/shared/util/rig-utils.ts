import { EvaluateInstanceTree, promiseTree } from "@rbxts/validate-tree";

export const DefaultRig = {
    $className: "Model",
    HumanoidRootPart: {
        $className: "BasePart",
        Pelvis: {
            $className: "Bone",
            Torso: {
                $className: "Bone",
                Head: "Bone",
                "UpperArm.L": {
                    $className: "Bone",
                    "LowerArm.L": {
                        $className: "Bone",
                        "Hand.L": "Bone",
                    },
                },
                "UpperArm.R": {
                    $className: "Bone",
                    "LowerArm.R": {
                        $className: "Bone",
                        "Hand.R": "Bone",
                    },
                },
            },
            "UpperLeg.L": {
                $className: "Bone",
                "LowerLeg.L": {
                    $className: "Bone",
                    "Foot.L": "Bone",
                },
            },
            "UpperLeg.R": {
                $className: "Bone",
                "LowerLeg.R": {
                    $className: "Bone",
                    "Foot.R": "Bone",
                },
            },
        },
    },
    Humanoid: {
        $className: "Humanoid",
        Animator: "Animator",
    },
} as const;

export type DefaultRig = EvaluateInstanceTree<typeof DefaultRig>;
export function promiseRig(model: Model): Promise<DefaultRig> {
    return promiseTree(model, DefaultRig);
}

export default DefaultRig;
