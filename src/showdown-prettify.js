//
//  Google Prettify
//  A showdown extension to add Google Prettify (http://code.google.com/p/google-code-prettify/)
//  hints to showdown's HTML output.
//

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

  // Client-side export
  if (typeof window !== 'undefined' && window.showdown && window.showdown.extensions) {
    window.showdown.extensions.prettify = prettify;
  }
  // Server-side export
    if (typeof module !== 'undefined') {
        module.exports = prettify;
    }

}());
