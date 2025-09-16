# VS Code 개발 환경 설정 가이드

일관된 개발 환경을 구축하여 팀의 생산성과 코드 품질을 높이는 데 필수적인 VS Code 확장 프로그램과 설정을 안내합니다. 잘 정립된 개발 환경은 협업을 원활하게 하고 잠재적인 오류를 줄여 더 높은 품질의 소프트웨어를 만드는 기반이 됩니다.

## 1. 필수 확장 프로그램

동일한 환경에서 개발을 할 수 있도록 다음의 확장 프로그램들을 설치하세요.

### 📦 확장 프로그램 매트릭스

| 확장 프로그램                      | ID                                                    | 기능                    | 중요도  | 설치 방법            |
| ---------------------------------- | ----------------------------------------------------- | ----------------------- | ------- | -------------------- |
| **Auto Close Tag**                 | `formulahendry.auto-close-tag`                        | HTML/XML 태그 자동 닫기 | 🔴 필수 | VS Code 마켓플레이스 |
| **Auto Rename Tag**                | `formulahendry.auto-rename-tag`                       | 태그 이름 동시 변경     | 🔴 필수 | VS Code 마켓플레이스 |
| **IntelliCode**                    | `VisualStudioExptTeam.vscodeintellicode`              | AI 기반 코드 자동 완성  | 🔴 필수 | VS Code 마켓플레이스 |
| **IntelliCode API Usage Examples** | `VisualStudioExptTeam.intellicode-api-usage-examples` | API 사용 예시 제공      | 🟡 권장 | VS Code 마켓플레이스 |
| **Live Preview**                   | `ms-vscode.live-server`                               | 실시간 HTML 미리보기    | 🟡 권장 | VS Code 마켓플레이스 |
| **Prettier**                       | `esbenp.prettier-vscode`                              | 코드 자동 포맷팅        | 🔴 필수 | VS Code 마켓플레이스 |
| **Todo Tree**                      | `Gruntfuggly.todo-tree`                               | TODO 주석 트리 정리     | 🟡 권장 | VS Code 마켓플레이스 |
| **Vue (Official)**                 | `Vue.volar`                                           | Vue.js 개발 지원        | 🔴 필수 | VS Code 마켓플레이스 |

### 🔧 확장 프로그램 상세 설명

#### Auto Close Tag

HTML/XML 태그를 자동으로 닫아주는 확장 프로그램입니다. 태그를 열고 `>`를 입력하면 자동으로 닫는 태그가 생성되어 개발 속도를 높여줍니다.

**주요 기능:**

- HTML/XML 태그 자동 닫기
- 중첩된 태그 구조 지원
- 커스터마이징 가능한 설정

#### Auto Rename Tag

HTML/XML 태그의 이름을 변경할 때 시작 태그와 종료 태그를 동시에 변경해주는 확장 프로그램입니다. 태그 이름 변경 시 실수를 방지하고 일관성을 유지할 수 있습니다.

**주요 기능:**

- 시작/종료 태그 동시 변경
- 실시간 태그 이름 동기화
- 다양한 파일 형식 지원

#### IntelliCode

AI 기반 코드 자동 완성 기능을 제공하는 Microsoft의 확장 프로그램입니다. 컨텍스트를 분석하여 더 정확한 코드 제안을 제공하여 개발 효율성을 높입니다.

**주요 기능:**

- AI 기반 코드 제안
- 컨텍스트 인식 자동 완성
- 학습 기반 개선

#### IntelliCode API Usage Examples

IntelliCode와 함께 사용하는 확장 프로그램으로, API 사용 예시를 코드 자동 완성에 포함시켜 더 나은 개발 경험을 제공합니다.

**주요 기능:**

- API 사용 예시 제공
- 코드 패턴 학습
- 실시간 도움말

#### Live Preview

HTML 파일을 실시간으로 미리보기할 수 있는 확장 프로그램입니다. 웹 개발 시 브라우저를 새로고침하지 않고도 변경사항을 즉시 확인할 수 있습니다.

**주요 기능:**

- 실시간 미리보기
- 자동 새로고침
- 로컬 서버 실행

#### Prettier

코드 포맷팅을 자동으로 처리하는 확장 프로그램입니다. 일관된 코드 스타일을 유지하고 코드 리뷰의 부담을 줄여줍니다.

**주요 기능:**

- 자동 코드 포맷팅
- 다양한 언어 지원
- 커스터마이징 가능

#### Todo Tree

코드 내의 TODO, FIXME, NOTE 등의 주석을 트리 형태로 정리하여 표시하는 확장 프로그램입니다. 프로젝트의 진행 상황을 한눈에 파악할 수 있습니다.

**주요 기능:**

- TODO 주석 트리 정리
- 다양한 태그 지원
- 시각적 하이라이팅

#### Vue (Official)

Vue.js 개발을 위한 공식 확장 프로그램입니다. Vue 파일의 문법 하이라이팅, 자동 완성, 디버깅 등의 기능을 제공합니다.

**주요 기능:**

- Vue 문법 하이라이팅
- 자동 완성 및 IntelliSense
- 디버깅 지원

## 2. 코드 스니펫 설정

자주 사용하는 코드를 미리 정의해 두고 단축키로 빠르게 입력할 수 있는 스니펫을 설정하는 방법입니다. 이를 통해 반복적인 코드 작성 시간을 단축하고 일관된 코드 스타일을 유지할 수 있습니다.

### 📝 스니펫 설정 가이드

| 단계   | 작업      | 설명                            | 예상 시간 |
| ------ | --------- | ------------------------------- | --------- |
| **1️⃣** | 폴더 생성 | `.vscode` 폴더 생성             | 1분       |
| **2️⃣** | 파일 생성 | `itmsg.code-snippets` 파일 생성 | 1분       |
| **3️⃣** | 코드 복사 | 스니펫 코드 복사 및 붙여넣기    | 2분       |
| **4️⃣** | 테스트    | 스니펫 동작 확인                | 2분       |

### 2.1. 스니펫 파일 생성

아래 코드를 복사하여 프로젝트 루트 디렉터리에 `.vscode` 폴더를 만들고 그 안에 `itmsg.code-snippets` 파일을 생성하여 붙여넣으세요.

#### 📁 파일 구조

```
프로젝트 루트/
├── .vscode/
│   └── itmsg.code-snippets
├── src/
└── package.json
```

### 📋 스니펫 코드

```json
{
  "vue-template": {
    "scope": "vue",
    "prefix": "vue-template",
    "body": [
      "<script setup>",
      "import { ref, onMounted } from 'vue';",
      "",
      "onMounted(() => {",
      "  console.log('Component is mounted!');",
      "});",
      "",
      "</script>",
      "",
      "",
      "<template>",
      "  <div>",
      "  </div>",
      "</template>",
      "",
      "",
      "<style scoped>",
      "</style>",
      ""
    ],
    "description": "vue file 기본 템플릿 생성"
  },
  "log": {
    "scope": "javascript",
    "prefix": "js-log",
    "body": ["console.log('$1');", "$2"],
    "description": "Console 출력"
  },
  "error": {
    "scope": "javascript",
    "prefix": "js-error",
    "body": ["console.error('$1');", "$2"],
    "description": "Console 출력"
  }
}
```

### 🎯 스니펫 사용법

| 스니펫         | 접두사         | 사용법                                     | 결과                        |
| -------------- | -------------- | ------------------------------------------ | --------------------------- |
| **Vue 템플릿** | `vue-template` | Vue 파일에서 `vue-template` 입력 후 Tab    | 기본 Vue 컴포넌트 구조 생성 |
| **콘솔 로그**  | `js-log`       | JavaScript 파일에서 `js-log` 입력 후 Tab   | `console.log('');` 생성     |
| **콘솔 에러**  | `js-error`     | JavaScript 파일에서 `js-error` 입력 후 Tab | `console.error('');` 생성   |

## 3. VS Code 설정 파일 구성

VS Code의 전역 설정을 통해 팀 전체가 동일한 개발 환경을 사용할 수 있도록 설정합니다.

### ⚙️ 설정 파일 접근 방법

| 방법            | 단축키                                                      | 설명                                                          | 난이도  |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| **명령 팔레트** | `Ctrl + Shift + P` (Win/Linux)<br>`Cmd + Shift + P` (macOS) | `settings` 입력 후 **기본 설정: 사용자 설정 열기(JSON)** 선택 | 🟢 쉬움 |
| **메뉴 사용**   | -                                                           | **File/Code > 기본 설정 > 설정** → `{}` 아이콘 클릭           | 🟡 중간 |

### 3.1. settings.json 파일 열기

VS Code에서 settings.json 파일을 여는 두 가지 방법입니다.

#### 🎯 명령 팔레트 사용

`Ctrl + Shift + P` (Windows/Linux) 또는 `Cmd + Shift + P` (macOS)를 눌러 명령 팔레트를 연 후, `settings`를 입력하고 **기본 설정: 사용자 설정 열기(JSON)**을 선택합니다.

**단계별 가이드:**

1. `Ctrl + Shift + P` (또는 `Cmd + Shift + P`) 누르기
2. `settings` 입력
3. **기본 설정: 사용자 설정 열기(JSON)** 선택
4. settings.json 파일이 열림

#### 📋 메뉴 사용

**File** (Windows/Linux) 또는 **Code** (macOS) 메뉴로 이동하여 **기본 설정 > 설정**을 선택하고, 오른쪽 상단의 `{}` 아이콘을 클릭하여 settings.json 파일을 엽니다.

**단계별 가이드:**

1. **File** (Win/Linux) 또는 **Code** (macOS) 메뉴 클릭
2. **기본 설정 > 설정** 선택
3. 오른쪽 상단 `{}` 아이콘 클릭
4. settings.json 파일이 열림

### 3.2. Todo Tree 설정 적용

파일이 열리면 아래 코드를 복사하여 기존 설정에 추가하세요. 기존 설정이 있다면 쉼표(`,`)로 구분하여 붙여넣으면 됩니다.

```json
{
  "todo-tree.general.tags": [
    "BUG",
    "TODO",
    "[ ]",
    "[x]",
    "NOTE",
    "CHECKLIST",
    "WARNING"
  ],
  "todo-tree.highlights.customHighlight": {
    "CHECKLIST": {
      "background": "#20a904",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "check-circle-fill",
      "iconColour": "#20a904",
      "type": "text"
    },
    "NOTE": {
      "background": "#ff0404",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "star-fill",
      "iconColour": "#ffc404",
      "type": "text"
    },
    "TODO": {
      "background": "#b782f9",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "pin",
      "iconColour": "#b782f9"
    },
    "WARNING": {
      "background": "#ffc404",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "alert",
      "iconColour": "#ff9f04"
    },
    "[ ]": {
      "background": "#f87364",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "x",
      "iconColour": "#f87364",
      "type": "text"
    },
    "[x]": {
      "background": "#20a904",
      "foreground": "#ffffff",
      "gutterIcon": true,
      "icon": "check",
      "iconColour": "#20a904",
      "type": "text"
    }
  },
  "todo-tree.regex.regex": "((\\\\*|//|#|` 등)과 체크리스트 형식을 포함하도록 설정되어 있습니다."
}
```

## 4. 설정 완료 및 확인

모든 설정이 완료되면 VS Code를 재시작하여 확장 프로그램과 설정이 정상적으로 적용되었는지 확인하세요.

### ✅ 설정 확인 체크리스트

| 구분                 | 확인 항목                         | 방법                                 | 상태 |
| -------------------- | --------------------------------- | ------------------------------------ | ---- |
| **🔌 확장 프로그램** | 필수 확장 프로그램 설치 및 활성화 | 좌측 사이드바 → 확장 프로그램 아이콘 | ⬜   |
| **📝 스니펫**        | Vue 템플릿 스니펫 동작            | Vue 파일에서 `vue-template` 입력     | ⬜   |
| **📝 스니펫**        | 콘솔 로그 스니펫 동작             | JS 파일에서 `js-log` 입력            | ⬜   |
| **🌳 Todo Tree**     | TODO 주석 인식                    | 코드에 `TODO:` 주석 작성             | ⬜   |
| **⚙️ 설정**          | 자동 저장 동작                    | 파일 수정 후 1초 대기                | ⬜   |
| **🎨 포맷터**        | 자동 포맷팅 동작                  | 파일 저장 시 포맷팅 적용             | ⬜   |

### 4.1. 확장 프로그램 확인

- 좌측 사이드바의 확장 프로그램 아이콘을 클릭하여 설치된 확장 프로그램들을 확인합니다.
- 각 확장 프로그램이 활성화되어 있는지 확인합니다.

**확인 방법:**

1. 좌측 사이드바에서 확장 프로그램 아이콘 (🧩) 클릭
2. 설치된 확장 프로그램 목록 확인
3. 각 확장 프로그램의 활성화 상태 확인

### 4.2. 스니펫 테스트

- Vue 파일을 열고 `vue-template`을 입력하여 스니펫이 정상적으로 작동하는지 확인합니다.
- JavaScript 파일에서 `js-log` 또는 `js-error`를 입력하여 콘솔 스니펫을 테스트합니다.

**테스트 방법:**

1. 새 Vue 파일 생성
2. `vue-template` 입력 후 Tab 키 누르기
3. 기본 Vue 컴포넌트 구조가 생성되는지 확인
4. JavaScript 파일에서 `js-log` 입력 후 Tab 키 누르기
5. `console.log('');` 코드가 생성되는지 확인

### 4.3. Todo Tree 확인

- 코드에 `TODO:`, `NOTE:`, `[ ]` 등의 주석을 작성하여 Todo Tree가 정상적으로 인식하는지 확인합니다.
- 좌측 사이드바에 Todo Tree 패널이 표시되는지 확인합니다.

**테스트 방법:**

1. 코드에 `TODO: 테스트 주석` 작성
2. 좌측 사이드바에서 Todo Tree 패널 확인
3. 작성한 TODO 주석이 트리 형태로 표시되는지 확인
4. 다양한 태그 (`NOTE:`, `[ ]`, `[x]`) 테스트

## 5. 추가 권장 설정

개발 효율성과 코드 품질을 높이기 위한 추가적인 VS Code 설정들을 안내합니다. 이러한 설정들은 팀 전체의 개발 경험을 일관되게 만들어줍니다.

### 🎯 설정 우선순위

| 설정            | 중요도  | 적용 시점    | 예상 효과            |
| --------------- | ------- | ------------ | -------------------- |
| **자동 저장**   | 🔴 필수 | 설정 완료 후 | 데이터 손실 방지     |
| **포맷터**      | 🔴 필수 | 설정 완료 후 | 코드 일관성 유지     |
| **파일 연결**   | 🟡 권장 | 설정 완료 후 | 문법 하이라이팅 개선 |
| **탭/들여쓰기** | 🟡 권장 | 설정 완료 후 | 코드 가독성 향상     |
| **자동 완성**   | 🟡 권장 | 설정 완료 후 | 개발 속도 향상       |
| **Git 통합**    | 🟢 선택 | 설정 완료 후 | 버전 관리 효율성     |

### 5.1. 자동 저장 설정

파일을 수동으로 저장하지 않아도 자동으로 저장되도록 설정하여 작업 중 데이터 손실을 방지하고 개발 효율성을 높입니다.

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

#### ⚙️ 설정 옵션 설명

| 옵션                      | 값                 | 설명                          | 권장 설정 |
| ------------------------- | ------------------ | ----------------------------- | --------- |
| **`files.autoSave`**      | `"off"`            | 자동 저장 비활성화 (기본값)   | ❌ 비권장 |
|                           | `"afterDelay"`     | 지정된 지연 시간 후 자동 저장 | ✅ 권장   |
|                           | `"onFocusChange"`  | 포커스가 변경될 때 자동 저장  | 🟡 선택적 |
|                           | `"onWindowChange"` | 창이 변경될 때 자동 저장      | 🟡 선택적 |
| **`files.autoSaveDelay`** | `1000`             | 1초 후 자동 저장              | ✅ 권장   |
|                           | `2000`             | 2초 후 자동 저장              | 🟡 선택적 |
|                           | `500`              | 0.5초 후 자동 저장            | ⚠️ 주의   |

#### 🎯 장점

- 작업 중 실수로 파일을 저장하지 않아도 자동으로 저장됩니다.
- 시스템 오류나 브라우저 충돌 시에도 최근 작업 내용이 보존됩니다.
- 팀원들이 모두 동일한 자동 저장 정책을 사용하여 일관성을 유지합니다.

### 5.2. 포맷터 설정

코드 저장 시 자동으로 포맷팅을 적용하여 일관된 코드 스타일을 유지하고 코드 리뷰의 부담을 줄입니다.

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### ⚙️ 설정 옵션 설명

| 옵션                          | 값                                   | 설명                        | 권장 설정 |
| ----------------------------- | ------------------------------------ | --------------------------- | --------- |
| **`editor.formatOnSave`**     | `true`                               | 저장 시 자동 포맷팅 적용    | ✅ 권장   |
|                               | `false`                              | 자동 포맷팅 비활성화        | ❌ 비권장 |
| **`editor.defaultFormatter`** | `"esbenp.prettier-vscode"`           | Prettier 확장 프로그램 사용 | ✅ 권장   |
|                               | `"ms-vscode.vscode-typescript-next"` | TypeScript 내장 포맷터 사용 | 🟡 선택적 |
|                               | `"vscode.json-language-features"`    | JSON 파일용 포맷터          | 🟡 선택적 |

#### 🌐 언어별 포맷터 설정

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  }
}
```

#### 📊 언어별 포맷터 매트릭스

| 언어           | 포맷터       | 이유                             | 설정    |
| -------------- | ------------ | -------------------------------- | ------- |
| **JavaScript** | Prettier     | 일관된 스타일, 커스터마이징 가능 | ✅ 권장 |
| **TypeScript** | Prettier     | JavaScript와 동일한 스타일 유지  | ✅ 권장 |
| **Vue**        | Prettier     | Vue 파일 내 모든 언어 지원       | ✅ 권장 |
| **JSON**       | VS Code 내장 | JSON 표준 포맷팅                 | ✅ 권장 |
| **CSS**        | Prettier     | 일관된 스타일                    | ✅ 권장 |
| **HTML**       | Prettier     | 일관된 스타일                    | ✅ 권장 |

#### 🎯 장점

- 코드 저장 시마다 자동으로 일관된 스타일이 적용됩니다.
- 팀원 간 코드 스타일 불일치 문제가 해결됩니다.
- 코드 리뷰 시 스타일 관련 논의를 줄일 수 있습니다.

### 5.3. 파일 연결 설정

특정 파일 확장자를 특정 언어로 인식하도록 설정하여 문법 하이라이팅과 자동 완성 기능을 올바르게 작동시킵니다.

```json
{
  "files.associations": {
    "*.vue": "vue",
    "*.jsx": "javascriptreact",
    "*.tsx": "typescriptreact",
    "*.env": "dotenv",
    "*.env.local": "dotenv",
    "*.env.development": "dotenv",
    "*.env.production": "dotenv"
  }
}
```

#### ⚙️ 설정 옵션 설명

| 파일 패턴    | 언어 타입         | 설명                               | 중요도  |
| ------------ | ----------------- | ---------------------------------- | ------- |
| **`*.vue`**  | `vue`             | Vue 파일을 Vue 언어로 인식         | 🔴 필수 |
| **`*.jsx`**  | `javascriptreact` | JSX 파일을 JavaScript React로 인식 | 🔴 필수 |
| **`*.tsx`**  | `typescriptreact` | TSX 파일을 TypeScript React로 인식 | 🔴 필수 |
| **`*.env*`** | `dotenv`          | 환경 변수 파일을 dotenv로 인식     | 🟡 권장 |

#### 🌐 추가 권장 파일 연결

```json
{
  "files.associations": {
    "*.vue": "vue",
    "*.jsx": "javascriptreact",
    "*.tsx": "typescriptreact",
    "*.env*": "dotenv",
    "*.dockerfile": "dockerfile",
    "*.Dockerfile": "dockerfile",
    "Dockerfile*": "dockerfile",
    "*.md": "markdown",
    "*.yml": "yaml",
    "*.yaml": "yaml"
  }
}
```

#### 📊 파일 연결 매트릭스

| 파일 확장자       | 언어 타입  | 문법 하이라이팅 | 자동 완성 | 포맷터   |
| ----------------- | ---------- | --------------- | --------- | -------- |
| **`.vue`**        | Vue        | ✅              | ✅        | Prettier |
| **`.jsx`**        | JSX        | ✅              | ✅        | Prettier |
| **`.tsx`**        | TSX        | ✅              | ✅        | Prettier |
| **`.env*`**       | dotenv     | ✅              | ✅        | -        |
| **`Dockerfile*`** | dockerfile | ✅              | ✅        | -        |
| **`.md`**         | markdown   | ✅              | ✅        | -        |
| **`.yml/.yaml`**  | yaml       | ✅              | ✅        | -        |

#### 🎯 장점

- 파일 확장자에 관계없이 올바른 언어로 인식되어 문법 하이라이팅이 적용됩니다.
- 자동 완성과 IntelliSense 기능이 정확하게 작동합니다.
- 파일 타입별로 적절한 포맷터와 린터가 적용됩니다.

### 5.4. 추가 개발 효율성 설정

#### 📏 탭 및 들여쓰기 설정

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.trimAutoWhitespace": true
}
```

| 설정                            | 값      | 설명                        | 권장 설정 |
| ------------------------------- | ------- | --------------------------- | --------- |
| **`editor.tabSize`**            | `2`     | 탭 크기를 2칸으로 설정      | ✅ 권장   |
| **`editor.insertSpaces`**       | `true`  | 탭 대신 공백 사용           | ✅ 권장   |
| **`editor.detectIndentation`**  | `false` | 자동 들여쓰기 감지 비활성화 | ✅ 권장   |
| **`editor.trimAutoWhitespace`** | `true`  | 자동 공백 제거              | ✅ 권장   |

#### 🚀 자동 완성 설정

```json
{
  "editor.suggestOnTriggerCharacters": true,
  "editor.acceptSuggestionOnCommitCharacter": true,
  "editor.acceptSuggestionOnEnter": "on",
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  }
}
```

| 설정                                           | 값      | 설명                        | 효과                |
| ---------------------------------------------- | ------- | --------------------------- | ------------------- |
| **`editor.suggestOnTriggerCharacters`**        | `true`  | 특정 문자 입력 시 제안 표시 | 자동 완성 활성화    |
| **`editor.acceptSuggestionOnCommitCharacter`** | `true`  | 커밋 문자 입력 시 제안 수락 | 빠른 코드 입력      |
| **`editor.acceptSuggestionOnEnter`**           | `"on"`  | Enter 키로 제안 수락        | 편리한 사용         |
| **`editor.quickSuggestions.other`**            | `true`  | 일반 코드에서 빠른 제안     | 개발 속도 향상      |
| **`editor.quickSuggestions.comments`**         | `false` | 주석에서 제안 비활성화      | 주석 작성 방해 방지 |
| **`editor.quickSuggestions.strings`**          | `true`  | 문자열에서 제안 활성화      | 문자열 입력 도움    |

#### 🔄 Git 통합 설정

```json
{
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.autofetchPeriod": 180
}
```

| 설정                        | 값      | 설명                          | 효과            |
| --------------------------- | ------- | ----------------------------- | --------------- |
| **`git.enableSmartCommit`** | `true`  | 스테이징된 파일만 커밋        | 안전한 커밋     |
| **`git.confirmSync`**       | `false` | 동기화 확인 대화상자 비활성화 | 빠른 동기화     |
| **`git.autofetch`**         | `true`  | 자동으로 원격 저장소 가져오기 | 최신 상태 유지  |
| **`git.autofetchPeriod`**   | `180`   | 3분마다 자동 가져오기         | 주기적 업데이트 |

### 🎯 설정 완료 체크리스트

| 설정 카테고리        | 설정 항목               | 적용 여부 | 테스트 방법               |
| -------------------- | ----------------------- | --------- | ------------------------- |
| **🔌 확장 프로그램** | 필수 확장 프로그램 설치 | ⬜        | 확장 프로그램 패널 확인   |
| **📝 스니펫**        | Vue/JS 스니펫 설정      | ⬜        | 스니펫 입력 테스트        |
| **💾 자동 저장**     | 1초 후 자동 저장        | ⬜        | 파일 수정 후 1초 대기     |
| **🎨 포맷터**        | 저장 시 자동 포맷팅     | ⬜        | 파일 저장 후 포맷팅 확인  |
| **📁 파일 연결**     | Vue/JSX/TSX 파일 연결   | ⬜        | 문법 하이라이팅 확인      |
| **📏 들여쓰기**      | 2칸 들여쓰기 설정       | ⬜        | 새 파일에서 Tab 키 테스트 |
| **🚀 자동 완성**     | IntelliSense 활성화     | ⬜        | 코드 입력 시 제안 확인    |
| **🔄 Git 통합**      | 자동 가져오기 설정      | ⬜        | Git 패널에서 상태 확인    |

이러한 설정들을 통해 팀 전체가 일관된 개발 환경에서 효율적으로 작업할 수 있으며, 코드 품질과 생산성을 크게 향상시킬 수 있습니다.
