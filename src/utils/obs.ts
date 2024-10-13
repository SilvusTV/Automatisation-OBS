import OBSWebSocket from "obs-websocket-js";
import {SceneList} from "../Types/SceneList.ts";
import {InputList} from "../Types/InputList.ts";

export async function getObs() {
  const obs = new OBSWebSocket();
  await obs.disconnect()
  await obs.connect("ws:localhost:4455", "T3zK4QUZea2nWAvi")
  return obs;
}

export async function getSceneList(obs: OBSWebSocket): Promise<SceneList> {
  return await obs.call("GetSceneList") as SceneList;
}
export async function getInputList(obs: OBSWebSocket): Promise<InputList> {
  return await obs.call("GetInputList") as InputList;
}