# Kong Gateway 설정 레퍼런스

## 개요

`kong.conf`에서 설정하는 Kong Gateway 구성 매개변수에 대한 한국어 요약입니다. 환경 변수로도 동일한 매개변수를 관리할 수 있습니다.

모든 구성 매개변수는 `kong.conf`에서 설정하거나 환경 변수로 관리할 수 있습니다.

## GENERAL

| 항목                                | 설명 (한글)                                                                                                                      | 기본값                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| prefix                              | 작업 디렉터리 경로. Nginx의 prefix와 동일하며 임시 파일과 로그가 저장됩니다. 각 Kong 프로세스는 별도 디렉터리를 사용해야 합니다. | /usr/local/kong/            |
| log_level                           | Nginx 서버 로그 레벨. 로그는 <prefix>/logs/error.log 에 기록됩니다.                                                              | notice                      |
| proxy_access_log                    | 프록시 포트 요청 접근 로그 경로. off로 비활성화 가능. 상대경로면 prefix 하위에 저장.                                             | logs/access.log             |
| proxy_error_log                     | 프록시 포트 요청 에러 로그 경로. 상세도는 log_level로 제어.                                                                      | logs/error.log              |
| proxy_stream_access_log             | TCP 스트림 프록시 접근 로그 경로. off로 비활성화 가능. 상대경로면 prefix 하위.                                                   | logs/access.log basic       |
| proxy_stream_error_log              | TCP 스트림 프록시 에러 로그 경로. 상세도는 log_level로 제어.                                                                     | logs/error.log              |
| admin_access_log                    | Admin API 접근 로그 경로. 하이브리드에서 CP면 DP 연결도 기록. off로 비활성화 가능.                                               | logs/admin_access.log       |
| admin_error_log                     | Admin API 에러 로그 경로. 상세도는 log_level로 제어.                                                                             | logs/error.log              |
| status_access_log                   | Status API 접근 로그 경로. 기본값 off로 비활성화.                                                                                | off                         |
| status_error_log                    | Status API 에러 로그 경로. 상세도는 log_level로 제어.                                                                            | logs/status_error.log       |
| debug_access_log                    | Debug API 접근 로그 경로. 기본값 off.                                                                                            | off                         |
| debug_error_log                     | Debug API 에러 로그 경로. 상세도는 log_level로 제어.                                                                             | logs/debug_error.log        |
| vaults                              | 로드할 볼트 목록(콤마 구분). 기본은 번들된 모든 볼트.                                                                            | bundled                     |
| opentelemetry_tracing               | 사용 중단됨. 대신 tracing_instrumentations 사용.                                                                                 | off                         |
| tracing_instrumentations            | 활성화할 트레이싱 인스트루먼트 목록. off/request/all 또는 세부 항목 지정.                                                        | off                         |
| opentelemetry_tracing_sampling_rate | 사용 중단됨. 대신 tracing_sampling_rate 사용.                                                                                    | 1.0                         |
| tracing_sampling_rate               | 트레이스 샘플링 비율(예: 0.25는 25%).                                                                                            | 0.01                        |
| plugins                             | 로드할 플러그인 목록. bundled 키워드로 기본 번들 로드.                                                                           | bundled                     |
| pluginserver_names                  | 플러그인 서버 프로세스 이름 목록. 관련 소켓/시작/쿼리 명령 설정과 연계.                                                          | -                           |
| pluginserver_XXX_socket             | 해당 플러그인서버의 유닉스 소켓 경로.                                                                                            | <prefix>/<XXX>.socket       |
| pluginserver_XXX_start_cmd          | 플러그인서버 시작 명령(인자 포함).                                                                                               | /usr/local/bin/<XXX>        |
| pluginserver_XXX_query_cmd          | 플러그인서버 질의 명령(JSON 덤프 반환).                                                                                          | /usr/local/bin/query\_<XXX> |
| port_maps                           | 컨테이너/가상화 환경에서 외부→Kong 포트 매핑 정보(예: 80:8000,443:8443). 헤더/로그의 포트 표시 보정.                             | -                           |
| anonymous_reports                   | 익명 사용 데이터(오류 스택 등) 전송 여부.                                                                                        | on                          |
| proxy_server                        | 프록시 서버 URL(필요한 구성 요소만 사용).                                                                                        | -                           |
| proxy_server_ssl_verify             | proxy_server가 HTTPS일 때 서버 인증서 검증 여부.                                                                                 | off                         |
| error_template_html/json/xml/plain  | 기본 에러 템플릿을 대체할 사용자 템플릿 경로. 최대 2개의 %s 플레이스홀더(메시지, 요청ID) 지원.                                   | -                           |
| dedicated_config_processing         | 구성 처리 전용 워커 사용 여부(주로 DP에서 지연 감소 효과).                                                                       | on                          |

### prefix

Working directory. Equivalent to Nginx’s prefix path, containing temporary files and logs. Each Kong process must have a separate working directory.

Default: /usr/local/kong/

### log_level

Log level of the Nginx server. Logs are found at <prefix>/logs/error.log.

Default: notice

### proxy_access_log

Path for proxy port request access logs. Set this value to off to disable logging proxy requests. If this value is a relative path, it will be placed under the prefix location.

Default: logs/access.log

### proxy_error_log

Path for proxy port request error logs. The granularity of these logs is adjusted by the log_level property.

Default: logs/error.log

### proxy_stream_access_log

Path for TCP streams proxy port access logs. Set to off to disable logging proxy requests. If this value is a relative path, it will be placed under the prefix location. basic is defined as '$remote_addr [$time_local] ' '$protocol $status $bytes_sent $bytes_received ' '$session_time'

Default: logs/access.log basic

### proxy_stream_error_log

Path for tcp streams proxy port request error logs. The granularity of these logs is adjusted by the log_level property.

Default: logs/error.log

### admin_access_log

Path for Admin API request access logs. If hybrid mode is enabled and the current node is set to be the control plane, then the connection requests from data planes are also written to this file with server name “kong_cluster_listener”.

Set this value to off to disable logging Admin API requests. If this value is a relative path, it will be placed under the prefix location.

Default: logs/admin_access.log

### admin_error_log

Path for Admin API request error logs. The granularity of these logs is adjusted by the log_level property.

Default: logs/error.log

### status_access_log

Path for Status API request access logs. The default value of off implies that logging for this API is disabled by default. If this value is a relative path, it will be placed under the prefix location.

Default: off

### status_error_log

Path for Status API request error logs. The granularity of these logs is adjusted by the log_level property.

Default: logs/status_error.log

### debug_access_log

Path for Debug API request access logs. The default value off implies that logging for this API is disabled by default. If this value is a relative path, it will be placed under the prefix location.

Default: off

### debug_error_log

Path for Debug API request error logs. The granularity of these logs is adjusted using the log_level property.

Default: logs/debug_error.log

### vaults

Comma-separated list of vaults this node should load. By default, all the bundled vaults are enabled.

The specified name(s) will be substituted as such in the Lua namespace: kong.vaults.{name}.\*.

Default: bundled

### opentelemetry_tracing

Deprecated: use tracing_instrumentations instead.

Default: off

### tracing_instrumentations

Comma-separated list of tracing instrumentations this node should load. By default, no instrumentations are enabled.

Valid values for this setting are:

off: do not enable instrumentations.
request: only enable request-level instrumentations.
all: enable all the following instrumentations.
db_query: trace database queries.
dns_query: trace DNS queries.
router: trace router execution, including router rebuilding.
http_client: trace OpenResty HTTP client requests.
balancer: trace balancer retries.
plugin_rewrite: trace plugin iterator execution with rewrite phase.
plugin_access: trace plugin iterator execution with access phase.
plugin_header_filter: trace plugin iterator execution with header_filter phase.
Note: In the current implementation, tracing instrumentations are not enabled in stream mode.

Default: off

### opentelemetry_tracing_sampling_rate

Deprecated: use tracing_sampling_rate instead.

Default: 1.0

### tracing_sampling_rate

Tracing instrumentation sampling rate. Tracer samples a fixed percentage of all spans following the sampling rate.

Example: 0.25, this accounts for 25% of all traces.

Default: 0.01

### plugins

Comma-separated list of plugins this node should load. By default, only plugins bundled in official distributions are loaded via the bundled keyword.

Loading a plugin does not enable it by default, but only instructs Kong to load its source code and allows configuration via the various related Admin API endpoints.

The specified name(s) will be substituted as such in the Lua namespace: kong.plugins.{name}.\*.

When the off keyword is specified as the only value, no plugins will be loaded.

bundled and plugin names can be mixed together, as the following examples suggest:

plugins = bundled,custom-auth,custom-log will include the bundled plugins plus two custom ones.
plugins = custom-auth,custom-log will only include the custom-auth and custom-log plugins.
plugins = off will not include any plugins.
Note: Kong will not start if some plugins were previously configured (i.e. have rows in the database) and are not specified in this list. Before disabling a plugin, ensure all instances of it are removed before restarting Kong.

Note: Limiting the amount of available plugins can improve P99 latency when experiencing LRU churning in the database cache (i.e. when the configured mem_cache_size) is full.

Default: bundled

### pluginserver_names

Comma-separated list of names for pluginserver processes. The actual names are used for log messages and to relate the actual settings.

pluginserver_XXX_socket
Path to the unix socket used by the pluginserver.

Default: <prefix>/<XXX>.socket
pluginserver_XXX_start_cmd
Full command (including any needed arguments) to start the pluginserver.

Default: /usr/local/bin/<XXX>
pluginserver_XXX_query_cmd
Full command to “query” the

pluginserver. Should produce a JSON with the dump info of the plugin it manages.
Default: /usr/local/bin/query\_<XXX>

### port_maps

With this configuration parameter, you can let Kong Gateway know the port from which the packets are forwarded to it. This is fairly common when running Kong in a containerized or virtualized environment. For example, port_maps=80:8000, 443:8443 instructs Kong that the port 80 is mapped to 8000 (and the port 443 to 8443), where 8000 and 8443 are the ports that Kong is listening to.

This parameter helps Kong set a proper forwarded upstream HTTP request header or to get the proper forwarded port with the Kong PDK (in case other means determining it has failed). It changes routing by a destination port to route by a port from which packets are forwarded to Kong, and similarly it changes the default plugin log serializer to use the port according to this mapping instead of reporting the port Kong is listening to.

### anonymous_reports

Send anonymous usage data such as error stack traces to help improve Kong.

Default: on

### proxy_server

Proxy server defined as an encoded URL. Kong will only use this option if a component is explicitly configured to use a proxy.

### proxy_server_ssl_verify

Toggles server certificate verification if proxy_server is in HTTPS. See the lua_ssl_trusted_certificate setting to specify a certificate authority.

Default: off

### error_template_html

Path to the custom html error template to override the default html kong error template.

The template may contain up to two %s placeholders. The first one will expand to the error message. The second one will expand to the request ID. Both placeholders are optional, but recommended. Adding more than two placeholders will result in a runtime error when trying to render the template:

```html
<html>
  <body>
    <h1>My custom error template</h1>
    <p>error: %s</p>
    <p>request_id: %s</p>
  </body>
</html>
```

### error_template_json

Path to the custom json error template to override the default json kong error template.

Similarly to error_template_html, the template may contain up to two %s placeholders for the error message and the request ID respectively.

### error_template_xml

Path to the custom xml error template to override the default xml kong error template

Similarly to error_template_html, the template may contain up to two %s placeholders for the error message and the request ID respectively.

### error_template_plain

Path to the custom plain error template to override the default plain kong error template

Similarly to error_template_html, the template may contain up to two %s placeholders for the error message and the request ID respectively.

### dedicated_config_processing

Min Version:
3.5
Enables or disables a special worker process for configuration processing. This process increases memory usage a little bit while allowing to reduce latencies by moving some background tasks, such as CP/DP connection handling, to an additional worker process specific to handling these background tasks. Currently this has effect only on data planes.

Default: on

## HYBRID MODE

| 항목                         | 설명 (한글)                                                                                         | 기본값      |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| role                         | 하이브리드 모드 활성화 및 역할 지정. CP는 DB 사용 및 DP 구성 배포, DP는 DB-less로 CP에서 구성 수신. | traditional |
| cluster_mtls                 | 클러스터 노드 간 검증 방식: shared/pki/pki_check_cn.                                                | shared      |
| cluster_cert                 | CP/DP 간 mTLS에 사용할 인증서. shared는 모든 노드 동일, pki는 DP별 상이.                            | -           |
| cluster_cert_key             | mTLS용 인증서 개인키. shared는 동일, pki는 DP별 상이.                                               | -           |
| cluster_ca_cert              | pki 모드에서 신뢰할 CA 인증서(PEM). CP/DP 상호 검증에 사용.                                         | -           |
| cluster_allowed_common_names | pki_check_cn 모드에서 허용할 DP 인증서 CN 목록(콤마 구분).                                          | -           |
| incremental_sync             | 구성 변경의 증분 동기화 on/off. CP/DP 모두에서 동일하게 설정 필요.                                  | off         |

### role

Use this setting to enable hybrid mode, This allows running some Kong nodes in a control plane role with a database and have them deliver configuration updates to other nodes running to DB-less running in a data plane role.

Valid values for this setting are:

traditional: do not use hybrid mode.
control_plane: this node runs in a control plane role. It can use a database and will deliver configuration updates to data plane nodes.
data_plane: this is a data plane node. It runs DB-less and receives configuration updates from a control plane node.
Default: traditional

### cluster_mtls

Sets the verification method between nodes of the cluster.

Valid values for this setting are:

shared: use a shared certificate/key pair specified with the cluster_cert and cluster_cert_key settings. Note that CP and DP nodes must present the same certificate to establish mTLS connections.
pki: use cluster_ca_cert, cluster_server_name, and cluster_cert for verification. These are different certificates for each DP node, but issued by a cluster-wide common CA certificate: cluster_ca_cert.
pki_check_cn: similar to pki but additionally checks for the common name of the data plane certificate specified in cluster_allowed_common_names.
Default: shared

### cluster_cert

Cluster certificate to use when establishing secure communication between control and data plane nodes. You can use the kong hybrid command to generate the certificate/key pair. Under shared mode, it must be the same for all nodes. Under pki mode, it should be a different certificate for each DP node.

The certificate can be configured on this property with any of the following values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### cluster_cert_key

Cluster certificate key to use when establishing secure communication between control and data plane nodes. You can use the kong hybrid command to generate the certificate/key pair. Under shared mode, it must be the same for all nodes. Under pki mode it should be a different certificate for each DP node.

The certificate key can be configured on this property with either of the following values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### cluster_ca_cert

The trusted CA certificate file in PEM format used for:

Control plane to verify data plane’s certificate
Data plane to verify control plane’s certificate
Required on data plane if cluster_mtls is set to pki. If the control plane certificate is issued by a well-known CA, set lua_ssl_trusted_certificate=system on the data plane and leave this field empty.

This field is ignored if cluster_mtls is set to shared.

The certificate can be configured on this property with any of the following values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### cluster_allowed_common_names

The list of Common Names that are allowed to connect to control plane. Multiple entries may be supplied in a comma-separated string. When not set, only data plane with the same parent domain as the control plane cert is allowed to connect.

This field is ignored if cluster_mtls is not set to pki_check_cn.

### incremental_sync

Min Version:
3.10
The setting to enable or disable the incremental synchronization of configuration changes. Instead of sending the entire entity config to data planes on each config update, incremental config sync lets you send only the changed configuration to data planes for hybrid mode deployments. The valid values are on and off. To enable, set this value to on.

In hybrid mode, this setting must be configured on both control plane and data plane nodes.

Default: off

### HYBRID MODE DATA PLANE

| 항목                          | 설명 (한글)                                                       | 기본값 |
| ----------------------------- | ----------------------------------------------------------------- | ------ |
| cluster_server_name           | DP→CP TLS SNI에 사용할 서버 이름(CP 인증서의 CN 또는 SAN과 일치). | -      |
| cluster_control_plane         | DP가 구성을 가져올 CP 주소(host:port).                            | -      |
| cluster_telemetry_endpoint    | DP가 텔레메트리를 보낼 CP 주소(host:port).                        | -      |
| cluster_telemetry_server_name | Vitals 텔레메트리용 SNI.                                          | -      |
| cluster_dp_labels             | DP 라벨(key:value, 콤마 구분). Konnect 하이브리드에서만 사용.     | -      |

#### cluster_server_name

The server name used in the SNI of the TLS connection from a DP node to a CP node. Must match the Common Name (CN) or Subject Alternative Name (SAN) found in the CP certificate. If cluster_mtls is set to shared, this setting is ignored and kong_clustering is used.

#### cluster_control_plane

To be used by data plane nodes only: address of the control plane node from which configuration updates will be fetched, in host:port format.

#### cluster_telemetry_endpoint

To be used by data plane nodes only: telemetry address of the control plane node to which telemetry updates will be posted in host:port format.

#### cluster_telemetry_server_name

The SNI (Server Name Indication extension) to use for Vitals telemetry data.

#### cluster_dp_labels

Comma-separated list of labels for the data plane. Labels are key-value pairs that provide additional context information for each DP. Each label must be configured as a string in the format key:value.

Labels are only compatible with hybrid mode deployments with Kong Konnect (SaaS). This configuration doesn’t work with self-hosted deployments.

Keys and values follow the AIP standards: https://kong-aip.netlify.app/aip/129/

Example: deployment:mycloud,region:us-east-1

### HYBRID MODE CONTROL PLANE

| 항목                           | 설명 (한글)                                                                  | 기본값       |
| ------------------------------ | ---------------------------------------------------------------------------- | ------------ |
| cluster_listen                 | CP가 DP 연결을 수신할 주소/포트(콤마 구분). Admin API 접근 로그에 함께 기록. | 0.0.0.0:8005 |
| cluster_telemetry_listen       | CP가 DP 텔레메트리 연결을 수신할 주소/포트(콤마 구분).                       | 0.0.0.0:8006 |
| cluster_data_plane_purge_delay | DP가 오프라인 된 후 DB에서 제거되기까지의 지연(초).                          | 1209600      |
| cluster_ocsp                   | DP 인증서의 OCSP 폐기 상태 확인: on/off/optional.                            | off          |
| cluster_use_proxy              | 하이브리드 연결에 HTTP CONNECT 프록시 사용 여부.                             | off          |
| cluster\*max_payload           | CP→DP 전송 허용 최대 압축 페이로드 크기(바이트).                             | 16777216     |

#### cluster_listen

Comma-separated list of addresses and ports on which the cluster control plane server should listen for data plane connections. The cluster communication port of the control plane must be accessible by all the data planes within the same cluster. This port is mTLS protected to ensure end-to-end security and integrity.

This setting has no effect if role is not set to control_plane.

Connections made to this endpoint are logged to the same location as Admin API access logs. See admin_access_log config description for more information.

Default: 0.0.0.0:8005

#### cluster_telemetry_listen

Comma-separated list of addresses and ports on which the cluster control plane server should listen for data plane telemetry connections. The cluster communication port of the control plane must be accessible by all the data planes within the same cluster.

This setting has no effect if role is not set to control_plane.

Default: 0.0.0.0:8006

#### cluster_data_plane_purge_delay

How many seconds must pass from the time a DP node becomes offline to the time its entry gets removed from the database, as returned by the /clustering/data-planes Admin API endpoint.

This is to prevent the cluster data plane table from growing indefinitely. The default is set to 14 days. That is, if the CP hasn’t heard from a DP for 14 days, its entry will be removed.

Default: 1209600

#### cluster_ocsp

Whether to check for revocation status of DP certificates using OCSP (Online Certificate Status Protocol). If enabled, the DP certificate should contain the “Certificate Authority Information Access” extension and the OCSP method with URI of which the OCSP responder can be reached from CP.

OCSP checks are only performed on CP nodes, it has no effect on DP nodes.

Valid values for this setting are:

on: OCSP revocation check is enabled and DP must pass the check in order to establish connection with CP.
off: OCSP revocation check is disabled.
optional: OCSP revocation check will be attempted, however, if the required extension is not found inside DP-provided certificate or communication with the OCSP responder failed, then DP is still allowed through.
Default: off

#### cluster_use_proxy

Whether to turn on HTTP CONNECT proxy support for hybrid mode connections. proxy_server will be used for hybrid mode connections if this option is turned on.

Default: off

#### cluster\*max_payload

This sets the maximum compressed payload size allowed to be sent from CP to DP in hybrid mode. Default is 16MB - 16 \* 1024 \_ 1024.

Default: 16777216

## NGINX

| 항목                      | 설명 (한글)                                                                                             | 기본값                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| proxy_listen              | 프록시 서버가 HTTP/HTTPS 트래픽을 수신할 주소/포트(콤마 구분). 접미사 ssl/http2/proxy_protocol 등 지원. | ["0.0.0.0:8000 reuseport backlog=16384", "0.0.0.0:8443 http2 ssl reuseport backlog=16384"]     |
| proxy_url                 | Kong Proxy 조회/밸런서 주소(URL). Manager/Portal에서 기본적으로 창 호스트와 포트를 사용.                | -                                                                                              |
| stream_listen             | 스트림 모드 수신 주소/포트(콤마 구분). ssl/proxy_protocol 등 접미사 지원.                               | off                                                                                            |
| admin_listen              | Admin API 수신 주소/포트(콤마 구분). 관리자 전용으로 제한 권장. ssl/http2 등 접미사 지원.               | ["127.0.0.1:8001 reuseport backlog=16384", "127.0.0.1:8444 http2 ssl reuseport backlog=16384"] |
| status_listen             | Status API 수신 주소/포트(콤마 구분). ssl/http2/proxy_protocol 접미사 가능.                             | 127.0.0.1:8007 reuseport backlog=16384                                                         |
| debug_listen              | Debug API 수신 주소/포트(콤마 구분). ssl/http2 접미사 가능.                                             | off                                                                                            |
| nginx_user                | 워커 프로세스의 사용자/그룹. 그룹 생략 시 사용자명과 동일한 그룹 사용.                                  | kong kong                                                                                      |
| nginx_worker_processes    | Nginx 워커 프로세스 수.                                                                                 | auto                                                                                           |
| nginx_daemon              | Nginx 데몬 모드(on)/포그라운드(off).                                                                    | on                                                                                             |
| mem_cache_size            | 전통 모드 엔티티/런타임 데이터용 공유 메모리 캐시 크기(각 1개씩, 총 2개).                               | 128m                                                                                           |
| ssl_cipher_suite          | Nginx가 제공할 TLS 암호군: modern/intermediate/old/fips/custom.                                         | intermediate                                                                                   |
| ssl_ciphers               | 사용자 지정 TLS 암호 목록(ssl_cipher_suite=custom일 때만 유효).                                         | -                                                                                              |
| ssl_protocols             | 클라이언트 연결에 허용할 TLS 프로토콜 버전.                                                             | TLSv1.2 TLSv1.3                                                                                |
| ssl_prefer_server_ciphers | 클라이언트보다 서버의 암호 선호 적용 여부(custom일 때만).                                               | on                                                                                             |
| ssl_dhparam               | DHE용 DH 파라미터(미리 정의 그룹 또는 파일/내용). modern/intermediate에선 일부 무시.                    | -                                                                                              |
| ssl_session_tickets       | TLS 세션 티켓 사용 여부(TLSv1.3에는 영향 없음).                                                         | on                                                                                             |
| ssl_session_timeout       | 세션 파라미터 재사용 허용 시간.                                                                         | 1d                                                                                             |
| ssl_session_cache_size    | 세션 파라미터 캐시 크기.                                                                                | 10m                                                                                            |
| ssl_cert                  | TLS 활성 리스너용 인증서 목록(콤마 구분). 미설정 시 최초 기동 시 기본 cert 자동 생성.                   | -                                                                                              |
| ssl_cert_key              | ssl_cert에 대응하는 키 목록(순서 일치). 미설정 시 기본 키 자동 생성.                                    | -                                                                                              |
| client_ssl                | 업스트림으로 프록시 시 클라이언트 인증서(mTLS) 사용 여부.                                               | off                                                                                            |
| client_ssl_cert           | client_ssl 활성 시 사용할 클라이언트 인증서(경로/내용/base64).                                          | -                                                                                              |
| client_ssl_cert_key       | client_ssl 활성 시 사용할 클라이언트 키(경로/내용/base64).                                              | -                                                                                              |
| admin_ssl_cert            | admin_listen의 TLS용 인증서 목록.                                                                       | -                                                                                              |
| admin_ssl_cert_key        | admin_listen의 TLS용 키 목록.                                                                           | -                                                                                              |
| status_ssl_cert           | status_listen의 TLS용 인증서 목록.                                                                      | -                                                                                              |
| status_ssl_cert_key       | status_listen의 TLS용 키 목록.                                                                          | -                                                                                              |
| debug_ssl_cert            | debug_listen의 TLS용 인증서 목록.                                                                       | -                                                                                              |
| debug_ssl_cert_key        | debug_listen의 TLS용 키 목록.                                                                           | -                                                                                              |
| headers                   | 클라이언트 응답에 주입할 헤더 목록(Server/Via/Latency 등). off로 비활성화 가능.                         | ["server_tokens", "latency_tokens", "X-Kong-Request-Id"]                                       |
| headers_upstream          | 업스트림 요청에 주입할 헤더. 현재 X-Kong-Request-Id만 지원(or off).                                     | X-Kong-Request-Id                                                                              |
| trusted\*ips              | 신뢰할 IP 블록(CIDR, 콤마 구분). 신뢰 시 X-Forwarded-\*를 통과시킴.                                     | -                                                                                              |
| real_ip_header            | 클라이언트 주소로 대체할 요청 헤더 또는 proxy_protocol 지정.                                            | X-Real-IP                                                                                      |
| real_ip_recursive         | ngx_http_realip_module의 real_ip_recursive 값.                                                          | off                                                                                            |

### proxy_listen

Comma-separated list of addresses and ports on which the proxy server should listen for HTTP/HTTPS traffic. The proxy server is the public entry point of Kong, which proxies traffic from your consumers to your backend services. This value accepts IPv4, IPv6, and hostnames.

Some suffixes can be specified for each pair:

ssl will require that all connections made through a particular address/port be made with TLS enabled.
http2 will allow for clients to open HTTP/2 connections to Kong’s proxy server.
proxy_protocol will enable usage of the PROXY protocol for a given address/port.
deferred instructs to use a deferred accept on Linux (the TCP_DEFER_ACCEPT socket option).
bind instructs to make a separate bind() call for a given address:port pair.
reuseport instructs to create an individual listening socket for each worker process, allowing the kernel to better distribute incoming connections between worker processes.
backlog=N sets the maximum length for the queue of pending TCP connections. This number should not be too small to prevent clients seeing “Connection refused” errors when connecting to a busy Kong instance. Note: On Linux, this value is limited by the setting of the net.core.somaxconn kernel parameter. In order for the larger backlog set here to take effect, it is necessary to raise net.core.somaxconn at the same time to match or exceed the backlog number set.
ipv6only=on|off specifies whether an IPv6 socket listening on a wildcard address [::] will accept only IPv6 connections or both IPv6 and IPv4 connections.
so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt] configures the TCP keepalive behavior for the listening socket. If this parameter is omitted, the operating system’s settings will be in effect for the socket. If it is set to the value on, the SO_KEEPALIVE option is turned on for the socket. If it is set to the value off, the SO_KEEPALIVE option is turned off for the socket. Some operating systems support setting of TCP keepalive parameters on a per-socket basis using the TCP_KEEPIDLE, TCP_KEEPINTVL, and TCP_KEEPCNT socket options.
This value can be set to off, thus disabling the HTTP/HTTPS proxy port for this node. If stream_listen is also set to off, this enables control plane mode for this node (in which all traffic proxying capabilities are disabled). This node can then be used only to configure a cluster of Kong nodes connected to the same datastore.

Example: proxy_listen = 0.0.0.0:443 ssl, 0.0.0.0:444 http2 ssl

See http://nginx.org/en/docs/http/ngx_http_core_module.html#listen for a description of the accepted formats for this and other \*\_listen values.

See https://www.nginx.com/resources/admin-guide/proxy-protocol/ for more details about the proxy_protocol parameter.

Not all \*\_listen values accept all formats specified in nginx’s documentation.

Default: ["0.0.0.0:8000 reuseport backlog=16384", "0.0.0.0:8443 http2 ssl reuseport backlog=16384"]

### proxy_url

Kong Proxy URL

The lookup, or balancer, address for your Kong Proxy nodes.

This value is commonly used in a microservices or service-mesh oriented architecture.

Accepted format (parts in parentheses are optional):

<scheme>://<IP / HOSTNAME>(:<PORT>(/<PATH>))

Examples:

<scheme>://<IP>:<PORT> -> proxy_url = http://127.0.0.1:8000
SSL <scheme>://<HOSTNAME> -> proxy_url = https://proxy.domain.tld
<scheme>://<HOSTNAME>/<PATH> -> proxy_url = http://dev-machine/dev-285
By default, Kong Manager and Kong Portal will use the window request host and append the resolved listener port depending on the requested protocol.

### stream_listen

Comma-separated list of addresses and ports on which the stream mode should listen.

This value accepts IPv4, IPv6, and hostnames. Some suffixes can be specified for each pair:

ssl will require that all connections made through a particular address/port be made with TLS enabled.
proxy_protocol will enable usage of the PROXY protocol for a given address/port.
bind instructs to make a separate bind() call for a given address:port pair.
reuseport instructs to create an individual listening socket for each worker process, allowing the kernel to better distribute incoming connections between worker processes.
backlog=N sets the maximum length for the queue of pending TCP connections. This number should not be too small to prevent clients seeing “Connection refused” errors when connecting to a busy Kong instance. Note: On Linux, this value is limited by the setting of the net.core.somaxconn kernel parameter. In order for the larger backlog set here to take effect, it is necessary to raise net.core.somaxconn at the same time to match or exceed the backlog number set.
ipv6only=on|off specifies whether an IPv6 socket listening on a wildcard address [::] will accept only IPv6 connections or both IPv6 and IPv4 connections
so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt] configures the “TCP keepalive” behavior for the listening socket. If this parameter is omitted then the operating system’s settings will be in effect for the socket. If it is set to the value “on”, the SO_KEEPALIVE option is turned on for the socket. If it is set to the value “off”, the SO_KEEPALIVE option is turned off for the socket. Some operating systems support setting of TCP keepalive parameters on a per-socket basis using the TCP_KEEPIDLE, TCP_KEEPINTVL, and TCP_KEEPCNT socket options.
Examples:

stream_listen = 127.0.0.1:7000 reuseport backlog=16384
stream_listen = 0.0.0.0:989 reuseport backlog=65536, 0.0.0.0:20
stream_listen = [::1]:1234 backlog=16384
By default, this value is set to off, thus disabling the stream proxy port for this node.

Default: off

### admin_api_uri

Deprecated: Use admin_gui_api_url instead

### admin_listen

Comma-separated list of addresses and ports on which the Admin interface should listen. The Admin interface is the API allowing you to configure and manage Kong. Access to this interface should be restricted to Kong administrators only. This value accepts IPv4, IPv6, and hostnames.

It is highly recommended to avoid exposing the Admin API to public interfaces, by using values such as 0.0.0.0:8001

See https://docs.konghq.com/gateway/latest/production/running-kong/secure-admin-api/ for more information about how to secure your Admin API.

Some suffixes can be specified for each pair:

ssl will require that all connections made through a particular address/port be made with TLS enabled.
http2 will allow for clients to open HTTP/2 connections to Kong’s proxy server.
proxy_protocol will enable usage of the PROXY protocol for a given address/port.
deferred instructs to use a deferred accept on Linux (the TCP_DEFER_ACCEPT socket option).
bind instructs to make a separate bind() call for a given address:port pair.
reuseport instructs to create an individual listening socket for each worker process, allowing the Kernel to better distribute incoming connections between worker processes.
backlog=N sets the maximum length for the queue of pending TCP connections. This number should not be too small to prevent clients seeing “Connection refused” errors when connecting to a busy Kong instance. Note: On Linux, this value is limited by the setting of the net.core.somaxconn kernel parameter. In order for the larger backlog set here to take effect, it is necessary to raise net.core.somaxconn at the same time to match or exceed the backlog number set.
ipv6only=on|off specifies whether an IPv6 socket listening on a wildcard address [::] will accept only IPv6 connections or both IPv6 and IPv4 connections.
so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt] configures the “TCP keepalive” behavior for the listening socket. If this parameter is omitted, the operating system’s settings will be in effect for the socket. If it is set to the value on, the SO_KEEPALIVE option is turned on for the socket. If it is set to the value off, the SO_KEEPALIVE option is turned off for the socket. Some operating systems support setting of TCP keepalive parameters on a per-socket basis using the TCP_KEEPIDLE, TCP_KEEPINTVL, and TCP_KEEPCNT socket options.
This value can be set to off, thus disabling the Admin interface for this node, enabling a data plane mode (without configuration capabilities) pulling its configuration changes from the database.

Example: admin_listen = 127.0.0.1:8444 http2 ssl

Default: ["127.0.0.1:8001 reuseport backlog=16384", "127.0.0.1:8444 http2 ssl reuseport backlog=16384"]

### status_listen

Comma-separated list of addresses and ports on which the Status API should listen. The Status API is a read-only endpoint allowing monitoring tools to retrieve metrics, healthiness, and other non-sensitive information of the current Kong node.

The following suffix can be specified for each pair:

ssl will require that all connections made through a particular address/port be made with TLS enabled.
http2 will allow for clients to open HTTP/2 connections to Kong’s Status API server.
proxy_protocol will enable usage of the PROXY protocol.
This value can be set to off, disabling the Status API for this node.

Example: status_listen = 0.0.0.0:8100 ssl http2

Default: 127.0.0.1:8007 reuseport backlog=16384

### debug_listen

Comma-separated list of addresses and ports on which the Debug API should listen.

The following suffix can be specified for each pair:

ssl will require that all connections made through a particular address/port be made with TLS enabled.
http2 will allow for clients to open HTTP/2 connections to Kong’s Debug API server.
This value can be set to off, disabling the Debug API for this node.

Example: debug_listen = 0.0.0.0:8200 ssl http2

Default: off

### nginx_user

Defines user and group credentials used by worker processes. If group is omitted, a group whose name equals that of user is used.

Example: nginx_user = nginx www

Note: If the kong user and the kong group are not available, the default user and group credentials will be nobody nobody.

Default: kong kong

### nginx_worker_processes

Determines the number of worker processes spawned by Nginx.

See http://nginx.org/en/docs/ngx_core_module.html#worker_processes for detailed usage of the equivalent Nginx directive and a description of accepted values.

Default: auto

### nginx_daemon

Determines whether Nginx will run as a daemon or as a foreground process. Mainly useful for development or when running Kong inside a Docker environment.

See http://nginx.org/en/docs/ngx_core_module.html#daemon.

Default: on

### mem_cache_size

Size of each of the two shared memory caches for traditional mode database entities and runtime data, kong_core_cache and kong_cache.

The accepted units are k and m, with a minimum recommended value of a few MBs.

Note: As this option controls the size of two different cache zones, the total memory Kong uses to cache entities might be double this value. The created zones are shared by all worker processes and do not become larger when more workers are used.

Default: 128m

### ssl_cipher_suite

Defines the TLS ciphers served by Nginx. Accepted values are modern, intermediate, old, fips or custom. If you want to enable TLSv1.1, this value has to be old.

See https://wiki.mozilla.org/Security/Server_Side_TLS for detailed descriptions of each cipher suite. fips cipher suites are as described in https://wiki.openssl.org/index.php/FIPS_mode_and_TLS.

Default: intermediate

### ssl_ciphers

Defines a custom list of TLS ciphers to be served by Nginx. This list must conform to the pattern defined by openssl ciphers. This value is ignored if ssl_cipher_suite is not custom. If you use DHE ciphers, you must also configure the ssl_dhparam parameter.

### ssl_protocols

Enables the specified protocols for client-side connections. The set of supported protocol versions also depends on the version of OpenSSL Kong was built with. This value is ignored if ssl_cipher_suite is not custom. If you want to enable TLSv1.1, you should set ssl_cipher_suite to old.

See http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_protocols

Default: TLSv1.2 TLSv1.3

### ssl_prefer_server_ciphers

Specifies that server ciphers should be preferred over client ciphers when using the SSLv3 and TLS protocols. This value is ignored if ssl_cipher_suite is not custom.

See http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_prefer_server_ciphers

Default: on

### ssl_dhparam

Defines DH parameters for DHE ciphers from the predefined groups: ffdhe2048, ffdhe3072, ffdhe4096, ffdhe6144, ffdhe8192, from the absolute path to a parameters file, or directly from the parameters content.

This value is ignored if ssl_cipher_suite is modern or intermediate. The reason is that modern has no ciphers that need this, and intermediate uses ffdhe2048.

See http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_dhparam

### ssl_session_tickets

Enables or disables session resumption through TLS session tickets. This has no impact when used with TLSv1.3.

Kong enables this by default for performance reasons, but it has security implications: https://github.com/mozilla/server-side-tls/issues/135

See http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_tickets

Default: on

### ssl_session_timeout

Specifies a time during which a client may reuse the session parameters. See the rationale: https://github.com/mozilla/server-side-tls/issues/198

See http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_timeout

Default: 1d

### ssl_session_cache_size

Sets the size of the caches that store session parameters.

See https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_cache

Default: 10m

### ssl_cert

Comma-separated list of certificates for proxy_listen values with TLS enabled.

If more than one certificate is specified, it can be used to provide alternate types of certificates (for example, ECC certificates) that will be served to clients that support them. Note that to properly serve using ECC certificates, it is recommended to also set ssl_cipher_suite to modern or intermediate.

Unless this option is explicitly set, Kong will auto-generate a pair of default certificates (RSA + ECC) the first time it starts up and use them for serving TLS requests.

Certificates can be configured on this property with any of the following values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### ssl_cert_key

Comma-separated list of keys for proxy_listen values with TLS enabled.

If more than one certificate was specified for ssl_cert, then this option should contain the corresponding key for all certificates provided in the same order.

Unless this option is explicitly set, Kong will auto-generate a pair of default private keys (RSA + ECC) the first time it starts up and use them for serving TLS requests.

Keys can be configured on this property with any of the following values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### client_ssl

Determines if Nginx should attempt to send client-side TLS certificates and perform Mutual TLS Authentication with upstream service when proxying requests.

Default: off

### client_ssl_cert

If client_ssl is enabled, the client certificate for the proxy_ssl_certificate directive.

This value can be overwritten dynamically with the client_certificate attribute of the Service object.

The certificate can be configured on this property with any of the following values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### client_ssl_cert_key

If client_ssl is enabled, the client TLS key for the proxy_ssl_certificate_key directive.

This value can be overwritten dynamically with the client_certificate attribute of the Service object.

The certificate key can be configured on this property with any of the following values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### admin_ssl_cert

Comma-separated list of certificates for admin_listen values with TLS enabled.

See docs for ssl_cert for detailed usage.

### admin_ssl_cert_key

Comma-separated list of keys for admin_listen values with TLS enabled.

See docs for ssl_cert_key for detailed usage.

### status_ssl_cert

Comma-separated list of certificates for status_listen values with TLS enabled.

See docs for ssl_cert for detailed usage.

### status_ssl_cert_key

Comma-separated list of keys for status_listen values with TLS enabled.

See docs for ssl_cert_key for detailed usage.

### debug_ssl_cert

Comma-separated list of certificates for debug_listen values with TLS enabled.

See docs for ssl_cert for detailed usage.

### debug_ssl_cert_key

Comma-separated list of keys for debug_listen values with TLS enabled.

See docs for ssl_cert_key for detailed usage.

### headers

Comma-separated list of headers Kong should inject in client responses.

Accepted values are:

Server: Injects Server: kong/x.y.z on Kong-produced responses (e.g., Admin API, rejected requests from auth plugin).
Via: Injects Via: kong/x.y.z for successfully proxied requests.
X-Kong-Proxy-Latency: Time taken (in milliseconds) by Kong to process a request and run all plugins before proxying the request upstream.
X-Kong-Response-Latency: Time taken (in milliseconds) by Kong to produce a response in case of, e.g., a plugin short-circuiting the request, or in case of an error.
X-Kong-Upstream-Latency: Time taken (in milliseconds) by the upstream service to send response headers.
X-Kong-Admin-Latency: Time taken (in milliseconds) by Kong to process an Admin API request.
X-Kong-Upstream-Status: The HTTP status code returned by the upstream service. This is particularly useful for clients to distinguish upstream statuses if the response is rewritten by a plugin.
X-Kong-Request-Id: Unique identifier of the request.
X-Kong-Total-Latency: Time elapsed (in milliseconds) between the first bytes being read from the client and the log write after the last bytes were sent to the client. Calculated as the difference between the current timestamp and the timestamp when the request was created.
X-Kong-Third-Party-Latency: Cumulative sum of all third-party latencies, including DNS resolution, HTTP client calls, Socket operations, and Redis operations.
X-Kong-Client-Latency: Time that Kong waits to receive headers and body from the client, and also how long Kong waits for the client to read/receive the response from Kong.
server_tokens: Same as specifying both Server and Via.
latency_tokens: Same as specifying X-Kong-Proxy-Latency, X-Kong-Response-Latency, X-Kong-Admin-Latency, and X-Kong-Upstream-Latency.
advanced_latency_tokens: Same as specifying X-Kong-Proxy-Latency, X-Kong-Response-Latency, X-Kong-Admin-Latency, X-Kong-Upstream-Latency. X-Kong-Total-Latency, X-Kong-Third-Party-Latency, and X-Kong-Client-Latency.
In addition to these, this value can be set to off, which prevents Kong from injecting any of the above headers. Note that this does not prevent plugins from injecting headers of their own.

Example: headers = via, latency_tokens

Default: ["server_tokens", "latency_tokens", "X-Kong-Request-Id"]

### headers_upstream

Comma-separated list of headers Kong should inject in requests to upstream.

At this time, the only accepted value is:

X-Kong-Request-Id: Unique identifier of the request.
In addition, this value can be set to off, which prevents Kong from injecting the above header. Note that this does not prevent plugins from injecting headers of their own.

Default: X-Kong-Request-Id

### trusted\*ips

Defines trusted IP address blocks that are known to send correct X-Forwarded-\* headers. Requests from trusted IPs make Kong forward their X-Forwarded-\_ headers upstream. Non-trusted requests make Kong insert its own X-Forwarded-\* headers.

This property also sets the set_real_ip_from directive(s) in the Nginx configuration. It accepts the same type of values (CIDR blocks) but as a comma-separated list.

To trust all IPs, set this value to 0.0.0.0/0,::/0.

If the special value unix: is specified, all UNIX-domain sockets will be trusted.

See http://nginx.org/en/docs/http/ngx_http_realip_module.html#set_real_ip_from for examples of accepted values.

### real_ip_header

Defines the request header field whose value will be used to replace the client address. This value sets the ngx_http_realip_module directive of the same name in the Nginx configuration.

If this value receives proxy_protocol:

at least one of the proxy_listen entries must have the proxy_protocol flag enabled.
the proxy_protocol parameter will be appended to the listen directive of the Nginx template.
See http://nginx.org/en/docs/http/ngx_http_realip_module.html#real_ip_header for a description of this directive.

Default: X-Real-IP

### real_ip_recursive

This value sets the ngx_http_realip_module directive of the same name in the Nginx configuration.

See http://nginx.org/en/docs/http/ngx_http_realip_module.html#real_ip_recursive for a description of this directive.

Default: off
error_default_type
Default MIME type to use when the request Accept header is missing and Nginx is returning an error for the request. Accepted values are text/plain, text/html, application/json, and application/xml.

Default: text/plain
upstream_keepalive_pool_size
Sets the default size of the upstream keepalive connection pools. Upstream keepalive connection pools are segmented by the dst ip/dst port/SNI attributes of a connection. A value of 0 will disable upstream keepalive connections by default, forcing each upstream request to open a new connection.

Default: 512
upstream_keepalive_max_requests
Sets the default maximum number of requests that can be proxied upstream through one keepalive connection. After the maximum number of requests is reached, the connection will be closed. A value of 0 will disable this behavior, and a keepalive connection can be used to proxy an indefinite number of requests.

Default: 10000
upstream_keepalive_idle_timeout
Sets the default timeout (in seconds) for which an upstream keepalive connection should be kept open. When the timeout is reached while the connection has not been reused, it will be closed. A value of 0 will disable this behavior, and an idle keepalive connection may be kept open indefinitely.

Default: 60
allow_debug_header
Enable the Kong-Debug header function. If it is on, Kong will add Kong-Route-Id, Kong-Route-Name, Kong-Service-Id, and Kong-Service-Name debug headers to the response when the client request header Kong-Debug: 1 is present.

Default: off
debug_listen_local
Min Version:
3.5
Expose debug_listen functionalities via a Unix domain socket under the Kong prefix.

This option allows local users to use kong debug command to invoke various debug functionalities without needing to enable debug_listen ahead of time.

Default: on
consumers_mem_cache_size
Min Version:
3.10
Size of the shared memory cache for consumers and credentials.

The accepted units are k and m, with a minimum recommended value of a few MBs.

Note: This is only used when the “externalized consumers” feature is active.

Default: 128m
NGINX injected directives
Nginx directives can be dynamically injected in the runtime nginx.conf file without requiring a custom Nginx configuration template.

All configuration properties following the naming scheme nginx*<namespace>*<directive> will result in <directive> being injected in the Nginx configuration block corresponding to the property’s <namespace>. Example: nginx_proxy_large_client_header_buffers = 8 24k

Will inject the following directive in Kong’s proxy server {} block:

large_client_header_buffers 8 24k;

The following namespaces are supported:

nginx*main*<directive>: Injects <directive> in Kong’s configuration main context.
nginx*events*<directive>: Injects <directive> in Kong’s events {} block.
nginx*http*<directive>: Injects <directive> in Kong’s http {} block.
nginx*proxy*<directive>: Injects <directive> in Kong’s proxy server {} block.
nginx*location*<directive>: Injects <directive> in Kong’s proxy / location block (nested under Kong’s proxy server {} block).
nginx*upstream*<directive>: Injects <directive> in Kong’s proxy upstream {} block.
nginx*admin*<directive>: Injects <directive> in Kong’s Admin API server {} block.
nginx*status*<directive>: Injects <directive> in Kong’s Status API server {} block (only effective if status*listen is enabled).
nginx_debug*<directive>: Injects <directive> in Kong’s Debug API server{} block (only effective if debug*listen or debug_listen_local is enabled).
nginx_stream*<directive>: Injects <directive> in Kong’s stream module stream {} block (only effective if stream*listen is enabled).
nginx_sproxy*<directive>: Injects <directive> in Kong’s stream module server {} block (only effective if stream*listen is enabled).
nginx_supstream*<directive>: Injects <directive> in Kong’s stream module upstream {} block.
As with other configuration properties, Nginx directives can be injected via environment variables when capitalized and prefixed with KONG\_. Example: KONG_NGINX_HTTP_SSL_PROTOCOLS -> nginx_http_ssl_protocols

Will inject the following directive in Kong’s http {} block:

ssl_protocols <value>;

If different sets of protocols are desired between the proxy and Admin API server, you may specify nginx_proxy_ssl_protocols and/or nginx_admin_ssl_protocols, both of which take precedence over the http {} block.

nginx_main_worker_rlimit_nofile
Changes the limit on the maximum number of open files for worker processes.

The special and default value of auto sets this value to ulimit -n with the upper bound limited to 16384 as a measure to protect against excess memory use, and the lower bound of 1024 as a good default.

See http://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile

Default: auto
nginx_events_worker_connections
Sets the maximum number of simultaneous connections that can be opened by a worker process.

The special and default value of auto sets this value to ulimit -n with the upper bound limited to 16384 as a measure to protect against excess memory use, and the lower bound of 1024 as a good default.

See http://nginx.org/en/docs/ngx_core_module.html#worker_connections

Default: auto
nginx_http_client_header_buffer_size
Sets buffer size for reading the client request headers. See http://nginx.org/en/docs/http/ngx_http_core_module.html#client_header_buffer_size

Default: 1k
nginx_http_large_client_header_buffers
Sets the maximum number and size of buffers used for reading large client request headers. See http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers

Default: 4 8k
nginx_http_client_max_body_size
Defines the maximum request body size allowed by requests proxied by Kong, specified in the Content-Length request header. If a request exceeds this limit, Kong will respond with a 413 (Request Entity Too Large). Setting this value to 0 disables checking the request body size. See http://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size

Default: 0
nginx_admin_client_max_body_size
Defines the maximum request body size for Admin API.

Default: 10m
nginx_http_charset
Adds the specified charset to the “Content-Type” response header field. If this charset is different from the charset specified in the source_charset directive, a conversion is performed.

The parameter off cancels the addition of charset to the “Content-Type” response header field. See http://nginx.org/en/docs/http/ngx_http_charset_module.html#charset

Default: UTF-8
nginx_http_client_body_buffer_size
Defines the buffer size for reading the request body. If the client request body is larger than this value, the body will be buffered to disk. Note that when the body is buffered to disk, Kong plugins that access or manipulate the request body may not work, so it is advisable to set this value as high as possible (e.g., set it as high as client_max_body_size to force request bodies to be kept in memory). Do note that high-concurrency environments will require significant memory allocations to process many concurrent large request bodies. See http://nginx.org/en/docs/http/ngx_http_core_module.html#client_body_buffer_size

Default: 8k
nginx_admin_client_body_buffer_size
Defines the buffer size for reading the request body on Admin API.

Default: 10m
nginx_http_lua_regex_match_limit
Global MATCH_LIMIT for PCRE regex matching. The default of 100000 should ensure at worst any regex Kong executes could finish within roughly 2 seconds.

Default: 100000
nginx_http_lua_regex_cache_max_entries
Specifies the maximum number of entries allowed in the worker process level PCRE JIT compiled regex cache. It is recommended to set it to at least (number of regex paths \* 2) to avoid high CPU usages if you manually specified router_flavor to traditional. expressions and traditional_compat router do not make use of the PCRE library and their behavior is unaffected by this setting.

Default: 8192
nginx_http_keepalive_requests
Sets the maximum number of client requests that can be served through one keep-alive connection. After the maximum number of requests are made, the connection is closed. Closing connections periodically is necessary to free per-connection memory allocations. Therefore, using too high a maximum number of requests could result in excessive memory usage and is not recommended. See: https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_requests

Default: 10000

## DATASTORE

Kong can run with a database to store coordinated data between Kong nodes in a cluster, or without a database, where each node stores its information independently in memory.

When using a database, Kong will store data for all its entities (such as routes, services, consumers, and plugins) in PostgreSQL, and all Kong nodes belonging to the same cluster must connect to the same database.

Kong supports PostgreSQL versions 9.5 and above.

When not using a database, Kong is said to be in “DB-less mode”: it will keep its entities in memory, and each node needs to have this data entered via a declarative configuration file, which can be specified through the declarative_config property, or via the Admin API using the /config endpoint.

When using Postgres as the backend storage, you can optionally enable Kong to serve read queries from a separate database instance. When the number of proxies is large, this can greatly reduce the load on the main Postgres instance and achieve better scalability. It may also reduce the latency jitter if the Kong proxy node’s latency to the main Postgres instance is high.

The read-only Postgres instance only serves read queries, and write queries still go to the main connection. The read-only Postgres instance can be eventually consistent while replicating changes from the main instance.

At least the pg*ro_host config is needed to enable this feature. By default, all other database config for the read-only connection is inherited from the corresponding main connection config described above but may be optionally overwritten explicitly using the pg_ro*\* config below.

| 항목                             | 설명 (한글)                                                     | 기본값                      |
| -------------------------------- | --------------------------------------------------------------- | --------------------------- |
| database                         | 이 노드의 데이터베이스 사용 여부: postgres/off.                 | postgres                    |
| pg_host                          | PostgreSQL 호스트.                                              | 127.0.0.1                   |
| pg_port                          | PostgreSQL 포트.                                                | 5432                        |
| pg_timeout                       | 연결/읽기/쓰기 타임아웃(ms).                                    | 5000                        |
| pg_user                          | PostgreSQL 사용자.                                              | kong                        |
| pg_password                      | PostgreSQL 사용자 비밀번호.                                     | -                           |
| pg_iam_auth                      | AWS IAM DB 인증 사용 여부. on이면 TLS 강제, pg_password 미사용. | off                         |
| pg_iam_auth_assume_role_arn      | IAM Assume Role 대상 ARN.                                       | -                           |
| pg_iam_auth_role_session_name    | Assume Role 세션 이름.                                          | KongPostgres                |
| pg_iam_auth_sts_endpoint_url     | 커스텀 STS 엔드포인트 URL.                                      | -                           |
| pg_database                      | 데이터베이스명.                                                 | kong                        |
| pg_schema                        | 사용할 스키마(미지정 시 PostgreSQL search_path 따름).           | -                           |
| pg_ssl                           | PostgreSQL과 TLS 사용 여부.                                     | off                         |
| pg_ssl_version                   | TLS 버전: tlsv1_1/tlsv1_2/tlsv1_3/any.                          | tlsv1_2                     |
| pg_ssl_required                  | 서버가 SSL 미지원이면 연결 중단할지 여부.                       | off                         |
| pg_ssl_verify                    | 서버 인증서 검증 여부(lua_ssl_trusted_certificate 참조).        | off                         |
| pg_ssl_cert                      | PostgreSQL 연결용 클라이언트 인증서 경로.                       | -                           |
| pg_ssl_cert_key                  | PostgreSQL 연결용 클라이언트 키 경로.                           | -                           |
| pg_max_concurrent_queries        | 워커당 동시 쿼리 최대치(0은 제한 없음).                         | 0                           |
| pg_semaphore_timeout             | 쿼리 세마포어 획득 타임아웃(ms).                                | 60000                       |
| pg_keepalive_timeout             | Postgres 커넥션 풀 유휴 타임아웃(ms, 0은 무제한).               | -                           |
| pg_pool_size                     | 워커별 Postgres 커넥션 풀 크기.                                 | -                           |
| pg_backlog                       | 풀 초과 시 대기열 크기(대기열도 초과하면 실패).                 | -                           |
| pg_ro_host                       | 읽기 전용 연결용 호스트.                                        | <pg_host>                   |
| pg_ro_port                       | 읽기 전용 연결용 포트.                                          | <pg_port>                   |
| pg_ro_timeout                    | 읽기 전용 연결용 타임아웃.                                      | <pg_timeout>                |
| pg_ro_user                       | 읽기 전용 연결용 사용자.                                        | <pg_user>                   |
| pg_ro_password                   | 읽기 전용 연결용 비밀번호.                                      | <pg_password>               |
| pg_ro_iam_auth                   | 읽기 전용 연결용 IAM 인증 여부.                                 | <pg_iam_auth>               |
| pg_ro_iam_auth_assume_role_arn   | 읽기 전용 연결용 Assume Role ARN.                               | -                           |
| pg_ro_iam_auth_role_session_name | 읽기 전용 연결용 세션 이름.                                     | KongPostgres                |
| pg_ro_iam_auth_sts_endpoint_url  | 읽기 전용 연결용 STS 엔드포인트.                                | -                           |
| pg_ro_database                   | 읽기 전용 연결용 DB명.                                          | <pg_database>               |
| pg_ro_schema                     | 읽기 전용 연결용 스키마.                                        | <pg_schema>                 |
| pg_ro_ssl                        | 읽기 전용 연결용 TLS 사용 여부.                                 | <pg_ssl>                    |
| pg_ro_ssl_required               | 읽기 전용 연결용 TLS 필수 여부.                                 | <pg_ssl_required>           |
| pg_ro_ssl_verify                 | 읽기 전용 연결용 인증서 검증.                                   | <pg_ssl_verify>             |
| pg_ro_ssl_version                | 읽기 전용 연결용 TLS 버전.                                      | <pg_ssl_version>            |
| pg_ro_max_concurrent_queries     | 읽기 전용 동시 쿼리 최대치.                                     | <pg_max_concurrent_queries> |
| pg_ro_semaphore_timeout          | 읽기 전용 세마포어 타임아웃(ms).                                | <pg_semaphore_timeout>      |
| pg_ro_keepalive_timeout          | 읽기 전용 유휴 타임아웃(ms).                                    | <pg_keepalive_timeout>      |
| pg_ro_pool_size                  | 읽기 전용 커넥션 풀 크기.                                       | <pg_pool_size>              |
| pg_ro_backlog                    | 읽기 전용 대기열 크기.                                          | <pg_backlog>                |
| declarative_config               | DB-less 모드시 선언적 구성 파일 경로.                           | -                           |
| declarative_config_string        | 선언적 구성 문자열.                                             | -                           |
| lmdb_environment_path            | DB-less/하이브리드 구성 저장 LMDB 디렉터리(prefix 기준 상대).   | dbless.lmdb                 |
| lmdb_map_size                    | LMDB 메모리 맵 최대 크기.                                       | 2048m                       |

## DATASTORE CACHE

In order to avoid unnecessary communication with the datastore, Kong caches entities (such as APIs, consumers, credentials…) for a configurable period of time. It also handles invalidations if such an entity is updated.

| 항목                     | 설명 (한글)                                                             | 기본값   |
| ------------------------ | ----------------------------------------------------------------------- | -------- |
| db_update_frequency      | 데이터스토어 변경 폴링 주기(초).                                        | 5        |
| db_update_propagation    | 다른 데이터센터 복제 지연 고려 추가 지연(초). 단일 DC/일반 PG는 0 권장. | 0        |
| db_cache_ttl             | 엔티티 캐시 TTL(초). 0이면 만료 없음.                                   | 0        |
| db_cache_neg_ttl         | 미스(no entity) 캐시 TTL(초). 미지정 시 db_cache_ttl 사용.              | -        |
| db_resurrect_ttl         | 스토어 불가 시 오래된 엔티티를 부활 유지하는 시간(초). 만료 시 재시도.  | 30       |
| db_cache_warmup_entities | 기동 시 미리 메모리 캐시에 적재할 엔티티 목록.                          | services |

## DNS RESOLVER

기본적으로 시스템의 `/etc/hosts`, `/etc/resolv.conf`를 사용하며, LOCALDOMAIN/RES_OPTIONS 환경 변수로 일부 동작이 재정의될 수 있습니다. TTL 0 응답은 과도한 조회를 방지하기 위해 1초 캐시가 적용됩니다.

| 항목              | 설명 (한글)                                                                     | 기본값                        |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| dns_resolver      | 사용 할 네임서버 목록(ip[:port], 콤마 구분). 미지정 시 시스템 resolv.conf 사용. | -                             |
| dns_hostsfile     | 사용할 hosts 파일 경로(프로세스 기동 시 1회 로드).                              | /etc/hosts                    |
| dns_order         | 조회할 레코드 타입 순서(대소문자 무시, 콤마 구분).                              | ["LAST", "SRV", "A", "CNAME"] |
| dns_valid_ttl     | 응답 TTL을 무시하고 전역 TTL(초)로 재정의.                                      | -                             |
| dns_stale_ttl     | TTL 만료 후 새 레코드 조회 동안 사용할 Stale 데이터 유지 시간(초).              | 3600                          |
| dns_cache_size    | 메모리 캐시에 저장할 DNS 레코드 최대 개수.                                      | 10000                         |
| dns_not_found_ttl | 빈 응답/이름 오류(3) 응답의 TTL(초).                                            | 30                            |
| dns_error_ttl     | 오류 응답의 TTL(초).                                                            | 1                             |
| dns_no_sync       | 캐시 미스 시 요청 간 DNS 질의를 동기화하지 않음(on)/동기화함(off).              | off                           |

## VAULTS

민감정보(데이터베이스 자격 증명, 개인키, API 키 등)를 안전하게 참조하기 위한 외부 비밀 저장소 설정입니다. 각 제공자별 주요 항목은 아래 표를 참고하세요.

| 공통 항목         | 설명 (한글)                                             | 기본값 |
| ----------------- | ------------------------------------------------------- | ------ |
| vault\*env_prefix | 환경변수 기반 Vault 참조 시 기본 접두사(예: SECRETS\*). | -      |

AWS Secrets Manager

| 항목                        | 설명 (한글)                                             | 기본값    |
| --------------------------- | ------------------------------------------------------- | --------- |
| vault_aws_region            | AWS 리전                                                | -         |
| vault_aws_endpoint_url      | Secrets Manager 엔드포인트 URL(스킴 포함 전체 URL 가능) | -         |
| vault_aws_assume_role_arn   | Assume Role 대상 ARN                                    | -         |
| vault_aws_role_session_name | Assume Role 세션 이름                                   | KongVault |
| vault_aws_sts_endpoint_url  | STS 엔드포인트 URL(설정 시 기본값을 대체)               | -         |
| vault_aws_ttl               | 시크릿 캐시 TTL(초). 0이면 만료 없음                    | 0         |
| vault_aws_neg_ttl           | 미스(no secret) 캐시 TTL(초). 미지정 시 ttl 사용        | -         |
| vault_aws_resurrect_ttl     | 갱신 불가 시 Stale 시크릿 부활 유지 시간(초)            | -         |

GCP Secret Manager

| 항목                    | 설명 (한글)                           | 기본값 |
| ----------------------- | ------------------------------------- | ------ |
| vault_gcp_project_id    | GCP 프로젝트 ID                       | -      |
| vault_gcp_ttl           | 시크릿 캐시 TTL(초). 0이면 만료 없음  | 0      |
| vault_gcp_neg_ttl       | 미스 캐시 TTL(초). 미지정 시 ttl 사용 | -      |
| vault_gcp_resurrect_ttl | Stale 시크릿 부활 유지 시간(초)       | -      |

HashiCorp Vault (HCV)

| 항목                                | 설명 (한글)                            | 기본값     |
| ----------------------------------- | -------------------------------------- | ---------- |
| vault_hcv_protocol                  | 접속 프로토콜(http/https)              | http       |
| vault_hcv_host                      | Vault 호스트                           | 127.0.0.1  |
| vault_hcv_port                      | Vault 포트                             | 8200       |
| vault_hcv_namespace                 | Vault 네임스페이스(Enterprise)         | -          |
| vault_hcv_mount                     | 마운트 지점                            | secret     |
| vault_hcv_kv                        | KV 엔진 버전(v1/v2)                    | v1         |
| vault_hcv_token                     | 인증 토큰 문자열(토큰 방식)            | -          |
| vault_hcv_auth_method               | 인증 방식(token/kubernetes/approle)    | token      |
| vault_hcv_kube_role                 | Kubernetes 방식 사용 시 Vault 롤       | -          |
| vault_hcv_kube_auth_path            | Kubernetes auth 경로                   | kubernetes |
| vault_hcv_kube_api_token_file       | Kubernetes SA 토큰 파일 경로           | -          |
| vault_hcv_approle_auth_path         | AppRole auth 경로                      | approle    |
| vault_hcv_approle_role_id           | AppRole Role ID                        | -          |
| vault_hcv_approle_secret_id         | AppRole Secret ID                      | -          |
| vault_hcv_approle_secret_id_file    | Secret ID 파일 경로(랩핑 토큰 활용 시) | -          |
| vault_hcv_approle_response_wrapping | Secret ID가 랩핑 토큰인지 여부         | false      |
| vault_hcv_ttl                       | 시크릿 캐시 TTL(초). 0이면 만료 없음   | 0          |
| vault_hcv_neg_ttl                   | 미스 캐시 TTL(초). 미지정 시 ttl 사용  | -          |
| vault_hcv_resurrect_ttl             | Stale 시크릿 부활 유지 시간(초)        | -          |
| vault_hcv_cert_auth_role_name       | 인증서 기반 인증 시 롤 이름(3.11+)     | -          |
| vault_hcv_cert_auth_cert            | 인증서 기반 인증용 인증서 내용(3.11+)  | -          |
| vault_hcv_cert_auth_cert_key        | 인증서 기반 인증용 개인키 내용(3.11+)  | -          |

Azure Key Vault

| 항목                      | 설명 (한글)                           | 기본값  |
| ------------------------- | ------------------------------------- | ------- |
| vault_azure_vault_uri     | 접근 가능한 Vault URI                 | -       |
| vault_azure_client_id     | 애플리케이션의 클라이언트 ID          | -       |
| vault_azure_tenant_id     | Azure AD 테넌트(=Directory) ID        | -       |
| vault_azure_type          | 지원 타입(현재 secrets 만 지원)       | secrets |
| vault_azure_ttl           | 시크릿 캐시 TTL(초). 0이면 만료 없음  | 0       |
| vault_azure_neg_ttl       | 미스 캐시 TTL(초). 미지정 시 ttl 사용 | -       |
| vault_azure_resurrect_ttl | Stale 시크릿 부활 유지 시간(초)       | -       |

## TUNING & BEHAVIOR

| 항목                          | 설명 (한글)                                                                  | 기본값                 |
| ----------------------------- | ---------------------------------------------------------------------------- | ---------------------- |
| worker_consistency            | 라우터/밸런서 재빌드 방식(strict/eventual). 성능/일관성 트레이드오프.        | eventual               |
| worker_state_update_frequency | 워커 상태 변경 감지 주기(초). 값이 클수록 DB 부하/지터 감소, 전파 지연 증가. | 5                      |
| router_flavor                 | 라우터 구현 선택(traditional_compatible/expressions/traditional).            | traditional_compatible |
| lua_max_req_headers           | 파싱할 요청 헤더 최대 개수(1~1000).                                          | 100                    |
| lua_max_resp_headers          | 파싱할 응답 헤더 최대 개수(1~1000).                                          | 100                    |
| lua_max_uri_args              | 파싱할 URI 쿼리 파라미터 최대 개수(1~1000).                                  | 100                    |
| lua_max_post_args             | 파싱할 POST 파라미터 최대 개수(1~1000).                                      | 100                    |
| vaults_lazy_load_secrets      | 볼트 시크릿 지연 로드(3.11+). 초기화 시 전체 로드 비활성화.                  | off                    |

## MISCELLANEOUS

| 항목                        | 설명 (한글)                                           | 기본값                |
| --------------------------- | ----------------------------------------------------- | --------------------- |
| lua_ssl_trusted_certificate | Lua cosocket 검증용 CA 목록(system/경로/내용/base64). | system                |
| lua_ssl_verify_depth        | Lua cosocket 인증서 체인 검증 깊이.                   | 1                     |
| lua_ssl_protocols           | Lua cosocket에서 지원할 TLS 버전.                     | TLSv1.2 TLSv1.3       |
| lua_package_path            | Lua 모듈 검색 경로(LUA_PATH).                         | ./?.lua;./?/init.lua; |
| lua_package_cpath           | Lua C 모듈 검색 경로(LUA_CPATH).                      | -                     |
| lua_socket_pool_size        | 원격 서버별 cosocket 커넥션 풀 크기.                  | 256                   |
| enforce_rbac                | Admin API RBAC 적용 모드(on/entity/both/off).         | off                   |
| rbac_auth_header            | RBAC 인증 토큰을 읽을 요청 헤더명.                    | Kong-Admin-Token      |
| event_hooks_enabled         | 이벤트 훅 기능 활성화 여부.                           | on                    |
| fips                        | FIPS 빌드에서 FIPS 모드 활성화.                       | off                   |

## KONG MANAGER

| 항목                                         | 설명 (한글)                                                              | 기본값                               |
| -------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| admin_gui_listen                             | Kong Manager 노출 주소/포트(콤마 구분). admin_listen과 유사 접미사 지원. | ["0.0.0.0:8002", "0.0.0.0:8445 ssl"] |
| admin_gui_url                                | Kong Manager 조회/밸런서 주소 목록(URL, 콤마 구분).                      | -                                    |
| admin_gui_path                               | Manager 서비스 경로 접두사(/로 시작, 끝 / 금지).                         | /                                    |
| admin_gui_api_url                            | Admin API의 호스트/포트/경로(비설정 시 창 호스트+포트 사용).             | -                                    |
| admin_gui_ssl_cert(\_key)                    | SSL 사용 시 인증서/키(경로/내용/base64).                                 | -                                    |
| admin_gui_flags                              | GUI 레이아웃 플래그(JSON).                                               | {}                                   |
| admin_gui_access_log                         | Manager 접근 로그 파일 경로(off 가능).                                   | logs/admin_gui_access.log            |
| admin_gui_error_log                          | Manager 에러 로그 파일 경로(off 가능).                                   | logs/admin_gui_error.log             |
| admin_gui_auth                               | Manager 인증 플러그인(basic-auth/ldap-auth-advanced/openid-connect).     | -                                    |
| admin_gui_auth_conf                          | 인증 플러그인 설정(JSON).                                                | -                                    |
| admin_gui_auth_password_complexity           | basic-auth 비밀번호 규칙(JSON 또는 preset).                              | -                                    |
| admin_gui_session_conf                       | Session 플러그인 설정(JSON).                                             | -                                    |
| admin_gui_auth_header                        | Admin 사용자 식별 헤더명.                                                | Kong-Admin-User                      |
| admin_gui_auth_login_attempts                | 로그인 시도 제한(0은 무제한).                                            | 0                                    |
| admin_gui_header_txt(\_bg_color/\_txt_color) | 상단 배너 텍스트/배경/글자색.                                            | -                                    |
| admin_gui_footer_txt(\_bg_color/\_txt_color) | 하단 배너 텍스트/배경/글자색.                                            | -                                    |
| admin_gui_login_banner_title/body            | 로그인 배너 제목/본문.                                                   | -                                    |
| admin_gui_ssl_protocols                      | Manager TLS 버전.                                                        | TLSv1.2 TLSv1.3                      |
| admin_gui_auth_change_password_attempts/ttl  | 비밀번호 변경 시도 제한/TTL(초).                                         | 0 / 86400                            |
| admin_gui_auth_login_attempts_ttl            | 로그인 시도 레코드 TTL(초).                                              | 604800                               |
| admin_gui_csp_header(\_value)                | CSP 헤더 활성화 및 값(3.10+).                                            | off / (기본값)                       |
| admin_gui_hide_konnect_cta                   | 온프렘 설치 시 Konnect CTA 숨김(3.11+).                                  | off                                  |

The Admin GUI for Kong Enterprise.

### admin_gui_listen

Kong Manager Listeners

Comma-separated list of addresses and ports on which Kong will expose Kong Manager. This web application lets you configure and manage Kong, and therefore should be kept secured.

Suffixes can be specified for each pair, similarly to the admin_listen directive.

Default: ["0.0.0.0:8002", "0.0.0.0:8445 ssl"]

### admin_gui_url

Kong Manager URL

Comma-separated list of addresses (the lookup or balancer) for Kong Manager.

Accepted format (items in square brackets are optional):

<scheme>://<IP / HOSTNAME>[:<PORT>][<PATH>][, <scheme>://<IP / HOSTNAME>[:<PORT>][<PATH>]]

Examples:

http://127.0.0.1:8003
https://kong-admin.test
http://dev-machine
http://127.0.0.1:8003, https://exmple.com/manager

### admin_gui_path

Kong Manager base path

This configuration parameter allows the user to customize the path prefix where Kong Manager is served. When updating this parameter, it’s recommended to update the path in admin_gui_url as well.

Accepted format:

Path must start with a /
Path must not end with a / (except for the /)
Path can only contain letters, digits, hyphens (-), underscores (\_), and slashes (/)
Path must not contain continuous slashes (e.g., // and ///)
Examples:

/
/manager
/kong-manager
/kong/manager
Default: /

### admin_gui_api_url

Hierarchical part of a URI which is composed optionally of a host, port, and path at which the Admin API accepts HTTP or HTTPS traffic. When this config is disabled, Kong Manager will use the window protocol + host and append the resolved admin_listen HTTP/HTTPS port.

### admin_gui_ssl_cert

The SSL certificate for admin_gui_listen values with SSL enabled.

values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### admin_gui_ssl_cert_key

The SSL key for admin_gui_listen values with SSL enabled.

values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### admin_gui_flags

Alters the layout Admin GUI (JSON) to enable Kong Immunity in the Admin GUI.

Default: {}

### admin_gui_access_log

Kong Manager Access Logs

Here you can set an absolute or relative path for Kong Manager access logs. When the path is relative, logs are placed in the prefix location.

Setting this value to off disables access logs for Kong Manager.

Default: logs/admin_gui_access.log

### admin_gui_error_log

Kong Manager Error Logs

Here you can set an absolute or relative path for Kong Manager access logs. When the path is relative, logs are placed in the prefix location.

Setting this value to off disables error logs for Kong Manager.

Granularity can be adjusted through the log_level directive.

Default: logs/admin_gui_error.log

### admin_gui_auth

Kong Manager Authentication Plugin Name

Secures access to Kong Manager by specifying an authentication plugin to use.

Supported Plugins:

basic-auth: Basic Authentication plugin
ldap-auth-advanced: LDAP Authentication plugin
openid-connect: OpenID Connect Authentication plugin

### admin_gui_auth_conf

Kong Manager Authentication Plugin Config (JSON)

Specifies the configuration for the authentication plugin specified in admin_gui_auth.

For information about Plugin Configuration consult the associated plugin documentation.

Example for basic-auth:

admin_gui_auth_conf = { "hide_credentials": true }

### admin_gui_auth_password_complexity

Kong Manager Authentication Password Complexity (JSON)

When admin_gui_auth = basic-auth, this property defines the rules required for Kong Manager passwords. Choose from preset rules or write your own.

Example using preset rules:

admin_gui_auth_password_complexity = { "kong-preset": "min_8" }

All values for kong-preset require the password to contain characters from at least three of the following categories:

Uppercase characters (A through Z)

Lowercase characters (a through z)

Base-10 digits (0 through 9)

Special characters (for example, &, $, #, %)

Supported preset rules:

min_8: minimum length of 8
min_12: minimum length of 12
min_20: minimum length of 20
To write your own rules, see https://manpages.debian.org/jessie/passwdqc/passwdqc.conf.5.en.html.

NOTE: Only keywords “min”, “max” and “passphrase” are supported.

Example:

admin_gui_auth_password_complexity = { "min": "disabled,24,11,9,8" }

### admin_gui_session_conf

Kong Manager Session Config (JSON)

Specifies the configuration for the Session plugin as used by Kong Manager.

For information about plugin configuration, consult the Kong Session plugin documentation.

Example:

admin_gui_session_conf = { "cookie_name": "kookie", \
 "secret": "changeme" }

### admin_gui_auth_header

Defines the name of the HTTP request header from which the Admin API will attempt to identify the Kong Admin user.

Default: Kong-Admin-User

### admin_gui_auth_login_attempts

Number of times a user can attempt to login to Kong Manager. 0 means infinite attempts allowed.

Default: 0

### admin_gui_header_txt

Sets the text for the Kong Manager header banner. Header banner is not shown if this config is empty.

### admin_gui_header_bg_color

Sets the background color for the Kong Manager header banner. Accepts CSS color keyword, #-hexadecimal, or RGB format. Invalid values are ignored by Manager.

### admin_gui_header_txt_color

Sets the text color for the Kong Manager header banner. Accepts CSS color keyword, #-hexadecimal, or RGB format. Invalid values are ignored by Kong Manager.

### admin_gui_footer_txt

Sets the text for the Kong Manager footer banner. Footer banner is not shown if this config is empty.

### admin_gui_footer_bg_color

Sets the background color for the Kong Manager footer banner. Accepts CSS color keyword, #-hexadecimal, or RGB format. Invalid values are ignored by manager.

### admin_gui_footer_txt_color

Sets the text color for the Kong Manager footer banner. Accepts CSS color keyword, #-hexadecimal, or RGB format. Invalid values are ignored by Kong Manager.

### admin_gui_login_banner_title

Sets the title text for the Kong Manager login banner. Login banner is not shown if both admin_gui_login_banner_title and admin_gui_login_banner_body are empty.

### admin_gui_login_banner_body

Sets the body text for the Kong Manager login banner. Login banner is not shown if both admin_gui_login_banner_title and admin_gui_login_banner_body are empty.

### admin_gui_ssl_protocols

Min Version:
3.5
Defines the TLS versions supported for Kong Manager

Default: TLSv1.2 TLSv1.3

### admin_gui_auth_change_password_attempts

Min Version:
3.8
Number of times a user can attempt to change password. 0 means infinite attempts allowed.

Default: 0

### admin_gui_auth_change_password_ttl

Min Version:
3.8
Length, in seconds, of the TTL for changing password attempts records. Records in the database older than their TTL are automatically purged.

Example, 1 days: 1 _ 24 _ 60 \* 60 = 86400.

Default: 86400

### admin_gui_auth_login_attempts_ttl

Min Version:
3.9
Length, in seconds, of the TTL for changing login attempts records. Records in the database older than their TTL are automatically purged.

This argument can be set to an integer between 0 and 100000000.

Example, 7 days: 7 _ 24 _ 60 \* 60 = 604800.

Default: 604800

### admin_gui_csp_header

Min Version:
3.10
Enable or disable the Content-Security-Policy (CSP) header for Kong Manager

This configuration controls the presence of the CSP header when serving Kong Manager. The default CSP header value will be used unless customized.

To modify the value of the served CSP header, refer to the admin_gui_csp_header_value configuration.

Set this configuration to on to enable the CSP header.

Default: off

### admin_gui_csp_header_value

Min Version:
3.10
The value of the Content-Security-Policy (CSP) header for Kong Manager.

This configuration controls the value of the CSP header when serving Kong Manager. If omitted or left empty, the default CSP header value will be used.

This is an advanced configuration intended for cases where the default CSP header value does not meet your requirements. Use with caution.

For more information on the CSP header, see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

### admin_gui_hide_konnect_cta

Min Version:
3.11
Hides all Konnect call to actions in Kong Manager. This setting is only relevant for on-prem installations of Kong Enterprise.

Default: off

## VITALS

| 항목                              | 설명 (한글)                                   | 기본값   |
| --------------------------------- | --------------------------------------------- | -------- |
| vitals                            | Vitals 메트릭 수집/표시 활성화.               | on       |
| vitals_strategy                   | 메트릭 저장소(database/prometheus/influxdb).  | database |
| vitals_tsdb_address               | TSDB 서버 주소(host:port 또는 URL).           | -        |
| vitals_tsdb_user/password         | InfluxDB 사용자/비밀번호.                     | -        |
| vitals_statsd_address             | Prometheus 전략 사용 시 StatsD 주소(udp/tcp). | -        |
| vitals_statsd_prefix              | StatsD 메트릭 프리픽스.                       | kong     |
| vitals_statsd_udp_packet_size     | StatsD UDP 배치 버퍼 크기(바이트).            | 1024     |
| vitals_prometheus_scrape_interval | Prometheus 스크랩 간격(초).                   | 5        |

### vitals

When enabled, Kong will store and report metrics about its performance.

When running Kong in a multi-node setup, vitals entails two separate meanings depending on the node.

On a Proxy-only node, vitals determines whether to collect data for Vitals.

On an Admin-only node, vitals determines whether to display Vitals metrics and visualizations on the dashboard.

Default: on

### vitals_strategy

Determines whether to use the Kong database or a separate storage engine for Vitals metrics. Accepted values are database, prometheus, or influxdb.

Default: database

### vitals_tsdb_address

Defines the host and port of the TSDB server to which Vitals data is written and read. This value is only applied when the vitals_strategy option is set to prometheus or influxdb. This value accepts IPv4, IPv6, and hostname values. If the vitals_strategy is set to prometheus, this value determines the address of the Prometheus server from which Vitals data will be read. For influxdb strategies, this value controls both the read and write source for Vitals data.

### vitals_tsdb_user

Influxdb user

### vitals_tsdb_password

Influxdb password

### vitals_statsd_address

Defines the host and port (and an optional protocol) of the StatsD server to which Kong should write Vitals metics. This value is only applied when the vitals_strategy is set to prometheus. This value accepts IPv4, IPv6, and, hostnames. Additionally, the suffix tcp can be specified; doing so will result in Kong sending StatsD metrics via TCP instead of the UDP (default).

### vitals_statsd_prefix

Defines the prefix value attached to all Vitals StatsD events. This prefix is useful when writing metrics to a multi-tenant StatsD exporter or server.

Default: kong

### vitals_statsd_udp_packet_size

Defines the maximum buffer size in which Vitals statsd metrics will be held and sent in batches. This value is defined in bytes.

Default: 1024

### vitals_prometheus_scrape_interval

Defines the scrape_interval query parameter sent to the Prometheus server when reading Vitals data. This should be same as the scrape interval (in seconds) of the Prometheus server.

Default: 5

## Konnect

| 항목                        | 설명 (한글)                                      | 기본값 |
| --------------------------- | ------------------------------------------------ | ------ |
| konnect_mode                | 데이터플레인을 Konnect에 연결.                   | off    |
| analytics_flush_interval    | 애널리틱스/라이선스 데이터 플러시 최대 주기(초). | 1      |
| analytics_buffer_size_limit | 네트워크 불가 시 버퍼 최대 메시지 수.            | 100000 |
| analytics_debug             | 애널리틱스 페이로드를 로그에 출력(3.5+).         | off    |

### konnect_mode

When enabled, the dataplane is connected to Konnect

Default: off

### Analytics for Konnect

### analytics_flush_interval

Specify the maximum frequency, in seconds, at which local analytics and licensing data are flushed to the database or Konnect, depending on the installation mode. Kong also triggers a flush when the number of messages in the buffer is less than analytics_buffer_size_limit, regardless of whether the specified time interval has elapsed.

Default: 1

### analytics_buffer_size_limit

Max number of messages can be buffered locally before dropping data in case there is no network connection to Konnect.

Default: 100000

### analytics_debug

Min Version:
3.5
Outputs analytics payload to Kong logs.

Default: off

## DEVELOPER PORTAL

| 항목                            | 설명 (한글)                                    | 기본값                                                 |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| portal                          | 개발자 포털 노출 스위치.                       | off                                                    |
| portal_gui_listen               | Portal GUI 주소/포트(콤마 구분).               | ["0.0.0.0:8003", "0.0.0.0:8446 ssl"]                   |
| portal_gui_protocol             | Portal GUI 프로토콜(http/https).               | http                                                   |
| portal_gui_host                 | Portal GUI 호스트(:포함 가능, 경로 포함 가능). | 127.0.0.1:8003                                         |
| portal_cors_origins             | 허용 CORS Origin 목록(\* 가능).                | -                                                      |
| portal_gui_use_subdomains       | 워크스페이스를 서브도메인으로 사용.            | off                                                    |
| portal_gui_ssl_cert(\_key)      | Portal GUI SSL 인증서/키.                      | -                                                      |
| portal_gui_access_log/error_log | Portal GUI 접근/에러 로그 경로.                | logs/portal_gui_access.log / logs/portal_gui_error.log |
| portal_api_listen               | Portal API 주소/포트(콤마 구분).               | ["0.0.0.0:8004", "0.0.0.0:8447 ssl"]                   |
| portal_api_url                  | Portal API 조회/밸런서 주소(URL).              | http://0.0.0.0:8004                                    |
| portal_api_ssl_cert(\_key)      | Portal API SSL 인증서/키.                      | -                                                      |
| portal_api_access_log/error_log | Portal API 접근/에러 로그 경로.                | logs/portal_api_access.log / logs/portal_api_error.log |
| portal_is_legacy                | 신규 포털을 레거시 렌더러로 강제.              | off                                                    |
| portal_app_auth                 | application_registration용 기본 인증 공급자.   | kong-oauth2                                            |

### portal

Developer Portal Switch

When enabled:

Kong will expose the Dev Portal interface and read-only APIs on the portal_gui_listen address, and endpoints on the Admin API to manage assets.

When enabled along with portal_auth:

Kong will expose management endpoints for developer accounts on the Admin API and the Dev Portal API.

Default: off

### portal_gui_listen

Developer Portal GUI Listeners

Comma-separated list of addresses on which Kong will expose the Developer Portal GUI. Suffixes can be specified for each pair, similarly to the admin_listen directive.

Default: ["0.0.0.0:8003", "0.0.0.0:8446 ssl"]

### portal_gui_protocol

Developer Portal GUI protocol

The protocol used in conjunction with portal_gui_host to construct the lookup, or balancer address for your Kong Proxy nodes.

Examples: http,https

Default: http

### portal_gui_host

Developer Portal GUI host

The host used in conjunction with portal_gui_protocol to construct the lookup, or balancer address for your Kong Proxy nodes.

Examples:

<IP>:<PORT> -> portal_gui_host = 127.0.0.1:8003
<HOSTNAME> -> portal_gui_host = portal_api.domain.tld
<HOSTNAME>/<PATH> -> portal_gui_host = dev-machine/dev-285
Default: 127.0.0.1:8003

### portal_cors_origins

Developer Portal CORS Origins

A comma separated list of allowed domains for Access-Control-Allow-Origin header. This can be used to resolve CORS issues in custom networking environments.

Examples:

list of domains: portal_cors_origins = http://localhost:8003, https://localhost:8004
single domain: portal_cors_origins = http://localhost:8003
all domains: portal_cors_origins = \*
NOTE: In most cases, the Developer Portal is able to derive valid CORS origins by using portal_gui_protocol, portal_gui_host, and if applicable, portal_gui_use_subdomains. In these cases, portal_cors_origins is not needed and can remain unset.

### portal_gui_use_subdomains

Developer Portal GUI subdomain toggle

By default Kong Portal uses the first namespace in the request path to determine workspace. By turning portal_gui_subdomains on, Kong Portal will expect workspace to be included in the request url as a subdomain.

Example (off):

<scheme>://<HOSTNAME>/<WORKSPACE>/<PATH> -> http://kong-portal.com/example-workspace/index
Example (on):

<scheme>://<WORKSPACE>.<HOSTNAME> -> http://example-workspace.kong-portal.com/index
Default: off

### portal_gui_ssl_cert

Developer Portal GUI SSL Certificate

The SSL certificate for portal_gui_listen values with SSL enabled.

values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### portal_gui_ssl_cert_key

Developer Portal GUI SSL Certificate Key

The SSL key for portal_gui_listen values with SSL enabled.

values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### portal_gui_access_log

Developer Portal GUI Access Log location

Here you can set an absolute or relative path for your Portal GUI access logs.

Setting this value to off will disable logging Portal GUI access logs.

When using relative pathing, logs will be placed under the prefix location.

Default: logs/portal_gui_access.log

### portal_gui_error_log

Developer Portal GUI Error Log location

Here you can set an absolute or relative path for your Portal GUI error logs.

Setting this value to off will disable logging Portal GUI error logs.

When using relative pathing, logs will be placed under the prefix location.

Granularity can be adjusted through the log_level directive.

Default: logs/portal_gui_error.log

### portal_api_listen

Developer Portal API Listeners

Comma-separated list of addresses on which Kong will expose the Developer Portal API. Suffixes can be specified for each pair, similarly to the admin_listen directive.

Default: ["0.0.0.0:8004", "0.0.0.0:8447 ssl"]

### portal_api_url

Developer Portal API URL

The lookup, or balancer, address for your Developer Portal nodes.

This value is commonly used in a microservices or service-mesh oriented architecture.

portal_api_url is the address on which your Kong Dev Portal API is accessible by Kong. You should only set this value if your Kong Dev Portal API lives on a different node than your Kong Proxy.

Accepted format (parts in parenthesis are optional):

<scheme>://<IP / HOSTNAME>(:<PORT>(/<PATH>))

Examples:

<scheme>://<IP>:<PORT> -> portal_api_url = http://127.0.0.1:8003
SSL <scheme>://<HOSTNAME> -> portal_api_url = https://portal_api.domain.tld
<scheme>://<HOSTNAME>/<PATH> -> portal_api_url = http://dev-machine/dev-285
By default this value points to the local interface:

http://0.0.0.0:8004

### portal_api_ssl_cert

Developer Portal API SSL Certificate

The SSL certificate for portal_api_listen values with SSL enabled.

values:

absolute path to the certificate
certificate content
base64 encoded certificate content

### portal_api_ssl_cert_key

Developer Portal API SSL Certificate Key

The SSL key for portal_api_listen values with SSL enabled.

values:

absolute path to the certificate key
certificate key content
base64 encoded certificate key content

### portal_api_access_log

Developer Portal API Access Log location

Here you can set an absolute or relative path for your Portal API access logs.

Setting this value to off will disable logging Portal API access logs.

When using relative pathing, logs will be placed under the prefix location.

Default: logs/portal_api_access.log

### portal_api_error_log

Developer Portal API Error Log location

Here you can set an absolute or relative path for your Portal API error logs.

Setting this value to off will disable logging Portal API error logs.

When using relative pathing, logs will be placed under the prefix location.

Granularity can be adjusted through the log_level directive.

Default: logs/portal_api_error.log

### portal_is_legacy

Developer Portal legacy support

Setting this value to on will cause all new portals to render using the legacy rendering system by default.

Setting this value to off will cause all new portals to render using the current rendering system.

Default: off

### portal_app_auth

Developer Portal application registration auth provider and strategy. Must be set to enable application_registration plugin

Default: kong-oauth2

## DEFAULT DEVELOPER PORTAL AUTHENTICATION

| 항목                            | 설명 (한글)                                    | 기본값 |
| ------------------------------- | ---------------------------------------------- | ------ |
| portal_auth                     | 포털 인증 플러그인(basic-auth/openid-connect). | -      |
| portal_auth_password_complexity | basic-auth 비밀번호 규칙(JSON 또는 preset).    | -      |
| portal_auth_conf                | 인증 플러그인 설정(JSON).                      | -      |
| portal_auth_login_attempts      | 로그인 시도 제한(0은 무제한).                  | 0      |
| portal_session_conf             | 포털 Session 플러그인 설정(JSON).              | -      |
| portal_auto_approve             | 개발자 자동 승인 on/off.                       | off    |
| portal_token_exp                | 비밀번호 재설정 토큰 만료(초).                 | 21600  |
| portal_email_verification       | 가입 이메일 검증 on/off(이메일 전송 필요).     | off    |

Referenced on workspace creation to set Dev Portal authentication defaults in the database for that particular workspace.

### portal_auth

Developer Portal Authentication Plugin Name

Specifies the authentication plugin to apply to your Developer Portal. Developers will use the specified form of authentication to request access, register, and login to your Developer Portal.

Supported Plugins:

Basic Authentication: portal_auth = basic-auth
OIDC Authentication: portal_auth = openid-connect

### portal_auth_password_complexity

Kong Portal Authentication Password Complexity (JSON)

When portal_auth = basic-auth, this property defines the rules required for Kong Portal passwords. Choose from preset rules or write your own.

Example using preset rules:

portal_auth_password_complexity = { "kong-preset": "min_8" }

All values for kong-preset require the password to contain characters from at least three of the following categories:

Uppercase characters (A through Z)

Lowercase characters (a through z)

Base-10 digits (0 through 9)

Special characters (for example, &, $, #, %)

Supported preset rules:

min_8: minimum length of 8
min_12: minimum length of 12
min_20: minimum length of 20
To write your own rules, see https://manpages.debian.org/jessie/passwdqc/passwdqc.conf.5.en.html.

NOTE: Only keywords “min”, “max” and “passphrase” are supported.

Example:

portal_auth_password_complexity = { "min": "disabled,24,11,9,8" }

### portal_auth_conf

Developer Portal Authentication Plugin Config (JSON)

Specifies the plugin configuration object in JSON format to be applied to your Developer Portal authentication.

For information about Plugin Configuration consult the associated plugin documentation.

Example for basic-auth:

portal_auth_conf = { "hide_credentials": true }

### portal_auth_login_attempts

Number of times a user can attempt to login to the Dev Portal before password must be reset.

0 (default) means infinite attempts allowed.

Note: Any value greater than 0 will only affect Dev Portals secured with basic-auth.

Default: 0

### portal_session_conf

Portal Session Config (JSON)

Specifies the configuration for the Session plugin as used by Kong Portal.

For information about Plugin Configuration consult the Kong Session Plugin documentation.

Example:

portal_session_conf = { "cookie_name": "portal_session", \
 "secret": "changeme", \
 "storage": "kong" }

### portal_auto_approve

Developer Portal Auto Approve Access

When set to on, a developer will automatically be marked as “approved” after completing registration. Access can still be revoked through Kong Manager or the Admin API.

When set to off, a Kong admin will have to manually approve the Developer using Kong Manager or the Admin API.

Default: off

### portal_token_exp

Duration in seconds for the expiration of the Dev Portal reset password token. Default is 21600 (six hours).

Default: 21600

### portal_email_verification

Portal Developer Email Verification.

When enabled Developers will receive an email upon registration to verify their account. Developers will not be able to use the Developer Portal until they verify their account, even if auto-approve is enabled.

Note: SMTP must be turned on in order to use this feature.

Default: off

## DEFAULT PORTAL SMTP CONFIGURATION

| 항목                             | 설명 (한글)                           | 기본값 |
| -------------------------------- | ------------------------------------- | ------ |
| portal_invite_email              | 초대 이메일 발송.                     | on     |
| portal_access_request_email      | 접근 요청 이메일(관리자에게).         | on     |
| portal_approved_email            | 승인 이메일 발송.                     | on     |
| portal_reset_email               | 비밀번호 재설정 이메일 발송.          | on     |
| portal_reset_success_email       | 재설정 성공 알림 이메일.              | on     |
| portal_application_status_email  | 앱 신청 상태 변경 알림 이메일.        | off    |
| portal_application_request_email | 앱 신청 알림 이메일(관리자에게).      | off    |
| portal_emails_from               | 포털 이메일 From 헤더(이름 <이메일>). | -      |
| portal_emails_reply_to           | 포털 이메일 Reply-To.                 | -      |
| portal_smtp_admin_emails         | 포털 알림 관리자 이메일 목록(콤마).   | -      |

Referenced on workspace creation to set SMTP defaults in the database for that particular workspace.

### portal_invite_email

When enabled, Kong admins can invite developers to a Dev Portal by using the Invite button in Kong Manager.

The email looks like the following:

Subject: Invite to access Dev Portal <WORKSPACE_NAME>

Hello Developer!

You have been invited to create a Dev Portal account at %s.
Please visit `<DEV_PORTAL_URL/register>` to create your account.
Default: on

### portal_access_request_email

When enabled, Kong admins specified by smtp_admin_emails will receive an email when a developer requests access to a Dev Portal.

When disabled, Kong admins will have to manually check the Kong Manager to view any requests.

The email looks like the following:

Subject: Request to access Dev Portal <WORKSPACE NAME>

Hello Admin!

<DEVELOPER NAME> has requested Dev Portal access for <WORKSPACE_NAME>.
Please visit <KONG_MANAGER_URL/developers/requested> to review this request.
Default: on

### portal_approved_email

When enabled, developers will receive an email when access to a Dev Portal has been approved.

When disabled, developers will receive no indication that they have beenapproved. It is suggested to only disable this feature if portal_auto_approve is enabled.

The email looks like the following:

Subject: Dev Portal access approved

Hello Developer!
You have been approved to access <WORKSPACE_NAME>.
Please visit <DEV PORTAL URL/login> to login.
Default: on

### portal_reset_email

When enabled, developers will be able to use the Reset Password flow on a Dev Portal and will receive an email with password reset instructions.

Note: When disabled, developers will not be able to reset their account passwords. The password resetting email is the only way to reset developer passwords.

The email looks like the following:

Subject: Password Reset Instructions for Dev Portal <WORKSPACE_NAME>.

Hello Developer,

Please click the link below to reset your Dev Portal password.

<DEV_PORTAL_URL/reset?token=12345>

This link will expire in <portal_reset_token_exp>

If you didn't make this request, keep your account secure by clicking
the link above to change your password.
Default: on

### portal_reset_success_email

When enabled, developers will receive an email after successfully resetting their Dev Portal account password.

When disabled, developers will still be able to reset their account passwords, but will not receive a confirmation email.

The email looks like the following:

Subject: Dev Portal password change success

Hello Developer,
We are emailing you to let you know that your Dev Portal password at <DEV_PORTAL_URL> has been changed.

Click the link below to sign in with your new credentials.

<DEV_PORTAL_URL>
Default: on

### portal_application_status_email

When enabled, developers will receive an email when the status changes for their appliciation service requests.

When disabled, developers will still be able to view the status in their developer portal application page.

The email looks like the following:

Subject: Dev Portal application request <REQUEST_STATUS> (<DEV_PORTAL_URL>)

Hello Developer,
We are emailing you to let you know that your request for application access from the
Developer Portal account at <DEV_PORTAL_URL> is <REQUEST_STATUS>.

Application: <APPLICATION_NAME>
Service: <SERVICE_NAME>

You will receive another email when your access has been approved.
Default: off

### portal_application_request_email

When enabled, Kong admins specified by smtp_admin_emails will receive an email when a developer requests access to service through an application.

When disabled, Kong admins will have to manually check the Kong Manager to view any requests.

By default, smtp_admin_emails will be the recipients. This can be overriden by portal_smtp_admin_emails, which can be set dynamically per workspace through the Admin API.

The email looks like the following:

Subject: Request to access Dev Portal (<DEV_PORTAL_URL>) service from <DEVELOPER_EMAIL>

Hello Admin,

<DEVELOPER NAME> (<DEVELOPER_EMAIL>) has requested application access for <DEV_PORTAL_URL>.

Requested workspace: <WORKSPACE_NAME>
Requested application: <APPLICATION_NAME>
Requested service: <SERVICE_NAME>

Please visit <KONG_MANAGER_URL/WORKSPACE_NAME/applications/APPLICATION_ID#requested> to review this request.
Default: off

### portal_emails_from

The name and email address for the From header included in all Dev Portal emails.

Example: portal_emails_from = Your Name <example@example.com>

Note: Some SMTP servers will not use this value, but instead insert the email and name associated with the account.

### portal_emails_reply_to

Email address for the Reply-To header for portal emails

Example: portal_emails_reply_to = example@example.com

Note: Some SMTP servers will not use this value, but instead insert the email associated with the account.

### portal_smtp_admin_emails

Comma separated list of admin emails to receive portal notifications. Can be dynamically set per workspace through the Admin API.

If not set, smtp_admin_emails will be used.

Example admin1@example.com, admin2@example.com

## ADMIN SMTP CONFIGURATION

| 항목                    | 설명 (한글)                            | 기본값 |
| ----------------------- | -------------------------------------- | ------ |
| admin_emails_from       | 관리자 이메일 From.                    | ""     |
| admin_emails_reply_to   | 관리자 이메일 Reply-To.                | -      |
| admin_invitation_expiry | 관리자 초대 링크 만료(초, 0은 무제한). | 259200 |

### admin_emails_from

The email address for the From header for admin emails.

Default: ""

### admin_emails_reply_to

Email address for the Reply-To header for admin emails.

### admin_invitation_expiry

Expiration time for the admin invitation link (in seconds). 0 means no expiration.

Example, 72 hours: 72 _ 60 _ 60 = 259200

Default: 259200

## GENERAL SMTP CONFIGURATION

| 항목                           | 설명 (한글)                   | 기본값                |
| ------------------------------ | ----------------------------- | --------------------- |
| smtp_mock                      | 이메일 발송 모의(on).         | on                    |
| smtp_host                      | SMTP 호스트                   | localhost             |
| smtp_port                      | SMTP 포트                     | 25                    |
| smtp_starttls                  | STARTTLS 사용(on)             | off                   |
| smtp_username/password         | SMTP 인증 사용자/비밀번호     | -                     |
| smtp_ssl                       | SMTPS 사용(on, 보통 465)      | off                   |
| smtp_auth_type                 | 인증 방식(plain/login/nil)    | -                     |
| smtp_domain                    | EHLO/Message-ID용 도메인      | localhost.localdomain |
| smtp_timeout_connect/send/read | 연결/전송/수신 타임아웃(ms)   | 60000 / 60000 / 60000 |
| smtp_admin_emails              | 관리자 알림 이메일 목록(콤마) | -                     |

### smtp_mock

This flag will mock the sending of emails. This can be used for testing before the SMTP client is fully configured.

Default: on

### smtp_host

The hostname of the SMTP server to connect to.

Default: localhost

### smtp_port

The port number on the SMTP server to connect to.

Default: 25

### smtp_starttls

When set to on, STARTTLS is used to encrypt communication with the SMTP server. This is normally used in conjunction with port 587.

Default: off

### smtp_username

Username used for authentication with SMTP server

### smtp_password

Password used for authentication with SMTP server

### smtp_ssl

When set to on, SMTPS is used to encrypt communication with the SMTP server. This is normally used in conjunction with port 465.

Default: off

### smtp_auth_type

The method used to authenticate with the SMTP server Valid options are plain, login, or nil

### smtp_domain

The domain used in the EHLO connection and part of the Message-ID header

Default: localhost.localdomain

### smtp_timeout_connect

The timeout (in milliseconds) for connecting to the SMTP server.

Default: 60000

### smtp_timeout_send

The timeout (in milliseconds) for sending data to the SMTP server.

Default: 60000

### smtp_timeout_read

The timeout (in milliseconds) for reading data from the SMTP server.

Default: 60000

### smtp_admin_emails

Comma separated list of admin emails to receive notifications. Example admin1@example.com, admin2@example.com

## DATA & ADMIN AUDIT

Admin API/DB 접근에 대한 상세 감사 로그를 저장합니다.

| 항목                      | 설명 (한글)                                  | 기본값                        |
| ------------------------- | -------------------------------------------- | ----------------------------- |
| audit_log                 | Admin API/DB 생성·수정·삭제 감사 로깅 활성화 | off                           |
| audit_log_ignore_methods  | 감사 제외 HTTP 메서드 목록(콤마)             | -                             |
| audit_log_ignore_paths    | 감사 제외 요청 경로 목록(콤마)               | -                             |
| audit_log_ignore_tables   | 감사 제외 DB 테이블 목록(콤마)               | -                             |
| audit_log_payload_exclude | 페이로드에서 숨길 키 목록                    | ["token","secret","password"] |
| audit_log_record_ttl      | 감사 레코드 TTL(초)                          | 2592000                       |
| audit_log_signing_key     | 감사 레코드 서명용 RSA 개인키 경로           | -                             |

When enabled, Kong will store detailed audit data regarding Admin API and database access. In most cases, updates to the database are associated with Admin API requests. As such, database object audit log data is tied to a given HTTP request via a unique identifier, providing built-in association of Admin API and database traffic.

### audit_log

When enabled, Kong will log information about Admin API access and database row insertions, updates, and deletions.

Default: off

### audit_log_ignore_methods

Comma-separated list of HTTP methods that will not generate audit log entries. By default, all HTTP requests will be logged.

### audit_log_ignore_paths

Comma-separated list of request paths that will not generate audit log entries. By default, all HTTP requests will be logged.

### audit_log_ignore_tables

Comma-separated list of database tables that will not generate audit log entries. By default, updates to all database tables will be logged (the term “updates” refers to the creation, update, or deletion of a row).

### audit_log_payload_exclude

Comma-separated list of keys that will be filtered out of the payload. Keys that were filtered will be recorded in the audit log.

Default: ["token", "secret", "password"]

### audit_log_record_ttl

Length, in seconds, of the TTL for audit log records. Records in the database older than their TTL are automatically purged.

Example, 30 days: 30 _ 24 _ 60 \* 60 = 2592000

Default: 2592000

### audit_log_signing_key

Defines the path to a private RSA signing key that can be used to insert a signature of audit records, adjacent to the record. The corresponding public key should be stored offline, and can be used to validate audit entries in the future. If this value is undefined, no signature will be generated.

## GRANULAR TRACING

Deprecation warning: Granular tracing is deprecated. This means the feature will eventually be removed. Our target for Granular tracing removal is the Kong Gateway 4.0 release.

Granular tracing offers a mechanism to expose metrics and detailed debug data about the lifecycle of Kong in a human- or machine-consumable format.

### tracing

Removed in:
3.7
When enabled, Kong will generate granular debug data about various portions of the request lifecycle, such as DB or DNS queries, plugin execution, core handler timing, etc.

Default: off

### tracing_write_strategy

Removed in:
3.7
Defines how Kong will write tracing data at the conclusion of the request. The default option, file, writes a human-readable depiction of tracing data to a configurable location on the node’s file system. Other strategies write tracing data as a JSON document to the configured endpoint. Valid entries for this option are file, file_raw, http, tcp, tls, and udp.

Default: file

### tracing_write_endpoint

Removed in:
3.7
Defines the endpoint to which tracing data will be written.

For the file and file_raw tracing write strategies, this value must be a valid location on the node’s file system to which Kong must have write access.
For the tcp, tls, and udp strategies, this value is defined as a string in the form of: <HOST>:<PORT>
For the http strategy, this value is defined in the form of: <scheme>://<IP / HOSTNAME>(:<PORT>(/<PATH>))
Traces sent via HTTP are delivered via POST method with an application/json Content-Type.

### tracing_time_threshold

Removed in:
3.7
The minimum time, in microseconds, over which a trace must execute in order to write the trace data to the configured endpoint. This configuration can be used to lower the noise present in trace data by removing trace objects that are not interesting from a timing perspective. The default value of 0 removes this limitation, causing traces of any duration to be written.

Default: 0

### tracing_types

Removed in:
3.7
Defines the types of traces that are written. Trace types not defined in this list are ignored, regardless of their lifetime. The default special value of all results in all trace types being written, regardless of type.

The following trace types are included:

query: trace the database query
legacy_query: (deprecated) trace the database query with legacy DAO
router: trace Kong routing the request; internal routing time
balancer: trace the execution of the overall balancer phase
balancer.getPeer: trace Kong selecting an upstream peer from the ring-balancer
balancer.toip: trace balancer to resolve peer’s host to IP
connect.toip: trace cosocket to resolve target’s host to IP
access.before: trace the preprocessing of access phase, like parameter parsing, route matching, and balance preparation
access.after: trace the postprocess of access phase, like balancer execution and internal variable assigning
plugin: trace plugins phase handlers
Default: all

### tracing_debug_header

Removed in:
3.7
Defines the name of the HTTP request header that must be present in order to generate traces within a request. Setting this value provides a mechanism to selectively generate request traces at the client’s request. Note that the value of the header does not matter, only that the header is present in the request. When this value is not set and tracing is enabled, Kong will generate trace data for all requests flowing through the proxy and Admin API. Note that data from certificate handling phases is not logged when this setting is enabled.

### generate_trace_details

Removed in:
3.7
When enabled, Kong will write context- specific details into traces. Trace details offer more data about the context of the trace. This can significantly increase the size of trace reports. Note also that trace details may contain potentially sensitive information, such as raw SQL queries; care should be taken to store traces properly when this option is enabled.

Default: off

## ROUTE COLLISION DETECTION/PREVENTION

### route_validation_strategy

The strategy used to validate routes when creating or updating them. Different strategies are available to tune how to enforce splitting traffic of workspaces.

smart is the default option and uses the algorithm described in https://docs.konghq.com/gateway/latest/kong-enterprise/workspaces/.
off disables any check.
path enforces routes to comply with the pattern described in config enforce_route_path_pattern.
static relies on the PostgreSQL database. Before creating a new route, it checks if the route is unique across all workspaces based on the following params: paths, methods, and hosts. If all fields of the new route overlap with an existing one, a 409 is returned with the route of the collision. The array order is not important for the overlap filter.
Default: smart

### enforce_route_path_pattern

Specifies the Lua pattern which will be enforced on the paths attribute of a route object. You can also add a placeholder for the workspace in the pattern, which will be rendered during runtime based on the workspace to which the route belongs. This setting is only relevant if route_validation_strategy is set to path.

Note: The collision detection is only supported for plain text routes, do not rely on this feature to validate regex routes.

Example For Pattern /$(workspace)/v%d/.\* valid paths are:

/group1/v1/ if route belongs to workspace group1.

/group2/v1/some_path if route belongs to workspace group2.

## DATABASE ENCRYPTION & KEYRING MANAGEMENT

When enabled, Kong will transparently encrypt sensitive fields, such as consumer credentials, TLS private keys, and RBAC user tokens, among others. A full list of encrypted fields is available from the Kong Enterprise documentation site. Encrypted data is transparently decrypted before being displayed to the Admin API or made available to plugins or core routing logic.

While this feature is GA, do note that we currently do not provide normal semantic versioning compatibility guarantees on the keyring feature’s APIs in that Kong may make a breaking change to the feature in a minor version. Also note that mismanagement of keyring data may result in irrecoverable data loss.

### keyring_enabled

When enabled, Kong will encrypt sensitive field values before writing them to the database, and subsequently decrypt them when retrieving data for the Admin API, Developer Portal, or proxy business logic. Symmetric encryption keys are managed based on the strategy defined below.

Default: off

### keyring_strategy

Defines the strategy implementation by which Kong nodes will manage symmetric encryption keys. Please see the Kong Enterprise documentation for a detailed description of each strategy. Acceptable values for this option are cluster and vault.

Default: cluster

### keyring_public_key

Defines the public key of an RSA keypair. This keypair is used for symmetric keyring import/export, e.g., for disaster recovery and optional bootstrapping.

Values:

absolute path to the public key
public key content
base64 encoded public key content

### keyring_private_key

Defines the private key of an RSA keypair. This keypair is used for symmetric keyring import/export, e.g., for disaster recovery and optional bootstrapping.

Values:

absolute path to the private key
private key content
base64 encoded private key content

### keyring_blob_path

Defines the filesystem path at which Kong will back up the initial keyring material. This option is useful largely for development purposes.

### keyring_vault_host

Defines the Vault host at which Kong will fetch the encryption material. This value should be defined in the format:

<scheme>://<IP / HOSTNAME>:<PORT>

### keyring_vault_mount

Defines the name of the Vault v2 KV secrets engine at which symmetric keys are found.

### keyring_vault_path

Defines the name of the Vault v2 KV path at which symmetric keys are found.

### keyring_vault_auth_method

Defines the authentication mechanism when connecting to the Hashicorp Vault service.

Accepted values are: token, or kubernetes:

token: Uses the static token defined in the keyring_vault_token configuration property.

kubernetes: Uses the Kubernetes authentication mechanism, with the running pod’s mapped service account, to assume the Hashicorp Vault role name that is defined in the keyring_vault_kube_role configuration property.

Default: token

### keyring_vault_token

Defines the token value used to communicate with the v2 KV Vault HTTP(S) API.

### keyring_vault_kube_role

Defines the Hashicorp Vault role that will be assumed using the Kubernetes service account of the running pod.

keyring_vault_auth_method must be set to kubernetes for this to activate.

Default: default

### keyring_vault_kube_api_token_file

Defines where the Kubernetes service account token should be read from the pod’s filesystem, if using a non-standard container platform setup.

Default: /run/secrets/kubernetes.io/serviceaccount/token

### untrusted_lua

Controls loading of Lua functions from admin-supplied sources such as the Admin API. LuaJIT bytecode loading is always disabled.

Warning: LuaJIT is not designed as a secure runtime for running malicious code, therefore you should properly protect your Admin API endpoint even with sandboxing enabled. The sandbox only provides protection against trivial attackers or unintentional modification of the Kong global environment.

Accepted values are: off, sandbox, or on:

off: Disallow loading of any arbitrary Lua functions. The off option disables any functionality that runs arbitrary Lua code, including the Serverless Functions plugins and any transformation plugin that allows custom Lua functions.

sandbox: Allow loading of Lua functions, but use a sandbox when executing them. The sandboxed function has restricted access to the global environment and only has access to Kong PDK, OpenResty, and standard Lua functions that will generally not cause harm to the Kong Gateway node.

on: Functions have unrestricted access to the global environment and can load any Lua modules. This is similar to the behavior in Kong Gateway prior to 2.3.0.

The default sandbox environment does not allow importing other modules or libraries, or executing anything at the OS level (for example, file read/write). The global environment is also not accessible.

Examples of untrusted_lua = sandbox behavior:

You can’t access or change global values such as kong.configuration.pg_password
You can run harmless Lua: local foo = 1 + 1. However, OS level functions are not allowed, like: os.execute(rm -rf /\*).
To customize the sandbox environment, use the untrusted_lua_sandbox_requires and untrusted_lua_sandbox_environment parameters below.

Default: sandbox

### untrusted_lua_sandbox_requires

Comma-separated list of modules allowed to be loaded with require inside the sandboxed environment. Ignored if untrusted_lua is not sandbox.

For example, say you have configured the Serverless pre-function plugin and it contains the following requires:

local template = require "resty.template"
local split = require "kong.tools.string".split
To run the plugin, add the modules to the allowed list:

untrusted_lua_sandbox_requires = resty.template, kong.tools.utils
Warning: Allowing certain modules may create opportunities to escape the sandbox. For example, allowing os or luaposix may be unsafe.

### untrusted_lua_sandbox_environment

Comma-separated list of global Lua variables that should be made available inside the sandboxed environment. Ignored if untrusted_lua is not sandbox.

Warning: Certain variables, when made available, may create opportunities to escape the sandbox.

### openresty_path

Path to the OpenResty installation that Kong will use. When this is empty (the default), Kong determines the OpenResty installation by searching for a system-installed OpenResty and falling back to searching $PATH for the nginx binary.

Setting this attribute disables the search behavior and explicitly instructs Kong which OpenResty installation to use.

### node_id

Node ID for the Kong node. Every Kong node in a Kong cluster must have a unique and valid UUID. When empty, node ID is automatically generated.

### keyring_recovery_public_key

Min Version:
3.8
Defines the public key to optionally encrypt all keyring materials and back them up in the database.

Values:

absolute path to the public key
public key content
base64 encoded public key content

### keyring_encrypt_license

Min Version:
3.8
Enables keyring encryption for license payloads stored in the database.

Warning: For Kong deployments that rely entirely on the database for license provisioning (i.e. not using KONG_LICENSE_DATA or KONG_LICENSE_PATH), enabling this option will delay license activation until after the node’s keyring has been activated.

Default: off

## REQUEST DEBUGGING

Request debugging is a mechanism that allows admins to collect the timing of proxy path requests in the response header (X-Kong-Request-Debug-Output) and optionally, the error log.

This feature provides insights into the time spent within various components of Kong, such as plugins, DNS resolution, load balancing, and more. It also provides contextual information such as domain names tried during these processes.

### request_debug

When enabled, Kong will provide detailed timing information for its components to the client and the error log if the following headers are present in the proxy request:

X-Kong-Request-Debug: If the value is set to \*, timing information will be collected and exported for the current request. If this header is not present or contains an unknown value, timing information will not be collected for the current request. You can also specify a list of filters, separated by commas, to filter the scope of the time information that is collected. The following filters are supported for X-Kong-Request-Debug:
rewrite: Collect timing information from the rewrite phase.
access: Collect timing information from the access phase.
balancer: Collect timing information from the balancer phase.
response: Collect timing information from the response phase.
header_filter: Collect timing information from the header_filter phase.
body_filter: Collect timing information from the body_filter phase.
log: Collect timing information from the log phase.
upstream: Collect timing information from the upstream phase.

X-Kong-Request-Debug-Log: If set to true, timing information will also be logged in the Kong error log with a log level of notice. Defaults to false.

X-Kong-Request-Debug-Token: Token for authenticating the client making the debug request to prevent abuse. ** Note: Debug requests originating from loopback addresses do not require this header. Deploying Kong behind other proxies may result in exposing the debug interface to the public.**
Default: on

### request_debug_token

The Request Debug Token is used in the X-Kong-Request-Debug-Token header to prevent abuse. If this value is not set (the default), a random token will be generated when Kong starts, restarts, or reloads. If a token is specified manually, then the provided token will be used.

You can locate the generated debug token in two locations:

Kong error log: Debug token will be logged in the error log (notice level) when Kong starts, restarts, or reloads. The log line will have the: [request-debug] prefix to aid searching.
Filesystem: Debug token will also be stored in a file located at {prefix}/.request_debug_token and updated when Kong starts, restarts, or reloads.
Default: <random>

## CLUSTER FALLBACK CONFIGURATION

### cluster_fallback_config_import

Enable fallback configuration imports.

This should only be enabled for data planes.

Default: off

### cluster_fallback_config_storage

Storage definition used by cluster_fallback_config_import and cluster_fallback_config_export.

Supported storage types:

S3-like storages
GCP storage service
To use S3 with a bucket named b and place all configs to with a key prefix named p, set it to: s3://b/p To use GCP for the same bucket and prefix, set it to: gcs://b/p

The credentials (and the endpoint URL for S3-like) for S3 are passed with environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_CONFIG_STORAGE_ENDPOINT (extension), where AWS_CONFIG_STORAGE_ENDPOINT is the endpoint that hosts S3-like storage.

The credentials for GCP are provided via the environment variable GCP_SERVICE_ACCOUNT.

### cluster_fallback_config_export

Enable fallback configuration exports.

Default: off

### cluster_fallback_config_export_delay

The fallback configuration export interval.

If the interval is set to 60 and configuration A is exported and there are new configurations B, C, and D in the next 60 seconds, it will wait until 60 seconds passed and export D, skipping B and C.

Default: 60

### cluster_fallback_export_s3_config

Min Version:
3.5
Fallback config export S3 configuration. This is used only when cluster_fallback_config_storage is an S3-like schema. If set, it will add the config table to the Kong exporter config S3 putObject request. The config table should be in JSON format and can be unserialized into a table. It should contain the necessary parameters as described in the documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property. For example, if you want to set the ServerSideEncryption headers/KMS Key ID for the S3 putObject request, you can set the config table to: {"ServerSideEncryption": "aws:kms", "SSEKMSKeyId": "your-kms-key-id"}

## New DNS RESOLVER

This DNS resolver introduces global caching for DNS records across workers, significantly reducing the query load on DNS servers.

It provides observable statistics, you can retrieve them through the Admin API /status/dns.

### new_dns_client

Min Version:
3.8
Enable or disable the new DNS resolver

Default: off

### resolver_address

Min Version:
3.8
Comma-separated list of nameservers, each entry in ip[:port] format to be used by Kong. If not specified, the nameservers in the local resolv.conf file will be used. Port defaults to 53 if omitted. Accepts both IPv4 and IPv6 addresses.

Examples:

resolver_address = 8.8.8.8
resolver_address = 8.8.8.8, [::1]
resolver_address = 8.8.8.8:53, [::1]:53
Default: <name servers parsed from resolv.conf>

### resolver_hosts_file

Min Version:
3.8
The hosts file to use. This file is read once and its content is static in memory. To read the file again after modifying it, Kong must be reloaded.

Default: /etc/hosts

### resolver_family

Min Version:
3.8
The supported query types.

For a domain name, Kong will only query either IP addresses (A or AAAA) or SRV records, but not both.

It will query SRV records only when the domain matches the “_._." format, for example, "\_ldap.\_tcp.example.com".

For IP addresses (A or AAAA) resolution, it first attempts IPv4 (A) and then queries IPv6 (AAAA).

Default: ["A", "SRV"]

### resolver_valid_ttl

Min Version:
3.8
By default, DNS records are cached using the TTL value of a response. This optional parameter (in seconds) allows overriding it.

Default: <TTL from responses>

### resolver_error_ttl

Min Version:
3.8
TTL in seconds for error responses and empty responses.

Default: 1

### resolver_stale_ttl

Min Version:
3.8
Defines, in seconds, how long a record will remain in cache past its TTL. This value will be used while the new DNS record is fetched in the background.

Stale data will be used from expiry of a record until either the refresh query completes, or the resolver_stale_ttl number of seconds have passed.

This configuration enables Kong to be more resilient during the DNS server downtime.

Default: 3600

### resolver_lru_cache_size

Min Version:
3.8
The DNS client uses a two-layer cache system: L1 - worker-level LRU Lua VM cache L2 - across-workers shared memory cache

This value specifies the maximum allowed number of DNS responses stored in the L1 LRU lua VM cache.

A single name query can easily take up 1~10 slots, depending on attempted query types and extended domains from /etc/resolv.conf options domain or search.

Default: 10000

### resolver_mem_cache_size

Min Version:
3.8
This value specifies the size of the L2 shared memory cache for DNS responses, kong_dns_cache.

Accepted units are k and m, with a minimum recommended value of a few MBs.

5MB shared memory size could store ~20000 DNS responeses with single A record or ~10000 DNS responeses with 2~3 A records.

10MB shared memory size could store ~40000 DNS responeses with single A record or ~20000 DNS responeses with 2~3 A records.

Default: 5m
