<?php

namespace Hal\BehatWizardBundle\Form\Type;

use Symfony\Component\Form\AbstractType,
    Symfony\Component\Form\FormBuilder,
    Symfony\Component\Form\FormView,
    Symfony\Component\Form\FormInterface;

class FeatureType extends AbstractType
{

    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description_in_order_to')
            ->add('description_as')
            ->add('description_i_should')
            ->add('scenarios', 'collection', array(
                 'type' => new ScenarioType()
                , 'by_reference' => false
                , 'allow_add' => true
                , 'allow_delete' => true
                , 'required' => false
            ))
            
            // @todo : background

        ;
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Hal\BehatWizardBundle\Entity\Feature'
        );
    }

    public function getName()
    {
        return 'feature';
    }

}