export const CANVAS_CONFIG = {
  WIDTH: 2000,
  HEIGHT: 2000,
  TOTAL_PIXELS: 2000 * 2000,
  MAX_BATCH_SIZE: 100,
  PIXEL_SIZE: 1, // pixels in the display
  CHUNK_SIZE: 100 // for loading data in chunks
};

export const PASEO_NETWORK = {
  chainId: '420420422', // 420420422 in hex
  chainName: 'Polkadot Hub TestNet',
  nativeCurrency: {
    name: 'PAS',
    symbol: 'PAS',
    decimals: 18,
  },
  rpcUrls: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
  blockExplorerUrls: ['https://blockscout-passet-hub.parity-testnet.parity.io'],
};

export const DEFAULT_COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#FFFFFF', '#000000',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
  '#808080', '#008000', '#000080', '#800000'
];

export const CONTRACT_ABI = [
  "function placePixel(uint256 pixelId, uint32 color) external payable",
  "function placePixelsBatch(uint256[] calldata pixelIds, uint32[] calldata colors) external payable",
  "function getPixel(uint256 pixelId) external view returns (address pixelOwner, uint32 color, uint256 lastModified)",
  "function calculatePixelFee(uint256 count) external pure returns (uint256)",
  "function getPixelId(uint256 x, uint256 y) external pure returns (uint256)",
  "function getPixelCoordinates(uint256 pixelId) external pure returns (uint256 x, uint256 y)",
  "function pixels(uint256) external view returns (address owner, uint32 color, uint256 lastModified)",
  "event PixelPlaced(uint256 indexed pixelId, address indexed owner, uint32 color, uint256 fee, uint256 timestamp)",
  "event BatchPixelsPlaced(address indexed owner, uint256[] pixelIds, uint32[] colors, uint256 totalFee, uint256 timestamp)"
];