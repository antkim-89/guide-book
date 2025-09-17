# [Plugins](https://developer.konghq.com/gateway/entities/plugin/)

## What is a plugin?

Kong Gateway는 모듈을 로드하고 실행하는 Lua 프로그램입니다. plugin이라고 불리는 모듈을 사용하면 구현에 더 많은 기능을 추가 할 수 있습니다.

Kong은 Kong Gateway 및 Connect와 함께 번들로 제공되는 표준 Lua 플러그인 세트를 제공합니다.

사용자 지정 플러그인을 개발하여 자신만의 맞춤 기능을 Kong Gateway에 추가할 수도 있습니다.

## Plugin Schema

Plugin 엔티티의 전체 스키마는 다음과 같습니다:

| 필드명           | 타입             | 필수 여부 | 기본값 | 설명                                                                 |
| ---------------- | ---------------- | --------- | ------ | -------------------------------------------------------------------- |
| `id`             | string           | 아니오    | -      | Plugin의 고유 ID (자동 생성)                                         |
| `name`           | string           | 예        | -      | Plugin의 이름                                                        |
| `instance_name`  | string           | 아니오    | -      | Plugin 인스턴스의 고유 이름 (동일한 플러그인의 여러 인스턴스 구분용) |
| `config`         | object           | 아니오    | -      | Plugin의 구성 설정 (플러그인별로 다름)                               |
| `enabled`        | boolean          | 아니오    | `true` | Plugin 활성화 여부                                                   |
| `protocols`      | array of strings | 아니오    | -      | Plugin이 지원하는 프로토콜 목록                                      |
| `ordering`       | object           | 아니오    | -      | 동적 플러그인 순서 설정                                              |
| `tags`           | array of strings | 아니오    | -      | Plugin 태그                                                          |
| `service`        | object           | 아니오    | -      | 연결된 Service 정보 (scoped plugin인 경우)                           |
| `route`          | object           | 아니오    | -      | 연결된 Route 정보 (scoped plugin인 경우)                             |
| `consumer`       | object           | 아니오    | -      | 연결된 Consumer 정보 (scoped plugin인 경우)                          |
| `consumer_group` | object           | 아니오    | -      | 연결된 Consumer Group 정보 (scoped plugin인 경우)                    |

### Ordering Schema

동적 플러그인 순서 설정을 위한 스키마:

| 필드명   | 타입   | 필수 여부 | 기본값 | 설명                                              |
| -------- | ------ | --------- | ------ | ------------------------------------------------- |
| `before` | object | 아니오    | -      | 지정된 플러그인들보다 먼저 실행할 플러그인 설정   |
| `after`  | object | 아니오    | -      | 지정된 플러그인들보다 나중에 실행할 플러그인 설정 |

#### Before/After Configuration Schema

| 필드명     | 타입  | 필수 여부 | 기본값 | 설명                                               |
| ---------- | ----- | --------- | ------ | -------------------------------------------------- |
| `access`   | array | 아니오    | -      | access 단계에서 실행 순서를 지정할 플러그인 목록   |
| `rewrite`  | array | 아니오    | -      | rewrite 단계에서 실행 순서를 지정할 플러그인 목록  |
| `response` | array | 아니오    | -      | response 단계에서 실행 순서를 지정할 플러그인 목록 |

## Plugin Categories

Kong Gateway는 다양한 카테고리로 플러그인을 분류합니다:

### Authentication Plugins

인증 및 권한 부여를 담당하는 플러그인들:

| 플러그인명   | 설명                               | 지원 프로토콜 |
| ------------ | ---------------------------------- | ------------- |
| `acl`        | Access Control List 기반 권한 관리 | HTTP, gRPC    |
| `basic-auth` | HTTP Basic Authentication          | HTTP          |
| `hmac-auth`  | HMAC 기반 인증                     | HTTP          |
| `jwt`        | JSON Web Token 인증                | HTTP, gRPC    |
| `key-auth`   | API Key 기반 인증                  | HTTP, gRPC    |
| `ldap-auth`  | LDAP 인증                          | HTTP          |
| `oauth2`     | OAuth 2.0 인증                     | HTTP          |
| `saml`       | SAML 인증                          | HTTP          |
| `vault-auth` | HashiCorp Vault 인증               | HTTP          |

### Security Plugins

보안 관련 기능을 제공하는 플러그인들:

| 플러그인명              | 설명                          | 지원 프로토콜 |
| ----------------------- | ----------------------------- | ------------- |
| `cors`                  | Cross-Origin Resource Sharing | HTTP          |
| `ip-restriction`        | IP 주소 기반 접근 제한        | HTTP, gRPC    |
| `request-validator`     | 요청 검증                     | HTTP          |
| `request-size-limiting` | 요청 크기 제한                | HTTP          |
| `xml-threat-protection` | XML 위협 보호                 | HTTP          |

### Traffic Control Plugins

트래픽 제어 및 로드 밸런싱을 담당하는 플러그인들:

| 플러그인명               | 설명                    | 지원 프로토콜 |
| ------------------------ | ----------------------- | ------------- |
| `rate-limiting`          | Rate Limiting           | HTTP, gRPC    |
| `rate-limiting-advanced` | 고급 Rate Limiting      | HTTP, gRPC    |
| `response-ratelimiting`  | 응답 기반 Rate Limiting | HTTP          |
| `request-termination`    | 요청 종료               | HTTP, gRPC    |
| `upstream-timeout`       | Upstream 타임아웃       | HTTP, gRPC    |

### Analytics & Monitoring Plugins

모니터링 및 분석을 위한 플러그인들:

| 플러그인명   | 설명              | 지원 프로토콜 |
| ------------ | ----------------- | ------------- |
| `datadog`    | Datadog 통합      | HTTP, gRPC    |
| `prometheus` | Prometheus 메트릭 | HTTP, gRPC    |
| `statsd`     | StatsD 메트릭     | HTTP, gRPC    |
| `zipkin`     | Zipkin 분산 추적  | HTTP, gRPC    |

### Logging Plugins

로깅을 담당하는 플러그인들:

| 플러그인명 | 설명        | 지원 프로토콜 |
| ---------- | ----------- | ------------- |
| `file-log` | 파일 로깅   | HTTP, gRPC    |
| `http-log` | HTTP 로깅   | HTTP, gRPC    |
| `tcp-log`  | TCP 로깅    | HTTP, gRPC    |
| `udp-log`  | UDP 로깅    | HTTP, gRPC    |
| `syslog`   | Syslog 로깅 | HTTP, gRPC    |

### Transformations Plugins

요청/응답 변환을 담당하는 플러그인들:

| 플러그인명                      | 설명           | 지원 프로토콜 |
| ------------------------------- | -------------- | ------------- |
| `request-transformer`           | 요청 변환      | HTTP          |
| `request-transformer-advanced`  | 고급 요청 변환 | HTTP          |
| `response-transformer`          | 응답 변환      | HTTP          |
| `response-transformer-advanced` | 고급 응답 변환 | HTTP          |

## Configuration Examples

### 기본 Plugin 설정

```json
{
  "name": "rate-limiting",
  "config": {
    "minute": 100,
    "hour": 1000
  },
  "enabled": true
}
```

### Scoped Plugin 설정

```json
{
  "name": "key-auth",
  "config": {
    "key_names": ["apikey"],
    "hide_credentials": false
  },
  "service": {
    "id": "service-id-123"
  },
  "route": {
    "id": "route-id-456"
  },
  "enabled": true
}
```

### 동적 순서 설정이 포함된 Plugin

```json
{
  "name": "rate-limiting-advanced",
  "config": {
    "limit": [100],
    "window_size": [60],
    "sync_rate": 10
  },
  "ordering": {
    "before": {
      "access": ["key-auth"]
    }
  },
  "enabled": true
}
```

### 프로토콜 제한이 포함된 Plugin

```json
{
  "name": "cors",
  "config": {
    "origins": ["https://example.com"],
    "methods": ["GET", "POST"],
    "headers": ["Accept", "Authorization"]
  },
  "protocols": ["http"],
  "enabled": true
}
```

### API를 통한 Plugin 관리

```bash
# Plugin 생성
curl -X POST http://localhost:8001/plugins \
  --header "Content-Type: application/json" \
  --data '{
    "name": "rate-limiting",
    "config": {
      "minute": 100,
      "hour": 1000
    }
  }'

# Plugin 목록 조회
curl http://localhost:8001/plugins

# 특정 Plugin 조회
curl http://localhost:8001/plugins/{plugin-id}

# Plugin 업데이트
curl -X PATCH http://localhost:8001/plugins/{plugin-id} \
  --header "Content-Type: application/json" \
  --data '{
    "config": {
      "minute": 200,
      "hour": 2000
    }
  }'

# Plugin 삭제
curl -X DELETE http://localhost:8001/plugins/{plugin-id}
```

### decK을 사용한 Plugin 설정

```yaml
_format_version: "3.0"
plugins:
  - name: rate-limiting
    config:
      minute: 100
      hour: 1000
    enabled: true
  - name: key-auth
    config:
      key_names: ["apikey"]
      hide_credentials: false
    service: service-name
    enabled: true
```

## Custom plugins

Kong은 플러그인 개발 키트(PDK), 데이터베이스 추상화, 마이그레이션 등 플러그인 개발을 위한 전체 개발 환경을 제공합니다.

플러그인은 임의의 논리를 구현하기 위해 요청/응답 객체 또는 PDK를 통해 스트림과 상호 작용하는 모듈로 구성됩니다. Kong은 다음 언어로 PDK를 제공합니다:

- Lua
- Go
- Python
- JavaScript

이러한 PDK는 플러그인이 플러그인과 Kong의 핵심(또는 기타 구성 요소) 간의 상호 작용을 촉진하는 데 사용할 수 있는 일련의 기능입니다.

자신의 플러그인을 만들 때 [Getting Started documentation](https://developer.konghq.com/custom-plugins/get-started/set-up-plugin-project/)를 다시 보거나 뒤의 문서들을 확인하세요:

- [Plugin Development Kit reference](https://developer.konghq.com/gateway/pdk/reference/)
- [Custom plugins reference](https://developer.konghq.com/custom-plugins/reference/)

## How do plugins work?

Kong Gateway 플러그인을 사용하면 Kong Gateway에 의해 프록시 처리되는 요청, 응답 또는 TCP 스트림 연결의 라이프사이클에서 여러 진입 지점에 사용자 지정 로직을 삽입할 수 있습니다.

## Plugin context

다음 함수들은 Kong Gateway의 실행 수명 주기의 다양한 진입점에서 플러그인 로직을 구현하는 데 사용됩니다:

## HTTP module

[HTTP module](https://github.com/openresty/lua-nginx-module)은 HTTP/HTTPS 요청을 위해 작성된 플러그인에 사용됩니다. 이 모듈은 다음과 같은 기능을 사용합니다:

| Function name       | Kong Gateway phase           | Nginx directives                                                                                                                                                                                     | Request protocols                       | Description                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init_worker`       | `init_worker`                | [`init_worker_by_*`](https://github.com/openresty/lua-nginx-module#init_worker_by_lua_block)                                                                                                         | All protocols                           | 모든 Nginx Worker 프로세스의 시작 시 실행됩니다.                                                                                                                                                                                                                                                                                        |
| `configure`         | - `init_worker`<br>- `timer` | [`init_worker_by_*`](https://github.com/openresty/lua-nginx-module#init_worker_by_lua_block)                                                                                                         | All protocols                           | v3.4+ Kong Gateway 플러그인 반복기가 재구성될 때마다 실행됩니다(플러그인 구성 변경 후).                                                                                                                                                                                                                                                 |
| `certificate`       | `certificate`                | [`ssl_certificate_by_*`](https://github.com/openresty/lua-nginx-module#ssl_certificate_by_lua_block)                                                                                                 | - `https`<br>- `grpcs`<br>- `wss`       | SSL handshake의 SSL 인증서 서비스 단계에서 실행됩니다..                                                                                                                                                                                                                                                                                 |
| `rewrite`           | `rewrite`                    | [`rewrite_by_*`](https://github.com/openresty/lua-nginx-module#rewrite_by_lua_block)                                                                                                                 | All protocols                           | 클라이언트로부터 재작성 단계 핸들러로 수신된 모든 요청에 대해 실행됩니다. <br> <br>이 단계에서는 서비스나 Consumer가 식별되지 않았으므로 플러그인이 글로벌 플러그인으로 구성된 경우에만 이 핸들러가 실행됩니다.                                                                                                                         |
| `access`            | `access`                     | [`access_by_*`](https://github.com/openresty/lua-nginx-module#access_by_lua_block)                                                                                                                   | - `http(s)`<br>- `grpc(s)`<br>- `ws(s)` | 클라이언트의 모든 요청에 대해 실행되며, 업스트림 서비스로 프록시 처리되기 전에 실행됩니다.                                                                                                                                                                                                                                              |
| `response`          | `response`                   | - [`header_filter_by_*`](https://github.com/openresty/lua-nginx-module#header_filter_by_lua_block)<br>- [`body_filter_by_*`](https://github.com/openresty/lua-nginx-module#body_filter_by_lua_block) | - `http(s)`<br>- `grpc(s)`              | `header_filter()`와 `body_filter()`를 대체합니다. 업스트림 서비스로부터 전체 응답을 받은 후 클라이언트에게 일부를 보내기 전에 실행됩니다.                                                                                                                                                                                               |
| `header_filter`     | `header_filter`              | [`header_filter_by_*`](https://github.com/openresty/lua-nginx-module#header_filter_by_lua_block)                                                                                                     | - `http(s)`<br>- `grpc(s)`              | 업스트림 서비스로부터 모든 응답 헤더 바이트를 수신했을 때 실행됩니다.                                                                                                                                                                                                                                                                   |
| `body_filter`       | `body_filter`                | [`body_filter_by_*`](https://github.com/openresty/lua-nginx-module#body_filter_by_lua_block)                                                                                                         | - `http(s)`<br>- `grpc(s)`              | 업스트림 서비스에서 수신한 응답 본문의 각 청크에 대해 실행됩니다. 응답이 클라이언트로 다시 스트리밍되기 때문에 버퍼 크기를 초과하고 청크 단위로 청크 스트리밍될 수 있습니다. 이 함수는 응답이 큰 경우 여러 번 호출할 수 있습니다.  자세한 내용은 [`lua-nginx-module`](https://github.com/openresty/lua-nginx-module) 문서를 참조하세요. |
| `ws_handshake`      | `ws_handshake`               | [`access_by_*`](https://github.com/openresty/lua-nginx-module#access_by_lua_block)                                                                                                                   | `ws(s)`                                 | 웹소켓 핸드셰이크를 완료하기 직전에 웹소켓 서비스에 대한 모든 요청에 대해 실행됩니다.                                                                                                                                                                                                                                                   |
| `ws_client_frame`   | `ws_client_frame`            | [`content_by_*`](https://github.com/openresty/lua-nginx-module#content_by_lua_block)                                                                                                                 | `ws(s)`                                 | 클라이언트로부터 받은 각 WebSocket 메시지에 대해 실행됩니다.                                                                                                                                                                                                                                                                            |
| `ws_upstream_frame` | `ws_upstream_frame`          | [`content_by_*`](https://github.com/openresty/lua-nginx-module#content_by_lua_block)                                                                                                                 | `ws(s)`                                 | 업스트림 서비스에서 수신한 각 WebSocket 메시지에 대해 실행됩니다.                                                                                                                                                                                                                                                                       |
| `log`               | `log`                        | [`log_by_*`](https://github.com/openresty/lua-nginx-module#log_by_lua_block)                                                                                                                         | - `http(s)`<br>- `grpc(s)`              | 마지막 응답 바이트가 클라이언트에게 전송되었을 때 실행됩니다.                                                                                                                                                                                                                                                                           |
| `ws_close`          | `ws_close`                   | [`log_by_*`](https://github.com/openresty/lua-nginx-module#log_by_lua_block)                                                                                                                         | `ws(s)`                                 | 웹소켓 연결이 종료된 후 실행됩니다.                                                                                                                                                                                                                                                                                                     |

예기치 않은 동작 변경을 줄이기 위해 플러그인이 `response`과 `header_filter` 또는 `body_filter`를 모두 구현하면 Kong Gateway가 시작되지 않습니다.

## Stream module

[Stream module](https://github.com/openresty/stream-lua-nginx-module)은 TCP 및 UDP 스트림 연결을 위해 작성된 플러그인에 사용됩니다. 다음 기능을 사용합니다:

| Function name | Kong Gateway phase           | Nginx directives                                                                                     | Description                                                                             |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `init_worker` | `init_worker`                | [`init_worker_by_*`](https://github.com/openresty/lua-nginx-module#init_worker_by_lua_block)         | 모든 Nginx Worker 프로세스의 시작 시 실행됩니다.                                        |
| `configure`   | - `init_worker`<br>- `timer` | [`init_worker_by_*`](https://github.com/openresty/lua-nginx-module#init_worker_by_lua_block)         | v3.4+ Kong Gateway 플러그인 반복기가 재구성될 때마다 실행됩니다(플러그인 구성 변경 후). |
| `preread`     | `preread`                    | [`preread_by_*`](https://github.com/openresty/stream-lua-nginx-module#preread_by_lua_block)          | 모든 연결에 한번만 실행됩니다.                                                          |
| `log`         | `log`                        | [`log_by_*`](https://github.com/openresty/lua-nginx-module#log_by_lua_block)                         | 모든 연결이 종료될 때 한번만 실행됩니다.                                                |
| `certificate` | `certificate`                | [`ssl_certificate_by_*`](https://github.com/openresty/lua-nginx-module#ssl_certificate_by_lua_block) | SSL 핸드셰이크의 SSL 인증서 서비스 단계에서 실행됩니다.                                 |

`init_worker`와 `configure`를 제외한 모든 기능은 Kong Gateway가 호출 시 제공하는 하나의 매개변수인 플러그인의 구성을 취합니다. 이 매개변수는 Lua 테이블이며, 플러그인의 스키마(`schema.lua` 모듈에 설명됨)에 따라 사용자가 정의한 값을 포함합니다. `configure`는 특정 플러그인에 대해 활성화된 모든 플러그인 구성 배열과 함께 호출됩니다(또는 플러그인에 활성 구성이 없는 경우 `nil`이 전달됨). `init_worker`와 `configure`는 요청이나 프레임 외부에서 발생하며, 나머지 단계는 수신 요청/프레임에 제한됩니다.

UDP 스트림에는 실제 연결이 없습니다. Kong Gateway는 출발지와 도착지 호스트 및 포트가 동일한 모든 패킷을 단일 연결로 간주합니다. 패킷 없이 구성 가능한 시간이 지나면 연결이 닫힌 것으로 간주하고 `log` 기능을 실행합니다.

## Scoping plugins

환경의 필요에 따라 다양한 컨텍스트에서 플러그인을 실행할 수 있습니다. 각 플러그인은 전역적으로 실행되거나 다음 중 일부의 조합으로 범위를 지정할 수 있습니다:

- [Gateway Services](https://developer.konghq.com/gateway/entities/service/)
- [Routes](https://developer.konghq.com/gateway/entities/route/)
- [Consumers](https://developer.konghq.com/gateway/entities/consumer/)
- [Consumer Groups](https://developer.konghq.com/gateway/entities/consumer-group/)

스코프를 사용하여 요청이 업스트림 서비스로 전송되기 전 또는 응답을 수신한 후에 환경에서 Kong Gateway가 기능을 처리하는 방식을 사용자 지정할 수 있습니다. 예를 들어, 단일 Route에 플러그인을 적용하는 경우 해당 플러그인은 요청이 Route의 특정 경로와 일치할 때만 트리거됩니다.

## Global Scope

글로벌 플러그인은 서비스, Route, Consumer 또는 소비자 그룹과 연결되지 않으며, 다른 구성에 관계없이 모든 요청에 대해 실행됩니다.

- 자체 관리되는 Kong Gateway Enterprise에서는 플러그인이 특정 작업 공간의 모든 엔티티에 적용됩니다.
- 자체 관리 오픈 소스인 Kong Gateway에서는 플러그인이 전체 환경에 적용됩니다.
- Konnect에서 플러그인은 주어진 Control plane의 모든 엔티티에 적용됩니다.

모든 플러그인은 이러한 범위의 하위 집합을 지원합니다.

## Plugin precedence

플러그인은 동일한 구성에서 여러 인스턴스를 가질 수 있습니다. 다양한 인스턴스를 사용하여 다양한 엔티티, 엔티티의 조합, 또는 전역적으로 플러그인을 적용할 수 있습니다. 각 플러그인 인스턴스에 고유한 이름을 부여하여 식별할 수 있습니다. 인스턴스 이름 자체는 처리에 영향을 미치지 않으며, 대신 내부 레이블처럼 작동합니다.

단일 플러그인 인스턴스는 항상 요청당 한 번만 실행됩니다. 플러그인 인스턴스가 실행되는 구성은 구성된 엔티티에 따라 달라집니다.

예를 들어, 대부분의 요청에 대해 특정 방식으로 플러그인을 구성하고 싶지만 인증된 요청이 약간 다르게 작동할 때 유용합니다.

따라서 플러그인이 서로 다른 구성을 가진 다른 엔티티에 적용된 경우 플러그인을 실행하는 데에는 우선순위가 있습니다. 특정 플러그인에 구성된 엔티티의 수는 플러그인의 우선순위와 직접적인 상관관계가 있습니다. 플러그인이 구성된 엔티티가 많을수록 우선순위가 높아집니다.

여러 엔티티로 구성된 플러그인의 완전한 우선순위는 다음과 같습니다:

1. **Consumer** + **Route** + **Service**: 특정 경로 및 서비스에서 특정 Consumer와 일치하는 인증된 요청에 영향을 미치는 최고 우선순위.
2. **Consumer group** + **Service** + **Route**: 특정 서비스 및 경로에서 인증된 사용자 그룹에 영향을 미칩니다.
3. **Consumer** + **Route**: 특정 경로에서 특정 Consumer의 인증된 요청을 대상으로 합니다.
4. **Consumer** + **Service**: 특정 서비스 내의 경로에 접근하는 특정 Consumer의 인증된 요청에 적용됩니다.
5. **Consumer group** + **Route**: 특정 경로에서 인증된 사용자 그룹에 영향을 미칩니다.
6. **Consumer group** + **Service**: 인증된 사용자 그룹에 대해 특정 서비스 내의 모든 경로에 적용됩니다.
7. **Route** + **Service**: 특정 경로와 서비스에 있는 모든 소비자를 대상으로 합니다.
8. **Consumer**: 모든 경로와 서비스에 걸쳐 인증된 특정 소비자의 모든 요청에 적용됩니다.
9. **Consumer Group**: 지정된 인증된 사용자 그룹의 모든 경로와 서비스에 영향을 미칩니다.
10. **Route**: 주어진 경로에 따라 다릅니다.
11. **Service**: 주어진 서비스에 따라 다릅니다.
12. **Globally configured plugins**: 최저 우선순위는 소비자 상태에 관계없이 모든 서비스 및 경로에 걸친 모든 요청에 적용됩니다.

## Supported scopes by plugin

다음의 [경로](https://developer.konghq.com/gateway/entities/plugin/#supported-scopes-by-plugin)에서 테이블 내용을 확인하세요.

## Plugin priority

Kong Gateway에 번들로 제공되는 모든 플러그인은 정적 우선순위를 가집니다. 이는 플러그인의 주문 구성 매개변수(`ordering`)를 사용하여 동적으로 조정할 수 있습니다.

다음의 [경로](https://developer.konghq.com/gateway/entities/plugin/#plugin-priority)를 확인하세요.

## Dynamic plugin ordering

각 플러그인의 순서 구성 매개변수(`ordering`)를 사용하여 모든 Kong Gateway 플러그인의 우선순위를 재정의할 수 있습니다. 이를 통해 `access` 단계에서 플러그인 순서를 결정하고 플러그인 간에 동적 종속성을 만들 수 있습니다.

특정 플러그인을 지정된 플러그인 또는 플러그인 목록 `before` 또는 `after`에 실행하도록 선택할 수 있습니다.

구성은 다음과 같습니다.

```
pluginA:
  ordering:
    before|after:
      access:
        - pluginB
        - pluginC
```

## Example with before token

예를 들어, Kong이 인증을 요청하기 전에 게이트웨이 서비스 및 경로에 대한 요청의 양을 제한하고 싶다고 가정해 보겠습니다. 다음 예제에서는 인증 방법으로 키 인증 플러그인과 함께 속도 제한 고급 플러그인을 사용합니다:

1. Gateway instance로 이동:
   - Konnect에서 사이드바에서 **API Gateway**를 열고 Control plane을 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Plugins**을 선택합니다.
3. **New Plugin**을 클릭하고 plugin을 선택합니다..
4. plugin을 위한 범위를 선택합니다:
   - **Global**, Workspace(Kong Manager) 또는 Control plane(Gateway Manager)의 모든 Gateway Service, Route, Consumers 및 Consumer Groups에 플러그인을 적용합니다
   - **Scoped**, 플러그인을 적용 시킬 특정 Gateway Service, Route, Consumer나 Consumer Groups을 선택합니다. 여기에서 사용할 수 있는 엔티티 유형은 선택한 플러그인에 따라 다릅니다.
5. 플러그인을 구성합니다. 구성 옵션은 선택한 플러그인에 따라 달라집니다.
6. **Save**를 클릭합니다.

## Example with after token

예를 들어, 먼저 Request Transformer 플러그인으로 요청을 변환한 다음 인증을 요청할 수 있습니다. 인증 플러그인(이 예제에서는 기본 인증)의 순서를 변경하여 변환 후 항상 실행되도록 할 수 있습니다:

1. Gateway instance로 이동:
   - Konnect에서 사이드바에서 **API Gateway**를 열고 Control plane을 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Plugins**을 선택합니다.
3. **New Plugin**을 클릭하고 plugin을 선택합니다..
4. plugin을 위한 범위를 선택합니다:
   - **Global**, Workspace(Kong Manager) 또는 Control plane(Gateway Manager)의 모든 Gateway Service, Route, Consumers 및 Consumer Groups에 플러그인을 적용합니다
   - **Scoped**, 플러그인을 적용 시킬 특정 Gateway Service, Route, Consumer나 Consumer Groups을 선택합니다. 여기에서 사용할 수 있는 엔티티 유형은 선택한 플러그인에 따라 다릅니다.
5. 플러그인을 구성합니다. 구성 옵션은 선택한 플러그인에 따라 달라집니다.
6. **Save**를 클릭합니다.

## Known limitations of dynamic plugin ordering

동적 ordering을 사용하는 경우 모든 구성을 수동으로 테스트하고 이 기능을 주의 깊게 처리하세요. 환경에 영향을 미칠 수 있는 여러 가지 고려 사항이 있습니다:

- **Consumer and Consumer Group scoping**: Workspace나 Control plane 어디에나 Consumer 또는 Consumer Group이 지원하는 플러그인이 있는 경우 동적 플러그인 정렬을 사용할 수 없습니다.
  Consumer 매핑과 동적 플러그인 정렬은 모두 `access` 단계에서 실행되지만, 플러그인의 순서는 Consumer 매핑이 완료된 후에 결정해야 합니다. Kong Gateway는 매핑된 Consumer 또는 Consumer Group과 관련하여 플러그인의 순서를 안정적으로 변경할 수 없습니다.
- **Cascading deletes**: 플러그인이 삭제된 플러그인과 종속성이 있는지 감지하는 것은 지원되지 않으므로 구성을 신중하게 처리하세요.
- **Performance**: 동적 플러그인 ordering은 요청 중에 플러그인을 정렬해야 하므로 요청에 지연 시간이 추가됩니다. 경우에 따라 고가의 인증 플러그인보다 먼저 속도 제한을 실행할 때 이를 보완할 수 있습니다.
  Workspace 또는 Control plane에서 플러그인을 다시 정렬하면 동일한 환경 내의 다른 모든 플러그인에 성능이 영향을 미칩니다. 가능하다면 플러그인 주문을 별도의 환경으로 분리 운영 하는 것을 고려해 보세요.
- **Validation**: 동적 플러그인 정렬을 검증하는 것은 쉬운 일이 아니며 사용자의 비즈니스 논리에 대한 인사이트가 필요합니다. Kong Gateway는 기본적인 오류를 포착하려고 하지만 잠재적으로 위험할 수 있는 모든 구성을 감지할 수는 없습니다.

## Protocols

Plungins는 다양한 프로토콜을 지원합니다.

## Supported protocols by plugin

각 플러그인은 특정 프로토콜 세트를 지원합니다. 기본적으로 플러그인에서 지원하는 모든 프로토콜은 활성화되어 있습니다. 필요한 경우 플러그인의 구성을 조정하여 특정 프로토콜에 대한 지원을 비활성화할 수 있습니다.

플러그인과 호환되는(기본) 프로토콜에 대해서는 [다음 주소](https://developer.konghq.com/gateway/entities/plugin/#supported-protocols-by-plugin)를 참조하세요.

## Best Practices

### Plugin 설계 원칙

1. **명확한 네이밍**: Plugin의 `instance_name`을 사용하여 동일한 플러그인의 여러 인스턴스를 명확히 구분합니다.

   - `rate-limiting-api`
   - `rate-limiting-admin`
   - `key-auth-public`

2. **적절한 스코핑**: 필요한 최소 범위로 플러그인을 제한하여 성능을 최적화합니다.

   - Global: 모든 요청에 적용되는 플러그인
   - Service: 특정 서비스에만 적용
   - Route: 특정 경로에만 적용

3. **프로토콜 제한**: 필요한 프로토콜에만 플러그인을 적용하여 불필요한 오버헤드를 방지합니다.

### Plugin 관리 팁

1. **순서 관리**: 동적 플러그인 순서를 사용할 때는 의존성을 신중히 고려합니다.

   - 인증 플러그인은 보통 다른 플러그인보다 먼저 실행
   - 로깅 플러그인은 보통 마지막에 실행

2. **성능 모니터링**: 플러그인 성능을 정기적으로 모니터링하고 필요시 최적화합니다.

3. **테스트**: 플러그인 변경 후 충분한 테스트를 수행합니다.

### 성능 최적화

1. **불필요한 플러그인 비활성화**: 사용하지 않는 플러그인은 비활성화합니다.

2. **캐싱 활용**: 가능한 경우 플러그인에서 캐싱을 활용합니다.

3. **리소스 관리**: 플러그인이 사용하는 메모리와 CPU 리소스를 모니터링합니다.

## Troubleshooting

### 일반적인 문제들

| 문제                     | 원인                        | 해결 방법                        |
| ------------------------ | --------------------------- | -------------------------------- |
| 플러그인이 실행되지 않음 | 플러그인이 비활성화됨       | `enabled: true` 설정 확인        |
| 플러그인 순서 문제       | 동적 순서 설정 오류         | `ordering` 설정 검토             |
| 프로토콜 불일치          | 지원하지 않는 프로토콜 사용 | `protocols` 설정 확인            |
| 스코핑 문제              | 잘못된 엔티티 연결          | Service/Route/Consumer 연결 확인 |
| 설정 오류                | 잘못된 config 값            | 플러그인 문서의 스키마 확인      |

### 디버깅 방법

```bash
# 활성화된 플러그인 목록 확인
curl http://localhost:8001/plugins | jq '.data[] | select(.enabled == true)'

# 특정 플러그인의 실행 순서 확인
curl http://localhost:8001/plugins/{plugin-id}

# 플러그인 로그 확인
tail -f /var/log/kong/error.log | grep plugin

# 플러그인 성능 메트릭 확인
curl http://localhost:8001/status
```

### Plugin 개발 가이드

#### 기본 Plugin 구조

```lua
-- my-plugin/handler.lua
local MyPlugin = {
  PRIORITY = 1000,
  VERSION = "1.0.0",
}

function MyPlugin:access(conf)
  -- Plugin 로직 구현
  kong.log("MyPlugin executed")
end

return MyPlugin
```

#### Plugin 스키마 정의

```lua
-- my-plugin/schema.lua
return {
  name = "my-plugin",
  fields = {
    {
      config = {
        type = "record",
        fields = {
          {
            message = {
              type = "string",
              default = "Hello from MyPlugin"
            }
          }
        }
      }
    }
  }
}
```

#### Plugin 테스트

```lua
-- my-plugin/spec/my-plugin_spec.lua
describe("MyPlugin", function()
  it("should execute successfully", function()
    local plugin = require("my-plugin")
    local conf = { message = "Test message" }

    -- 테스트 로직
    assert.is_not_nil(plugin)
  end)
end)
```
