//Generate CPU - function to return a message with CPU temperature as float
// The function must take the string input ofr the cpu temp and make it a float
var cpuString = msg.payload;
cpuString = cpuString.replace ("temp=",'');
var tempOffset = parseFloat(cpuString.replace("\'C\n",''));
msg.topic = "calibration";
msg.payload = tempOffset;
return msg;