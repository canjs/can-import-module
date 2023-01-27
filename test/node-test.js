var assert = require('assert');
var load = require('../can-import-module');


describe('loader', function() {
	it('no loader found', function () {
		load.flushLoader();
		return load('can-import-module/test/cjs-module', __dirname).then(function () {
			assert.fail("should not found any proper loader");
		}).then(null, function (err) {
			assert.ok(err);
		});
	});
});

describe('nodeJS', function (){
	it('loads fake module', function() {
		load.addLoader(require('../loader/node'));
		return load('can-import-module-test/cjs-module').then(function(module) {
			assert.equal(module, 'Hello from cjs-module');
		}).then(null, function(err){
			assert.fail(err);
		});
	});
});

describe('es6 module', function() {
	it('throws an error when trying to import in es6 style', function() {
		load.flushLoader();
		load.addLoader(require('../loader/es6'));
		return load('/test/es6-module').then(function() {
			assert.fail("es6 loader did not throw error when expected");
		}, function(err) {
			assert.equal(
				err.message,
				'ES dynamic imports are not available on this platform',
				'Correct error message returned from import attempt'
			);
		});
	});
});
