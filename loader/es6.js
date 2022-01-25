module.exports = function(moduleName) {
	// check for `noModule` in HTMLScriptElement. if its present, then the browser can handle dynamic loading because if
	// HTMLScriptElement.noModule is `true` the browser used to run fallback scripts in older browsers that do not support JavaScript modules
	if ("noModule" in HTMLScriptElement.prototype) {
		// if moduleName has no extension, threat it as a javascript file and add .js extension
		if (!(moduleName.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop()) {
			moduleName += '.js';
		}
		return import(moduleName.replace(/['"]+/g, ''));
	}
};
