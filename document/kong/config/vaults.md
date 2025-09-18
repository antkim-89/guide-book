# Vaults

## 개요

비밀(Secret)은 API 게이트웨이 운영에 필요한 모든 민감한 정보입니다. 비밀은 Kong Gateway 핵심 구성의 일부일 수 있고, 플러그인에서 사용되거나, 게이트웨이가 서비스하는 API와 관련된 구성의 일부일 수 있습니다.

### 일반적인 비밀 유형

- **데이터 스토어 사용자명 및 비밀번호**: PostgreSQL 및 Redis와 함께 사용
- **개인 X.509 인증서**
- **API 키**
- **민감한 플러그인 구성 필드**: 일반적으로 인증, 해싱, 서명 또는 암호화에 사용

Kong Gateway는 특정 값을 vault에 저장할 수 있게 해줍니다. 다음은 vault별 구성 옵션입니다.

## 환경 변수 Vault 설정

| 설정               | 설명                                                                                                                                                                             | 기본값 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `vault_env_prefix` | 환경 변수 vault의 기본 접두사를 정의합니다. 예를 들어 모든 비밀이 `SECRETS_`로 접두사가 붙은 환경 변수에 저장되어 있다면, 여기서 구성하여 Vault 참조에서 반복할 필요가 없습니다. | -      |

## AWS Secrets Manager 설정

| 설정                          | 설명                                                                                                                                                                                | 기본값      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `vault_aws_region`            | vault가 위치한 AWS 리전입니다.                                                                                                                                                      | -           |
| `vault_aws_endpoint_url`      | AWS SecretsManager 서비스 엔드포인트 URL입니다. 지정하지 않으면 vault에서 사용하는 값은 공식 AWS SecretsManager 서비스 URL인 `https://secretsmanager.<region>.amazonaws.com`입니다. | -           |
| `vault_aws_assume_role_arn`   | 가정할 대상 AWS IAM 역할 ARN입니다. 일반적으로 여러 역할 간 또는 크로스 계정 작업에 사용됩니다.                                                                                     | -           |
| `vault_aws_role_session_name` | 역할 가정에 사용되는 역할 세션 이름입니다.                                                                                                                                          | `KongVault` |
| `vault_aws_sts_endpoint_url`  | AWS Vault에서 역할 가정에 사용되는 사용자 정의 STS 엔드포인트 URL입니다.                                                                                                            | -           |

### AWS Vault 캐시 설정

| 설정                      | 설명                                                                                                             | 기본값 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| `vault_aws_ttl`           | 이 노드에서 캐시될 때 AWS vault의 비밀의 TTL(초)입니다.                                                          | `0`    |
| `vault_aws_neg_ttl`       | AWS vault 미스(비밀 없음)의 TTL(초)입니다.                                                                       | -      |
| `vault_aws_resurrect_ttl` | AWS vault에서 오래된 비밀을 새로 고칠 수 없을 때(예: AWS vault에 도달할 수 없음) 부활시켜야 하는 시간(초)입니다. | -      |

**참고**:

- `vault_aws_neg_ttl`이 지정되지 않으면 `vault_aws_ttl` 값이 사용됩니다.
- `vault_aws_ttl`이 0(기본값)으로 설정되면 캐시된 비밀이나 미스가 만료되지 않습니다.

## Google Cloud Platform (GCP) Secret Manager 설정

| 설정                   | 설명                                 | 기본값 |
| ---------------------- | ------------------------------------ | ------ |
| `vault_gcp_project_id` | Google API 콘솔의 프로젝트 ID입니다. | -      |

### GCP Vault 캐시 설정

| 설정                      | 설명                                                                                                             | 기본값 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| `vault_gcp_ttl`           | 이 노드에서 캐시될 때 GCP vault의 비밀의 TTL(초)입니다.                                                          | `0`    |
| `vault_gcp_neg_ttl`       | GCP vault 미스(비밀 없음)의 TTL(초)입니다.                                                                       | -      |
| `vault_gcp_resurrect_ttl` | GCP vault에서 오래된 비밀을 새로 고칠 수 없을 때(예: GCP vault에 도달할 수 없음) 부활시켜야 하는 시간(초)입니다. | -      |

**참고**:

- `vault_gcp_neg_ttl`이 지정되지 않으면 `vault_gcp_ttl` 값이 사용됩니다.
- `vault_gcp_ttl`이 0(기본값)으로 설정되면 캐시된 비밀이나 미스가 만료되지 않습니다.

## HashiCorp Vault 설정

### 기본 연결 설정

| 설정                  | 설명                                                                                                         | 기본값      |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| `vault_hcv_protocol`  | 연결에 사용할 프로토콜입니다. `http` 또는 `https` 중 하나를 허용합니다.                                      | `http`      |
| `vault_hcv_host`      | HashiCorp vault의 호스트명입니다.                                                                            | `127.0.0.1` |
| `vault_hcv_port`      | HashiCorp vault의 포트 번호입니다.                                                                           | `8200`      |
| `vault_hcv_namespace` | HashiCorp Vault의 네임스페이스입니다. Vault Enterprise는 성공적으로 연결하기 위해 네임스페이스가 필요합니다. | -           |
| `vault_hcv_mount`     | 마운트 포인트입니다.                                                                                         | `secret`    |
| `vault_hcv_kv`        | 비밀 엔진 버전입니다. `v1` 또는 `v2`를 허용합니다.                                                           | `v1`        |

### 인증 설정

| 설정                    | 설명                                                             | 기본값  |
| ----------------------- | ---------------------------------------------------------------- | ------- |
| `vault_hcv_token`       | 토큰 문자열입니다.                                               | -       |
| `vault_hcv_auth_method` | HashiCorp Vault 서비스에 연결할 때의 인증 메커니즘을 정의합니다. | `token` |

### vault_hcv_auth_method 유효한 값

- `token`: 토큰 기반 인증
- `kubernetes`: Kubernetes 서비스 계정 인증
- `approle`: AppRole 인증
- `cert`: 인증서 기반 인증 (최소 버전: 3.11)

### Kubernetes 인증 설정

| 설정                            | 설명                                                                                                                          | 기본값       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `vault_hcv_kube_role`           | 실행 중인 pod의 Kubernetes 서비스 계정에 대한 HashiCorp Vault 역할을 정의합니다.                                              | -            |
| `vault_hcv_kube_auth_path`      | Kubernetes 인증 메서드가 접근 가능한 위치입니다: `/v1/auth/<vault_hcv_kube_auth_path>`                                        | `kubernetes` |
| `vault_hcv_kube_api_token_file` | 비표준 컨테이너 플랫폼 설정을 사용하는 경우 pod의 파일시스템에서 Kubernetes 서비스 계정 토큰을 읽어야 하는 위치를 정의합니다. | -            |

### AppRole 인증 설정

| 설정                                  | 설명                                                                                                                    | 기본값    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- |
| `vault_hcv_approle_auth_path`         | AppRole 인증 메서드가 접근 가능한 위치입니다: `/v1/auth/<vault_hcv_approle_auth_path>`                                  | `approle` |
| `vault_hcv_approle_role_id`           | HashiCorp Vault의 AppRole 역할 ID입니다.                                                                                | -         |
| `vault_hcv_approle_secret_id`         | HashiCorp Vault의 AppRole 비밀 ID입니다.                                                                                | -         |
| `vault_hcv_approle_secret_id_file`    | pod의 파일시스템에서 비밀 ID를 읽어야 하는 위치를 정의합니다. 일반적으로 HashiCorp Vault의 응답 래핑과 함께 사용됩니다. | -         |
| `vault_hcv_approle_response_wrapping` | 구성 또는 파일에서 읽은 비밀 ID가 실제 비밀 ID 대신 실제로 응답 래핑 토큰인지 정의합니다.                               | `false`   |

### 인증서 인증 설정 (최소 버전: 3.11)

| 설정                            | 설명                                                                                     | 기본값 | 최소 버전 |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------ | --------- |
| `vault_hcv_cert_auth_role_name` | 구성된 신뢰할 수 있는 인증서 역할 이름입니다.                                            | -      | 3.11      |
| `vault_hcv_cert_auth_cert`      | `auth_method`가 `cert`로 설정된 경우 HashiCorp Vault 인증에 사용할 인증서의 내용입니다.  | -      | 3.11      |
| `vault_hcv_cert_auth_cert_key`  | `auth_method`가 `cert`로 설정된 경우 HashiCorp Vault 인증에 사용할 개인 키의 내용입니다. | -      | 3.11      |

### HashiCorp Vault 캐시 설정

| 설정                      | 설명                                                                                                                         | 기본값 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| `vault_hcv_ttl`           | 이 노드에서 캐시될 때 HashiCorp vault의 비밀의 TTL(초)입니다.                                                                | `0`    |
| `vault_hcv_neg_ttl`       | HashiCorp vault 미스(비밀 없음)의 TTL(초)입니다.                                                                             | -      |
| `vault_hcv_resurrect_ttl` | HashiCorp vault에서 오래된 비밀을 새로 고칠 수 없을 때(예: HashiCorp vault에 도달할 수 없음) 부활시켜야 하는 시간(초)입니다. | -      |

**참고**:

- `vault_hcv_neg_ttl`이 지정되지 않으면 `vault_hcv_ttl` 값이 사용됩니다.
- `vault_hcv_ttl`이 0(기본값)으로 설정되면 캐시된 비밀이나 미스가 만료되지 않습니다.

## Azure Key Vault 설정

### 기본 연결 설정

| 설정                    | 설명                                                                                                                | 기본값    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | --------- |
| `vault_azure_vault_uri` | vault에 접근할 수 있는 URI입니다.                                                                                   | -         |
| `vault_azure_client_id` | 등록된 애플리케이션의 클라이언트 ID입니다. Azure 대시보드를 방문하고 앱 등록을 선택하여 클라이언트 ID를 확인하세요. | -         |
| `vault_azure_tenant_id` | DirectoryId와 TenantId는 모두 ActiveDirectory 테넌트를 나타내는 GUID와 같습니다.                                    | -         |
| `vault_azure_type`      | Azure Key Vault에서 지원하는 비밀/키 데이터 유형입니다. Kong은 현재 Secrets만 지원합니다.                           | `secrets` |

### Azure Key Vault 캐시 설정

| 설정                        | 설명                                                                                                               | 기본값 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| `vault_azure_ttl`           | 이 노드에서 캐시될 때 Azure Key Vault의 비밀의 TTL(초)입니다.                                                      | `0`    |
| `vault_azure_neg_ttl`       | Azure Key Vault 미스(비밀 없음)의 TTL(초)입니다.                                                                   | -      |
| `vault_azure_resurrect_ttl` | Azure Key Vault에서 오래된 비밀을 새로 고칠 수 없을 때(예: vault에 도달할 수 없음) 부활시켜야 하는 시간(초)입니다. | -      |

**참고**:

- `vault_azure_neg_ttl`이 지정되지 않으면 `vault_azure_ttl` 값이 사용됩니다.
- `vault_azure_ttl`이 0(기본값)으로 설정되면 캐시된 비밀이나 미스가 만료되지 않습니다.

## Vault 사용 예시

### 환경 변수 Vault

```yaml
vault_env_prefix: "SECRETS_"
# SECRETS_DB_PASSWORD 환경 변수를 {vault://env/db-password}로 참조
```

### AWS Secrets Manager

```yaml
vault_aws_region: "us-west-2"
vault_aws_ttl: 3600
# {vault://aws/my-secret}로 참조
```

### HashiCorp Vault

```yaml
vault_hcv_protocol: "https"
vault_hcv_host: "vault.example.com"
vault_hcv_port: 8200
vault_hcv_auth_method: "token"
vault_hcv_token: "your-token"
# {vault://hcv/my-secret}로 참조
```

### Azure Key Vault

```yaml
vault_azure_vault_uri: "https://myvault.vault.azure.net/"
vault_azure_client_id: "your-client-id"
vault_azure_tenant_id: "your-tenant-id"
# {vault://azure/my-secret}로 참조
```

## 보안 고려사항

### 권장사항

- **최소 권한 원칙**: Vault에 대한 최소한의 필요한 권한만 부여하세요.
- **네트워크 보안**: 가능한 경우 Vault 연결에 TLS를 사용하세요.
- **토큰 관리**: 정기적으로 인증 토큰을 로테이션하세요.
- **감사 로깅**: Vault 액세스에 대한 감사 로그를 활성화하세요.

### TTL 설정

- **짧은 TTL**: 민감한 비밀의 경우 짧은 TTL을 사용하여 보안을 강화하세요.
- **긴 TTL**: 자주 액세스하는 비밀의 경우 긴 TTL을 사용하여 성능을 향상시키세요.
- **Resurrect TTL**: Vault 서비스 중단에 대한 복원력을 위해 적절한 resurrect TTL을 설정하세요.
