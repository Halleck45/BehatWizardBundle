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
}