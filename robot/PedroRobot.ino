/**
 * @file PedroRobot.ino
 * @brief This code permits to listen to requests from the rasp to control the robot.
 *        Currently it can move (forward, backward, left, right), dance and sing
 * @version 0.1
 * @date 2020-02-23
 *
 * @copyright Copyright (c) 2020
 *
 */
#include <MeccaBrain.h>
#include <Pedro.h>

const int c = 261;
const int d = 294;
const int e = 329;
const int f = 349;
const int g = 391;
const int gS = 415;
const int a = 440;
const int aS = 455;
const int b = 466;
const int cH = 523;
const int cSH = 554;
const int dH = 587;
const int dSH = 622;
const int eH = 659;
const int fH = 698;
const int fSH = 740;
const int gH = 784;
const int gSH = 830;
const int aH = 880;

const int buzzerPin = 35;
const int ledPin1 = 12;
const int ledPin2 = 13;

int counter = 0;

#define STEP 10

Pedro pedro(3, 6, 7, 5, 4, 50, 49, 48, 42, 40, 41);
String command;

void beep(int note, int duration)
{
  //Play tone on buzzerPin
  tone(buzzerPin, note, duration);

  //Play different LED depending on value of 'counter'
  if(counter % 2 == 0)
  {
    digitalWrite(ledPin1, HIGH);
    delay(duration);
    digitalWrite(ledPin1, LOW);
  }else
  {
    digitalWrite(ledPin2, HIGH);
    delay(duration);
    digitalWrite(ledPin2, LOW);
  }

  //Stop tone on buzzerPin
  noTone(buzzerPin);

  delay(50);

  //Increment counter
  counter++;
}

void firstSection()
{
  beep(a, 500);
  beep(a, 500);
  beep(a, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 650);

  delay(500);

  beep(eH, 500);
  beep(eH, 500);
  beep(eH, 500);
  beep(fH, 350);
  beep(cH, 150);
  beep(gS, 500);
  beep(f, 350);
  beep(cH, 150);
  beep(a, 650);

  delay(500);
}

void secondSection()
{
  beep(aH, 500);
  beep(a, 300);
  beep(a, 150);
  beep(aH, 500);
  beep(gSH, 325);
  beep(gH, 175);
  beep(fSH, 125);
  beep(fH, 125);
  beep(fSH, 250);

  delay(325);

  beep(aS, 250);
  beep(dSH, 500);
  beep(dH, 325);
  beep(cSH, 175);
  beep(cH, 125);
  beep(b, 125);
  beep(cH, 250);

  delay(350);
}


void setup() {

    Serial.begin(9600);
    Serial.println("[Pedro] Starting the robot ...");
    pinMode(6, OUTPUT);
    pinMode(7, OUTPUT);
    pinMode(3, OUTPUT);
    pinMode(5, OUTPUT);
    pinMode(4, OUTPUT);

    pinMode(50, OUTPUT);
    pinMode(49, OUTPUT);
    pinMode(48, OUTPUT);

    pinMode(42, OUTPUT);
    pinMode(40, OUTPUT);
    pinMode(41, OUTPUT);
    pinMode(buzzerPin, OUTPUT);
    pinMode(ledPin1, OUTPUT);
    pinMode(ledPin2, OUTPUT);

  for (int i = 0; i < 50; i++)
  {
    pedro.communicate(Pedro::HEAD | Pedro::RIGHT_SHOULDER | Pedro::RIGHT_HAND | Pedro::LEFT_SHOULDER | Pedro::LEFT_HAND);
  }
  delay(2000);
  Serial.println("[Pedro] Ready !");
}

void dance() {
  for (int times = 0; times < 3; times++) {
    for (int i=100; i > 0; i = i- STEP) {
      pedro.communicate(Pedro::RIGHT_SHOULDER);
      pedro.setServoPosition(Pedro::RIGHT_SHOULDER, 0, i);
      delay(50);
     }
     for (int i=0; i < 100; i = i+ STEP) {
      pedro.communicate(Pedro::RIGHT_SHOULDER);
      pedro.setServoPosition(Pedro::RIGHT_SHOULDER, 0, i);
      delay(50);
     }
   }
}

void sing() {
  //Play first section
  firstSection();

  //Play second section
  secondSection();

  //Variant 1
  beep(f, 250);
  beep(gS, 500);
  beep(f, 350);
  beep(a, 125);
  beep(cH, 500);
  beep(a, 375);
  beep(cH, 125);
  beep(eH, 650);

  delay(500);

  //Repeat second section
  secondSection();

  //Variant 2
  beep(f, 250);
  beep(gS, 500);
  beep(f, 375);
  beep(cH, 125);
  beep(a, 500);
  beep(f, 375);
  beep(cH, 125);
  beep(a, 650);

  delay(650);

}

void loop() {
  command = "";
  if (Serial.available()) {
    command = Serial.readStringUntil(';');
  }
  if (command == "forward") {
      pedro.move(Pedro::LEFT_WHEEL, 255);
      pedro.move(Pedro::RIGHT_WHEEL, 255);
      Serial.println("[Pedro] Going forward !");
  } else if (command == "backward") {
      pedro.move(Pedro::LEFT_WHEEL, -255);
      pedro.move(Pedro::RIGHT_WHEEL, -255);
      Serial.println("[Pedro] Going backward !");
  } else if (command == "left") {
      pedro.move(Pedro::LEFT_WHEEL, 255);
      pedro.move(Pedro::RIGHT_WHEEL, 0);
      Serial.println("[Pedro] Going left !");
  } else if (command == "right") {
      pedro.move(Pedro::LEFT_WHEEL, 0);
      pedro.move(Pedro::RIGHT_WHEEL, 255);
      Serial.println("[Pedro] Going right !");
  } else if (command == "dance") {
    dance();
    Serial.println("[Pedro] Dancing !");
  } else if (command == "sing") {
    sing();
    Serial.println("[Pedro] Singing !");
  }
  delay(200);
}
