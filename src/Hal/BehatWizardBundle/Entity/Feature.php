<?php

namespace Hal\BehatWizardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Hal\BehatWizardBundle\Entity\Feature
 */
class Feature
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
     * @var text $description
     */
    private $description;

    /**
     * @var Hal\BehatWizardBundle\Entity\Scenario
     */
    private $scenario;

    public function __construct()
    {
        $this->scenario = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set description
     *
     * @param text $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * Get description
     *
     * @return text 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Add scenario
     *
     * @param Hal\BehatWizardBundle\Entity\Scenario $scenario
     */
    public function addScenario(\Hal\BehatWizardBundle\Entity\Scenario $scenario)
    {
        $this->scenario[] = $scenario;
    }

    /**
     * Get scenario
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getScenario()
    {
        return $this->scenario;
    }

}