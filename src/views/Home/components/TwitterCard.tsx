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
              <br />
              <Label>BOO is a MEME coin distributed over a period of 700 days. The emission rate will halve twice during the 700 days resulting in a max supply of 10 million BOO.</Label>
              <br />
              <Label>Overall supply will likely be lower as a result of periodic burning.</Label>
              <br />
              <Label>There is a gameified BURN function within the contract that receives the deposit fees. This can be called by anyone to burn KCAL, buy back and burn BOO and receive a SOUL reward.</Label>
          </Block>
      </CardBody>
    </StyledTwitterCard>
  );
};

export default TwitterCard;