export interface Pixel {
  id: number;
  x: number;
  y: number;
  color: string;
  owner: string;
  lastModified: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
}

export interface CanvasState {
  pixels: Map<number, Pixel>;
  selectedPixels: Set<number>;
  selectedColor: string;
  isLoading: boolean;
  conflicts: Set<number>;
}

export interface ContractState {
  address: string | null;
  isDeployed: boolean;
  baseFee: string;
}