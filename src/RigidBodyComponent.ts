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
    private shape: string;
    private velocity: Vector3;
    private lastPosition: Vector3;
    public $awake(): void {
        this.__bindAttributes();
    }
    public $mount(): void {
        this.transform = this.node.getComponent("Transform") as TransformComponent;
        const PhysicsWorld = this.node.getComponentInAncestor("PhysicsWorld") as PhysicsWorldComponent;
        this.world = PhysicsWorld.World;
        this.body = new CANNON.Body({
            mass: this.mass,
            shape: new CANNON.Box(new CANNON.Vec3(this.transform.scale.X, this.transform.scale.Y, this.transform.scale.Z))
        });

        let sh;
        if (this.shape === "box") {
            sh = new CANNON.Box(new CANNON.Vec3(this.transform.scale.X, this.transform.scale.Y, this.transform.scale.Z));
        } else if (this.shape === "sphere") {
            sh = new CANNON.Sphere(this.transform.scale.X);
        }
        this.body = new CANNON.Body({
            mass: this.mass,
            shape: sh
        });

        this.body.position.set(this.transform.position.X, this.transform.position.Y, this.transform.position.Z);
        this.body.quaternion.set(this.transform.rotation.X, this.transform.rotation.Y, this.transform.rotation.Z, this.transform.rotation.W);
        this.body.velocity.set(
            this.velocity.X,
            this.velocity.Y,
            this.velocity.Z);
        this.world.addBody(this.body);
        this.lastPosition = this.transform.position;

        // this.node.watch("position", (newValue: Vector3, oldValue: Vector3) => {
        //     if (oldValue.X !== this.lastPosition.X || oldValue.Y !== this.lastPosition.Y || oldValue.Z !== this.lastPosition.Z) {
        //         this.body.position.set(oldValue.X, oldValue.Y, oldValue.Z);
        //         this.body.sleep()
        //         this.body.wakeUp();
        //     }
        // });
    }
    public $update(): void {
        this.node.setAttribute("position", [
            this.body.position.x,
            this.body.position.y,
            this.body.position.z]);
        this.node.setAttribute("rotation", [
            this.body.quaternion.x,
            this.body.quaternion.y,
            this.body.quaternion.z,
            this.body.quaternion.w]);
        this.lastPosition = this.transform.position;
    }
    public sleep(): void {
        this.body.sleep();
    }
    public wakeUp(): void {
        this.body.wakeUp();
    }
    get isSleep(): boolean {
        if (this.body.sleepState === 2) {
            return true;
        } else if (this.body.sleepState === 0) {
            return false;
        } else {
            return null;
        }
    }
    get Body(): CANNON.Body {
        return this.body;
    }
}
