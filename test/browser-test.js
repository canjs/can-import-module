var QUnit = require('steal-qunit');
var moduleImport = require( '../can-import-module');

QUnit.test('load npm library via default config (SystemJS first)', function(assert) {
	return moduleImport('can-import-module/test/cjs-module').then(function(data) {
		assert.equal(data, 'Hello from cjs-module');
	}).then(null, function(err){
		assert.ok(false, err);
	});
});

QUnit.test('load es6 module with dynamic import', function(assert) {
	moduleImport.preset('es2020');
	return moduleImport('/test/es6-module').then(function(module) {
		assert.equal(module.default, 'Hello from es6-module');
	}).then(null, function(err){
		assert.ok(false, err);
	});
});


QUnit.test('custom loader', function(assert){
	moduleImport.flushLoader();
	moduleImport.addLoader(function(moduleName){
		return import(moduleName.replace('cjs', 'es6'));
	});

	return moduleImport('/test/cjs-module.js').then(function(module) {
		assert.equal(module.default, 'Hello from es6-module', 'es6 module loaded');
	}).then(null, function(err){
		assert.ok(false, err);
	});
});

QUnit.test('presets', function(assert){
	moduleImport.preset('node');
	return moduleImport('/test/cjs-module.js').then(function() {
		assert.ok(false);
	}, function(err){
		assert.equal(err, 'no proper module-loader available');
	});
});
