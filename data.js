var data={
	textEncode: function(data){
		return encodeURIComponent(data.replace(/\\n/g, "\\r\\n").replace(/\\n/g, "\\n")
				  .replace(/\\'/g, "\\'")
				  .replace(/\\"/g, '\\"')
				  .replace(/\\&/g, "\\&")
				  .replace(/\\r/g, "\\r")
				  .replace(/\\t/g, "\\t")
				  .replace(/\\b/g, "\\b")
				  .replace(/\\f/g, "\\f"));
	}
}