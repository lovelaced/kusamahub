// Contract ABI will be loaded from abi.json
let CONTRACT_ABI;

// Contract address - Your deployed PvP Grid contract on Paseo TestNet
const CONTRACT_ADDRESS = "0x7cA9c321C6297eb53cdfC7957416d598a53DFD2D";

// Paseo TestNet configuration (from KusamaHub docs)
const PASEO_CONFIG = {
    chainId: '0x190f1b46', // 420420422 in decimal
    chainName: 'Polkadot Hub TestNet',
    nativeCurrency: {
        name: 'PAS',
        symbol: 'PAS',
        decimals: 18
    },
    rpcUrls: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
    blockExplorerUrls: ['https://blockscout-passet-hub.parity-testnet.parity.io']
};

// Global variables
let provider;
let signer;
let contract;
let currentAccount;

// Initialize the app
async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to play this game!');
        return;
    }

    // Load contract ABI
    try {
        const response = await fetch('./abi.json');
        CONTRACT_ABI = await response.json();
    } catch (error) {
        console.error('Failed to load contract ABI:', error);
        alert('Failed to load contract ABI. Please check if abi.json exists.');
        return;
    }

    // Set up event listeners
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('determineWinner').addEventListener('click', determineWinner);
    document.getElementById('closeTxModal').addEventListener('click', closeTxModal);

    // Generate grid tiles
    generateGrid();

    // Check if already connected
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
        await connectWallet();
    }
}

// Connect wallet function
async function connectWallet() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];

        // Check if on correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== PASEO_CONFIG.chainId) {
            await switchToPaseo();
        }

        // Set up provider and contract
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Update UI
        document.getElementById('connectWallet').classList.add('hidden');
        document.getElementById('walletAddress').textContent = 
            currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4);
        document.getElementById('walletAddress').classList.remove('hidden');

        // Load game state
        await updateGameState();

        // Set up event listeners
        setupEventListeners();

    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

// Switch to Paseo network
async function switchToPaseo() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: PASEO_CONFIG.chainId }]
        });
    } catch (error) {
        // Network not added, add it
        if (error.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [PASEO_CONFIG]
            });
        } else {
            throw error;
        }
    }
}

// Generate grid tiles
function generateGrid() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.className = 'grid-tile';
        tile.dataset.index = i;
        tile.innerHTML = `
            <div class="tile-number">${i}</div>
            <div class="tile-owner"></div>
        `;
        tile.addEventListener('click', () => selectTile(i));
        grid.appendChild(tile);
    }
}

// Select a tile
async function selectTile(tileIndex) {
    if (!contract) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        showTxModal('Selecting tile...');

        const entryFee = await contract.entryFee();
        const tx = await contract.selectTile(tileIndex, { value: entryFee });
        
        showTxModal('Confirming transaction...');
        await tx.wait();

        showTxModal('Tile selected successfully!', true);
        await updateGameState();

    } catch (error) {
        console.error('Error selecting tile:', error);
        showTxModal('Transaction failed: ' + error.message, true);
    }
}

// Determine winner
async function determineWinner() {
    if (!contract) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        showTxModal('Determining winner...');

        const tx = await contract.determineWinner();
        
        showTxModal('Confirming transaction...');
        await tx.wait();

        showTxModal('Winner determined!', true);
        await updateGameState();

    } catch (error) {
        console.error('Error determining winner:', error);
        showTxModal('Transaction failed: ' + error.message, true);
    }
}

// Update game state
async function updateGameState() {
    if (!contract) return;

    try {
        // Get game info
        const gameId = await contract.currentGameId();
        const tilesSelected = await contract.tilesSelected();
        const prizePool = await contract.prizePool();
        const isComplete = await contract.isGameComplete();
        const canDetermineWinner = await contract.canDetermineWinner();
        const grid = await contract.getGrid();

        // Update UI
        document.getElementById('gameId').textContent = '#' + gameId;
        document.getElementById('tilesSelected').textContent = tilesSelected;

        // Update grid
        updateGrid(grid);

        // Update status
        if (isComplete && canDetermineWinner) {
            document.getElementById('statusMessage').textContent = 'Game complete! Click to determine winner.';
            document.getElementById('determineWinner').classList.remove('hidden');
        } else if (isComplete) {
            document.getElementById('statusMessage').innerHTML = 'Determining winner...<br><small style="color: #9ca3af;">Using the block hash of a future block.</small>';
            document.getElementById('determineWinner').classList.add('hidden');
        } else {
            document.getElementById('statusMessage').textContent = `Select a tile to play! (${16 - tilesSelected} tiles remaining)`;
            document.getElementById('determineWinner').classList.add('hidden');
        }


    } catch (error) {
        console.error('Error updating game state:', error);
    }
}

// Update grid display
function updateGrid(gridData) {
    const tiles = document.querySelectorAll('.grid-tile');
    
    tiles.forEach((tile, index) => {
        const owner = gridData[index];
        const ownerDisplay = tile.querySelector('.tile-owner');
        
        if (owner !== ethers.constants.AddressZero) {
            tile.classList.add('selected');
            
            if (owner.toLowerCase() === currentAccount.toLowerCase()) {
                tile.classList.add('mine');
            }
            
            ownerDisplay.textContent = owner.slice(0, 6) + '...' + owner.slice(-4);
        } else {
            tile.classList.remove('selected', 'mine');
            ownerDisplay.textContent = '';
        }
    });
}


// Set up event listeners
function setupEventListeners() {
    // Listen for tile selections
    contract.on('TileSelected', async (gameId, player, tileIndex) => {
        console.log('Tile selected:', gameId, player, tileIndex);
        await updateGameState();
    });

    // Listen for game completions
    contract.on('GameCompleted', async (gameId, winner, prize) => {
        console.log('Game completed:', gameId, winner, ethers.utils.formatEther(prize));
        
        // Show winner notification
        if (winner.toLowerCase() === currentAccount.toLowerCase()) {
            alert(`Congratulations! You won ${ethers.utils.formatEther(prize)} PAS!`);
        }
        
        await updateGameState();
    });

    // Listen for new games
    contract.on('NewGameStarted', async (gameId, entryFee) => {
        console.log('New game started:', gameId, ethers.utils.formatEther(entryFee));
        await updateGameState();
    });

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected
            location.reload();
        } else if (accounts[0] !== currentAccount) {
            // User switched accounts
            currentAccount = accounts[0];
            updateGameState();
        }
    });
}


// Show transaction modal
function showTxModal(message, showClose = false) {
    document.getElementById('txModal').classList.remove('hidden');
    document.getElementById('txMessage').textContent = message;
    
    if (showClose) {
        document.querySelector('.loading-spinner').style.display = 'none';
        document.getElementById('closeTxModal').classList.remove('hidden');
    } else {
        document.querySelector('.loading-spinner').style.display = 'block';
        document.getElementById('closeTxModal').classList.add('hidden');
    }
}

// Close transaction modal
function closeTxModal() {
    document.getElementById('txModal').classList.add('hidden');
    document.querySelector('.loading-spinner').style.display = 'block';
}

// Initialize app when page loads
window.addEventListener('load', init);