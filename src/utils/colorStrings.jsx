export const darkColors = ["#F7E7AE", "#F7D5E4", "#F1AFE3", "#D89AF6", "#B58CE4", "#8A97F6", "#92E5A9", "#6BF4D2", "#F4D26B", "#F4A16B"];
export const lightColors = ["#FF9A61", "#FF6F61", "#FF61B2", "#FF61FF", "#B58CE4", "#61B2FF", "#61E3FF", "#61FFD9", "#61FF61", "#ffc205"];


export const lightSnowColors = ["#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#18FFFF", "#B39DDB", "#9575CD", "#7E57C2", "#7986CB", "#64B5F6"];
export const darkSnowColors = ["#5DADE2", "#AED6F1", "#85C1E9", "#BB8FCE", "#7FB3D5", "#5499C7", "#45B39D", "#76D7C4", "#73C6B6", "#82E0AA"]
;

export const lightHeartColors = ["#FF69B4", "#FFC0CB", "#DB7093", "#C71585", "#FF1493", "#FF5C8A", "#E10098", "#FF007F", "#FF00BF", "#FF00FF"]
export const darkHeartColors = ["#FAB1A0", "#FFB6C1", "#FFD1DC", "#D7BDE2", "#E8DAEF", "#D2B4DE", "#C39BD3", "#BB8FCE", "#A569BD", "#8E44AD"]



export function colorStrings(str, isDark = "true") {
    const colors = isDark ? darkColors : lightColors;
    return str.split("").map((letter, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
            {letter}
        </span>
    ));
}