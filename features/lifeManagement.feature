Feature: Life Management
Important feature is the ability to track life totals.
This feature focusses on tracking life totals of teams.
Important is operations are executed against the right objects and the correct amounts.


    Background: Two player game in progress
        Given "Amy" and "Boris" play a game

        Scenario Outline: Combat Damage
            Given "Boris" is at <start> life
            When "Boris" is dealt <damage> combat damage
            Then "Boris" has <end> life

            Examples:
            | start | damage    | end   |
            | 20    | 5         | 15    |
            | 15    | 3         | 12    |
            | 4     | 20        | -16   |

        Scenario Outline: Life loss
            Given "Amy" is at <start> life
            When "Amy" loses <points> life
            Then "Amy" has <end> life

            Examples:
            | start | points    | end   |
            | 21    | 15        | 6     |
            | 3     | 5         | -2    |

        Scenario Outline: Life gain
            Given "Boris" is at <start> life
            When "Boris" gains <points> life
            Then "Boris" has <end> life

            Examples:
            | start | points    | end   |
            | 21    | 15        | 36    |
            | 3     | 5         | 8     |

    Scenario: Set life
        Given "Boris" is at 10 life
        When "Boris" his life is set to 13
        Then "Boris" has 13 life

    Scenario: Exchange life
        Given "Amy" is at 7 life
        And "Boris" is at 13 life
        When "Amy" and "Boris" exchange life totals
        Then "Amy" has 13 life
        And "Boris" has 7 life

    Scenario: Life link damage
        Given "Amy" is at 7 life
        And "Boris" is at 13 life
        When "Boris" is dealt 7 damage with lifelink by "Amy"
        Then "Amy" has 14 life
        And "Boris" has 6 life

    Scenario: Drain life
        Given "Amy" is at 1 life
        And "Boris" is at 99 life
        When "Amy" drains 50 life from "Boris"
        Then "Amy" has 51 life
        And "Boris" has 49 life

    Scenario Outline: Half life
        Given "Amy" is at <start> life
        When "Amy" loses half her life rounded <rounded>
        When "Amy" has <result> life
        Examples:
        | start | rounded | result  |
        | 50    | up      | 25      |
        | 50    | down    | 25      |
        | 21    | up      | 10      |
        | 21    | down    | 11      |
