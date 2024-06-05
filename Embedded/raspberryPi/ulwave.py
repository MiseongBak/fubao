# -*- coding: utf-8 -*-

from gpiozero import DistanceSensor
import time
import paho.mqtt.client as mqtt

TRIGGER = 24
ECHO = 23

sensor = DistanceSensor(echo=ECHO, trigger=TRIGGER)

mqtt_broker = "브로커 IP"
mqtt_port = 1883
mqtt_topic = "토픽"

led_state = False

def send_message(client, msg):
    client.connect(mqtt_broker, mqtt_port)
    client.publish(mqtt_topic, msg)
    client.disconnect()

try:
    client = mqtt.Client() 

    while True:
        distance_cm = sensor.distance * 100
        distance_inch = distance_cm / 2.54

        print(f"Distance: {distance_cm:.2f} cm")

        if distance_cm < 15:
            if led_state:
                send_message(client, "0FF")
                led_state = False
            else:
                send_message(client, "0N")
                led_state = True

            print("Object detected!")
            time.sleep(1)

        time.sleep(0.1)

except KeyboardInterrupt:
    pass

finally:
    sensor.close()
