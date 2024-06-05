// esp8266_mqtt_client.ino
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

int led_state = 1;
long last_send_time = 0;
char publish_msg[16];

const char* WIFI_SSID = "wifi 이름";
const char* WIFI_PW = "wifi 비밀번호";
const char* MQTT_BROKER_ADDR = "브로커 IP";
const int   MQTT_BROKER_PORT = 1883;
//const char* MQTT_ID = "당신의 MQTT Broker ID"; // optional
//const char* MQTT_PW = "당신의 MQTT Broker Password";  // optional

WiFiClient wifi_client;
PubSubClient mqtt_client(wifi_client);

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, led_state);
  
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PW);
  Serial.print("WiFi Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
  Serial.printf("MAC address = %s\n", WiFi.softAPmacAddress().c_str());
  
  // setup MQTT Client
  mqtt_client.setServer(MQTT_BROKER_ADDR, MQTT_BROKER_PORT);
  mqtt_client.setCallback(mqtt_callback);
}

void mqtt_callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if (int(payload[length -3] - '0')) {
    led_state = 1;
    digitalWrite(LED_BUILTIN, led_state);
  } else {
    led_state = 0;
    digitalWrite(LED_BUILTIN, led_state);
  }
  last_send_time = millis();
  sprintf(publish_msg, "%d", led_state);
  mqtt_client.publish("esp8266_test/led/state", publish_msg);
}

void establish_mqtt_connection() {
  if (mqtt_client.connected()) 
    return;
    
  while (!mqtt_client.connected()) {
    Serial.println("Try to connect MQTT Broker");
    if (mqtt_client.connect("ESP8266_Client")) {
      Serial.println("Connected");
      mqtt_client.subscribe("esp8266_test/led/command");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqtt_client.state());
      delay(2000);
    }
  }
}

void loop() {
  establish_mqtt_connection();
  mqtt_client.loop();
  
  long current = millis();
  if (current - last_send_time > 1000) {
    last_send_time = current;
    sprintf(publish_msg, "%d", led_state);
    mqtt_client.publish("esp8266_test/led/state", publish_msg);
  }
}