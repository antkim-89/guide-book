# [Route](https://developer.konghq.com/gateway/entities/route/)

## What is a Route?

Kong Gateway에서 Route는 두 가지 역할을 수행합니다:

1. 수신 요청을 일치시키고 올바른 게이트웨이 서비스로 라우팅합니다.
2. Route를 사용하여 프록시된 요청/응답을 변환하기 위해 플러그인을 사용합니다.

Route는 반드시 게이트웨이 서비스에 첨부되어야 하며, 하나 이상의 플러그인을 가질 수 있습니다.

## Schema

Route의 스키마는 다음과 같습니다:

| 필드                         | 타입             | 필수   | 기본값            | 설명                                                                |
| ---------------------------- | ---------------- | ------ | ----------------- | ------------------------------------------------------------------- |
| `name`                       | string           | 아니오 | -                 | Route의 고유한 이름                                                 |
| `protocols`                  | array of strings | 아니오 | ["http", "https"] | Route가 수락하는 프로토콜 목록 (http, https, tcp, tls, grpc, grpcs) |
| `methods`                    | array of strings | 아니오 | -                 | Route가 수락하는 HTTP 메서드 목록 (GET, POST, PUT, DELETE 등)       |
| `hosts`                      | array of strings | 아니오 | -                 | Route가 일치하는 호스트명 목록                                      |
| `paths`                      | array of strings | 아니오 | -                 | Route가 일치하는 경로 목록                                          |
| `headers`                    | object           | 아니오 | -                 | Route가 일치하는 헤더 조건 (key-value 쌍)                           |
| `https_redirect_status_code` | integer          | 아니오 | 426               | HTTP에서 HTTPS로 리다이렉트할 때 사용할 상태 코드                   |
| `regex_priority`             | integer          | 아니오 | 0                 | 정규식 경로의 우선순위 (숫자가 높을수록 우선순위 높음)              |
| `strip_path`                 | boolean          | 아니오 | true              | 업스트림 요청에서 매칭된 경로 부분을 제거할지 여부                  |
| `path_handling`              | string           | 아니오 | "v0"              | 경로 처리 방식 (v0, v1)                                             |
| `preserve_host`              | boolean          | 아니오 | false             | 클라이언트의 Host 헤더를 업스트림으로 보존할지 여부                 |
| `snis`                       | array of strings | 아니오 | -                 | TLS SNI(Server Name Indication) 목록                                |
| `sources`                    | array of objects | 아니오 | -                 | 요청 소스 IP/포트 조건                                              |
| `destinations`               | array of objects | 아니오 | -                 | 요청 대상 IP/포트 조건                                              |
| `tags`                       | array of strings | 아니오 | -                 | Route에 대한 태그 목록                                              |
| `service`                    | reference        | 예     | -                 | 연결된 Gateway Service 참조                                         |
| `expression`                 | string           | 아니오 | -                 | Expressions router용 라우팅 표현식                                  |
| `priority`                   | integer          | 아니오 | 0                 | Route의 우선순위 (숫자가 높을수록 우선순위 높음)                    |
| `enabled`                    | boolean          | 아니오 | true              | Route 활성화 여부                                                   |

**참고사항:**

- `expression` 필드가 제공되면 다른 라우팅 조건들은 무시됩니다.
- `protocols` 배열이 비어있으면 모든 프로토콜을 수락합니다.
- `methods` 배열이 비어있으면 모든 HTTP 메서드를 수락합니다.
- `hosts`와 `paths` 중 하나 이상은 반드시 설정해야 합니다.
- `strip_path`가 true이면 매칭된 경로 부분이 업스트림 요청에서 제거됩니다.

## Route and Gateway Service interaction

게이트웨이 서비스와 함께 라우팅을 사용하면 Kong Gateway를 통해 클라이언트에게 업스트림 서비스를 제공할 수 있습니다. 또한 라우팅을 통해 동일한 클라이언트가 여러 애플리케이션에 액세스하고 사용된 라우팅에 따라 서로 다른 정책을 적용할 수 있습니다.

예를 들어, 게이트웨이 서비스에 액세스해야 하는 두 개의 클라이언트 애플리케이션 `example_service`, 즉 내부 클라이언트와 외부 클라이언트가 있다고 가정해 보겠습니다. 서비스 거부(DoS)를 방지하기 위해 *외부* 클라이언트는 게이트웨이 서비스에 쿼리할 수 있는 빈도를 제한해야 합니다. 게이트웨이 서비스에 속도 제한 정책을 적용하고 *내부* 클라이언트가 해당 서비스를 호출하면 내부 클라이언트도 제한됩니다. 경로는 이 문제를 해결할 수 있습니다.

이 예에서는 서로 다른 호스트를 사용하여 두 클라이언트(예: `internal.example.com`와 `external.example.com`)를 처리하고 두 클라이언트 모두 `example_service`를 가리키도록 두 개의 경로를 생성할 수 있습니다 . 외부 경로의 사용 빈도를 제한하는 정책을 구성할 수 있습니다. 외부 클라이언트를 사용하여 Kong Gateway를 통해 Gateway Service에 액세스하려고 하면 `external.example.com`속도가 제한됩니다. 하지만 내부 클라이언트를 사용하여 Kong Gateway를 통해 Gateway Service에 액세스하면 `internal.example.com`속도가 제한되지 않습니다.

## Route use cases

Route의 일반 사용 방식:

| Use case                      | Description                                                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rate limiting<br>(유량 제어)  | Route들의 Upstream 서비스의 특정 주소로 접근하는 유량을 다르게 세팅하여 사용합니다.<br>예) `/internal` 이나 `/external` <br>Route가 가르키는 service에 유량 제어도 가능합니다.       |
| Perform a simple URL rewrite  | Route를 엔드포인트의 새로운 명명에 사용합니다. 예를 들어 기존 `/api/old`를 업스트림 엔드포인트의 이름을 <br>공개적으로 액세스 가능한 API 엔드포인트로 변경할 수 있습니다. `/new/api` |
| Perform a complex URL rewrite | Routes 엔터티를 사용하여 경로 그룹을 다시 작성합니다(예: . `/api/<function>/old`를 `/new/api/<function>`로 바꾸기)                                                                   |

## Configuration formats

Kong Gateway의 Route 정의 방식은 두 가지입니다. 전통적인 JSON 포멧, 그리고 좀 더 강력한 DSL-based expressions 포멧 방식입니다.
사용되는 라우터는 `kong.conf`의 `router_flavor` property에 의해 구성됩니다.

당신이 사용해야 하는 라우터는 당신의 use case와 Kong 버전에 달렸습니다.

**[Expressions router](https://developer.konghq.com/gateway/routing/expressions/)** : Kong Gateway 3.4.x 이상을 사용하는 모든 사용자에게 권장되는 방법입니다. 복잡한 라우팅 로직을 효율적으로 처리합니다.

**[Traditional router](https://developer.konghq.com/gateway/routing/traditional/)** : 오리지널 Kong Gateway 라우팅 구성 형식입니다. JSON 형식으로 일치 기준을 제공해야 합니다.

`router_flavor`를 `expressions`로 설정하면 `expressions`방식과 JSON 방식을 동시에 구성합니다. `expression`경로가 일치하면 JSON 우선순위 설정과 관계없이 JSON 형식 라우터가 실행되지 않습니다.

DSL 기반 형식을 비활성화하려면 `router_flavor`를 `traditional_compat`로 설정하세요 . 이 구성에서는 JSON 경로만 허용됩니다.

## Routing criteria

다음 라우팅 기준에 따라 수신 요청을 일치시킬 수 있습니다.

- 프로토콜: 업스트림 서비스와 통신하는 데 사용되는 프로토콜
- 호스트: 경로와 일치하는 도메인 목록
- 메서드: 경로와 일치하는 HTTP 메서드
- 헤더: 요청 헤더에 예상되는 값 목록
- 포트: 요청의 소스/대상 포트
- SNI: TLS 요청에 표시된 서버 이름

각 항목에 대한 자세한 예는 해당 [expressions](https://developer.konghq.com/gateway/routing/expressions/#how-requests-are-routed-with-the-expressions-router) 이나 [traditional](https://developer.konghq.com/gateway/routing/traditional/#routing-criteria) 섹션을 참조하세요.

## How routing works

들어오는 각 요청을 대해 Kong Gateway는 반드시 정의된 경로에 따라 이를 처리할 Gateway Service를 결정해야 합니다.
Kong Gateway 라우터는 정의된 모든 경로를 우선 순위에 따라 정렬하고 가장 높은 우선 순위와 일치하는 경로를 사용하여 요청을 프록시합니다.

## Priority matching

퍼포먼스를 극대화하기 위해서 Kong Gateway는 라우터에 정의된 모든 경로를 우선도 순으로 정렬합니다. 그리고 우선도가 가장 높은 Route가 요청을 처리하도록 합니다.
Route의 우선순위는 사용 중인 라우터 모드에 따라 달라집니다.
더 자세한 정보는 [expressions](https://developer.konghq.com/gateway/routing/expressions/#priority-matching) 와 [traditional](https://developer.konghq.com/gateway/routing/traditional/#route-priority) 에서 확인하세요.

## Route behavior

Route Entity는 `strip_path`, `preserve_host`,  `path_handling` 의 값들로 세팅 된 Route 위에 proxy behavior를 구성할 수 있게 합니다.

대부분의 경우:

- `strip_path`: `true`(기본 값) 이어야 함
- `preserve_host`: `false`(기본 값) 이어야 함
- `path_handling`: `v0`로 설정해야 합니다

## strip_path

Route와 일치하는 경로 접두사를 지정하되, 업스트림 요청에는 포함하지 않는 것이 좋습니다. 이렇게 하려면 `strip_path`다음과 같이 Route를 구성하여 부울 속성을 사용합니다.

```
{
    "paths": ["/service"],
    "strip_path": true,
    "service": {
        "id": "..."
    }
}

```

이 플래그를 활성화하면 Kong Gateway가 이 경로를 매칭하고 서비스로의 프록싱을 진행할 때, 매칭된 URL 경로 부분을 업스트림 요청의 URL에 포함 **하지 않도록** 지시합니다 . 예를 들어, 다음 클라이언트가 위 경로에 요청하는 경우:

```
GET /service/path/to/resource HTTP/1.1
Host: ...
```

이로 인해 Kong Gateway는 다음과 같은 업스트림 요청을 보냅니다.

```
GET /path/to/resource HTTP/1.1
Host: ...
```

마찬가지로, `strip_path` 활성화된 경로에 정규식 경로가 정의된 경우, 요청 URL 매칭 시퀀스 전체가 삭제됩니다. 예를 들면 다음과 같습니다.

```
{
    "paths": ["/version/\d+/service"],
    "strip_path": true,
    "service": {
        "id": "..."
    }
}
```

제공된 정규식 경로와 일치하는 다음 HTTP 요청:

```
GET /version/1/service/path/to/resource HTTP/1.1
Host: ...
```

Kong Gateway에서 다음과 같이 상류로 프록시됨:

```
GET /path/to/resource HTTP/1.1
Host: ...
```

## preserve_host

프록싱 시 Kong Gateway의 기본 동작은 업스트림 요청의 Host 헤더를 Gateway Service의 `host`에 지정된 호스트 이름으로 설정하는 것입니다. 이 `preserve_host`필드는 Kong Gateway가 해당 동작을 수행하지 않도록 지시하는 부울 플래그를 허용합니다.

예를 들어, `preserve_host`속성이 변경되지 않고 경로가 다음과 같이 구성된 경우:

```
{
    "hosts": ["service.com"],
    "service": {
        "id": "..."
    }
}
```

클라이언트가 Kong Gateway에 요청할 수 있는 내용은 다음과 같습니다.

```
GET / HTTP/1.1
Host: service.com
```

Kong Gateway는 서비스의 `host`속성에서 호스트 헤더 값을 추출하고 다음과 같은 업스트림 요청을 보냅니다.

```
GET / HTTP/1.1
Host: <my-service-host.com>
```

하지만 `preserve_host=true`를 사용하여 경로를 명시적으로 구성하면 :

```
{
    "hosts": ["service.com"],
    "preserve_host": true,
    "service": {
        "id": "..."
    }
}
```

그리고 클라이언트로부터 동일한 요청을 가정해 보겠습니다.

```
GET / HTTP/1.1
Host: service.com
```

Kong Gateway는 클라이언트 요청에서 호스트를 보존하고 대신 다음 업스트림 요청을 보냅니다.

```
GET / HTTP/1.1
Host: service.com
```

## path_handling

`path_handling` 매개 변수로 `v0`나 `v1` 허용합니다 .

- `v0`*Kong* 0.x , 2.x, 3.x에서 사용 되는 동작 입니다 .  `v0`는 `service.path`, `route.path` 그리고 요청 경로를 URL의 세그먼트로 처리합니다. 항상 슬래시로 연결됩니다. 서비스 경로는 `/s`, Route 경로는 `/r`, 그리고 요청 경로 `/re`, 연결되는 경로는 `/s/re`가 됩니다. 결과 경로가 단일 슬래시이면 더이상 추가 변환은 실행하지 않습니다. 그리고 길어지게 되면 마지막 슬래시가 제거됩니다.
- `v1`Kong 1.x에서 사용된 동작입니다. *접두사*`service.path` 로 취급 되며 요청 및 경로 경로의 첫 슬래시는 무시됩니다. 서비스 경로 , 경로 경로 , 요청 경로가 주어지면 연결된 경로는 다음과 같습니다 .서비스 경로는 `/s`, Route 경로는 `/r`, 그리고 요청 경로 `/re`, 연결되는 경로는 `/sre`가 됩니다.

```
path_handling v1은 더이상 expressions router와 Kong Gateway 이후 버전에서 더이상 지원하지 않습니다. v0를 사용하는 걸 강력 추천합니다.
```

두 버전 모두 더블 슬래시를 감지하여 단일 슬래시로 교체합니다.

## Routing performance recommendations

다음의 추천 방식으로 routing 효율을 증가 시킬 수 있습니다.

- `expression` 모드에서, 좀 더 유사한 Route(우선 순위가 높은)를 비교적 덜 유사한 것보다 먼저 배치하는 걸 권장합니다.
- Route의 정규 표현식은 simple prefix보다 많은 리소스를 사용합니다. 수 천의 Routes를 설치한다면 정규식보단 simple prefix방식이 Kong gateway의 처리량과 지연시간을 향상 시킬 수 있습니다. 정확한 일치하는 경로를 사용하기 위해 정규 표현식 router를 사용한다면 expressions router를 사용하면 확연하게 kong gateway의 성능을 향상 시킬 수 있습니다.

## TLS Route configuration

Route entity는 연결 별로 TLS certificates를 동적으로 제공합니다. TLS certificates는 2가지 방식으로 관리 됩니다.

- Certificates
- SNIs

이를 위해 SNI와 연결된 인증서를 만든 다음 인증서를 사용하는 보안 경로를 만듭니다.

```UI

다음은 기본 구성을 사용하여 example-route 라는 새로운 경로를 생성합니다 .

1. Kong Manager 또는 Gateway Manager에서 Routes로 이동합니다 .
2. New Route를 클릭하세요 .
3. 고유한 이름을 입력하고 할당할 서비스를 선택하세요. 이 예에서는 example-route라는 이름의 route입니다.
4. 경로를 설정하거나 라우팅 규칙을 정의합니다. 예를 들어, /mock 같은 경로가 될 수 있습니다.
5. 저장을 클릭하세요 .

이 경우 인증서는 이미 SNI와 연결되어 있으므로 기본적으로 경로에 적용됩니다. 또는 인증서와 함께 SNI 와일드카드를 사용하여 기존 경로에 자동으로 적용할 수 있습니다.
```

## Proxying TLS passthrough traffic

Kong Gateway는 TLS passthrough를 지원합니다.  Kong Gateway는 TLS 요청을 업스트림으로 전달할 때 연결 SNI 확장을 사용하여 일치하는 경로와 서비스를 찾습니다. TLS 트래픽을 프록시하기 위한 경로 구성은 모든 배포마다 고유하지만, 두 가지 주요 구성 변수는 다음과 같습니다.

- `tls_passthrough` protocol를 사용하여 경로 생성을 하고 SNI를 할당합니다.
- `tcp`로 설정한 프로토콜로 서비스를 만들어 경로와 연결 시킵니다.

## Set up a Route

### 1. UI를 통한 설정

다음은 기본 구성을 사용하여 **example-route**라는 새로운 경로를 생성합니다:

1. Kong Manager 또는 Gateway Manager에서 **Routes**로 이동합니다.
2. **New Route**를 클릭하세요.
3. 고유한 이름을 입력하고 할당할 서비스를 선택하세요. 이 예에서는 example-route라는 이름의 route입니다.
4. 경로를 설정하거나 라우팅 규칙을 정의합니다. 예를 들어, `/mock` 같은 경로가 될 수 있습니다.
5. **Save**를 클릭하세요.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/routes/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "example-route",
      "paths": ["/mock"],
      "service": {
        "id": "service-id-here"
      }
    }'
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
routes:
  - name: example-route
    paths:
      - "/mock"
    service: example-service
```

### 4. Terraform을 통한 설정

```hcl
resource "konnect_gateway_route" "my_route" {
  paths = ["/mock"]
  service = {
    id = konnect_gateway_service.my_service.id
  }
  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

### 5. Kubernetes Ingress Controller를 통한 설정

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: example-route
  annotations:
    konghq.com/strip-path: "true"
spec:
  parentRefs:
    - name: kong
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /mock
      backendRefs:
        - name: example-route-demo-service
          kind: Service
          port: 1027
```

## 플러그인과의 관계

Route에 플러그인을 첨부할 수 있습니다. Route에 첨부된 플러그인은 해당 Route로 향하는 모든 요청에 대해 실행됩니다. 이는 다음과 같은 플러그인들을 포함합니다:

- **인증 플러그인**: JWT, OAuth2, API Key 등
- **보안 플러그인**: CORS, IP Restriction 등
- **트래픽 제어 플러그인**: Rate Limiting, Request Size Limiting 등
- **변환 플러그인**: Request/Response Transformer 등
- **로깅 플러그인**: File Log, HTTP Log 등

## 라우팅 성능 최적화

다음의 추천 방식으로 라우팅 효율을 증가시킬 수 있습니다:

- **Expressions 모드**에서, 더 유사한 Route(우선순위가 높은)를 비교적 덜 유사한 것보다 먼저 배치하는 것을 권장합니다.
- Route의 정규 표현식은 simple prefix보다 많은 리소스를 사용합니다. 수천 개의 Routes를 설치한다면 정규식보다는 simple prefix 방식이 Kong Gateway의 처리량과 지연시간을 향상시킬 수 있습니다.
- 정확한 일치하는 경로를 사용하기 위해 정규 표현식 router를 사용한다면 expressions router를 사용하면 Kong Gateway의 성능을 현저하게 향상시킬 수 있습니다.
