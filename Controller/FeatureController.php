<?php

namespace Hal\Bundle\BehatWizard\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Hal\Bundle\BehatTools\Domain\Model\Feature\Dumper\Json as Feature_Dumper_Json;
use Hal\Bundle\BehatWizard\Form\Type\FeatureType;
use Symfony\Component\HttpFoundation\RedirectResponse;

/*
 * This file is part of the Behat Tools
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class FeatureController extends ContainerAware {

    /**
     * @Template
     */
    public function listAction() {
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
    public function editAction($feature) {
        $repository = $this->container->get('hbt.feature.repository');
        $feature = $repository->loadFeatureByHash($feature);

        if (is_null($feature)) {
            $feature = $repository->createFeature();
        }

        $representation = new Feature_Dumper_Json($feature);


        $form = $this->container->get('form.factory')->create(new FeatureType(), $feature);
        $request = $this->container->get('request');
        if ($request->getMethod() == 'POST') {
            $form->bindRequest($request);
            if ($form->isValid()) {
                $repository->saveFeature($feature);

                $url = $this->container->get('router')->generate('hbw.home');
                return new RedirectResponse($url);
            }
        }

        return array(
            'feature' => $feature
            , 'gherkin' => $feature->getGherkin()
            , 'report' => $feature->getReport()
            , 'dumper' => $representation
            , 'form' => $form->createView(),
        );
    }

    public function removeAction($feature) {
        $repository = $this->container->get('hbt.feature.repository');
        $feature = $repository->loadFeatureByHash($feature);
        if(!$feature) {
            return new Response('Feature was not found', 404);
        }
        $repository->removeFeature($feature);
        $url = $this->container->get('router')->generate('hbw.home');
        return new RedirectResponse($url);
    }

}