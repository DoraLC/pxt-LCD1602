# i2cLCD1602

makecode I2C LCD1602 package for micro:bit  

![](lcd.jpg)

## Basic usage

```
let item = 0
LCD1602.LcdInit(0)
LCD1602.ShowString("Hello", 0, 0)
basic.forever(() => {
    item += 1
    LCD1602.ShowNumber(item, 0, 1)
    basic.pause(1000)
})
```


## I2C Address  
- PCF8574: 39  
- PCF8574A: 63  
- Auto: 0

## API

- LcdInit(Addr: number)  
Initial LCD  
Addr: I2C Address. If Addr is zero, it will try to recognition correctly address automaticly.  

- ShowNumber(n: number, x: number, y: number)  
show a number in LCD at given position.  
n: number will be show  
x: is LCD column position, [0 - 15]  
y: is LCD row position, [0 - 1]  

- ShowString(s: string, x: number, y: number)  
show a string in LCD at given position.  
s: string will be show  
x: is LCD column position, [0 - 15]  
y: is LCD row position, [0 - 1]  

- on()  
turn on/off LCD   

- clear()  
clear LCD content  

- BacklightOn()  
turn on/off LCD backlight  

- shl()
shift left/right screen


## Demo

![](demo.png)

## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  
Modified by DoraLC

## Supported targets

* for PXT/microbit
```
Github:DoraLC/pxt-LCD1602
```