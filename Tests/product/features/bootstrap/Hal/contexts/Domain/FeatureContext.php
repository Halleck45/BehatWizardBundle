<?php

namespace Behat\Hal\Behat\Context\Domain;

use Behat\Mink\Behat\Context\MinkContext;
use Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException,
    Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode,
    Behat\Mink\Exception\ResponseTextException,
    AssertException;
use Behat\Behatch\Behat\Context\BehatchContext,
    Behat\Behatch\Behat\Context\BrowserContext,
    Behat\Behatch\Behat\Context\FileSystemContext,
    Behat\Behatch\Behat\Context\JSONContext,
    Behat\Behatch\Behat\Context\RESTContext,
    Behat\Behatch\Behat\Context\TableContext,
    Behat\Behatch\Behat\Context\DebugContext;

/**
 * Features context.
 */
class FeatureContext extends BehatContext
{

    private $feature;

    private function getMink()
    {
        return $this->getMainContext()->getSubcontext('mink');
    }

    /**
     * @When /^I would like to add the following features:$/
     */
    public function iWouldLikeToAddTheFollowingFeatures(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @Then /^I can see that these features have been added$/
     */
    public function iCanSeeThatTheseFeaturesHaveBeenAdded()
    {
        throw new PendingException();
    }

    /**
     * @When /^I would like to add the feature "([^"]*)"$/
     */
    public function iWouldLikeToAddTheFeature($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^this feature has the followings scenarios:$/
     */
    public function thisFeatureHasTheFollowingsScenarios(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @Then /^I can see that this feature has been added$/
     */
    public function iCanSeeThatThisFeatureHasBeenAdded()
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that this feature contains "([^"]*)" scenarios$/
     */
    public function iCanSeeThatThisFeatureContainsScenarios($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^this feature has the scenario "([^"]*)" with the following steps:$/
     */
    public function thisFeatureHasTheScenarioWithTheFollowingSteps($arg1, TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that this scenario contains "([^"]*)" steps$/
     */
    public function iCanSeeThatThisScenarioContainsSteps($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that this scenario contains all wanted steps$/
     */
    public function iCanSeeThatThisScenarioContainsAllWantedSteps()
    {
        throw new PendingException();
    }

    /**
     * @Given /^this feature has the scenario "([^"]*)"$/
     */
    public function thisFeatureHasTheScenario($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I have the feature "([^"]*)"$/
     */
    public function iHaveTheFeature($arg1)
    {
        throw new PendingException();
    }

    /**
     * @When /^I want to change this feature$/
     */
    public function iWantToChangeThisFeature()
    {
        throw new PendingException();
    }

    /**
     * @When /^I change this feature with as following:$/
     */
    public function iChangeThisFeatureWithAsFollowing(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @Then /^I can see that these features have been changed$/
     */
    public function iCanSeeThatTheseFeaturesHaveBeenChanged()
    {
        throw new PendingException();
    }

    /**
     * @Then /^I can see that this feature has now the title "([^"]*)"$/
     */
    public function iCanSeeThatThisFeatureHasNowTheTitle($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I would like to have the following features in my application:$/
     */
    public function iWouldLikeToHaveTheFollowingFeaturesInMyApplication(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @When /^I want to get the list of all features$/
     */
    public function iWantToGetTheListOfAllFeatures()
    {
        throw new PendingException();
    }

    /**
     * @Then /^I can see these features$/
     */
    public function iCanSeeTheseFeatures()
    {
        throw new PendingException();
    }

    /**
     * @When /^I want to get the list of "([^"]*)" features$/
     */
    public function iWantToGetTheListOfFeatures($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Then /^only "([^"]*)" features are listed$/
     */
    public function onlyFeaturesAreListed($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^the list is composed of "([^"]*)" features$/
     */
    public function theListIsComposedOfFeatures($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I would like to have the following tagged features in my application:$/
     */
    public function iWouldLikeToHaveTheFollowingTaggedFeaturesInMyApplication(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @When /^I want to get the list of features that have the tag "([^"]*)"$/
     */
    public function iWantToGetTheListOfFeaturesThatHaveTheTag($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Then /^only "([^"]*)" tagged features are listed$/
     */
    public function onlyTaggedFeaturesAreListed($arg1)
    {
        throw new PendingException();
    }

}