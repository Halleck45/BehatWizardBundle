<?php

namespace Hal\BehatWizardBundle\Manager\Behat;

use Doctrine\Common\Collections\Collection,
    Symfony\Component\Finder\Finder,
    Hal\BehatWizardBundle\Manager\Wizard\FeatureManagerInterface;
use Behat\Gherkin\Lexer,
    Behat\Gherkin\Parser,
    Behat\Gherkin\Keywords\ArrayKeywords;

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

    private $folder;
    private $wizardManager;
    private $gherkin;

    /**
     * Constructor
     * 
     * @param FeatureManagerInterface $wizardManager
     * @param string $testsFolder 
     */
    public function __construct(FeatureManagerInterface $wizardManager, $testsFolder)
    {
        $this->folder = (string) $testsFolder;
        $this->wizardManager = $wizardManager;
    }

    /**
     * Synchronize database with behat' tests path
     */
    public function synchronize()
    {
        $this
            ->_addNewFeatures()
            ->_removeOldFeatures();
    }

    /**
     * Add new features files to the wizard storage (database)
     * 
     * @return FeatureManager 
     */
    private function _addNewFeatures()
    {
        $finder = new Finder();
        $finder->files()->in($this->folder)->name('*.feature');

        foreach ($finder as $file) {

            $filename = $file->getRelativePathname();
            $feature = $this->wizardManager->getFeatureByPath($filename);

            if (!$feature) {
                $gherkinFeature = $this->factoryGherkinFeature($file->getRealpath());
                $feature = $this->wizardManager->factoryFeatureFromGherkinFeature($gherkinFeature);
                $this->wizardManager->saveFeature($feature);
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
        $finder = new Finder();
        foreach ($features as $feature) {
            $finder->files()->in($this->folder)->name($feature->getPath());
            //
            // File has been removed / moved
            if (sizeof($finder) == 0) {

                $this->wizardManager->remove($feature);
            }
        }
        return $this;
    }

    /**
     * Factory a gherkin node 
     * 
     * @param string $filename
     * @return Behat\Gherkin\Node\FeatureNode
     */
    public function factoryGherkinFeature($filename)
    {
        $parser = $this->getGherkinParser();
        return $parser->parse(file_get_contents($filename), $filename);
    }

    /**
     * Picked from gherkin sources
     * 
     * @todo : extract keywords from config
     * @return Parser 
     */
    protected function getGherkinParser()
    {
        if (null === $this->gherkin) {
            $keywords = new ArrayKeywords(array(
                    'en' => array(
                        'feature' => 'Feature',
                        'background' => 'Background',
                        'scenario' => 'Scenario',
                        'scenario_outline' => 'Scenario Outline',
                        'examples' => 'Examples',
                        'given' => 'Given',
                        'when' => 'When',
                        'then' => 'Then',
                        'and' => 'And',
                        'but' => 'But'
                    )
                ));
            $this->gherkin = new Parser(new Lexer($keywords));
        }

        return $this->gherkin;
    }

}