const ffi = require('ffi')
var ref = require('ref')

var ZTCLog = ref.types.void;
var ZTCLogPtr = ref.refType(ZTCLog);
var byteArry = ref.refType(ref.types.ushort);

var libZTCLog = ffi.Library('./ZTCLog', {
  'CreateInstance': [ ZTCLogPtr, [ 'string', 'string' ] ],
  'FreeInstance':['void', [ZTCLogPtr] ],
  'Log_Debug':['void',[ ZTCLogPtr, 'string', 'string', 'int', 'string', 'int', 'string', byteArry]],
  'setLogType':['void', [ ZTCLogPtr, 'int' ]]
})

createLogObject = function(PhysicalName, LogPath){
  return libZTCLog.CreateInstance(PhysicalName, LogPath);
}

freeLogObject = function(ptr){
  libZTCLog.FreeInstance(ptr);
}

setLogType = function(ptr, type){
  libZTCLog.setLogType(ptr, type);
}

Log_Debug = function(ptr, LayerName, FileName, lineNo, FunctionName, len, varName, contentArry){
  libZTCLog.Log_Debug(ptr, LayerName, FileName, lineNo, FunctionName, len, varName, contentArry);
}

function userZTCLog(){
  let logPtr = createLogObject('ZTCLogTest', 'D:\\ZTLog\\');
  console.log(logPtr);
  setLogType(logPtr, 1);
  var buf = ref.allocCString("123456");
  Log_Debug(logPtr, 'SP', 'Driver', 1, 'xxx', buf.length, 'test', buf);
}
