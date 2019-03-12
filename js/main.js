 $(function () {
      var SLIDE_IN_DOWN = { opacity: 1, top: 0 };
      var SLIDE_IN_UP = { opacity: 1, bottom: 0 };
      var SLIDE_IN_LEFT = { left: 0 };
      var SLIDE_IN_RIGHT = { right: 0 };


      executeAnimations();

      function executeAnimations() {
        $.when()
          .then(animateTitle)
          .then(animateQuote)
          .then(animateLinks)
          .then(animateLocation);
      }

      function animateTitle() {
        return animate('h1', SLIDE_IN_DOWN);
      }

      function animateQuote() {
        return $.when(
          animate('.quote-line-start', SLIDE_IN_LEFT),
          animate('.quote-line-end',SLIDE_IN_RIGHT),
          animate('.quote-icon-start', SLIDE_IN_DOWN),
          animate('.quote-icon-end', SLIDE_IN_UP)
        )
          .then(function () {
            return animate('.quote-content', SLIDE_IN_DOWN);
          })
          .then(function () {
            return animate('.quote-author', SLIDE_IN_DOWN);
          });
      }

      function animateLinks() {
        var DELAY_STEP = 180;
        var elements = $('.links a');
        var concurrent = $.makeArray(elements)
          .map(function (element, index) {
            return animate(element, SLIDE_IN_DOWN, index * DELAY_STEP);
          });

        return $.when.apply($, concurrent);
      }

      function animateLocation() {
        return $.when(
          animate('.webinfo-icon', SLIDE_IN_UP),
          animate('.webinfo-text', SLIDE_IN_DOWN)
        );
      }

      function animate(selector, properties, delay, options) {
        delay = delay || 0;
        return $(selector).delay(delay)
          .animate(properties, options)
          .promise();
      }


    });