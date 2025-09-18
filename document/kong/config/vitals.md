# Vitals

## 개요

Kong Vitals는 Kong의 성능에 대한 메트릭을 저장하고 보고하는 기능입니다. 다중 노드 설정에서 실행할 때 노드 유형에 따라 다른 의미를 가집니다.

### 주요 특징

- **성능 메트릭**: Kong의 성능 데이터를 수집하고 저장합니다
- **다양한 저장소**: 데이터베이스, Prometheus, InfluxDB 지원
- **노드별 기능**: 프록시 노드와 Admin 노드에서 다른 역할을 수행합니다
- **실시간 모니터링**: 대시보드에서 메트릭과 시각화를 제공합니다

### 노드별 Vitals 기능

| 노드 유형           | Vitals 기능 | 설명                                                             |
| ------------------- | ----------- | ---------------------------------------------------------------- |
| **Proxy-only 노드** | 데이터 수집 | Vitals 데이터를 수집할지 여부를 결정합니다                       |
| **Admin-only 노드** | 메트릭 표시 | 대시보드에서 Vitals 메트릭과 시각화를 표시할지 여부를 결정합니다 |

## 기본 Vitals 설정

| 설정     | 설명                                                        | 기본값 |
| -------- | ----------------------------------------------------------- | ------ |
| `vitals` | 활성화되면 Kong이 성능에 대한 메트릭을 저장하고 보고합니다. | `on`   |

## Vitals 저장소 전략 설정

| 설정              | 설명                                                                             | 기본값     |
| ----------------- | -------------------------------------------------------------------------------- | ---------- |
| `vitals_strategy` | Vitals 메트릭에 Kong 데이터베이스 또는 별도의 저장소 엔진을 사용할지 결정합니다. | `database` |

### vitals_strategy 유효한 값

| 값           | 설명                                             | 특징                      |
| ------------ | ------------------------------------------------ | ------------------------- |
| `database`   | Kong 데이터베이스를 사용하여 메트릭을 저장합니다 | 기본 설정, 간단한 설정    |
| `prometheus` | Prometheus를 사용하여 메트릭을 저장하고 읽습니다 | 외부 모니터링 시스템 통합 |
| `influxdb`   | InfluxDB를 사용하여 메트릭을 저장하고 읽습니다   | 시계열 데이터베이스 전용  |

## TSDB (Time Series Database) 설정

### 기본 TSDB 설정

| 설정                  | 설명                                                                    | 기본값 |
| --------------------- | ----------------------------------------------------------------------- | ------ |
| `vitals_tsdb_address` | Vitals 데이터가 기록되고 읽히는 TSDB 서버의 호스트와 포트를 정의합니다. | -      |

### TSDB 인증 설정

| 설정                   | 설명                     | 기본값 |
| ---------------------- | ------------------------ | ------ |
| `vitals_tsdb_user`     | InfluxDB 사용자명입니다. | -      |
| `vitals_tsdb_password` | InfluxDB 비밀번호입니다. | -      |

### TSDB 주소 형식

| 전략           | 주소 형식   | 예시                          |
| -------------- | ----------- | ----------------------------- |
| **Prometheus** | `host:port` | `prometheus.example.com:9090` |
| **InfluxDB**   | `host:port` | `influxdb.example.com:8086`   |

### 지원되는 주소 형식

- **IPv4**: `192.168.1.100:9090`
- **IPv6**: `[2001:db8::1]:9090`
- **호스트명**: `prometheus.example.com:9090`

### TSDB 전략별 동작

| 전략         | 읽기 소스       | 쓰기 소스                      | 설명                              |
| ------------ | --------------- | ------------------------------ | --------------------------------- |
| `prometheus` | Prometheus 서버 | StatsD (vitals_statsd_address) | Prometheus에서 읽고 StatsD로 전송 |
| `influxdb`   | InfluxDB 서버   | InfluxDB 서버                  | InfluxDB에서 읽고 쓰기            |

## StatsD 설정

### StatsD 서버 설정

| 설정                            | 설명                                                                                               | 기본값 |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| `vitals_statsd_address`         | Kong이 Vitals 메트릭을 전송해야 하는 StatsD 서버의 호스트와 포트(및 선택적 프로토콜)를 정의합니다. | -      |
| `vitals_statsd_prefix`          | 모든 Vitals StatsD 이벤트에 첨부되는 접두사 값을 정의합니다.                                       | `kong` |
| `vitals_statsd_udp_packet_size` | Vitals statsd 메트릭이 배치로 보관되고 전송될 최대 버퍼 크기를 정의합니다. (바이트 단위)           | `1024` |

### StatsD 주소 형식

| 프로토콜       | 형식            | 예시                          |
| -------------- | --------------- | ----------------------------- |
| **UDP (기본)** | `host:port`     | `statsd.example.com:8125`     |
| **TCP**        | `host:port tcp` | `statsd.example.com:8125 tcp` |

### StatsD 접두사 사용 사례

- **멀티 테넌트**: 여러 테넌트가 있는 StatsD 익스포터에서 유용합니다
- **네임스페이스**: 메트릭을 논리적으로 그룹화합니다
- **충돌 방지**: 다른 시스템의 메트릭과 충돌을 방지합니다

### UDP 패킷 크기 고려사항

| 크기                     | 장점                     | 단점                        |
| ------------------------ | ------------------------ | --------------------------- |
| **작은 크기 (512-1024)** | 빠른 전송, 낮은 지연     | 더 많은 패킷, 높은 오버헤드 |
| **큰 크기 (2048-4096)**  | 적은 패킷, 낮은 오버헤드 | 느린 전송, 높은 지연        |

## Prometheus 설정

| 설정                                | 설명                                                                                           | 기본값 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| `vitals_prometheus_scrape_interval` | Vitals 데이터를 읽을 때 Prometheus 서버에 전송되는 scrape_interval 쿼리 매개변수를 정의합니다. | `5`    |

### Prometheus 스크래핑 간격

- **목적**: Prometheus 서버의 스크래핑 간격과 일치해야 합니다
- **단위**: 초 단위
- **권장값**: Prometheus 서버 설정과 동일하게 설정

## Vitals 설정 예시

### 1. 데이터베이스 전략 (기본)

```yaml
vitals: on
vitals_strategy: database
```

### 2. Prometheus 전략

```yaml
vitals: on
vitals_strategy: prometheus
vitals_tsdb_address: prometheus.example.com:9090
vitals_statsd_address: statsd.example.com:8125
vitals_statsd_prefix: kong-prod
vitals_prometheus_scrape_interval: 10
```

### 3. InfluxDB 전략

```yaml
vitals: on
vitals_strategy: influxdb
vitals_tsdb_address: influxdb.example.com:8086
vitals_tsdb_user: kong
vitals_tsdb_password: secretpassword
```

### 4. TCP StatsD 사용

```yaml
vitals: on
vitals_strategy: prometheus
vitals_tsdb_address: prometheus.example.com:9090
vitals_statsd_address: statsd.example.com:8125 tcp
vitals_statsd_udp_packet_size: 2048
```

## 성능 고려사항

### 저장소별 성능 특성

| 저장소         | 성능 | 확장성 | 복잡성 |
| -------------- | ---- | ------ | ------ |
| **Database**   | 중간 | 제한적 | 낮음   |
| **Prometheus** | 높음 | 높음   | 중간   |
| **InfluxDB**   | 높음 | 높음   | 높음   |

### 메모리 사용량

- **Database**: Kong 데이터베이스와 공유하므로 추가 메모리 사용량이 적습니다
- **Prometheus**: 외부 저장소이므로 Kong 메모리에 영향을 주지 않습니다
- **InfluxDB**: 외부 저장소이므로 Kong 메모리에 영향을 주지 않습니다

### 네트워크 오버헤드

| 전략           | 네트워크 사용량 | 설명                   |
| -------------- | --------------- | ---------------------- |
| **Database**   | 낮음            | 로컬 데이터베이스 사용 |
| **Prometheus** | 중간            | StatsD로 메트릭 전송   |
| **InfluxDB**   | 중간            | InfluxDB로 직접 전송   |

## 보안 고려사항

### 인증 설정

- **InfluxDB 인증**: 사용자명과 비밀번호를 안전하게 관리하세요
- **네트워크 보안**: TSDB 서버와의 통신을 암호화하세요
- **접근 제어**: Vitals 데이터에 대한 접근을 제한하세요

### 데이터 보안

- **민감한 메트릭**: 민감한 성능 데이터를 보호하세요
- **로그 보안**: Vitals 관련 로그를 안전하게 관리하세요
- **백업**: Vitals 데이터를 정기적으로 백업하세요

## 운영 권장사항

### 모니터링 설정

- **메트릭 수집**: 적절한 수집 간격을 설정하세요
- **저장소 모니터링**: TSDB 서버의 상태를 모니터링하세요
- **성능 추적**: Vitals 수집이 Kong 성능에 미치는 영향을 모니터링하세요

### 용량 계획

- **데이터 보존**: 메트릭 데이터 보존 정책을 설정하세요
- **저장소 용량**: TSDB 서버의 용량을 계획하세요
- **정리 작업**: 오래된 메트릭 데이터를 정기적으로 정리하세요

### 문제 해결

- **연결 오류**: TSDB 서버 연결 문제를 모니터링하세요
- **메트릭 누락**: 메트릭 수집 중단을 감지하세요
- **성능 저하**: Vitals 수집으로 인한 성능 저하를 모니터링하세요

## 환경별 권장 설정

### 개발 환경

```yaml
vitals: on
vitals_strategy: database
```

### 스테이징 환경

```yaml
vitals: on
vitals_strategy: prometheus
vitals_tsdb_address: prometheus-staging.example.com:9090
vitals_statsd_address: statsd-staging.example.com:8125
```

### 프로덕션 환경

```yaml
vitals: on
vitals_strategy: influxdb
vitals_tsdb_address: influxdb-prod.example.com:8086
vitals_tsdb_user: kong-prod
vitals_tsdb_password: ${INFLUXDB_PASSWORD}
```
