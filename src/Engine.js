/**
 * @file
 *
 * Summary.
 * <p>3D Printable Radial Pneumatic Engine, made up of six parts:</p>
 * <ul>
 *    <li>gear</li>
 *    <li>shaft</li>
 *    <li>cylinder</li>
 *    <li>piston1</li>
 *    <li>piston2</li>
 *    <li>piston3</li>
 * </ul>
 *
 * @since 26/09/2024
 * @author {@link https://sketchfab.com/slava Slava Z.}
 * @author Paulo Roma.
 * @see <a href="../src/Engine.js">source</a>
 * @see {@link https://discourse.threejs.org/t/arcballcontrols-no-gizmos-visible/71229 ArcballControls no gizmos visible}
 * @see <img src="../thumbnail.png" width="256">
 */
import { BoxHelper, Box3, Vector3 } from "three"
import { useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { useGLTF, useHelper } from "@react-three/drei"
import { Select } from "@react-three/postprocessing"
import { useControls, folder, button } from "leva"

/**
 * Helper object to graphically show the world-axis-aligned bounding box around an object.
 * The actual bounding box is handled with {@link external:THREE.Box3 Box3},
 * this is just a visual helper for debugging.
 * @class BoxHelper
 * @memberof external:THREE
 * @see {@link https://threejs.org/docs/#api/en/helpers/BoxHelper BoxHelper}
 * @see {@link https://codesandbox.io/p/sandbox/r3f-options-comparing-box-helpers-8v2t9 example}
 */

/**
 * Represents an axis-aligned bounding box (AABB) in 3D space.
 * @class Box3
 * @memberof external:THREE
 * @see {@link https://threejs.org/docs/#api/en/math/Box3 Box3}
 */

/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers
 * (labeled x, y, and z), which can be used to represent a number of things.
 * @class Vector3
 * @memberof external:THREE
 * @see {@link https://threejs.org/docs/#api/en/math/Vector3 Vector3}
 */

/**
 * A convenience hook that uses useLoader and GLTFLoader.
 * @function useGLTF
 * @memberof external:react-three/drei
 * @see {@link https://drei.docs.pmnd.rs/loaders/gltf-use-gltf Gltf / useGLTF}
 * @see {@link https://sbcode.net/react-three-fiber/use-gltf/ useGLTF}
 */

/**
 * <p>Leva</p>
 * A GUI you are going to lava.
 * Customizable, extensible and beautiful by default.
 * @external leva
 * @see {@link https://github.com/pmndrs/leva LEVA}
 * @see {@link https://www.npmjs.com/package/leva npm}
 * @see {@link https://www.dhiwise.com/post/a-beginner-guide-to-leveraging-the-power-of-leva-npm Beginner's Guide}
 */

/**
 * <p>Selects the part of the object the mouse is on, when a
 * {@link https://legacy.reactjs.org/docs/events.html#mouse-events DobleClick} event is fired.</p>
 *
 * <ul>
 * <li>Selection is slow because each part is checked every frame by the raycaster.</li>
 *
 * <li>The object selected is saved as a Engine state called "hovered" by using
 * {@link external:react.useState useState}.</li>
 *
 * <li>The corresponding check box in the
 * {@link https://github.com/pmndrs/leva GUI} is also checked.</li>
 *
 * <li>
 * If "autoRotate" is checked in the GUI, a
 * {@link external:THREE.BoxHelper BoxHelper}
 * is drawn to delimit the Engine.
 * </li>
 *
 * <li>
 * If "reset" is clicked in the GUI, the center of rotation (pivot point)
 * is set to the center of the bounding box.
 * </li>
 *
 * <li>The {@link external:react-three/drei Controls}
 * and {@link https://sbcode.net/react-three-fiber/camera/ Camera} are accessed via
 * the {@link external:react-three/fiber.useThree useThree} hook.</li>
 * </ul>
 *
 * @author {@link https://sketchfab.com/slava Slava Z.}
 * @license Licensed under {@link https://creativecommons.org/licenses/by/4.0/ CC-BY-4.0}
 * @param {Object} props information that you pass to a JSX tag.
 * @param {Array<Number>} props.rotation engine rotation.
 * @return {ThreeElements.group} a group with ref and the engine in it.
 * @see {@link https://github.com/pmndrs/gltfjsx github}
 * @see {@link https://sketchfab.com/3d-models/3d-printable-radial-pneumatic-engine-3cbddbecd6c5462391e9936a3ccd7d32 video}
 */
export function Engine(props) {
  const group = useRef()
  const boxH = useRef()
  const state = useThree()
  const reset = useRef(false)
  const { nodes } = useGLTF("/machine-transformed.glb")
  const [hovered, setHover] = useState(null)
  const [config, set, get] = useControls(() => ({
    parts: folder(
      {
        gear: false,
        shaft: false,
        cylinder: false,
        piston1: false,
        piston2: false,
        piston3: false,
      },
      { collapsed: true },
    ),
    all: false,
    autoRotate: false,
    reset: button(() => {
      if (!reset.current) {
        // set pivot point to the center of bounding box
        const bb = new Box3().setFromObject(group.current)
        const center = new Vector3()
        bb.getCenter(center)
        group.current.position.set(...center.negate().toArray())
        reset.current = true
      }

      state.controls.reset()
      state.camera.up.set(0, 1, 0)
    }),
  }))
  if (state?.controls?.autoRotate !== undefined) {
    state.controls.autoRotate = config.autoRotate
  }

  /**
   * <p>Check/uncheck a given part in the GUI "from the outside".</p>
   * The problem is that the setter from Leva's
   * {@link https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md useControls}
   * does not accept a String, but only a property key Symbol.<br>
   * Go figure...
   * @param {String} part name.
   * @param {Boolean} stat check if true, or uncheck if false.
   * @function
   * @global
   */
  const pton = (part, stat = true) => {
    //stat = !get(part)
    switch (part) {
      case "gear":
        set({ gear: stat })
        break
      case "shaft":
        set({ shaft: stat })
        break
      case "cylinder":
        set({ cylinder: stat })
        break
      case "piston1":
        set({ piston1: stat })
        break
      case "piston2":
        set({ piston2: stat })
        break
      case "piston3":
        set({ piston3: stat })
        break
      default:
        set({ gear: stat })
        set({ shaft: stat })
        set({ cylinder: stat })
        set({ piston1: stat })
        set({ piston2: stat })
        set({ piston3: stat })
        break
    }
  }

  if (config.autoRotate) {
    if (!boxH.current) {
      boxH.current = new BoxHelper(group.current, "white")
      state.scene.add(boxH.current)
    }
    boxH.current.visible = true
  } else {
    if (boxH.current) boxH.current.visible = false
  }

  /**
   * <p>Returns a mesh component given by its number in the props.</p>
   * e.g., num = 30:
   * <pre>
   *   &lt;mesh geometry={nodes.mesh_30.geometry} material={nodes.mesh_30.material} /&gt;
   * </pre>
   * @global
   * @param {Object} props information that you pass to a JSX tag.
   * @param {Number} props.num mesh number.
   * @returns {ThreeElements.mesh} JSX mesh.
   */
  function Mesh({ num } = props) {
    const key = `mesh_${num}`
    return <mesh geometry={nodes[key].geometry} material={nodes[key].material} />
  }

  /**
   * <p>{@link external:react-three/drei Select}
   * the set of meshes of a part, given as an array of numbers in the props.</p>
   * <p>Parts will be enabled if they have been hovered or checked in the GUI.</p>
   * e.g., name = "shaft" and arr = {29, 30, 31, 32, 33}:
   * <pre>
   *  &lt;Select name="shaft" enabled={hovered === "shaft" || config.shaft}&gt;
   *      &lt;mesh geometry={nodes.mesh_29.geometry} material={nodes.mesh_29.material} /&gt;
   *      &lt;mesh geometry={nodes.mesh_30.geometry} material={nodes.mesh_30.material} /&gt;
   *      &lt;mesh geometry={nodes.mesh_31.geometry} material={nodes.mesh_31.material} /&gt;
   *      &lt;mesh geometry={nodes.mesh_32.geometry} material={nodes.mesh_32.material} /&gt;
   *      &lt;mesh geometry={nodes.mesh_33.geometry} material={nodes.mesh_33.material} /&gt;
   *  &lt;/Select&gt;
   * </pre>
   * @global
   * @param {Object} props information that you pass to a JSX tag.
   * @param {String} props.name part name.
   * @param {Boolean} props.config whether part has been checked in the GUI.
   * @param {Array<Number>} props.arr array of mesh numbers.
   * @returns {React.JSX.Elements} JSX with a selected set of meshes.
   */
  function Parts({ name, config, arr } = props) {
    return (
      <Select name={name} enabled={hovered === name || config}>
        {arr.map((item, i) => {
          return <Mesh key={i} num={item} />
        })}
      </Select>
    )
  }

  return (
    <group
      onDoubleClick={(e) => {
        const part = e.object.parent.name
        e.stopPropagation()
        setHover(part)
        pton(part)
      }}
      onPointerOut={(e) => {
        setHover(null)
        pton(null, false)
      }}
      ref={group}
      {...props}
      dispose={null}>
      <Select enabled={config.all}>
        return <Parts name={"gear"} config={config.gear} arr={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]} />
        return <Parts name={"shaft"} config={config.shaft} arr={[29, 30, 31, 32, 33]} />
        return <Parts name={"cylinder"} config={config.cylinder} arr={[11, 12, 14, 19, 34, 39, 47, 52]} />
        return <Parts name={"piston1"} config={config.piston1} arr={[15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28]} />
        return <Parts name={"piston2"} config={config.piston2} arr={[35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46]} />
        return <Parts name={"piston3"} config={config.piston3} arr={[48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 59]} />
      </Select>
    </group>
  )
}
