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

**bug**Bejelentkezésnél nem mindig dob át elsőre a főoldalra, ilyenkor nyomd meg mégegyszer a bejelentkezés gombot.

**bug**Ha új időpontot foglalsz, megjelenik a rendelés képe alatt egy táblázatban az adott foglalás, ott tudod törölni vagy módosítani.
**bug**Amennyiben módosítasz, a dátum betöltéséhez a táblázatban, meg kell nyomni mégegyszer az időpont foglalása gombot.

A profil oldalon listázza az összes eddigi foglalást.

Az időpontfoglalásnál listázza a kép alatt a táblázatban dátum szerint növekvő sorrendben a legelső 5 foglalást.

**bug**Ha egyes rendeléshez még nincs foglalása a usernek, akkor a legutóbb listázott rendeléshez tartozó foglalások jelennek meg a táblázatban.
