import React from 'react';
import styled from 'styled-components';
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@pancakeswap-libs/uikit';
import { useRouteMatch, Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 8px;
  }
`;

interface FarmTabButtonsProps {
  stakedOnly: boolean;
  setStakedOnly: (value: boolean) => void;
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ stakedOnly, setStakedOnly }) => {
  const { url, isExact } = useRouteMatch();

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
        <Text>Staked only</Text>
      </ToggleWrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Active
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          Inactive
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  );
};

export default FarmTabButtons;