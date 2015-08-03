Package.describe({
  name: 'chjjin:autoform-extra-api',
  summary: 'Extra API for autoform',
  version: '0.0.1',
  git: 'https://github.com/ChJJin/meteor-autoform-extra-api.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'jquery',
    'aldeed:autoform@5.3.2'
  ]);
  api.addFiles('client/autoform-extra-api.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('chjjin:autoform-extra-api');
  api.addFiles('autoform-extra-api-tests.js');
});
