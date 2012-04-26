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
    
    /**
     * @Template
     */
    public function addAction() {
        return array();
    }
    public function editAction() {
        $manager = $this->get('hbw.wizard_feature_manager');
        $features = $manager->getFeatures();
        var_dump($features);
        exit;
    }
}
