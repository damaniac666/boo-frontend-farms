import React from 'react';
import { Text } from '@pancakeswap-libs/uikit';
import CardValue from './CardValue';

const CakeHarvestBalance = ({ earningsSum }) => {
  return <CardValue value={earningsSum} />;
};

export default CakeHarvestBalance;