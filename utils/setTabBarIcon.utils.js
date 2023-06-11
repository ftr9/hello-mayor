import { Icon } from '@rneui/themed';

export default function (activeIconName, inactiveIconName) {
  return ({ focused }) => {
    if (focused) {
      return <Icon size={20} name={activeIconName} type="ionicon" />;
    }
    return <Icon size={20} name={inactiveIconName} type="ionicon" />;
  };
}
