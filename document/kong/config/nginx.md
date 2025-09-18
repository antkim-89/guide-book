# Nginx Configuration

## 프록시 서버 설정

| 설정           | 설명                                                                                                                                                                                                             | 기본값                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `proxy_listen` | 프록시 서버가 HTTP/HTTPS 트래픽을 수신해야 하는 주소와 포트의 쉼표로 구분된 목록입니다. 프록시 서버는 Kong의 공개 진입점으로, 소비자의 트래픽을 백엔드 서비스로 프록시합니다. IPv4, IPv6, 호스트명을 허용합니다. | `["0.0.0.0:8000 reuseport backlog=16384", "0.0.0.0:8443 http2 ssl reuseport backlog=16384"]` |
| `proxy_url`    | Kong 프록시 URL입니다. 마이크로서비스 또는 서비스 메시 지향 아키텍처에서 일반적으로 사용됩니다.                                                                                                                  | -                                                                                            |

### proxy_listen 접미사 옵션

- `ssl`: 특정 주소/포트를 통한 모든 연결이 TLS가 활성화된 상태로 이루어져야 합니다.
- `http2`: 클라이언트가 Kong의 프록시 서버에 HTTP/2 연결을 열 수 있습니다.
- `proxy_protocol`: 주어진 주소/포트에 대해 PROXY 프로토콜 사용을 활성화합니다.
- `deferred`: Linux에서 지연된 수락을 사용하도록 지시합니다 (TCP_DEFER_ACCEPT 소켓 옵션).
- `bind`: 주어진 주소:포트 쌍에 대해 별도의 bind() 호출을 수행하도록 지시합니다.
- `reuseport`: 각 워커 프로세스에 대해 개별 수신 소켓을 생성하여 커널이 워커 프로세스 간에 들어오는 연결을 더 잘 분산할 수 있도록 합니다.
- `backlog=N`: 대기 중인 TCP 연결 큐의 최대 길이를 설정합니다.
- `ipv6only=on|off`: 와일드카드 주소 [::]에서 수신하는 IPv6 소켓이 IPv6 연결만 또는 IPv6와 IPv4 연결 모두를 수락할지 지정합니다.
- `so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]`: 수신 소켓의 TCP keepalive 동작을 구성합니다.

### proxy_url 형식

```
<scheme>://<IP / HOSTNAME>(:<PORT>(/<PATH>))
```

**예시**:

- `http://127.0.0.1:8000`
- `https://proxy.domain.tld`
- `http://dev-machine/dev-285`

## 스트림 모드 설정

| 설정            | 설명                                                                                                   | 기본값 |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| `stream_listen` | 스트림 모드가 수신해야 하는 주소와 포트의 쉼표로 구분된 목록입니다. IPv4, IPv6, 호스트명을 허용합니다. | `off`  |

### stream_listen 접미사 옵션

- `ssl`: 특정 주소/포트를 통한 모든 연결이 TLS가 활성화된 상태로 이루어져야 합니다.
- `proxy_protocol`: 주어진 주소/포트에 대해 PROXY 프로토콜 사용을 활성화합니다.
- `bind`: 주어진 주소:포트 쌍에 대해 별도의 bind() 호출을 수행하도록 지시합니다.
- `reuseport`: 각 워커 프로세스에 대해 개별 수신 소켓을 생성합니다.
- `backlog=N`: 대기 중인 TCP 연결 큐의 최대 길이를 설정합니다.
- `ipv6only=on|off`: IPv6 소켓이 IPv6 연결만 또는 IPv6와 IPv4 연결 모두를 수락할지 지정합니다.
- `so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]`: TCP keepalive 동작을 구성합니다.

**예시**:

- `stream_listen = 127.0.0.1:7000 reuseport backlog=16384`
- `stream_listen = 0.0.0.0:989 reuseport backlog=65536, 0.0.0.0:20`
- `stream_listen = [::1]:1234 backlog=16384`

## Admin API 설정

| 설정            | 설명                                                                                                                                  | 기본값                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `admin_api_uri` | **사용 중단됨**: `admin_gui_api_url`을 사용하세요.                                                                                    | -                                                                                                |
| `admin_listen`  | Admin 인터페이스가 수신해야 하는 주소와 포트의 쉼표로 구분된 목록입니다. Admin 인터페이스는 Kong을 구성하고 관리할 수 있는 API입니다. | `["127.0.0.1:8001 reuseport backlog=16384", "127.0.0.1:8444 http2 ssl reuseport backlog=16384"]` |

**보안 권장사항**: Admin API를 공개 인터페이스에 노출하지 않도록 `0.0.0.0:8001`과 같은 값을 사용하지 마세요.

## 기타 API 설정

| 설정            | 설명                                                                                                                                                                                           | 기본값                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `status_listen` | Status API가 수신해야 하는 주소와 포트의 쉼표로 구분된 목록입니다. Status API는 모니터링 도구가 현재 Kong 노드의 메트릭, 상태 및 기타 비민감 정보를 검색할 수 있는 읽기 전용 엔드포인트입니다. | `127.0.0.1:8007 reuseport backlog=16384` |
| `debug_listen`  | Debug API가 수신해야 하는 주소와 포트의 쉼표로 구분된 목록입니다.                                                                                                                              | `off`                                    |

### API 접미사 옵션

- `ssl`: 특정 주소/포트를 통한 모든 연결이 TLS가 활성화된 상태로 이루어져야 합니다.
- `http2`: 클라이언트가 Kong의 API 서버에 HTTP/2 연결을 열 수 있습니다.
- `proxy_protocol`: PROXY 프로토콜 사용을 활성화합니다.

**예시**:

- `status_listen = 0.0.0.0:8100 ssl http2`
- `debug_listen = 0.0.0.0:8200 ssl http2`

## Nginx 프로세스 설정

| 설정                     | 설명                                                                                                                            | 기본값      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nginx_user`             | 워커 프로세스에서 사용할 사용자 및 그룹 자격 증명을 정의합니다. 그룹이 생략되면 사용자와 동일한 이름의 그룹이 사용됩니다.       | `kong kong` |
| `nginx_worker_processes` | Nginx가 생성할 워커 프로세스의 수를 결정합니다.                                                                                 | `auto`      |
| `nginx_daemon`           | Nginx가 데몬으로 실행될지 포그라운드 프로세스로 실행될지 결정합니다. 주로 개발이나 Docker 환경에서 Kong을 실행할 때 유용합니다. | `on`        |

**참고**: kong 사용자와 kong 그룹을 사용할 수 없는 경우, 기본 사용자 및 그룹 자격 증명은 nobody nobody가 됩니다.

## 메모리 캐시 설정

| 설정                       | 설명                                                                                          | 기본값 |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------ |
| `mem_cache_size`           | 전통적인 모드 데이터베이스 엔티티와 런타임 데이터를 위한 두 개의 공유 메모리 캐시 크기입니다. | `128m` |
| `consumers_mem_cache_size` | 소비자 및 자격 증명을 위한 공유 메모리 캐시 크기입니다.                                       | `128m` |

**참고**: `mem_cache_size`는 두 개의 다른 캐시 영역을 제어하므로 Kong이 엔티티를 캐시하는 데 사용하는 총 메모리는 이 값의 두 배일 수 있습니다.

## SSL/TLS 설정

| 설정                        | 설명                                                                                          | 기본값            |
| --------------------------- | --------------------------------------------------------------------------------------------- | ----------------- |
| `ssl_cipher_suite`          | Nginx가 제공하는 TLS 암호를 정의합니다.                                                       | `intermediate`    |
| `ssl_ciphers`               | Nginx가 제공할 사용자 정의 TLS 암호 목록을 정의합니다.                                        | -                 |
| `ssl_protocols`             | 클라이언트 측 연결에 대해 지정된 프로토콜을 활성화합니다.                                     | `TLSv1.2 TLSv1.3` |
| `ssl_prefer_server_ciphers` | SSLv3 및 TLS 프로토콜을 사용할 때 서버 암호가 클라이언트 암호보다 우선되어야 함을 지정합니다. | `on`              |
| `ssl_dhparam`               | DHE 암호에 대한 DH 매개변수를 정의합니다.                                                     | -                 |
| `ssl_session_tickets`       | TLS 세션 티켓을 통한 세션 재개를 활성화하거나 비활성화합니다.                                 | `on`              |
| `ssl_session_timeout`       | 클라이언트가 세션 매개변수를 재사용할 수 있는 시간을 지정합니다.                              | `1d`              |
| `ssl_session_cache_size`    | 세션 매개변수를 저장하는 캐시의 크기를 설정합니다.                                            | `10m`             |

### ssl_cipher_suite 유효한 값

- `modern`: 최신 암호 스위트
- `intermediate`: 중간 암호 스위트
- `old`: 구형 암호 스위트 (TLSv1.1을 활성화하려면 이 값을 사용)
- `fips`: FIPS 암호 스위트
- `custom`: 사용자 정의 암호 스위트

## 인증서 설정

| 설정                  | 설명                                                                                                                     | 기본값    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------- |
| `ssl_cert`            | TLS가 활성화된 proxy_listen 값에 대한 인증서의 쉼표로 구분된 목록입니다.                                                 | 자동 생성 |
| `ssl_cert_key`        | TLS가 활성화된 proxy_listen 값에 대한 키의 쉼표로 구분된 목록입니다.                                                     | 자동 생성 |
| `client_ssl`          | Nginx가 업스트림 서비스와 프록시 요청 시 클라이언트 측 TLS 인증서를 전송하고 상호 TLS 인증을 수행해야 하는지 결정합니다. | `off`     |
| `client_ssl_cert`     | client_ssl이 활성화된 경우 proxy_ssl_certificate 지시문에 대한 클라이언트 인증서입니다.                                  | -         |
| `client_ssl_cert_key` | client_ssl이 활성화된 경우 proxy_ssl_certificate_key 지시문에 대한 클라이언트 TLS 키입니다.                              | -         |
| `admin_ssl_cert`      | TLS가 활성화된 admin_listen 값에 대한 인증서의 쉼표로 구분된 목록입니다.                                                 | -         |
| `admin_ssl_cert_key`  | TLS가 활성화된 admin_listen 값에 대한 키의 쉼표로 구분된 목록입니다.                                                     | -         |
| `status_ssl_cert`     | TLS가 활성화된 status_listen 값에 대한 인증서의 쉼표로 구분된 목록입니다.                                                | -         |
| `status_ssl_cert_key` | TLS가 활성화된 status_listen 값에 대한 키의 쉼표로 구분된 목록입니다.                                                    | -         |
| `debug_ssl_cert`      | TLS가 활성화된 debug_listen 값에 대한 인증서의 쉼표로 구분된 목록입니다.                                                 | -         |
| `debug_ssl_cert_key`  | TLS가 활성화된 debug_listen 값에 대한 키의 쉼표로 구분된 목록입니다.                                                     | -         |

### 인증서 설정 방법

인증서와 키는 다음 값 중 하나로 구성할 수 있습니다:

- 인증서의 절대 경로
- 인증서 내용
- base64로 인코딩된 인증서 내용

## 헤더 설정

| 설정               | 설명                                                                         | 기본값                                                     |
| ------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `headers`          | Kong이 클라이언트 응답에 주입해야 하는 헤더의 쉼표로 구분된 목록입니다.      | `["server_tokens", "latency_tokens", "X-Kong-Request-Id"]` |
| `headers_upstream` | Kong이 업스트림에 대한 요청에 주입해야 하는 헤더의 쉼표로 구분된 목록입니다. | `X-Kong-Request-Id`                                        |

### headers 유효한 값

- `Server`: Kong이 생성한 응답에 `Server: kong/x.y.z`를 주입합니다.
- `Via`: 성공적으로 프록시된 요청에 `Via: kong/x.y.z`를 주입합니다.
- `X-Kong-Proxy-Latency`: Kong이 요청을 처리하고 업스트림으로 프록시하기 전에 모든 플러그인을 실행하는 데 걸린 시간(밀리초)입니다.
- `X-Kong-Response-Latency`: Kong이 응답을 생성하는 데 걸린 시간(밀리초)입니다.
- `X-Kong-Upstream-Latency`: 업스트림 서비스가 응답 헤더를 보내는 데 걸린 시간(밀리초)입니다.
- `X-Kong-Admin-Latency`: Kong이 Admin API 요청을 처리하는 데 걸린 시간(밀리초)입니다.
- `X-Kong-Upstream-Status`: 업스트림 서비스가 반환한 HTTP 상태 코드입니다.
- `X-Kong-Request-Id`: 요청의 고유 식별자입니다.
- `X-Kong-Total-Latency`: 클라이언트로부터 첫 번째 바이트를 읽은 시점부터 클라이언트에게 마지막 바이트를 보낸 후 로그를 작성하는 시점까지 경과한 시간(밀리초)입니다.
- `X-Kong-Third-Party-Latency`: DNS 해결, HTTP 클라이언트 호출, 소켓 작업, Redis 작업을 포함한 모든 서드파티 지연 시간의 누적 합계입니다.
- `X-Kong-Client-Latency`: Kong이 클라이언트로부터 헤더와 본문을 받기 위해 기다리는 시간과 클라이언트가 Kong으로부터 응답을 읽기/받기 위해 기다리는 시간입니다.
- `server_tokens`: Server와 Via를 모두 지정하는 것과 같습니다.
- `latency_tokens`: X-Kong-Proxy-Latency, X-Kong-Response-Latency, X-Kong-Admin-Latency, X-Kong-Upstream-Latency를 모두 지정하는 것과 같습니다.
- `advanced_latency_tokens`: X-Kong-Proxy-Latency, X-Kong-Response-Latency, X-Kong-Admin-Latency, X-Kong-Upstream-Latency, X-Kong-Total-Latency, X-Kong-Third-Party-Latency, X-Kong-Client-Latency를 모두 지정하는 것과 같습니다.

## IP 및 프록시 설정

| 설정                | 설명                                                                                        | 기본값      |
| ------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `trusted_ips`       | 올바른 X-Forwarded-\* 헤더를 보내는 것으로 알려진 신뢰할 수 있는 IP 주소 블록을 정의합니다. | -           |
| `real_ip_header`    | 클라이언트 주소를 대체하는 데 사용될 요청 헤더 필드를 정의합니다.                           | `X-Real-IP` |
| `real_ip_recursive` | ngx_http_realip_module의 동일한 이름 지시문을 설정합니다.                                   | `off`       |

**특별한 값**:

- 모든 IP를 신뢰하려면 `0.0.0.0/0,::/0`로 설정하세요.
- `unix:`를 지정하면 모든 UNIX 도메인 소켓이 신뢰됩니다.

## 오류 처리 설정

| 설정                 | 설명                                                                                          | 기본값       |
| -------------------- | --------------------------------------------------------------------------------------------- | ------------ |
| `error_default_type` | 요청 Accept 헤더가 누락되고 Nginx가 요청에 대해 오류를 반환할 때 사용할 기본 MIME 타입입니다. | `text/plain` |

**유효한 값**: `text/plain`, `text/html`, `application/json`, `application/xml`

## 업스트림 연결 설정

| 설정                              | 설명                                                                                     | 기본값  |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ------- |
| `upstream_keepalive_pool_size`    | 업스트림 keepalive 연결 풀의 기본 크기를 설정합니다.                                     | `512`   |
| `upstream_keepalive_max_requests` | 하나의 keepalive 연결을 통해 프록시할 수 있는 업스트림 요청의 기본 최대 수를 설정합니다. | `10000` |
| `upstream_keepalive_idle_timeout` | 업스트림 keepalive 연결이 열려 있어야 하는 기본 타임아웃(초)을 설정합니다.               | `60`    |

## 디버그 설정

| 설정                 | 설명                                                                                                                                                                                                       | 기본값 | 최소 버전 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------- |
| `allow_debug_header` | Kong-Debug 헤더 기능을 활성화합니다. 켜져 있으면 클라이언트 요청 헤더 `Kong-Debug: 1`이 있을 때 Kong이 응답에 Kong-Route-Id, Kong-Route-Name, Kong-Service-Id, Kong-Service-Name 디버그 헤더를 추가합니다. | `off`  | -         |
| `debug_listen_local` | Kong prefix 아래의 Unix 도메인 소켓을 통해 debug_listen 기능을 노출합니다.                                                                                                                                 | `on`   | 3.5       |

## Nginx 주입 지시문

Nginx 지시문은 사용자 정의 Nginx 구성 템플릿 없이 런타임 nginx.conf 파일에 동적으로 주입할 수 있습니다.

### 네임스페이스

| 네임스페이스                  | 설명                                                              |
| ----------------------------- | ----------------------------------------------------------------- |
| `nginx_main_<directive>`      | Kong의 구성 main 컨텍스트에 `<directive>`를 주입합니다.           |
| `nginx_events_<directive>`    | Kong의 events {} 블록에 `<directive>`를 주입합니다.               |
| `nginx_http_<directive>`      | Kong의 http {} 블록에 `<directive>`를 주입합니다.                 |
| `nginx_proxy_<directive>`     | Kong의 프록시 서버 {} 블록에 `<directive>`를 주입합니다.          |
| `nginx_location_<directive>`  | Kong의 프록시 / location 블록에 `<directive>`를 주입합니다.       |
| `nginx_upstream_<directive>`  | Kong의 프록시 upstream {} 블록에 `<directive>`를 주입합니다.      |
| `nginx_admin_<directive>`     | Kong의 Admin API 서버 {} 블록에 `<directive>`를 주입합니다.       |
| `nginx_status_<directive>`    | Kong의 Status API 서버 {} 블록에 `<directive>`를 주입합니다.      |
| `nginx_debug_<directive>`     | Kong의 Debug API 서버 {} 블록에 `<directive>`를 주입합니다.       |
| `nginx_stream_<directive>`    | Kong의 스트림 모듈 stream {} 블록에 `<directive>`를 주입합니다.   |
| `nginx_sproxy_<directive>`    | Kong의 스트림 모듈 서버 {} 블록에 `<directive>`를 주입합니다.     |
| `nginx_supstream_<directive>` | Kong의 스트림 모듈 upstream {} 블록에 `<directive>`를 주입합니다. |

## 주요 Nginx 설정

| 설정                                     | 설명                                                                                   | 기본값   |
| ---------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| `nginx_main_worker_rlimit_nofile`        | 워커 프로세스의 최대 열린 파일 수에 대한 제한을 변경합니다.                            | `auto`   |
| `nginx_events_worker_connections`        | 워커 프로세스가 열 수 있는 동시 연결의 최대 수를 설정합니다.                           | `auto`   |
| `nginx_http_client_header_buffer_size`   | 클라이언트 요청 헤더를 읽기 위한 버퍼 크기를 설정합니다.                               | `1k`     |
| `nginx_http_large_client_header_buffers` | 큰 클라이언트 요청 헤더를 읽기 위해 사용되는 버퍼의 최대 수와 크기를 설정합니다.       | `4 8k`   |
| `nginx_http_client_max_body_size`        | Kong이 프록시하는 요청에 허용되는 최대 요청 본문 크기를 정의합니다.                    | `0`      |
| `nginx_admin_client_max_body_size`       | Admin API의 최대 요청 본문 크기를 정의합니다.                                          | `10m`    |
| `nginx_http_charset`                     | "Content-Type" 응답 헤더 필드에 지정된 문자 집합을 추가합니다.                         | `UTF-8`  |
| `nginx_http_client_body_buffer_size`     | 요청 본문을 읽기 위한 버퍼 크기를 정의합니다.                                          | `8k`     |
| `nginx_admin_client_body_buffer_size`    | Admin API에서 요청 본문을 읽기 위한 버퍼 크기를 정의합니다.                            | `10m`    |
| `nginx_http_lua_regex_match_limit`       | PCRE 정규식 매칭을 위한 전역 MATCH_LIMIT입니다.                                        | `100000` |
| `nginx_http_lua_regex_cache_max_entries` | 워커 프로세스 수준 PCRE JIT 컴파일된 정규식 캐시에 허용되는 최대 항목 수를 지정합니다. | `8192`   |
| `nginx_http_keepalive_requests`          | 하나의 keep-alive 연결을 통해 제공할 수 있는 클라이언트 요청의 최대 수를 설정합니다.   | `10000`  |

**참고**: `auto` 값은 `ulimit -n`으로 설정되며, 상한은 16384로, 하한은 1024로 제한됩니다.

## 환경 변수 설정

Nginx 지시문은 대문자로 표기하고 `KONG_` 접두사를 붙여 환경 변수로 주입할 수 있습니다.

**예시**: `KONG_NGINX_HTTP_SSL_PROTOCOLS` → `nginx_http_ssl_protocols`

이렇게 하면 Kong의 http {} 블록에 다음 지시문이 주입됩니다:

```
ssl_protocols <value>;
```

프록시와 Admin API 서버 간에 다른 프로토콜 세트를 원하는 경우 `nginx_proxy_ssl_protocols` 및/또는 `nginx_admin_ssl_protocols`를 지정할 수 있으며, 둘 다 http {} 블록보다 우선순위가 높습니다.
