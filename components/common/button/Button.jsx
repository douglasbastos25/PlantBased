import react from "react";

import { useFonts } from 'expo-font';


import { DEBUG, COLORS, icons, SIZES, FONT, FONT_SIZES } from '../../../constants'


import { Text, TouchableOpacity } from "react-native";

const Button = ({ text, size, onPress, type }) => {

    var backgroundColor = size == "SMALL" ? COLORS.white : COLORS.primary;
    var textColor = COLORS.white;
    var fontFamily = FONT.medium;

    if (type == "secondary") {
        fontFamily = FONT.regular;
        textColor = COLORS.black;
        backgroundColor = COLORS.secondary;
    }

    if (type == "tertiary") {
        fontFamily = FONT.regular;
        backgroundColor = COLORS.tertiary;
        textColor = COLORS.black;
    }

    let buttonStyle = {
        backgroundColor,
        paddingVertical: size == "SMALL" ? 0 : 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: size == "SMALL" ? 0 : 12,
    }

    let textStyle = {
        fontFamily,
        color: textColor,
        fontSize: size == "SMALL" ? FONT_SIZES.small : FONT_SIZES.medium,
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;