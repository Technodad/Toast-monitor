//Code for function node "Process Env"
//
// This function process "environment" topics from 
// the HAT, calculates any calibration offsets to reflect 
// actual values and updates the flow-specific
//  context variables for use in other flows
// 
msgTopic = String(msg.topic)
//Store calibration point or environment variables depending on topic
switch (msgTopic){
    case "calibration":
        // Save CPU temp for future offeet calculation
        context.tempOffset = msg.payload;
        break;
    case "environment":
        var rawTemp = msg.payload.temperature
        context.flow.hatTemp = rawTemp - ((context.tempOffset - rawTemp)/2);
        context.flow.hatHumidity = msg.payload.humidity;
        context.flow.hatPressure = msg.payload.pressure;
        break;
}

return msg;