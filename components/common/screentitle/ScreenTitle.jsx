import react from "react";
import { DEBUG, COLORS, icons, SIZES, FONT_SIZES, FONT } from '../../../constants'
import { Text } from "react-native";

const ScreenTitle = ({ title }) => {

    const style = {
        fontSize: FONT_SIZES.xLarge,
        fontFamily: FONT.title,
    };

    return <Text style={style}>{title}</Text>
}

export default ScreenTitle;