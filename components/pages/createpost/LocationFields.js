import { Alert, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import { Divider, Overlay, Avatar } from '@rneui/themed';
import IconBtn from '../../Button/IconBtn';
import ControlledInputField from '../../InputField/ControlledInputField';
import { WebView } from 'react-native-webview';
import P from '../../Typography/P';
import { SECONDARY_COLOR } from '../../../constants/colors';

const LocationFields = ({ setFormValue, control, errors }) => {
  const [isMapOpen, setMapOpen] = useState(false);
  const [isLoadingMap, setMapLoading] = useState(true);
  const [LatLng, setLatLng] = useState([]);

  const openMapClickHandle = async () => {
    const permissionResponse = await Location.getForegroundPermissionsAsync();
    if (!permissionResponse.granted) {
      const requestReponse = await Location.requestForegroundPermissionsAsync();
      if (!requestReponse.granted) {
        Alert.alert(
          'Location denied',
          'you must give permission to access location otherwise you wont be able to create issue',
          [
            {
              text: 'ok',
              style: 'cancel',
            },
            {
              text: 'enable location',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }
      return;
    }
    try {
      const userLocation = await Location.getCurrentPositionAsync();
      setFormValue('lat', `${userLocation.coords.latitude}`);
      setFormValue('long', `${userLocation.coords.longitude}`);
      setLatLng([userLocation.coords.latitude, userLocation.coords.longitude]);

      setMapOpen(true);
    } catch (err) {
      Alert.alert(
        'Device Location',
        'Please turn device location for pin point location',
        [
          {
            text: 'ok',
            style: 'cancel',
          },
        ]
      );
    }
  };
  const closeMapClickHandle = () => {
    setMapOpen(false);
    setMapLoading(true);
  };
  return (
    <>
      <Divider
        width={1}
        style={{
          marginHorizontal: 50,
        }}
      />
      <View className="mx-3">
        <P extraStyle={'my-4'}>Add Location from Map *</P>
        <IconBtn clickHandle={openMapClickHandle} title={'Select from map'} />
      </View>

      <View className="flex-row mt-5">
        <View className="w-[50%]">
          <ControlledInputField
            label={'Latitude'}
            rules={{
              required: {
                value: true,
                message: 'Latitude required',
              },
            }}
            placeholder={'Latitude'}
            control={control}
            hasError={errors?.lat}
            errorMessage={errors?.lat?.message}
            name={'lat'}
          />
        </View>

        <View className="w-[50%]">
          <ControlledInputField
            rules={{
              required: {
                value: true,
                message: 'longitude required',
              },
            }}
            label={'Longitude'}
            placeholder={'Longitude'}
            control={control}
            hasError={errors?.long}
            errorMessage={errors?.long?.message}
            name={'long'}
          />
        </View>
      </View>
      <Divider
        width={1}
        style={{
          marginHorizontal: 50,
        }}
      />
      <Overlay
        animationType={'slide'}
        overlayStyle={{
          height: '100%',
          width: '100%',
          padding: 0,
          position: 'relative',
        }}
        presentationStyle={'overFullScreen'}
        isVisible={isMapOpen}
      >
        <TouchableOpacity
          onPress={closeMapClickHandle}
          className="absolute z-50 top-2 right-2"
        >
          <Avatar
            size={50}
            rounded
            containerStyle={{
              backgroundColor: SECONDARY_COLOR,
            }}
            icon={{ name: 'chevron-back-outline', type: 'ionicon' }}
          />
        </TouchableOpacity>
        {isLoadingMap && (
          <View className="absolute z-40 flex justify-center items-center top-0 left-0 h-full w-full ">
            <ActivityIndicator size={'large'} color={SECONDARY_COLOR} />
            <P>Hold On please</P>
          </View>
        )}
        <WebView
          onLoadEnd={() => {
            setMapLoading(false);
          }}
          style={{
            flex: 1,
          }}
          source={{
            uri: `https://hello-mayor-locate-issue.netlify.app?lat=${LatLng[0]}&lng=${LatLng[1]}`,
          }}
          onMessage={e => {
            const mapData = JSON.parse(e.nativeEvent.data);
            setLatLng([mapData.lat, mapData.lng]);
            setFormValue('lat', `${mapData.lat}`);
            setFormValue('long', `${mapData.lng}`);
            closeMapClickHandle();
          }}
        />
      </Overlay>
    </>
  );
};

export default LocationFields;
