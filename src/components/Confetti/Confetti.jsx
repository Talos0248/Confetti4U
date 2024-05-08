import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize"
import {colors} from "../../utils/colorStrings.jsx";
import {randomInt} from "react-confetti/src/utils";
import "./Confetti.css";

function CustomConfetti({
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
    const colorsToUse = isDark ? darkColors : lightColors;
    const { width, height } = useWindowSize();
    return (
        <Confetti
            colors={colorsToUse}
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

function RegularConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={colors.dark.main} lightColors={colors.light.main} gravity={0.05} numberOfPieces={100}/>
}

function SnowConfetti({isDark}) {
    const snowflakes = [];

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
            <CustomConfetti isDark={isDark} darkColors={colors.dark.snow} lightColors={colors.light.snow} gravity={0.015} numberOfPieces={isDark ? 800 : 300} wind={0.002} drawShape={ctx => {
                const spikes = 6;
                const radius = isDark ? 2 : 4;
                const outerRadius = radius;
                const innerRadius = radius / 2;

                ctx.beginPath();
                ctx.moveTo(0, 0 - outerRadius);

                for (let i = 0; i < spikes; i++) {
                    ctx.lineTo(0, 0 - outerRadius);
                    ctx.rotate(Math.PI / spikes);
                    ctx.lineTo(0, 0 - innerRadius);
                    ctx.rotate(Math.PI / spikes);
                }

                ctx.closePath();
                ctx.fill();
            }}/>
        </div>
    );
}

function HeartConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={colors.dark.heart} lightColors={colors.light.heart} drawShape={ctx => {
        const size = 13;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);

        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, size * 0.75, 0, size * 0.75, 0, size);
        ctx.bezierCurveTo(0, size * 0.75, size / 2, size * 0.75, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);

        ctx.fill();
    }} gravity={0.03} />
}

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

function StarConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={colors.dark.star} lightColors={colors.light.star} drawShape={drawStar} gravity={0.01}/>
}

function FireflyConfetti({isDark}) {
    return <CustomConfetti isDark={isDark} darkColors={colors.dark.firefly} lightColors={colors.light.firefly} gravity={-0.01} numberOfPieces={400} fromBottom={true} initialVelocityY={2} tweenDuration={50000} drawShape={(ctx) => {
        ctx.beginPath();
        ctx.arc(0, 0, isDark ? 2 : 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }}/>
}

export {
    RegularConfetti,
    SnowConfetti,
    HeartConfetti,
    StarConfetti,
    FireflyConfetti
};
