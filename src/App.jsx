/**
 * @file
 *
 * Summary.
 * <p>R3F application for rendering a {@link https://visao.ca/what-is-glb-file/ glb} model
 * of a {@link Engine Radial Pneumatic Engine}.</p>
 *
 * {@link external:react-three/fiber React-three-fiber} is a React renderer for three.js.<br>
 * Build your scene declaratively with re-usable, self-contained components that react to state.
 *
 * <p>Usage: </p>
 * <ul>
 *  <li>To install jsdoc and yarn:</li>
 *  <ul>
 *    <li>sudo npm install --global yarn</li>
 *    <li>sudo npm install -g jsdoc</li>
 *  </ul>
 *
 *  <li>To run the version with modules and Node.js version
 *     {@link https://nodejs.org/en/blog/release/v18.19.0 18},
 *     {@link https://nodejs.org/en/blog/release/v20.18.0 20} or
 *     {@link https://nodejs.org/en/blog/release/v22.11.0 22}:</li>
 *  <ul>
 *    <li>cd rpe-app</li>
 *    <ul>
 *      <li>To create the initial {@link https://raw.githubusercontent.com/krotalias/rpe/main/package.json package.json}:</li>
 *      <ol>
 *          <li>npm init vite</li>
 *          <li>yarn add @react-three/fiber</li>
 *          <li>yarn add @react-three/drei</li>
 *          <li>yarn add @react-three/postprocessing</li>
 *          <li>yarn add three</li>
 *          <li>yarn add leva</li>
 *      </ol>
 *    </ul>
 *    <li>{@link https://www.npmjs.com npm} or {@link https://yarnpkg.com yarn} install</li>
 *    <li>{@link https://www.npmjs.com/package/react npm} or {@link https://yarnpkg.com/package/react yarn} run dev</li>
 *  </ul>
 *
 *  <li>To use vercel {@link https://vercel.com/docs/cli cli} to run
 *  vercel {@link https://vercel.com/docs/cli/dev dev} before deploying on vercel:</li>
 *  <ul>
 *    <li>cd rpe-app</li>
 *    <li>{@link https://pnpm.io pnpm} i -g vercel or
 *        {@link https://pnpm.io pnpm} i -g vercel@latest (to update to the latest version)</li>
 *    <li>{@link https://www.npmjs.com npm} or {@link https://yarnpkg.com yarn} install</li>
 *    <li>{@link https://vercel.com vercel} dev</li>
 *  </ul>
 *  <li>Alternatively, the {@link https://www.vd-developer.online/blog/vite-react-deploy-github steps} to
 * {@link https://www.youtube.com/watch?v=Bk28snjHr7c deploy} on github pages.</li>
 * </ul>
 *
 * @author {@link https://sketchfab.com/slava Slava Z.}
 * @author Paulo Roma.
 * @since 26/09/2024
 * @see <a href="../src/App.jsx">source</a>
 * @see <a href="../package.json">package.json</a>
 * @see {@link https://www.youtube.com/watch?app=desktop&v=DPl34H2ISsk I wish I knew this before using React Three Fiber}
 * @see {@link https://r3f.docs.pmnd.rs/getting-started/examples R3F Examples}
 */

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Html, Bounds, Lightformer, Environment, OrbitControls, PerspectiveCamera, useEnvironment } from "@react-three/drei"
import { EffectComposer, SSAO, N8AO, SMAA, Selection, Outline } from "@react-three/postprocessing"
import { Engine } from "./Engine"

/**
 * Three.js module.
 * @external THREE
 * @see {@link https://threejs.org/docs/#manual/en/introduction/Installation Installation}
 * @see {@link https://discoverthreejs.com DISCOVER three.js}
 * @see {@link https://riptutorial.com/ebook/three-js Learning three.js}
 */

/**
 * <p>React</p>
 * The library for web and native user interfaces
 * @external react
 * @see {@link https://react.dev/ React Top-Level API}
 * @see {@link https://react.dev/reference/react/Suspense Suspense}
 */

/**
 * <p>React DOM.</p>
 * The react-dom package contains methods that are only supported
 * for the web applications (which run in the browser DOM environment).
 * <p>They are not supported for React Native.</p>
 * @external react-dom
 * @see {@link https://react.dev/reference/react-dom React DOM APIs}
 */

/**
 * <p>A React renderer for three.js.</p>
 * Build your scene declaratively with re-usable,
 * self-contained components that react to state,
 * are readily interactive and can participate in React's ecosystem.
 * @external react-three/fiber
 * @see {@link https://r3f.docs.pmnd.rs/api/canvas Canvas}
 * @see {@link https://r3f.docs.pmnd.rs/api/events Events}
 * @see {@link https://r3f.docs.pmnd.rs/getting-started/introduction R3F introduction}
 * @see {@link https://byteofdev.com/posts/how-to-use-esm/ How to use ESM}
 * @see {@link https://www.youtube.com/watch?v=DPl34H2ISsk I wish I knew this before using React Three Fiber}
 * @see {@link https://r3f.docs.pmnd.rs/tutorials/how-it-works How does it work?}
 */

/**
 * A growing collection of useful helpers and fully functional,
 * ready-made abstractions for @react-three/fiber.
 * @external react-three/drei
 * @see {@link https://github.com/pmndrs/drei drei}
 * @see {@link https://drei.docs.pmnd.rs/cameras/perspective-camera PerspectiveCamera}
 * @see {@link https://drei.docs.pmnd.rs/controls/introduction Controls}
 * @see {@link https://sbcode.net/react-three-fiber/orbit-controls/ OrbitControls}
 * @see {@link http://drei.docs.pmnd.rs/misc/select Select}
 * @see {@link https://drei.docs.pmnd.rs/staging/bounds Bounds}
 * @see {@link http://drei.docs.pmnd.rs/staging/environment Environment}
 * @see {@link http://drei.docs.pmnd.rs/staging/lightformer Lightformer}
 */

/**
 * <p>A postprocessing wrapper for @react-three/fiber. </p>
 * This is not (yet) meant for complex orchestration of effects,
 * but can save you hundreds of LOC for a straight forward effects-chain.
 * @external react-three/postprocessing
 * @see {@link https://github.com/pmndrs/react-postprocessing react-postprocessing}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/introduction Introduction}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/effect-composer EffectComposer}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/selection Selection}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/effects/smaa SMAA}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/effects/ssao SSAO}
 * @see {@link https://react-postprocessing.docs.pmnd.rs/effects/outline Outline}
 */

/**
 * <p>A react Hook that lets you add a state variable to your component.</p>
 * @function useState
 * @memberof external:react
 * @see {@link https://react.dev/reference/react/useState useState}
 * @see {@link https://sbcode.net/react-three-fiber/use-state/ useState in R3F}
 */

/**
 * <p>A react Hook that lets you reference a value that’s not needed for rendering.</p>
 * @function useRef
 * @memberof external:react
 * @see {@link https://react.dev/reference/react/useRef useRef}
 */

/**
 * <p>This hook gives you access to the state model which contains the
 * default renderer, the scene, your camera, and so on.
 * It also gives you the current size of the canvas in screen and viewport coordinates.</p>
 * @function useThree
 * @memberof external:react-three/fiber
 * @see {@link https://r3f.docs.pmnd.rs/api/hooks Hooks}
 * @see {@link https://sbcode.net/react-three-fiber/use-three/ useThree}
 */

/**
 * Define the scene lighting and environment.
 * @returns {ThreeElements} light elements.
 */
function ThreeScene() {
  const envMap = useEnvironment({ preset: "warehouse" })
  return (
    <>
      <ambientLight intensity={0.75} />
      <Environment preset="warehouse" map={envMap} background></Environment>
    </>
  )
}

/**
 * Creates a sphere.
 * @param {Object} props information that you pass to a JSX tag.
 * @param {Array<Number>} props.position sphere position.
 * @param {Object} props.children e.g., material.
 * @returns {ThreeElements} mesh with a sphere geometry.
 */
const Sphere = (props) => {
  const sphereRef = useRef()

  return (
    <mesh ref={sphereRef} position={props.position}>
      <sphereGeometry args={[10, 24, 24]} />
      {props.children}
    </mesh>
  )
}

/**
 * Creates a reflective sphere.
 * @param {Object} props information that you pass to a JSX tag.
 * @param {Array<Number>} props.position reflective sphere position.
 * @returns {ThreeElements} sphere with standard material.
 */
function ReflectiveSphere(props) {
  return (
    <Sphere position={props.position}>
      <meshStandardMaterial roughness={0.1} metalness={1} />
    </Sphere>
  )
}

/**
 * Display a fallback until its children have finished loading.
 * @returns {HTMLElement} fall back message.
 */
function Loading() {
  return (
    <Html>
      <h2 style={{ color: "red" }}>🌀 Loading...</h2>
    </Html>
  )
}

/**
 * <p>Returns a {@link https://legacy.reactjs.org/docs/introducing-jsx.html JSX}
 * element with a R3F canvas.</p>
 * In R3F, {@link external:react.useRef useRef()}
 * can be used to encapsulate a reference to an instance
 * of an object, as its current value.<br>
 * This reference can then be passed to a component as a
 * {@link https://react.dev/learn/passing-props-to-a-component prop}.
 * @module
 * @function App
 * @returns {HTMLCanvasElement} R3F {@link external:react-three/fiber Canvas}.
 * @see {@link external:react-three/postprocessing Postprocessing Effects}
 */
export default function App() {
  return (
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0, 200]} near={0.01} far={1000} />
      <OrbitControls makeDefault />
      <axesHelper args={[40]} />

      <Suspense fallback={<Loading />}>
        <ThreeScene />
        <Selection>
          <EffectComposer disableNormalPass multisampling={0} autoClear={false}>
            <SSAO radius={0.05} intensity={150} luminanceInfluence={0.5} color="black" />
            <SMAA />
            <Outline visibleEdgeColor="white" hiddenEdgeColor="yellow" blur width={3000} edgeStrength={100} />
          </EffectComposer>

          <Bounds fit clip margin={1.2} damping={0}>
            <Engine rotation={[Math.PI / 2, 0, 0]} />
            <ReflectiveSphere position={[50, 0, 0]} />
            <ReflectiveSphere position={[0, 0, 50]} />
            <ReflectiveSphere position={[0, 45, 0]} />
          </Bounds>
        </Selection>
      </Suspense>
    </Canvas>
  )
}
