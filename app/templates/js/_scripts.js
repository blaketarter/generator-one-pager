'use strict';

<% if (usesjQuery) { %>

  (function(window, document, $) {

    $(document).ready(function() {
      // website code
    });

  })(this, document, $);

<% } else { %>
  (function(window) {

    window.onload = function() {
      //website code
    };

  })(this);
<% } %>
