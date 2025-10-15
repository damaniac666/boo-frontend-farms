import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Heading, Image } from '@pancakeswap-libs/uikit';
import Page from 'components/layout/Page';
import FlexLayout from 'components/layout/Flex';
import farmsConfig from 'config/constants/farms';
import BigNumber from 'bignumber.js';
import Divider from './components/Divider';
import FarmCard from './components/FarmCard/FarmCard';
import { useWalletContext } from '../../utils/walletContext';
import { fetchSoulPrice, fetchKCALPrice } from '../../utils/phantasmaApi';

export interface FarmsProps {
  tokenMode?: boolean;
}

const Farms: React.FC<FarmsProps> = ({ tokenMode }) => {
  const { path } = useRouteMatch();
  const { account, connected } = useWalletContext();
  const [soulPrice, setSoulPrice] = useState(0);
  const [kcalPrice, setKcalPrice] = useState(0);

  useEffect(() => {
    const init = async () => {
      const soul = await fetchSoulPrice();
      const kcal = await fetchKCALPrice();
      setSoulPrice(soul);
      setKcalPrice(kcal);
    };
    init();
  }, []);

  // Enrich farm config with placeholder APY and userData
const enrichedFarms = farmsConfig.map((farm) => ({
  ...farm,
  apy: new BigNumber(soulPrice).div(1000), // Placeholder APY
  lpTotalInQuoteToken: 1000, // Placeholder TVL
  multiplier: `${farm.allocPoints / 100}X`, // ✅ derived from allocPoints
  isTokenOnly: farm.isTokenOnly, // ✅ preserved from config
  userData: connected
    ? {
        stakedBalance: '100000000', // 1 token in 8 decimals
        pendingReward: '0',         // ✅ stubbed
        checkedIn: false,           // ✅ stubbed (can wire in useSATRNEligibility later)
      }
    : {
        stakedBalance: '0',
        pendingReward: '0',
        checkedIn: false,
      },
}));

  return (
    <Page>
      <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
        {tokenMode
          ? 'Supply liquidity on SaturnDex or Single Stake KCAL/BOO here to earn BOO'
          : 'Supply liquidity on SaturnDex or Single Stake KCAL/BOO here to earn BOO'}
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        Deposit Fee will be used to buy back and BURN BOO
      </Heading>
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          {enrichedFarms.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              removed={false}
              soulPrice={soulPrice}
              kcalPrice={kcalPrice}
              account={account}
            />
          ))}
        </Route>
      </FlexLayout>
      <Image src="/images/egg/8.png" alt="illustration" width={1352} height={587} responsive />
    </Page>
  );
};

export default Farms;