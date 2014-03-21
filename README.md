BehatWizardBundle
================

[![Dependencies](http://dependency.me/repository/image/Halleck45/BehatWizardBundle/master)](http://dependency.me/repository/branche/Halleck45/BehatWizardBundle/master)

GUI Tool for Behat users.

This tool helps Product Owners to manage their features. They can:
- list their features and know the state of each feature
- filter features by state, tag, etc...
- edit features
- add new features


# Deprecated

This tool is deprecated. Please prefer the standalone [BddWizard](https://github.com/Halleck45/BDDWizard)

## Demo

**You can see a [demo here](http://halleck45.github.com/BehatWizardBundle/demo/behat/wizard/list.html)**

## Preview

![Listing](https://github.com/Halleck45/BehatWizardBundle/raw/master/Resources/docs/screen-home-small.jpg)

![Edit feature](https://github.com/Halleck45/BehatWizardBundle/raw/master/Resources/docs/screen-edit-small.jpg)



Installation
-----------

### Update your composer file:

    "require-dev": {
        "halleck45/behat-wizard-bundle": "dev-master"
    }

### Enable the bundle

    # app/AppKernel.php
    if (in_array($this->getEnvironment(), array('dev', 'test'))) {
        // ...
        $bundles[] = new Hal\Bundle\BehatWizard\HalBehatWizardBundle();
    }

### Activate routes

Edit your routing configuration:
    
    # app/config/routing.yml
    HalBehatWizard:
      resource: "@HalBehatWizardBundle/Resources/config/routing.yml"
      prefix: /

### Configure paths of behat features

Add the following lines to your config.yml file:

    parameters:
      behat.paths.base: /path/to/project/
      behat.paths.features: /path/to/project/features
      behat.paths.reports: /path/to/project/reports

Note that you need to run Behat with the junit formater parameter, in order to generate reports in JUnit format:

    $ behat -f junit --out /path/to/project/reports

If you use a configuration file for Behat, you can use this configuration:

    formatter:
      name:                   pretty,junit
      parameters:
        output_path:          null,build/behat

### Assetics

    php app/console assets:install --symlink web
    php app/console assetic:dump web

And edit your config file:

    assetic:
        (...)
        bundles:        [ HalBehatWizardBundle ]

### Translation

Remember to active the translator:

    # app/config/config.yml
    framework:
      translator: { fallback: en }

### Use it !

Just go to `/app_dev.php/behat/wizard/list`

## Common bugs

#### The list of features is never updated
-> it's probably due to Twig's cache. Add the following rule to your config.yml

    twig:
      cache: false

