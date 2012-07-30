BehatWizardBundle
================

GUI Tool for Behat's users.

This tool helps Product Owner to manager their features. They can:
- list theirs features and know the state of each feature
- filter features by state, tag...
- edit features
- add new features

## Demo

**You can see a [demo here](http://halleck45.github.com/BehatWizardBundle/demo/behat/wizard/list.html)**

## Preview

![Listing](https://github.com/Halleck45/BehatWizardBundle/raw/master/Resources/docs/screen-home-small.jpg)

![Edit feature](https://github.com/Halleck45/BehatWizardBundle/raw/master/Resources/docs/screen-edit-small.jpg)



Installation
-----------
2. Add the bundle and Behat to your project
3. Enable the bundle
4. Configure paths of behat features
5. Enable translator
6. Assetics


### Add the bundle to your project

    # deps
    [BehatWizardBundle]
        git=git://github.com/Halleck45/BehatWizardBundle.git
        target=/bundles/Hal/Bundle/BehatWizard
    [BehatToolsBundle]
        git=git://github.com/Halleck45/BehatToolsBundle.git
        target=/bundles/Hal/Bundle/BehatTools
    [gherkin]
        git=git@github.com:Halleck45/Gherkin.git
        target=/behat/gherkin
    [behat]
        git=git://github.com/Behat/Behat.git
        target=/behat/behat

### Enable the bundle

    # app/autoload.php
    'Hal\\Bundle'      => __DIR__.'/../vendor/bundles',
    'Behat\\Gherkin'   => __DIR__.'/../vendor/behat/gherkin/src',
    'Behat\\Behat'     => __DIR__.'/../vendor/behat/behat/src',
    'Behat\\Mink'      => __DIR__.'/../vendor/behat/mink/src',

    # app/AppKernel.php
    new Hal\Bundle\BehatTools\HalBehatToolsBundle(),
    new Hal\Bundle\BehatWizard\HalBehatWizardBundle(),

### Activate routes

Edit your routing configuration:
    
    # app/config/routing.yml
    HalBehatWizard:
      resource: "@HalBehatWizardBundle/Resources/config/routing.yml"

### Configure paths of behat features

Add the following lines to your config.yml file:

    parameters:
      behat.paths.base: /path/to/project/
      behat.paths.features: /path/to/project/features
      behat.paths.reports: /path/to/project/reports

Note that you need to run Behat with the junit formater parameter, in order to generator reports in JUnit format:

    $ behat -f junit --out /path/to/project/reports


### Assetics

    php app/console assets:install --symlink web
    php app/console assetic:dump web

### Translation

Remember to active the translator:

    # app/config/config.yml
    framework:
      translator: { fallback: en }


## Common bugs

#### The list of features is never updated
-> it's probably due to Twig's cache. Add the following rule to your config.yml

    twig:
      cache: false


