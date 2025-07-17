class BigWickGameApp {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.currentGameId = null;
        this.isOwner = false;
        this.gameState = null;
        this.bidHistory = [];
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.updateContractInfo();
        
        // Check if wallet is already connected
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await this.connectWallet();
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('connect-wallet').addEventListener('click', () => this.handleWalletButtonClick());
        document.getElementById('place-bid').addEventListener('click', () => this.placeBid());
        document.getElementById('start-game').addEventListener('click', () => this.startNewGame());
        document.getElementById('end-game').addEventListener('click', () => this.endGame());
        document.getElementById('withdraw-treasury').addEventListener('click', () => this.withdrawTreasury());
        
        // Auto-refresh every 10 seconds
        setInterval(() => this.refreshGameData(), 10000);
    }

    async connectWallet() {
        try {
            if (typeof window.ethereum === 'undefined') {
                this.showError('MetaMask is not installed. Please install MetaMask to use this application.');
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.userAddress = accounts[0];

            // Setup provider and signer
            this.provider = new ethers.BrowserProvider(window.ethereum);
            this.signer = await this.provider.getSigner();

            // Check and switch to correct network
            await this.switchToCorrectNetwork();

            // Setup contract
            this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);

            // Check if user is owner
            const owner = await this.contract.owner();
            this.isOwner = owner.toLowerCase() === this.userAddress.toLowerCase();

            // Update UI
            this.updateConnectionStatus();
            this.updateAdminSection();
            
            // Load initial game data
            await this.refreshGameData();

            this.showSuccess('Wallet connected successfully!');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            this.showError(`Failed to connect wallet: ${error.message}`);
        }
    }

    async switchToCorrectNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: NETWORK_CONFIG.chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [NETWORK_CONFIG],
                    });
                } catch (addError) {
                    throw new Error('Failed to add network to MetaMask');
                }
            } else {
                throw new Error('Failed to switch to correct network');
            }
        }
    }

    async refreshGameData() {
        if (!this.contract) return;

        try {
            // Get current game ID
            this.currentGameId = await this.contract.currentGameId();
            
            if (this.currentGameId > 0) {
                // Get game data
                const gameData = await this.contract.games(this.currentGameId);
                const gameState = await this.contract.getGameState(this.currentGameId);
                const playerCount = await this.contract.getGamePlayerCount(this.currentGameId);
                
                this.gameState = gameState;
                
                // Update UI
                this.updateGameStatus(gameData, gameState, playerCount);
                this.updateTimeline(gameData, gameState);
                
                // Update user bid info if wallet is connected
                if (this.userAddress) {
                    await this.updateUserBidInfo();
                }
                
                // Update leaderboard
                await this.updateLeaderboard();
                
                // Update bid history
                await this.updateBidHistory();
            } else {
                this.updateGameStatus(null, null, 0);
                this.bidHistory = [];
                this.displayBidHistory();
            }
        } catch (error) {
            console.error('Error refreshing game data:', error);
        }
    }

    updateGameStatus(gameData, gameState, playerCount) {
        const gameStates = ['Not Started', 'Starting Period', 'Ending Period', 'Ended'];
        
        document.getElementById('game-id').textContent = this.currentGameId || '-';
        document.getElementById('game-state').textContent = gameState !== null ? gameStates[gameState] : '-';
        document.getElementById('player-count').textContent = playerCount;
        
        if (gameData) {
            const totalPot = gameData.totalPot;
            const prizePot = (totalPot * 90n) / 100n; // 90% for winner
            const prizePotFormatted = ethers.formatEther(prizePot);
            document.getElementById('prize-pot').textContent = `${prizePotFormatted} PAS`;
        } else {
            document.getElementById('prize-pot').textContent = '0 PAS';
        }
    }

    updateTimeline(gameData, gameState) {
        const phases = document.querySelectorAll('.timeline-phase');
        phases.forEach((phase, index) => {
            phase.classList.remove('active', 'completed');
            
            if (gameState !== null) {
                if (index < gameState) {
                    phase.classList.add('completed');
                } else if (index === gameState) {
                    phase.classList.add('active');
                }
            }
        });

        // Update time information
        if (gameData) {
            const now = Math.floor(Date.now() / 1000);
            const startTime = Number(gameData.startTime);
            const endingPeriodStart = Number(gameData.endingPeriodStart);
            const endTime = Number(gameData.endTime);
            
            let timeText = '';
            
            if (gameState === 1) { // Starting Period
                const timeLeft = endingPeriodStart - now;
                timeText = `Starting period: ${this.formatTimeLeft(timeLeft)} remaining`;
            } else if (gameState === 2) { // Ending Period
                const timeLeft = endTime - now;
                timeText = `Ending period: ${this.formatTimeLeft(timeLeft)} remaining`;
            } else if (gameState === 3) { // Ended
                timeText = 'Game has ended';
            }
            
            document.getElementById('time-info').textContent = timeText;
        } else {
            document.getElementById('time-info').textContent = 'No active game';
        }
    }

    formatTimeLeft(seconds) {
        if (seconds <= 0) return '0s';
        
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    }

    async updateUserBidInfo() {
        if (!this.contract || !this.userAddress || !this.currentGameId) return;

        try {
            const [totalBid, bidCount] = await this.contract.getPlayerBid(this.currentGameId, this.userAddress);
            
            document.getElementById('user-total-bid').textContent = `${ethers.formatEther(totalBid)} PAS`;
            document.getElementById('user-bid-count').textContent = bidCount.toString();
            
            // Enable/disable bid button based on game state
            const bidButton = document.getElementById('place-bid');
            bidButton.disabled = !this.contract || this.gameState === null || this.gameState === 0 || this.gameState === 3;
        } catch (error) {
            console.error('Error updating user bid info:', error);
        }
    }

    async updateLeaderboard() {
        if (!this.contract || !this.currentGameId) return;

        try {
            const players = await this.contract.getGamePlayers(this.currentGameId);
            const leaderboard = [];
            
            for (const player of players) {
                const [totalBid] = await this.contract.getPlayerBid(this.currentGameId, player);
                leaderboard.push({
                    address: player,
                    totalBid: totalBid
                });
            }
            
            // Sort by total bid (descending) - proper BigNumber comparison
            leaderboard.sort((a, b) => {
                if (a.totalBid > b.totalBid) return -1;
                if (a.totalBid < b.totalBid) return 1;
                return 0;
            });
            
            this.displayLeaderboard(leaderboard);
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    }

    displayLeaderboard(leaderboard) {
        const container = document.getElementById('leaderboard-list');
        
        if (leaderboard.length === 0) {
            container.innerHTML = '<div class="no-data">No bids yet</div>';
            return;
        }
        
        // Show only top 10 bidders who have actually placed bids
        const topBidders = leaderboard.filter(player => player.totalBid > 0n).slice(0, 10);
        
        container.innerHTML = topBidders.map((player, index) => {
            const shortAddress = `${player.address.substring(0, 6)}...${player.address.substring(38)}`;
            const bidAmount = ethers.formatEther(player.totalBid);
            
            let rankLabel;
            if (index === 0) {
                rankLabel = 'GIGA WICK';
            } else if (index === 1) {
                rankLabel = 'BIG WICK ENERGY';
            } else if (index === 2) {
                rankLabel = 'MASSIVE WICK';
            } else {
                rankLabel = 'smol wick';
            }
            
            return `
                <div class="leaderboard-item rank-${index + 1}">
                    <div class="player-info">
                        <div class="player-address">${shortAddress}</div>
                        <div class="player-bid">${bidAmount} PAS</div>
                    </div>
                    <div class="rank">${rankLabel}</div>
                </div>
            `;
        }).join('');
    }

    async updateBidHistory() {
        if (!this.contract || !this.currentGameId) return;

        try {
            // Get all BidPlaced events for the current game
            const filter = this.contract.filters.BidPlaced(this.currentGameId);
            const events = await this.contract.queryFilter(filter);
            
            // Process events into bid history
            const bidEvents = [];
            for (const event of events) {
                const block = await this.provider.getBlock(event.blockNumber);
                bidEvents.push({
                    player: event.args.player,
                    amount: event.args.amount,
                    totalBid: event.args.totalBid,
                    timestamp: block.timestamp,
                    blockNumber: event.blockNumber
                });
            }
            
            // Sort by timestamp
            bidEvents.sort((a, b) => a.timestamp - b.timestamp);
            
            this.bidHistory = bidEvents;
            this.displayBidHistory();
        } catch (error) {
            console.error('Error updating bid history:', error);
        }
    }

    displayBidHistory() {
        const container = document.getElementById('bid-timeline-chart');
        
        if (this.bidHistory.length === 0) {
            container.innerHTML = '<div class="no-data">No bids yet</div>';
            return;
        }
        
        // Get game start time for relative positioning
        const gameStartTime = this.gameState ? this.gameState.startTime : Math.floor(Date.now() / 1000);
        
        // Create timeline visualization
        const playerColors = this.generatePlayerColors();
        const maxBid = Math.max(...this.bidHistory.map(bid => Number(ethers.formatEther(bid.totalBid))));
        
        let html = '<div class="bid-timeline">';
        
        // Add time axis
        html += '<div class="time-axis">';
        const timespan = 7 * 24 * 60 * 60; // 7 days total
        for (let i = 0; i <= 7; i++) {
            const dayPercent = (i / 7) * 100;
            // Position time markers as percentages, accounting for Y-axis width
            // Y-axis takes ~8% of width, so chart area is 92% starting at 8%
            const adjustedPercent = 8 + (dayPercent * 0.84); // 8% offset + 84% of remaining width
            html += `<div class="time-marker" style="left: ${adjustedPercent}%">Day ${i}</div>`;
        }
        html += '</div>';
        
        // Add Y-axis for PAS amounts
        html += '<div class="y-axis">';
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const value = (maxBid / steps) * i;
            const yPercent = 100 - (i / steps) * 80 - 10; // 80% of chart height + 10% bottom margin
            html += `<div class="y-marker" style="top: ${yPercent}%">${value.toFixed(2)} PAS</div>`;
        }
        html += '</div>';
        
        // Add bid visualization
        html += '<div class="bid-chart">';
        
        // Track cumulative bids for each player
        const playerTotals = {};
        
        this.bidHistory.forEach((bid, index) => {
            const player = bid.player;
            const shortAddress = `${player.substring(0, 6)}...${player.substring(38)}`;
            const bidAmount = ethers.formatEther(bid.amount);
            const totalBid = ethers.formatEther(bid.totalBid);
            
            // Calculate position on timeline within the chart area (after Y-axis)
            const timePercent = Math.min(((bid.timestamp - gameStartTime) / timespan) * 100, 100);
            const adjustedTimePercent = 8 + (timePercent * 0.84); // Match time marker positioning
            
            // Calculate height based on total bid (0-80% of chart height)
            const heightPercent = (Number(totalBid) / maxBid) * 80 + 10; // 80% max height + 10% bottom margin
            
            const color = playerColors[player] || '#666';
            
            html += `
                <div class="bid-point" 
                     style="left: ${adjustedTimePercent}%; bottom: ${heightPercent}%; background-color: ${color}"
                     title="${shortAddress}: +${bidAmount} PAS (Total: ${totalBid} PAS)">
                    <div class="bid-popup">
                        <div class="bid-player">${shortAddress}</div>
                        <div class="bid-amount">+${bidAmount} PAS</div>
                        <div class="bid-total">Total: ${totalBid} PAS</div>
                        <div class="bid-time">${new Date(bid.timestamp * 1000).toLocaleString()}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add legend
        html += '<div class="bid-legend">';
        const uniquePlayers = [...new Set(this.bidHistory.map(bid => bid.player))];
        uniquePlayers.forEach(player => {
            const shortAddress = `${player.substring(0, 6)}...${player.substring(38)}`;
            const color = playerColors[player] || '#666';
            html += `<div class="legend-item"><div class="legend-color" style="background-color: ${color}"></div>${shortAddress}</div>`;
        });
        html += '</div>';
        
        html += '</div>';
        
        container.innerHTML = html;
    }

    generatePlayerColors() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
            '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#e84393',
            '#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#a29bfe'
        ];
        
        const playerColors = {};
        const uniquePlayers = [...new Set(this.bidHistory.map(bid => bid.player))];
        
        uniquePlayers.forEach((player, index) => {
            playerColors[player] = colors[index % colors.length];
        });
        
        return playerColors;
    }

    async placeBid() {
        if (!this.contract || !this.currentGameId) {
            this.showError('Connect your wallet first');
            return;
        }

        const bidAmount = document.getElementById('bid-amount').value;
        if (!bidAmount || parseFloat(bidAmount) <= 0) {
            this.showError('Please enter a valid bid amount');
            return;
        }

        try {
            this.showLoading('Placing bid...');
            
            const tx = await this.contract.placeBid(this.currentGameId, {
                value: ethers.parseEther(bidAmount)
            });
            
            await tx.wait();
            
            this.showSuccess('Bid placed successfully!');
            document.getElementById('bid-amount').value = '';
            
            // Refresh data
            await this.refreshGameData();
        } catch (error) {
            console.error('Error placing bid:', error);
            this.showError(`Failed to place bid: ${error.message}`);
        }
    }

    async startNewGame() {
        if (!this.contract || !this.isOwner) return;

        try {
            this.showLoading('Starting new game...');
            
            const tx = await this.contract.startNewGame();
            await tx.wait();
            
            this.showSuccess('New game started!');
            await this.refreshGameData();
        } catch (error) {
            console.error('Error starting new game:', error);
            this.showError(`Failed to start new game: ${error.message}`);
        }
    }

    async endGame() {
        if (!this.contract || !this.currentGameId) return;

        try {
            this.showLoading('Ending game...');
            
            const tx = await this.contract.endGame(this.currentGameId);
            await tx.wait();
            
            this.showSuccess('Game ended!');
            await this.refreshGameData();
        } catch (error) {
            console.error('Error ending game:', error);
            this.showError(`Failed to end game: ${error.message}`);
        }
    }

    async withdrawTreasury() {
        if (!this.contract || !this.isOwner) return;

        try {
            this.showLoading('Withdrawing treasury...');
            
            const tx = await this.contract.withdrawTreasury();
            await tx.wait();
            
            this.showSuccess('Treasury withdrawn!');
        } catch (error) {
            console.error('Error withdrawing treasury:', error);
            this.showError(`Failed to withdraw treasury: ${error.message}`);
        }
    }

    handleWalletButtonClick() {
        if (this.userAddress) {
            this.disconnectWallet();
        } else {
            this.connectWallet();
        }
    }

    disconnectWallet() {
        // Clear wallet state
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.isOwner = false;
        this.gameState = null;
        this.currentGameId = null;
        
        // Update UI
        this.updateConnectionStatus();
        this.updateAdminSection();
        
        // Clear user-specific data
        document.getElementById('user-total-bid').textContent = '0 PAS';
        document.getElementById('user-bid-count').textContent = '0';
        document.getElementById('place-bid').disabled = true;
        
        // Clear bid history
        this.bidHistory = [];
        this.displayBidHistory();
        
        // Refresh game data without user context
        this.refreshGameData();
        
        this.showSuccess('Wallet disconnected successfully!');
    }

    updateConnectionStatus() {
        const statusElement = document.getElementById('network-status');
        const connectButton = document.getElementById('connect-wallet');
        
        if (this.userAddress) {
            statusElement.textContent = `✅ Connected: ${this.userAddress.substring(0, 6)}...${this.userAddress.substring(38)}`;
            statusElement.classList.add('connected');
            connectButton.textContent = 'Disconnect';
            connectButton.disabled = false;
        } else {
            statusElement.textContent = '❌ Not Connected';
            statusElement.classList.remove('connected');
            connectButton.textContent = 'Connect MetaMask';
            connectButton.disabled = false;
        }
    }

    updateAdminSection() {
        const adminSection = document.getElementById('admin-section');
        adminSection.style.display = this.isOwner ? 'block' : 'none';
    }

    updateContractInfo() {
        document.getElementById('contract-address').textContent = CONTRACT_ADDRESS;
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showLoading(message) {
        this.showMessage(message, 'loading');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existing = document.querySelectorAll('.error, .success, .loading');
        existing.forEach(el => el.remove());

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = type;
        messageEl.textContent = message;
        
        // Insert after header
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', messageEl);
        
        // Auto-remove after 5 seconds (except loading)
        if (type !== 'loading') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BigWickGameApp();
});