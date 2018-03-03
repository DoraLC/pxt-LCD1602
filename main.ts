
/**
 * makecode I2C LCD1602 package for microbit.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="□"
namespace I2C_LCD1602 {

    let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data

    // set LCD reg
    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    /**
     * initia LCD, set I2C address.
     * @param Addr, default is 63 (PCF8574A). eg: 63
     */
    //% block
    export function LcdInit(Addr: number) {
        i2cAddr = Addr
        BK = 8
        RS = 0
        cmd(0x33)       // set 4bit mode
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)       // set mode
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear
    }

    /**
     * show a number in LCD
     * @param n, number will be show, eg: 1
     * @param x, LCD column position, eg: 0
     * @param y, LCD row position, eg: 0
     */
    //% block
    export function ShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        ShowString(s, x, y)
    }

    /**
     * show a string in LCD
     * @param s, string will be show, eg: ''Hello''
     * @param x, LCD column position, [0 - 15], eg: 0
     * @param y, LCD row position, [0 - 1], eg: 0
     */
    //% block
    export function ShowString(s: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    /**
     * turn on LCD
     */
    //% block
    export function LcdOn(): void {
        cmd(0x0C)
    }

    /**
     * turn off LCD
     */
    //% block
    export function LcdOff(): void {
        cmd(0x08)
    }

    /**
     * clear all display content
     */
    //% block
    export function LcdClear(): void {
        cmd(0x01)
    }

    /**
     * turn on LCD backlight
     */
    //% block
    export function BacklightOn(): void {
        BK = 8
        dat(0)
    }

    /**
     * turn off LCD backlight
     */
    //% block
    export function BacklightOff(): void {
        BK = 0
        dat(0)
    }

}
