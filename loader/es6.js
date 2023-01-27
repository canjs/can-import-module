var getGlobal = require("can-globals/global/global");

// check for `noModule` in HTMLScriptElement. if its present, then the browser can handle dynamic loading because if
// HTMLScriptElement.noModule is `true` the browser used to run fallback scripts in older browsers that do not support JavaScript modules
if ("HTMLScriptElement" in getGlobal() && "noModule" in HTMLScriptElement.prototype) {
	module.exports = new Function("function esImport(moduleName) {\n" +
		// if moduleName has no extension, threat it as a javascript file and add .js extension
		"if (!(moduleName.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop()) {\n" +
			"moduleName += '.js';\n" +
		"}\n" +
		"return import(moduleName.replace(/['\"]+/g, ''));\n" +
	"}");
} else {
	module.exports = function() {
		throw new Error("ES dynamic imports are not available on this platform");
	}
}
