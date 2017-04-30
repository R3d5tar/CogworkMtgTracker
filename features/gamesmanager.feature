Feature: Games Manager
    The purpuse of the games managers is to manage which games are available and the ability to start, stop and find games.


    Scenario: Basic starting, finding en removing games
        Given there are already 0 games registered
        When a game starts
        Then there are 1 games registered

        # Given nothing changed
        When a game starts
        Then there are 2 games registered

        # Given nothing changed
        When a game "abc" starts
        Then there is a game "abc" registered
        And there are 3 games registered

        When game "abc" is removed
        Then there is no game "abc" registered
        And there are 2 games registered

        # Given nothing changed
        When the primary game is retrieved
        Then a game was returned as primary game
        
        Given a game "efd" starts
        When the primary game is retrieved
        Then game "efd" was returned as primary game

    Scenario: "Retreive primary game on empty game manager"
        Given there are already 0 games registered
        When the primary game is retrieved
        Then a game was returned as primary game
        And there are 1 games registered

    #Scenario: "Customizing starting life total"
     


