import React from "react";
import { FlipWords } from "../ui/flip-words";


export function TagLine() {
    const words = ["style", "tech", "deals", "comfort", "trends"];

    return (
        <div className="h-[40rem] flex justify-center items-center px-4">
            <div
                className="text-5xl mx-auto  text-black dark:text-black font-normal">

                Discover the best in <br />
                <FlipWords words={words} />   — All in One Place.
            </div>
        </div>
    );
}
