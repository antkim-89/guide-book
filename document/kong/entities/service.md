# [Gateway Service](https://developer.konghq.com/gateway/entities/service/)

## What is a Gateway Service?

게이트웨이 서비스는 시스템의 업스트림 서비스를 나타냅니다. 이러한 애플리케이션은 요청에 응답하는 시스템의 비즈니스 로직 구성 요소입니다.  
게이트웨이 서비스 구성은 Kong 게이트웨이와 업스트림 서비스 간의 연결 세부 정보와 기타 메타데이터를 정의합니다. 일반적으로 하나의 게이트웨이 서비스를 각 업스트림 서비스에 매핑해야 합니다.  
간단한 배포의 경우, 게이트웨이 서비스에서 업스트림 URL을 직접 제공할 수 있습니다. 정교한 트래픽 관리가 필요한 경우, 게이트웨이 서비스는 업스트림을 가리킬 수 있습니다.  
Gateway Services를 Routes와 함께 사용하면 Kong Gateway를 통해 업스트림 서비스를 클라이언트에게 공개할 수 있습니다.  
플러그인은 서비스에 첨부될 수 있으며, 첨부된 서비스에 대한 요청을 트리거하는 모든 요청에 대해 실행됩니다.

## Schema

Gateway Service의 스키마는 다음과 같습니다:

| 필드                 | 타입                | 필수   | 기본값 | 설명                                                   |
| -------------------- | ------------------- | ------ | ------ | ------------------------------------------------------ |
| `name`               | string              | 예     | -      | 서비스의 고유한 이름                                   |
| `url`                | string              | 아니오 | -      | 업스트림 서비스의 전체 URL (protocol://host:port/path) |
| `protocol`           | string              | 아니오 | "http" | 업스트림 서비스의 프로토콜 (http, https, grpc, grpcs)  |
| `host`               | string              | 아니오 | -      | 업스트림 서비스의 호스트명 또는 IP 주소                |
| `port`               | integer             | 아니오 | 80     | 업스트림 서비스의 포트 번호                            |
| `path`               | string              | 아니오 | -      | 업스트림 서비스의 경로                                 |
| `retries`            | integer             | 아니오 | 5      | 업스트림 서비스로의 재시도 횟수                        |
| `connect_timeout`    | integer             | 아니오 | 60000  | 연결 타임아웃 (밀리초)                                 |
| `write_timeout`      | integer             | 아니오 | 60000  | 쓰기 타임아웃 (밀리초)                                 |
| `read_timeout`       | integer             | 아니오 | 60000  | 읽기 타임아웃 (밀리초)                                 |
| `tags`               | array of strings    | 아니오 | -      | 서비스에 대한 태그 목록                                |
| `client_certificate` | reference           | 아니오 | -      | 클라이언트 인증서 참조                                 |
| `tls_verify`         | boolean             | 아니오 | false  | TLS 인증서 검증 여부                                   |
| `tls_verify_depth`   | integer             | 아니오 | 1      | TLS 인증서 검증 깊이                                   |
| `ca_certificates`    | array of references | 아니오 | -      | CA 인증서 참조 목록                                    |
| `enabled`            | boolean             | 아니오 | true   | 서비스 활성화 여부                                     |

**참고사항:**

- `url` 필드가 제공되면 `protocol`, `host`, `port`, `path` 필드는 무시됩니다.
- `url` 필드가 제공되지 않으면 `protocol`, `host`, `port`, `path` 필드가 필요합니다.
- 타임아웃 값은 밀리초 단위입니다.
- `client_certificate`와 `ca_certificates`는 인증서 엔티티의 ID를 참조합니다.

## Set up a Gateway Service

### 1. UI를 통한 설정

Gateway Service 기본 구성으로 만드는 방법입니다.

1. Gateway instance로 이동:
   - Konnect에서 사이드 바의 **API Gateway**를 열고, control plane를 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Gateway Services**로 이동합니다.
3. **New Gateway Service**를 클릭합니다.
4. Service를 유일한 이름을 입력합니다. 예) `example-service`.
5. 이 서비스의 엔드포인트를 정의하려면 전체 URL을 지정하거나 별도의 요소를 사용합니다. 예) `http://httpbin.konghq.com`.
6. **Save** 클릭.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/services/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "example-service",
      "url": "http://httpbin.konghq.com"
    }'
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
services:
  - name: example-service
    url: http://httpbin.konghq.com
```

### 4. Terraform을 통한 설정

```hcl
resource "konnect_gateway_service" "my_service" {
  url = "http://httpbin.konghq.com"
  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

## 플러그인과의 관계

Gateway Service에 플러그인을 첨부할 수 있습니다. 서비스에 첨부된 플러그인은 해당 서비스로 향하는 모든 요청에 대해 실행됩니다. 이는 다음과 같은 플러그인들을 포함합니다:

- **인증 플러그인**: JWT, OAuth2, API Key 등
- **보안 플러그인**: CORS, IP Restriction 등
- **트래픽 제어 플러그인**: Rate Limiting, Request Size Limiting 등
- **변환 플러그인**: Request/Response Transformer 등
- **로깅 플러그인**: File Log, HTTP Log 등

## Routes와의 관계

Gateway Service는 Routes와 함께 작동하여 클라이언트 요청을 업스트림 서비스로 라우팅합니다:

1. 클라이언트가 Route에 정의된 경로로 요청을 보냅니다.
2. Kong Gateway가 요청을 받아 해당 Route를 찾습니다.
3. Route가 연결된 Gateway Service로 요청을 전달합니다.
4. Gateway Service가 업스트림 서비스로 요청을 프록시합니다.
5. 응답이 역순으로 클라이언트에게 전달됩니다.
