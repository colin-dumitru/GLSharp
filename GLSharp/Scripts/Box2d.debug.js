//! Box2D.debug.js
//

(function() {

Type.registerNamespace('Box2D.Dynamics');

////////////////////////////////////////////////////////////////////////////////
// Box2D.Dynamics.B2BodyType

Box2D.Dynamics.B2BodyType = function() { 
    /// <field name="dynamicBody" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="kinematicBody" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="staticBody" type="Number" integer="true" static="true">
    /// </field>
};
Box2D.Dynamics.B2BodyType.prototype = {
    dynamicBody: 2, 
    kinematicBody: 1, 
    staticBody: 0
}
Box2D.Dynamics.B2BodyType.registerEnum('Box2D.Dynamics.B2BodyType', false);


})();

//! This script was generated using Script# v0.7.4.0
