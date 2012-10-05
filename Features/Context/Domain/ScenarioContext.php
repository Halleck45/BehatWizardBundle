<?php

namespace Hal\Bundle\BehatWizard\Features\Context\Domain;

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
 * Scenario context.
 */
class ScenarioContext extends BehatContext
{

    protected function getMink()
    {
        return $this->getMainContext()->getSubcontext('mink')->getSession();
    }
    
    /**
     * @When /^I remove the scenario "([^"]*)"$/
     */
    public function iRemoveTheScenario($name)
    {
        $xpath = "//*[@class='scenario-title-text'][.='" . $name . "']" // text
            . "/ancestor::*[@class='scenario']" // container
            . "/descendant::*[@class='btn-scenario-remove']" // btn remove
        ;
        $this->getMink()->getDriver()->click($xpath);
    }




    /**
     * @Given /^I should see that the feature "([^"]*)" contains "([^"]*)" scenarios$/
     */
    public function iShouldSeeThatTheFeatureContainsScenarios($arg1, $arg2)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I should see that the scenario "([^"]*)" of the feature "([^"]*)" contains "([^"]*)" steps$/
     */
    public function iShouldSeeThatTheScenarioOfTheFeatureContainsSteps($arg1, $arg2, $arg3)
    {
        throw new PendingException();
    }

    /**
     * @Given /^this scenario has the step:$/
     */
    public function thisScenarioHasTheStep(PyStringNode $string)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I should see that the step "([^"]*)" has "<nbRows"> rows$/
     */
    public function iShouldSeeThatTheStepHasNbrowsRows($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I provide the following examples:$/
     */
    public function iProvideTheFollowingExamples(TableNode $table)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I should see that the scenario "([^"]*)" of the feature "([^"]*)" has "([^"]*)" examples$/
     */
    public function iShouldSeeThatTheScenarioOfTheFeatureHasExamples($arg1, $arg2, $arg3)
    {
        throw new PendingException();
    }

}