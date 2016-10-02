//This function pulls alerts out of a merged 
// forecast.io data object and French Toast JSON object 
// (converted from XML)and converts
// the array of alerts into a string, annotates the message for 
// background and text color, and
// returns that string as the payload

var numAlerts =0;
var currentAlerts =[];
var alertString = "";
var bgColor = "off";
var textColor = "white";
var levelFT = String(msg.payload.frenchtoast.status);
var levelChar = levelFT.charAt(0);

alertString = "FT Level: " + levelFT + " ";

switch (levelFT) {
    case "low":
        bgColor = "off";
        textColor = "green";
    break;
    case "guarded":
        bgColor ="blue";
        textColor = "white";
    break;
    case "elevated":
        bgColor ="yellow";
        textColor = "white";
    break;
    case "high":
        bgColor ="orange";
        textColor = "white";
    break;
    case "severe":
        bgColor ="red";
        textColor = "white";
    break;
    default:
    levelFT = "Didn't fire - level is " + levelFT;
    textColor = "red";
}
//Process Forecast.op alerts
//Test if alert even exists

if (msg.payload.alerts) {
    currentAlerts = msg.payload.alerts;

    // Convert alert array to a single string

    numAlerts = msg.payload.alerts.length;
    if (numAlerts > 0) {
        alertString =  alertString + " " + numAlerts + " Alerts: ";
       for (i = 0; i < numAlerts; i++) {
        alertString = alertString+ " " +currentAlerts[i].title;
         }
    }
}
// Put message, color, and background into flow contexts for external use
context.flow.alert = alertString;
context.flow.background = bgColor;
context.flow.text = textColor;

// Build and send message
msg.background = bgColor;
msg.color = textColor;
msg.speed = 2;
msg.payload = alertString;
return msg;