# [SNIs](https://developer.konghq.com/gateway/entities/sni/)

## What is an SNI?

SNI(Server Name Indication)는 여러 호스트 이름을 인증서에 매핑하는 데 사용됩니다. 이를 통해 Kong Gateway는 클라이언트 요청의 호스트 이름을 기반으로 사용할 SSL/TLS 인증서를 선택할 수 있습니다. 이 기능을 통해 여러 도메인이 동일한 게이트웨이를 통해 안전하게 서비스될 수 있습니다.

## SNI routing

HTTPS, gRPC 또는 TLS와 같은 보안 프로토콜로 경로를 구성할 때는 라우팅에 SNI를 사용할 수 있습니다. SNI는 TLS 핸드셰이크 과정에서 결정되며 연결 지속 시간 동안 변경되지 않으므로 모든 요청에는 경로 구성에서 정의된 `Header`에 관계없이 동일한 SNI가 포함됩니다. 라우팅 우선순위가 할당되는 방법에 대한 자세한 내용은 [Expressions Router](https://developer.konghq.com/gateway/routing/expressions/#performance-considerations) 문서를 참조하세요.

### Wildcards

SNI를 구성하기 위한 유효한 와일드카드 위치는 다음과 같습니다:

- `mydomain.*`
- `*.mydomain.com`
- `*.www.mydomain.com`

이는 특히 TLS Routes를 구성할 때 유용합니다.

### Prioritization matching

SNI를 인증서와 일치시키기 위한 우선순위 설정은 다음 순서를 따릅니다:

1. 정확한 SNI 매칭 인증서
2. SNI 접두사 와일드카드로 인증서 검색
3. SNI 접미사 와일드카드로 인증서 검색
4. SNI와 관련된 인증서 검색 `*`
5. 파일 시스템의 기본 인증서

## Schema

| 필드          | 타입      | 설명                 | 기본값 |
| ------------- | --------- | -------------------- | ------ |
| `id`          | UUID      | SNI의 고유 식별자    | -      |
| `name`        | string    | SNI의 이름           | -      |
| `certificate` | object    | 연결된 인증서 객체   | -      |
| `tags`        | array     | 태그 목록 (선택사항) | -      |
| `created_at`  | timestamp | 생성 시간            | -      |
| `updated_at`  | timestamp | 마지막 업데이트 시간 | -      |

## Set up an SNI

### 1. UI를 통한 설정

기본적인 신규 SNI 구성 방식입니다:

1. Gateway instance로 이동합니다:
   - Konnect에서 sidebar의 **API Gateway**를 열고 control plane를 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **SNIs**로 이동합니다.
3. **New SNI**를 클릭합니다.
4. **Name** field에, SNI의 이름을 입력합니다:
   ```
   example-sni
   ```
5. **SSL Certificate ID** field에, 기존의 인증서 ID를 입력합니다:
   ```
   2e013e8-7623-4494-a347-6d29108ff68b
   ```
6. **Save**를 클릭합니다.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/snis/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "name": "example-sni",
      "certificate": {
        "id": "2e013e8-7623-4494-a347-6d29108ff68b"
      }
    }
    '
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
snis:
  - name: example-sni
    certificate:
      id: 2e013e8-7623-4494-a347-6d29108ff68b
```

### 4. Konnect API를 통한 설정

```bash
curl -X POST https://{region}.api.konghq.com/v2/control-planes/{controlPlaneId}/core-entities/snis/ \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer $KONNECT_TOKEN" \
    --data '
    {
      "name": "example-sni",
      "certificate": {
        "id": "2e013e8-7623-4494-a347-6d29108ff68b"
      }
    }
    '
```

**참고**: 다음 플레이스홀더를 실제 값으로 교체해야 합니다:

- `region`: Kong Konnect가 호스팅되고 운영되는 지리적 지역
- `controlPlaneId`: 컨트롤 플레인의 `id`
- `KONNECT_TOKEN`: Konnect 계정과 연결된 Personal Access Token (PAT)

### 5. Kong Ingress Controller (KIC)를 통한 설정

```yaml
apiVersion: configuration.konghq.com/v1
kind: KongSni
metadata:
  name: example-sni
  namespace: kong
  annotations:
    kubernetes.io/ingress.class: kong
name: example-sni
certificate:
  id: 2e013e8-7623-4494-a347-6d29108ff68b
```

### 6. Terraform을 통한 설정

```hcl
terraform {
  required_providers {
    konnect = {
      source  = "kong/konnect"
    }
  }
}

provider "konnect" {
  personal_access_token = "$KONNECT_TOKEN"
  server_url            = "https://us.api.konghq.com/"
}

resource "konnect_gateway_sni" "my_sni" {
  certificate = {
    id = "2e013e8-7623-4494-a347-6d29108ff68b"
  }

  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

## 사용 사례

### 1. 다중 도메인 SSL 인증서 관리

```yaml
snis:
  - name: api.example.com
    certificate:
      id: cert-1
  - name: admin.example.com
    certificate:
      id: cert-2
  - name: "*.example.com"
    certificate:
      id: wildcard-cert
```

### 2. 개발/스테이징/프로덕션 환경 분리

```yaml
snis:
  - name: dev-api.example.com
    certificate:
      id: dev-cert
  - name: staging-api.example.com
    certificate:
      id: staging-cert
  - name: api.example.com
    certificate:
      id: prod-cert
```

### 3. 와일드카드 인증서 활용

```yaml
snis:
  - name: "*.api.example.com"
    certificate:
      id: wildcard-api-cert
  - name: "*.admin.example.com"
    certificate:
      id: wildcard-admin-cert
```

## Related Resources

- [Certificates](certificate.md)
- [Reserved entity names](https://developer.konghq.com/gateway/reserved-entity-names/)
- [Using SSL certificates in Kong Gateway](https://developer.konghq.com/gateway/ssl-certificates/)
- [Konnect Control Plane resource limits](https://developer.konghq.com/konnect/resource-limits/)
- [Expressions Router](https://developer.konghq.com/gateway/routing/expressions/)
- [TLS Route configuration](https://developer.konghq.com/gateway/entities/#tls-route-configuration)
