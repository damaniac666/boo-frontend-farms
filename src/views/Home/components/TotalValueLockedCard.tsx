import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, CardBody, Heading } from '@pancakeswap-libs/uikit';
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`;

const Block = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`;

const TotalValueLockedCard = () => {
  // Dummy value until Phantasma contracts are ready
  const totalValueLocked = 0;

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          Total Value Locked
        </Heading>
            <Block>
              <Label>Across all Farms</Label>
            
            <CardValue fontSize="14px" value={totalValueLocked} decimals={2}  prefix="$" />
          </Block>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
};

export default TotalValueLockedCard;