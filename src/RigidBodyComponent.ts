/// <reference path="./cannon.d.ts" />
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Quaternion from "grimoirejs-math/ref/Quaternion";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import PhysicsWorldComponent from "./PhysicsWorldComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
import * as CANNON from "cannon";
export default class RigidBodyComponent extends Component {

    public static componentName: string = "RigidBodyComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        mass: {
            default: 5,
            converter: "Number"
        },
        velocity: {
            default: [0, 0, 0],
            converter: "Vector3"
        },
        shape: {
            default: "box",
            converter: "String"
        }
    };
    private world: CANNON.World;
    private body: CANNON.Body;
    private transform: TransformComponent;
    private mass: number;
    private velocity: Vector3;
    private shape: string;
    private pos: Vector3;
    private rot: Quaternion;
    private sca: Vector3;
    public $awake(): void {
    }
    public $mount(): void {
        this.__bindAttributes();
        this.transform = this.node.getComponent("Transform") as TransformComponent;
        const PhysicsWorld = this.node.getComponentInAncestor("PhysicsWorld") as PhysicsWorldComponent;
        this.world = PhysicsWorld.World;
        this.pos = this.transform.localPosition;
        this.rot = this.transform.localRotation;
        this.sca = this.transform.localScale;

        let sh;
        if (this.shape === "box") {
            sh = new CANNON.Box(new CANNON.Vec3(this.sca.X, this.sca.Y, this.sca.Z));
        } else if (this.shape === "sphere") {
            sh = new CANNON.Sphere(this.transform.localScale.X);
        }
        this.body = new CANNON.Body({
            mass: this.mass,
            shape: sh
        });
        this.body.position.set(this.pos.X, this.pos.Y, this.pos.Z);
        this.body.quaternion.set(this.rot.X, this.rot.Y, this.rot.Z, this.rot.W);
        this.body.velocity.set(
            this.velocity.X,
            this.velocity.Y,
            this.velocity.Z);
        this.world.addBody(this.body);

    }
    public $update(): void {
        this.transform.setAttribute("position", [
            this.body.position.x,
            this.body.position.y,
            this.body.position.z]);
        this.transform.setAttribute("rotation", [
            this.body.quaternion.x,
            this.body.quaternion.y,
            this.body.quaternion.z,
            this.body.quaternion.w]);
    }
}
