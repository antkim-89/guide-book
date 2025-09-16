# Vue.js 코드 컨벤션 가이드

## 1. 코드 컨벤션의 중요성

일관된 코드 컨벤션은 팀의 생산성과 프로젝트의 지속 가능성을 높이는 데 필수적입니다. 잘 정립된 규칙은 협업을 원활하게 하고 잠재적인 오류를 줄여 더 높은 품질의 소프트웨어를 만드는 기반이 됩니다.

### 🎯 코드 컨벤션의 핵심 가치

| 가치                      | 설명                                | 효과                                  |
| ------------------------- | ----------------------------------- | ------------------------------------- |
| **📖 가독성 향상**        | 일관된 스타일로 코드 이해도 증가    | 다른 팀원의 코드도 쉽게 이해          |
| **🔧 유지보수 용이성**    | 예측 가능한 구조로 수정 작업 효율화 | 코드 수정 및 버그 추적 효율성 증대    |
| **👥 신입 개발자 온보딩** | 명확한 규칙으로 빠른 적응 지원      | 새로운 팀원의 프로젝트 적응 시간 단축 |
| **🚀 코드 품질 관리**     | 표준화된 패턴으로 오류 방지         | 잠재적 오류 감소 및 디자인 품질 향상  |

## 2. 주요 코드 컨벤션 규칙

### 📝 네이밍 컨벤션

| 구분                   | 규칙               | 예시                                                 | 설명                                         |
| ---------------------- | ------------------ | ---------------------------------------------------- | -------------------------------------------- |
| **변수 및 함수**       | `camelCase`        | `userName`, `calculateTotal`, `fetchUserData`        | 첫 단어는 소문자, 이후 단어 첫 글자는 대문자 |
| **클래스 및 컴포넌트** | `PascalCase`       | `UserManager`, `UserProfileComponent`, `ProductCard` | 모든 단어의 첫 글자를 대문자로               |
| **상수**               | `UPPER_SNAKE_CASE` | `MAX_ITEMS_COUNT`, `API_KEY`, `DEFAULT_TIMEOUT`      | 모든 글자 대문자, 단어 사이 언더스코어       |

### 🎨 포맷팅 규칙

| 규칙         | 설정           | 예시                                                         | 이유                         |
| ------------ | -------------- | ------------------------------------------------------------ | ---------------------------- |
| **들여쓰기** | 4칸 공백       | `    if (condition) {`                                       | 가독성과 일관성              |
| **세미콜론** | 항상 사용      | `const result = calculateSum();`                             | 자동 세미콜론 삽입 위험 방지 |
| **괄호**     | 같은 줄에 위치 | `if (condition) {`                                           | 일관된 스타일 유지           |
| **줄 길이**  | 80~120자 이내  | `const veryLongVariableName = someFunction(param1, param2);` | 화면에서 한 줄에 표시        |

### 주석 가이드라인

- **의도 설명:** 코드가 '무엇을' 하는지가 아닌, '왜' 그렇게 하는지 의도를 설명합니다.
- **TODO:** 향후 작업이 필요할 경우 `// TODO: [할 일]` 형태로 표기합니다.
- **문서화:** 중요한 함수나 클래스에는 JSDoc 또는 해당 언어의 문서화 주석을 사용합니다.

## 3. 코드 컨벤션 강제화 및 자동화

규칙을 정하는 것만큼이나 팀원들이 쉽게 따르도록 돕는 것이 중요합니다. 자동화 도구를 활용하여 일관성을 유지하고 코드 리뷰의 부담을 줄일 수 있습니다.

### 🔧 자동화 도구 매트릭스

| 도구                   | 목적                          | 적용 시점   | 효과                |
| ---------------------- | ----------------------------- | ----------- | ------------------- |
| **Linter & Formatter** | 코드 스타일 자동 검사 및 수정 | 저장 시     | 실시간 스타일 통일  |
| **CI/CD 연동**         | 머지 전 자동 검증             | PR 생성 시  | 규칙 위반 코드 차단 |
| **코드 리뷰**          | 팀원 간 피드백                | PR 리뷰 시  | 컨벤션 정착 및 학습 |
| **정기 논의**          | 규칙 개선 및 업데이트         | 월간/분기별 | 지속적인 개선       |

### Linter 및 Formatter 사용

ESLint, Prettier 등을 도입하여 저장 시 자동으로 포맷을 맞춰줍니다.

**주요 도구:**

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 자동화
- **Husky**: Git 훅을 통한 자동 검사

### CI/CD 연동

CI/CD 파이프라인에 린팅 검사를 추가하여 규칙을 위반하는 코드는 머지되지 않도록 합니다.

**적용 방법:**

- GitHub Actions, GitLab CI 등에서 린팅 단계 추가
- 린팅 실패 시 PR 머지 차단
- 자동화된 피드백 제공

### 코드 리뷰

동료 리뷰를 통해 컨벤션 위반 사항을 피드백하고, 팀원 간의 소통을 통해 규칙을 정착시킵니다.

**리뷰 포인트:**

- 네이밍 컨벤션 준수
- 코드 구조 및 가독성
- 주석 및 문서화 품질

### 정기적인 논의

주기적으로 코드 컨벤션에 대해 논의하고, 필요에 따라 규칙을 업데이트합니다.

**논의 주제:**

- 새로운 패턴 도입 검토
- 기존 규칙의 실용성 검토
- 팀원 피드백 수집 및 반영

## 4. Vue.js 프로젝트 컨벤션

Vue 프로젝트의 특성을 고려한 구체적인 규칙입니다. 일관성 있는 구조와 네이밍은 대규모 애플리케이션의 복잡성을 관리하는 데 큰 도움이 됩니다.

### 4.1. 프로젝트 구조

프로젝트는 Nuxt.js의 기본 디렉터리 구조를 따릅니다. 이 구조는 라우팅과 컴포넌트 관리를 체계적으로 만들어줍니다.

```
📁 assets          이미지, 폰트 등 정적 자원
📁 components       재사용 가능한 컴포넌트
  L 📁 layouts      레이아웃 컴포넌트
📁 composables      재사용 가능한 로직 (컴포저블)
📁 pages           라우팅 담당 페이지
📁 stores          상태 관리 스토어 (Pinia 등)
📁 utils           전역 유틸리티 함수
📁 plugins         전역 플러그인
📁 public          서버 제공 정적 파일
📁 api             API 통신 로직 (선택 사항)
```

### 4.2. 컴포넌트 네이밍 및 명명법

| 구분                   | 규칙                 | 예시                                 | 설명                            |
| ---------------------- | -------------------- | ------------------------------------ | ------------------------------- |
| **컴포넌트 파일**      | `PascalCase`         | `UserProfile.vue`, `ProductCard.vue` | 여러 단어 조합으로 의미 명확화  |
| **베이스 컴포넌트**    | `App` + `PascalCase` | `AppButton.vue`, `AppModal.vue`      | 애플리케이션 전반 사용 컴포넌트 |
| **컴포넌트 내부 변수** | `camelCase`          | `totalItems`, `isModalOpen`          | 일반 JavaScript 변수 규칙       |
| **Props (스크립트)**   | `camelCase`          | `userProfile`, `isVisible`           | JavaScript 변수 규칙            |
| **Props (템플릿)**     | `kebab-case`         | `user-profile`, `is-visible`         | HTML 속성 규칙                  |
| **Emits**              | `kebab-case`         | `update:model-value`, `click-item`   | HTML 이벤트 규칙                |

### 4.3. 템플릿 (HTML)

| 규칙                  | 설명                                      | 예시                                                      |
| --------------------- | ----------------------------------------- | --------------------------------------------------------- |
| **속성 순서**         | 디렉티브 → 특수 속성 → 일반 속성 → 이벤트 | `v-if="isVisible" class="container" @click="handleClick"` |
| **속성 값**           | 항상 따옴표 사용                          | `<div class="container">`                                 |
| **Self-closing 태그** | 내용이 없는 태그는 자체 종료              | `<img />`, `<MyComponent />`                              |

### 4.4. 스크립트 (JavaScript/TypeScript)

| 규칙              | 설명                                | 예시                                                       |
| ----------------- | ----------------------------------- | ---------------------------------------------------------- |
| **Props 선언**    | `defineProps`로 타입 명시적 선언    | `defineProps({ name: { type: String, required: true } })`  |
| **컴포넌트 로직** | `<script setup>` 내에서 구조적 작성 | Composition API 사용                                       |
| **Reactivity**    | 목적에 맞게 사용                    | `ref` (단일 값), `reactive` (객체), `computed` (계산된 값) |

### 4.5. 스타일 (CSS)

| 규칙              | 설명                  | 예시                                       |
| ----------------- | --------------------- | ------------------------------------------ |
| **Tailwind CSS**  | 유틸리티 우선 방식    | `class="flex items-center justify-center"` |
| **커스텀 스타일** | `<style scoped>` 사용 | 컴포넌트별 격리된 스타일                   |
| **SCSS/SASS**     | 변수, 믹스인 활용     | `$primary-color: #007bff;`                 |

### 4.6. 라이브러리 사용 및 설정

#### 📚 라이브러리 매트릭스

| 라이브러리 | 목적          | 중요도  | 사용법                   |
| ---------- | ------------- | ------- | ------------------------ |
| **Axios**  | API 통신      | 🔴 필수 | 인스턴스 생성 + 인터셉터 |
| **Lodash** | 유틸리티 함수 | 🟡 권장 | 개별 함수 임포트         |

#### Axios

API 통신을 위한 라이브러리입니다. 프로젝트의 일관성을 위해 Axios 인스턴스를 생성하여 `baseURL`, `timeout` 등 공통 설정을 적용하고, 인터셉터를 활용해 요청/응답을 중앙에서 관리합니다.

```js
// utils/axiosInstance.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("인증 오류 발생. 로그인 페이지로 이동합니다.");
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**주요 기능:**

- 중앙 집중식 API 설정 관리
- 자동 토큰 인증 처리
- 에러 핸들링 통합

#### Lodash

배열, 객체 등 복잡한 데이터 구조를 다루기 위한 유틸리티 라이브러리입니다. 필요한 함수만 개별적으로 임포트하여 번들 크기를 최적화합니다.

```js
// 예: 디바운스 함수 사용
import debounce from "lodash/debounce";

const handleInput = debounce(() => {
  console.log("Input value changed!");
}, 300);
```

**주요 기능:**

- 배열/객체 조작 유틸리티
- 성능 최적화 함수 (debounce, throttle)
- 함수형 프로그래밍 지원

### 4.7. 주석 및 문서화 (JSDoc)

모든 주요 함수, 컴포넌트, Props에 대한 설명을 JSDoc 형식으로 작성하여 코드의 의도를 명확히 합니다.

```js
/**
 * @description 사용자 정보를 불러오는 비동기 함수
 * @param {string} userId - 사용자의 고유 ID
 * @returns {Promise<object>} 사용자 정보 객체
 */
async function fetchUser(userId) {
  // ...
}
```

```html
<script setup>
  /**
   * @description 사용자 프로필을 표시하는 컴포넌트
   * @displayName UserProfile
   */
  const props = defineProps({
    /**
     * 사용자 이름
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * 사용자 나이
     */
    age: {
      type: Number,
      required: true,
    },
  });
</script>
```

### 4.8. 컴포넌트 통신

컴포넌트 간 데이터와 이벤트를 주고받는 방법을 명확히 정의합니다. 단방향 데이터 흐름을 기본 원칙으로 삼아 예측 가능한 상태 관리를 지향합니다.

#### 📡 컴포넌트 통신 방법

| 방법                 | 방향          | 사용 시기               | 예시                               |
| -------------------- | ------------- | ----------------------- | ---------------------------------- |
| **Props & Emits**    | 부모 ↔ 자식   | 직접적인 부모-자식 관계 | `:data="value"` `@event="handler"` |
| **v-model**          | 양방향        | 폼 입력 요소            | `v-model="inputValue"`             |
| **Provide / Inject** | 조부모 → 손자 | 깊은 계층 구조          | `provide()` `inject()`             |
| **Pinia/Vuex**       | 전역          | 여러 컴포넌트 간 공유   | 상태 관리 라이브러리               |

#### Props & Emits

부모에서 자식으로 데이터를 전달할 때는 `props`를, 자식에서 부모로 이벤트를 전달할 때는 `emits`를 사용합니다.

#### v-model

폼 입력 요소와 같이 양방향 데이터 바인딩이 필요한 경우에 사용합니다.

#### Provide / Inject

여러 컴포넌트 계층을 거쳐 데이터를 전달해야 할 때 사용하며, 불필요한 props drilling을 피할 수 있습니다.

```js
// 컴포넌트 통신 예시 (상위 컴포넌트)
<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const message = ref('Hello from parent!');
const handleChildEvent = () => {
  console.log('Event received from child!');
};
</script>

<template>
  <ChildComponent :msg="message" @child-event="handleChildEvent" />
</template>
```

```js
// 컴포넌트 통신 예시 (자식 컴포넌트)
<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['childEvent']);

const emitEvent = () => {
  emits('child-event');
};
</script>

<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="emitEvent">Emit Event</button>
  </div>
</template>
```

### 4.9. 비동기 데이터 관리

비동기 데이터 호출 시, 애플리케이션의 사용자 경험을 개선하고 오류를 안정적으로 처리하는 구조를 사용합니다.

#### 🔄 비동기 데이터 관리 패턴

| 상태          | 설명        | 사용법                         |
| ------------- | ----------- | ------------------------------ |
| **isLoading** | 로딩 상태   | `const isLoading = ref(false)` |
| **isError**   | 에러 상태   | `const isError = ref(false)`   |
| **data**      | 실제 데이터 | `const data = ref(null)`       |

#### 핵심 원칙

- **상태 관리:** `isLoading`, `isError`, `data` 상태를 명확하게 분리하여 관리합니다.
- **async/await:** `async/await` 구문을 사용하여 비동기 코드를 동기 코드처럼 읽기 쉽게 작성합니다.
- **오류 처리:** 항상 `try...catch` 블록을 사용하여 API 호출 실패를 처리하고, 사용자에게 명확한 피드백을 제공합니다.

```js
import { ref } from "vue";
import apiClient from "@/utils/axiosInstance";

export function useFetchData(url) {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get(url);
      data.value = response.data;
    } catch (err) {
      error.value = err;
      console.error("Failed to fetch data:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, error, fetchData };
}
```

## 5. JavaScript 코딩 관례

JavaScript는 다양한 스타일 가이드가 존재하지만, Airbnb나 Google 스타일 가이드가 널리 사용됩니다. 이 섹션에서는 일관된 코딩 스타일을 위한 핵심 규칙을 정리합니다.

### 📝 JavaScript 네이밍 규칙

| 구분             | 규칙               | 예시                                | 설명                                         |
| ---------------- | ------------------ | ----------------------------------- | -------------------------------------------- |
| **변수 및 함수** | `camelCase`        | `userName`, `calculateAverage`      | 첫 단어는 소문자, 이후 단어 첫 글자는 대문자 |
| **클래스**       | `PascalCase`       | `UserManager`, `DatabaseConnection` | 모든 단어의 첫 글자를 대문자로               |
| **상수**         | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `API_BASE_URL`   | 모든 글자 대문자, 단어 사이 언더스코어       |

### 🔧 JavaScript 코딩 규칙

| 규칙              | 설명                          | 예시                                       | 이유                    |
| ----------------- | ----------------------------- | ------------------------------------------ | ----------------------- |
| **변수 선언**     | `const` 우선, 재할당 시 `let` | `const config = {}; let counter = 0;`      | 블록 스코프 활용        |
| **세미콜론**      | 항상 명시적 사용              | `const result = calculateSum();`           | ASI 위험 방지           |
| **화살표 함수**   | 간단한 함수에 사용            | `const doubled = numbers.map(n => n * 2);` | 코드 간결성             |
| **구조 분해**     | 객체/배열에서 값 추출         | `const { name, age } = user;`              | 코드 가독성 향상        |
| **템플릿 리터럴** | 문자열 조합 시 사용           | `` `안녕하세요, ${user.name}님!` ``        | 가독성 및 편의성        |
| **async/await**   | 비동기 처리 시 사용           | `const data = await fetchData();`          | 동기 코드처럼 읽기 쉬움 |

### 5.1. 변수 선언

재할당이 필요한 값에는 `let`을, 재할당하지 않는 값에는 `const`를 사용합니다. `var`는 사용하지 않습니다.

```js
const config = { timeout: 5000 }; // 재할당하지 않는 값
let counter = 0; // 재할당이 필요한 값
```

### 5.2. 세미콜론

자동 세미콜론 삽입(Automatic Semicolon Insertion)의 위험을 피하기 위해 문장 끝에는 항상 세미콜론을 명시적으로 붙입니다.

```js
const result = calculateSum(a, b);
console.log(result);
```

### 5.3. 화살표 함수

간단한 함수는 화살표 함수를 사용해 코드를 간결하게 작성합니다. 복잡한 로직이나 컨텍스트 바인딩이 중요한 경우에는 일반 함수를 사용합니다.

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
```

### 5.4. 객체와 배열

일관된 스타일을 유지하고, 구조 분해 할당을 활용해 데이터를 효율적으로 사용합니다.

```js
const user = {
  name: "홍길동",
  age: 30,
  email: "hong@example.com",
};
const { name, age } = user;
```

### 5.5. 문자열 처리

문자열 조합이나 여러 줄 문자열에는 템플릿 리터럴(`)을 사용하여 가독성을 높입니다.

```js
const user = { name: "홍길동" };
const message = `안녕하세요, ${user.name}님!`;
const htmlTemplate = `
    <div class="user">
        <h1>${user.name}</h1>
    </div>
`;
```

### 5.6. 비동기 처리

복잡한 비동기 로직은 `async/await`를 사용하고, 간단한 경우는 Promise 체이닝을 활용합니다. 항상 오류 처리를 포함합니다.

```js
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("사용자 데이터 조회 실패:", error);
    throw error;
  }
}
```

### 5.7. ESLint와 Prettier

일관된 코딩 스타일을 자동으로 유지하기 위해 ESLint와 Prettier를 프로젝트에 도입합니다. ESLint는 코드 품질을, Prettier는 포맷팅을 담당합니다.

```js
module.exports = {
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
  },
};
```
