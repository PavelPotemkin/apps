(self["webpackChunkwebpack_template"]=self["webpackChunkwebpack_template"]||[]).push([["games/qq"],{"./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/e=>{"use strict";e.exports=a;var r=/(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/,o={reset:["fff","000"],black:"000",red:"ff0000",green:"209805",yellow:"e8bf03",blue:"0000ff",magenta:"ff00ff",cyan:"00ffee",lightgrey:"f0f0f0",darkgrey:"888"},n={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"lightgrey"},t={1:"font-weight:bold",2:"opacity:0.5",3:"<i>",4:"<u>",8:"display:none",9:"<del>"},s={23:"</i>",24:"</u>",29:"</del>"};function a(e){if(!r.test(e))return e;var o=[],n=e.replace(/\033\[(\d+)m/g,(function(e,r){var n=t[r];if(n)return~o.indexOf(r)?(o.pop(),"</span>"):(o.push(r),"<"===n[0]?n:'<span style="'+n+';">');var a=s[r];return a?(o.pop(),a):""})),a=o.length;return a>0&&(n+=Array(a+1).join("</span>")),n}function i(e){for(var r in t["0"]="font-weight:normal;opacity:1;color:#"+e.reset[0]+";background:#"+e.reset[1],t["7"]="color:#"+e.reset[1]+";background:#"+e.reset[0],t["90"]="color:#"+e.darkgrey,n){var o=n[r],s=e[o]||"000";t[r]="color:#"+s,r=parseInt(r),t[(r+10).toString()]="background:#"+s}}[0,21,22,27,28,39,49].forEach((function(e){s[e]="</span>"})),a.setColors=function(e){if("object"!==typeof e)throw new Error("`colors` parameter must be an Object.");var r={};for(var n in o){var t=e.hasOwnProperty(n)?e[n]:null;if(t){if("reset"===n){if("string"===typeof t&&(t=[t]),!Array.isArray(t)||0===t.length||t.some((function(e){return"string"!==typeof e})))throw new Error("The value of `"+n+"` property must be an Array and each item could only be a hex string, e.g.: FF0000");var s=o[n];t[0]||(t[0]=s[0]),1!==t.length&&t[1]||(t=[t[0]],t.push(s[1])),t=t.slice(0,2)}else if("string"!==typeof t)throw new Error("The value of `"+n+"` property must be a hex string, e.g.: FF0000");r[n]=t}else r[n]=o[n]}i(r)},a.reset=function(){i(o)},a.tags={},Object.defineProperty?(Object.defineProperty(a.tags,"open",{get:function(){return t}}),Object.defineProperty(a.tags,"close",{get:function(){return s}})):(a.tags.open=t,a.tags.close=s),a.reset()},"./src/pages/games/qq.ts":
/*!*******************************!*\
  !*** ./src/pages/games/qq.ts ***!
  \*******************************/()=>{"use strict";console.log("qq")},"./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/(e,r,o)=>{var n=o(/*! events */"./node_modules/events/events.js");e.exports=new n},"./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/e=>{var r="info";function o(){}function n(e){var o="info"===r&&"info"===e||["info","warning"].indexOf(r)>=0&&"warning"===e||["info","warning","error"].indexOf(r)>=0&&"error"===e;return o}function t(e){return function(r,o){n(r)&&e(o)}}e.exports=function(e,r){n(e)&&("info"===e?console.log(r):"warning"===e?console.warn(r):"error"===e&&console.error(r))};var s=console.group||o,a=console.groupCollapsed||o,i=console.groupEnd||o;e.exports.group=t(s),e.exports.groupCollapsed=t(a),e.exports.groupEnd=t(i),e.exports.setLogLevel=function(e){r=e},e.exports.formatError=function(e){var r=e.message,o=e.stack;return o?o.indexOf(r)<0?r+"\n"+o:o:r}}},e=>{var r=r=>e(e.s=r);e.O(0,["vendor.html-entities","vendor.webpack-dev-server","vendor.events"],(()=>(r("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=8080&pathname=%2Fws&logging=info&reconnect=10"),r("./src/pages/games/qq.ts"))));e.O()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0ssR0FFaEN4RSxFQUFPQyxRQUFRd0UsZUFBaUJOLEVBQVNNLEdBRXpDekUsRUFBT0MsUUFBUXlFLFNBQVdQLEVBQVNPLEdBRW5DMUUsRUFBT0MsUUFBUTBFLFlBQWMsU0FBVVQsR0FDdENILEVBQVdHLEdBR1psRSxFQUFPQyxRQUFRMkUsWUFBYyxTQUFVQyxHQUN0QyxJQUFJQyxFQUFVRCxFQUFJQyxRQUNkQyxFQUFRRixFQUFJRSxNQUNoQixPQUFLQSxFQUVNQSxFQUFNckQsUUFBUW9ELEdBQVcsRUFDNUJBLEVBQVUsS0FBT0MsRUFFakJBLEVBSkFELEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC1jb21tdW5pdHkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9wYWdlcy9nYW1lcy9xcS50cyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5jb25zb2xlLmxvZygncXEnKTtcclxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsInZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcbi8qIGVzbGludC1lbmFibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cbn07XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFuc2lIVE1MIiwiX3JlZ0FOU0kiLCJfZGVmQ29sb3JzIiwicmVzZXQiLCJibGFjayIsInJlZCIsImdyZWVuIiwieWVsbG93IiwiYmx1ZSIsIm1hZ2VudGEiLCJjeWFuIiwibGlnaHRncmV5IiwiZGFya2dyZXkiLCJfc3R5bGVzIiwiX29wZW5UYWdzIiwiX2Nsb3NlVGFncyIsInRleHQiLCJ0ZXN0IiwiYW5zaUNvZGVzIiwicmV0IiwicmVwbGFjZSIsIm1hdGNoIiwic2VxIiwib3QiLCJpbmRleE9mIiwicG9wIiwicHVzaCIsImN0IiwibCIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsIl9zZXRUYWdzIiwiY29sb3JzIiwiY29kZSIsImNvbG9yIiwib3JpQ29sb3IiLCJwYXJzZUludCIsInRvU3RyaW5nIiwiZm9yRWFjaCIsIm4iLCJzZXRDb2xvcnMiLCJFcnJvciIsIl9maW5hbENvbG9ycyIsImtleSIsImhleCIsImhhc093blByb3BlcnR5IiwiaXNBcnJheSIsInNvbWUiLCJoIiwiZGVmSGV4Q29sb3IiLCJzbGljZSIsInRhZ3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIm9wZW4iLCJjbG9zZSIsImNvbnNvbGUiLCJsb2ciLCJFdmVudEVtaXR0ZXIiLCJsb2dMZXZlbCIsImR1bW15Iiwic2hvdWxkTG9nIiwibGV2ZWwiLCJsb2dHcm91cCIsImxvZ0ZuIiwibXNnIiwid2FybiIsImVycm9yIiwiZ3JvdXAiLCJncm91cENvbGxhcHNlZCIsImdyb3VwRW5kIiwic2V0TG9nTGV2ZWwiLCJmb3JtYXRFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJzdGFjayJdLCJzb3VyY2VSb290IjoiIn0=