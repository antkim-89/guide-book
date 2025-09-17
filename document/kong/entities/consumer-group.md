# [Consumer Group](https://developer.konghq.com/gateway/entities/consumer-group/)

## What is a Consumer Group?

Consumer Groups는 API 생태계 내에서 Consumer(사용자 또는 애플리케이션)의 구성과 분류를 가능하게 합니다. Consumer를 그룹화하면 개별적으로 관리할 필요가 없어지며, 확장 가능하고 효율적인 구성 관리 접근 방식을 제공할 수 있습니다.

Consumer Groups를 사용하면 특정 Consumer Group으로 플러그인을 범위 지정할 수 있으며, 각 개별 Consumer Group에 대해 새로운 플러그인 인스턴스가 생성되어 구성과 사용자 지정이 더욱 유연하고 편리해집니다. Consumer Groups 범위에서 사용할 수 있는 모든 플러그인에 대해서는 [Plugin scopes reference](https://developer.konghq.com/gateway/entities/plugin/#plugin-scopes)를 참조하세요.

예를 들어 Gold와 Silver라는 그룹을 만들고 각각 다른 유량 제어를 적용한 후, 그룹별로 다른 플러그인을 사용할 수 있습니다.

Consumer Groups 없이, 다섯 Consumer들의 유량 제어를 해야 한다면 rate limit을 변경할 때마다 모든 consumer를 개별적으로 업데이트해야 합니다.

Consumer Groups는 플러그인 구성을 중앙에서 관리하게 하고, 동시에 Kong Gateway 구성의 크기를 줄입니다. 이 예제에서는 두 개의 플러그인을 사용하는 것과 다섯 개의 플러그인을 사용하는 것의 차이입니다만, 프로덕션 환경에서는 두 개의 플러그인과 500만 개의 플러그인의 차이일 수 있습니다.

### Schema

Consumer Group의 스키마는 다음과 같습니다:

| 필드   | 타입             | 필수   | 기본값 | 설명                            |
| ------ | ---------------- | ------ | ------ | ------------------------------- |
| `name` | string           | 예     | -      | Consumer Group의 고유한 이름    |
| `tags` | array of strings | 아니오 | -      | Consumer Group에 대한 태그 목록 |

**참고사항:**

- `name`은 Kong 내에서 고유해야 합니다.
- Consumer Group은 Consumer들을 그룹화하여 공통 정책을 적용하는 데 사용됩니다.
- Consumer Group에 플러그인을 적용하면 그룹 내 모든 Consumer에 적용됩니다.

## Use cases

일반적인 Consumer Groups 사용 사례:

| Use case                       | Description                                                                                                                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 권한 관리                      | Consumer Groups를 사용하면 다양한 레벨의 권한을 가진 사용자 세트를 정의할 수 있습니다. 예를 들어, 일반 사용자, 프리미엄 사용자 및 관리자를 위한 별도의 Consumer Groups를 만들 수 있습니다.                                                                                      |
| 역할 관리                      | 조직 내에는 서로 다르게 API와 상호작용하는 다양한 부서나 팀이 있을 수 있습니다. 이러한 다양한 역할에 맞게 Consumer Groups를 만들면 API 사용 경험을 사용자 지정할 수 있습니다. 예를 들어, 조직에는 마케팅 팀, 개발 팀, 지원 팀을 위한 별도의 Consumer Groups가 있을 수 있습니다. |
| 자원 할당량과 유량 제어        | Consumer Groups는 서로 다른 Consumer 세트에 자원 할당과 유량 제어를 시행할 수 있습니다. 예를 들어, 구독 요금제에 따라 Consumer Groups마다 다른 요금 제한을 적용할 수 있습니다.                                                                                                  |
| 플러그인 구성 커스터마이징하기 | 플러그인을 특정하게 정의된 그룹에만 적용할 수 있는 기능을 통해, 다양한 Consumer Groups는 요구 사항에 따라 서로 다른 플러그인 구성을 가질 수 있습니다. 예를 들어, 한 그룹은 추가 요청 변환이 필요할 수 있고 다른 그룹은 전혀 필요하지 않을 수 있습니다.                          |

## Set up a Consumer Group

### 1. UI를 통한 설정

다음은 기본 구성을 사용하여 **my-group**이라는 새로운 Consumer Group을 생성합니다:

1. Kong Manager 또는 Gateway Manager에서 **Consumer Groups**로 이동합니다.
2. **New Consumer Group**을 클릭하세요.
3. 고유한 이름을 입력하세요. 예를 들어 `my-group`.
4. **Save**를 클릭하세요.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/consumer_groups/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "my-group"
    }'
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
consumer_groups:
  - name: my-group
```

### 4. Terraform을 통한 설정

```hcl
resource "konnect_gateway_consumer_group" "my_consumer_group" {
  name = "my-group"
  control_plane_id = konnect_gateway_control_plane.my_konnect_cp.id
}
```

### 5. Kubernetes를 통한 설정

```yaml
apiVersion: configuration.konghq.com/v1
kind: KongConsumerGroup
metadata:
  name: my-group
  annotations:
    kubernetes.io/ingress.class: kong
```

## Consumer Group과 Consumer 연결

Consumer를 Consumer Group에 추가하려면:

### Admin API를 통한 연결

```bash
curl -i -X POST http://localhost:8001/consumer_groups/my-group/consumers \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "consumer": "consumer-id-or-username"
    }'
```

### Consumer Group에서 Consumer 제거

```bash
curl -i -X DELETE http://localhost:8001/consumer_groups/my-group/consumers/consumer-id-or-username
```

## Consumer Group과 플러그인

Consumer Group에 플러그인을 적용할 수 있습니다. Consumer Group에 첨부된 플러그인은 그룹 내 모든 Consumer에 적용됩니다:

- **Rate Limiting**: Consumer Group별로 요청 제한 설정
- **ACL (Access Control List)**: Consumer Group별로 리소스 접근 권한 제어
- **Request/Response Transformer**: Consumer Group별로 요청/응답 변환
- **IP Restriction**: Consumer Group별로 IP 접근 제한

### Consumer Group에 플러그인 적용 예시

```bash
curl -i -X POST http://localhost:8001/consumer_groups/my-group/plugins \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "rate-limiting-advanced",
      "config": {
        "limit": [10],
        "window_size": [60],
        "sync_rate": 10
      }
    }'
```

## Consumer Group 우선순위

Consumer가 여러 Consumer Group에 속한 경우, 플러그인 우선순위는 다음과 같이 결정됩니다:

- **알파벳 순서**: Consumer Group 이름의 알파벳 순서에 따라 우선순위가 결정됩니다.
- **플러그인 우선순위**: 동일한 플러그인이 여러 Consumer Group에 적용된 경우, 알파벳 순서가 빠른 그룹의 설정이 우선 적용됩니다.

## Consumer Group 관리 모범 사례

1. **명명 규칙**: Consumer Group의 이름에 일관된 명명 규칙을 사용하세요.
2. **태그 활용**: Consumer Group을 분류하고 관리하기 위해 태그를 적극 활용하세요.
3. **계층적 구조**: 조직 구조에 맞게 Consumer Group을 계층적으로 구성하세요.
4. **정기적인 정리**: 사용하지 않는 Consumer Group은 정기적으로 정리하세요.
5. **문서화**: Consumer Group의 목적과 정책을 명확히 문서화하세요.

## Consumer Group vs Consumer 플러그인

| 구분        | Consumer Group 플러그인  | Consumer 플러그인 |
| ----------- | ------------------------ | ----------------- |
| 적용 범위   | 그룹 내 모든 Consumer    | 개별 Consumer     |
| 관리 복잡도 | 낮음 (중앙 관리)         | 높음 (개별 관리)  |
| 구성 크기   | 작음                     | 큼                |
| 유연성      | 그룹 단위 제어           | 개별 제어         |
| 사용 사례   | 대규모 조직, 계층적 관리 | 세밀한 개별 제어  |
