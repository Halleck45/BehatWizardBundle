@javascript @scenario @feature
Feature: User can add a new feature that he wishes to be present in its application
  In order to extend the functional areas of my application
  As a product owner
  I should be able to add new feature

  Background:
    Given I am product owner

  Scenario: add new feature
    When I would like to add the feature "myFeature1"
    And I save the current feature
    Then I can see that these features have been added

  Scenario: add new feature with scenarios
    When I would like to add the feature "myFeature1"
    And this feature has the followings scenarios:
      | title       | 
      | MyScenario1 |
      | MyScenario2 |
    And I save the current feature
    Then I can see that this feature has been added
    And I can see that this feature contains "2" scenarios

  @tmp
  Scenario: add steps in my scenarios
    When I would like to add the feature "myFeature1"
    And this feature has the scenario "myScenario1" with the following steps:
      | type    | text             |
      | given   | sentence         |
      | when    | another sentence |
      | when    | another sentence |
      | then    | another sentence |
    And I save the current feature
    Then I can see that this feature contains "1" scenarios
    And I can see that the scenario "myScenario1" contains "4" steps

  Scenario Outline: add steps with multi-lined arguments in my scenarios
    When I would like to add the feature "myFeature1"
    And this feature has the scenario "myScenario1"
    And this scenario has the step:
      """
      Given sentence1:
        | letter |
        | A      |
        | B      |
      """
    And this scenario has the step:
      """
      Given sentence2:
        | letter | position |
        | A      | 1        |
        | B      | 2        |
        | C      | 3        |
      """
    And I save the current feature
    Then I can see that this feature contains "1" scenarios
    And I can see that this scenario contains "2" steps
    And I can see that this scenario contains all wanted steps
    And I can see that the step "<title>" has multi-lined argument
    And I can see that the step "<title>" has "<nbArgs>" arguments

    Examples:
      | title     | nbArgs |
      | sentence1 | 2      |
      | sentence2 | 3      |

  Scenario: add examples in my scenarios
    When I would like to add the feature "myFeature1"
    And this feature has the scenario "myScenario1" with the following steps:
      | type    | text                      |
      | given   | sentence <var1>           |
      | when    | another sentence <var2>   |
      | when    | another sentence          |
      | then    | another sentence          |
    And I provide the following examples:
      | var1    | var2   |
      | A       | 1      |
      | B       | 2      |
    And I save the current feature
    Then I can see that this feature contains "1" scenarios
    And I can see that this scenario contains "4" steps
    And I can see that this scenario contains an example
    And I can see that this example contains "2" rows
    And I can see that this example contains "2" columns