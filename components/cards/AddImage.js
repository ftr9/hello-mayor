import getMediaPermissionGrantStatus from '../../utils/getMediaPermissionGrantStatus';
import getValidImageExtension from '../../utils/checkAndGetValidImgExt';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import { Avatar } from '@rneui/themed';
import ExistingImageCard from './ExistingImageCard';
import P from '../Typography/P';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../../constants/colors';

const AddImage = ({ avatar, setAvatar }) => {
  const addImageClickHandle = async () => {
    //1) @configs get media permission first
    const isMediaPermissionGranted = await getMediaPermissionGrantStatus();
    if (!isMediaPermissionGranted) {
      return;
    }

    //2) Launch the media library to grab an image
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (imageResult.canceled) {
      return;
    }

    //3) make sure valid image is selected
    const imageExtension = getValidImageExtension(imageResult.assets[0].uri);
    if (!imageExtension) {
      showCancelableAlert(
        'Unsupported image',
        'please select valid jpeg or png or jpg image'
      );
      return false;
    }

    //4) update the state - set avatar and base 64 image
    setAvatar(imageResult.assets[0].uri);
  };

  return (
    <View className=" items-center mb-8">
      <P extraStyle="mb-5">Add Your Profile Picture (optional)</P>
      {avatar ? (
        <View className="flex justify-center items-center relative">
          <ExistingImageCard
            imageUri={avatar}
            addPressHandle={addImageClickHandle}
          />
        </View>
      ) : (
        <Avatar
          onPress={addImageClickHandle}
          containerStyle={{
            backgroundColor: TERTIARY_COLOR,
          }}
          size={120}
          rounded
          icon={{ type: 'ionicon', name: 'add-outline', color: PRIMARY_COLOR }}
        />
      )}
    </View>
  );
};

export default AddImage;
