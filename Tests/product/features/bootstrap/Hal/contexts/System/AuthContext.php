<?php

namespace Behat\Hal\Behat\Context\System;

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
class AuthContext extends BehatContext
{

    /**
     * @Given /^I am product owner$/
     */
    public function iAmProductOwner()
    {

    }

}