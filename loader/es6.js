module.exports = function(moduleName) {
	if ("noModule" in HTMLScriptElement.prototype) {
		if (!(moduleName.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop()) {
			moduleName += '.js';
		}
		return import(moduleName.replace(/['"]+/g, ''));
	}
};
