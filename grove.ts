/*****************************************************************************
* | Description :	Chaihuo Grove extension for micro:bit
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
 * Provides access to CHMakerEd Grove blocks for pxt-microbit
 */
//% color=190 icon="\uf126" block= "Grove"
//% groups="['Sensor', 'Motor', 'Display']"
namespace Grove {
    /**
    * Set the speed of mini fan, the speed is between 0 to 100
    */
    //% blockId=grove_minifan
    //% block="Mini Fan$analogport|: set speed to $speed \\%"
    //% speed.min=0 speed.max=100
    //% speed.defl=50
    //% group="Motor"
    //% weight=100
    export function grove_minifan(analogport: GroveAnalogPin, speed: number) {
        let port: number = analogport;
        pins.analogWritePin(<AnalogPin>port, pins.map(speed, 0, 100, 0, 1023));
    }

    /**
    * Turn on or off the mini fan motor
    */
    //% blockId=grove_minifanOnOff
    //% block="Mini Fan$groveport|: turn $on"
    //% on.shadow="toggleOnOff"
    //% on.defl="true"
    //% group="Motor"
    //% weight=100
    export function grove_minifanOnOff(groveport: GrovePin, on: boolean) {
        let port: number = groveport;
        if (on) {
            pins.digitalWritePin(<DigitalPin>port, 1);
        } else {
            pins.digitalWritePin(<DigitalPin>port, 0);
        }
    }

    /**
    * Set the servo angle, the angle is between 0 to 180°
    */
    //% blockId=grove_servo
    //% block="Servo$analogport|: set angle to $angle|°"
    //% angle.min=0 angle.max=180
    //% angle.defl=90
    //% group="Motor"
    //% weight=99
    export function grove_servo(analogport: GroveAnalogPin, angle: number) {
        let port: number = analogport;
        pins.servoWritePin(<AnalogPin>port, pins.map(angle, 0, 180, 10, 180));
    }
    
    /**
    * Read the sound sensor value at specified Grove port, the value is between 0 to 1023
    */
    //% blockId=grove_soundsensor
    //% block="Sound Sensor $analogport|: value"
    //% group="Sensor"
    //% weight=80
    export function grove_soundsensor(analogport: GroveAnalogPin): number {
        let port: number = analogport;
        // amplify the raw data with index value
        let index: number = 1;
        let sample: number = 50;
        let interval: number = 2;
        let max_data: number =0;
        let raw_data: number =0;

        for (let i = 0; i < sample; i++) {
            raw_data = 1023 - pins.analogReadPin(<AnalogPin>port);
            if (raw_data >= max_data) {
                max_data = raw_data;
            }
            control.waitMicros(interval);
        }

        max_data = Math.round(max_data*index);
        max_data = Math.constrain(max_data, 0, 1023);

        return max_data;
    }

    /**
    * Read the loudness sensor value at specified Grove port, the value is between 0 to 1023
    */
    //% blockId=grove_loudnesssensor
    //% block="Loudness Sensor $analogport|: value"
    //% group="Sensor"
    //% weight=79
    export function grove_loudnesssensor(analogport: GroveAnalogPin): number {
        let port: number = analogport;
        let result: number =0;

        for (let i = 0; i < 32; i++) {
            result += pins.analogReadPin(<AnalogPin>port)
        }
        result /= 32;

        return result;
    }

    /**
    * Get the distance from Grove-Ultrasonic Sensor, the measuring range is between 2-350cm
    */
    //% blockId=grove_ultrasonic
    //% block="Ultrasonic Sensor $groveport|: distance in $Unit"
    //% group="Sensor"
    //% weight=78
    export function grove_ultrasonic(groveport: GrovePin, Unit: DistanceUnit): number {
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
}