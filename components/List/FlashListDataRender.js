import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';
import React from 'react';
import { SECONDARY_COLOR, PRIMARY_COLOR } from '../../constants/colors';

const FlashListDataRender = ({
  isRefreshing,
  onRefresh,
  data = [],
  renderItem,
  estimatedItemSize = 50,
}) => {
  return (
    <FlashList
      refreshControl={
        <RefreshControl
          progressBackgroundColor={SECONDARY_COLOR}
          colors={[PRIMARY_COLOR]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      data={data}
      renderItem={renderItem}
      estimatedItemSize={estimatedItemSize}
    />
  );
};

export default FlashListDataRender;
