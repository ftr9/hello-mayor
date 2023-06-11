import { Button } from '@rneui/themed';
import { SECONDARY_COLOR } from '../../constants/colors';
import { UBUNTU_REGULAR } from '../../constants/typography';

export default function Btn({ clickHandle, title }) {
  return (
    <Button
      onPress={clickHandle}
      activeOpacity={1}
      title={title}
      icon={{
        type: 'ionicon',
        name: 'chevron-forward-outline',
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
      color={SECONDARY_COLOR}
      buttonStyle={{
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
      }}
    />
  );
}
