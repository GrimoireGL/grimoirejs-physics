  import PhysicsWorldComponent from "./PhysicsWorldComponent";
  import RigidBodyComponent from "./RigidBodyComponent";

var __VERSION__ = "1.0.0";
var __NAME__ = "grimoirejs-physics";

import __MAIN__ from "./main";

var __EXPOSE__ = {
  "PhysicsWorldComponent": PhysicsWorldComponent,
  "RigidBodyComponent": RigidBodyComponent
};

let __BASE__ = __MAIN__();

Object.assign(__EXPOSE__,{
    __VERSION__:__VERSION__,
    __NAME__:__NAME__
});
Object.assign(__BASE__|| {},__EXPOSE__);

window["GrimoireJS"].lib.physics = __EXPOSE__;

export default __BASE__;
