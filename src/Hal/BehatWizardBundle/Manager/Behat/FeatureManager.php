<?php

namespace Hal\BehatWizardBundle\Manager\Behat;

use Hal\BehatWizardBundle\Manager\Wizard\FeatureManagerInterface,
    Behat\Gherkin\Lexer,
    Behat\Gherkin\Parser,
    Behat\Gherkin\Keywords\ArrayKeywords,
    Behat\Gherkin\Node\FeatureNode;

/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Feature Manager (gherkin/behat side)
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
class FeatureManager
{

    private $behatManager;
    private $wizardManager;

    /**
     * Constructor
     * 
     * @param FeatureManagerInterface $wizardManager
     * @param string $testsFolder 
     */
    public function __construct(FeatureManagerInterface $wizardManager, BehatManagerInterface $behatManager)
    {
        $this->behatManager = $behatManager;
        $this->wizardManager = $wizardManager;
    }

    /**
     * Synchronize database with behat' tests path
     */
    public function synchronize()
    {
        $this
            ->_addOrUpdateFeatures()
            ->_removeOldFeatures();
    }

    /**
     * Add new features files to the wizard storage (database)
     * 
     * @return FeatureManager 
     */
    private function _addOrUpdateFeatures()
    {
        $nodes = $this->behatManager->getFeatures();
        foreach ($nodes as $node) {
            $filename = $this->behatManager->getRelativePath($node);
            $feature = $this->wizardManager->getFeatureByPath($filename);
            if (!$feature) {
                //
                // new features
                $feature = $this->wizardManager->factoryFeatureFromNode($node);
                $feature->setPath($filename);
                $this->wizardManager->saveFeature($feature);
            } else {
                //
                // changed features
                if (spl_object_hash($node) == spl_object_hash($feature->getNode())) {
                    $this->wizardManager->updateFeatureWithNode($feature, $node);
                    $this->wizardManager->saveFeature($feature);
                }
            }
        }
        return $this;
    }

    /**
     * Remove old features from the wizard storage (database)
     * 
     * @return FeatureManager 
     */
    private function _removeOldFeatures()
    {
        $features = $this->wizardManager->getFeatures();
        foreach ($features as $feature) {
            $node = $this->behatManager->getFeatureByPath($feature->getPath());
            if (null === $node) {
                $this->wizardManager->removeFeature($feature);
            }
        }
        return $this;
    }

}