(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n(99);var o=function(t){return t&&t.__esModule?t:{default:t}}(n(176)),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){var o=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(t,n):{};o.get||o.set?Object.defineProperty(e,n,o):e[n]=t[n]}return e.default=t,e}(n(1));function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),f(s(s(n=function(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?s(t):e}(this,p(e).call(this,t)))),"isOnComposition",void 0),f(s(s(n)),"onChange",function(t){n.setState({value:t.target.value},function(){n.isOnComposition||n.props.onChange(n.props.refId,"update",n.state.value)})}),f(s(s(n)),"onCompositionStart",function(){n.isOnComposition=!0}),f(s(s(n)),"onCompositionEnd",function(){n.isOnComposition=!1,n.props.onChange(n.props.refId,"update",n.state.value)}),n.isOnComposition=!1,n.state={value:t.value},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,r.PureComponent),function(t,e,n){e&&a(t.prototype,e),n&&a(t,n)}(e,[{key:"componentWillReceiveProps",value:function(t){this.setState({value:t.value})}},{key:"render",value:function(){var t=this.state.value,e=this.props,n=e.disabled,i=e.uiParams,a=void 0===i?{}:i;return r.default.createElement("div",{id:"input"},r.default.createElement(o.default,u({disabled:n,type:"text",value:t,onChange:this.onChange,onCompositionEnd:this.onCompositionEnd,onCompositionStart:this.onCompositionStart},a)))}}]),e}();e.default=l}}]);