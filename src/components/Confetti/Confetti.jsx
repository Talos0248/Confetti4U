import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize"
import {
    darkColors,
    lightColors,
    darkSnowColors,
    lightSnowColors,
    darkHeartColors,
    lightHeartColors
} from "../../utils/colorStrings.jsx";
import {randomInt} from "react-confetti/src/utils";

export function CustomConfetti({
                                   isDark,
                                   darkColors,
                                   lightColors,
                                   drawShape,
                                   gravity,
                                   wind,
                                   numberOfPieces,
                                   recycle,
                                   tweenDuration
                               }) {
    const colors = isDark ? darkColors : lightColors;
    const {width, height} = useWindowSize()
    return (
        <Confetti
            colors={colors}
            width={width}
            height={height}
            numberOfPieces={numberOfPieces}
            drawShape={drawShape}
            gravity={gravity}
            wind={wind}
            recycle={recycle}
            tweenDuration={tweenDuration}
        />
    )
}

export function RegularConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkColors} lightColors={lightColors} gravity={0.05}
                           numberOfPieces={100}/>
}

export function SnowConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkSnowColors} lightColors={lightSnowColors} gravity={0.02}
                           numberOfPieces={isDark ? 800 : 300} wind={0.002} drawShape={ctx => {
        const spikes = 6;
        const radius = isDark ? 2 : 4; // Radius adjusted based on the theme
        const outerRadius = radius;
        const innerRadius = radius / 2;

        ctx.beginPath();
        ctx.moveTo(0, 0 - outerRadius); // Start from the top of the outer radius

        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(0, 0 - outerRadius);
            ctx.rotate(Math.PI / spikes); // Rotate to position for the inner radius
            ctx.lineTo(0, 0 - innerRadius); // Draw to inner radius
            ctx.rotate(Math.PI / spikes); // Rotate to position for the next outer radius
        }

        ctx.closePath(); // Close the path to finish the shape
        ctx.fill();
    }}/>
}

export function HeartConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkHeartColors} lightColors={lightHeartColors}/>
}