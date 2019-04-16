/**
 * purejs-mousetip - A pure javascript solution for creating tooltips that follow your mouse
 * @version 2.1.3
 * @author Joel Eisner <jeisner93@gmail.com>
 * @link http://joeleisner.com/purejs-mousetip
 * @license MIT
 */

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MouseTip =
/*#__PURE__*/
function () {
  // Construct the class
  function MouseTip(settings) {
    _classCallCheck(this, MouseTip);

    // Define default settings if not provided,...
    var _ref = settings || {},
        _ref$cssZIndex = _ref.cssZIndex,
        cssZIndex = _ref$cssZIndex === void 0 ? '9999' : _ref$cssZIndex,
        _ref$cssPosition = _ref.cssPosition,
        cssPosition = _ref$cssPosition === void 0 ? 'absolute' : _ref$cssPosition,
        _ref$cssPadding = _ref.cssPadding,
        cssPadding = _ref$cssPadding === void 0 ? '15px' : _ref$cssPadding,
        _ref$cssBorderRadius = _ref.cssBorderRadius,
        cssBorderRadius = _ref$cssBorderRadius === void 0 ? '4px' : _ref$cssBorderRadius,
        _ref$cssBackground = _ref.cssBackground,
        cssBackground = _ref$cssBackground === void 0 ? 'rgba(0,0,0,0.75)' : _ref$cssBackground,
        _ref$cssColor = _ref.cssColor,
        cssColor = _ref$cssColor === void 0 ? '#fff' : _ref$cssColor,
        _ref$html = _ref.html,
        html = _ref$html === void 0 ? true : _ref$html,
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? 'bottom right' : _ref$position,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? 'mousetip' : _ref$selector,
        _ref$stylesheet = _ref.stylesheet,
        stylesheet = _ref$stylesheet === void 0 ? false : _ref$stylesheet; // ... assign them to the class,...


    this.html = html;
    this.position = position;
    this.selector = selector;
    this.stylesheet = stylesheet; // ... and if a stylesheet has not been enabled...

    if (!this.stylesheet) {
      // ... assign the CSS settings to the class as well
      this.cssZIndex = cssZIndex;
      this.cssPosition = cssPosition;
      this.cssPadding = cssPadding;
      this.cssBorderRadius = cssBorderRadius;
      this.cssBackground = cssBackground;
      this.cssColor = cssColor;
    }
  } // Create the mousetip


  _createClass(MouseTip, [{
    key: "createMouseTip",
    value: function createMouseTip(event) {
      // Store the target element
      this.element = event.target; // Create the mousetip

      var mouseTip = document.createElement('span'); // Store the styling either from the target element's attributes or the constructor settings

      var zIndex = this.element.getAttribute(this.selector + '-css-zindex') || this.cssZIndex;
      var position = this.element.getAttribute(this.selector + '-css-position') || this.cssPosition;
      var padding = this.element.getAttribute(this.selector + '-css-padding') || this.cssPadding;
      var borderRadius = this.element.getAttribute(this.selector + '-css-borderradius') || this.cssBorderRadius;
      var background = this.element.getAttribute(this.selector + '-css-background') || this.cssBackground;
      var color = this.element.getAttribute(this.selector + '-css-color') || this.cssColor; // Assign the ID and styling to the mousetip

      mouseTip.id = this.selector;
      mouseTip.style.zIndex = zIndex;
      mouseTip.style.position = position;
      mouseTip.style.padding = padding;
      mouseTip.style.borderRadius = borderRadius;
      mouseTip.style.background = background;
      mouseTip.style.color = color; // Grab the message and HTML attributes from the event target

      var message = this.element.getAttribute(this.selector + '-msg');
      var html = this.html ? this.element.hasAttribute(this.selector + '-disable-html') : this.element.hasAttribute(this.selector + '-enable-html'); // If HTML is disabled globally and on the target element (or the inverse)...

      if (!this.html && !html || this.html && html) {
        // ... append the message to the mousetip as a text-node...
        mouseTip.appendChild(document.createTextNode(message));
      } else {
        // ... otherwise, append the message to the mousetip as HTML
        mouseTip.innerHTML = message;
      } // Append the mousetip to the bottom of the page...


      document.body.appendChild(mouseTip); // ... and store the mousetip

      this.mouseTip = document.getElementById(this.selector);
    } // Delete the mousetip

  }, {
    key: "deleteMouseTip",
    value: function deleteMouseTip() {
      // If the stored mousetip does not exist, return
      if (!this.mouseTip) return; // Delete the mousetip...

      this.mouseTip.parentNode.removeChild(this.mouseTip); // ... and delete the stored mousetip

      delete this.mouseTip; // If the stored target element does not exist, return

      if (!this.element) return; // Delete the stored target element

      delete this.element;
    } // Update the mousetip

  }, {
    key: "updateMouseTip",
    value: function updateMouseTip(event) {
      // Grab the X/Y of the mouse
      var mouseX = event.pageX;
      var mouseY = event.pageY; // Set the default adjustment to 15

      var defaultAdjust = 15; // Get the mousetip position from the target element or the constructor

      var position = (this.element.getAttribute(this.selector + '-pos') || this.position).split(' '),
          verticalAdjust,
          horizontalAdjust; // If the position does not contain two items, set it to the default

      if (position.length !== 2) position = ['bottom', 'right']; // Set the vertical adjustment from the first item of position

      switch (position[0]) {
        case 'top':
          verticalAdjust = -defaultAdjust - this.mouseTip.offsetHeight;
          break;

        case 'center':
          verticalAdjust = 0 - this.mouseTip.offsetHeight / 2;
          break;

        default:
          verticalAdjust = defaultAdjust;
      } // Set the horizontal adjustment from the second item of position


      switch (position[1]) {
        case 'left':
          horizontalAdjust = -defaultAdjust - this.mouseTip.offsetWidth;
          break;

        case 'center':
          horizontalAdjust = 0 - this.mouseTip.offsetWidth / 2;
          break;

        default:
          horizontalAdjust = defaultAdjust;
      } // Update the mousetip's position


      this.mouseTip.style.top = "".concat(mouseY + verticalAdjust, "px");
      this.mouseTip.style.left = "".concat(mouseX + horizontalAdjust, "px");
    } // Handle mouse events

  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      switch (event.type) {
        case 'mouseenter':
          // When the mouse enters an element, create the mousetip
          this.createMouseTip(event);
          break;

        case 'mouseleave':
          // When the mouse leaves an element, delete the mousetip
          this.deleteMouseTip();
          break;

        case 'mousemove':
          // When the mouse moves inside an element, update the mousetip
          this.updateMouseTip(event);
      }
    } // Start handling mouse events

  }, {
    key: "start",
    value: function start() {
      // Grab all elements by selector
      var elements = document.querySelectorAll("[".concat(this.selector, "]")); // If no elements were found, return

      if (!elements) return; // Store the elements for reference,...

      this.elements = elements; // ... and for each,...

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i]; // ... bind the mouse enter, leave, and move events

        element.addEventListener('mouseenter', this, false);
        element.addEventListener('mouseleave', this, false);
        element.addEventListener('mousemove', this, false);
      }
    } // Stop handling mouse events

  }, {
    key: "stop",
    value: function stop() {
      // If no element references are stored, return
      if (!this.elements || !this.elements.length) return; // For each element...

      for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i]; // ... unbind the mouse enter, leave, and move events

        element.removeEventListener('mouseenter', this, false);
        element.removeEventListener('mouseleave', this, false);
        element.removeEventListener('mousemove', this, false);
      } // Delete the stored element references...


      delete this.elements; // ... and the mousetip

      this.deleteMouseTip();
    }
  }]);

  return MouseTip;
}();