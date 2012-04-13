<?php

namespace Hal\BehatWizardBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class FeaturesController extends Controller
{
    /**
     * @Template
     */
    public function listAction()
    {
        return array();
    }
}
