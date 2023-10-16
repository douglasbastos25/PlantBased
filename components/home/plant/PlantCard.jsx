import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DebugBox from '../../common/debug/DebugBox.jsx';
import { useRouter } from "expo-router";

import { COLORS, FONT } from '../../../constants';

import Button from '../../common/button/Button.jsx';

const PlantCard = ({ plant }) => {
    const router = useRouter();

    const defaultStyle = {
        fontFamily: FONT.regular
    };
    const boldStyle = {
        ...defaultStyle,
        fontWeight: 'bold',
    };

    console.log("images", plant?.images)

    return (
        <>

            <TouchableOpacity
                onPress={() => {
                    router.push(`/plant/${plant.id}`);
                }}
            >
                <DebugBox text={plant} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                    // light gray border with rounded corners
                    borderWidth: 1,
                    borderColor: COLORS.gray2,
                    borderRadius: 5,
                    padding: 6,
                }}>
                    <View style={{
                        flex: 1,
                        padding: 6,
                        marginRight: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {plant?.images && plant.images.length > 0
                            ? <Image source={{ uri: plant.images[0] }} style={{ width: 50, height: 100 }} />
                            : <Text style={{
                                ...defaultStyle,
                                justifyContent: 'center',
                                backgroundColor: '#F0F0F0',
                                alignItems: 'center',
                            }}>Sem imagem</Text>}
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={boldStyle}>{plant.name}</Text>
                        <Text style={defaultStyle}>{plant.species ?? 'Espécie não informada'}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </>
    );
}

export default PlantCard;