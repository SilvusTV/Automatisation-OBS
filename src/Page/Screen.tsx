import { useState, useEffect, useMemo } from "react";
import getLs from "../utils/getLocalStorage.ts";
import setLs from "../utils/setLocalStorage.ts";
import "../assets/style/screen.css";
import Working from "./Screen/Working.tsx";
import Pause from "./Screen/Pause.tsx";

export default function Screen() {
  const [state, setState] = useState({
    counter: getLs.COUNTER(),
    workingTime: getLs.WORKING_TIME(),
    pauseTime: getLs.PAUSE_TIME(),
    totalWorkingTime: getLs.TOTAL_TIME(),
    isWorkScene: getLs.WORKING_SCENE() === getLs.CURRENT_SCENE(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedState = {
        counter: getLs.COUNTER(),
        workingTime: getLs.WORKING_TIME(),
        pauseTime: getLs.PAUSE_TIME(),
        totalWorkingTime: getLs.TOTAL_TIME(),
        isWorkScene: getLs.WORKING_SCENE() === getLs.CURRENT_SCENE(),
      };

      // Actualiser uniquement si des changements sont détectés
      setState((prevState) => {
        if (
          prevState.counter !== updatedState.counter ||
          prevState.workingTime !== updatedState.workingTime ||
          prevState.pauseTime !== updatedState.pauseTime ||
          prevState.totalWorkingTime !== updatedState.totalWorkingTime ||
          prevState.isWorkScene !== updatedState.isWorkScene
        ) {
          return updatedState;
        }
        return prevState;
      });

      // Gestion du rafraîchissement
      if (getLs.REFRESH()) {
        window.location.reload();
        setLs.REFRESH(false);
      }
    }, 100);

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la désactivation
  }, []);

  // Pré-mémoriser le calcul de la largeur de la barre
  const countdownBarWidth = useMemo(() => {
    const totalSeconds = state.isWorkScene
      ? state.workingTime * 60
      : state.pauseTime * 60;
    return (state.counter / totalSeconds) * 100;
  }, [state.counter, state.isWorkScene, state.workingTime, state.pauseTime]);

  return state.isWorkScene ? (
    <Working
      counter={state.counter}
      workingTime={state.workingTime}
      pauseTime={state.pauseTime}
      totalWorkingTime={state.totalWorkingTime}
      countdownBarWidth={countdownBarWidth}
    />
  ) : (
    <Pause
      counter={state.counter}
      workingTime={state.workingTime}
      pauseTime={state.pauseTime}
      countdownBarWidth={countdownBarWidth}
    />
  );
}
