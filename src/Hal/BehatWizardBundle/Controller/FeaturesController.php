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
        
        $manager = $this->get('hbw.feature_wizard.manager');
        $feature = $manager->createFeature();
        $form = $this->get('hbw.edit_feature.form.form');
        $formHandler = $this->get('hbw.edit_feature.form.handler');
        
        $process = $formHandler->process($feature);
        if($process) {
            $this->setFlash('notice', 'edit_feature.flash.success');
            $this->redirect('behat_welcome');
        }
        
        return array(
            'form' => $form->createView()
        );
    }
    public function editAction() {
        $manager = $this->get('hbw.feature_wizard.manager');
        $features = $manager->getFeatures();
        var_dump($features);
        exit;
    }
}
