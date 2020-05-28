import { Injectable } from '@angular/core';
import { Blockchain } from 'src/app/myblockchain.js';
import EC from 'elliptic';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public Instance = new Blockchain();
  public walletKeys: Array<IWalletKey> = [];

  constructor() {
    this.Instance.difficulty = 2;
    this.generateWalletKeys();
    this.Instance.sendMyAddress(this.walletKeys[0].publicKey);
  }

  minePendingTransactions() {
    this.Instance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

    console.log(this.walletKeys);
  }

  getPendingTransactions() {
    return this.Instance.pendingTransactions;
  }

  addTransaction(tx) {
    this.Instance.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
