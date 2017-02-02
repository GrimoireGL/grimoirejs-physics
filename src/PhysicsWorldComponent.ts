/// <reference path="./cannon.d.ts"/>
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
import * as CANNON from "cannon";
export default class PhysicsWorldComponent extends Component {

    public static componentName: string = "PhysicsWorldComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        gravity: {
            converter: "Vector3",
            default: [0, -9.82, 0]
        }
    };
    private world: CANNON.World;
    get World(): CANNON.World {
        return this.world;
    }
    private gravity: Vector3;
    public $awake(): void {
        this.__bindAttributes();
        this.world = new CANNON.World();
        this.world.gravity.set(this.gravity.X, this.gravity.Y, this.gravity.Z);
    }
    public $mount(): void {
    }
    public $update(): void {
        this.world.step(1.0 / 60.0);
    }
}
