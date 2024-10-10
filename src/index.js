/**
 * @file
 *
 * Summary.
 * <p>Create a root to display React components inside a browser DOM node.</p>
 *
 * @since 26/09/2024
 * @author {@link https://sketchfab.com/slava Slava Z.}
 * @author Paulo Roma.
 * @see <a href="../src/index.js">source</a>
 * @see <a href="https://rpe-gold.vercel.app/">link</a>
 * @see {@link external:react-dom/client.createRoot createRoot}
 * @see {@link external:react-three/fiber R3F}
 */

import { createRoot } from "react-dom/client"
import "./styles.css"
import App from "./App"

/**
 * The react-dom/client APIs let you render React components on the client (in the browser).
 * @external react-dom/client
 * @see {@link https://react.dev/reference/react-dom/client React DOM APIs}
 */

/**
 * Lets you create a root to display React components inside a browser DOM node.
 * @function createRoot
 * @memberof external:react-dom/client
 * @see {@link https://react.dev/reference/react-dom/client/createRoot createRoot}
 */

createRoot(document.getElementById("root")).render(<App />)
