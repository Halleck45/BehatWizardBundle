@javascript @feature
Feature: User can know the list of features of his project
  In order to know the list of features I woulk like to have in my application
  As a product owner
  I should be able to get the list of all features I woulk like to have in my application

  Background:
    Given I am product owner

  Scenario: list all features of my project
    Given I would like to have the following features in my application:
      | title                |
      | example of feature 1 |
      | example of feature 2 |
    When I want to get the list of all features
    Then I can see these features

  Scenario Outline: list features by state
    Given I would like to have the following features in my application:
      | title                | state    |
      | example of feature 1 | success  |
      | example of feature 2 | success  |
      | example of feature 3 | fail     |
      | example of feature 4 | pending  |
    When I want to get the list of "<state>" features
    Then only "<state>" features are listed
    And the list is composed of "<number>" features

  Examples:
    | state      | number |
    | success    | 2      |
    | fail       | 1      |
    | pending    | 1      |

  Scenario Outline: list features by its tag
    Given I would like to have the following tagged features in my application:
      | title                | tags      |
      | example of feature 1 | tag1      |
      | example of feature 2 | tag1,tag2 |
      | example of feature 3 | tag2      |
      | example of feature 4 | tag1      |

    When I want to get the list of features that have the tag "<tag>"
    Then only "<tag>" tagged features are listed
    And the list is composed of "<number>" features

  Examples:
    | tag  | number |
    | tag1 | 3      |
    | tag2 | 2      |