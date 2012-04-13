<?php

namespace Hal\BehatWizardBundle\Manager;

use Doctrine\ORM\EntityManager,
    Doctrine\Common\Collections\Collection;
use Hal\BehatWizardBundle\Entity\Feature,
    Hal\BehatWizardBundle\Entity\Scenario,
    Hal\BehatWizardBundle\Entity\State;

class FeatureManager
{

    protected $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * Load feature by its ID
     * 
     * @param integer $id
     * @return Hal\BehatWizardBundle\Entity\Feature 
     */
    public function loadFeature($id)
    {
        return $this->getRepository()->find($id);
    }

    /**
     * Get the list of available features (from database)
     * 
     * @return Doctrine\Common\Collections\Collection
     */
    public function getFeatures()
    {
        return $this->getRepository()->findAll();
    }

    public function getRepository()
    {
        return $this->em->getRepository('BehatWizardBundle:Favorite');
    }

}