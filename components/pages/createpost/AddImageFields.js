import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { TERTIARY_COLOR } from '../../../constants/colors';
import P from '../../Typography/P';
import getMediaPermissionGrantStatus from '../../../utils/getMediaPermissionGrantStatus';
import * as ImagePicker from 'expo-image-picker';
import showCancelableAlert from '../../../utils/showCancelableAlert';
import { useState } from 'react';

const AddImageFields = ({ images, setImages }) => {
  const [isPickingImage, setPickingImage] = useState(false);

  const screenWidth = Dimensions.get('screen').width;
  const imageContainerHeightAndWidth = (47 / 100) * screenWidth;

  const removeImageHandle = selectedImage => {
    setImages(images => {
      return [...images.filter(image => image !== selectedImage)];
    });
  };

  const addImagesClickHandle = async () => {
    const isMediaGranted = await getMediaPermissionGrantStatus();
    if (!isMediaGranted) {
      return;
    }
    setPickingImage(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 5,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setPickingImage(false);
    if (!result.canceled) {
      if (result.assets.length > 5) {
        showCancelableAlert(
          'Selection Limit exceed',
          'more than 5 images are not allowed sorry !!!'
        );
        return;
      }

      const selectedImages = result.assets.map(result => result.uri);
      setImages(selectedImages);
    }
  };

  if (isPickingImage) {
    return (
      <View className="px-2 my-5">
        <ActivityIndicator />
        <P extraStyle={'text-center'} size={16} type="regular">
          Loading your images ...
        </P>
      </View>
    );
  }

  return (
    <View className="px-2">
      <P type="regular" extraStyle={'mt-5 mb-5'}>
        Add Images *(max 10 images only)
      </P>
      <View className="flex-row flex-wrap justify-between">
        <TouchableOpacity
          onPress={addImagesClickHandle}
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

export default AddImageFields;

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
