<?php

namespace Hal\BehatWizardBundle\Manager\Wizard;

use Doctrine\ORM\EntityManager,
    Doctrine\Common\Collections\Collection;
use Hal\BehatWizardBundle\Entity\Feature,
    Hal\BehatWizardBundle\Entity\FeatureInterface,
    Hal\BehatWizardBundle\Entity\Scenario,
    Hal\BehatWizardBundle\Entity\State;
use Behat\Gherkin\Node\FeatureNode;

/*
 * This file is part of the Behat Wizard
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Feature Manager (wizard side)
 * 
 * @author Jean-François Lépine <jeanfrancois@lepine.pro>
 */
class FeatureManager implements FeatureManagerInterface
{

    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function loadFeature($id)
    {
        return $this->getRepository()->find($id);
    }

    public function saveFeature(FeatureInterface $feature)
    {
        $this->em->persist($feature);
        $this->em->flush();
    }

    public function removeFeature(FeatureInterface $feature)
    {
        $this->em->remove($feature);
        $this->em->flush();
    }

    public function getFeatures()
    {
        return $this->getRepository()->findAll();
    }

    public function getFeatureByPath($path)
    {
        return $this->getRepository()->find(array('path' => $path));
    }

    public function getRepository()
    {
        return $this->em->getRepository('HalBehatWizardBundle:Feature');
    }

    /**
     * @todo factory feature and its scenarios from the Gherkin Feature node given
     */
    public function factoryFeatureFromGherkinFeature(FeatureNode $node)
    {
        $feature = new Feature;
        $feature->setPath($node->getFile());
        $feature->setTitle($node->getTitle());
        $feature->setDescription($node->getDescription());
        return $feature;
    }

}