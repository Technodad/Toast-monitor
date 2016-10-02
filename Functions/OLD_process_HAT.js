//Code for function node "Process Joystick"
//
// Check if the joystick has been pushed,
// then return direction string as payload
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
        // Enter shows last alert
            jSw = context.flow.alert;
            break;
        case "UP":
        // Up shows local temp and pressure
            jSw = String(Math.round((context.hatTemp * 9/5) + 32 ))+ "F " + String(Math.round(context.hatPressure))+ "mB";
            break;
        case "DOWN":
        // Down shows local time
            jSw = now.toLocaleTimeString();
            break;
        default:
            jSw = msg.payload.key;
        }
    }

//Build the mesage for the HAT display and send it
msg.color = textColor;
msg.background = bgColor;
msg.payload = jSw;
return msg;