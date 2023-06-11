import P from '@components/Typography/P';

export default function (label) {
  return ({ focused }) => {
    return (
      <P size={12} type={focused ? 'regular' : 'light'}>
        {label}
      </P>
    );
  };
}
