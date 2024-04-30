export function colorStrings(str, isDark = "true") {
    const darkColors = ["#F7E7AE", "#F7D5E4", "#F1AFE3", "#D89AF6", "#B58CE4", "#8A97F6", "#92E5A9", "#6BF4D2", "#F4D26B", "#F4A16B"];
    const lightColors = ["#FF9A61", "#FF6F61", "#FF61B2", "#FF61FF", "#61B2FF", "#61E3FF", "#61FFD9", "#61FF61", "#FFD961", "#FF9A61"];
    const colors = isDark ? darkColors : lightColors;
    return str.split("").map((letter, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
            {letter}
        </span>
    ));
}