# Getting Started

I'm using npm and node version:

```
frontend-test-edvance % npm -v
11.6.2
frontend-test-edvance % node -v
v25.2.1
```

`Please use the same npm and node version to install etc.`

`cd` to root app directory and run:

```
npm install
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Folder management

1. api is in `app/api.ts`
2. UI components are in `components` folder
3. Tyescript models are in `models` folder
4. hooks are in `hooks` folder
5. we have 2 pages:
   - `/` root page for homepage, with infinite scroll capability and also is responsive towards XS - XL screen sizes.
   - `/movie/[id]` for particular movie
6. I use MUI for the UI library and TailwindCSS.

# Unit Testing

The unit testing files are in:

1. `hooks/useScrollListener.test.jsx` - for useScrollListener (to listen to scrolling to the bottom of window)
2. `components/MovieSortDropdown.test.jsx`- for MovieSortDropdown (to change sorting dropdown)
3. `components/MovieCardContainer.test.jsx`- for onClick action (make sure onClick works.)

To run the test script, run:

```
npm run test

EXPECTED OUTPUT:
frontend-test-edvance % npm run test

> my-app@0.1.0 test
> jest

 PASS  components/MovieSortDropdown.test.jsx
 PASS  components/MovieCardContainer.test.jsx
 PASS  hooks/useScrollListener.test.jsx
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |
 components        |     100 |      100 |     100 |     100 |
  ...Container.tsx |     100 |      100 |     100 |     100 |
  ...tDropdown.tsx |     100 |      100 |     100 |     100 |
 hooks             |     100 |      100 |     100 |     100 |
  ...llListener.ts |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.736 s
Ran all test suites.
```

# Unimplemented

Below are not implemented:

1. Context API - I used useStates in favour of this, because adding Context API seems to be adding unnecessary complexity for this level.
2. Book now - I'm not sure what kind of CSS effect is expected.

# env variable

Please put your API key in for `TMDB` in `.env` at the root of directory as:

```
API_KEY=...
```
