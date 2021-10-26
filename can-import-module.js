'use strict';

var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/import/import import
 * @parent can-util/js
 * @signature `importModule(moduleName, parentName)`
 * @hide
 *
 * ```js
 * var importModule = require("can-util/js/import/import");
 *
 * importModule("foo.stache").then(function(){
 *   // module was imported
 * });
 * ```
 *
 * @param {String} moduleName The module to be imported.
 * @param {String} [parentName] A parent module that will be used as a reference for resolving relative module imports.
 * @return {Promise} A Promise that will resolve when the module has been imported.
 */
var loader = [];

function addLoader(fn){
	if(typeof fn === "function"){
		loader.push(fn);
	}
}

function flushLoader(){
	loader = [];
}

function preset(preset){
	switch (preset){
		case "stealjs":
			addLoader(require("./loader/steal-optimized"));
			addLoader(require("./loader/system"));
			break;
		case "ES2020":
		case "dynamic-import":
			addLoader(require("./loader/es6"));
			break;
		case "node":
			addLoader(require("./loader/node"));
			break;
		default:
			addLoader(require("./loader/steal-optimized"));
			addLoader(require("./loader/es6"));
			addLoader(require("./loader/node"));
			addLoader(require("./loader/require"));
			addLoader(require("./loader/system"));
			break;
	}
}

preset('all');

module.exports = namespace.import = function(moduleName, parentName) {
	return new Promise(function(resolve, reject) {
		try {
			var loaderPromise;
			for (var i = loader.length - 1; i >= 0; i--) {
				loaderPromise = loader[i](moduleName, parentName);
				if (loaderPromise) {
					break;
				}
			}

			if(loaderPromise){
				loaderPromise.then(resolve, reject);
			}else{
				reject("no proper module-loader available");
			}
		} catch(err) {
			reject(err);
		}
	});
};
module.exports.addLoader = addLoader;
module.exports.flushLoader = flushLoader;
module.exports.preset = preset;
