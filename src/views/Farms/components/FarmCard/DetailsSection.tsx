import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Link } from '@pancakeswap-libs/uikit';

export interface ExpandableSectionProps {
  isTokenOnly?: boolean;
  removed?: boolean;
  totalValueFormated?: string;
  myStakedValueFormatted?: string; // ✅ new
  lpLabel?: string;
  tokenSymbol?: string;
   quoteTokenSymbol?: string;
}

const Wrapper = styled.div`
  margin-top: 24px;
`;

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  removed,
  totalValueFormated,
  myStakedValueFormatted, // ✅ new
  lpLabel,
  tokenSymbol,
}) => {
  const tokenId = isTokenOnly === true
  ? tokenSymbol?.toUpperCase() ?? 'KCAL'
  : 'SATRN';

const stakeUrl = `https://explorer.phantasma.info/en/token?id=${tokenId}`;
// console.log('[DetailsSection] isTokenOnly:', isTokenOnly);
// console.log('[DetailsSection] tokenSymbol:', tokenSymbol);
  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>Stake:</Text>
        <Link external href={stakeUrl}>
          {lpLabel}
        </Link>
      </Flex>
      {!removed && (
  <>
    <Flex justifyContent="space-between">
      <Text>Total Value:</Text>
      <Text>{totalValueFormated}</Text>
    </Flex>
    <Flex justifyContent="space-between">
      <Text>My Staked Value:</Text>
      <Text>{myStakedValueFormatted}</Text>
    </Flex>
  </>
)}
      
    </Wrapper>
  );
};

export default DetailsSection;