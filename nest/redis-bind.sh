docker run -p 6379:6379 -d                  \
    -v ../../Docker/$PWD/redis-data:/bitnami/redis/data  \
    --name redis_cont                       \
    bitnami/redis:latest # <-- Redis image
