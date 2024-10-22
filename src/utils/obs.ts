import OBSWebSocket from "obs-websocket-js";
import {SceneList} from "../Types/SceneList.ts";
import {InputList} from "../Types/InputList.ts";
import {ObsCredential} from "../Types/Credential.ts";

export async function getObs(obsCredential: ObsCredential): Promise<OBSWebSocket> {
  const obs = new OBSWebSocket();
  await obs.disconnect()
  await obs.connect(`ws:${obsCredential.host}:${obsCredential.port}`, obsCredential.password);
  return obs;
}

export async function getSceneList(obs: OBSWebSocket): Promise<SceneList> {
  return await obs.call("GetSceneList") as SceneList;
}
export async function getInputList(obs: OBSWebSocket): Promise<InputList> {
  return await obs.call("GetInputList") as InputList;
}