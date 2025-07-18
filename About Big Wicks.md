# Big Wicks

Big Wicks is a smart contract on Kusama Asset Hub that is modelled based on the parachain slot auction's candle auction model. Instead of competing to win a Kusama core, players are competing for a prize pot.

Each time a player bids, more funds are added to the prize pot. If a player bids multiple times, their subsequent bids are added to their total bid – meaning that users can "top up" their bid.

The model of the game is the same as parachain slot auctions. There is a 2-day initial bidding period or "starting period"; the winning bid cannot be selected during this time. There is then a 5-day "ending period" where a random block will be chosen randomly after the game has ended.

Whichever player had the highest bid during the randomly chosen block wins the entire prize pool (-10% which goes to the kusamahub team for future maintenance and development of the platform).

Additionally, there is a graph showing the competing positions over time, and a leaderboard showing the positions of bids.

