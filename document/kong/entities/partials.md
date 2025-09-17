# [Partials](https://developer.konghq.com/gateway/entities/partial/)

## What is a Partial?

Kong Gateway의 일부 엔티티는 일반적인 구성 설정을 공유하므로 반복해야 하는 경우가 많습니다. 예를 들어, Redis에 연결되는 여러 플러그인에 동일한 연결 설정이 필요할 수 있습니다. 부분적인 설정이 없으면 모든 플러그인에서 이 구성을 복제해야 합니다. 설정이 변경되면 각 플러그인을 개별적으로 업데이트해야 합니다.

Partial은 공유 구성을 여러 플러그인에 연결할 수 있는 재사용 가능한 엔티티로 추출할 수 있도록 하여 이 문제를 해결합니다. 검증과 일관성을 보장하기 위해 Partial은 정의된 유형을 가지고 있습니다.

Kong Gateway는 다음과 같은 유형의 Partials, `redis-ce` 및 `redis-ee`를 지원합니다. `redis-ce`는 더 짧고 간단한 구성을 가지고 있는 반면, `redis-ee`는 Redis Sentinel 또는 Redis Cluster 연결을 구성하는 옵션을 제공합니다. Partials를 지원하는 각 플러그인은 이러한 유형 중 하나만 지원합니다.

## Partial Schema

Partial 엔티티의 전체 스키마는 다음과 같습니다:

| 필드명   | 타입   | 필수 여부 | 기본값 | 설명                                            |
| -------- | ------ | --------- | ------ | ----------------------------------------------- |
| `id`     | string | 아니오    | -      | Partial의 고유 ID (자동 생성)                   |
| `name`   | string | 예        | -      | Partial의 고유한 이름                           |
| `type`   | string | 예        | -      | Partial의 유형 (`redis-ce`, `redis-ee`)         |
| `config` | object | 예        | -      | Partial의 구성 설정 (type에 따라 내용이 달라짐) |
| `tags`   | array  | 아니오    | -      | Partial 태그                                    |

## Partial Types

### redis-ce Type

`redis-ce` 타입은 간단한 Redis 연결 설정을 제공합니다.

| 필드명 | 타입   | 필수 여부 | 기본값 | 설명                   |
| ------ | ------ | --------- | ------ | ---------------------- |
| `host` | string | 예        | -      | Redis 서버의 호스트명  |
| `port` | number | 예        | -      | Redis 서버의 포트 번호 |

### redis-ee Type

`redis-ee` 타입은 Redis Sentinel 또는 Redis Cluster 연결을 위한 고급 설정을 제공합니다.

| 필드명      | 타입   | 필수 여부 | 기본값 | 설명                           |
| ----------- | ------ | --------- | ------ | ------------------------------ |
| `host`      | string | 예        | -      | Redis 서버의 호스트명          |
| `port`      | number | 예        | -      | Redis 서버의 포트 번호         |
| `password`  | string | 아니오    | -      | Redis 인증 비밀번호            |
| `database`  | number | 아니오    | `0`    | Redis 데이터베이스 번호 (0-15) |
| `timeout`   | number | 아니오    | `1000` | 연결 타임아웃 (밀리초)         |
| `keepalive` | number | 아니오    | `0`    | Keep-alive 시간 (초)           |
| `sentinel`  | object | 아니오    | -      | Redis Sentinel 설정            |
| `cluster`   | object | 아니오    | -      | Redis Cluster 설정             |

#### Sentinel Configuration Schema

| 필드명        | 타입   | 필수 여부 | 기본값  | 설명                                |
| ------------- | ------ | --------- | ------- | ----------------------------------- |
| `hosts`       | array  | 예        | -       | Sentinel 노드들의 호스트명 배열     |
| `port`        | number | 아니오    | `26379` | Sentinel 노드들의 포트 번호         |
| `master_name` | string | 아니오    | -       | Sentinel에서 모니터링할 마스터 이름 |
| `password`    | string | 아니오    | -       | Sentinel 인증 비밀번호              |
| `timeout`     | number | 아니오    | `1000`  | Sentinel 연결 타임아웃 (밀리초)     |

#### Cluster Configuration Schema

| 필드명     | 타입   | 필수 여부 | 기본값 | 설명                           |
| ---------- | ------ | --------- | ------ | ------------------------------ |
| `nodes`    | array  | 예        | -      | Cluster 노드들의 호스트명 배열 |
| `port`     | number | 아니오    | `6379` | Cluster 노드들의 포트 번호     |
| `password` | string | 아니오    | -      | Cluster 인증 비밀번호          |
| `timeout`  | number | 아니오    | `1000` | Cluster 연결 타임아웃 (밀리초) |

## Configuration Examples

### 기본 redis-ce Partial 설정

```json
{
  "name": "simple-redis",
  "type": "redis-ce",
  "config": {
    "host": "localhost",
    "port": 6379
  }
}
```

### redis-ee 기본 설정

```json
{
  "name": "advanced-redis",
  "type": "redis-ee",
  "config": {
    "host": "redis.example.com",
    "port": 6379,
    "password": "secretpassword",
    "database": 0,
    "timeout": 5000,
    "keepalive": 60
  }
}
```

### Redis Sentinel 설정

```json
{
  "name": "redis-sentinel",
  "type": "redis-ee",
  "config": {
    "host": "localhost",
    "port": 6379,
    "password": "secretpassword",
    "sentinel": {
      "hosts": [
        "sentinel1.example.com",
        "sentinel2.example.com",
        "sentinel3.example.com"
      ],
      "port": 26379,
      "master_name": "mymaster",
      "password": "sentinelsecret",
      "timeout": 2000
    }
  }
}
```

### Redis Cluster 설정

```json
{
  "name": "redis-cluster",
  "type": "redis-ee",
  "config": {
    "host": "localhost",
    "port": 6379,
    "password": "secretpassword",
    "cluster": {
      "nodes": [
        "cluster-node1.example.com",
        "cluster-node2.example.com",
        "cluster-node3.example.com"
      ],
      "port": 6379,
      "password": "clustersecret",
      "timeout": 3000
    }
  }
}
```

### API를 통한 Partial 관리

```bash
# Partial 생성
curl -X POST http://localhost:8001/partials \
  --data "name=my-redis-config" \
  --data "type=redis-ee" \
  --data "config[host]=localhost" \
  --data "config[port]=6379" \
  --data "config[password]=secret"

# Partial 목록 조회
curl http://localhost:8001/partials

# 특정 Partial 조회
curl http://localhost:8001/partials/my-redis-config

# Partial 업데이트
curl -X PATCH http://localhost:8001/partials/my-redis-config \
  --data "config[password]=newsecret"

# Partial 삭제
curl -X DELETE http://localhost:8001/partials/my-redis-config
```

## Set up a Partial

다음은 **my-redis-config**라는 새로운 Partial을 생성합니다:

1. Gateway instance로 이동:
   - Konnect에서, 사이드 바에서 **API Gateway**를 열고, control plane 고릅니다.
   - Kong Manager에서, Workspace를 선택합니다.
2. **Redis Configurations**로 이동.
3. **New configuration** 클릭.
4. **Redis type**을 선택합니다. `Host/Port (Enterprise)`.
5. **Name** `my-redis-config`라고 입력합니다.
6. **Host** `host.docker.internal`라고 입력하고 **Port** `6379`라고 입력합니다.
7. **Save** 클릭합니다.

## Use Partials

다음의 예시가 어떻게 플러그인과 함께 Partial을 사용하는지 설명합니다.

### Add a Partial to a plugin

플러그인에서 Partial를 사용하려면 `partials.id` 파라미터를 구성해야 합니다.

#### Kong Manager를 통한 설정

1. Gateway instance로 이동:
   - Konnect에서, 사이드 바에서 **API Gateway**를 열고, control plane 고릅니다.
   - Kong Manager에서, Workspace를 선택합니다.
2. **Plugins**을 선택합니다.
3. **New Plugin**를 클릭하고 plugin을 선택합니다.
4. plugin을 위한 범위를 선택합니다:
   - **Global**, Workspace(Kong Manager) 또는 Control plane(Gateway Manager)의 모든 Gateway Service, Route, Consumers 및 Consumer Groups에 플러그인을 적용합니다
   - **Scoped**, 플러그인을 적용 시킬 특정 Gateway Service, Route, Consumer나 Consumer Groups을 선택합니다. 여기에서 사용할 수 있는 엔티티 유형은 선택한 플러그인에 따라 다릅니다.
5. 플러그인을 구성합니다. 구성 옵션은 선택한 플러그인에 따라 달라집니다.
6. **Save**를 클릭합니다.

#### API를 통한 설정

```bash
# 플러그인에 Partial 연결
curl -X POST http://localhost:8001/plugins \
  --data "name=rate-limiting" \
  --data "config.policy=redis" \
  --data "partials[0][id]=my-redis-config"
```

#### 플러그인 설정 예시

```json
{
  "name": "rate-limiting",
  "config": {
    "policy": "redis",
    "redis_host": "localhost",
    "redis_port": 6379,
    "redis_password": "secret"
  },
  "partials": [
    {
      "id": "my-redis-config"
    }
  ]
}
```

### Partial을 사용하는 플러그인들

다음 플러그인들이 Partial을 지원합니다:

| 플러그인명               | 지원하는 Partial 타입  | 설명                              |
| ------------------------ | ---------------------- | --------------------------------- |
| `rate-limiting`          | `redis-ce`, `redis-ee` | Rate limiting 정책을 Redis에 저장 |
| `rate-limiting-advanced` | `redis-ce`, `redis-ee` | 고급 rate limiting 기능           |
| `proxy-cache`            | `redis-ce`, `redis-ee` | 응답 캐싱을 Redis에 저장          |
| `session`                | `redis-ce`, `redis-ee` | 세션 데이터를 Redis에 저장        |
| `oauth2`                 | `redis-ce`, `redis-ee` | OAuth2 토큰을 Redis에 저장        |

### Remove a Partial from a plugin

Partial을 제거하려면 `partials` 매개변수를 제거합니다. 플러그인 구성에서 해당 요소를 직접 구성해야 합니다:

1. Gateway instance로 이동:
   - Konnect에서, 사이드 바에서 **API Gateway**를 열고, control plane 고릅니다.
   - Kong Manager에서, Workspace를 선택합니다.
2. **Plugins**을 선택합니다.
3. **New Plugin**를 클릭하고 plugin을 선택합니다.
4. plugin을 위한 범위를 선택합니다:
   - **Global**, Workspace(Kong Manager) 또는 Control plane(Gateway Manager)의 모든 Gateway Service, Route, Consumers 및 Consumer Groups에 플러그인을 적용합니다
   - **Scoped**, 플러그인을 적용 시킬 특정 Gateway Service, Route, Consumer나 Consumer Groups을 선택합니다. 여기에서 사용할 수 있는 엔티티 유형은 선택한 플러그인에 따라 다릅니다.
5. 플러그인을 구성합니다. 구성 옵션은 선택한 플러그인에 따라 달라집니다.
6. **Save**를 클릭합니다.

### Enable Partials support in custom plugins

플러그인 스키마를 조정하여 사용자 지정 플러그인의 Partial 기능을 활용할 수 있습니다. 사용자 지정 플러그인을 Partial과 호환되도록 하려면 스키마에 `supported_partials` 키를 추가하고 적절한 Partial 유형을 지정하세요.

Partial를 사용한 사용자 지정 플러그인 스키마 예제입니다

```
{
  name = "custom-plugin-with-redis",
  supported_partials = {
    ["redis-ee"] = { "config.redis" },
  },
  fields = {
    {
      config = {
        type = "record",
        fields = {
          { some_other_config_key = { type = "string", required = true }},
          { redis = redis.config_schema }
        },
      },
    },
  },
}
```

## Best Practices

### Partial 설계 원칙

1. **명확한 네이밍**: Partial의 이름은 용도와 환경을 명확히 나타내야 합니다.

   - `redis-production`
   - `redis-staging`
   - `redis-cache`

2. **환경별 분리**: 개발, 스테이징, 프로덕션 환경별로 별도의 Partial을 사용합니다.

3. **보안 고려사항**: 민감한 정보(비밀번호, 인증서)는 Partial에 직접 저장하지 말고 환경 변수나 시크릿 관리 시스템을 사용합니다.

### Partial 관리 팁

1. **버전 관리**: Partial 변경 시 이전 버전을 백업하고 변경 로그를 유지합니다.

2. **의존성 추적**: 어떤 플러그인이 어떤 Partial을 사용하는지 문서화합니다.

3. **테스트**: Partial 변경 후 관련 플러그인들이 정상 작동하는지 테스트합니다.

### 성능 최적화

1. **연결 풀링**: Redis 연결을 효율적으로 관리하기 위해 적절한 timeout과 keepalive 설정을 사용합니다.

2. **모니터링**: Partial을 사용하는 플러그인들의 성능을 모니터링합니다.

3. **캐싱**: 자주 사용되는 설정은 캐싱하여 성능을 향상시킵니다.

## Troubleshooting

### 일반적인 문제들

| 문제                                 | 원인                               | 해결 방법                                    |
| ------------------------------------ | ---------------------------------- | -------------------------------------------- |
| Partial을 찾을 수 없음               | 잘못된 Partial ID 또는 이름        | Partial이 존재하는지 확인하고 정확한 ID 사용 |
| Redis 연결 실패                      | 잘못된 호스트/포트 설정            | Partial의 Redis 설정 확인                    |
| 인증 실패                            | 잘못된 비밀번호                    | Partial의 password 설정 확인                 |
| 플러그인에서 Partial을 인식하지 못함 | 플러그인이 Partial을 지원하지 않음 | 플러그인 문서에서 Partial 지원 여부 확인     |

### 디버깅 방법

```bash
# Partial 상태 확인
curl http://localhost:8001/partials/my-redis-config

# 플러그인에서 Partial 사용 확인
curl http://localhost:8001/plugins | jq '.data[] | select(.partials)'

# Redis 연결 테스트
redis-cli -h localhost -p 6379 ping
```
