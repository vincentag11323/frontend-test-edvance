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

1. `hooks/useScrollListener.test.jsx`
2.

To run the test:

```
npm run test
```

# Unimplemented

Below are not implemented:

1. Context API - I used useStates in favour of this, because adding Context API seems to be adding unnecessary complexity for this level.
