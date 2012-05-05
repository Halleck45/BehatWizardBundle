<?php

namespace Hal\BehatWizardBundle\Form\Handler;

use Symfony\Component\Form\Form,
    Symfony\Component\HttpFoundation\Request,
    Hal\BehatWizardBundle\Entity\FeatureInterface,
    Hal\BehatWizardBundle\Manager\Wizard\FeatureManagerInterface;

class EditFeatureFormHandler
{

    protected $request;
    protected $featureManager;
    protected $form;

    public function __construct(Form $form, Request $request, FeatureManagerInterface $featureManager)
    {
        $this->form = $form;
        $this->request = $request;
        $this->featureManager = $featureManager;
    }

    public function process(FeatureInterface $feature)
    {

        if ('POST' === $this->request->getMethod()) {
            $this->form->bindRequest($this->request);

            if ($this->form->isValid()) {
                $this->onSuccess($feature);

                return true;
            }
        }

        return false;
    }

    protected function onSuccess(FeatureInterface $feature)
    {
        //
        // @todo here
        
        $this->featureManager->saveFeature($feature);
    }

}