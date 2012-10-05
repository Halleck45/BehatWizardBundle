@scenario @feature
Feature: User can add a new feature that he wishes to be present in its application
  In order to extend the functional areas of my application
  As a product owner
  I should be able to add new feature

  Background:
    Given I am product owner


  Scenario: user create a feature
    When I would like to add the feature "myFeature1"
    And I save the current feature
    Then I should see that the feature "myFeature1" exists


  Scenario: user create a feature with scenarios
    When I would like to add the feature "myFeature1"
    And this feature has the followings scenarios:
      | title       |
      | MyScenario1 |
      | MyScenario2 |
    And I save the current feature
    Then I should see that the feature "myFeature1" exists
    And I should see that the feature "myFeature1" contains "2" scenarios


  Scenario: user create a scenario with steps
    When I would like to add the feature "myFeature1"
    And this feature has the scenario "myScenario1" with the following steps:
      | type    | text             |
      | given   | sentence         |
      | when    | another sentence |
      | when    | another sentence |
      | then    | another sentence |
    And I save the current feature
    Then I should see that the feature "myFeature1" exists
    And I should see that the feature "myFeature1" contains "2" scenarios
    And I should see that the scenario "myScenario1" of the feature "myFeature1" contains "4" steps


  Scenario Outline: user create multi-line steps in its scenarios
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
    Then I should see that the feature "myFeature1" exists
    And I should see that the feature "myFeature1" contains "2" scenarios
    And I should see that the scenario "myScenario1" of the feature "myFeature1" contains "2" steps
    And I should see that the step "<title>" has "<nbRows"> rows

    Examples:
      | title     | nbRows |
      | sentence1 | 2      |
      | sentence2 | 3      |

  Scenario: user want create scenario with examples
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
    Then I should see that the feature "myFeature1" exists
    And I should see that the feature "myFeature1" contains "2" scenarios
    And I should see that the scenario "myScenario1" of the feature "myFeature1" has "2" examples
    And I do anything
