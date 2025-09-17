# [Vaults](https://developer.konghq.com/gateway/entities/vault/)

## What is a Vault?

Vault를 사용하면 다른 엔티티의 비밀을 안전하게 저장한 다음 참조할 수 있습니다. 이렇게 하면 `kong.conf`, 선언적 구성 파일, 로그 또는 UI와 같은 곳에서 플랫폼 전체의 일반 텍스트로 비밀이 표시되지 않습니다.

예를 들어, 인증서와 키를 Vault에 저장한 다음 [Certificate entity](certificate.md)에서 참조할 수 있습니다. 이렇게 하면 인증서와 키가 엔티티에 직접 저장되지 않고 더 안전해집니다.

## How do I add secrets to a Vault?

다음 방법으로 Vault에 비밀을 추가할 수 있습니다:

- 환경 변수
- Konnect Config Store
- 지원되는 타사 백엔드 Vault

## What can be stored as a secret?

Vault에서 다음을 비밀로 저장하고 참조할 수 있습니다:

- `kong.conf`에 설정된 모든 값들 (예: PostgreSQL, Redis 데이터베이스 사용자명과 비밀번호, 개인 X.509 인증서)
- Certificate Kong Gateway 엔티티에 저장된 인증서와 키
- Kong Gateway 라이선스
- 참조 가능한 플러그인 필드 (예: 타사 API 키)

> **Konnect Config Store 제한사항:**
>
> - Konnect Config Store Vault에 저장된 비밀은 `kong.conf`에서 참조할 수 없습니다. Kong Gateway가 Control Plane에 연결한 후 Konnect가 비밀을 해결하기 때문입니다.
> - 같은 이유로 Kong PDK를 통해 Lua 코드에서 Konnect Config Store 비밀을 직접 사용할 수 없습니다.
> - Konnect에서는 Kong Gateway 라이선스가 Konnect에서 관리되고 저장되므로 수동으로 Vault에 저장할 필요가 없습니다.

## Schema

| 필드          | 타입      | 설명                  | 기본값 |
| ------------- | --------- | --------------------- | ------ |
| `id`          | UUID      | Vault의 고유 식별자   | -      |
| `name`        | string    | Vault의 이름          | -      |
| `description` | string    | Vault 설명 (선택사항) | -      |
| `prefix`      | string    | Vault 접두사          | -      |
| `config`      | object    | Vault 백엔드 설정     | -      |
| `tags`        | array     | 태그 목록 (선택사항)  | -      |
| `created_at`  | timestamp | 생성 시간             | -      |
| `updated_at`  | timestamp | 마지막 업데이트 시간  | -      |

## Supported Vault backends

각 Vault에는 자체적으로 필요한 구성이 있습니다. Vault 엔티티를 생성하거나 특정 환경 변수를 구성하여 이 구성을 제공한 후 Kong Gateway를 시작할 수 있습니다.

| Backend                                                                                                                        | Kong Gateway OSS | Kong Gateway Enterprise | Konnect supported |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------------- | ----------------- |
| [Environment variable](https://developer.konghq.com/gateway/entities/vault/#store-secrets-as-environment-variables)            | O                | O                       | O                 |
| [Konnect (Konnect Config Store)](https://developer.konghq.com/how-to/configure-the-konnect-config-store/)                      | X                | X                       | O                 |
| [AWS Secrets Manager](https://developer.konghq.com/how-to/configure-aws-secrets-manager-as-a-vault-backend-with-vault-entity/) | X                | O                       | O                 |
| Azure Key Vaults                                                                                                               | X                | O                       | O                 |
| [Google Cloud Secret](https://developer.konghq.com/how-to/configure-google-cloud-secret-as-a-vault-backend/)                   | X                | O                       | O                 |
| [HashiCorp Vault](https://developer.konghq.com/how-to/configure-hashicorp-vault-as-a-vault-backend/)                           | X                | O                       | O                 |
| [CyberArk Conjur v3.11+](https://developer.konghq.com/how-to/configure-cyberark-as-a-vault-backend/)                           | X                | O                       | O                 |

## How do I reference secrets stored in a Vault?

Vault에 저장된 secret을 사용하려면 secret을 Vault reference와 함께 참조할 수 있습니다. `vault` reference는 `kong.conf`, 선언적 구성 파일, 로그 또는 UI와 같은 곳에서 사용할 수 있습니다.

Vault 백엔드는 객체 내부에 여러 관련 비밀을 저장할 수 있지만, 참조는 항상 문자열 값으로 해결되는 키를 가리켜야 합니다. 예를 들어, 다음 참조가 있습니다:

```
{vault://hcv/pg/username}
```

HashiCorp Vault 내부에 있는 `pg`라는 secret 객체를 가리키면 다음 값을 반환할 수 있습니다:

```json
{
  "username": "john",
  "password": "doe"
}
```

Kong Gateway는 페이로드를 수신하고 `{vault://hcv/pg/username}`의 secret reference를 위해 `"john"`의 `"username"` 값을 추출합니다.

참조된 전체 값에 대해 Vault reference를 사용해야 합니다. 인증 토큰 `ABC123`을 사용하여 업스트림 서비스를 호출한다고 상상해 보세요:

| Works | Configuration Value                       | Vault Value   |
| ----- | ----------------------------------------- | ------------- |
| ❌    | Bearer {vault://hcv/myservice-auth-token} | ABC123        |
| ✅    | {vault://hcv/myservice-auth-token}        | Bearer ABC123 |

## Secret rotation in Vaults

기본적으로 Kong Gateway는 백그라운드에서 매분마다 secret을 자동으로 새로고침합니다. Vault 엔티티 구성을 사용하여 Kong Gateway가 secret을 새로 고치는 빈도를 설정할 수도 있습니다.

두 가지 유형의 새로 고침 구성을 사용할 수 있습니다:

- TTL을 사용하여 주기적으로 새로 고침: 예를 들어, 하루에 한 번 새 TLS 인증서 확인
- 실패 시 새로 고침: 예를 들어 데이터베이스 인증 실패 시 비밀이 업데이트되었는지 확인한 후 다시 시도합니다

자세한 정보는 [Secret management](https://developer.konghq.com/gateway/secrets-management/)를 참조하세요.

## Set up a Vault

### 1. UI를 통한 설정

다음은 새로운 Vault를 만드는 방식입니다:

1. Gateway instance로 이동:
   - Konnect에서 sidebar의 **API Gateway**를 열고 control plane를 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Vaults**로 이동.
3. **New Vault**를 클릭.
4. 구성할 Vault 유형을 선택합니다. 예: `env`
5. Vault의 접두사를 입력합니다. 예: `my-env-vault`
6. Vault에 대한 설명을 입력합니다. 예: `ENV vault for secrets`
7. **Save**를 클릭합니다.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/vaults/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "name": "env",
      "description": "ENV vault for secrets",
      "prefix": "my-env-vault",
      "config": {
        "prefix": "MY_SECRET_"
      }
    }
    '
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
vaults:
  - name: env
    description: ENV vault for secrets
    prefix: my-env-vault
    config:
      prefix: MY_SECRET_
```

### 4. Konnect API를 통한 설정

```bash
curl -X POST https://{region}.api.konghq.com/v2/control-planes/{controlPlaneId}/core-entities/vaults/ \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer $KONNECT_TOKEN" \
    --data '
    {
      "name": "env",
      "description": "ENV vault for secrets",
      "prefix": "my-env-vault",
      "config": {
        "prefix": "MY_SECRET_"
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
apiVersion: configuration.konghq.com/v1alpha1
kind: KongVault
metadata:
  name: env-vault
  namespace: kong
  annotations:
    kubernetes.io/ingress.class: kong
spec:
  backend: env
  description: ENV vault for secrets
  prefix: my-env-vault
  config:
    prefix: MY_SECRET_
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

resource "konnect_gateway_vault" "my_vault" {
  description = "ENV vault for secrets"
  prefix = "my-env-vault"
  config = {
    prefix = "MY_SECRET_"
  }

  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

## Store secrets as environment variables

Vault 엔티티나 타사 백엔드 Vault를 구성하는 대신 secret을 환경 변수로 저장할 수 있습니다.

| Use case                            | Environment variable example                               | Secret reference example                                                     |
| ----------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Single secret value                 | `export MY_SECRET_VALUE=example-secret`                    | `{vault://env/my-secret-value}`                                              |
| Multiple secrets (flat JSON string) | `export PG_CREDS='{"username":"user", "password":"pass"}'` | `{vault://env/pg-creds/username}` <br> <br>`{vault://env/pg-creds/password}` |

## AWS Secrets Manager credentials

AWS Secrets Manager에 저장된 비밀에 액세스하려면 필요한 비밀 값을 읽을 수 있는 충분한 권한을 가진 IAM 역할로 Kong Gateway를 구성해야 합니다.

Kong Gateway는 사용자의 AWS 환경을 기반으로 IAM 역할 자격 증명을 자동으로 가져올 수 있으며, 다음과 같은 우선순위 순서를 준수합니다:

- 환경 변수 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`에 정의된 자격 증명에서 가져옵니다.
- 정의된 `AWS_PROFILE`과 `AWS_SHARED_CREDENTIALS_FILE`로 프로필 및 자격 증명 파일에서 가져오기.
- ECS [container credential provider](https://docs.aws.amazon.com/sdkref/latest/guide/feature-container-credentials.html)에서 가져오기.
- EKS [IAM roles for service account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)에서 가져오기.
- EC2 IMDS 메타데이터에서 가져옵니다. v1과 v2 모두 지원됩니다.

Kong Gateway는 또한 역할 가정(`vaults.config.assume_role_arn` 및 `vaults.config.role_session_name`)을 지원하여 AWS Secrets Manager에서 secret을 가져오는 다른 IAM 역할을 사용할 수 있도록 합니다. 이는 권한 분할 및 거버넌스와 AWS 계정 간 관리에서 흔히 볼 수 있는 관행입니다.

## FAQs

### Vaults에서 사용할 수 있는 필드 유형은 무엇인가요?

Vaults는 "참조 가능한" 필드와 함께 작동합니다. `kong.conf`의 모든 필드가 참조 가능하며, 엔티티 내의 일부 필드(예: 플러그인, 인증서)도 마찬가지입니다. 자세한 내용은 해당 엔티티 문서를 참조하세요.

### 사용자 정의 플러그인 개발 중에 Vaults를 참조할 수 있나요?

네. 플러그인 개발 키트(PDK)는 Vault 참조를 해결, 구문 분석 및 검증하는 데 사용할 수 있는 Vaults 모듈(`kong.vault`)을 제공합니다.

### Vault에서 비밀을 참조할 때 사용할 수 있는 데이터 유형은 무엇인가요?

비밀 참조는 문자열 값을 가리킵니다. 현재 다른 데이터 유형은 지원되지 않습니다.

### 여러 버전이 있는 비밀이 있는 경우, 비밀을 참조할 때 이전 버전을 어떻게 지정하나요?

여러 버전이 있는 비밀이 있는 경우, 참조에서 버전을 지정하여 현재 버전이나 이전 버전에 액세스할 수 있습니다.

다음 AWS 예제에서 `AWSCURRENT`는 최신 비밀 버전을 참조하고 `AWSPREVIOUS`는 이전 버전을 참조합니다:

```
# AWSCURRENT의 경우, 버전 지정하지 않음
{vault://aws/secret-name/foo}

# AWSCURRENT의 경우, 버전 == 1 지정
{vault://aws/secret-name/foo#1}

# AWSPREVIOUS의 경우, 버전 == 2 지정
{vault://aws/secret-name/foo#2}
```

이는 버전이 있는 비밀이 있는 모든 공급자에 적용됩니다.

### AWS Secret Manager의 비밀 이름에 백슬래시(/)가 있는 경우, Kong Gateway에서 이 비밀을 어떻게 참조하나요?

슬래시 기호(`/`)는 AWS Secrets Manager의 비밀 이름에 유효한 문자입니다. 슬래시로 시작하거나 연속된 두 개의 슬래시가 있는 비밀 이름을 참조하려면 이름의 슬래시 중 하나를 URL 인코딩 형식으로 변환하세요. 예를 들어:

- `/secret/key`라는 이름의 비밀은 `{vault://aws/%2Fsecret/key}`로 참조해야 합니다.
- `secret/path//aaa/key`라는 이름의 비밀은 `{vault://aws/secret/path/%2Faaa/key}`로 참조해야 합니다.

Kong Gateway는 비밀 참조를 유효한 URL로 해결하려고 시도하므로, URL 인코딩된 슬래시 대신 슬래시를 사용하면 예상치 못한 비밀 이름 가져오기가 발생합니다.

### 여러 AWS Secret Manager 지역에 비밀이 저장되어 있는 경우, Kong Gateway에서 이 비밀들을 어떻게 참조하나요?

`config.region` 매개변수와 함께 지역당 하나씩 여러 Vault 엔티티를 생성할 수 있습니다. 그런 다음 Vault 이름으로 비밀을 참조합니다:

```
{vault://aws-eu-central-vault/secret-name/foo}
{vault://aws-us-west-vault/secret-name/snip}
```

### Google Workload Identity를 사용하는 경우, Vault를 어떻게 구성하나요?

GKE 클러스터에서 Workload Identity와 함께 GCP Secret Manager를 사용하려면 서비스 계정(`GCP_SERVICE_ACCOUNT`)이 파드에 연결되도록 파드 스펙을 업데이트하세요. 구성 정보는 [Workload Identity 구성 문서](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)를 참조하세요.

> **참고:**
>
> - Workload Identity를 사용할 때는 `GCP_SERVICE_ACCOUNT` 설정이 필요하지 않습니다.
> - GCP Vault를 백엔드로 사용할 때는 공식 GCP API에서 사용하는 SSL 인증서를 Kong Gateway가 신뢰할 수 있도록 `lua_ssl_trusted_certificate` 구성 지시문의 일부로 `system`을 구성했는지 확인하세요.

### Kong Gateway는 HashiCorp Vault에서 비밀을 어떻게 검색하나요?

Kong Gateway는 두 단계 프로세스를 통해 HashiCorp Vault의 HTTP API에서 비밀을 검색합니다: 인증 및 비밀 검색.

**1단계: 인증**

`config.auth_method`에 정의된 인증 방법에 따라 Kong Gateway는 다음 방법 중 하나를 사용하여 HashiCorp Vault에 인증합니다:

- `token` 인증 방법을 사용하는 경우, Kong Gateway는 `config.token`을 클라이언트 토큰으로 사용합니다.
- `kubernetes` 인증 방법을 사용하는 경우, Kong Gateway는 파드에 마운트된 서비스 계정 JWT 토큰(`config.kube_api_token_file`에 정의된 경로)을 사용하여 HashiCorp Vault 서버의 Kubernetes 인증 경로에 대한 로그인 API를 호출하고 클라이언트 토큰을 검색합니다.
- v3.4+ `approle` 인증 방법을 사용하는 경우, Kong Gateway는 AppRole 자격 증명을 사용하여 클라이언트 토큰을 검색합니다. AppRole 역할 ID는 `config.approle_role_id` 필드로 구성되고, 비밀 ID는 `config.approle_secret_id` 또는 `config.approle_secret_id_file` 필드로 구성됩니다.

**2단계: 비밀 검색**

Kong Gateway는 인증 단계에서 검색한 클라이언트 토큰을 사용하여 Read Secret API를 호출하고 비밀 값을 검색합니다. 요청은 사용 중인 비밀 엔진 버전에 따라 달라집니다. Kong Gateway는 읽기 비밀 API의 응답을 자동으로 구문 분석하고 비밀 값을 반환합니다.

## Related Resources

- [Secrets Management](https://developer.konghq.com/gateway/secrets-management/)
- [Workspaces](https://developer.konghq.com/gateway/workspaces/)
- [RBAC](https://developer.konghq.com/gateway/rbac/)
- [Reserved entity names](https://developer.konghq.com/gateway/reserved-entity-names/)
- [Managing sensitive data with decK](https://developer.konghq.com/gateway/managing-sensitive-data-with-deck/)
- [Konnect Control Plane resource limits](https://developer.konghq.com/konnect/resource-limits/)
