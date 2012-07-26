@javascript @scenario @feature
Feature: User can change an existent feature
  In order to change any functional area of my application
  As a product owner
  I should be able to edit my features

  Background:
    Given I am product owner

  Scenario: edit new feature
    Given I have the feature "MyFeature1"
    When I want to change this feature
    When I change this feature with as following:
      | title               | 
      | MyFeature1IsChanged | 
    Then I can see that these features have been changed
    Then I can see that this feature has now the title "MyFeature1IsChanged"

  Scenario: edit feature with scenarios
    Given I have the feature "MyFeature1"
    And this feature has the followings scenarios:
      | title       | 
      | MyScenario1 |
      | MyScenario2 |
    When I remove the scenario "MyScenario1"
    Then I can see that these features have been changed
    And I can see that this feature contains "1" scenarios


  Scenario: edit feature scenarios with steps
    Given I have the feature "MyFeature1"
    And this feature has the scenario "myScenario1" with the following steps:
      | type    | text             |
      | given   | sentence         |
      | when    | another sentence |
      | when    | another sentence |
      | then    | another sentence |
    When I remove the step "sentence"
    Then I can see that this feature contains "1" scenarios
    And I can see that this scenario contains "3" steps
    And I can see that this scenario contains all wanted steps

  Scenario: edit steps with multi-lined arguments in my scenarios

  Scenario: edit examples in my scenarios