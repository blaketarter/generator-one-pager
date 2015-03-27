<% if (usesjQuery) { %>

  (function(window) {

    $(document).ready(function() {
      // website code
    });

  })(this);

<% } else { %>
  (function(window) {

    window.onload = function() {
      //website code
    };

  })(this);
<% } %>
