import React from 'react';
import { Text } from '@pancakeswap-libs/uikit';
import CardValue from './CardValue';

const CakeWalletBalance = ({ cakeBalance }) => {
  return <CardValue value={cakeBalance} fontSize="24px" />;
};

export default CakeWalletBalance;