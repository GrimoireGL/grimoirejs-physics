import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Vector3 from "grimoirejs-math/ref/Vector3";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Attribute from "grimoirejs/ref/Node/Attribute";
export default class PhysicsWorldComponent extends Component {

    public static componentName: string = "PhysicsWorldComponent";

    public static attributes: { [key: string]: IAttributeDeclaration } = {
    };
    public $awake(): void {
    }
    public $mount(): void {
    }
    public $update(): void {
    }
}
