<?php

namespace Behat\Hal\Behat\Context\Domain;

use Behat\Mink\Behat\Context\MinkContext;
use Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException,
    Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode,
    Behat\Mink\Exception\ResponseTextException,
    AssertException,
    Behat\Behat\Event\FeatureEvent,
    Behat\Behat\Event\SuiteEvent,
    Behat\Behat\Context\Step\Given,
    Behat\Behat\Context\Step\When,
    Behat\Behat\Context\Step\Then;

/**
 * Features context.
 */
class FeatureContext extends BehatContext
{

    private $currentFeature;
    private static $FOLDER;

    /**
     * Context initialization
     *
     * @param array $parameters context parameters (set them up through behat.yml)
     */
    public function __construct(array $parameters)
    {
        if (!isset($parameters["behat"]['features'])) {
            throw new \Exception('Please specify the folder of features');
        }

        self::$FOLDER = $parameters["behat"]['features'];
    }

    private function getMink()
    {
        return $this->getMainContext()->getSubcontext('mink')->getSession();
    }

    /**
     * @BeforeFeature
     */
    public static function prepare(FeatureEvent $event)
    {
        if (!file_exists(self::$FOLDER)) {
            mkdir(self::$FOLDER, 0775);
        }
    }


    /**
     * @Then /^I can see that these features have been added$/
     */
    public function iCanSeeThatTheseFeaturesHaveBeenAdded()
    {
        return array(
            new When('I go to "/behat/wizard/list"')
            , new Then(sprintf('I should see "%s"', $this->currentFeature['title']))
        );
    }

    /**
     * @When /^I would like to add the feature "([^"]*)"$/
     */
    public function iWouldLikeToAddTheFeature($title)
    {
        $table = new TableNode("|title|\n|{$title}|");
        $hash = $table->getHash();
        $this->currentFeature = $hash[0];
        return array(
            new Given('I go to "/behat/wizard/add"')
            , new When(sprintf('I fill in "title" with "%s"', $this->currentFeature['title']))
            , new When('I save the current feature')
        );
    }
    /**
     * @When /^I save the current feature$/
     */
    public function isSaveTheCurrentFeature()
    {
        $this->getMink()->getDriver()->click("//*[.='Save']");
        $this->getMink()->wait(3000);
    }

    /**
     * @Given /^this feature has the followings scenarios:$/
     */
    public function thisFeatureHasTheFollowingsScenarios(TableNode $table)
    {
        $hash = $table->getHash();
        $steps = array();
        foreach($hash as $scenario) {
            $steps = array_merge($steps, array(
                new When('I follow "New scenario"')
                , new When(sprintf('I fill in "" with "%s"', $scenario['title']))
                , new When('I follow "btn-feature-edit')
            ));
        }
        return $steps;
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