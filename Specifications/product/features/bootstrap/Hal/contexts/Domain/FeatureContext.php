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

    protected function getMink()
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
     * @AfterFeature
     */
    public static function tearDown(FeatureEvent $event)
    {
        $files = glob(self::$FOLDER . '/*.*');
        foreach ($files as $filename) {
            unlink($filename);
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
            , new When('I remove the scenario "My scenario"')
            , new When(sprintf('I fill in "title" with "%s"', $this->currentFeature['title']))
        );
    }

    /**
     * @When /^I save the current feature$/
     */
    public function iSaveTheCurrentFeature()
    {
        $this->getMink()->getDriver()->click("//*[.='Save']");
        $this->getMink()->wait(4000);
    }

    /**
     * @Given /^this feature has the followings scenarios:$/
     */
    public function thisFeatureHasTheFollowingsScenarios(TableNode $table)
    {
        $hash = $table->getHash();
        $steps = array();
        foreach ($hash as $scenario) {
            $steps = array_merge($steps, array(
                new When('I press "New Scenario"')
                , new When(sprintf('I fill in "Title" with "%s"', $scenario['title']))
                , new When('I press "I finished for this scenario"')
                ));
        }
        return $steps;
    }

    /**
     * @Then /^I can see that this feature has been added$/
     */
    public function iCanSeeThatThisFeatureHasBeenAdded()
    {
        return array(
            new When('I want to get the list of all features')
            , new Then(sprintf('I should see "%s"', $this->currentFeature['title']))
        );
    }

    /**
     * @Then /^I can see that this feature contains "([^"]*)" scenarios$/
     */
    public function iCanSeeThatThisFeatureContainsScenarios($nb)
    {
        return array(
            new When(sprintf('I want to modify the feature "%s"', $this->currentFeature['title']))
            , new Then(sprintf('I should see %d ".scenarios .scenario-title" elements', $nb))
        );
    }

    /**
     * @When /^I want to modify the feature "([^"]*)"$/
     */
    public function iWantToModifyTheFeature($title)
    {
        return array(
            new When(sprintf('I follow "%s"', $title))
        );
    }

    /**
     * @When /^I want to modify the scenario "([^"]*)"$/
     */
    public function iWantToModifyTheScenario($title)
    {
        return array(
            new When(sprintf('I follow "%s"', $title))
        );
    }

    /**
     * @Given /^this feature has the scenario "([^"]*)" with the following steps:$/
     */
    public function thisFeatureHasTheScenarioWithTheFollowingSteps($title, TableNode $scenarioSteps)
    {
        $steps = array(
            new When(sprintf('this feature has the scenario "%s"', $title))
            , new When(sprintf('I want to modify the scenario "%s"', $title))
        );

        $mappingButtons = array(
            'given' => 'simple pre-requisite'
            , 'when' => 'simple event'
            , 'then' => 'simple expected result'
        );
        $mappingInput = array(
            'given' => 'Given'
            , 'when' => 'When'
            , 'then' => 'Then'
        );

        $hash = $scenarioSteps->getHash();
        foreach ($hash as $step) {
            $steps = array_merge($steps, array(
                new When(sprintf('I follow "%s"', $mappingButtons[$step['type']]))
                , new When(sprintf('I fill in the last "step-%s" with "%s"', $step['type'], $step['text']))
                )
            );
        }

        $steps = array_merge($steps, array(new When('I press "I finished for this scenario"')));
        return $steps;
    }

    /**
     * @Given /^I can see that the scenario "([^"]*)" contains "([^"]*)" steps$/
     */
    public function iCanSeeThatTheScenarioContainsSteps($title, $nbSteps)
    {
        return array(
            new When(sprintf('I want to modify the scenario "%s"', $title))
            , new Then(sprintf('I should see %d ".scenario-content .step" elements', $nbSteps))
        );

    }

    /**
     * @Given /^this feature has the scenario "([^"]*)"$/
     */
    public function thisFeatureHasTheScenario($title)
    {
        $table = new TableNode(
                '| title       | '
                . PHP_EOL . sprintf('| %s |', $title)
        );
        return array(
            new When('this feature has the followings scenarios:', $table)
        );
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
        return array(
            new When('I go to "/behat/wizard/list"')
        );
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