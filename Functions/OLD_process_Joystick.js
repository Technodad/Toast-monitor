// Check if the joystick has been pushed,
// then return direction string as payload

//TODO:  
// This code should probably
// be refactored to have the various topics 
// processed by separate nodes

//Decide what kind of message we are getting from Hat

var hatTopic = String(msg.topic);
var now = new Date()
switch (hatTopic) {
    case "joystick":
    // Initialize the defalut message string and get joystick
    var jSw = "";
    var jDir = String(msg.payload.key);

// Default to text and background colors from context unless
// unless overridden in the case statement processing

    var textColor = context.flow.text;
    var bgColor = context.flow.background;

// Process each joystick directtion

    if (msg.payload.state === 0){
        switch (jDir){
        case "ENTER":
            jSw = context.flow.alert;
            break;
        case "UP":
            jSw = String(Math.round((context.hatTemp * 9/5) + 32 ))+ "F " + String(Math.round(context.hatPressure))+ "mB";
            break;
        case "DOWN":
            jSw = now.toLocaleTimeString();
            break;
        default:
            jSw = msg.payload.key;
        }
    }
    break;
    case "environment":
        context.hatTemp = msg.payload.temperature;
        context.hatHumidity = msg.payload.humidity;
        context.hatPressure = msg.payload.pressure;
    break;
    case "motion":
    // something useful here someday
    break;
    default:
}

//Build the mesage for the HAT display and send it
msg.color = textColor;
msg.background = bgColor;
msg.payload = jSw;
return msg;