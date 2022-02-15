# Nest - Next - 2022

---

## Exploring Ne[s/x]tStack Strategies 
- using a class-based mixin strategy in nest to generate classes from existing classes
- extensive type mapping on the frontend for reusable scaffolding and component manipulation
- Namespace Augmentation in both Nest and Next
  - Nest augments express.d.ts and Next augments next/app

### Nestjs
- Prisma@latest via Postgres
- Quasi-random seeding in the `nest/seeds` directory
  - yarn seed (1 user)
  - yarn clear (all users)
- Apollo Server Express
- Nestjs GraphQL 
  - Essentially TypeGraphQL but better
    - dependency injection built in
    - schema.gql auto-emitted on `yarn dev` -- manually executed with `yarn schema:update`
  - [GraphQL PlayGround](http://localhost:3000/graphql)
- Nestjs Swagger ftw 
  - [Nest Next Swagger](http://localhost:3000/api)
- GraphQL Relay
- Prisma Codegen for Nestjs & Swagger scaffolds
- GraphQL Codegen to pump out DTOs (data transfer objects) 
    - Resolvers, Operations, and TypeDefs generation as well
- serialized/deserialized connection cursors
  - Cursor Based Pagination (Relay Spec)
- Redis global caching
- tests with Jest & Supertest
- Dockerconfigs & Dockerfiles
  - Runs Postgres and Redis locally
  - Runs Postgres, Redis, 