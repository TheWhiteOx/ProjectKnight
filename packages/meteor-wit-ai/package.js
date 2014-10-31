Package.describe({
  summary: "Meteor package for Wit.ai",
  version: "1.1.1",
  git: "https://www.github.com/warrenmcquinn/meteor-wit-ai.git"
});

Package.on_use(function(api) {
 // api.versionsFrom('METEOR@0.9.3.1');
  api.use(['templating'], 'client');
  
  //add microphone files

  api.add_files(["microphone.min.css","microphone.min.js","microphone_template.html"],'client')
  api.add_files(["fonts/microphone.eot","fonts/microphone.svg","fonts/microphone.ttf","fonts/microphone.woff"],'client',{isAsset:true});
  api.add_files('warrenmcquinn_meteor-wit.js','client');
});

Package.on_test(function(api) {
  api.use('tinytest');
  api.use('meteor-wit-ai');
  api.add_files('warrenmcquinn_meteor-wit-tests.js');
});



