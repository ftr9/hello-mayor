import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import P from '../../components/Typography/P';
import clsx from 'clsx';

const NormalBtn = ({ title, type }) => {
  return (
    <TouchableOpacity
      className={clsx([
        'bg-bgSecondary',
        type === 'DARK' && ' bg-bgTertiary',
        'flex-row justify-center items-start',
        'px-5 py-2 h-[30px] rounded-md',
      ])}
    >
      <P size={12} extraStyle={' text-center text-white'}>
        {title}
      </P>
    </TouchableOpacity>
  );
};

export default NormalBtn;
