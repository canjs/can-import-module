'use strict';

var QUnit = require('steal-qunit');
var load = require('./can-import-module');
var isNode = require('can-globals/is-node/is-node')();

if(!isNode) {
	QUnit.module('can-import-module');

	if (__dirname !== '/') {
		QUnit.test('basic can-import works', function(assert) {
			return load('can-import-module/test/test-module', __dirname).then(function(data) {
				assert.equal(data, 'Hello world');
			}).then(null, function(err){
				assert.ok(false, err);
			});
		});

		QUnit.test('es2020 dynamic import', function(assert) {
			this.oldSystem = global.System;
			global.System.import = null; // disable steals SystemJS
			return load('/test/es6-module.js', __dirname).then(function(data) {
				assert.equal(data.default, 'Hello world');
			}).then(null, function(err){
				assert.ok(false, err);
			});
		});

		QUnit.test('es2020 dynamic import without file extension', function(assert) {
			this.oldSystem = global.System;
			global.System.import = null; // disable steals SystemJS
			return load('/test/es6-module', __dirname).then(function(data) {
				assert.equal(data.default, 'Hello world');
			}).then(null, function(err){
				assert.ok(false, err);
			});
		});
	}
} else {
	QUnit.module('can-util/js/import - Node', {
		before: function(){
			// Create a fake System.import
			this.oldSystem = global.System;
			global.System = {
				"import": function(name){
					name = name.replace("can-util", "");

					return new Promise(function(resolve, reject){
						try {
							var mod = require(process.cwd() + name);
							resolve(mod);
						} catch(err) {
							reject(err);
						}
					});
				}
			};
		},
		after: function(){
			global.System = this.oldSystem;
		}
	});

	QUnit.test('basic can-import works', function(assert) {
		return load('can-import-module/test/test-module', __dirname).then(function(data) {
			assert.equal(data, 'Hello world');
		}).then(null, function(err){
			assert.ok(false, err);
		});
	});
}
