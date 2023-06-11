import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';

const HeaderTitle = () => {
  return (
    <>
      <P type="bold" extraStyle="mb-[0.5px] text-white" size={24}>
        WalkThrough
      </P>
      <P extraStyle={'text-white'}>Understand how the process works.</P>
    </>
  );
};

export default HeaderTitle;
