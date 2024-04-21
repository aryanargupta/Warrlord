# Warlord - The Game
Warlord is a game inspired by Clash of clans.  <br/><br/>
The resources such as gold, elixir in clash of clans are in limited supply, and are difficult to gather.<br/><br/>
Consider gold, it is difficult to mine, since it takes time and is difficult to acquire through attacks, resembling proof of work. Also, since regularly lot of gold is burnt in building upgrades, its supply is regulated and it can act as a deflationary coin. Real value can be given to the gold coins. <br/><br/>
So, we are providing gamers to play this fun war game along with earning money through proof of work. We have created a liquidity pool, for gamers to swap their crypto for gold and vice versa, and an opportunity for liquidity providing for earning yield over swap transactions. Also, we have created interactive attack on other base opportunities for players. <br/><br/>
But there is a problem, how can a player prove that he attacked a base, scored a certain percentage of destruction and did not cheat at all? This is where the role of RISC0-ZKVM comes in.

## More
We have used Biconomy to easily onboard users and give them a smart account. This helps them send all transaction gas free. <br/><br/>
Players gold mines mine coin, and mining rate is currently set at 60 coins/hour. We have created a liquidity pool of gold coin and USDC, for players to swap their tokens and liquidity providers to earn money.<br/><br/>
Again used biconomy to batch 3 txs (approval coin 1+ approval coin 2+ add liquidity) to a single tx, so that liquidity provider only has to sign once. Similar things are done for swap. <br/><br/> 
Since, COC gold is always in huge demand, it is assured that the value of our gold coin will not crash abruptly. <br/><br/>
Now back to our problem. How can a player prove that he attacked a base, scored a certain percentage of destruction and did not cheat at all? This is where the role of RISC0-ZKVM comes in. Given a fixed set of troop, defence and building coordinates, their attack rates, damage and hitpoints, simulating an attack is always deterministic, utilizing this fact we have sent these details to RISC0-ZKVM which runs a simulation code and gives a proof of computation, which we can use to prove to the network that we have honestly attacked and computation is correct. <br/>

![image](https://github.com/aryanargupta/Warrlord/assets/97793907/0540c662-c382-4eae-93d0-6f630d264bdf)

