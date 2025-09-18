# Granular Tracing

## 개요

Granular Tracing은 Kong의 라이프사이클에 대한 메트릭과 상세한 디버그 데이터를 사람이나 기계가 소비할 수 있는 형식으로 노출하는 메커니즘을 제공합니다.

### 중요 공지사항

⚠️ **Deprecation Warning**: Granular tracing은 더 이상 사용되지 않습니다. 이는 해당 기능이 결국 제거될 것임을 의미합니다. Granular tracing 제거의 목표는 Kong Gateway 4.0 릴리스입니다.

## Granular Tracing 설정 (제거됨: 3.7)

### 기본 Tracing 설정

| 설정                     | 설명                                                                                                                                                      | 기본값 | 제거 버전 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------- |
| `tracing`                | 활성화되면 Kong이 DB 또는 DNS 쿼리, 플러그인 실행, 핵심 핸들러 타이밍 등과 같은 요청 라이프사이클의 다양한 부분에 대한 세밀한 디버그 데이터를 생성합니다. | `off`  | 3.7       |
| `tracing_write_strategy` | Kong이 요청 완료 시 tracing 데이터를 작성하는 방법을 정의합니다.                                                                                          | `file` | 3.7       |
| `tracing_write_endpoint` | tracing 데이터가 작성될 엔드포인트를 정의합니다.                                                                                                          | -      | 3.7       |
| `tracing_time_threshold` | trace 데이터를 구성된 엔드포인트에 작성하기 위해 trace가 실행되어야 하는 최소 시간(마이크로초)입니다.                                                     | `0`    | 3.7       |
| `tracing_types`          | 작성되는 trace 유형을 정의합니다.                                                                                                                         | `all`  | 3.7       |
| `tracing_debug_header`   | 요청 내에서 trace를 생성하기 위해 존재해야 하는 HTTP 요청 헤더의 이름을 정의합니다.                                                                       | -      | 3.7       |
| `generate_trace_details` | 활성화되면 Kong이 trace에 컨텍스트별 세부 정보를 작성합니다.                                                                                              | `off`  | 3.7       |

### Tracing Write Strategy 유효한 값

| 전략       | 설명                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `file`     | 사람이 읽을 수 있는 형식으로 tracing 데이터를 노드의 파일 시스템의 구성 가능한 위치에 작성합니다. |
| `file_raw` | 원시 형식으로 tracing 데이터를 작성합니다.                                                        |
| `http`     | JSON 문서로 tracing 데이터를 HTTP 엔드포인트에 작성합니다.                                        |
| `tcp`      | JSON 문서로 tracing 데이터를 TCP 엔드포인트에 작성합니다.                                         |
| `tls`      | JSON 문서로 tracing 데이터를 TLS 엔드포인트에 작성합니다.                                         |
| `udp`      | JSON 문서로 tracing 데이터를 UDP 엔드포인트에 작성합니다.                                         |

### Tracing Write Endpoint 형식

| 전략                | 엔드포인트 형식                                | 예시                                  |
| ------------------- | ---------------------------------------------- | ------------------------------------- |
| `file`, `file_raw`  | 파일 시스템 경로                               | `/var/log/kong/traces.log`            |
| `tcp`, `tls`, `udp` | `<HOST>:<PORT>`                                | `localhost:8080`                      |
| `http`              | `<scheme>://<IP / HOSTNAME>(:<PORT>(/<PATH>))` | `https://api.example.com:8080/traces` |

**참고**: HTTP를 통한 trace는 POST 메서드와 `application/json` Content-Type으로 전달됩니다.

### Tracing Types

| Trace 유형         | 설명                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| `query`            | 데이터베이스 쿼리를 trace합니다.                                                     |
| `legacy_query`     | (deprecated) 레거시 DAO로 데이터베이스 쿼리를 trace합니다.                           |
| `router`           | Kong이 요청을 라우팅하는 것을 trace합니다. 내부 라우팅 시간을 포함합니다.            |
| `balancer`         | 전체 balancer 단계의 실행을 trace합니다.                                             |
| `balancer.getPeer` | Kong이 ring-balancer에서 upstream peer를 선택하는 것을 trace합니다.                  |
| `balancer.toip`    | balancer가 peer의 호스트를 IP로 해결하는 것을 trace합니다.                           |
| `connect.toip`     | cosocket이 대상의 호스트를 IP로 해결하는 것을 trace합니다.                           |
| `access.before`    | 매개변수 파싱, 라우트 매칭, balancer 준비와 같은 액세스 단계의 전처리를 trace합니다. |
| `access.after`     | balancer 실행 및 내부 변수 할당과 같은 액세스 단계의 후처리를 trace합니다.           |
| `plugin`           | 플러그인 단계 핸들러를 trace합니다.                                                  |

### Tracing Debug Header 동작

- **설정되지 않음**: tracing이 활성화되면 Kong이 프록시와 Admin API를 통해 흐르는 모든 요청에 대해 trace 데이터를 생성합니다.
- **설정됨**: 요청에 지정된 헤더가 있어야만 trace가 생성됩니다. 헤더의 값은 중요하지 않으며, 헤더가 존재하기만 하면 됩니다.
- **제한사항**: 이 설정이 활성화되면 인증서 처리 단계의 데이터는 로그되지 않습니다.

### Trace Details 기능

`generate_trace_details`가 활성화되면:

- **추가 데이터**: trace의 컨텍스트에 대한 더 많은 데이터를 제공합니다.
- **크기 증가**: trace 보고서의 크기가 크게 증가할 수 있습니다.
- **보안 주의**: trace 세부 정보에는 원시 SQL 쿼리와 같은 잠재적으로 민감한 정보가 포함될 수 있습니다.

## Route Collision Detection/Prevention

### Route Validation Strategy

| 설정                        | 설명                                                                                                                                                                     | 기본값  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `route_validation_strategy` | 라우트를 생성하거나 업데이트할 때 라우트를 검증하는 데 사용되는 전략입니다. 워크스페이스의 트래픽 분할을 강제하는 방법을 조정하기 위해 다양한 전략을 사용할 수 있습니다. | `smart` |

### Route Validation Strategy 유효한 값

| 전략     | 설명                                                                                                                                                                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `smart`  | 기본 옵션으로 https://docs.konghq.com/gateway/latest/kong-enterprise/workspaces/에 설명된 알고리즘을 사용합니다.                                                                                                                                          |
| `off`    | 모든 검사를 비활성화합니다.                                                                                                                                                                                                                               |
| `path`   | 라우트가 `enforce_route_path_pattern` 구성에 설명된 패턴을 준수하도록 강제합니다.                                                                                                                                                                         |
| `static` | PostgreSQL 데이터베이스를 사용합니다. 새 라우트를 생성하기 전에 다음 매개변수(paths, methods, hosts)를 기반으로 모든 워크스페이스에서 라우트가 고유한지 확인합니다. 새 라우트의 모든 필드가 기존 라우트와 겹치면 409와 함께 충돌하는 라우트를 반환합니다. |

### Route Path Pattern Enforcement

| 설정                         | 설명                                                                                                                                                                                     | 기본값 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `enforce_route_path_pattern` | 라우트 객체의 paths 속성에 적용될 Lua 패턴을 지정합니다. 패턴에 워크스페이스에 대한 플레이스홀더를 추가할 수도 있으며, 이는 라우트가 속한 워크스페이스를 기반으로 런타임에 렌더링됩니다. | -      |

**참고**: 이 설정은 `route_validation_strategy`가 `path`로 설정된 경우에만 관련이 있습니다.

### Route Path Pattern 예시

패턴 `/$(workspace)/v%d/.*`에 대한 유효한 경로:

| 워크스페이스 | 유효한 경로            | 설명                                |
| ------------ | ---------------------- | ----------------------------------- |
| `group1`     | `/group1/v1/`          | group1 워크스페이스에 속하는 라우트 |
| `group2`     | `/group2/v1/some_path` | group2 워크스페이스에 속하는 라우트 |

### 충돌 감지 제한사항

- **일반 텍스트 라우트만 지원**: 충돌 감지는 일반 텍스트 라우트에만 지원됩니다.
- **정규식 라우트 제외**: 이 기능에 의존하여 정규식 라우트를 검증하지 마세요.

## 마이그레이션 가이드

### Granular Tracing에서 OpenTelemetry로

Granular Tracing이 제거되므로 OpenTelemetry를 사용한 분산 추적으로 마이그레이션하는 것이 권장됩니다.

#### OpenTelemetry 설정 예시

```yaml
# OpenTelemetry 플러그인 활성화
plugins:
  - name: opentelemetry
    config:
      endpoint: http://jaeger:14268/api/traces
      service_name: kong-gateway
      resource_attributes:
        service.name: kong-gateway
        service.version: 3.0.0
```

#### 기존 Tracing 설정 대체

| Granular Tracing 설정    | OpenTelemetry 대체              |
| ------------------------ | ------------------------------- |
| `tracing`                | OpenTelemetry 플러그인 활성화   |
| `tracing_write_strategy` | OpenTelemetry 엔드포인트 설정   |
| `tracing_write_endpoint` | OpenTelemetry 수집기 엔드포인트 |
| `tracing_types`          | OpenTelemetry 스팬 생성         |
| `tracing_debug_header`   | OpenTelemetry 헤더 기반 샘플링  |

## 보안 고려사항

### Trace 데이터 보안

- **민감한 정보**: trace 세부 정보에는 SQL 쿼리, 사용자 데이터 등 민감한 정보가 포함될 수 있습니다
- **저장소 보안**: trace 데이터를 안전한 위치에 저장하세요
- **접근 제어**: trace 데이터에 대한 접근을 제한하세요

### Route Validation 보안

- **패턴 검증**: 라우트 패턴을 신중하게 설계하세요
- **워크스페이스 격리**: 워크스페이스 간 라우트 충돌을 방지하세요
- **정규식 보안**: 정규식 라우트의 보안을 고려하세요

## 운영 권장사항

### Granular Tracing 대체

- **OpenTelemetry 도입**: Granular Tracing 대신 OpenTelemetry를 사용하세요
- **모니터링 도구**: APM 도구와 통합하세요
- **성능 영향**: 추적 오버헤드를 모니터링하세요

### Route Management

- **충돌 방지**: 라우트 생성 시 충돌을 방지하세요
- **패턴 표준화**: 일관된 라우트 패턴을 사용하세요
- **워크스페이스 관리**: 워크스페이스별 라우트를 체계적으로 관리하세요

### 모니터링

- **라우트 성능**: 라우트 처리 성능을 모니터링하세요
- **충돌 감지**: 라우트 충돌을 모니터링하세요
- **검증 오류**: 라우트 검증 오류를 추적하세요
