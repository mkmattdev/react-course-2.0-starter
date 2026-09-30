# react-course-2.0-starter

Weekendly (lista miejsc na weekend) – projekt z 3-dniowego szkolenia z Reacta: React 19, TypeScript, Tailwind CSS 4, React Router i json-server.

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

`npm run api` przy każdym starcie wczytuje 12 miejsc z `mock_backend/seed.ts` i uruchamia json-server na porcie 3001.

## Sprawdzanie

```sh
npm run check
```

Prettier, ESLint, TypeScript i testy. `npm run format` poprawia formatowanie.

## Backend

Aplikacja wysyła zapytania na `/api/places`. Vite przekazuje je na `http://127.0.0.1:3001/places` (`server.proxy` w `vite.config.ts`).

| Metoda   | Adres             | Body             | Odpowiedź              |
| -------- | ----------------- | ---------------- | ---------------------- |
| `GET`    | `/api/places`     | –                | `Place[]`              |
| `GET`    | `/api/places/:id` | –                | `Place`                |
| `POST`   | `/api/places`     | `Place` bez `id` | `Place` z nadanym `id` |
| `PATCH`  | `/api/places/:id` | `Place`          | `Place`                |
| `DELETE` | `/api/places/:id` | –                | usunięty `Place`       |

Nieistniejące `id`: `404`.

`Place`:

```json
{
  "id": "dolomites",
  "name": "A morning in the Dolomites",
  "category": "nature",
  "description": "Lace up your walking shoes and follow a mountain trail.",
  "isVisited": false,
  "costPln": 0,
  "addedAt": "2026-01-11"
}
```

`category`: `nature` | `culture` | `food` | `city`
