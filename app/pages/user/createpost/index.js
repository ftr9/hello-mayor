import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import InputField from '@components/InputField/InputField';
import { Avatar, Divider, Icon } from '@rneui/themed';
import P from '@components/Typography/P';
import IconBtn from '@components/Button/IconBtn';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

import { TERTIARY_COLOR, SECONDARY_COLOR } from '@constants/colors';
import { Overlay } from '@rneui/themed';

const CreatePost = () => {
  return (
    <ScrollView className="flex-1 my-5">
      <CreatePost.TextFields />

      <CreatePost.LocationFields />

      <CreatePost.AddImageFields />

      <CreatePost.Submit />
    </ScrollView>
  );
};

CreatePost.Submit = () => {
  return (
    <View className="mx-2 my-5">
      <IconBtn title={'Post Issue'} />
    </View>
  );
};

CreatePost.TextFields = () => {
  return (
    <>
      <InputField
        label="Title *"
        placeholder={'title of issue eg.road problem,shop problem'}
      />
      <InputField
        label="Description  *"
        placeholder={'Enter full description'}
      />
      <InputField
        label="Full Location *"
        placeholder="Enter the full location where issue is present"
      />
    </>
  );
};

CreatePost.LocationFields = () => {
  const [isMapOpen, setMapOpen] = useState(false);
  const [isLoadingMap, setMapLoading] = useState(true);

  const openMapClickHandle = () => {
    setMapOpen(true);
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
          <InputField label={'Latitude'} placeholder={'Lat'} />
        </View>

        <View className="w-[50%]">
          <InputField label={'Longitude'} placeholder={'Long'} />
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
            uri: 'https://hello-mayor-locate-issue.netlify.app',
          }}
          onMessage={e => {
            console.log(e.nativeEvent.data);
          }}
        />
      </Overlay>
    </>
  );
};

CreatePost.AddImageFields = () => {
  const screenWidth = Dimensions.get('screen').width;
  const imageContainerHeightAndWidth = (47 / 100) * screenWidth;

  const [images, setImages] = useState([
    'https://images.pexels.com/photos/10120626/pexels-photo-10120626.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/10120630/pexels-photo-10120630.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/10120670/pexels-photo-10120670.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/14764329/pexels-photo-14764329.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/14764329/pexels-photo-14764329.jpeg?auto=compress&cs=tinysrgb&w=400',
  ]);

  const removeImageHandle = selectedImage => {
    setImages(images => {
      return [...images.filter(image => image !== selectedImage)];
    });
  };

  return (
    <View className="px-2">
      <P type="regular" extraStyle={'mt-5 mb-5'}>
        Add Images *(max 10 images only)
      </P>
      <View className="flex-row flex-wrap justify-between">
        <TouchableOpacity
          style={[
            styles.addImageContainerStyle,
            {
              height: imageContainerHeightAndWidth,
              width: imageContainerHeightAndWidth,
            },
          ]}
        >
          <Icon name="add" type={'ionicon'} size={50} color={'white'} />
        </TouchableOpacity>
        {images.map((image, index) => {
          return (
            <SelectedImageCard
              key={index}
              height={imageContainerHeightAndWidth}
              width={imageContainerHeightAndWidth}
              imageUrl={image}
              removeImageHandle={removeImageHandle}
            />
          );
        })}
      </View>
    </View>
  );
};

const SelectedImageCard = ({ height, width, imageUrl, removeImageHandle }) => {
  return (
    <View
      style={[
        styles.addImageContainerStyle,
        {
          height: height,
          width: width,
        },
      ]}
    >
      <Image
        className="h-full w-full"
        source={{
          uri: imageUrl,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          removeImageHandle(imageUrl);
        }}
        className="absolute top-2 right-2"
      >
        <Icon name="close-outline" type="ionicon" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addImageContainerStyle: {
    backgroundColor: TERTIARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
    marginVertical: 2,
    overflow: 'hidden',
  },
});

export default CreatePost;
