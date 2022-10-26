from machine import Pin
from machine import Timer
from time import sleep_ms
import ubluetooth

ble_msg = ""
is_ble_connected = False

shot_counter = 0

class ESP32_BLE():
    def __init__(self, name):
        self.name = name
        self.ble = ubluetooth.BLE()
        self.ble.active(True)
        self.disconnected()
        self.ble.irq(self.ble_irq)
        self.register()
        self.advertiser()
        
    def connected(self):
        global is_ble_connected
        is_ble_connected = True
        print("Connected")
    
    def disconnected(self):
        global is_ble_connected
        is_ble_connected = False
        print("Disconnected")
        shot_counter = 0
        
    def ble_irq(self, event, data):
        global ble_msg
        
        if event == 1: #IRQ_CENTRAL_CONNECT
            self.connected()
        elif event == 2: #IRQ_CENTRAL_DISCONNECT
            self.advertiser()
            self.disconnected()
        elif event == 3: #IRQ_GATTS_WRITE
            buffer = self.ble.gatts_read(self.tx)
            ble_msg = buffer.decode('UTF-8').strip()
            print(ble_msg)
    
    def register(self):        
        # Nordic UART Service (NUS)
        SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
        SHOT_CHARACTERISTIC_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd'
        TX_UUID = '07c4743f-639c-49ab-9d14-31ca27193ad0'
            
        BLE_NUS = ubluetooth.UUID(SERVICE_UUID)
        BLE_RX = (ubluetooth.UUID(SHOT_CHARACTERISTIC_UUID), ubluetooth.FLAG_NOTIFY)
        BLE_TX = (ubluetooth.UUID(TX_UUID), ubluetooth.FLAG_READ | ubluetooth.FLAG_WRITE)
            
        BLE_UART = (BLE_NUS, (BLE_TX, BLE_RX, ))
        SERVICES = (BLE_UART, )
        ((self.tx, self.rx,), ) = self.ble.gatts_register_services(SERVICES)
    
    def send(self, data):
        self.ble.gatts_notify(0, self.rx, data + '\n')

    def advertiser(self):
        name = bytes(self.name, 'UTF-8')
        adv_data = bytearray('\x02\x01\x02') + bytearray((len(name) + 1, 0x09)) + name
        self.ble.gap_advertise(100, adv_data)
        print(adv_data)
        print("\r\n")
        
ble = ESP32_BLE("Backboard-1")

while True:
    if is_ble_connected:
        #ble.send("Hello")
        #ble.send("Rohit")
        pressed = input()
        shot_counter = shot_counter + 1
        ble.send(str(shot_counter))
    #sleep_ms(1000)
    

