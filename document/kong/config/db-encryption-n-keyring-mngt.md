# Database Encryption & Keyring Management

## 개요

Kong의 데이터베이스 암호화 및 키링 관리 기능을 활성화하면 Kong이 소비자 자격 증명, TLS 개인 키, RBAC 사용자 토큰 등과 같은 민감한 필드를 투명하게 암호화합니다. 암호화된 데이터는 Admin API에 표시되거나 플러그인이나 핵심 라우팅 로직에서 사용 가능하게 되기 전에 투명하게 복호화됩니다.

### 주요 특징

- **투명한 암호화**: 민감한 필드가 자동으로 암호화/복호화됩니다
- **다양한 암호화 전략**: 클러스터 및 Vault 전략을 지원합니다
- **키 관리**: 대칭 암호화 키의 안전한 관리
- **재해 복구**: 키링 백업 및 복구 지원

### 주의사항

- **GA 기능**: 이 기능은 GA이지만 키링 기능의 API에 대한 일반적인 의미론적 버전 호환성 보장을 제공하지 않습니다
- **데이터 손실 위험**: 키링 데이터의 잘못된 관리로 인해 복구 불가능한 데이터 손실이 발생할 수 있습니다

## 기본 키링 설정

| 설정               | 설명                                                                                                                                                                  | 기본값    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `keyring_enabled`  | 활성화되면 Kong이 데이터베이스에 쓰기 전에 민감한 필드 값을 암호화하고, Admin API, Developer Portal 또는 프록시 비즈니스 로직을 위해 데이터를 검색할 때 복호화합니다. | `off`     |
| `keyring_strategy` | Kong 노드가 대칭 암호화 키를 관리할 전략 구현을 정의합니다.                                                                                                           | `cluster` |

### keyring_strategy 유효한 값

- `cluster`: 클러스터 내에서 키를 관리
- `vault`: HashiCorp Vault를 사용하여 키를 관리

## RSA 키 쌍 설정

| 설정                  | 설명                                                                                        | 기본값 |
| --------------------- | ------------------------------------------------------------------------------------------- | ------ |
| `keyring_public_key`  | RSA 키 쌍의 공개 키를 정의합니다. 대칭 키링 가져오기/내보내기에 사용됩니다.                 | -      |
| `keyring_private_key` | RSA 키 쌍의 개인 키를 정의합니다. 대칭 키링 가져오기/내보내기에 사용됩니다.                 | -      |
| `keyring_blob_path`   | Kong이 초기 키링 자료를 백업할 파일시스템 경로를 정의합니다. 주로 개발 목적으로 유용합니다. | -      |

### 키 설정 방법

RSA 키는 다음 값 중 하나로 구성할 수 있습니다:

- **공개/개인 키의 절대 경로**
- **공개/개인 키 내용**
- **base64로 인코딩된 공개/개인 키 내용**

## Vault 설정

### 기본 Vault 설정

| 설정                  | 설명                                                      | 기본값 |
| --------------------- | --------------------------------------------------------- | ------ |
| `keyring_vault_host`  | Kong이 암호화 자료를 가져올 Vault 호스트를 정의합니다.    | -      |
| `keyring_vault_mount` | 대칭 키가 있는 Vault v2 KV 비밀 엔진의 이름을 정의합니다. | -      |
| `keyring_vault_path`  | 대칭 키가 있는 Vault v2 KV 경로의 이름을 정의합니다.      | -      |

### Vault 인증 설정

| 설정                                | 설명                                                                                                                          | 기본값                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `keyring_vault_auth_method`         | HashiCorp Vault 서비스에 연결할 때의 인증 메커니즘을 정의합니다.                                                              | `token`                                           |
| `keyring_vault_token`               | v2 KV Vault HTTP(S) API와 통신하는 데 사용되는 토큰 값을 정의합니다.                                                          | -                                                 |
| `keyring_vault_kube_role`           | 실행 중인 pod의 Kubernetes 서비스 계정을 사용하여 가정할 HashiCorp Vault 역할을 정의합니다.                                   | `default`                                         |
| `keyring_vault_kube_api_token_file` | 비표준 컨테이너 플랫폼 설정을 사용하는 경우 pod의 파일시스템에서 Kubernetes 서비스 계정 토큰을 읽어야 하는 위치를 정의합니다. | `/run/secrets/kubernetes.io/serviceaccount/token` |

### keyring_vault_auth_method 유효한 값

- `token`: `keyring_vault_token` 구성 속성에 정의된 정적 토큰을 사용합니다
- `kubernetes`: 실행 중인 pod의 매핑된 서비스 계정을 사용하여 `keyring_vault_kube_role` 구성 속성에 정의된 HashiCorp Vault 역할 이름을 가정하는 Kubernetes 인증 메커니즘을 사용합니다

### Vault 호스트 형식

`keyring_vault_host`는 다음 형식으로 정의해야 합니다:

```
<scheme>://<IP / HOSTNAME>:<PORT>
```

**예시**:

- `https://vault.example.com:8200`
- `http://192.168.1.100:8200`

## 키링 복구 설정 (최소 버전: 3.8)

| 설정                          | 설명                                                                                           | 기본값 | 최소 버전 |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ------ | --------- |
| `keyring_recovery_public_key` | 모든 키링 자료를 선택적으로 암호화하고 데이터베이스에 백업하는 데 사용할 공개 키를 정의합니다. | -      | 3.8       |
| `keyring_encrypt_license`     | 데이터베이스에 저장된 라이선스 페이로드에 대한 키링 암호화를 활성화합니다.                     | `off`  | 3.8       |

### 키링 복구 설정 방법

`keyring_recovery_public_key`는 다음 값 중 하나로 구성할 수 있습니다:

- **공개 키의 절대 경로**
- **공개 키 내용**
- **base64로 인코딩된 공개 키 내용**

## 신뢰할 수 없는 Lua 설정

| 설정                                | 설명                                                                                    | 기본값    |
| ----------------------------------- | --------------------------------------------------------------------------------------- | --------- |
| `untrusted_lua`                     | Admin API와 같은 관리자가 제공한 소스에서 Lua 함수 로딩을 제어합니다.                   | `sandbox` |
| `untrusted_lua_sandbox_requires`    | 샌드박스 환경 내에서 `require`로 로드할 수 있는 모듈의 쉼표로 구분된 목록입니다.        | -         |
| `untrusted_lua_sandbox_environment` | 샌드박스 환경 내에서 사용할 수 있게 해야 하는 전역 Lua 변수의 쉼표로 구분된 목록입니다. | -         |

### untrusted_lua 유효한 값

- `off`: 임의의 Lua 함수 로딩을 허용하지 않습니다. Serverless Functions 플러그인과 사용자 정의 Lua 함수를 허용하는 모든 변환 플러그인을 포함하여 임의의 Lua 코드를 실행하는 모든 기능을 비활성화합니다.
- `sandbox`: Lua 함수 로딩을 허용하지만 실행할 때 샌드박스를 사용합니다. 샌드박스된 함수는 전역 환경에 대한 제한된 액세스를 가지며 Kong PDK, OpenResty 및 일반적으로 Kong Gateway 노드에 해를 끼치지 않을 표준 Lua 함수에만 액세스할 수 있습니다.
- `on`: 함수가 전역 환경에 대한 무제한 액세스를 가지며 모든 Lua 모듈을 로드할 수 있습니다. 이는 Kong Gateway 2.3.0 이전의 동작과 유사합니다.

### 샌드박스 환경 제한사항

기본 샌드박스 환경에서는 다음이 허용되지 않습니다:

- 다른 모듈이나 라이브러리 가져오기
- OS 수준에서의 실행 (예: 파일 읽기/쓰기)
- 전역 환경 액세스

**예시**:

- **허용됨**: `local foo = 1 + 1`
- **허용되지 않음**: `os.execute("rm -rf /*")`
- **허용되지 않음**: `kong.configuration.pg_password` 액세스

### 샌드박스 사용자 정의

`untrusted_lua_sandbox_requires`와 `untrusted_lua_sandbox_environment`를 사용하여 샌드박스 환경을 사용자 정의할 수 있습니다.

**예시**:

```yaml
untrusted_lua_sandbox_requires: "resty.template, kong.tools.utils"
untrusted_lua_sandbox_environment: "custom_var, another_var"
```

**경고**: 특정 모듈이나 변수를 허용하면 샌드박스 탈출 기회가 생성될 수 있습니다. 예를 들어 `os` 또는 `luaposix`를 허용하는 것은 안전하지 않을 수 있습니다.

## 기타 설정

| 설정             | 설명                                                                                                                                                      | 기본값 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `openresty_path` | Kong이 사용할 OpenResty 설치 경로입니다. 비어 있으면(기본값) Kong이 시스템에 설치된 OpenResty를 검색하고 nginx 바이너리에 대한 $PATH 검색으로 대체합니다. | -      |
| `node_id`        | Kong 노드의 노드 ID입니다. Kong 클러스터의 모든 Kong 노드는 고유하고 유효한 UUID를 가져야 합니다. 비어 있으면 노드 ID가 자동으로 생성됩니다.              | -      |

## 보안 고려사항

### 키 관리

- **RSA 키 쌍**: 안전한 위치에 개인 키를 저장하세요
- **Vault 토큰**: Vault 토큰을 안전하게 관리하세요
- **키 로테이션**: 정기적으로 암호화 키를 로테이션하세요

### 샌드박스 보안

- **모듈 제한**: 필요한 모듈만 샌드박스에 허용하세요
- **전역 변수**: 위험한 전역 변수를 샌드박스에 노출하지 마세요
- **Admin API 보안**: 샌드박스가 활성화되어 있어도 Admin API 엔드포인트를 적절히 보호하세요

### 운영 권장사항

- **백업**: 키링 자료를 정기적으로 백업하세요
- **모니터링**: 암호화/복호화 오류를 모니터링하세요
- **테스트**: 재해 복구 절차를 정기적으로 테스트하세요

## 사용 예시

### 클러스터 전략 설정

```yaml
keyring_enabled: on
keyring_strategy: cluster
keyring_public_key: /path/to/public.pem
keyring_private_key: /path/to/private.pem
```

### Vault 전략 설정

```yaml
keyring_enabled: on
keyring_strategy: vault
keyring_vault_host: https://vault.example.com:8200
keyring_vault_mount: secret
keyring_vault_path: kong-keys
keyring_vault_auth_method: token
keyring_vault_token: your-vault-token
```

### 샌드박스 설정

```yaml
untrusted_lua: sandbox
untrusted_lua_sandbox_requires: "resty.template, kong.tools.utils"
untrusted_lua_sandbox_environment: "custom_config"
```
