# [Keys](https://developer.konghq.com/gateway/entities/key/)

## What is a Key?

Key 객체는 공개 키 또는 비공개 키의 표현을 가지고 있습니다. Kong Gateway 또는 Kong 플러그인이 특정 작업을 수행하기 위해 특정 공개 키 또는 개인 키가 필요한 경우, 이 엔티티를 사용할 수 있습니다.

키는 현재 JWK와 PEM 형식을 지원합니다. 두 형식 모두 공개 키와 개인 키와 같은 기본 정보를 전달하지만 추가 메타 정보를 지정할 수 있습니다. 예를 들어, JWK 형식은 PEM보다 더 많은 정보를 전달합니다. 하나의 키 쌍은 동일한 키이면서 여러 가지 다른 표현(JWK 또는 PEM)을 가질 수 있습니다.

## Schema

| 필드         | 타입      | 설명                          | 기본값 |
| ------------ | --------- | ----------------------------- | ------ |
| `id`         | UUID      | 키의 고유 식별자              | -      |
| `name`       | string    | 키의 이름                     | -      |
| `kid`        | string    | 키 ID (JWK의 kid 필드와 일치) | -      |
| `jwk`        | string    | JSON Web Key 형식의 키        | -      |
| `pem`        | string    | PEM 형식의 키                 | -      |
| `tags`       | array     | 태그 목록 (선택사항)          | -      |
| `created_at` | timestamp | 생성 시간                     | -      |
| `updated_at` | timestamp | 마지막 업데이트 시간          | -      |

## Set up a Key

### 1. UI를 통한 설정

다음은 새로운 키를 만드는 방식입니다:

1. Gateway instance로 이동:
   - Konnect에서 sidebar의 **API Gateway**를 열고 control plane를 선택합니다.
   - Kong Manager에서 Workspace를 선택합니다.
2. **Keys**로 이동.
3. **New Key**를 클릭.
4. **Key ID** field에 키 ID를 입력합니다 (키의 `kid` 필드와 일치해야 함):
   ```
   example-key-id
   ```
5. 키의 이름을 입력합니다:
   ```
   example-key
   ```
6. **JWK** field에 JSON Web Key를 입력합니다:
   ```json
   {
     "kty": "RSA",
     "use": "enc",
     "kid": "example-key-id",
     "d": "jpq-eutUC5uNpVfYdsEZacbC9w0C3tPwl6jCLa2WB2yj1WcQRLRR5TJwCoPHUXucsKhtG8oHcvknmXgo1TzMWxUiSP2fhnqr9GEA4SSCvMqMvSazbgTLKtq1ZLyCBbyjlEBg2Leo9H4rsnh8p09WRQAbkq9S3Aq5kmUTLScWMCZLD5WZ95TxBJa7jRq8Ij1J69WI0v0Omb_jNbXfCYMZHaGxQrIYifwYYMtcrn70VxF2n0jh6TR5MnYggZdr84JdjQ564C-9ENYmAwyfKcWJ1yqMkLpRmy4dXV-MpBKuCarG1JdCu-r15595YtzObNd84-4B9JvaoJdy3hUXBsYTsQ",
     "n": "9mXXIzrcNUohBgRU7GWsFd5rrToLEVZtY7kQY-M_ASpXBoMpxsUmfp5fk39YHRGThwiVYFw-c3h97qOlHDWggq0PhjA_TxNp8ZcLNGybyDSnmJIBFbGU2JxCyX4AJm9RY4ZHCWlyzmMNu3uL22s6ydirSdfWt5dKBSW2STRUVXTslGKH3VE3zpMR4J2T81jhQsuwhrdXg3My6G90FJ5ltSaksVgiErIjqFiu1y5cEG5Gvhz99QoomHY0enKaX7mrT9XfQVtUWkbsf8Pwi3W-zsZsHQsjZZ8u9F0AdNRkCIheH3NCw46H1ouzARgxT3mTxEn8dcFzbRFOlOtoTw98nw",
     "e": "AQAB",
     "p": "_qAspCgjxg-3eICW8V6wUgN61KZVGRKHCHCK9JqDmOj9d09y14zuQ9j10WjvxK4NPzdQUygJlzDRhB9Dbk4AHVj9eIIoCH1kpYk0SYWOhgqgdtQzbzJjM3X_03geghifuQc9VnjZxGymXAukS7EIGWTNQzurcrM70_TKDBGoErs",
     "q": "97pMGP30n_e-DMMFuOoKaNKn_NKrh8KBJJXu3Bux5gV4YXh_IDDGI7qSu_7lvP24vrzBq9pj4zoMviBpfSz9YKrA9-Rs2_S6RngWxYAIie2gbqsbJ2ZvqiehLmuo3oUJBknUqDJ6b_K8Hy42e70ZXH27PHEwNWvWuXpZIPtt2W0",
     "dp": "9GRa1KjuRTFaoR-TQVLoG5_ZanfH4AvHbdNPnB0eSEsA1V59VOSg4KBCuN9mmzmP32hBAb_BDMu_nXfAagQV2hVLHDqZICTy0GvTsums9X0HrWZZg9YyHveYN6noZmgqDhcjyXavVfgO6PQHmtrtciotVeXU1n-v4e3nbBQaZPc",
     "dq": "2tCTpv-qtCIAnQUmaM9RooVwHMF5AdGsgMRu170exi7OxknJAIYUfjquoZ_lDaqPJOtVppag5HTCDK5Uf1zd8iThjhUWkrL4VoZ8lrcg07QxoY9BzOuOdp3KoVY3M1YPQp60WF0-COQ_hssrFOFTJX9pg1n3WziF0g9f6uIrhYE",
     "qi": "AgC9YSgEgkwr0ucJiO-wk7PSXcmsbxh-tR_Zs3oVH32yKa0GbRw68ocneLrL9_3lfK3EfvEbbhNuWFdpi6szExx9tWz9y4xKdax5AmkceY-yYaCFV353NgEipmeJL7-olT-YS93zjomhVzATZNl400uGJ3TC90rt6Be5rDGWhNg"
   }
   ```
7. **Save** 클릭합니다.

### 2. Admin API를 통한 설정

```bash
curl -i -X POST http://localhost:8001/keys/ \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "name": "example-key",
      "kid": "example-key-id",
      "jwk": "{\"kty\": \"RSA\",\"use\": \"enc\",\"kid\": \"example-key-id\",\"d\": \"jpq-eutUC5uNpVfYdsEZacbC9w0C3tPwl6jCLa2WB2yj1WcQRLRR5TJwCoPHUXucsKhtG8oHcvknmXgo1TzMWxUiSP2fhnqr9GEA4SSCvMqMvSazbgTLKtq1ZLyCBbyjlEBg2Leo9H4rsnh8p09WRQAbkq9S3Aq5kmUTLScWMCZLD5WZ95TxBJa7jRq8Ij1J69WI0v0Omb_jNbXfCYMZHaGxQrIYifwYYMtcrn70VxF2n0jh6TR5MnYggZdr84JdjQ564C-9ENYmAwyfKcWJ1yqMkLpRmy4dXV-MpBKuCarG1JdCu-r15595YtzObNd84-4B9JvaoJdy3hUXBsYTsQ\",\"n\": \"9mXXIzrcNUohBgRU7GWsFd5rrToLEVZtY7kQY-M_ASpXBoMpxsUmfp5fk39YHRGThwiVYFw-c3h97qOlHDWggq0PhjA_TxNp8ZcLNGybyDSnmJIBFbGU2JxCyX4AJm9RY4ZHCWlyzmMNu3uL22s6ydirSdfWt5dKBSW2STRUVXTslGKH3VE3zpMR4J2T81jhQsuwhrdXg3My6G90FJ5ltSaksVgiErIjqFiu1y5cEG5Gvhz99QoomHY0enKaX7mrT9XfQVtUWkbsf8Pwi3W-zsZsHQsjZZ8u9F0AdNRkCIheH3NCw46H1ouzARgxT3mTxEn8dcFzbRFOlOtoTw98nw\",\"e\": \"AQAB\",\"p\": \"_qAspCgjxg-3eICW8V6wUgN61KZVGRKHCHCK9JqDmOj9d09y14zuQ9j10WjvxK4NPzdQUygJlzDRhB9Dbk4AHVj9eIIoCH1kpYk0SYWOhgqgdtQzbzJjM3X_03geghifuQc9VnjZxGymXAukS7EIGWTNQzurcrM70_TKDBGoErs\",\"q\": \"97pMGP30n_e-DMMFuOoKaNKn_NKrh8KBJJXu3Bux5gV4YXh_IDDGI7qSu_7lvP24vrzBq9pj4zoMviBpfSz9YKrA9-Rs2_S6RngWxYAIie2gbqsbJ2ZvqiehLmuo3oUJBknUqDJ6b_K8Hy42e70ZXH27PHEwNWvWuXpZIPtt2W0\",\"dp\": \"9GRa1KjuRTFaoR-TQVLoG5_ZanfH4AvHbdNPnB0eSEsA1V59VOSg4KBCuN9mmzmP32hBAb_BDMu_nXfAagQV2hVLHDqZICTy0GvTsums9X0HrWZZg9YyHveYN6noZmgqDhcjyXavVfgO6PQHmtrtciotVeXU1n-v4e3nbBQaZPc\",\"dq\": \"2tCTpv-qtCIAnQUmaM9RooVwHMF5AdGsgMRu170exi7OxknJAIYUfjquoZ_lDaqPJOtVppag5HTCDK5Uf1zd8iThjhUWkrL4VoZ8lrcg07QxoY9BzOuOdp3KoVY3M1YPQp60WF0-COQ_hssrFOFTJX9pg1n3WziF0g9f6uIrhYE\",\"qi\": \"AgC9YSgEgkwr0ucJiO-wk7PSXcmsbxh-tR_Zs3oVH32yKa0GbRw68ocneLrL9_3lfK3EfvEbbhNuWFdpi6szExx9tWz9y4xKdax5AmkceY-yYaCFV353NgEipmeJL7-olT-YS93zjomhVzATZNl400uGJ3TC90rt6Be5rDGWhNg\"}"
    }
    '
```

### 3. decK을 통한 설정

```yaml
_format_version: "3.0"
keys:
  - name: example-key
    kid: example-key-id
    jwk: '{"kty": "RSA","use": "enc","kid": "example-key-id","d": "jpq-eutUC5uNpVfYdsEZacbC9w0C3tPwl6jCLa2WB2yj1WcQRLRR5TJwCoPHUXucsKhtG8oHcvknmXgo1TzMWxUiSP2fhnqr9GEA4SSCvMqMvSazbgTLKtq1ZLyCBbyjlEBg2Leo9H4rsnh8p09WRQAbkq9S3Aq5kmUTLScWMCZLD5WZ95TxBJa7jRq8Ij1J69WI0v0Omb_jNbXfCYMZHaGxQrIYifwYYMtcrn70VxF2n0jh6TR5MnYggZdr84JdjQ564C-9ENYmAwyfKcWJ1yqMkLpRmy4dXV-MpBKuCarG1JdCu-r15595YtzObNd84-4B9JvaoJdy3hUXBsYTsQ","n": "9mXXIzrcNUohBgRU7GWsFd5rrToLEVZtY7kQY-M_ASpXBoMpxsUmfp5fk39YHRGThwiVYFw-c3h97qOlHDWggq0PhjA_TxNp8ZcLNGybyDSnmJIBFbGU2JxCyX4AJm9RY4ZHCWlyzmMNu3uL22s6ydirSdfWt5dKBSW2STRUVXTslGKH3VE3zpMR4J2T81jhQsuwhrdXg3My6G90FJ5ltSaksVgiErIjqFiu1y5cEG5Gvhz99QoomHY0enKaX7mrT9XfQVtUWkbsf8Pwi3W-zsZsHQsjZZ8u9F0AdNRkCIheH3NCw46H1ouzARgxT3mTxEn8dcFzbRFOlOtoTw98nw","e": "AQAB","p": "_qAspCgjxg-3eICW8V6wUgN61KZVGRKHCHCK9JqDmOj9d09y14zuQ9j10WjvxK4NPzdQUygJlzDRhB9Dbk4AHVj9eIIoCH1kpYk0SYWOhgqgdtQzbzJjM3X_03geghifuQc9VnjZxGymXAukS7EIGWTNQzurcrM70_TKDBGoErs","q": "97pMGP30n_e-DMMFuOoKaNKn_NKrh8KBJJXu3Bux5gV4YXh_IDDGI7qSu_7lvP24vrzBq9pj4zoMviBpfSz9YKrA9-Rs2_S6RngWxYAIie2gbqsbJ2ZvqiehLmuo3oUJBknUqDJ6b_K8Hy42e70ZXH27PHEwNWvWuXpZIPtt2W0","dp": "9GRa1KjuRTFaoR-TQVLoG5_ZanfH4AvHbdNPnB0eSEsA1V59VOSg4KBCuN9mmzmP32hBAb_BDMu_nXfAagQV2hVLHDqZICTy0GvTsums9X0HrWZZg9YyHveYN6noZmgqDhcjyXavVfgO6PQHmtrtciotVeXU1n-v4e3nbBQaZPc","dq": "2tCTpv-qtCIAnQUmaM9RooVwHMF5AdGsgMRu170exi7OxknJAIYUfjquoZ_lDaqPJOtVppag5HTCDK5Uf1zd8iThjhUWkrL4VoZ8lrcg07QxoY9BzOuOdp3KoVY3M1YPQp60WF0-COQ_hssrFOFTJX9pg1n3WziF0g9f6uIrhYE","qi": "AgC9YSgEgkwr0ucJiO-wk7PSXcmsbxh-tR_Zs3oVH32yKa0GbRw68ocneLrL9_3lfK3EfvEbbhNuWFdpi6szExx9tWz9y4xKdax5AmkceY-yYaCFV353NgEipmeJL7-olT-YS93zjomhVzATZNl400uGJ3TC90rt6Be5rDGWhNg"}'
```

### 4. Konnect API를 통한 설정

```bash
curl -X POST https://{region}.api.konghq.com/v2/control-planes/{controlPlaneId}/core-entities/keys/ \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer $KONNECT_TOKEN" \
    --data '
    {
      "name": "example-key",
      "kid": "example-key-id",
      "jwk": "{\"kty\": \"RSA\",\"use\": \"enc\",\"kid\": \"example-key-id\",\"d\": \"jpq-eutUC5uNpVfYdsEZacbC9w0C3tPwl6jCLa2WB2yj1WcQRLRR5TJwCoPHUXucsKhtG8oHcvknmXgo1TzMWxUiSP2fhnqr9GEA4SSCvMqMvSazbgTLKtq1ZLyCBbyjlEBg2Leo9H4rsnh8p09WRQAbkq9S3Aq5kmUTLScWMCZLD5WZ95TxBJa7jRq8Ij1J69WI0v0Omb_jNbXfCYMZHaGxQrIYifwYYMtcrn70VxF2n0jh6TR5MnYggZdr84JdjQ564C-9ENYmAwyfKcWJ1yqMkLpRmy4dXV-MpBKuCarG1JdCu-r15595YtzObNd84-4B9JvaoJdy3hUXBsYTsQ\",\"n\": \"9mXXIzrcNUohBgRU7GWsFd5rrToLEVZtY7kQY-M_ASpXBoMpxsUmfp5fk39YHRGThwiVYFw-c3h97qOlHDWggq0PhjA_TxNp8ZcLNGybyDSnmJIBFbGU2JxCyX4AJm9RY4ZHCWlyzmMNu3uL22s6ydirSdfWt5dKBSW2STRUVXTslGKH3VE3zpMR4J2T81jhQsuwhrdXg3My6G90FJ5ltSaksVgiErIjqFiu1y5cEG5Gvhz99QoomHY0enKaX7mrT9XfQVtUWkbsf8Pwi3W-zsZsHQsjZZ8u9F0AdNRkCIheH3NCw46H1ouzARgxT3mTxEn8dcFzbRFOlOtoTw98nw\",\"e\": \"AQAB\",\"p\": \"_qAspCgjxg-3eICW8V6wUgN61KZVGRKHCHCK9JqDmOj9d09y14zuQ9j10WjvxK4NPzdQUygJlzDRhB9Dbk4AHVj9eIIoCH1kpYk0SYWOhgqgdtQzbzJjM3X_03geghifuQc9VnjZxGymXAukS7EIGWTNQzurcrM70_TKDBGoErs\",\"q\": \"97pMGP30n_e-DMMFuOoKaNKn_NKrh8KBJJXu3Bux5gV4YXh_IDDGI7qSu_7lvP24vrzBq9pj4zoMviBpfSz9YKrA9-Rs2_S6RngWxYAIie2gbqsbJ2ZvqiehLmuo3oUJBknUqDJ6b_K8Hy42e70ZXH27PHEwNWvWuXpZIPtt2W0\",\"dp\": \"9GRa1KjuRTFaoR-TQVLoG5_ZanfH4AvHbdNPnB0eSEsA1V59VOSg4KBCuN9mmzmP32hBAb_BDMu_nXfAagQV2hVLHDqZICTy0GvTsums9X0HrWZZg9YyHveYN6noZmgqDhcjyXavVfgO6PQHmtrtciotVeXU1n-v4e3nbBQaZPc\",\"dq\": \"2tCTpv-qtCIAnQUmaM9RooVwHMF5AdGsgMRu170exi7OxknJAIYUfjquoZ_lDaqPJOtVppag5HTCDK5Uf1zd8iThjhUWkrL4VoZ8lrcg07QxoY9BzOuOdp3KoVY3M1YPQp60WF0-COQ_hssrFOFTJX9pg1n3WziF0g9f6uIrhYE\",\"qi\": \"AgC9YSgEgkwr0ucJiO-wk7PSXcmsbxh-tR_Zs3oVH32yKa0GbRw68ocneLrL9_3lfK3EfvEbbhNuWFdpi6szExx9tWz9y4xKdax5AmkceY-yYaCFV353NgEipmeJL7-olT-YS93zjomhVzATZNl400uGJ3TC90rt6Be5rDGWhNg\"}"
    }
    '
```

## Key Formats

### JWK (JSON Web Key) Format

JWK 형식은 JSON 객체로 키 정보를 표현합니다. 이 형식은 다음과 같은 장점이 있습니다:

- 더 많은 메타데이터 정보 포함
- 표준화된 형식
- 다양한 키 타입 지원 (RSA, EC, OKP 등)

### PEM Format

PEM 형식은 Base64로 인코딩된 키를 ASCII 텍스트로 표현합니다. 이 형식은 다음과 같은 특징이 있습니다:

- 간단하고 읽기 쉬운 형식
- 전통적인 암호화 도구와 호환성
- 파일로 저장하기 쉬움

## Related Resources

- [Key Set entity](key-set.md)
- [Keyring](https://developer.konghq.com/gateway/keyring/)
- [Secrets management](https://developer.konghq.com/gateway/secrets-management/)
- [Reserved entity names](https://developer.konghq.com/gateway/reserved-entity-names/)
- [Securing Kong Gateway](https://developer.konghq.com/gateway/securing-kong-gateway/)
- [Konnect Control Plane resource limits](https://developer.konghq.com/konnect/resource-limits/)
