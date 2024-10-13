import {getData} from "../utils/ImportExport.ts";
import {Copy} from "../assets/Copy.tsx";

export const ShowLocalStorage = () => {
  const data = getData()
  return (
    <div>
      <div>
        <h1>Local Storage</h1>

      </div>
      <div className={"devBlock"}>
        <button onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(data))
        }}>
          <Copy className={"icon"}/>
        </button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}