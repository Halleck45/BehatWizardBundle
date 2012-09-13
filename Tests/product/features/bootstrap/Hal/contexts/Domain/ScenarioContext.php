<?php

namespace Behat\Hal\Behat\Context\Domain;

use Behat\Mink\Behat\Context\MinkContext;
use Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException,
    Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode,
    Behat\Mink\Exception\ResponseTextException,
    AssertException;

/**
 * Features context.
 */
class ScenarioContext extends FeatureContext
{

    /**
     * @Given /^this scenario has the step:$/
     */
    public function thisScenarioHasTheStep(PyStringNode $string)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that the step "([^"]*)" has multi-lined argument$/
     */
    public function iCanSeeThatTheStepHasMultiLinedArgument($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that the step "([^"]*)" has "([^"]*)" arguments$/
     */
    public function iCanSeeThatTheStepHasArguments($arg1, $arg2)
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
     * @Given /^I can see that this scenario contains an example$/
     */
    public function iCanSeeThatThisScenarioContainsAnExample()
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that this example contains "([^"]*)" rows$/
     */
    public function iCanSeeThatThisExampleContainsRows($arg1)
    {
        throw new PendingException();
    }

    /**
     * @Given /^I can see that this example contains "([^"]*)" columns$/
     */
    public function iCanSeeThatThisExampleContainsColumns($arg1)
    {
        throw new PendingException();
    }

    /**
     * @When /^I remove the scenario "([^"]*)"$/
     */
    public function iRemoveTheScenario($name)
    {
        $xpath = "//*[@class='scenario-title-text'][.='".$name."']" // text
            . "/ancestor::*[@class='scenario']" // container
            . "/descendant::*[@class='btn-scenario-remove']" // btn remove
            ;
        $this->getMink()->getDriver()->click($xpath);
    }

    /**
     * @When /^I remove the step "([^"]*)"$/
     */
    public function iRemoveTheStep($arg1)
    {
        throw new PendingException();
    }

}