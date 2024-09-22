import OBSWebSocket from "obs-websocket-js";
import {SceneList} from "../Types/SceneList.ts";

export async function getObs() {
  const obs = new OBSWebSocket();
  await obs.disconnect()
  await obs.connect("ws:localhost:4455", "HDwyJeYlTl6ZbUZZ")
  return obs;
}

export async function getSceneList(obs: OBSWebSocket): Promise<SceneList> {
  return await obs.call("GetSceneList") as SceneList;
}