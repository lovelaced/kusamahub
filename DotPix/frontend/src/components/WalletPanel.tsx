import React from 'react';
import { WalletState } from '../types';
import { PASEO_NETWORK } from '../constants';

interface WalletPanelProps {
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletPanel: React.FC<WalletPanelProps> = ({
  walletState,
  onConnect,
  onDisconnect
}) => {
  const { isConnected, address, balance, chainId } = walletState;
  const isCorrectNetwork = chainId === parseInt(PASEO_NETWORK.chainId);

  const formatAddress = (addr: string) => 
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (!isConnected) {
    return (
      <div className="wallet-panel" style={{
        padding: '15px',
        background: '#1a1a1a',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>Wallet Not Connected</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#ccc' }}>
          Connect your MetaMask wallet to start placing pixels
        </p>
        <button
          onClick={onConnect}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Connect MetaMask
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-panel" style={{
      padding: '15px',
      background: '#1a1a1a',
      borderRadius: '8px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h3 style={{ margin: 0, color: '#4ecdc4' }}>Wallet Connected</h3>
        <button
          onClick={onDisconnect}
          style={{
            padding: '5px 10px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Disconnect
        </button>
      </div>
      
      <div style={{ fontSize: '14px', color: '#ccc' }}>
        <div style={{ marginBottom: '5px' }}>
          <strong>Address:</strong> {formatAddress(address!)}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <strong>Balance:</strong> {parseFloat(balance).toFixed(4)} PAS
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Network:</strong> 
          <span style={{ 
            color: isCorrectNetwork ? '#4ecdc4' : '#ff6b6b',
            marginLeft: '5px'
          }}>
            {isCorrectNetwork ? 'PASEO TestNet' : `Chain ${chainId}`}
          </span>
        </div>
      </div>

      {!isCorrectNetwork && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ff6b6b20',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#ff6b6b'
        }}>
          ⚠️ Please switch to PASEO TestNet to use this application
        </div>
      )}
    </div>
  );
};