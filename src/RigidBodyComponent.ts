/// <reference path="../node_modules/@types/cannon/index.d.ts" />
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
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
        }
    };
    private world: CANNON.World;
    private body: CANNON.Body;
    private transform: TransformComponent;
    private mass: number;
    private velocity: Vector3;
    public $awake(): void {
    }
    public $mount(): void {
        this.__bindAttributes();
        this.transform = this.node.getComponent("Transform") as TransformComponent;
        const PhysicsWorld = this.node.getComponentInAncestor("PhysicsWorld") as PhysicsWorldComponent;
        this.world = PhysicsWorld.World;
        this.body = new CANNON.Body({
            mass: this.mass,
            shape: new CANNON.Sphere(1)
        });
        this.body.position.set(
            this.transform.localPosition.X,
            this.transform.localPosition.Y,
            this.transform.localPosition.Z);
        this.body.quaternion.set(
            this.transform.localRotation.X,
            this.transform.localRotation.Y,
            this.transform.localRotation.Z,
            this.transform.localRotation.W);
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
