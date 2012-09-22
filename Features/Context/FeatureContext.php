<?php

namespace Hal\Bundle\BehatWizard\Features\Context;

use Behat\MinkExtension\Context\MinkContext;

/**
 * FeatureContext
 * 
 * @author Karol Sójko <zoja87@gmail.com>
 */
class FeatureContext extends MinkContext
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
    }

    

}
