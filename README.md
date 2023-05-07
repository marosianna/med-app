# MedApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Az alkalmazásról

A profil oldalon listázza az összes eddigi foglalást.

Az időpontfoglalásnál listázza a kép alatt a táblázatban dátum szerint növekvő sorrendben a legelső 5 foglalást.
Ezeket lehet módosítani, törölni.

A főoldalt, profil oldalt és az időpontfoglaló oldalt csak bejelentkezett felhasználó érheti el.

## Bugok
- Bejelentkezés után nem mindig dob át a főoldalra, ilyenkor újra meg kell nyomni a bejelentkezés gombot.
- Ha átmegyünk az időpontfoglalás oldalra, egyből betöltődik a fogorvosi rendelés, azonban a hozzá tartozó foglalások nem. Azok csak akkor, ha átmegyünk egy másik rendelésre, és vissza. 

