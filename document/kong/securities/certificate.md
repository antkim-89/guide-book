# [Certificate](https://developer.konghq.com/gateway/entities/certificate/)

## What is a Certificate?

인증서 엔티티는 발신자의 권한과 이름을 검증하는 데 사용되는 공인 인증서를 나타냅니다. 이 인증서는 선택적으로 해당 개인 키와 페어링하여 보안 연결을 시작하고 민감한 데이터를 암호화할 수 있습니다.

Kong Gateway는 다음과 같은 방법으로 인증서를 사용할 수 있습니다:

- 연결된 SNI Object를 사용하여 하나 이상의 hostname에 대한 SSL/TLS 종료 처리
- 클라이언트 또는 서비스의 피어 인증서를 검증할 때 신뢰할 수 있는 CA 저장소로 사용

## SNI association

인증서는 SNI와 연결하여 하나 이상의 호스트 이름에 대한 SSL/TLS 종료를 처리할 수 있습니다. 그런 다음 SNI를 사용하여 서비스 또는 경로를 구성하여 경로에 인증서를 할당할 수 있습니다. SNI Wildcard를 사용하여 모든 SNI에 걸쳐 인증서를 동적으로 할당할 수 있습니다.

예시:

```yaml
_format_version: "3.0"
certificates:
  - cert: |
      -----BEGIN CERTIFICATE-----
      -----END CERTIFICATE-----
    key: |
      -----BEGIN RSA PRIVATE KEY-----
      -----END RSA PRIVATE KEY-----
    snis:
      - "*"
```

## Schema

| 필드         | 타입             | 설명                           | 기본값 |
| ------------ | ---------------- | ------------------------------ | ------ |
| `id`         | UUID             | 인증서의 고유 식별자           | -      |
| `cert`       | string           | PEM-encoded public certificate | -      |
| `key`        | string           | PEM-encoded private key        | -      |
| `snis`       | array of strings | SNI 이름 목록 (선택사항)       | -      |
| `tags`       | array of strings | 태그 목록 (선택사항)           | -      |
| `created_at` | timestamp        | 생성 시간                      | -      |
| `updated_at` | timestamp        | 마지막 업데이트 시간           | -      |

## Set up a Certificate

### 1. UI를 통한 설정

다음은 새로운 인증서를 만드는 방식입니다:

1. Gateway instance로 이동:
   - Konnect에서 sidebar의 **API Gateway**를 열고 control plane를 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Certificates**로 이동.
3. **New Certificate**를 클릭.
4. **Cert** field에, PEM-encoded public certificate를 입력합니다:
   ```
   -----BEGIN CERTIFICATE-----
   -----END CERTIFICATE-----
   ```
5. **Key** field에 PEM-encoded private key를 입력합니다:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   -----END RSA PRIVATE KEY-----
   ```
6. **Save** 클릭합니다.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/certificates/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "cert": "-----BEGIN CERTIFICATE-----\n-----END CERTIFICATE-----\n",
      "key": "-----BEGIN RSA PRIVATE KEY-----\n-----END RSA PRIVATE KEY-----\n",
      "snis": [
        "*"
      ]
    }
    '
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
certificates:
  - cert: |
      -----BEGIN CERTIFICATE-----
      -----END CERTIFICATE-----
    key: |
      -----BEGIN RSA PRIVATE KEY-----
      -----END RSA PRIVATE KEY-----
    snis:
      - "*"
```

### 4. Kong Ingress Controller (KIC)를 통한 설정

```yaml
apiVersion: configuration.konghq.com/v1
kind: KongCertificate
metadata:
  name: example-cert
  namespace: kong
  annotations:
    kubernetes.io/ingress.class: kong
cert: |
  -----BEGIN CERTIFICATE-----
  -----END CERTIFICATE-----
key: |
  -----BEGIN RSA PRIVATE KEY-----
  -----END RSA PRIVATE KEY-----
snis:
  - "*"
```

### 5. Terraform을 통한 설정

```hcl
resource "konnect_gateway_certificate" "my_certificate" {
  cert = <<EOF
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
EOF

  key = <<EOF
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
EOF

  snis = ["*"]
}
```

## FAQs

### Certificate 엔티티와 CA Certificate 엔티티의 차이점은 무엇인가요?

- **Certificate**: 암호화된 요청에 대한 SSL/TLS 종료를 처리합니다.
- **CA Certificate**: 클라이언트 또는 서버 인증서를 검증합니다.

### Certificate 엔티티가 Konnect의 Data Plane 노드에서도 사용되나요?

아니요, Data Plane 노드는 다른 인증서를 사용합니다.

## Related Resources

- [CA Certificate entity](ca-certificate.md)
- [SNI entity](snis.md)
- [SSL certificates reference](https://developer.konghq.com/gateway/ssl-certificates/)
- [Certificate how-to guides](https://developer.konghq.com/gateway/how-to/certificates/)
- [Reserved entity names](https://developer.konghq.com/gateway/reserved-entity-names/)
- [Konnect Control Plane resource limits](https://developer.konghq.com/konnect/resource-limits/)
