<?php

namespace Hal\Bundle\BehatWizard\Form\Type;

use Symfony\Component\Form\AbstractType,
    Symfony\Component\Form\FormBuilder,
    Symfony\Component\Form\FormView,
    Symfony\Component\Form\FormInterface;

/*
 * This file is part of the Behat Tools
 * (c) 2012 Jean-François Lépine <jeanfrancois@lepine.pro>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class FeatureType extends AbstractType
{

    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('content', 'textarea', array('required' => true), array('id' => 'ipt-feature' ))
        ;
    }

    public function getDefaultOptions(array $options)
    {
        return array(
        );
    }

    public function getName()
    {
        return 'feature';
    }

}