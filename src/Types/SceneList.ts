import {Scene} from "./Scene.ts";

export type SceneList = {
  currentPreviewSceneName?: string;
  currentPreviewSceneUuid?: string;
  currentProgramSceneName: string;
  currentProgramSceneUuid: string;
  scenes: Scene[];
}