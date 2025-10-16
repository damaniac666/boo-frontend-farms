import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { calculateBooEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import { Address } from 'config/constants/types'
import getLiquidityUrlPathParts from '../../../../utils/getLiquidityUrlPathParts'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  booPrice?: BigNumber
  apy?: BigNumber
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: 10px;
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  booPrice,
  apy,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAdresses,
    quoteTokenSymbol,
    tokenAddresses,
  })

  const booPriceNumber = booPrice?.isFinite() ? booPrice.toNumber() : undefined
  const farmApyNumber = apy?.isFinite() ? apy.toNumber() : undefined
  const oneThousandDollarsWorthOfBoo =
    typeof booPriceNumber === 'number' && booPriceNumber > 0 ? 1000 / booPriceNumber : undefined

  const canCalculate =
    typeof farmApyNumber === 'number' &&
    typeof booPriceNumber === 'number' &&
    typeof oneThousandDollarsWorthOfBoo === 'number'

  const booEarnedPerThousand1D = canCalculate
    ? calculateBooEarnedPerThousandDollars({ numberOfDays: 1, farmApy: farmApyNumber, booPrice: booPriceNumber })
    : 0

  const booEarnedPerThousand7D = canCalculate
    ? calculateBooEarnedPerThousandDollars({ numberOfDays: 7, farmApy: farmApyNumber, booPrice: booPriceNumber })
    : 0

  const booEarnedPerThousand30D = canCalculate
    ? calculateBooEarnedPerThousandDollars({ numberOfDays: 30, farmApy: farmApyNumber, booPrice: booPriceNumber })
    : 0

  const booEarnedPerThousand365D = canCalculate
    ? calculateBooEarnedPerThousandDollars({ numberOfDays: 365, farmApy: farmApyNumber, booPrice: booPriceNumber })
    : 0

  const renderRoi = (earned: number) =>
    canCalculate && oneThousandDollarsWorthOfBoo
      ? `${Number(apyModalRoi({ amountEarned: earned, amountInvested: oneThousandDollarsWorthOfBoo })).toFixed(2)}%`
      : '—'

  const renderEarned = (earned: number) =>
    canCalculate ? earned.toFixed(2) : '—'

  return (
    <Modal title="ROI (APR-based)" onDismiss={onDismiss}>
  <Grid>
    <GridItem>
      <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
        {TranslateString(999, 'Timeframe')}
      </Text>
    </GridItem>
    <GridItem>
      <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
        {TranslateString(999, 'ROI')}
      </Text>
    </GridItem>
    <GridItem>
      <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
        {TranslateString(999, 'BOO per $1000')}
      </Text>
    </GridItem>

    {/* 1 day row */}
    <GridItem><Text>1d</Text></GridItem>
    <GridItem><Text>{renderRoi(booEarnedPerThousand1D)}</Text></GridItem>
    <GridItem><Text>{renderEarned(booEarnedPerThousand1D)}</Text></GridItem>

    {/* 7 day row */}
    <GridItem><Text>7d</Text></GridItem>
    <GridItem><Text>{renderRoi(booEarnedPerThousand7D)}</Text></GridItem>
    <GridItem><Text>{renderEarned(booEarnedPerThousand7D)}</Text></GridItem>

    {/* 30 day row */}
    <GridItem><Text>30d</Text></GridItem>
    <GridItem><Text>{renderRoi(booEarnedPerThousand30D)}</Text></GridItem>
    <GridItem><Text>{renderEarned(booEarnedPerThousand30D)}</Text></GridItem>

    {/* 365 day row */}
    <GridItem><Text>365d (APR)</Text></GridItem>
    <GridItem><Text>{renderRoi(booEarnedPerThousand365D)}</Text></GridItem>
    <GridItem><Text>{renderEarned(booEarnedPerThousand365D)}</Text></GridItem>
  </Grid>

  <Description fontSize="12px" color="textSubtle">
    {TranslateString(
      999,
      'Calculated using simple APR. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
    )}
  </Description>
</Modal>
  )
}

export default ApyCalculatorModal