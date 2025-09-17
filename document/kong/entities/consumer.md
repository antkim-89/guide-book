# [Consumer](https://developer.konghq.com/gateway/entities/consumer/)

## What is a Consumer?

Consumer는 Kong Gateway에서 관리하는 API를 사용하거나 소비하는 외부 클라이언트를 식별하는 엔티티입니다. Consumer는 API와 상호작용하는 애플리케이션, 서비스, 사용자들을 나타낼 수 있습니다. Kong Gateway는 Consumer를 정의하고 관리하는 것을 허용하고, 접근 제어 정책을 적용하고, API 사용량을 모니터링합니다.

Consumer는 API 접근을 관리하고, 사용량을 추적하고, 보안을 보장하기 위해 필수입니다. 그들은 Key Authentication, OAuth, 그리고 다른 인증 및 권한 부여 메커니즘에 의해 식별됩니다. 예를 들어, 게이트웨이 서비스 또는 경로에 기본 인증 플러그인을 추가하면 Consumer를 식별하거나 자격 증명이 유효하지 않은 경우 접근을 차단할 수 있습니다.

플러그인을 Consumer에게 직접 연결하면 요금 제한과 같은 특정 제어를 Consumer 수준에서 관리할 수 있습니다.

## Schema

Consumer의 스키마는 다음과 같습니다:

| 필드        | 타입             | 필수   | 기본값 | 설명                                                                |
| ----------- | ---------------- | ------ | ------ | ------------------------------------------------------------------- |
| `username`  | string           | 아니오 | -      | Consumer의 고유한 사용자명 (username 또는 custom_id 중 하나는 필수) |
| `custom_id` | string           | 아니오 | -      | 외부 시스템의 사용자 ID와 매핑할 수 있는 고유한 ID                  |
| `tags`      | array of strings | 아니오 | -      | Consumer에 대한 태그 목록                                           |

**참고사항:**

- `username`과 `custom_id` 중 적어도 하나는 반드시 설정해야 합니다.
- `username`은 Kong 내에서 고유해야 합니다.
- `custom_id`는 외부 시스템의 사용자 ID와 매핑하는 데 사용됩니다.
- Consumer는 인증 플러그인과 함께 사용되어 API 접근을 제어합니다.

## Use cases for Consumers

Consumers의 일반 사용 예시:

| Use case       | Description                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication | 클라이언트 인증은 Consumers를 설정하는 가장 일반적인 이유입니다. authentication plugin을 사용 중이라면 자격증명이 있는 Consumers가 필요합니다. |
| Rate limiting  | 유량 제어는 Consumer의 등급에 따라 세분화됩니다.                                                                                               |
| Transformation | Consumer를 기반으로 response body들에 따라 값을 추가하거나 제거합니다.                                                                         |

## Set up a Consumer

### 1. UI를 통한 설정

다음은 기본 구성을 사용하여 **example-consumer**라는 새로운 Consumer를 생성합니다:

1. Kong Manager 또는 Gateway Manager에서 **Consumers**로 이동합니다.
2. **New Consumer**를 클릭하세요.
3. 고유한 사용자명을 입력하세요. 예를 들어 `example-consumer`.
4. 선택적으로 Custom ID를 입력하세요.
5. **Save**를 클릭하세요.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/consumers/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "username": "example-consumer",
      "custom_id": "external-user-123"
    }'
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
consumers:
  - username: example-consumer
    custom_id: external-user-123
```

### 4. Terraform을 통한 설정

```hcl
resource "konnect_gateway_consumer" "my_consumer" {
  username = "example-consumer"
  custom_id = "external-user-123"
  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

## Consumer와 인증 플러그인

Consumer는 다양한 인증 플러그인과 함께 사용됩니다:

- **Key Authentication**: API 키를 통한 인증
- **Basic Authentication**: 사용자명/비밀번호를 통한 인증
- **JWT Authentication**: JWT 토큰을 통한 인증
- **OAuth2**: OAuth2 플로우를 통한 인증
- **LDAP Authentication**: LDAP 서버를 통한 인증

## Consumer Groups

Consumer Groups는 여러 Consumer를 그룹화하여 공통 정책을 적용할 수 있게 합니다:

- Consumer Groups에 플러그인을 적용하면 그룹 내 모든 Consumer에 적용됩니다.
- Rate limiting, ACL(Access Control List) 등의 정책을 그룹 단위로 관리할 수 있습니다.
- Consumer는 여러 Consumer Group에 속할 수 있습니다.

## Centrally-managed Consumers

Consumers는 Konnect region으로 범위를 지정하여 중앙에서 관리하거나, Gateway Manager의 Control plane으로 범위를 지정할 수 있습니다.

Centralized Consumer management는 다음과 같은 이점을 제공합니다:

- **중앙에서 Consumer ID를 설정**: 한번 Consumer를 정의하면, 여러 Control planes에서 정의하지 않아도 됩니다.
- **중복되는 Consumer 구성 충돌을 피할 수 있습니다**: 사용자가 Consumer identity 변화를 여러 Control Planes에 복제하지 않아도 되고, Consumer 구성이 충돌되지 않습니다.
- **Control Plane과 Data Plane들 간의 구성 동기화 이슈를 줄일 수 있습니다**: 중앙에서 관리되는 Consumer는 Control Plane에서 Data Plane으로 푸시되는 구성에 포함되지 않으므로 구성 크기와 지연 시간이 줄어듭니다.

중앙 관리되는 Consumer는 Control plane의 밖에 존재합니다. 그래서 Control plane 전반에서 사용 가능합니다.

다음 표를 사용하여 중앙 관리 Consumer 또는 Control Plane에 지정된 Consumer를 제어하기 위해 사용하십시오:

|                                                 | Centrally-managed Consumers | Control Plane scoped Consumer |
| ----------------------------------------------- | --------------------------- | ----------------------------- |
| 복수의 Control Plane간의 Consumer identity 공유 | O                           | X                             |
| 지원되는 인증 전략                              | Key auth                    | All                           |
| Consumer에게 직접 연결되는 Scope plugins        | X                           | O                             |
| Scope plugins to Consumer Groups                | O                           | O                             |

Konnect Consumers API를 사용하여 Consumer를 중앙 관리할 수 있습니다. 오직 Org admin과 Control Plane admin들이 이 Consumer들의 CRUD 권한을 갖습니다.

중앙 관리되는 Consumer를 만들 때, 반드시 영역에 할당해야 합니다. 영역은 조직화된 기준으로 정의된 Identity를 중심으로 Consumer를 그룹화합니다. 예를 들어, 생산 영역이나 개발 영역입니다. 영역들은 Konnect의 geographic region로 연결되어 있습니다. 또한 중앙 관리 Consumer는 Consumer가 인증할 수 있도록 특정 키 인증 구성을 설정해야 합니다.

## Consumer와 플러그인

Consumer에 플러그인을 직접 연결할 수 있습니다. Consumer에 첨부된 플러그인은 해당 Consumer의 모든 요청에 대해 실행됩니다:

- **Rate Limiting**: Consumer별로 요청 제한 설정
- **Request/Response Transformer**: Consumer별로 요청/응답 변환
- **IP Restriction**: Consumer별로 IP 접근 제한
- **ACL (Access Control List)**: Consumer별로 리소스 접근 권한 제어

## Consumer 관리 모범 사례

1. **명명 규칙**: Consumer의 username과 custom_id에 일관된 명명 규칙을 사용하세요.
2. **태그 활용**: Consumer를 분류하고 관리하기 위해 태그를 적극 활용하세요.
3. **Consumer Groups**: 관련된 Consumer들을 그룹화하여 관리하세요.
4. **정기적인 정리**: 사용하지 않는 Consumer는 정기적으로 정리하세요.
5. **보안**: Consumer의 인증 정보는 안전하게 관리하고 정기적으로 갱신하세요.
