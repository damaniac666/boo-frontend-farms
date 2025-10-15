import React, { useState, useCallback } from 'react';
   import styled from 'styled-components';
   import { Button, Text, Flex } from '@pancakeswap-libs/uikit';
   import { UseMasterChefV2 } from '../../../../hooks/masterchef/useMasterChefV2';
   import { FarmWithStakedValue } from './types';

   const Action = styled.div`
     padding: 16px;
   `;

   interface CardActionsContainerProps {
     farm: FarmWithStakedValue;
     account: string;
     type?: string;
     eligible: boolean;
     onCheckIn?: () => void;
     masterChef: UseMasterChefV2;
   }

   const CardActionsContainer: React.FC<CardActionsContainerProps> = ({ farm, account, type, eligible, onCheckIn, masterChef }) => {
     const [amount, setAmount] = useState('');
     const [pendingTx, setPendingTx] = useState(false);

     const handleStake = useCallback(async () => {
       if (!amount || pendingTx || !eligible) return;
       setPendingTx(true);
       try {
         await masterChef.deposit(farm.pid, Number(amount));
         setAmount('');
       } catch (err) {
         console.error('[CardActionsContainer] Stake error:', err);
       } finally {
         setPendingTx(false);
       }
     }, [farm.pid, amount, eligible, masterChef, pendingTx]);

     const handleUnstake = useCallback(async () => {
       if (!amount || pendingTx || !eligible) return;
       setPendingTx(true);
       try {
         await masterChef.withdraw(farm.pid, Number(amount));
         setAmount('');
       } catch (err) {
         console.error('[CardActionsContainer] Unstake error:', err);
       } finally {
         setPendingTx(false);
       }
     }, [farm.pid, amount, eligible, masterChef, pendingTx]);

     const handleHarvest = useCallback(async () => {
       if (pendingTx || !eligible) return;
       setPendingTx(true);
       try {
         await masterChef.withdraw(farm.pid, 0);
       } catch (err) {
         console.error('[CardActionsContainer] Harvest error:', err);
       } finally {
         setPendingTx(false);
       }
     }, [farm.pid, eligible, masterChef, pendingTx]);

     return (
       <Action>
         <Flex justifyContent="space-between" alignItems="center">
           <Text>Amount to Stake/Unstake:</Text>
           <input
             type="number"
             value={amount}
             onChange={(e) => setAmount(e.target.value)}
             placeholder="Enter amount"
             style={{ padding: '8px', width: '150px' }}
             disabled={pendingTx || !eligible}
           />
         </Flex>
         <Flex mt="8px" justifyContent="space-between">
           {type === 'nft' ? (
             <Button onClick={onCheckIn} disabled={pendingTx || !eligible || !onCheckIn} style={{ width: '100%' }}>
               Check In
             </Button>
           ) : (
             <>
               <Button onClick={handleStake} disabled={pendingTx || !amount || !eligible} style={{ width: '100%' }}>
                 Stake
               </Button>
               <Button onClick={handleUnstake} disabled={pendingTx || !amount || !eligible} style={{ width: '100%' }}>
                 Unstake
               </Button>
             </>
           )}
           <Button onClick={handleHarvest} disabled={pendingTx || !eligible} style={{ width: '100%' }}>
             Harvest
           </Button>
         </Flex>
       </Action>
     );
   };

   export default CardActionsContainer;