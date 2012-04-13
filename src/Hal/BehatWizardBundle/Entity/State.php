<?php

namespace Hal\BehatWizardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Hal\BehatWizardBundle\Entity\State
 */
class State
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var integer $state
     */
    private $state;

    /**
     * @var datetime $createdAt
     */
    private $createdAt;


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
     * Set state
     *
     * @param integer $state
     */
    public function setState($state)
    {
        $this->state = $state;
    }

    /**
     * Get state
     *
     * @return integer 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set createdAt
     *
     * @param datetime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * Get createdAt
     *
     * @return datetime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}