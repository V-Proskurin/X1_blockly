var myInterpreter;
var serverUrl = "";
var href = serverUrl+'cmd?name=';
var pollUrl = serverUrl+'poll?name=';

function initApi(interpreter, globalObject) {

  // Add an API function for the alert() block.
  var wrapper = function alert(text) {
    return window.alert(arguments.length ? text : '');
  };
  interpreter.setProperty(globalObject, 'alert',
  interpreter.createNativeFunction(wrapper));
  
  // Add an API function for the pause() block.
  wrapper = function pause(milliseconds) {    
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);    
  };
  interpreter.setProperty(globalObject, 'pause',
  interpreter.createNativeFunction(wrapper));
  
  // Add an API function for the prompt() block.
  wrapper = function(text) {
    return prompt(text);
  };
  interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));
	  
  // Add an API function for highlighting blocks.
  wrapper = function(id) {
     id = String(id || '');
     return highlightBlock(id);
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));
  
  // Add an API function for all minecraft block.
  wrapper = function xhr(command, callback) {
   with(new XMLHttpRequest()) {
    open('GET', href+command, true);
    onreadystatechange = function() {
      if (readyState === 4 && status === 200) {
        //callback(responseText);
        console.log('OK - ' + href+command);
	outputArea.value += '\nOK - ' + command;
      }
      if(status !== 200) {
        console.log('CONNECT ERROR - ' + href+command);
	outputArea.value += '\nCONNECT ERROR - ' + command;
      }
	  
    };
    send(null);
   }
  };
  interpreter.setProperty(globalObject, 'xhr',
  interpreter.createNativeFunction(wrapper));

//no async getjson
  wrapper = function getJSON(command, callback) {
     with(new XMLHttpRequest()) {
	open('GET', pollUrl+command, false);
	getResponseHeader('Content-Type', 'aplication/json', 'charset=utf-8');
	send();
	return responseText;
    }
  };
  interpreter.setProperty(globalObject, 'getJSON',
  interpreter.createNativeFunction(wrapper));
	
}
