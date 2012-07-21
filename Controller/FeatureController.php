<?php

namespace Hal\Bundle\BehatWizard\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class FeatureController extends ContainerAware
{

    /**
     * @Template
     */
    public function listAction()
    {
        $repository = $this->container->get('hbt.feature.repository');
        return array(
            'features' => $repository->getFeatures()
            , 'pendingFeatures' => $repository->getPendingFeatures()
            , 'failingFeatures' => $repository->getFailingFeatures()
            , 'validFeatures' => $repository->getValidFeatures()
        );
    }

}