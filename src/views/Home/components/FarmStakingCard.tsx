import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Heading, Card, CardBody, Button, Text } from '@pancakeswap-libs/uikit';
import { useWalletContext } from '../../../utils/walletContext';
import { fetchTokenBalance, fetchSoulPrice } from '../../../utils/phantasmaApi';

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/boo/2a.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`;

const Block = styled.div`
  margin-bottom: 16px;
`;

const CardImage = styled.img`
  margin-bottom: 16px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`;

const Actions = styled.div`
  margin-top: 24px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
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

const WalletButton = styled(Button)`
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

const FarmStakingCard = () => {
  const { account, connected, login } = useWalletContext();
  const [soulBalance, setSoulBalance] = useState<number>(0);
  const [soulPrice, setSoulPrice] = useState<number>(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const soulHarvest = 0; // Placeholder until staking logic is wired

  useEffect(() => {
    const init = async () => {
      try {
        if (account) {
          const balance = await fetchTokenBalance(account, 'SOUL');
          setSoulBalance(balance);
        } else {
          setSoulBalance(0);
        }

        const price = await fetchSoulPrice();
        setSoulPrice(price);
      } catch (error) {
        console.error('[FarmStakingCard] Error fetching data:', error);
        setSoulBalance(0);
        setSoulPrice(0);
      }
    };

    init();
  }, [account, connected]);

  const handleWalletConnect = async (provider: 'ecto' | 'poltergeist') => {
    await login(provider);
    setShowWalletModal(false);
  };

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">Farms</Heading>
        <CardImage src="/images/boo/boo.png" alt="BOO logo" width={64} height={64} />
        <Block>
          <Label>BOO to Harvest</Label>
          <Text>{soulHarvest.toFixed(2)}</Text>
          <Label>~${(soulPrice * soulHarvest).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label>BOO in Wallet</Label>
          <Text>{soulBalance.toFixed(2)}</Text>
          <Label>~${(soulPrice * soulBalance).toFixed(2)}</Label>
        </Block>
        <Actions>
          {!connected ? (
            <Button type="button" onClick={() => setShowWalletModal(true)}  style={{ width: '100%' }}>
              Connect Phantasma Wallet
            </Button>
          ) : (
            <Button disabled  style={{ width: '100%' }}>
              Harvest all (0)
            </Button>
          )}
        </Actions>
      </CardBody>

      {showWalletModal && (
        <ModalOverlay onClick={() => setShowWalletModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Heading size="lg" mb="16px">Connect Wallet</Heading>
            <Text mb="24px">Connect with one of our available wallet providers.</Text>

            <WalletButton onClick={() => handleWalletConnect('poltergeist')} style={{ width: '100%' }}>
              <img src="/images/wallets/poltergeistIcon.png" alt="Poltergeist Wallet" />
              Poltergeist Wallet
            </WalletButton>
            <b />
            <WalletButton onClick={() => handleWalletConnect('ecto')} style={{ width: '100%' }}>
              <img src="/images/wallets/ectoIcon.png" alt="Ecto Wallet" />
              Ecto Wallet
            </WalletButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledFarmStakingCard>
  );
};

export default FarmStakingCard;