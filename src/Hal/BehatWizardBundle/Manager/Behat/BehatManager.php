<?php

namespace Hal\BehatWizardBundle\Manager\Behat;

use Symfony\Component\Finder\Finder,
    Behat\Gherkin\Lexer,
    Behat\Gherkin\Parser,
    Behat\Gherkin\Keywords\ArrayKeywords,
    Behat\Gherkin\Node\FeatureNode;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\ArgvInput;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Output\Output;
use Symfony\Component\Console\Output\ConsoleOutput;
use Behat\Behat\Console\Processor;

/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Behat Manager 
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
class BehatManager implements BehatManagerInterface
{

    private $folder;
    private $parser;

    /**
     * Constructor
     * 
     * @param string $testsFolder 
     */
    public function __construct($testsFolder, Parser $parser)
    {
        $this->folder = (string) rtrim($testsFolder, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
        $this->parser = $parser;
    }

    /**
     * Get features
     * 
     * @return array 
     */
    public function getFeatures()
    {
        $finder = new Finder();
        $finder->files()->in($this->folder)->name('*.feature');
        $features = array();

        foreach ($finder as $file) {
            $filename = $file->getRelativePathname();
            $node = $this->factoryGherkinFeature($file->getRealpath());
            array_push($features, $node);
        }

        return $features;
    }

    /**
     * get feature by its path
     * 
     * @param string $filename
     * @return null|Behat\Gherkin\Node\FeatureNode
     */
    public function getFeatureByPath($filename)
    {
        $finder = new Finder();
        $finder->files()->in($this->folder . dirname($filename))->name(basename($filename));
        foreach ($finder as $file) {
            return $this->factoryGherkinFeature($file->getRealpath());
        }
        return null;
    }

    /**
     * Factory a gherkin node 
     * 
     * @param string $filename
     * @return Behat\Gherkin\Node\FeatureNode
     */
    public function factoryGherkinFeature($filename)
    {
        return $this->parser->parse(file_get_contents($filename), $filename);
    }

    /**
     * Get the relative path of the given feature
     * 
     * @param FeatureNode $node
     * @return type 
     */
    public function getRelativePath(FeatureNode $node)
    {
        return str_replace($this->folder, '', $node->getFile());
    }

}