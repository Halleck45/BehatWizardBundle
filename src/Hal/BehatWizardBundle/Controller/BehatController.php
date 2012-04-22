<?php

namespace Hal\BehatWizardBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class BehatController extends Controller
{
    public function synchronizeAction()
    {
        
        $behatManager = $this->get('hbw.behat_feature_manager');
        $behatManager->synchronize();
        return array();
    }
}
