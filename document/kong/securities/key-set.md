# [Key Sets](https://developer.konghq.com/gateway/entities/key-set/)

## What is a Key Set?

Key Set는 Kong Gateway 키 모음입니다.

Key Set에 하나 또는 여러 개의 키를 할당할 수 있습니다. 이는 특정 애플리케이션이나 서비스에 사용할 여러 키를 논리적으로 그룹화하는 데 유용할 수 있습니다. Key Set을 사용하면 플러그인에게 특정 키 목록에 대한 액세스 권한을 부여할 수 있습니다.

Key Set은 다음의 plugin들과 함께 사용됩니다:

- [ACME](https://developer.konghq.com/plugins/acme/), `config.account_key.key_set` parameter와 함께
- [JWE Decrypt](https://developer.konghq.com/plugins/jwe-decrypt/), `config.key_sets` parameter와 함께
- [JWT Signer](https://developer.konghq.com/plugins/jwt-signer/), `config.access_token_keyset` parameter와 함께

## Schema

| 필드         | 타입      | 설명                  | 기본값 |
| ------------ | --------- | --------------------- | ------ |
| `id`         | UUID      | Key Set의 고유 식별자 | -      |
| `name`       | string    | Key Set의 이름        | -      |
| `tags`       | array     | 태그 목록 (선택사항)  | -      |
| `created_at` | timestamp | 생성 시간             | -      |
| `updated_at` | timestamp | 마지막 업데이트 시간  | -      |

## Set up a Key Set

### 1. decK을 통한 설정

```yaml
_format_version: "3.0"
key-sets:
  - name: example-key-set
```

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/key-sets/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "name": "example-key-set"
    }
    '
```

### 3. Konnect API를 통한 설정

```bash
curl -X POST https://{region}.api.konghq.com/v2/control-planes/{controlPlaneId}/core-entities/key-sets \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer $KONNECT_TOKEN" \
    --data '
    {
      "name": "example-key-set"
    }
    '
```

**참고**: 다음 플레이스홀더를 실제 값으로 교체해야 합니다:

- `region`: Kong Konnect가 호스팅되고 운영되는 지리적 지역
- `controlPlaneId`: 컨트롤 플레인의 `id`
- `KONNECT_TOKEN`: Konnect 계정과 연결된 Personal Access Token (PAT)

지역별 URL과 Personal Access Token에 대한 자세한 내용은 [Konnect API 참조](https://developer.konghq.com/konnect/api/)를 참조하세요.

## Key Set과 Key 연결하기

Key Set을 생성한 후, 개별 Key들을 해당 Key Set에 연결할 수 있습니다. 이는 플러그인 설정에서 Key Set을 참조할 때 유용합니다.

### Key를 Key Set에 연결하는 방법

1. **Admin API를 통한 연결**:

   ```bash
   # Key Set에 Key 추가
   curl -X POST http://localhost:8001/key-sets/{key-set-id}/keys \
       --header "Accept: application/json" \
       --header "Content-Type: application/json" \
       --data '{"key": {"id": "{key-id}"}}'
   ```

2. **decK을 통한 연결**:
   ```yaml
   _format_version: "3.0"
   key-sets:
     - name: example-key-set
       keys:
         - name: example-key-1
         - name: example-key-2
   ```

## 사용 사례

### 1. JWT 토큰 서명을 위한 키 그룹화

```yaml
key-sets:
  - name: jwt-signing-keys
    keys:
      - name: jwt-rsa-key-1
      - name: jwt-rsa-key-2
```

### 2. JWE 암호화를 위한 키 그룹화

```yaml
key-sets:
  - name: jwe-encryption-keys
    keys:
      - name: jwe-rsa-key
      - name: jwe-ec-key
```

### 3. ACME 인증서 관리를 위한 키 그룹화

```yaml
key-sets:
  - name: acme-account-keys
    keys:
      - name: acme-account-key
```

## Related Resources

- [Key entity](key.md)
- [Reserved entity names](https://developer.konghq.com/gateway/reserved-entity-names/)
- [Konnect Control Plane resource limits](https://developer.konghq.com/konnect/resource-limits/)
- [ACME Plugin](https://developer.konghq.com/plugins/acme/)
- [JWE Decrypt Plugin](https://developer.konghq.com/plugins/jwe-decrypt/)
- [JWT Signer Plugin](https://developer.konghq.com/plugins/jwt-signer/)
