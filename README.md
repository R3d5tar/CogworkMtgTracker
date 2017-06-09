# CogworkMtgTracker
A web-based tracking tool for (multiplayer) Magic: The Gathering games-states, like players and lifetotals. Primary function keeping track of life totals for multiple players, but concept should support tracking various game related states. 

## Requirements are:
- core functionality should work without a internet connection (after download of the site)
- easy to use on a range of devices like a smartphone, tablet, laptop and desktop (smart-tv in the future would be nice)
- limited rule enforcement (user is in control, but the tracker should make it easy to track common action and states)
- all actions are logged in a way that they are readable

## Backlog of Minimum Viable Product:
Includes:
- [DONE] responsive UI
- [DONE] show total state
- [DONE] tracking lifetotals (inc/dec)
- tracking multiple games (start, stop)
- tracking players (add, remove)
- tracking teams (posibility to register a team with a shared lifetotal, add and remove)
- show rich event logging of game actions

Excludes:
- tracking of counters
- commander registration and damage
- player icons
- commandline input

## Unique selling point: Command-line interactions
The idea is that it is possible to type all game state changes in a kinda commandline / natural language. For example writing the following should do what it reads:
+ start new game
+ Adam gains 10 life
+ Bernard joins game
+ Cindy joins game with The Mimeoplasm as Commander
+ Doran, the Siegetower deals 5 damage to Eddy
+ Francis gets 1 poison
+ play Hixos, Prison Warden [commander replay counter is increased]
+ set Ingrids life to 35
+ Julia loses 10 life

## How to install to continue developing
```cmd
npm install
pushd web
bower install
popd

```
## Run tests
```cmd
npm test
```

## Run simple webserver for testing purpose
```cmd
npm install http-server -g
http-server
```