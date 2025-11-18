import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Route, useRouteMatch } from 'react-router-dom'
import { Heading, Image, Text } from '@pancakeswap-libs/uikit'
import Page from '../../components/layout/Page'
import FlexLayout from '../../components/layout/Flex'
import getFarmsWithApy from '../../config/constants/farms'
import FarmCard from './components/FarmCard/FarmCard'
import Divider from './components/Divider'
import { useWalletContext } from '../../utils/walletContext'
import { fetchSoulPrice, fetchKCALPrice, fetchBooPrice } from '../../utils/phantasmaApi'


export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = ({ tokenMode }) => {
  const { path } = useRouteMatch()
  const { account, connected } = useWalletContext()

  const [soulPrice, setSoulPrice] = useState(0)
  const [kcalPrice, setKcalPrice] = useState(0)
  const [booPrice, setBooPrice] = useState<BigNumber>()
  const [farms, setFarms] = useState([])

  useEffect(() => {
    const init = async () => {
      const soul = await fetchSoulPrice()
      const kcal = await fetchKCALPrice()
      const boo = await fetchBooPrice()
      const farmsWithApy = await getFarmsWithApy()

      const farmsWithUserData = farmsWithApy.map((farm) => {
        const simulatedStake = new BigNumber(farm.allocPoints).div(100).times(1e10).toFixed(0) // scale by allocPoints
        return {
          ...farm,
          userData: {
            stakedBalance: simulatedStake,
            pendingReward: '0',
            checkedIn: true,
          },
        }
      })

      setSoulPrice(soul)
      setKcalPrice(kcal)
      setBooPrice(new BigNumber(boo))
      setFarms(farmsWithUserData)
    }

    init()
  }, [])

  return (
    <Page>
      <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
        {tokenMode
          ? 'Supply liquidity on SaturnDex or Single Stake KCAL/BOO here to earn BOO'
          : 'Supply liquidity on SaturnDex or Single Stake KCAL/BOO here to earn BOO'}
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        Deposit Fee will be used to buy back and BURN BOO
      </Heading>
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          {farms.length === 0 ? (
            <Text>Loading farms...</Text>
          ) : (
            farms.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                removed={false}
                soulPrice={soulPrice}
                kcalPrice={kcalPrice}
                booPrice={booPrice}
                account={account}
              />
            ))
          )}
        </Route>
      </FlexLayout>
      <Image src="/images/boo/8.png" alt="illustration" width={1352} height={587} responsive />
    </Page>
  )
}

export default Farms