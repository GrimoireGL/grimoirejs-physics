import gr from "grimoirejs";
import PhysicsWorld from "./PhysicsWorldComponent";
import RigidBody from "./RigidBodyComponent";
export default () => {
    gr.register(async () => {
        gr.registerComponent("PhysicsWorld", PhysicsWorld);
        gr.registerComponent("RigidBody", RigidBody);
        gr.overrideDeclaration("scene", ["PhysicsWorld"]);
        gr.registerNode("collider", ["RigidBody"], {
            mass: 0
        }, "object");
    });
};
