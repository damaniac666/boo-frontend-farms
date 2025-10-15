import React, { useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled, { keyframes } from 'styled-components';
import {
  Flex,
  Text,
  Skeleton,
  Button as PancakeButton,
  Heading,
  
} from '@pancakeswap-libs/uikit';
import ExpandableSectionButton from 'components/ExpandableSectionButton';
import DetailsSection from './DetailsSection';
import CardHeading from './CardHeading';
import ApyButton from './ApyButton';
import { useWalletContext } from '../../../../utils/walletContext';
import useSATRNEligibility from '../../../../hooks/useSATRNEligibility';
import { useMasterChefV2 } from '../../../../hooks/masterchef/useMasterChefV2';
import masterChefConfig from '../../../../config/masterchef';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import { FarmWithStakedValue } from './types';

const RainbowLight = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1),
              0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`;

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`;

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? 'auto' : '0px')};
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  padding: 32px;
  width: 320px;
  text-align: center;
  box-shadow: 0 0 24px rgba(0,0,0,0.2);
  color: ${({ theme }) => theme.colors.text};
`;

const WalletButton = styled(PancakeButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  font-size: 16px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    filter: ${({ theme }) => theme.isDark ? 'brightness(0.8)' : 'none'};
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.input};
  width: 100%;
  margin-bottom: 4px;
`;

interface FarmCardProps {
  farm: FarmWithStakedValue;
  removed: boolean;
  cakePrice?: BigNumber;
  soulPrice: number;     // ✅ required
  kcalPrice: number;     // ✅ required
  account?: string;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, account: propAccount }) => {
  const { account: contextAccount, login } = useWalletContext();
  const account = propAccount || contextAccount;
  const [showExpandableSection, setShowExpandableSection] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [amount, setAmount] = useState('');
  const masterChef = useMasterChefV2(masterChefConfig);
  const isEligible = useSATRNEligibility(account ?? '', farm.lpSymbol);
  

  const earnings = farm.userData?.pendingReward
    ? new BigNumber(farm.userData.pendingReward)
    : new BigNumber(0);

  const stakedBalance = farm.userData?.stakedBalance
    ? new BigNumber(farm.userData.stakedBalance)
    : new BigNumber(0);

  const walletBalance = useTokenBalance(farm.tokenSymbol, account);
  const hasCheckedIn = farm.userData?.checkedIn ?? false;

  let farmImage: string;
  if (farm.image) {
    farmImage = farm.image;
  } else if (farm.isTokenOnly) {
    farmImage = farm.tokenSymbol.toLowerCase();
  } else {
    farmImage = `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`;
  }

  const totalValue = useMemo(() => {
    if (!farm.lpTotalInQuoteToken || !cakePrice) return null;
    return new BigNumber(farm.lpTotalInQuoteToken).times(cakePrice);
  }, [farm.lpTotalInQuoteToken, cakePrice]);

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-';

  const lpLabel = farm.lpSymbol?.toUpperCase().replace('PANCAKE', '');
  // const multiplier = farm.multiplier?.replace('X', '') ?? '-';
  const multiplier = farm.multiplier ?? '-';
  
  type WalletProvider = 'poltergeist' | 'ecto' | 'auto';

const handleWalletConnect = (walletType: WalletProvider) => {
  login(walletType);
  setShowWalletModal(false);
};

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleHarvest = async () => {
    if (!account || earnings.isZero()) return;
    try {
      await masterChef.deposit(farm.pid, 0);
    } catch (err) {
      console.error('[FarmCard] Harvest error:', err);
    }
  };

  const handleCheckIn = async () => {
    if (!account || !isEligible || hasCheckedIn) return;
    try {
      await masterChef.checkIn(farm.pid);
    } catch (err) {
      console.error('[FarmCard] Check-in error:', err);
    }
  };

  const handleDeposit = async () => {
  const parsedAmount = parseFloat(amount);
  if (!account || Number.isNaN(parsedAmount) || parsedAmount <= 0) return;

  // const amountInUnits = Math.floor(parsedAmount * 10 ** 10); // BOO_DECIMALS = 10

  try {
    await masterChef.deposit(farm.pid, parsedAmount); // This calls the hook
    setAmount('');
  } catch (err) {
    console.error('[FarmCard] Deposit error:', err);
  }
};


  const handleWithdraw = async () => {
    if (!account || stakedBalance.isZero()) return;
    try {
      await masterChef.withdraw(Number(farm.pid), Number(amount));
    } catch (err) {
      console.error('[FarmCard] Withdraw error:', err);
    }
  };

  // console.log('[FarmCard] farm:', farm);
  return (
    <FCard>
      {farm.tokenSymbol === 'BOO' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={multiplier}
        isTokenOnly={farm.isTokenOnly}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />

      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>APY</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        {farm.apy ? (
              <ApyButton
  lpLabel={lpLabel}
  apy={farm.apy}
  tokenAddresses={farm.tokenAddresses}
/>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}

      <Flex justifyContent="space-between">
        <Text>Stake</Text>
        <Text bold>{lpLabel}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text>Staked</Text>
        <Text bold>{stakedBalance.toFixed(2)}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text>Deposit Fee</Text>
        <Text bold style={{ fontSize: '24px' }}>
          {(farm.depositFeeBP ?? 0) / 100}%
        </Text>
      </Flex>

      <Flex justifyContent="space-between" mt="24px">
        <Text>BOO Earned</Text>
        <Text bold>{earnings.toFixed(2)}</Text>
      </Flex>

      <Flex justifyContent="space-between" mt="12px">
        <PancakeButton disabled={!account || earnings.isZero()} onClick={handleHarvest}>
          Harvest
        </PancakeButton>
      </Flex>

      {!account && (
  <Flex mt="16px">
    <PancakeButton onClick={() => setShowWalletModal(true)} style={{ width: '100%' }}>
      Connect Wallet
    </PancakeButton>
  </Flex>
)}
      {account && (
  farm.type === 'nft' ? (
    <Flex mt="24px">
      <PancakeButton
         style={{ width: '100%' }}
        disabled={!isEligible || hasCheckedIn}
        onClick={handleCheckIn}
      >
        Check In
      </PancakeButton>
    </Flex>
  ) : (
    <>
      <Flex flexDirection="column" mt="24px">
        <Text mb="4px">Amount</Text>
        <Input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.0"
        />
        <Text fontSize="16px" color="textSubtle">
          Wallet Balance: {walletBalance.toFixed(4)}
          
        </Text>
      </Flex>

      <Flex justifyContent="space-between" mt="12px">
        <PancakeButton
  disabled={!account || masterChef.loading || new BigNumber(amount).isZero()}
  onClick={handleDeposit}
>
  {masterChef.loading ? 'Processing...' : 'Deposit'}
</PancakeButton>
        <PancakeButton
          disabled={stakedBalance.isZero()}
          onClick={handleWithdraw}
        >
          Withdraw
        </PancakeButton>
      </Flex>
    </>
  )
)}

      <Divider />

      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />

      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
  removed={removed}
  isTokenOnly={farm.type === 'stake'} // ✅ correct logic
  totalValueFormated={totalValueFormated}
  lpLabel={lpLabel}
  quoteTokenSymbol={farm.quoteTokenSymbol}
  tokenSymbol={farm.tokenSymbol}
/>

      </ExpandingWrapper>

      {showWalletModal && (
        <ModalOverlay onClick={() => setShowWalletModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Heading size="lg" mb="16px">Connect Wallet</Heading>
            <Text mb="24px">Connect with one of our available wallet providers.</Text>

            <WalletButton onClick={() => handleWalletConnect('poltergeist')} fullWidth>
              <img src="/images/wallets/poltergeistIcon.png" alt="Poltergeist Wallet" />
              Poltergeist Wallet
            </WalletButton>

            <WalletButton onClick={() => handleWalletConnect('ecto')} fullWidth>
              <img src="/images/wallets/ectoIcon.png" alt="Ecto Wallet" />
              Ecto Wallet
            </WalletButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </FCard>
  );
};

export default FarmCard;