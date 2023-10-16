import React from 'react';
import { Text } from 'react-native';

import { SIZES, FONT } from '../../../constants';

const EmptyState = () => {

    let defaultStyleWithMargin = {
        fontFamily: FONT.light,
        marginBottom: SIZES.small
    };
    let boldStyleWithMargin = {
        ...defaultStyleWithMargin,
        fontFamily: FONT.medium,
    };

    return (<>
        <Text style={defaultStyleWithMargin}>Você ainda não cadastrou nenhuma planta.</Text>
        <Text style={boldStyleWithMargin}>Começe já o seu jardim.</Text>
    </>);
}

export default EmptyState;