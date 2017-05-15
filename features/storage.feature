Feature: Storage (Import and export)
To prevent sudden loss of game data by navigating away of the page, closing a tab or a sudden crash, the gamestate should be saveable.
Also to be able to move a share a game state or to later resume one it could come in handy to serialize the gamestate.
To be able to do this the complete state should be exportable and importable.

        #EXPORT
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

    Scenario: Export a team with players
        Given there is a team at 10 life
        And player "Bert" joins that team
        And player "Ernie" joins that team
        When that team is exported
        Then the exported object has a property "players" containing 2 items
        And the "players" property of the exported object contains an object with a property "name" and a value "Ernie"
        And the "players" property of the exported object contains an object with a property "name" and a value "Bert"

    Scenario: Export the state of a game
        Given there is a game with a starting life total of 20
        When that game is exported
        Then the exported object has a property "startingLifeTotal" with value 20
        And the exported object has a property "teams" containing 0 items

    Scenario: Export a game with teams and players
        Given there is a game with a starting life total of 20
        And player "Bassie" joins that game
        And player "Adriaan" joins that game
        When that game is exported
        Then the exported object has a property "startingLifeTotal" with value 20
        And the exported object has a property "teams" containing 2 items
        And the "teams" property of the exported object contains an object with a property "lifeTotal" and a value 20
        And the "teams" property of the exported object contains an object with a property "lifeTotal" and a value 20


        #IMPORT:
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
        And that team has 0 players

    Scenario: Import the state of a team with players
        Given there is an object to import
        And that import object has a property "lifeTotal" with value "10"
        And that import object has a property "players" containing an array
        And there is another object to import
        And that import object has a property "name" with value "Bert"
        And that import object is added to the "players" collection of the previous object
        When that import object is imported as a team
        Then there is a team object
        And that team is at 10 life
        And that team has 1 players
        And that team contains a player named "Bert"

    Scenario: Import the state of a game
        Given there is an object to import
        And that import object has a property "startingLifeTotal" with value "20"
        And that import object has a property "teams" containing an array
        When that import object is imported as a game
        Then there is a game object
        And that game has a starting life total of 20
        And that game has 0 teams

    Scenario: Import the state of a game with teams
        Given there is an object to import
        And that import object has a property "teams" containing an array
        And there is another object to import
        And that import object has a property "id" with value "team-abc"
        And that import object has a property "lifeTotal" with value "13"
        And that import object has a property "players" containing an array
        And that import object is added to the "teams" collection of the previous object
        When that import object is imported as a game
        Then there is a game object
        And that game has 1 teams
        And that game contains a team with id "team-abc"

        # TODO:
        #  - export game manager
        #  - import game manager

        #  - export combination of game manager and games
        #  - import combination of game manager and games

        # - the magic around game (parenting) and players/teams... of maybe some clean-up...

