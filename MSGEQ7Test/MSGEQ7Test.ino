int analogPin = 0; // read from multiplexer using analog input 0
int strobePin = 2; // strobe is attached to digital pin 2
int resetPin = 3; // reset is attached to digital pin 3
int spectrumValue[7]; // to hold a2d values
int microMotorPin = 5; // micro vibration motor is connected with pin number 5 which is the pwm pin. 
int motorData = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(analogPin, INPUT);
  pinMode(strobePin, OUTPUT);
  pinMode(resetPin, OUTPUT);
  pinMode(microMotorPin, OUTPUT);
  analogReference(DEFAULT);

  digitalWrite(resetPin, LOW);
  digitalWrite(strobePin, HIGH);
}

void loop()
{
  digitalWrite(resetPin, HIGH);
  digitalWrite(resetPin, LOW);

  for (int i = 0; i < 7; i++)
  {
    digitalWrite(strobePin, LOW);
    delayMicroseconds(30); // to allow the output to settle
    spectrumValue[i] = analogRead(analogPin);
    motorData = map(spectrumValue[2], 0, 1023, 0, 255);
    
    if (motorData > 25){
      analogWrite(microMotorPin, motorData);
    }
    // comment out/remove the serial stuff to go faster
    // - its just here for show

    Serial.print(" ");
    Serial.print(spectrumValue[i]);

    
    digitalWrite(strobePin, HIGH);
  }
  Serial.println();
}
