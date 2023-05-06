# MedApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Az alkalmazásról

A profil oldalon listázza az összes eddigi foglalást.
**bug** Ha átmegyünk az időpontfoglalás oldalra, egyből betöltődik a fogorvosi rendelés, azonban a hozzá tartozó foglalások nem. Azok csak akkor, ha átmegyünk egy másik rendelésre, és vissza. 

Az időpontfoglalásnál listázza a kép alatt a táblázatban dátum szerint növekvő sorrendben a legelső 5 foglalást.
Ezeket lehet módosítani, törölni.

A főoldalt, profil oldalt és az időpontfoglaló oldalt csak bejelentkezett felhasználó érheti el.

**bug** Bejelentkezés után nem mindig dob át a főoldalra, ilyenkor újra meg kell nyomni a bejelentkezés gombot.

