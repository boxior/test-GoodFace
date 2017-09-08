///////////////////////////////////////////////////////////////////////////////////

'use strict';

$(function() {

    var leftArrow = $('.left_arrow'),
        rightArrow = $('.right_arrow'),
        item = $('.case_box'),
        items = $('.works-box'),
        widthCaseBox = $('.case_box').width(),
        marginRightCaseBox = $('.case_box').css('margin-right'),
        step = (parseInt(widthCaseBox) + parseInt(marginRightCaseBox) +'px'),
        widthWorkArrows = $('.container').width() + 'px';

    $('.work_arrows').css('width', widthWorkArrows);

    //Caclulate step and width .work_arrows during resize window
    $( window ).resize(function() {
        widthCaseBox = $('.case_box').width(),
        marginRightCaseBox = $('.case_box').css('margin-right'),
        step = parseInt(widthCaseBox) + parseInt(marginRightCaseBox) +'px';

        widthWorkArrows = $('.container').width() + 'px';
        $('.work_arrows').css('width', widthWorkArrows);
    });  

    //Hover images
    $(document).on('mouseenter', '.case_box', function() {
        $(this).css({'cursor':'pointer'});
        $(this).find('.cover_case_pic').addClass('hover');
    });

    $(document).on('mouseleave', '.case_box', function() {
        $(this).find('.cover_case_pic').removeClass('hover');
    });

    //Add data-count for slide elements
    item.each(function(i) {
        $(this).attr('data-count', i+1);
    });

    //Animation for description images
    function moveLeftAnime(percent) {
        $('.case_heading').animate({'margin-left': percent}, 500)
                        .animate({'margin-left': '0'}, 500);
        $('.case_desc').animate({'margin-left': percent}, 500)
                    .animate({'margin-left': '0'}, 500);
    }

    function moveRightAnime(percent) {
        $('.case_heading').animate({'margin-left': percent}, 500)
                        .animate({'margin-left': '0'}, 500);
        $('.case_desc').animate({'margin-left': percent}, 500)
                    .animate({'margin-left': '0'}, 500);
    }

    //To click on the right arrow
    var rightArrowClick = function() {
        $(this).unbind('click');
        var firstEl = $('.case_box:first');
        leftArrow.fadeIn();
        items.append(firstEl.clone());

        moveLeftAnime('40%');
        firstEl.animate({'margin-left': '-'+ step}, 1000, 
            (function() {
                rightArrow.bind('click', rightArrowClick);
            }))
                .queue(function() {
                    $(this).remove();
                });    

        if(firstEl.data('count') == 3) {
                rightArrow.css('display', 'none');
            } else {
                rightArrow.css('display', 'block');
            }
    }
    rightArrow.bind('click', rightArrowClick);

    //To click on the left arrow
    var leftArrowClick = function() {
        $(this).unbind('click');
        var lastEl = $('.case_box:last');
        rightArrow.fadeIn();

        items.prepend(lastEl.clone());
        moveRightAnime('-40%');
        
        $('.case_box:first').css({'margin-left': '-' + step})
                            .animate({'margin-left': '0px'}, 1000);
        lastEl.animate({'margin-right': '-'+ step}, 1000, 
                (function() {
                    leftArrow.bind('click', leftArrowClick);
                }))
                .queue(function() {
                    $(this).remove();
                });

        if(lastEl.data('count') == 1) {
                leftArrow.css('display', 'none');
            } else {
                leftArrow.fadeIn();
            }
    }
    leftArrow.bind('click', leftArrowClick);

    //For the drag in the right
    function dragRight() {
        var lastEl = $('.case_box:last');
        rightArrow.fadeIn();
        items.prepend(lastEl.clone());
        moveRightAnime('-40%'); 

        $('.case_box:first').css({'margin-left': '-' + step})
                            .animate({'margin-left': '0px'}, 1000);
        lastEl.animate({'margin-right': '-' + step}, 1000)
            .queue(function() {
                    $(this).remove();
                });
            if(lastEl.data('count') == 1) {
                    leftArrow.css('display', 'none');
                } else {
                    leftArrow.fadeIn();
                }
    }

    //For the drag in the left
    function dragLeft() {
        var firstEl = $('.case_box:first');
        leftArrow.fadeIn();
        items.append(firstEl.clone());
        moveLeftAnime('40%'); 

        firstEl.animate({'margin-left': '-'+ step}, 1000)
                .queue(function() {
                    $(this).remove();
                });    

        if(firstEl.data('count') == 3) {
                rightArrow.css('display', 'none');
            } else {
                rightArrow.css('display', 'block');
            }
    }

    //Main Drag function
    var startUi;
    var stopUi;
    var currUi;
    var maxCurrUi;
    var percent;
    var marker = true;
    $(function() {
        
        $('.works-box').draggable({
            axis: 'x',
            start: function(e, ui) {
                startUi = ui.position.left;
            },
            drag: function(e, ui) {
                currUi = ui.position.left;
                var percent = Math.abs(ui.position.left) + 'px';
                // console.log(startUi);
                console.log(ui.position.left);
                    function maxStep() {
                        maxCurrUi = startUi;
                        if(maxCurrUi > currUi) {
                            maxCurrUi = Math.abs(currUi);
                        }
                        return maxCurrUi;
                    }
                    maxStep();
                    console.log(maxCurrUi);
                if(currUi <= (startUi - 360) || currUi >= (startUi + 360)) {
                   return false;
                }
                if(currUi < startUi) {
                        console.log('left');
                        $('.case_heading').animate({'margin-left': '20px'}, 500);
                                        //   .animate({'margin-left': '0'}, 500);
                        $('.case_desc').animate({'margin-left': '20px'}, 500);
                                    //    .animate({'margin-left': '0'}, 500);


                    //  $('.case_box:first').animate({'margin-left':'50px'});
                    
                }
                if(currUi > startUi) {
                    if(marker) {
                        dragLeft();
                        marker = false;
                    }
                }
        // console.log(maxCurrUi);
        // percent = maxCurrUi + 'px';
            }, 
        stop: function(e, ui) {
            var firstEl = $('.case_box:first');
            var lastEl = $('.case_box:last');
            stopUi = ui.position.left;

            if(startUi < stopUi) {
                if(firstEl.data('count') !== 1) {
                    dragRight();
                } else {
                    $('.works-box').animate({'margin-left': '20px'})
                                   .animate({'margin-left': '0px'});
                    moveRightAnime('10%');
                }
            } else {
                if(firstEl.data('count') !== 4) {
                dragLeft();
                } else {
                    $('.works-box').animate({'margin-left': '-20px'})
                                   .animate({'margin-left': '0px'});
                    moveLeftAnime('-10%');
                }
            }
            $('.works-box').css({'left':'0'});
        }
        });
        
                    // $('.case_heading').delay(500).animate({'margin-left': percent}, 500);
                    //                 // .animate({'margin-left': '0'}, 500);
                    // $('.case_desc').animate({'margin-left': percent}, 500);
                    //             // .animate({'margin-left': '0'}, 500);
        
    });    
    // $('.works-box').draggable({
    //     axis: 'x',
    //     start: function(e, ui) {
    //         startUi = ui.position.left;
    //     },
    //     stop: function(e, ui) {
    //         var firstEl = $('.case_box:first');
    //         var lastEl = $('.case_box:last');
    //         stopUi = ui.position.left;

    //         if(startUi < stopUi) {
    //             if(firstEl.data('count') !== 1) {
    //                 dragRight();
    //             } else {
    //                 $('.works-box').animate({'margin-left': '20px'})
    //                                .animate({'margin-left': '0px'});
    //                 moveRightAnime('10%');
    //             }
    //         } else {
    //             if(firstEl.data('count') !== 4) {
    //             dragLeft();
    //             } else {
    //                 $('.works-box').animate({'margin-left': '-20px'})
    //                                .animate({'margin-left': '0px'});
    //                 moveLeftAnime('-10%');
    //             }
    //         }
    //         $('.works-box').css({'position': 'static','left':'0'});
    //     }
    // });

});

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
      _mouseInit = mouseProto._mouseInit,
      _mouseDestroy = mouseProto._mouseDestroy,
      touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');
    
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    var self = this;

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {

      // Simulate the click event
      simulateMouseEvent(event, 'click');
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.bind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.unbind({
      touchstart: $.proxy(self, '_touchStart'),
      touchmove: $.proxy(self, '_touchMove'),
      touchend: $.proxy(self, '_touchEnd')
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };

})(jQuery);