<?php

namespace Behat\Hal\Behat\Context;

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
class HalContext extends BehatContext
{

    /**
     * Context initialization
     *
     * @param array $parameters context parameters (set them up through behat.yml)
     */
    public function __construct(array $parameters)
    {
        $this->useContext('mink', new \Behat\MinkExtension\Context\MinkContext($parameters));
        $this->useContext('hbw-sys-auth', new System\AuthContext($parameters));
        $this->useContext('hbw-feature-feature', new Domain\FeatureContext($parameters));
        $this->useContext('hbw-feature-feature', new Domain\ScenarioContext($parameters));
    }

    /**
     * Array for storing custom parameters during steps
     *
     * @var array
     */
    private $parameters = array();

    /**
     * @param string $name
     * @return string
     */
    public function getParameter($name)
    {
        return $this->parameters[$name];
    }

    /**
     * @param string $name
     * @return boolean
     */
    public function hasParameter($name)
    {
        return isset($this->parameters[$name]);
    }

    /**
     * @param string $name
     * @param string $value
     * @return void
     */
    public function setParameter($name, $value)
    {
        $this->parameters[$name] = $value;
    }


    /**
     * @When /^I fill in the last "([^"]*)" with "([^"]*)"$/
     */
    public function iFillInTheLastWith($locator, $value)
    {
        $mink = $this->getSubcontext('mink')->getSession();
        $fields =  $mink->getPage()->findAll('named', array(
            'field', $mink->getSelectorsHandler()->xpathLiteral($locator)
        ));
        $field = array_pop($fields);
        $field->setValue($value);
    }

}