import React, { useEffect, useState } from 'react';
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit';
import styled from 'styled-components';
import CardValue from './CardValue'
import { fetchSoulPrice, getTokenSupply } from '../../../utils/phantasmaApi';

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;

// const Block = styled.div`
//  margin-bottom: 16px;
// `;

 // const Label = styled.div`
  // color: ${({ theme }) => theme.colors.textSubtle};
  // font-size: 14px;
 // `;

const CakeStats = () => {
  const [soulPrice, setSoulPrice] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [burnedSupply, setBurnedSupply] = useState<number>(0);

useEffect(() => {
  const loadStats = async () => {
    const price = await fetchSoulPrice();
    setSoulPrice(price);

    const supplyData = await getTokenSupply('SOUL');
    if (supplyData) {
      setTotalSupply(supplyData.supply);
      setBurnedSupply(supplyData.burned);
    }
  };

  loadStats();
}, []);
  
  // Dummy values until Phantasma contracts are ready
  
  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          BOO Stats
        </Heading>
            <Row>
              <Text fontSize="14px">BOO Price</Text>
              <CardValue fontSize="14px" value={soulPrice} decimals={4} prefix="$" />
            </Row>
            <Row>
              <Text fontSize="14px">Total Supply</Text>
              <CardValue fontSize="14px" value={totalSupply} decimals={0} />
            </Row>
            <Row>
              <Text fontSize="14px">Burned</Text>
              <CardValue fontSize="14px" value={burnedSupply} decimals={0} />
            </Row>
      </CardBody>
    </StyledCakeStats>
  );
};

export default CakeStats;