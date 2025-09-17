# [Upstreams](https://developer.konghq.com/gateway/entities/upstream/)

## What is an Upstream?

Upstream은 클라이언트 요청이 전달되는 가상 호스트네임과 collection의 타겟 또는 Upstream 서비스 인스턴스들을 제공하여 로드 밸런싱을 가능하게 합니다.

Upstream을 Health check, circuit break와 여러 Gateway Service들로부터 들어오는 요청의 load balance로 사용 가능합니다. 또한, Upstream entity는 least-connections, consistent-hashing, lowest-latency과 같은 더 고급 기능 알고리즘을 갖추고 있습니다.

## Upstream Schema

Upstream 엔티티의 전체 스키마는 다음과 같습니다:

| 필드명                        | 타입             | 필수 여부 | 기본값        | 설명                                                                                                          |
| ----------------------------- | ---------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `name`                        | string           | 예        | -             | Upstream의 고유한 이름                                                                                        |
| `algorithm`                   | string           | 아니오    | `round-robin` | 로드 밸런싱 알고리즘 (`round-robin`, `consistent-hashing`, `least-connections`, `latency`, `sticky-sessions`) |
| `hash_on`                     | string           | 아니오    | `none`        | 해시 입력 필드 (`none`, `consumer`, `ip`, `header`, `cookie`)                                                 |
| `hash_fallback`               | string           | 아니오    | `none`        | fallback 해시 입력 필드 (`none`, `consumer`, `ip`, `header`, `cookie`)                                        |
| `hash_on_header`              | string           | 아니오    | -             | `hash_on`이 `header`일 때 사용할 헤더명                                                                       |
| `hash_fallback_header`        | string           | 아니오    | -             | `hash_fallback`이 `header`일 때 사용할 헤더명                                                                 |
| `hash_on_cookie`              | string           | 아니오    | -             | `hash_on`이 `cookie`일 때 사용할 쿠키명                                                                       |
| `hash_on_cookie_path`         | string           | 아니오    | `/`           | 생성된 쿠키의 경로                                                                                            |
| `slots`                       | integer          | 아니오    | `10000`       | consistent-hashing에서 사용할 슬롯 수                                                                         |
| `sticky_sessions_cookie`      | string           | 아니오    | -             | sticky-sessions에서 사용할 쿠키명                                                                             |
| `sticky_sessions_cookie_path` | string           | 아니오    | `/`           | sticky-sessions 쿠키의 경로                                                                                   |
| `healthchecks`                | object           | 아니오    | -             | 헬스 체크 설정                                                                                                |
| `tags`                        | array of strings | 아니오    | -             | 엔티티 태그                                                                                                   |

### Health Checks Schema

`healthchecks` 객체의 스키마:

| 필드명    | 타입   | 필수 여부 | 기본값 | 설명                      |
| --------- | ------ | --------- | ------ | ------------------------- |
| `active`  | object | 아니오    | -      | Active health check 설정  |
| `passive` | object | 아니오    | -      | Passive health check 설정 |

#### Active Health Check Schema

| 필드명                     | 타입    | 필수 여부 | 기본값 | 설명                                    |
| -------------------------- | ------- | --------- | ------ | --------------------------------------- |
| `type`                     | string  | 아니오    | `http` | 헬스 체크 타입 (`http`, `https`, `tcp`) |
| `http_path`                | string  | 아니오    | `/`    | HTTP 헬스 체크 경로                     |
| `https_verify_certificate` | boolean | 아니오    | `true` | HTTPS 인증서 검증 여부                  |
| `https_sni`                | string  | 아니오    | -      | SNI (Server Name Indication)            |
| `timeout`                  | number  | 아니오    | `1`    | 타임아웃 (초)                           |
| `concurrency`              | number  | 아니오    | `10`   | 동시 헬스 체크 수                       |
| `interval`                 | number  | 아니오    | `0`    | 헬스 체크 간격 (초)                     |
| `healthy`                  | object  | 아니오    | -      | Healthy 상태 설정                       |
| `unhealthy`                | object  | 아니오    | -      | Unhealthy 상태 설정                     |

#### Passive Health Check Schema

| 필드명      | 타입   | 필수 여부 | 기본값 | 설명                                    |
| ----------- | ------ | --------- | ------ | --------------------------------------- |
| `type`      | string | 아니오    | `http` | 헬스 체크 타입 (`http`, `https`, `tcp`) |
| `healthy`   | object | 아니오    | -      | Healthy 상태 설정                       |
| `unhealthy` | object | 아니오    | -      | Unhealthy 상태 설정                     |

#### Healthy/Unhealthy Status Schema

| 필드명          | 타입              | 필수 여부 | 기본값                                                                                            | 설명                                      |
| --------------- | ----------------- | --------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `http_statuses` | array of integers | 아니오    | `[200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308]` | Healthy/Unhealthy로 간주할 HTTP 상태 코드 |
| `tcp_failures`  | integer           | 아니오    | `0`                                                                                               | TCP 실패 횟수                             |
| `timeouts`      | integer           | 아니오    | `0`                                                                                               | 타임아웃 횟수                             |
| `http_failures` | integer           | 아니오    | `0`                                                                                               | HTTP 실패 횟수                            |
| `interval`      | number            | 아니오    | `0`                                                                                               | 상태 체크 간격 (초)                       |

## Target Entity

Upstream과 함께 사용되는 Target 엔티티는 실제 백엔드 서버를 나타냅니다.

### Target Schema

| 필드명     | 타입             | 필수 여부 | 기본값 | 설명                              |
| ---------- | ---------------- | --------- | ------ | --------------------------------- |
| `id`       | string           | 아니오    | -      | Target의 고유 ID (자동 생성)      |
| `target`   | string           | 예        | -      | 백엔드 서버 주소 (host:port 형식) |
| `weight`   | integer          | 아니오    | `100`  | 로드 밸런싱 가중치 (0-1000)       |
| `tags`     | array of strings | 아니오    | -      | Target 태그                       |
| `upstream` | object           | 아니오    | -      | 연결된 Upstream 정보              |

### Target 상태

Target은 다음 상태 중 하나를 가집니다:

| 상태          | 설명                                  |
| ------------- | ------------------------------------- |
| `healthy`     | Target이 정상 작동 중                 |
| `unhealthy`   | Target이 비정상 상태 (헬스 체크 실패) |
| `dns_error`   | DNS 해석 실패                         |
| `dns_updated` | DNS 업데이트됨                        |

## Configuration Examples

### 기본 Upstream 설정

```json
{
  "name": "my-upstream",
  "algorithm": "round-robin"
}
```

### Consistent Hashing 설정

```json
{
  "name": "cache-upstream",
  "algorithm": "consistent-hashing",
  "hash_on": "consumer",
  "hash_fallback": "ip",
  "slots": 10000
}
```

### Sticky Sessions 설정

```json
{
  "name": "session-upstream",
  "algorithm": "sticky-sessions",
  "sticky_sessions_cookie": "session_id",
  "sticky_sessions_cookie_path": "/",
  "sticky_sessions_cookie_secure": true,
  "sticky_sessions_cookie_httponly": true,
  "sticky_sessions_cookie_samesite": "Lax"
}
```

### Health Check가 포함된 Upstream 설정

```json
{
  "name": "monitored-upstream",
  "algorithm": "least-connections",
  "healthchecks": {
    "active": {
      "type": "http",
      "http_path": "/health",
      "timeout": 1,
      "concurrency": 10,
      "interval": 10,
      "healthy": {
        "interval": 0,
        "http_statuses": [
          200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303,
          304, 305, 306, 307, 308
        ],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      },
      "unhealthy": {
        "interval": 0,
        "http_statuses": [429, 500, 501, 502, 503, 504, 505],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      }
    },
    "passive": {
      "type": "http",
      "healthy": {
        "http_statuses": [
          200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303,
          304, 305, 306, 307, 308
        ],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      },
      "unhealthy": {
        "http_statuses": [429, 500, 501, 502, 503, 504, 505],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      }
    }
  }
}
```

### Target 추가 예시

```bash
# Target 추가
curl -X POST http://localhost:8001/upstreams/my-upstream/targets \
  --data "target=192.168.1.10:8080" \
  --data "weight=100"

# Target 목록 조회
curl http://localhost:8001/upstreams/my-upstream/targets

# Target 삭제
curl -X DELETE http://localhost:8001/upstreams/my-upstream/targets/192.168.1.10:8080
```

## Upstream and Gateway Service interaction

호스트를 대신해 Upstream을 지정하도록 서비스를 구성할 수 있습니다. 예를 들어 `example_service`와 `example_upstream`이 존재한다면, `example_service`를 특정 호스트를 `example_upstream`으로 대체할 수 있습니다. `example_upstream`은 서로 다른 target들(`httpbin.konghq.com`와 `httpbun.com`)로 지정할 수 있습니다. 실제 환경에서, 여러 시스템에서 구동 중인 같은 Service를 지정할 수 있습니다.

이 설정을 통해 Upstream Target 간의 로드 밸런싱을 수행할 수 있습니다. 예를 들어, Upstream 서비스가 두 개의 다른 서버 또는 Upstream 대상에 배포되는 경우, Kong Gateway는 두 서버 간의 로드 밸런싱을 수행해야 합니다. 서버 중 하나(예: 이전 예제의 `httpbin.konghq.com`)를 사용할 수 없는 경우 자동으로 문제를 감지하고 모든 트래픽을 작업 중인 서버(`httpbun.com`)로 라우팅합니다.

다음의 다이어그램으로 Upstream이 Kong Gateway entity와 어떻게 상호 작용하는지 보여 줍니다.

## Use cases for Upstreams

Upstream의 일반 usecase입니다.

| Use case                                                                                                                                     | Description                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Load balance](https://developer.konghq.com/gateway/entities/upstream/#load-balancing-algorithms)                                            | Upstream이 여러 타겟을 바라볼 때, Upstream entity를 구성하여 타겟 간의 Traffic을 로드 벨런스 할 수 있습니다. 만약 로드 밸런스가 필요 없다면, 요청을 라우팅하고 트래픽을 프록시할 때 선호하는 방법으로 경로에서 `host` header를 사용하는 것을 권장합니다 |
| [Health check](https://developer.konghq.com/gateway/traffic-control/health-checks-circuit-breakers/#active-health-checks)                    | 대상을 동적으로 건강 또는 건강하지 않은 것으로 표시하도록 업스트림을 구성합니다. 이는 대상의 특정 HTTP 또는 HTTPS 엔드포인트를 주기적으로 요청하고 응답에 따라 대상의 건강 상태를 결정하는 활성 검사입니다.                                             |
| [Circuit break](https://developer.konghq.com/gateway/traffic-control/health-checks-circuit-breakers/#passive-health-checks-circuit-breakers) | Upstream을 구성하여 Kong Gateway가 프록시 중인 트래픽을 수동적으로 분석하고 요청에 응답하는 동작을 기반으로 대상의 상태를 결정할 수 있도록 합니다. **이 기능은 Connect 또는 하이브리드 모드에서 지원되지 않습니다.**                                    |

## Health Checks

Kong Gateway는 Upstream의 Target들에 대해 두 가지 유형의 헬스 체크를 제공합니다:

### Active Health Checks

Active health check는 Kong Gateway가 주기적으로 Target에 직접 요청을 보내어 상태를 확인하는 방식입니다.

**특징:**

- Target의 실제 상태를 정확히 파악
- 설정된 간격으로 자동 실행
- HTTP, HTTPS, TCP 프로토콜 지원
- 설정 가능한 타임아웃과 재시도 횟수

**설정 예시:**

```json
{
  "name": "my-upstream",
  "healthchecks": {
    "active": {
      "type": "http",
      "http_path": "/health",
      "timeout": 1,
      "concurrency": 10,
      "interval": 10,
      "healthy": {
        "interval": 0,
        "http_statuses": [
          200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303,
          304, 305, 306, 307, 308
        ],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      },
      "unhealthy": {
        "interval": 0,
        "http_statuses": [429, 500, 501, 502, 503, 504, 505],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      }
    }
  }
}
```

### Passive Health Checks (Circuit Breaker)

Passive health check는 실제 트래픽을 모니터링하여 Target의 상태를 판단하는 방식입니다.

**특징:**

- 실제 사용자 트래픽을 기반으로 상태 판단
- 추가 네트워크 오버헤드 없음
- 실시간 트래픽 패턴 반영
- Connect 또는 하이브리드 모드에서 지원되지 않음

**설정 예시:**

```json
{
  "name": "my-upstream",
  "healthchecks": {
    "passive": {
      "type": "http",
      "healthy": {
        "http_statuses": [
          200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303,
          304, 305, 306, 307, 308
        ],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      },
      "unhealthy": {
        "http_statuses": [429, 500, 501, 502, 503, 504, 505],
        "tcp_failures": 0,
        "timeouts": 0,
        "http_failures": 0
      }
    }
  }
}
```

## Load balancing algorithms

Load balancer는 다음의 로드 밸런싱 알고리즘을 지원합니다.

- `round-robin`
- `consistent-hashing`
- `least-connections`
- `latency`
- `sticky-sessions` `v3.11`

## Round-robin

round-robin 알고리즘은 가중치 방식으로 수행됩니다. 기본 DNS 기반 로드 밸런싱과 동일한 결과를 제공하지만, `upstream`이기 때문에 health check 및 circuit breakers를 위한 추가 기능도 사용할 수 있습니다.

이 알고리즘을 선택 했을 때 고려할 사항입니다.

- 요청의 원활한 분배 제공
- DNS 업데이트나 Target 업데이트만이 트래픽 분포에 영향을 미칠 수 있기 때문에 상당히 정적인 상태를 유지합니다.
- cache-hit 비율을 증가 시키지 않음.

## Consistent-hashing

consistent-hashing 알고리즘을 사용하면 구성 가능한 클라이언트 입력을 사용하여 해시 값을 계산합니다. 그런 다음 이 해시 값은 특정 백엔드 서버에 연결됩니다.

일반적인 예로는 `consumer`를 해시 입력으로 사용하는 것입니다. 이 ID는 해당 사용자의 모든 요청에 대해 동일하므로 동일한 사용자가 동일한 백엔드 서버에서 일관되게 처리되도록 보장합니다. 이를 통해 각 서버는 고정된 사용자 하위 집합만 서비스하기 때문에 백엔드에서 캐시 최적화를 수행할 수 있으며, 사용자 관련 데이터에 대한 캐시 히트 비율을 향상 시킬 수 있습니다.

이 알고리즘은 알려진 백엔드 목록의 변경 시 해싱 안정성을 극대화하고 일관성 손실을 최소화하기 위해 ketama principle을 구현합니다.

consistent-hashing 알고리즘의 입력은 `hash-on` 매개변수에 설정된 값에 따라 다음 옵션 중 하나가 될 수 있습니다:

| Option     | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`     | `consistent-hashing`를 사용하지 않고 `round-robin` 대신 사용합니다(기본). 해싱은 불가능합니다.                                                                                                                                                                                                                                                                                                              |
| `consumer` | 해시 입력으로 Consumer ID를 사용합니다. 사용 가능한 Consumer ID가 없는 경우, 자격 증명 ID로 fall back합니다.(예: LDAP와 같은 외부 인증 메커니즘의 경우)                                                                                                                                                                                                                                                     |
| `ip`       | 원 IP 주소를 해시 입력으로 사용합니다. 이 옵션을 사용할 때 [실제 IP를 결정하기 위한 구성](https://developer.konghq.com/gateway/configuration/#real-ip-config) 설정을 검토합니다.                                                                                                                                                                                                                            |
| `header`   | 해시 입력으로 지정된 헤더를 사용합니다.  헤더 이름은 `header`가 기본 속성인지 아니면 fall back attribute인지에 따라 Upstream의 `hash_on_header` 또는 `hash_fallback_header` 필드 중 하나에 지정됩니다.                                                                                                                                                                                                      |
| `cookie`   | 해시 입력으로 지정된 경로가 있는 지정 쿠키를 사용합니다. 쿠키 이름은 Upstream의 `hash_on_cookie` 필드에 지정되고 경로는 Upstream의 `hash_on_cookie_path` 필드에 지정됩니다. 지정된 쿠키가 요청에 없는 경우 응답에 의해 설정됩니다. 생성된 쿠키는 무작위 UUID 값을 가지며, 이 값은 쿠키에 보존됩니다. <br> <br>hash_fallback 설정은 유효하지 않으며 쿠키가 기본 해싱 메커니즘인 경우 사용할 수 없습니다.<br> |

`consistent-hashing` 알고리즘은 기본, fallback hashing attribute를 지원합니다. 기본 캐시가 실패한 경우(예: 기본 캐시가 `consumer`로 설정되어 있지만 인증된 consumer가 없는 경우), fallback 속성이 사용됩니다. 이렇게 하면 Upstream 캐시 히트가 최대화됩니다.

consistents-hashing balancer는 단일 노드뿐만 아니라 클러스터에서도 작동하도록 설계되었습니다.

다음은 consistents-hashing 선택했을 때 고려 사항입니다.

- 백엔드의 cache-hit 비율을 향상 시킨다.
- 해시 입력에 균등하게 분배하려면 충분한 cardinality(고유한 값의 개수)가 필요합니다. 예를 들어, 가능한 값이 2개뿐인 헤더에서 해시하는 것은 의미가 없습니다.
- 쿠키 기반 접근 방식은 브라우저 기반 요청에서는 잘 작동하지만, 쿠키를 생략하는 경우가 많은 M2M(기계 간 통신) 클라이언트에서는 덜 작동합니다.
- Kong gateway 클러스터의 해싱 접근 방법을 사용할 때, IP 주소를 기준으로 대상 엔티티를 추가하고, 밸런서에서 호스트 이름을 사용하지 않도록 합니다. DNS TTL은 두 번째 정밀도만 가지고 있으며, 갱신은 실제로 이름이 요청된 시점에 따라 결정되므로 밸런서는 서서히 발산할 것입니다. 또한 일부 네임서버는 모든 항목을 반환하지 않기 때문에 문제가 더욱 심각해집니다. 이 문제는 밸런서 재구축과 더 높은 TTL 설정을 통해 완화될 수 있습니다.

## Least-connections

`least-connections` 알고리즘은  각 백엔드에 대한 끝나지 않은 요청(in-flight) 수를 추적합니다. 가중치는 백엔드의 연결 용량을 계산하는 데 사용됩니다. 요청은 가장 높은 예비 용량을 가진 백엔드로 라우팅됩니다.

이 알고리즘을 선택했을 고려 사항입니다.

- 트래픽 분산을 잘 제공합니다.
- cache-hit 비율이 증가하지 않습니다.
- 이 옵션은 더 동적입니다. 왜냐하면 느린 백엔드는 더 많은 연결을 열어두고, 새로운 요청이 자동으로 다른 백엔드로 라우팅되기 때문입니다.

## Latency

`latency` 알고리즘은 최대 EWMA(Exponentially Weighted Moving Average)를 기반으로 하며, 이는 밸런서가 가장 낮은 지연 시간(`upstream_response_time`)만큼 백엔드를 선택하도록 보장합니다. 사용되는 지연 시간 메트릭은 TCP 연결부터 바디 응답 시간까지 전체 요청 주기입니다. 이동 평균이기 때문에 메트릭은 시간이 지남에 따라 감소합니다.

대상 가중치는 Account로 가져가지 않습니다.

이 알고리즘을 선택했을 고려 사항입니다.

- 메트릭이 항상 감소하기 때문에 유지할 수 있는 충분한 기본 부하가 있는 경우 트래픽의 좋은 분배를 제공합니다.
- 매우 역동적입니다. 왜냐하면 부하를 지속적으로 최적화하기 때문입니다.
- 지연 시간 기반 로드 밸런싱은 지연 시간의 분산이 낮을 때 가장 잘 작동하며, 이는 대부분 비슷한 모양의 트래픽과 백엔드의 워크로드를 의미합니다. 예를 들어, 이 알고리즘을 GraphQL 백엔드와 함께 사용하면 작은 빠른 쿼리뿐만 아니라 큰 느린 쿼리도 처리할 수 있어 지연 시간 메트릭의 분산이 높아져 메트릭이 왜곡될 수 있습니다.
- 리소스 부족을 방지하려면 백엔드 용량을 적절히 설정하고 적절한 네트워크 지연 시간을 보장해야 합니다. 예를 들어, 가까운 작은 용량의 서버(네트워크 지연 시간이 낮음)와 멀리 떨어진 대용량 서버(지연 시간이 높음) 두 대의 서버를 사용할 수 있습니다. 대부분의 트래픽은 지연 시간이 증가하기 시작할 때까지 작은 서버로 라우팅됩니다. 그러나 지연 시간이 증가하면 작은 서버가 리소스 부족으로 고통받고 있을 가능성이 높습니다. 이 경우 알고리즘은 작은 서버를 일정한 자원 부족 상태로 유지하여 효율적이지 않을 가능성이 높습니다.
- 이 옵션은 웹소켓이나 서버 전송 이벤트(SSE)와 같은 장수명 연결에는 적합하지 않습니다.

## Sticky sessions

Sticky session을 통해 Kong Gateway는 브라우저 관리 쿠키를 사용하여 동일한 클라이언트의 반복 요청을 동일한 백엔드 Target으로 라우팅할 수 있습니다.

요청이 `sticky-sessions` 알고리즘을 사용하여 Upstream을 통해 프록시될 때, Kong Gateway는 응답에 쿠키를 설정합니다 (`Set-Cookie` 헤더를 통해). 이후 요청에서 쿠키가 여전히 유효하고 원래 Target을 사용할 수 있는 경우, 트래픽은 동일한 Target으로 라우팅됩니다.

이 메커니즘은 세션 지속성, graceful shutdowns(하고 있던 작업들을 side effect 없이 종료하는 것), 그리고 연결 친화성이 요구되는 애플리케이션에 유용합니다.

이 알고리즘을 선택했을 고려 사항입니다.

- 브라우저 관리 쿠키를 통한 세션 유지를 제공합니다.
- 종료 중이거나 `NotReady` 상태인 포드에 트래픽이 완전히 제거될 때까지 라우팅을 계속합니다.
- Targets가 소모되거나 종료되더라도 sticky behavior이 필요한 애플리케이션에 이상적입니다.
- 일부 클라이언트가 특정 대상에 연결된 긴 세션을 유지할 경우 고르지 않은 부하가 발생할 수 있습니다.

Upstream당 쿠키 세팅이 사용자화 될 수 있습니다.

### Sticky Sessions Configuration Example

```json
{
  "name": "sticky",
  "algorithm": "sticky-sessions",
  "hash_on": "none",
  "hash_fallback": "none",
  "sticky_sessions_cookie": "gruber",
  "sticky_sessions_cookie_path": "/"
}
```

### Sticky Sessions Schema

Sticky sessions 알고리즘 사용 시 추가로 설정할 수 있는 필드들:

| 필드명                            | 타입    | 필수 여부 | 기본값  | 설명                                         |
| --------------------------------- | ------- | --------- | ------- | -------------------------------------------- |
| `sticky_sessions_cookie`          | string  | 아니오    | -       | 세션 쿠키 이름 (설정하지 않으면 자동 생성)   |
| `sticky_sessions_cookie_path`     | string  | 아니오    | `/`     | 쿠키가 유효한 경로                           |
| `sticky_sessions_cookie_secure`   | boolean | 아니오    | `false` | HTTPS에서만 쿠키 전송 여부                   |
| `sticky_sessions_cookie_httponly` | boolean | 아니오    | `false` | JavaScript에서 쿠키 접근 차단 여부           |
| `sticky_sessions_cookie_samesite` | string  | 아니오    | -       | SameSite 쿠키 속성 (`Strict`, `Lax`, `None`) |

## Sticky session vs consistent hashing

Sticky session과 consistent hashing의 차이점을 나타낸 표입니다.

| Feature                 | Sticky sessions                                    | Consistent hashing                                                        |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| Session Affinity        | 쿠키를 통해 강제함                                 | hash input에 따라 달라짐 (e.g. IP or header). 타겟이 달라지면 지속성 없음 |
| Target Removal Handling | 원본이 제거되면 새 대상을 선택합니다.              | 사용 가능한 타겟에 따라 최소한의 적용                                     |
| Load Distribution       | 세션이 오래 지속되면 고르지 않을 수 있습니다.      | 고르게 분포되도록 설계되었습니다.                                         |
| Pod Draining Support    | NotReady 또는 종료되는 pod로 라우팅을 계속합니다.. | 건강하지 않거나 종료되는 포드로 라우팅하지 않습니다.                      |
