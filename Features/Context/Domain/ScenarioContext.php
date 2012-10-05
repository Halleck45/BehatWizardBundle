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

}