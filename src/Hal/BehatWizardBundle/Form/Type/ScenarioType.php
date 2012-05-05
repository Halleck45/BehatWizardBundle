<?php

namespace Hal\BehatWizardBundle\Form\Type;

use Symfony\Component\Form\AbstractType,
    Symfony\Component\Form\FormBuilder,
    Symfony\Component\Form\FormView,
    Symfony\Component\Form\FormInterface;

class ScenarioType extends AbstractType
{

    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('title')
        ;
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Hal\BehatWizardBundle\Entity\Scenario'
        );
    }

    public function getName()
    {
        return 'scenario';
    }

}