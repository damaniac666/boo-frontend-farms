import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Text, Flex, Image } from '@pancakeswap-libs/uikit';
import { useWalletContext } from '../../utils/walletContext';
import { fetchSoulPrice, fetchKCALPrice, fetchContractBalance } from '../../utils/phantasmaApi';
// import { useFeeCollector } from '../../hooks/useFeeCollector'; // Temporarily disabled due to RPC issues

const Container = styled.div`
  padding: 32px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 32px;
  color: red;
  margin-bottom: 16px;
`;

const BurnButton = styled(Button)<{ active?: boolean }>`
  background-color: red;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  font-size: 18px;
  color: white;
  margin: 24px auto;
  transition: box-shadow 0.3s ease;

  ${({ active }) =>
    active &&
    `
    box-shadow: 0 0 12px 4px rgba(255, 0, 0, 0.6);
    animation: pulse 1.5s infinite;
  `}

  @keyframes pulse {
    0% {
      box-shadow: 0 0 12px 4px rgba(255, 0, 0, 0.6);
    }
    50% {
      box-shadow: 0 0 20px 8px rgba(255, 0, 0, 0.9);
    }
    100% {
      box-shadow: 0 0 12px 4px rgba(255, 0, 0, 0.6);
    }
  }
`;

const CounterSection = styled(Flex)`
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  gap: 24px;
`;

const CounterBox = styled.div`
  text-align: center;
`;

const BalanceSection = styled(Flex)`
  justify-content: space-around;
  margin-top: 24px;
`;

const CenteredImage = styled(Image)`
  display: block;
  margin: 0 auto;
`;

const BurnPage: React.FC = () => {
  const [kcalBalance, setKcalBalance] = useState(0);
  const booBalance = 5;
  const [soulEstimate, setSoulEstimate] = useState(0);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const { account, connected } = useWalletContext();

  const CONTRACT_ADDRESS = 'S3d8omDir3j7kUBFU7e2j1d3jhE7hZcmPZ6A2wsmomhwz6r';

  // Stubbed logic while useFeeCollector is disabled
  const burn = async (): Promise<void> => {
    console.log('[BurnPage] Burn simulated');
  };

  const stats = {
    booBurned: 12345,
    kcalBurned: 67890,
    soulRewarded: 4321,
    summary: 'Stats are temporarily hardcoded due to RPC issues.',
  };

  useEffect(() => {
    const isEligible = kcalBalance >= 1000 && booBalance >= 0;
    setButtonEnabled(isEligible);
  }, [kcalBalance, booBalance]);

  useEffect(() => {
    const fetchKCAL = async () => {
      const balance = await fetchContractBalance(CONTRACT_ADDRESS, 'KCAL');
      setKcalBalance(balance);
      console.log('[BurnPage] KCAL Balance:', balance);
    };

    fetchKCAL();
  }, []);

  useEffect(() => {
    const calculateEstimate = async () => {
      try {
        const kcalPrice = await fetchKCALPrice();
        const soulPrice = await fetchSoulPrice();

        const excessKCAL = Math.max(kcalBalance - 20, 0);
        const reward = (excessKCAL * 0.1) / (soulPrice / kcalPrice);

        setSoulEstimate(reward);
        console.log('[BurnPage] SOUL Estimate:', reward.toFixed(2));
      } catch (err) {
        console.error('[BurnPage] Failed to fetch prices:', err);
      }
    };

    calculateEstimate();
  }, [kcalBalance]);

  const handleBurn = async () => {
    if (!connected || !account) {
      console.warn('[BurnPage] Wallet not connected');
      return;
    }

    await burn();
    console.log('[BurnPage] Burn triggered');
  };

  return (
    <Container>
      <Heading>BURN BOO!</Heading>
      <Text bold fontSize="20px" mb="16px">
        When the contract holds enough KCAL and BOO, anyone can trigger the burn. This will destroy tokens and reward SOUL.
      </Text>

      <BurnButton
        active={buttonEnabled && connected}
        disabled={!buttonEnabled || !connected}
        onClick={handleBurn}
      >
        BURN
      </BurnButton>

      <BalanceSection style={{ flexDirection: 'column', alignItems: 'center', marginTop: '32px' }}>
        <Text bold fontSize="20px" mb="16px">Current Contract Balance</Text>
        <Text>KCAL Balance: {kcalBalance.toFixed(2)}</Text>
        <Text>BOO Balance: {booBalance.toFixed(2)}</Text>
        <Text>SOUL Estimate: {soulEstimate.toFixed(2)}</Text>
      </BalanceSection>

      <CounterSection>
        <CounterBox>
          <CenteredImage src="/images/farms/boo.png" width={40} height={40} alt="BOO" />
          <Text bold fontSize="20px" mb="16px">Boo Burned: {stats.booBurned}</Text>
        </CounterBox>
        <CounterBox>
          <CenteredImage src="/images/farms/kcal.png" width={40} height={40} alt="KCAL" />
          <Text bold fontSize="20px" mb="16px">KCAL Burned: {stats.kcalBurned}</Text>
        </CounterBox>
        <CounterBox>
          <CenteredImage src="/images/farms/SOUL.png" width={40} height={40} alt="SOUL" />
          <Text bold fontSize="20px" mb="16px">SOUL Rewarded: {stats.soulRewarded}</Text>
        </CounterBox>
      </CounterSection>
    </Container>
  );
};

export default BurnPage;