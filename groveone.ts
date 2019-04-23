/*****************************************************************************
* | Description :	Chaihuo Grove One extension for micro:bit
* | Developer   :   CH Makered
* | More Info   :	http://chmakered.com/
******************************************************************************/
enum GrovePin {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P12"
    P12 = DigitalPin.P12,
    //% block="P16"
    P16 = DigitalPin.P16
}

enum GroveAnalogPin {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}

enum DistanceUnit {
    //% block="cm"
    cm,
    //% block="inch"
    inch
}

/**
 * Provides access to CHMakerEd Grove One blocks for pxt-microbit
 */
//% color=190 icon="\uf126" block= "GroveOne"
//% groups="['Sensor', 'Motor', 'Display']"
namespace GroveOne {

    /**
    * Get the distance from Grove-Ultrasonic Sensor
    */
    //% blockId=measureInCentimeters
    //% block="Ultrasonic Sensor $groveport|: distance in $Unit"
    //% group="Sensor"
    //% weight=100
    export function measureInCentimeters(groveport: GrovePin, Unit: DistanceUnit): number {
        let duration = 0;
        let distance = 0;
        let distanceBackup = 0;
        let port: number = groveport;

        pins.digitalWritePin(<DigitalPin>port, 0);
        control.waitMicros(2);
        pins.digitalWritePin(<DigitalPin>port, 1);
        control.waitMicros(10);
        pins.digitalWritePin(<DigitalPin>port, 0);

        duration = pins.pulseIn(<DigitalPin>port, PulseValue.High, 50000);

        if (Unit == DistanceUnit.cm) distance = duration * 153 / 58 / 100;
        else distance = duration * 153 / 148 / 100;

        if (distance > 0) distanceBackup = distance;
        else distance = distanceBackup;
        basic.pause(50);

        return distance;
    }

    /**
    * Set the speed of mini fan
    */
    //% blockId=minifan
    //% block="Mini Fan$analogport|: set speed to $speed"
    //% speed.min=0 speed.max=100
    //% speed.defl=50
    //% group="Motor"
    export function minifan(analogport: GroveAnalogPin, speed: number) {
        let port: number = analogport;
        pins.analogWritePin(<AnalogPin>port, pins.map(speed, 0, 100, 0, 1023));
    }

    /**
    * Turn on or off the mini fan motor
    */
    //% blockId=minifanOnOff
    //% block="Mini Fan$groveport|: turn $on"
    //% on.shadow="toggleOnOff"
    //% on.defl="true"
    //% group="Motor"
    export function minifanOnOff(groveport: GrovePin, on: boolean) {
        let port: number = groveport;
        if (on) {
            pins.digitalWritePin(<DigitalPin>port, 1);
        } else {
            pins.digitalWritePin(<DigitalPin>port, 0);
        }
    }

    /**
    * Set the servo angle
    */
    //% blockId=servo
    //% block="Servo$analogport|: set angle to $angle|°"
    //% angle.min=0 angle.max=180
    //% angle.defl=90
    //% group="Motor"
    export function servo(analogport: GroveAnalogPin, angle: number) {
        let port: number = analogport;
        pins.servoWritePin(<AnalogPin>port, pins.map(angle, 0, 180, 10, 180));
    }
}