# Nest - Next - 2022

---
# __WARNING:__ __UNDER ACTIVE CONSTRUCTION__
---

### Useful Ubuntu Commands

- check for processes on a targeted port
```git
sudo lsof -t -i:{PORT}
```

- kill a returned process running on a targeted port
```gita
sudo kill -9 {PROCESS}
```

- elevated permissions
```git
sudo -i
```

---
# Nesting

## Run e2e tests in Nest with Jest and Supertest
- Once your database is up (instructions below) and the prisma client is generated, you can run e2e tests from the root of the nest directory

```bash
cd nest && yarn test:e2e
```
- running the above should output something resembling the following

```bash
dopamine_driven@LAPTOP-2IH011V4:~/personal/port/2022/nest$ yarn e2e:test
yarn run v1.22.17
$ jest --config ./test/jest-e2e.json

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        9.322 s
Ran all test suites.
Done in 9.91s.
```

## Getting Started with Postgres, Redis, and Docker
- To spin up docker, have Docker Hub (Docker Desktop) running locally. If using WSL/WSL2, ensure that the settings for Docker are configured accordingly in the desktop GUI
- open your terminal and cd into the nest directory `cd nest`
- run `touch .env` to create a new .env file
- copy the contents of `.env.example` to `.env` and then replace the `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` placeholders values with values of your choosing

```ps
POSTGRES_PORT=5432
POSTGRES_USER=YOUR_USERNAME
POSTGRES_PASSWORD=YOUR_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
POSTGRES_BASE_URL=${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}
POSTGRES_ARGS=connection_limit=10&pg-bouncer=true&schema=public&sslmode=prefer
DATABASE_URL=postgresql://${POSTGRES_BASE_URL}/${POSTGRES_DB}?${POSTGRES_ARGS}
```

- the `POSTGRES_PORT` key is set to a value of `5432` by convention
- these variables are exposed by the `dotenv-cli` package and are used by prisma to establish a connection to your containerized PG instance
- ensure that your docker container is running prior to running any prisma commands or starting the nest app
---
## Starting & Stopping the PostgreSQL & Redis services
- You'll notice a number of `docker-compose*` files in the root of the nest directory. The only one of importance for the task at hand is the `docker-compose.with-redis.yml` file.

### To first Build the Image
- From teh root of the nest directory, run
```bash
yarn docker:postgres:redis:build
```
### To start
- From the root of the nest directory, run
```bash
yarn docker:postgres:redis:up
```
### To stop
- From the root of the nest directory, run
```bash
yarn docker:postgres:redis:down
```

### Linux users
- If you get a "overcommit_memory set to 0" warning in the inspector of your containerized Redis instance, run the following command to assume elevated permissions
```bash
sudo -i
```
- then, after entering your password, run
```bash
echo 'vm.overcommit_memory = 1' >> /etc/sysctl.conf
```

- the whole process should be muy rapido & muy limpia and look something like this

```shell
dopamine_driven@LAPTOP-2IH011V4:~/personal/port/2022/nest$ sudo -i
[sudo] password for dopamine_driven:
root@LAPTOP-2IH011V4:~# echo 'vm.overcommit_memory = 1' >> /etc/sysctl.conf
```
---
## [Node Jose Tools](https://github.com/phish108/node-jose-tools) -- Generating Secrets, JWT Signing Keys, etc
- From your command line, run

```bash
npm install -g node-jose-tools
```

### Generate a Signing Key to support HS512 JWTs (defaults to HS256)
- From your command line, run

```bash
jose newkey -s 256 -t oct -a HS512
```

- if globally installed, it will output a json object similar to the following

```json
{ 
  "kty": "oct", 
  "kid": "AgcJlgnE2SsWZxJMjTxvfMsxuFo9W4IcmQ0mqOxqM1c", 
  "alg": "HS512", 
  "k": "H7di_PQ15NfbDpbzikbd0yONL3j2z2_qs3YPpVTconA" 
}
```

### Generate an Encryption Key to optionaly encrypt JWTs
- From your command line run

```bash
jose newkey -s 256 -t oct -a A256GCM
```

- it will output a json object similar to the following

```json
{
  "kty":"oct",
  "kid":"wrIWpR33b5i_1iSHx4CL1IM4V7xXnZuLr4jgKNuv4YQ",
  "alg":"A256GCM",
  "k":"lI235s31a82mRxRZpdqKjf3P1W-QWcwzuxPv7-W0HeQ"
}
```

### Generate a JWT secret using openssl
- From your command line run

```bash
openssl rand -base64 64
```

- it will output a base64-encoded secret similar to the following

```bash
MOamlLawAekP3lxnZeXbJqFaUGn8dZbrBBBwUQ4ySE6WdJHw2GbC5DzOJupntofpM5fyq1ROBRGbgIgoRkYmDQ==
```

### Populate the root nest .env as follows

```shell
## openssl rand -base64 64
JWT_SECRET=SfjSCeeEeo7dm4gGhyYx5VgnXLQLws8WULQTZads/A4xvDsX1JINvQ01qzZT6hjpIJr/T3/Wud8HrbPaNDJWeQ==
## jose newkey -s 256 -t oct -a HS512
JWT_SIGNING_KEY={"kty":"oct","kid":"Oh2v7auhcfE9jztG3-IN31J20Wfdd81Yuv96nDw6v08","alg":"HS512","k":"N7_jT7Y9OMS4RDf3g1yIu1wr33dvmRS4hDelkFETARI"}
## jose newkey -s 256 -t oct -a A256GCM
JWT_ENCRYPTION_KEY={"kty":"oct","kid":"wrIWpR33b5i_1iSHx4CL1IM4V7xXnZuLr4jgKNuv4YQ","alg":"A256GCM","k":"lI235s31a82mRxRZpdqKjf3P1W-QWcwzuxPv7-W0HeQ"}
```

---
## Windows OS Users -- IMPORTANT
### Repository built out using WSL2 Ubuntu-20.04 (Windows Subsystem Linux OS)

- Windows OS Users: this repository does not have `cross-env` installed. Cross-env is used by prefixing certain scripts with `cross-env`. If you are a windows user and are not using WSL or WSL2 as your coding environment with this repo, you will need to run `yarn add -D cross-env` in both the `nest` and `next` directories (then prefix scripts accordingly)
