/**
 * @module loader_type_js
 * @description Load JS from external URL.
 * @see https://raw.githubusercontent.com/bem/bem-core/v4.2.0/common.blocks/loader/_type/loader_type_js.js
 */

 var loading = {},
 loaded = {},
 head = document.getElementsByTagName('head')[0],
 runCallbacks = function(path, type) {
     var cbs = loading[path], cb, i = 0;
     delete loading[path];
     while(cb = cbs[i++]) {
         cb[type] && cb[type]();
     }
 },
 onSuccess = function(path) {
     loaded[path] = true;
     runCallbacks(path, 'success');
 },
 onError = function(path) {
     runCallbacks(path, 'error');
 };


/**
* @exports
* @param {String} path resource link
* @param {Function} [success] to be called if the script succeeds
* @param {Function} [error] to be called if the script fails
*/
export default function loader_js(path, success, error) {
 if(loaded[path]) {
     success && success();
     return;
 }

 if(loading[path]) {
     loading[path].push({ success : success, error : error });
     return;
 }

 loading[path] = [{ success : success, error : error }];

 var script = document.createElement('script');
 script.type = 'text/javascript';
 script.charset = 'utf-8';
 script.src = (location.protocol === 'file:' && !path.indexOf('//')? 'http:' : '') + path;

 if('onload' in script) {
     script.onload = function() {
         script.onload = script.onerror = null;
         onSuccess(path);
     };

     script.onerror = function() {
         script.onload = script.onerror = null;
         onError(path);
     };
 } else {
     script.onreadystatechange = function() {
         var readyState = this.readyState;
         if(readyState === 'loaded' || readyState === 'complete') {
             script.onreadystatechange = null;
             onSuccess(path);
         }
     };
 }

 head.insertBefore(script, head.lastChild);
}
