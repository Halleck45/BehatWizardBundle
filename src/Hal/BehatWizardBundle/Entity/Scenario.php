<?php

namespace Hal\BehatWizardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Hal\BehatWizardBundle\Entity\Scenario
 */
class Scenario
{

    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $path
     */
    private $path;

    /**
     * @var string $title
     */
    private $title;

    /**
     * @var Hal\BehatWizardBundle\Entity\State
     */
    private $state;

    /**
     * @var Hal\BehatWizardBundle\Entity\Feature
     */
    private $feature;

    public function __construct()
    {
        $this->state = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set path
     *
     * @param string $path
     */
    public function setPath($path)
    {
        $this->path = $path;
    }

    /**
     * Get path
     *
     * @return string 
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Add state
     *
     * @param Hal\BehatWizardBundle\Entity\State $state
     */
    public function addState(\Hal\BehatWizardBundle\Entity\State $state)
    {
        $this->state[] = $state;
    }

    /**
     * Get state
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set feature
     *
     * @param Hal\BehatWizardBundle\Entity\Feature $feature
     */
    public function setFeature(\Hal\BehatWizardBundle\Entity\Feature $feature)
    {
        $this->feature = $feature;
    }

    /**
     * Get feature
     *
     * @return Hal\BehatWizardBundle\Entity\Feature 
     */
    public function getFeature()
    {
        return $this->feature;
    }

}