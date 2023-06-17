import { Button } from '@rneui/themed';
import { SECONDARY_COLOR, TERTIARY_COLOR } from '../../constants/colors';
import { UBUNTU_REGULAR } from '../../constants/typography';
import { TouchableOpacity } from 'react-native';

const getColorByType = type => {
  if (type === 'DARK') {
    return TERTIARY_COLOR;
  }
  if (type === 'LIGHT') {
    return SECONDARY_COLOR;
  }
};

export default function Btn({
  clickHandle,
  title,
  type = 'LIGHT',
  iconName = 'checkmark',
  isLoading = false,
}) {
  return (
    <Button
      onPress={clickHandle}
      activeOpacity={1}
      title={title}
      loading={isLoading}
      icon={{
        type: 'ionicon',
        name: iconName,
        color: 'white',
        size: 16,
      }}
      iconContainerStyle={{
        marginLeft: 20,
      }}
      titleStyle={{
        fontFamily: UBUNTU_REGULAR,
        fontSize: 14,
      }}
      iconPosition={'right'}
      color={getColorByType(type)}
      buttonStyle={{
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
      }}
    />
  );
}
