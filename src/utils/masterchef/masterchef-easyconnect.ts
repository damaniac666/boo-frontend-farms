import { PhantasmaAPI, ScriptBuilder, ContractParameter } from 'phantasma-sdk-ts';
     import { getEasyInstance } from '../easyConnect';

     export interface MasterChefConfig {
       contractName: string;
       nexus: string;
     }

     export class MasterChefV2 {
       private api: PhantasmaAPI;
       private config: MasterChefConfig;
       private easy: any;

       constructor(config: MasterChefConfig, api: PhantasmaAPI) {
         this.config = config;
         this.api = api;
         this.easy = getEasyInstance();
       }

       private async call(method: string, params: ContractParameter[] = []) {
         const sb = new ScriptBuilder();
         sb.CallContract(this.config.contractName, method, params);
         const script = sb.EndScript();

         const result = await this.easy.signAndSendTx(script, this.config.nexus, 20000, 100000);
         console.log(`📤 Sent ${method}:`, result);
         return result;
       }

       async deposit(pid: number, amount: number) {
         return this.call('deposit', [
           new ContractParameter('pid', pid),
           new ContractParameter('amount', amount),
         ]);
       }

       async withdraw(pid: number, amount: number) {
         return this.call('withdraw', [
           new ContractParameter('pid', pid),
           new ContractParameter('amount', amount),
         ]);
       }

       async emergencyWithdraw(pid: number) {
         return this.call('emergencyWithdraw', [
           new ContractParameter('pid', pid),
         ]);
       }

       async checkIn(pid: number) {
         return this.call('checkIn', [
           new ContractParameter('pid', pid),
         ]);
       }

       async checkOut(pid: number) {
         return this.call('checkOut', [
           new ContractParameter('pid', pid),
         ]);
       }

      // async pendingBOO(pid: number, userAddr: string): Promise<number> {
       //  const sb = new ScriptBuilder();
      //   sb.callContract(this.config.contractName, 'pendingBOO', [
       //    new ContractParameter('pid', 'Number', pid),
       //    new ContractParameter('userAddr', 'Address', userAddr),
      //   ]);
     //    const script = sb.endScript();
     //    const res = await this.api.invokeRawScript(this.config.nexus, script);
     //    return res.results.length > 0 ? Number(res.results[0].value) : 0;
     //  }
     }