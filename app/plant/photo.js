import react, { useState } from 'react';

import { View, Text, Image } from 'react-native';

import { SIZES, COLORS, icons } from '../../constants';
import { Button, ScreenTitle } from '../../components';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const PlantForm = () => {

    const router = useRouter();
    const [response, setResponse] = useState(null);
    const item = useLocalSearchParams();
    console.log(item);


    const screenStyle = {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        padding: SIZES.medium,
    };

    const imageViewStyle = {
        width: 200,
        height: 200,
        backgroundColor: COLORS.gray2,
        borderRadius: SIZES.xLarge,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: SIZES.medium,
    };

    const skip = () => {
        router.push({ pathname: '/', params: { reload: new Date().toISOString() } });
    }

    const galeryPhoto = () => {
        const options = { mediaType: 'photo', };
        launchImageLibrary(options, () => {
            console.log("library", response);
            setResponse(response);
        });
    }

    const cameraPhoto = () => {
        const options = {};
        launchCamera(options, () => {
            console.log("camera", response);
            setResponse(response);
        });
    }

    return (
        <View style={screenStyle}>
            <ScreenTitle title="Adicionar Foto" />

            <View style={imageViewStyle}>
                <Image source={icons.camera} />
            </View>

            <Button type="secondary" text="Adicionar foto da minha galeria" onPress={galeryPhoto} />
            <Button text="Tirar uma foto com a câmera" onPress={cameraPhoto} />
            <Button type="tertiary" text="Pular esta etapa" onPress={skip} />
        </View>
    )
}

export default PlantForm;