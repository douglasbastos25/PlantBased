import react from "react";

import { DEBUG, COLORS, icons, SIZES, FONT, FONT_SIZES } from '../../../constants'

import { Text } from "react-native";

const DebugBox = ({ text }) => {

    const debugStyle = {
        padding: SIZES.small,
        backgroundColor: COLORS.lightGray,
        color: COLORS.black,
        fontSize: FONT_SIZES.small,
        fontFamily: FONT.regular,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginBottom: SIZES.medium
    };

    return (
        DEBUG && <Text style={debugStyle}>{JSON.stringify(text)}</Text>
    );

}

export default DebugBox;