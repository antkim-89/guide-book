# [CA Certificate](https://developer.konghq.com/gateway/entities/ca-certificate/)

## What is a CA Certificate?

CA 인증서 엔티티는 신뢰할 수 있는 인증서 기관을 나타냅니다. 이러한 엔티티는 Kong Gateway에서 클라이언트 또는 서버 인증서의 유효성을 확인하는 데 사용됩니다.

자체 관리되는 Kong Gateway에서는 모든 Workspace에 CA 인증서가 적용됩니다. 이는 Workspace를 알 수 없을 때 HTTP 요청을 받기 전에 SSL 핸드셰이크가 이루어지기 때문입니다. CA 인증서를 생성하면 모든 Workspace 아래에 표시됩니다.

서버 인증서를 확인하려면 CA 인증서를 정의할 수 있습니다:

- **전역적으로**: 모든 업스트림 서버 인증서의 검증을 지원합니다
- **특정 Gateway Service에서**: 특정 서비스에만 적용됩니다

클라이언트 인증서를 확인하려면 [Mutual TLS Authentication plugin](https://developer.konghq.com/plugins/mtls-auth/) 또는 [Header Cert Authentication plugin](https://developer.konghq.com/plugins/header-cert-auth/)을 사용할 수 있습니다.

## CA Certificate Schema

CA Certificate 엔티티의 전체 스키마는 다음과 같습니다:

| 필드명        | 타입   | 필수 여부 | 기본값 | 설명                                      |
| ------------- | ------ | --------- | ------ | ----------------------------------------- |
| `id`          | string | 아니오    | -      | CA Certificate의 고유 ID (자동 생성)      |
| `cert`        | string | 예        | -      | PEM 형식의 CA 인증서                      |
| `cert_digest` | string | 아니오    | -      | 인증서의 SHA256 다이제스트 (자동 생성)    |
| `tags`        | array  | 아니오    | -      | CA Certificate 태그                       |
| `created_at`  | number | 아니오    | -      | CA Certificate 생성 시간 (Unix timestamp) |

### CA Certificate 특징

- **전역 적용**: 모든 Workspace에 자동으로 적용됩니다
- **SSL 핸드셰이크**: HTTP 요청 전에 SSL 핸드셰이크에서 사용됩니다
- **인증서 검증**: 클라이언트 및 서버 인증서의 유효성을 검증합니다
- **보안**: mTLS 인증을 위한 신뢰할 수 있는 CA를 제공합니다

## Certificate Types

### Root CA Certificate

최상위 인증서 기관의 인증서입니다.

```pem
-----BEGIN CERTIFICATE-----
MIIB4TCCAYugAwIBAgIUAenxUyPjkSLCe2BQXoBMBacqgLowDQYJKoZIhvcNAQEL
BQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM
GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yNDEwMjgyMDA3NDlaFw0zNDEw
MjYyMDA3NDlaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw
HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwXDANBgkqhkiG9w0BAQEF
AANLADBIAkEAyzipjrbAaLO/yPg7lL1dLWzhqNdc3S4YNR7f1RG9whWhbsPE2z42
e6WGFf9hggP6xjG4qbU8jFVczpd1UPwGbQIDAQABo1MwUTAdBgNVHQ4EFgQUkPPB
ghj+iHOHAKJlC1gLbKT/ZHQwHwYDVR0jBBgwFoAUkPPBghj+iHOHAKJlC1gLbKT/
ZHQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAANBALfy49GvA2ld+u+G
Koxa8kCt7uywoqu0hfbBfUT4HqmXPvsuhz8RinE5ltxId108vtDNlD/+bKl+N5Ub
qKjBs0k=
-----END CERTIFICATE-----
```

### Intermediate CA Certificate

중간 인증서 기관의 인증서입니다.

### Self-Signed Certificate

자체 서명된 인증서입니다.

## Configuration Examples

### 기본 CA Certificate 설정

```json
{
  "cert": "-----BEGIN CERTIFICATE-----\nMIIB4TCCAYugAwIBAgIUAenxUyPjkSLCe2BQXoBMBacqgLowDQYJKoZIhvcNAQEL\nBQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM\nGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yNDEwMjgyMDA3NDlaFw0zNDEw\nMjYyMDA3NDlaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw\nHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwXDANBgkqhkiG9w0BAQEF\nAANLADBIAkEAyzipjrbAaLO/yPg7lL1dLWzhqNdc3S4YNR7f1RG9whWhbsPE2z42\ne6WGFf9hggP6xjG4qbU8jFVczpd1UPwGbQIDAQABo1MwUTAdBgNVHQ4EFgQUkPPB\nghj+iHOHAKJlC1gLbKT/ZHQwHwYDVR0jBBgwFoAUkPPBghj+iHOHAKJlC1gLbKT/\nZHQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAANBALfy49GvA2ld+u+G\nKoxa8kCt7uywoqu0hfbBfUT4HqmXPvsuhz8RinE5ltxId108vtDNlD/+bKl+N5Ub\nqKjBs0k=\n-----END CERTIFICATE-----\n"
}
```

### API를 통한 CA Certificate 관리

```bash
# CA Certificate 생성
curl -X POST http://localhost:8001/ca_certificates \
  --header "Content-Type: application/json" \
  --data '{
    "cert": "-----BEGIN CERTIFICATE-----\nMIIB4TCCAYugAwIBAgIUAenxUyPjkSLCe2BQXoBMBacqgLowDQYJKoZIhvcNAQEL\nBQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM\nGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yNDEwMjgyMDA3NDlaFw0zNDEw\nMjYyMDA3NDlaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw\nHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwXDANBgkqhkiG9w0BAQEF\nAANLADBIAkEAyzipjrbAaLO/yPg7lL1dLWzhqNdc3S4YNR7f1RG9whWhbsPE2z42\ne6WGFf9hggP6xjG4qbU8jFVczpd1UPwGbQIDAQABo1MwUTAdBgNVHQ4EFgQUkPPB\nghj+iHOHAKJlC1gLbKT/ZHQwHwYDVR0jBBgwFoAUkPPBghj+iHOHAKJlC1gLbKT/\nZHQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAANBALfy49GvA2ld+u+G\nKoxa8kCt7uywoqu0hfbBfUT4HqmXPvsuhz8RinE5ltxId108vtDNlD/+bKl+N5Ub\nqKjBs0k=\n-----END CERTIFICATE-----\n"
  }'

# CA Certificate 목록 조회
curl http://localhost:8001/ca_certificates

# 특정 CA Certificate 조회
curl http://localhost:8001/ca_certificates/{ca-cert-id}

# CA Certificate 삭제
curl -X DELETE http://localhost:8001/ca_certificates/{ca-cert-id}
```

### decK을 사용한 CA Certificate 설정

```yaml
_format_version: "3.0"
ca_certificates:
  - cert: |
      -----BEGIN CERTIFICATE-----
      MIIB4TCCAYugAwIBAgIUAenxUyPjkSLCe2BQXoBMBacqgLowDQYJKoZIhvcNAQEL
      BQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM
      GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yNDEwMjgyMDA3NDlaFw0zNDEw
      MjYyMDA3NDlaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEw
      HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwXDANBgkqhkiG9w0BAQEF
      AANLADBIAkEAyzipjrbAaLO/yPg7lL1dLWzhqNdc3S4YNR7f1RG9whWhbsPE2z42
      e6WGFf9hggP6xjG4qbU8jFVczpd1UPwGbQIDAQABo1MwUTAdBgNVHQ4EFgQUkPPB
      ghj+iHOHAKJlC1gLbKT/ZHQwHwYDVR0jBBgwFoAUkPPBghj+iHOHAKJlC1gLbKT/
      ZHQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAANBALfy49GvA2ld+u+G
      Koxa8kCt7uywoqu0hfbBfUT4HqmXPvsuhz8RinE5ltxId108vtDNlD/+bKl+N5Ub
      qKjBs0k=
      -----END CERTIFICATE-----
```

## mTLS 설정 예시

### Mutual TLS Authentication Plugin 사용

```yaml
_format_version: "3.0"
services:
  - name: secure-api
    url: https://secure-api.example.com
    routes:
      - name: secure-route
        paths:
          - /secure
plugins:
  - name: mtls-auth
    config:
      ca_certificates:
        - { ca-cert-id }
      skip_consumer_lookup: false
```

### Header Cert Authentication Plugin 사용

```yaml
_format_version: "3.0"
services:
  - name: header-cert-api
    url: https://header-cert-api.example.com
    routes:
      - name: header-cert-route
        paths:
          - /header-cert
plugins:
  - name: header-cert-auth
    config:
      ca_certificates:
        - { ca-cert-id }
      header_name: X-Client-Cert
```

## Best Practices

### CA Certificate 관리 원칙

1. **보안 저장**: CA 인증서를 안전하게 저장하고 접근을 제한합니다.

2. **정기적 갱신**: CA 인증서의 만료일을 모니터링하고 정기적으로 갱신합니다.

3. **백업**: CA 인증서를 안전한 곳에 백업합니다.

### 인증서 검증 설정

1. **전역 설정**: 모든 업스트림 서버에 대해 CA 인증서를 설정합니다.

2. **서비스별 설정**: 특정 서비스에만 CA 인증서를 적용할 수 있습니다.

3. **플러그인 통합**: mTLS 또는 Header Cert 인증 플러그인과 함께 사용합니다.

### 성능 최적화

1. **캐싱**: CA 인증서를 메모리에 캐싱하여 성능을 향상시킵니다.

2. **연결 풀링**: SSL 연결을 재사용하여 오버헤드를 줄입니다.

3. **모니터링**: 인증서 검증 실패를 모니터링합니다.

## Troubleshooting

### 일반적인 문제들

| 문제                     | 원인                   | 해결 방법              |
| ------------------------ | ---------------------- | ---------------------- |
| CA 인증서를 찾을 수 없음 | 잘못된 인증서 ID       | CA 인증서 ID 확인      |
| 인증서 검증 실패         | 잘못된 CA 인증서       | CA 인증서 유효성 확인  |
| SSL 핸드셰이크 실패      | 인증서 체인 불완전     | 전체 인증서 체인 확인  |
| mTLS 인증 실패           | 클라이언트 인증서 문제 | 클라이언트 인증서 확인 |
| 인증서 만료              | 인증서 만료일 초과     | 인증서 갱신            |

### 디버깅 방법

```bash
# CA Certificate 목록 확인
curl http://localhost:8001/ca_certificates

# 특정 CA Certificate 상세 정보
curl http://localhost:8001/ca_certificates/{ca-cert-id}

# Kong 상태 확인
curl http://localhost:8001/status

# SSL 연결 테스트
openssl s_client -connect api.example.com:443 -CAfile ca-cert.pem

# 인증서 체인 확인
openssl verify -CAfile ca-cert.pem client-cert.pem
```

### 인증서 검증 모니터링

```bash
# CA Certificate별 사용 현황
curl http://localhost:8001/ca_certificates | jq '.data[] | {id: .id, cert_digest: .cert_digest}'

# mTLS 플러그인 상태 확인
curl http://localhost:8001/plugins | jq '.data[] | select(.name == "mtls-auth")'

# SSL 연결 통계
curl http://localhost:8001/status | jq '.server.connections_accepted'
```

## FAQs

### CA Certificate가 모든 Workspace에 적용되나요?

네, CA Certificate는 모든 Workspace에 자동으로 적용됩니다. 이는 SSL 핸드셰이크가 HTTP 요청을 받기 전에 발생하고, 이 시점에서는 Workspace를 알 수 없기 때문입니다.

### 여러 CA Certificate를 사용할 수 있나요?

네, 여러 CA Certificate를 등록할 수 있습니다. Kong Gateway는 등록된 모든 CA Certificate를 사용하여 인증서를 검증합니다.

### CA Certificate를 업데이트할 수 있나요?

CA Certificate는 업데이트할 수 없습니다. 새로운 CA Certificate를 생성하고 기존 것을 삭제해야 합니다.

### Self-signed 인증서를 CA Certificate로 사용할 수 있나요?

네, Self-signed 인증서도 CA Certificate로 사용할 수 있습니다. 하지만 보안상 권장되지 않습니다.

### CA Certificate가 만료되면 어떻게 되나요?

CA Certificate가 만료되면 해당 CA로 서명된 인증서의 검증이 실패합니다. 정기적으로 CA Certificate를 갱신해야 합니다.
