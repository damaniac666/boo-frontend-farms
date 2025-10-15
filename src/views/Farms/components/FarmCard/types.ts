import BigNumber from 'bignumber.js';

   export interface FarmWithStakedValue {
     pid: number;
     tokenSymbol: string;
     quoteTokenSymbol: string;
     lpSymbol: string;
     multiplier: string;
     isTokenOnly: boolean;
     lpTotalInQuoteToken: number;
     depositFeeBP?: number;
     apy?: BigNumber;
     userData?: {
       stakedBalance: string;
       pendingReward: string;
       checkedIn: boolean;

     };
     tokenAddresses?: any;
     quoteTokenAdresses?: any;
     lpAddresses?: any;
     risk?: number;
     image?: string;
     type?: string;
   }