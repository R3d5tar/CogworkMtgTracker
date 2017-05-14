Feature: Storage
    To prevent sudden loss of game data by navigating away of the page, closing a tab or a sudden crash, the gamestate should be saveable.
    Also to be able to move a share a game state or to later resume one it could come in handy to serialize the gamestate.
    To be able to do this the complete state should be exportable and importable.

    Scenario: Export the state of a player
        Given there is a player "abc"
        When that player is exported
        Then the exported object has a property "name" with value "abc"
        And the exported object has a property "id" with any value

    Scenario Outline: Export the state of a team
        Given there is a team starting with <life> life
        When that team is exported
        Then the exported object has a property "id" with any value
        And the exported object has a property "lifeTotal" with value <life>
        And the exported object has a property "players" containing 0 items
    Examples:
    | life     |
    | 20       |
    | 30       |
    | 40       |


    Scenario: Import the state of a player
        Given there is an object to import
        And that import object has a property "id" with value "player-thisshouldbeaguid"
        And that import object has a property "name" with value "abc"
        When that import object is imported as a player
        Then there is a player object
        And that player is named "abc"
        And that player has id "player-thisshouldbeaguid"
    
    Scenario: Import the state of a team
        Given there is an object to import
        And that import object has a property "id" with value "team-thisshouldbeaguid"
        And that import object has a property "lifeTotal" with value "10"
        And that import object has a property "players" containing an array
        When that import object is imported as a team
        Then there is a team object
        And that team is at 10 life
        And that team has id "team-thisshouldbeaguid"
        And that team has no players
        

# TODO:
#  - export combination of players and teams
#  - export game
#  - export combination of game and team
#  - export game manager
#  - export combination of game manager and games
#  - importing anything

    