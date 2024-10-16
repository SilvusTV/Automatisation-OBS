import {Route, Routes} from "react-router-dom";
import Config from "./Page/Config.tsx";
import Screen from "./Page/Screen.tsx";

export default function App() {
  return (
    <Routes>
      <Route
        path={"/config"}
        element={<Config/>}
      />
        
      <Route
        path={"/screen"}
        element={<Screen/>}
      />
    </Routes>
  )
}