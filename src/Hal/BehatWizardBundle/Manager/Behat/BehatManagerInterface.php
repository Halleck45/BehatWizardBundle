<?php

namespace Hal\BehatWizardBundle\Manager\Behat;

/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Behat Manager interface
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
interface BehatManagerInterface
{

    public function getFeatures();

    public function getFeatureByPath($filename);

    public function factoryGherkinFeature($filename);
}