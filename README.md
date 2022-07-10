# Intercourse API

## Short Description

This repo was an excercise... an excercise of:
- using TypeScript in real life project...
- trying to write a code that might be re-usable between `Express`, `Polka` and `Koa`
- finding funny usages for HTTP codes...


## Why was it created?

I faced too many "slip of a tongue" moments while working with male co-developers.

So many times some of us accidentally mentioned "the stapon endpoint" (instead on "bootstrap"... don't ask we why... we're Poles).

So many time I've seen chat messages like `curl -X GET /higheels/on` or `PUT /lipstick/on`

...that's why I eventually decided to put such an API to life...


## Running locally

You need to have Node@^16 and NPM@^8 installed.

1. clone the repository
2. install dependencies (run `npm install` or `yarn install` or `bun install` command)
3. run one of the `dev:*` scripts from `package.json` file


## Using as an easter-egg in your project

Middleware for `Express`, `Polka` and `Koa` are available in the `src/middleware` folder.

Examples of usage are shown in simple apps in `src/app` folder


## Some examples

<details>
<summary>Getting toys</summary>

**REQUEST:**
```
# GET http://localhost:1234/handcuffs
```

**RESPONSE:**
```
{"status":200,"message":"OK"}
```
</details>

<details>
<summary>Using toys</summary>

**REQUEST:**
```
# PUT http://localhost:1234/highheels/on
```

**RESPONSE:**
```
{"status":202,"message":"Accepted"}
```
</details>

<details>
<summary>People</summary>

**REQUEST:**
```
# GET http://localhost:1234/teenager
```

**RESPONSE:**
```
{"status":451,"message":"Unavailable For Legal Reasons"}  
```

**REQUEST:**
```
# GET http://localhost:1234/escort
```

**RESPONSE:**
```
{"status":402,"message":"Payment Required"}  
```

**REQUEST:**
```
# POST http://localhost:1234/orgy
```

**RESPONSE:**
```
{"status":429,"message":"Too Many Requests"}
```
</details>

<details>
<summary>Interactions</summary>

**REQUEST:**
```
# PUT http://localhost:1234/tongue/into/ear
```

**RESPONSE:**
```
{"status":502,"message":"Bad Gateway"} 
```

**REQUEST:**
```
# PUT http://localhost:1234/dick/into/ass
```

**RESPONSE:**
```
{"status":401,"message":"Unauthorized without ?condom"}
```
</details>


## Postman collection

Here's an example [Postman Collection](./intercourse-api.postman_collection.json)