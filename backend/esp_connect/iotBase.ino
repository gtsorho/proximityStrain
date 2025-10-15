// #include <ESP8266WiFi.h>
// #include <ArduinoJson.h>

// const char *ssid = "Twood";
// const char *password = "numlock11";

// const int trigPin = D1;
// const int echoPin = D2;
// const int fixedDistance = 130; // Fixed distance in centimeters

// WiFiClient client;

// void setup() {
//   Serial.begin(115200);
//   pinMode(trigPin, OUTPUT);
//   pinMode(echoPin, INPUT);

//   // Connect to WiFi
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }
//   Serial.println("Connected to WiFi");
// }

// void loop() {
//   int measurements[3];

//   // Take three consecutive measurements
//   for (int i = 0; i < 3; i++) {
//     measurements[i] = measureDistance();
//     delay(1000); // Delay between measurements
//   }

//   // Check if all three measurements are the same
//   if (measurements[0] == measurements[1] && measurements[1] == measurements[2]) {
//     Serial.print("Verified Distance: ");
//     Serial.print(measurements[0]);
//     Serial.println(" cm");

//     // Calculate percentage based on fixed distance
//     float percentage = ((float)measurements[0] / fixedDistance) * 100;

//     Serial.print("Percentage: ");
//     Serial.print(percentage);
//     Serial.println("%");

//     // Send the verified distance and percentage data to the server
//     sendDataToServer(measurements[0], percentage);
//   } else {
//     Serial.println("Measurements not consistent. Discarding data.");
//   }

//   delay(5000); // Delay before starting the next set of measurements
// }

// int measureDistance() {
//   long duration;

//   // Trigger the ultrasonic sensor
//   digitalWrite(trigPin, LOW);
//   delayMicroseconds(2);
//   digitalWrite(trigPin, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(trigPin, LOW);

//   // Measure the echo duration
//   duration = pulseIn(echoPin, HIGH);

//   // Calculate distance in centimeters
//   return duration * 0.0343 / 2;
// }

// void sendDataToServer(int distance, float percentage) {
//   // Connect to the server
//   if (client.connect("bin.greatergraceag.com", 80)) {
//     // Form the HTTP POST request

    
//     DynamicJsonDocument doc(200);
//     doc["distance"] = distance;
//     doc["level"] = percentage;
  
//     // Serialize the JSON object to a string
//     String jsonString;
//     serializeJson(doc, jsonString);

  
//     String postData = jsonString;
//     client.println("POST /api/clients/2/levelChange HTTP/1.1");
//     client.println("Host: bin.greatergraceag.com");
//     client.println("Connection: close");
//     client.println("Content-Type: application/json");
//     client.print("Content-Length: ");
//     client.println(postData.length());
//     client.println();
//     client.println(postData);
//     client.println();
//     delay(10);

//     // Read and print the server response
//     while (client.available()) {
//       char c = client.read();
//       Serial.print(c);
//     }

//     client.stop();
//     Serial.println("Data sent to server");
//   } else {
//     Serial.println("Unable to connect to server");
//   }
// }