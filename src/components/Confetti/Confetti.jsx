import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize"
import {
    darkColors,
    lightColors,
    darkSnowColors,
    lightSnowColors,
    darkHeartColors,
    lightHeartColors,
    darkStarColors,
    lightStarColors,
    lightFireflyColors,
    darkFireflyColors
} from "../../utils/colorStrings.jsx";
import {randomInt} from "react-confetti/src/utils";
import "./Confetti.css";

export function CustomConfetti({
                                   isDark,
                                   darkColors,
                                   lightColors,
                                   drawShape,
                                   gravity,
                                   wind,
                                   numberOfPieces,
                                   recycle,
                                   tweenDuration,
                                   fromBottom,
    initialVelocityY
                               }) {
    const colors = isDark ? darkColors : lightColors;
    const { width, height } = useWindowSize();
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
            confettiSource={{ x: 0, y: fromBottom ? height : 0, w: width, h: 0 }}
            initialVelocityY={initialVelocityY}
        />
    )
}

export function RegularConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkColors} lightColors={lightColors} gravity={0.05}
                           numberOfPieces={100}/>
}


export function SnowConfetti({isDark}) {
    const snowflakes = [];

    // i is for snowflakeCount
    for (let i = 0; i < 12; i++) {
        snowflakes.push(
            <div key={i} className="snowflake">
                <div className="inner">❅</div>
            </div>
        );
    }

    return (
        <div className="snowflakes" aria-hidden="true">
            {snowflakes}
            <CustomConfetti isDark={isDark} darkColors={darkSnowColors} lightColors={lightSnowColors} gravity={0.015}
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
        </div>
    );
}

// HEART CONFETTI
export function HeartConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkHeartColors} lightColors={lightHeartColors} drawShape={
        ctx => {
            const size = 13; // Default size of the hearts
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            // Top left curve
            ctx.bezierCurveTo(
                0, 0,
                -size / 2, 0,
                -size / 2, topCurveHeight
            );

            // Bottom left curve
            ctx.bezierCurveTo(
                -size / 2, size * 0.75,
                0, size * 0.75,
                0, size
            );

            // Bottom right curve
            ctx.bezierCurveTo(
                0, size * 0.75,
                size / 2, size * 0.75,
                size / 2, topCurveHeight
            );

            // Top right curve
            ctx.bezierCurveTo(
                size / 2, 0,
                0, 0,
                0, topCurveHeight
            );

            ctx.fill();
        }
    } gravity={0.03}
    />
}

// STAR CONFETTI
function drawStar(ctx) {
    const numPoints = this.numPoints || randomInt(4, 6)
    this.numPoints = numPoints
    const outerRadius = this.w/2
    const innerRadius = outerRadius / 2
    ctx.beginPath()
    ctx.moveTo(0, 0 - outerRadius)

    for (let n = 1; n < numPoints * 2; n++) {
        const radius = n % 2 === 0 ? outerRadius : innerRadius
        const x = radius * Math.sin((n * Math.PI) / numPoints)
        const y = -1 * radius * Math.cos((n * Math.PI) / numPoints)
        ctx.lineTo(x, y)
    }
    ctx.fill()
    ctx.closePath()
}

export function StarConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkStarColors} lightColors={lightStarColors}
                           drawShape={drawStar} gravity={0.01}/>
}

export function FireflyConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={darkFireflyColors} lightColors={lightFireflyColors} gravity={-0.01}
                           numberOfPieces={400} fromBottom={true} initialVelocityY={2} tweenDuration={50000} drawShape={
        (ctx) => {
            ctx.beginPath();
            ctx.arc(0, 0, isDark ? 2 : 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }/>
}