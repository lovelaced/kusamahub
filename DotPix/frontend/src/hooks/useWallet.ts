import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletState } from '../types';
import { PASEO_NETWORK } from '../constants';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: '0',
    chainId: null
  });

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const checkConnection = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0].address);
        
        setWalletState({
          isConnected: true,
          address: accounts[0].address,
          balance: ethers.formatEther(balance),
          chainId: Number(network.chainId)
        });
        setProvider(provider);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is required to use this application');
      return;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Switch to PASEO network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: PASEO_NETWORK.chainId }],
        });
      } catch (switchError: any) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [PASEO_NETWORK],
          });
        } else {
          throw switchError;
        }
      }

      await checkConnection();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, [checkConnection]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: '0',
      chainId: null
    });
    setProvider(null);
  }, []);

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        checkConnection();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [checkConnection, disconnectWallet]);

  return {
    walletState,
    provider,
    connectWallet,
    disconnectWallet
  };
};