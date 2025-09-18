# Konnect

## Konnect 모드 설정

| 설정           | 설명                                           | 기본값 |
| -------------- | ---------------------------------------------- | ------ |
| `konnect_mode` | 활성화되면 데이터플레인이 Konnect에 연결됩니다 | `off`  |

## Konnect 분석 설정

| 설정                          | 설명                                                                                                            | 기본값   | 최소 버전 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| `analytics_flush_interval`    | 로컬 분석 및 라이선싱 데이터가 데이터베이스 또는 Konnect로 플러시되는 최대 빈도(초)를 지정합니다.               | `1`      | -         |
| `analytics_buffer_size_limit` | Konnect에 대한 네트워크 연결이 없는 경우 데이터를 삭제하기 전에 로컬에서 버퍼링할 수 있는 최대 메시지 수입니다. | `100000` | -         |
| `analytics_debug`             | Kong 로그에 분석 페이로드를 출력합니다.                                                                         | `off`    | 3.5       |

## 개요

Kong Konnect는 Kong의 클라우드 기반 관리 플랫폼입니다. 데이터플레인을 Konnect에 연결하여 중앙 집중식 관리와 모니터링을 제공합니다.

### 주요 특징

- **클라우드 연결**: 데이터플레인을 Konnect 클라우드에 연결
- **분석 데이터**: 사용량 및 성능 분석 데이터 수집
- **중앙 관리**: 클라우드 기반 중앙 집중식 관리
- **실시간 모니터링**: 실시간 성능 및 사용량 모니터링

## Konnect 모드 설정

konnect_mode
When enabled, the dataplane is connected to Konnect

Default: off

Analytics for Konnect
analytics_flush_interval
Specify the maximum frequency, in seconds, at which local analytics and licensing data are flushed to the database or Konnect, depending on the installation mode. Kong also triggers a flush when the number of messages in the buffer is less than analytics_buffer_size_limit, regardless of whether the specified time interval has elapsed.

Default: 1
analytics_buffer_size_limit
Max number of messages can be buffered locally before dropping data in case there is no network connection to Konnect.

Default: 100000
analytics_debug
Min Version:
3.5
Outputs analytics payload to Kong logs.

Default: off
