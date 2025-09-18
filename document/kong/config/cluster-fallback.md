# Cluster Fallback

## 개요

클러스터 폴백 설정은 Kong 하이브리드 모드에서 데이터 평면이 제어 평면과의 연결이 끊어졌을 때 사용할 수 있는 백업 구성 메커니즘을 제공합니다. 이를 통해 데이터 평면이 독립적으로 작동할 수 있도록 구성 파일을 가져오고 내보낼 수 있습니다.

### 주요 기능

- **구성 가져오기**: 데이터 평면이 제어 평면에서 구성 파일을 가져올 수 있습니다
- **구성 내보내기**: 제어 평면이 구성 변경사항을 외부 저장소에 내보낼 수 있습니다
- **클라우드 저장소 지원**: S3, GCS 등 다양한 클라우드 저장소를 지원합니다
- **자동 동기화**: 주기적으로 구성 변경사항을 동기화합니다

## 기본 설정

| 설정                             | 설명                                                                    | 기본값 |
| -------------------------------- | ----------------------------------------------------------------------- | ------ |
| `cluster_fallback_config_import` | 폴백 구성 가져오기를 활성화합니다. 데이터 평면에서만 활성화해야 합니다. | `off`  |
| `cluster_fallback_config_export` | 폴백 구성 내보내기를 활성화합니다.                                      | `off`  |

**중요 참고사항**: `cluster_fallback_config_import`는 데이터 평면에서만 활성화해야 합니다.

## 저장소 설정

| 설정                              | 설명                                                                                                | 기본값 |
| --------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| `cluster_fallback_config_storage` | `cluster_fallback_config_import`와 `cluster_fallback_config_export`에서 사용되는 저장소 정의입니다. | -      |

### 지원되는 저장소 타입

- **S3 호환 저장소**: Amazon S3, MinIO, Ceph 등
- **GCP Storage**: Google Cloud Storage

### 저장소 URL 형식

| 저장소 타입 | URL 형식              | 예시                            |
| ----------- | --------------------- | ------------------------------- |
| S3          | `s3://bucket/prefix`  | `s3://my-bucket/kong-configs/`  |
| GCS         | `gcs://bucket/prefix` | `gcs://my-bucket/kong-configs/` |

**예시**:

- S3 버킷 `my-bucket`에 `configs/` 접두사로 설정: `s3://my-bucket/configs/`
- GCS 버킷 `my-bucket`에 `configs/` 접두사로 설정: `gcs://my-bucket/configs/`

## 인증 설정

### S3 호환 저장소 인증

S3 호환 저장소의 경우 다음 환경 변수를 사용합니다:

| 환경 변수                     | 설명                                       |
| ----------------------------- | ------------------------------------------ |
| `AWS_ACCESS_KEY_ID`           | AWS 액세스 키 ID                           |
| `AWS_SECRET_ACCESS_KEY`       | AWS 시크릿 액세스 키                       |
| `AWS_CONFIG_STORAGE_ENDPOINT` | S3 호환 저장소의 엔드포인트 URL (선택사항) |

### GCP Storage 인증

GCP Storage의 경우 다음 환경 변수를 사용합니다:

| 환경 변수             | 설명                    |
| --------------------- | ----------------------- |
| `GCP_SERVICE_ACCOUNT` | GCP 서비스 계정 JSON 키 |

## 내보내기 설정

| 설정                                   | 설명                                                                | 기본값 | 최소 버전 |
| -------------------------------------- | ------------------------------------------------------------------- | ------ | --------- |
| `cluster_fallback_config_export_delay` | 폴백 구성 내보내기 간격(초)입니다.                                  | `60`   | -         |
| `cluster_fallback_export_s3_config`    | 폴백 구성 내보내기 S3 설정입니다. S3 호환 스키마일 때만 사용됩니다. | -      | 3.5       |

### 내보내기 동작 설명

- **지연 내보내기**: 간격이 60초로 설정되고 구성 A가 내보내진 후 다음 60초 내에 새로운 구성 B, C, D가 있으면 60초가 지날 때까지 기다린 후 D를 내보내고 B와 C는 건너뜁니다.
- **최신 구성 우선**: 동일한 간격 내에 여러 구성 변경이 있으면 가장 최신 구성만 내보냅니다.

### S3 추가 설정

`cluster_fallback_export_s3_config`는 JSON 형식의 테이블이어야 하며 다음 매개변수를 포함할 수 있습니다:

```json
{
  "ServerSideEncryption": "aws:kms",
  "SSEKMSKeyId": "your-kms-key-id",
  "StorageClass": "STANDARD_IA",
  "Metadata": {
    "environment": "production"
  }
}
```

**지원되는 S3 매개변수**:

- `ServerSideEncryption`: 서버 측 암호화 방식
- `SSEKMSKeyId`: KMS 키 ID
- `StorageClass`: 저장소 클래스
- `Metadata`: 메타데이터 키-값 쌍
- 기타 AWS S3 putObject 매개변수

## 사용 시나리오

### 1. 제어 평면 구성 내보내기

제어 평면에서 구성 변경사항을 클라우드 저장소에 자동으로 내보내려면:

```yaml
cluster_fallback_config_export: on
cluster_fallback_config_storage: "s3://my-bucket/kong-configs/"
cluster_fallback_config_export_delay: 60
```

### 2. 데이터 평면 구성 가져오기

데이터 평면에서 제어 평면과의 연결이 끊어졌을 때 백업 구성을 가져오려면:

```yaml
cluster_fallback_config_import: on
cluster_fallback_config_storage: "s3://my-bucket/kong-configs/"
```

### 3. GCP Storage 사용

GCP Storage를 사용하는 경우:

```yaml
cluster_fallback_config_export: on
cluster_fallback_config_storage: "gcs://my-bucket/kong-configs/"
```

## 환경 변수 설정 예시

### AWS S3 설정

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_CONFIG_STORAGE_ENDPOINT="https://s3.amazonaws.com"  # 선택사항
```

### MinIO 설정

```bash
export AWS_ACCESS_KEY_ID="minioadmin"
export AWS_SECRET_ACCESS_KEY="minioadmin"
export AWS_CONFIG_STORAGE_ENDPOINT="http://minio-server:9000"
```

### GCP Storage 설정

```bash
export GCP_SERVICE_ACCOUNT='{"type": "service_account", "project_id": "my-project", ...}'
```

## 운영 권장사항

### 보안 고려사항

- **액세스 키 보안**: AWS 액세스 키와 GCP 서비스 계정을 안전하게 관리하세요
- **최소 권한**: 저장소에 대한 최소한의 필요한 권한만 부여하세요
- **암호화**: 민감한 구성 데이터의 경우 서버 측 암호화를 사용하세요

### 성능 최적화

- **내보내기 간격**: 구성 변경 빈도에 맞게 `cluster_fallback_config_export_delay`를 조정하세요
- **저장소 클래스**: 비용과 성능을 고려하여 적절한 저장소 클래스를 선택하세요
- **네트워크 대역폭**: 대용량 구성 파일의 경우 네트워크 대역폭을 고려하세요

### 모니터링

- **내보내기 상태**: 구성 내보내기 성공/실패를 모니터링하세요
- **가져오기 상태**: 데이터 평면의 구성 가져오기 상태를 모니터링하세요
- **저장소 사용량**: 클라우드 저장소의 사용량과 비용을 모니터링하세요

### 장애 복구

- **다중 저장소**: 가능한 경우 여러 저장소에 백업을 유지하세요
- **정기적 테스트**: 폴백 메커니즘을 정기적으로 테스트하세요
- **구성 검증**: 가져온 구성의 유효성을 검증하세요
