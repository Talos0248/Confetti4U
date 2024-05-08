export const colors = {
    regular: {
        dark: ["#F7E7AE", "#F7D5E4", "#F1AFE3", "#D89AF6", "#B58CE4", "#8A97F6", "#92E5A9", "#6BF4D2", "#F4D26B", "#F4A16B"],
        light: ["#FF9A61", "#FF6F61", "#FF61B2", "#FF61FF", "#B58CE4", "#61B2FF", "#61E3FF", "#61FFD9", "#61FF61", "#ffc205"]
    },
    snow: {
        dark: ["#5DADE2", "#AED6F1", "#85C1E9", "#BB8FCE", "#7FB3D5", "#5499C7", "#45B39D", "#76D7C4", "#73C6B6", "#82E0AA"],
        light: ["#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#18FFFF", "#B39DDB", "#9575CD", "#7E57C2", "#7986CB", "#64B5F6"]
    },
    hearts: {
        dark: ["#FAB1A0", "#FFB6C1", "#FFD1DC", "#D7BDE2", "#E8DAEF", "#D2B4DE", "#C39BD3", "#BB8FCE", "#A569BD", "#8E44AD"],
        light: ["#FF69B4", "#FFC0CB", "#DB7093", "#C71585", "#FF1493", "#FF5C8A", "#E10098", "#FF007F", "#FF00BF", "#FF00FF"]
    },
    stars: {
        dark: ["#FFD700", "#F9A602", "#FFA500", "#FF8C00", "#FFD740", "#FFC400", "#FFAB00", "#FFEA00", "#FFEE58", "#FFF176"],
        light: ["#FF6347", "#FF69B4", "#FFA500", "#FFC0CB", "#FF8C00", "#FF4500", "#FF1493", "#FF00FF", "#E6B0AA", "#D7BDE2"]
    },
    fireflies: {
        dark: ["#F4D03F", "#F7DC6F", "#F9E79F", "#FAD7A0", "#FDEBD0", "#F8C471", "#F5B041", "#F39C12", "#E67E22", "#D35400"],
        light: ["#84B1ED", "#9AD3DE", "#F8C471", "#C1E0F7", "#B5EAD7", "#ECC8AF", "#7B68EE", "#C7CEEA", "#FF9AA2", "#AAFFA9"]
    }
};

export function colorStrings(str, type = "regular", isDark = true) {
    const colorType = colors[type];
    const colorArray = isDark ? colorType.dark : colorType.light;

    return str.split("").map((letter, index) => (
        <span key={index} style={{ color: colorArray[index % colorArray.length] }}>
            {letter}
        </span>
    ));
}
