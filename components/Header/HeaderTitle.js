import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';

const HeaderTitle = ({ title, content }) => {
  return (
    <>
      <P type="bold" extraStyle="mb-[0.5px] text-white" size={24}>
        {title ? title : 'XXXXXXXXXX'}
      </P>
      <P extraStyle={'text-white'}>
        {content ? content : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
      </P>
    </>
  );
};

export default HeaderTitle;
