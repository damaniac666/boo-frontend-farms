import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal, Text, Flex,  } from '@pancakeswap-libs/uikit'
import { Address } from '../../../../config/constants/types'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  booPrice?: BigNumber
  apy?: BigNumber
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
}

const ApyButton: React.FC<ApyButtonProps> = ({
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  booPrice,
  apy,
}) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      lpLabel={lpLabel}
      quoteTokenAdresses={quoteTokenAdresses}
      quoteTokenSymbol={quoteTokenSymbol}
      tokenAddresses={tokenAddresses}
      booPrice={booPrice} 

      apy={apy}
    />,
  )

  return (
  <Flex alignItems="center">
    <Text fontSize="14px" bold>
      {apy ? `${apy.toFixed(2)}%` : '—'}
    </Text>
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  </Flex>
)

}

export default ApyButton
