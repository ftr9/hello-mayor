import { View, Text } from 'react-native';
import React from 'react';
import clsx from 'clsx';

const P = ({ children, type = 'light', size = 14, extraStyle }) => {
  return (
    <Text
      className={clsx(
        extraStyle,
        [
          type === 'light' && 'font-LightUbuntu',
          type === 'regular' && 'font-RegularUbuntu',
          type === 'bold' && 'font-BoldUbuntu',
        ],
        [
          size === 10 && 'text-[10px]',
          size === 12 && 'text-[12px]',
          size === 14 && 'text-[14px]',
          size === 16 && 'text-[16px]',
          size === 18 && 'text-[18px]',
          size === 20 && 'text-[20px]',
          size === 22 && 'text-[22px]',
          size === 24 && 'text-[24px]',
          size === 26 && 'text-[26px]',
          size === 28 && 'text-[28px]',
          size === 30 && 'text-[30px]',
          size === 32 && 'text-[32px]',
          size === 34 && 'text-[34px]',
          size === 36 && 'text-[36px]',
        ]
      )}
    >
      {children}
    </Text>
  );
};

export default P;
