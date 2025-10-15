import React from 'react';
import { Card, CardBody, Heading } from '@pancakeswap-libs/uikit';
import styled from 'styled-components';

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`
const Block = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`;


const TwitterCard = () => {
  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          Notice
        </Heading>
        <Block>
              <Label>IMPORTANT: This is a demonstration, test environment. Please assume it contains bugs/errors.</Label>
              <br />
              <Label>This farm is currently running on TestNet. The tokens have no value.</Label>
            
          </Block>
      </CardBody>
    </StyledTwitterCard>
  );
};

export default TwitterCard;