# base path trailing slash pro

## reverse proxy

Run the following command to run a caddy server with correct sub paths

```sh
caddy run --config ./Caddyfile
```

layout in the `Caddyfile`

- `http://localhost:3000/...` --> `localhost:5173/...`
- `http://localhost:3000/somepath/...` --> `localhost:5174/...`
- `http://localhost:3000/otherpath/...` --> `localhost:5175/...`

## Setup sample app

```sh
pnpm i
```

```sh
pnpm run build
```

The following works, if sveltekit redirects due to forced trailing slash, the urls such as `http://localhost:3000/somepath/sverdle` redirects to `http://localhost:3000/sverdle/` instead of `http://localhost:3000/somepath/sverdle/`

```sh
PORT=5173 node ./build
PORT=5174 node ./build
PORT=5175 node ./build
```

Fixing this can be done by setting `ORIGIN` in the env vars.

```sh
ORIGIN="http://localhost:3000" PORT=5173 node ./build
ORIGIN="http://localhost:3000/somepath" PORT=5174 node ./build
ORIGIN="http://localhost:3000/otherpath" PORT=5175 node ./build
```

Notice [http://localhost:3000/somepath/sverdle](http://localhost:3000/somepath/sverdle) now redirects correctly to `http://localhost:3000/somepath/sverdle/` instead of `http://localhost:3000/sverdle/`, but if you now look in the browser network tab you will see assets loaded from `/_app/...` instead of `/somepath/_app/...`.
