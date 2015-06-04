/*! showdown-prettify 04-06-2015 */
(function () {

  var prettify = function () {
    return [
      {
        type:   'output',
        filter: function (source) {
          return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
            if (pre) {
              return '<pre class="prettyprint linenums"><code' + codeClass + '>';
            } else {
              return ' <code class="prettyprint">';
            }
          });
        }
      }
    ];
  };
  if (typeof window !== 'undefined' && window.showdown && window.showdown.extensions) {
    window.showdown.extensions.prettify = prettify;
  }
    if (typeof module !== 'undefined') {
        module.exports = prettify;
    }

}());

//# sourceMappingURL=showdown-prettify.js.map