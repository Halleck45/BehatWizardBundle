<?php

namespace Hal\BehatWizardBundle\Manager\Wizard;

use Hal\BehatWizardBundle\Entity\FeatureInterface,
    Behat\Gherkin\Node\FeatureNode;


/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Feature Manager interface (wizard side)
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */

interface FeatureManagerInterface
{

    public function getFeatures();

    public function getFeatureByPath($path);

    public function saveFeature(FeatureInterface $feature);

    public function removeFeature(FeatureInterface $feature);

    public function factoryFeatureFromGherkinFeature(FeatureNode $node);
}