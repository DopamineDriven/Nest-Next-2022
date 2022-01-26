FROM node:16 as base

WORKDIR /app

COPY package.json \
.env \
  yarn.lock \
  ./
COPY prisma ./prisma/

RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# lint and formatting configs are commented out
# uncomment to add them into the build process

FROM base AS dev
COPY nest-cli.json \
  tsconfig.* \
#  .eslintrc.json \
#  .prettierrc.yaml \
  ./


# bring in src from context
COPY ./src/ ./src/

# bring in prisma from context
COPY ./prisma/ ./prisma/

# run yarn
RUN yarn

# generate prisma client before building
RUN yarn prisma:generate && yarn nest build

# use one of the smallest images possible
FROM node:16-alpine

# get package.json from base
COPY --from=BASE /app/package.json ./

# expose environmental variables to the container
COPY --from=BASE /app/.env ./

# get the dist
COPY --from=DEV /app/dist/ ./dist/

# get prisma contents  
COPY --from=DEV /app/prisma/ ./prisma/

# get node_modules from the intial cache
COPY --from=BASE /app/node_modules/ ./node_modules/

# expose application port
EXPOSE 3000

# start
CMD ["yarn", "start:prod"]
