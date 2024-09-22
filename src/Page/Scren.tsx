import {useState} from "react";
import getLs from "../utils/getLocalStorage.ts";
import setLs from "../utils/setLocalStorage.ts";

export default function Screen() {
    const [counter, setCounter] = useState(0);
    const [connected, setConnected] = useState(false);

    setInterval(function () {
        setCounter(getLs.COUNTER);
        setConnected(getLs.CONNECTED());
        if (getLs.REFRESH()) {
            window.location.reload();
            setLs.REFRESH(false);
        }
    }, 250);


    return (
        <div>

            <h1>Screen</h1>
            <div className={"countDown"}>Countdown: {counter}</div>

        </div>
    )
}