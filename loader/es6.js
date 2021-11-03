module.exports = function(moduleName) {
	if ("noModule" in HTMLScriptElement.prototype) {
		if (!(moduleName.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop()) {
			moduleName += '.js';
		}
		return eval(`import('${moduleName.replace(/['"]+/g, '')}')`);
	}
};
