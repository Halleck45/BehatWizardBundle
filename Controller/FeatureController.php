<?php

namespace Hal\Bundle\BehatWizard\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Hal\Bundle\BehatTools\Domain\Model\Feature\Dumper\Json as Feature_Dumper_Json;
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

    /**
     * @Template
     */
    public function editAction($feature)
    {
        $repository = $this->container->get('hbt.feature.repository');
        $feature = $repository->loadFeatureByHash($feature);

        //
        // Prepare datas
        $representation = new Feature_Dumper_Json($feature);

//echo '<pre>'.$representation->dump();
//exit;
        return array(
            'feature' => $feature
            , 'gherkin' => $feature->getGherkin()
            , 'report' => $feature->getReport()
            , 'dumper' => $representation
        );
    }

}