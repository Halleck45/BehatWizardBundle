<?php

namespace Hal\Bundle\BehatWizard\Features\Context;

use Behat\MinkExtension\Context\MinkContext,
    Behat\Behat\Context\BehatContext;

/**
 * FeatureContext
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 * @author Karol Sójko <zoja87@gmail.com>
 */
class MainContext extends BehatContext
{

    /**
     * @var array $parameters
     */
    protected $parameters;

    /**
     * Initializes context with parameters from behat.yml.
     *
     * @param array $parameters
     */
    public function __construct(array $parameters)
    {
        $this->parameters = $parameters;
        $this->useContext('mink', new MinkContext($parameters));
        $this->useContext('hbw-feature-feature', new FeatureContext($parameters));
        $this->useContext('hbw-feature-feature', new ScenarioContext($parameters));
    }

    /**
     * @Given /^I am product owner$/
     */
    public function iAmProductOwner()
    {

    }

    

}
