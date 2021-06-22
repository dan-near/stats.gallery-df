import { NearClient } from '@/services/near/NearClient';
import { Network } from '@/services/near/networks';
import Big from 'big.js';
import { inject, Ref } from 'vue';

const yocto = new Big('1e+24');

export function toNear(value?: string | number | Big): Big {
  const bn = new Big(value ?? 0);
  return bn.div(yocto);
}

export const nearSymbol = String.fromCharCode(9411); // Ⓝ

export function nearContext(): {
  account: Ref<string>;
  network: Ref<Network>;
  client: NearClient;
} {
  const account = inject<Ref<string>>('account')!;
  const network = inject<Ref<Network>>('network')!;
  const client = inject<NearClient>('near')!;

  return {
    account,
    network,
    client,
  };
}
