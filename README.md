# react-course-2.0-starter

Projekt startowy na 3-dniowe szkolenie z Reacta. Od 2. dnia piszemy w nim aplikację Weekendly (lista miejsc na weekend): React 19, TypeScript, Tailwind CSS 4 i json-server. Lekcje z 1. dnia są w osobnym repo `react-course-2.0-lessons-starter`.

## Co jest gotowe

- setup: Vite, TypeScript, ESLint, Prettier i Vitest, `src/styles.css` (Tailwind i kolory aplikacji) i `src/App.tsx`, na razie z samym nagłówkiem „Weekendly”,
- backend: `mock_backend/` z 12 przykładowymi miejscami dla json-servera i testów,
- typy `Place` i `PlaceCategory` w `src/models/place.ts`, bo używa ich backend.

Resztę piszemy razem, także wszystkie komponenty.

## Wymagania

Node.js 24 (24.15 lub nowszy) i npm. Z `nvm` wystarczy `nvm install`, wersja jest w `.nvmrc`.

## Start

```sh
npm ci
```

Potrzebne są dwa terminale. W pierwszym backend:

```sh
npm run api
```

W drugim aplikacja:

```sh
npm run dev
```

Aplikacja: http://127.0.0.1:5173/

`npm run api` tworzy `mock_backend/db.json` z 12 miejscami z `mock_backend/seed.ts` i uruchamia json-server na porcie 3001. Vite przekazuje `/api/places` do json-servera. Restart `npm run api` przywraca początkowe 12 miejsc.

## Sprawdzanie

```sh
npm run check
```

Uruchamia Prettiera, ESLinta, TypeScripta i testy. `npm run format` poprawia formatowanie.
