<?php

namespace Hal\Bundle\BehatWizard\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class FeatureController
{

    /**
     * @Template
     */
    public function listAction()
    {
        return array('name' => 'jeff');
    }

}