# Java & Spring 코드 컨벤션 가이드

## 1. 코드 컨벤션의 중요성

일관된 코드 컨벤션은 팀의 생산성과 프로젝트의 지속 가능성을 높이는 데 필수적입니다. 잘 정립된 규칙은 가독성을 높이고, 유지보수를 용이하게 하며, 팀의 협업 효율을 극대화합니다.

### 🎯 코드 컨벤션의 핵심 가치

| 가치                   | 설명                                | 효과                         |
| ---------------------- | ----------------------------------- | ---------------------------- |
| **📖 가독성 향상**     | 일관된 스타일로 코드 이해도 증가    | 코드 분석 시간 단축          |
| **🔧 유지보수 용이성** | 예측 가능한 구조로 수정 작업 효율화 | 버그 수정 및 기능 추가 용이  |
| **👥 팀 협업**         | 공통 규칙으로 팀원 간 소통 원활     | 코드 리뷰 효율성 증대        |
| **🚀 개발 생산성**     | 표준화된 패턴으로 개발 속도 향상    | 신규 개발자 온보딩 시간 단축 |

## 2. 주요 코드 컨벤션 규칙

### 📝 네이밍 컨벤션

| 구분         | 규칙                 | 예시                                  | 설명                                         |
| ------------ | -------------------- | ------------------------------------- | -------------------------------------------- |
| **클래스명** | `PascalCase`         | `UserManager`, `DatabaseConnection`   | 모든 단어의 첫 글자를 대문자로               |
| **메서드명** | `camelCase`          | `calculateTotal`, `getUserInfo`       | 첫 단어는 소문자, 이후 단어 첫 글자는 대문자 |
| **변수명**   | `camelCase`          | `userName`, `isValid`                 | 메서드명과 동일한 규칙                       |
| **상수**     | `UPPER_SNAKE_CASE`   | `MAX_RETRY_COUNT`, `DEFAULT_ENCODING` | 모든 글자 대문자, 단어 사이 언더스코어       |
| **패키지명** | 소문자 + 도메인 역순 | `com.example.project`                 | 도메인명을 역순으로 사용                     |

### 🎨 포맷팅 규칙

| 규칙         | 설정           | 예시                                                          | 이유                  |
| ------------ | -------------- | ------------------------------------------------------------- | --------------------- |
| **들여쓰기** | 4칸 공백       | `    if (condition) {`                                        | 가독성과 일관성       |
| **줄 길이**  | 120자 이내     | `String result = veryLongMethodName(param1, param2, param3);` | 화면에서 한 줄에 표시 |
| **공백**     | 연산자 앞뒤    | `if (a == 1)`, `int sum = a + b;`                             | 가독성 향상           |
| **중괄호**   | 같은 줄에 위치 | `if (condition) {`                                            | 일관된 스타일 유지    |

### Javadoc 주석 가이드라인

모든 public 클래스, 인터페이스, 메서드에는 Javadoc을 작성하여 코드의 의도와 기능을 명확히 합니다.

```java
/**
 * 사용자 정보를 조회한다.
 *
 * @param userId 사용자 ID
 * @return 사용자 정보, 찾지 못하면 null
 * @throws IllegalArgumentException userId가 null이거나 음수인 경우
 */
public User getUserById(Long userId) {
    if (userId == null || userId < 0) {
        throw new IllegalArgumentException("Invalid user ID");
    }
    return userRepository.findById(userId);
}
```

### 📦 Import 문 정렬

Import 문은 다음 순서로 작성하여 일관성을 유지합니다.

| 순서  | 패키지 유형         | 예시                                       | 설명                 |
| ----- | ------------------- | ------------------------------------------ | -------------------- |
| **1** | `java.*`            | `java.util.List`, `java.io.File`           | Java 표준 라이브러리 |
| **2** | `javax.*`           | `javax.servlet.http.HttpServletRequest`    | Java 확장 라이브러리 |
| **3** | 서드파티 라이브러리 | `org.springframework.*`, `com.fasterxml.*` | 외부 라이브러리      |
| **4** | 자체 패키지         | `com.example.myapp.*`                      | 프로젝트 내부 패키지 |

```java
// 1. Java 표준 라이브러리
import java.util.List;
import java.util.ArrayList;

// 2. Java 확장 라이브러리
import javax.servlet.http.HttpServletRequest;

// 3. 서드파티 라이브러리
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 4. 자체 패키지
import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;
```

## 3. 도메인 기반 패키지 구조 (Package by Domain)

도메인 주도 설계(DDD)에 기반한 **Package by Domain** 구조를 따릅니다. 이 방식은 기능(도메인)을 중심으로 코드를 묶어 응집도를 높이고, 관련된 코드를 한 곳에서 관리하는 데 용이합니다.

```
📁 src/main/java
└── 📁 com.example.project
    ├── 📁 application          // 애플리케이션 서비스 레이어
    ├── 📁 domain              // 핵심 도메인 로직 및 모델
    │   ├── 📁 user            // User 도메인
    │   │   ├── 📁 entities    // 도메인 엔티티
    │   │   ├── 📁 repositories // 데이터 접근 추상화
    │   │   ├── 📁 services    // 도메인 서비스
    │   │   └── 📁 events      // 도메인 이벤트
    │   └── 📁 order           // Order 도메인
    │       ├── 📁 entities
    │       ├── 📁 repositories
    │       ├── 📁 services
    │       └── 📁 events
    └── 📁 infrastructure      // 외부 시스템 통합 (DB, API 등)
        ├── 📁 persistence     // 데이터베이스 관련 구현
        ├── 📁 api            // 외부 API 통신 구현
        └── 📁 controllers    // 사용자 요청 처리 (Controller)
```

## 4. 스프링 컴포넌트 네이밍

| 컴포넌트       | 네이밍 규칙                                   | 예시                                     | 설명               |
| -------------- | --------------------------------------------- | ---------------------------------------- | ------------------ |
| **Controller** | `{도메인}Controller`                          | `UserController`, `OrderController`      | 웹 요청 처리       |
| **Service**    | `{도메인}Service`                             | `UserService`, `OrderService`            | 비즈니스 로직 처리 |
| **Repository** | `{도메인}Repository`                          | `UserRepository`, `OrderRepository`      | 데이터 접근 처리   |
| **DTO**        | `{도메인}Dto` 또는 `{도메인}Request/Response` | `UserDto`, `UserRequest`, `UserResponse` | 데이터 전송 객체   |

## 5. 코드 품질 자동화 및 라이브러리

프로젝트에 유용한 라이브러리를 도입하여 개발 생산성과 코드 품질을 높일 수 있습니다.

### 📚 라이브러리 매트릭스

| 라이브러리                | 목적                | 중요도  | 적용 시점        |
| ------------------------- | ------------------- | ------- | ---------------- |
| **jspecify**              | Null 안전성         | 🔴 필수 | 개발 시작 시     |
| **spotless**              | 코드 포맷팅         | 🔴 필수 | 프로젝트 설정 시 |
| **Lombok**                | 보일러플레이트 제거 | 🟡 권장 | 개발 시작 시     |
| **tsid-creator**          | 고유 ID 생성        | 🟡 권장 | 필요 시          |
| **Dependency Management** | 의존성 관리         | 🔴 필수 | 프로젝트 설정 시 |

### 1. jspecify (Nullability Annotations)

메소드 파라미터, 리턴 값에 **`@Nullable`** 어노테이션을 사용하여 Null을 허용하는지 명확히 표시합니다. 이를 통해 컴파일 타임에 NullPointerException 발생 가능성을 줄일 수 있습니다.

```java
import org.jspecify.annotations.Nullable;

public String getNickname(@Nullable String userId) {
    if (userId == null) {
        return "Anonymous";
    }
    // ...
}
```

**장점:**

- 컴파일 타임에 Null 안전성 검증
- 코드의 의도를 명확히 표현
- 런타임 NullPointerException 방지

### 2. spotless (Formatter & Linter)

코드 포맷팅을 자동으로 통일하고, 린팅을 통해 코드 스타일 규칙을 강제합니다. 팀원 간의 코드 스타일 불일치를 효과적으로 방지합니다.

```groovy
// build.gradle (Spotless 설정 예시)
plugins {
    id "com.diffplug.spotless" version "6.25.0"
}
spotless {
    java {
        googleJavaFormat()
    }
}
```

**장점:**

- 자동 코드 포맷팅
- 팀원 간 스타일 일관성 유지
- CI/CD에서 자동 검증

### 3. Lombok (Boilerplate Code Reduction)

`@Getter`, `@Setter`, `@NoArgsConstructor` 등 어노테이션을 사용하여 반복적인 보일러플레이트 코드를 줄여줍니다.

```java
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class UserDto {
    private String name;
    private int age;
}
```

**장점:**

- 보일러플레이트 코드 제거
- 코드 가독성 향상
- 유지보수 용이성 증대

### 4. tsid-creator (Time-Sortable ID)

시간순으로 정렬 가능한 고유 ID를 생성하여 데이터베이스 인덱싱 성능을 향상시킵니다.

```java
import com.github.f4b6a3.tsid.TsidCreator;

public class TsidGenerator {
    public static void main(String[] args) {
        // TSID 생성
        String tsid = TsidCreator.getTsid().toString();
        System.out.println("Generated TSID: " + tsid);
    }
}
```

**장점:**

- 시간순 정렬 가능한 고유 ID
- 데이터베이스 성능 최적화
- 분산 환경에서도 고유성 보장

### 5. Dependency Management

Gradle의 `dependencyManagement` 블록을 사용하여 의존성 라이브러리의 버전을 중앙에서 관리합니다. 이를 통해 각 모듈에서 버전 정보를 중복으로 선언할 필요가 없어지며, 버전 충돌을 방지하고 업그레이드를 용이하게 만듭니다.

```groovy
// build.gradle
plugins {
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
    id 'java'
}

dependencies {
    // Spring Boot의 표준 의존성 관리 플랫폼 가져오기
    implementation platform(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES)

    // 이후 의존성 선언 시 버전 생략
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

**장점:**

- 중앙 집중식 버전 관리
- 버전 충돌 방지
- 의존성 업그레이드 용이성

## 6. 디자인 패턴

디자인 패턴은 소프트웨어 개발에서 자주 발생하는 문제를 해결하기 위해 검증된 설계 방식을 정리한 것입니다. 코드의 재사용성과 유지보수성, 확장성을 높여줍니다.

### 🎯 디자인 패턴 개요

소프트웨어 개발에서 자주 발생하는 반복적인 문제를 해결하기 위한 검증된 설계 방식입니다. 특정 상황에 맞는 최적의 해결책을 제공하여 개발 효율을 높여줍니다.

#### 📊 패턴의 주요 분류

| 분류          | 설명                                    | 주요 패턴                  | 사용 시기                    |
| ------------- | --------------------------------------- | -------------------------- | ---------------------------- |
| **생성 패턴** | 객체를 만드는 방법과 관련된 문제        | 싱글턴, 팩토리, 빌더       | 객체 생성이 복잡할 때        |
| **구조 패턴** | 객체와 클래스 간의 관계를 조직하는 문제 | 어댑터, 프록시, 데코레이터 | 기존 코드와 새 코드 연결 시  |
| **행동 패턴** | 객체들의 소통과 책임을 나누는 문제      | 옵저버, 전략, 커맨드       | 객체 간 상호작용이 복잡할 때 |

### 6.2. 생성 패턴

객체 생성을 유연하게 관리하는 패턴들입니다.

#### 싱글턴 패턴 (Singleton)

프로그램 전체에서 객체가 딱 하나만 존재해야 할 때 사용합니다. 하나의 인스턴스를 모든 곳에서 공유하여 메모리를 절약합니다.

```java
public class Database {
    private static Database instance;
    private Database() {}
    public static Database getInstance() {
        if (instance == null) instance = new Database();
        return instance;
    }
}
```

#### 팩토리 패턴 (Factory Method)

객체 생성을 한 곳에 모아두고, 필요한 객체를 만들어 주는 '공장' 역할을 맡깁니다.

```java
interface Document { void open(); }
class TextDocument implements Document { public void open() { System.out.println("텍스트 열기"); } }
class DocumentFactory {
    public static Document createDocument(String type) {
        if ("text".equals(type)) return new TextDocument();
        return null;
    }
}
```

#### 빌더 패턴 (Builder)

복잡한 객체를 만들 때 단계별로 조립해서 완성합니다. 가독성과 유연성이 높아집니다.

```java
class Pizza {
    private String size;
    private String topping;
    private Pizza(Builder builder) {
        this.size = builder.size;
        this.topping = builder.topping;
    }
    public static class Builder {
        private String size;
        private String topping;
        public Builder setSize(String size) { this.size = size; return this; }
        public Builder setTopping(String topping) { this.topping = topping; return this; }
        public Pizza build() { return new Pizza(this); }
    }
}
```

#### 프로토타입 패턴 (Prototype)

비슷한 객체를 여러 개 만들어야 할 때, 기존 객체를 복사해서 새 객체를 만듭니다. 객체 생성 비용이 높을 때 유용합니다.

```java
class Monster implements Cloneable {
    private String name;
    public Monster(String name) { this.name = name; }
    public Monster clone() {
        try { return (Monster) super.clone(); } catch (Exception e) { return null; }
    }
}
```

### 6.3. 구조 패턴

객체와 클래스 간의 관계를 조직하여 코드를 유연하게 만드는 패턴들입니다.

#### 어댑터 패턴 (Adapter)

서로 호환되지 않는 인터페이스를 연결하는 '변환기' 역할을 합니다. 레거시 코드와 새 시스템을 연결할 때 유용합니다.

```java
interface NewSystem { void useNew(); }
class OldSystem { public void useOld() { System.out.println("옛날 방식"); } }
class Adapter implements NewSystem {
    private OldSystem old;
    public Adapter(OldSystem old) { this.old = old; }
    public void useNew() { old.useOld(); }
}
```

#### 프록시 패턴 (Proxy)

실제 객체에 대한 접근을 제어하는 '대리인' 객체를 둡니다. 보안, 로깅, 성능 최적화 등에 사용됩니다.

```java
interface Image { void display(); }
class RealImage implements Image { public void display() { System.out.println("큰 이미지 표시"); } }
class ProxyImage implements Image {
    private RealImage real;
    public void display() {
        if (real == null) real = new RealImage();
        real.display();
    }
}
```

#### 데코레이터 패턴 (Decorator)

객체에 기능을 동적으로 추가하고 싶을 때 사용합니다. 기존 코드를 변경하지 않고 새로운 기능을 '감싸서' 추가합니다.

```java
interface Coffee { String getDescription(); }
class SimpleCoffee implements Coffee { public String getDescription() { return "기본 커피"; } }
class MilkDecorator implements Coffee {
    private Coffee coffee;
    public MilkDecorator(Coffee coffee) { this.coffee = coffee; }
    public String getDescription() { return coffee.getDescription() + ", 우유 추가"; }
}
```

#### 퍼사드 패턴 (Facade)

복잡한 시스템에 대해 간단한 인터페이스를 제공하여 사용성을 높입니다. 여러 서브시스템을 하나의 통합된 객체로 감쌉니다.

```java
class TV { void on() { System.out.println("TV 켜짐"); } }
class Speaker { void on() { System.out.println("스피커 켜짐"); } }
class Facade {
    private TV tv = new TV();
    private Speaker speaker = new Speaker();
    public void startMovie() { tv.on(); speaker.on(); }
}
```

#### 브리지 패턴 (Bridge)

추상화와 구현을 분리하여 각각 독립적으로 확장할 수 있게 합니다. 기능과 구현이 모두 다양한 경우에 유용합니다.

```java
interface Color { String fill(); }
class Red implements Color { public String fill() { return "빨강"; } }
abstract class Shape {
    protected Color color;
    public Shape(Color color) { this.color = color; }
    abstract String draw();
}
class Circle extends Shape {
    public Circle(Color color) { super(color); }
    public String draw() { return "원, 색상: " + color.fill(); }
}
```

### 6.4. 행동 패턴

객체 간의 상호작용과 책임 분배를 관리하여 코드를 더 똑똑하게 만듭니다.

#### 옵저버 패턴 (Observer)

한 객체의 변화가 다른 객체들에게 자동으로 알려져야 할 때 사용합니다. '구독-발행' 모델로 구현됩니다.

```java
interface Observer { void update(String message); }
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    public void addObserver(Observer o) { observers.add(o); }
    public void notify(String message) {
        for (Observer o : observers) o.update(message);
    }
}
class User implements Observer {
    public void update(String message) { System.out.println("알림: " + message); }
}
```

#### 전략 패턴 (Strategy)

같은 일을 여러 방식으로 처리하고 싶을 때, 알고리즘을 분리해서 필요할 때 바꿀 수 있게 합니다.

```java
interface Strategy { int calculate(int a, int b); }
class Add implements Strategy { public int calculate(int a, int b) { return a + b; } }
class Calculator {
    private Strategy strategy;
    public void setStrategy(Strategy strategy) { this.strategy = strategy; }
    public int execute(int a, int b) { return strategy.calculate(a, b); }
}
```

#### 커맨드 패턴 (Command)

요청을 객체로 만들어 실행과 취소를 관리합니다. '되돌리기' 기능에 유용합니다.

```java
interface Command { void execute(); }
class Light { public void on() { System.out.println("불 켜짐"); } }
class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light light) { this.light = light; }
    public void execute() { light.on(); }
}
class Remote {
    private Command command;
    public void setCommand(Command command) { this.command = command; }
    public void press() { command.execute(); }
}
```

#### 상태 패턴 (State)

객체의 상태에 따라 행동이 달라질 때, 상태를 객체로 분리해서 관리합니다. 복잡한 조건문을 단순화할 수 있습니다.

```java
interface State { void move(); }
class Walking implements State { public void move() { System.out.println("걷기"); } }
class Player {
    private State state;
    public void setState(State state) { this.state = state; }
    public void move() { state.move(); }
}
```

#### 템플릿 메서드 패턴 (Template Method)

알고리즘의 뼈대를 부모 클래스에 정의하고, 세부 구현은 하위 클래스에 위임합니다.

```java
abstract class Recipe {
    public void cook() { prepare(); cookFood(); serve(); }
    abstract void prepare();
    abstract void cookFood();
    void serve() { System.out.println("서빙"); }
}
class Pasta extends Recipe {
    void prepare() { System.out.println("파스타 준비"); }
    void cookFood() { System.out.println("파스타 삶기"); }
}
```

### 6.5. 디자인 패턴 적용 사례

디자인 패턴은 실제 프로젝트에서 다양한 방식으로 활용됩니다. 패턴을 조합하여 더 강력한 솔루션을 만들 수도 있습니다.

#### 옵저버 + 싱글턴 조합

실시간 채팅 앱에서 채팅 서버를 싱글턴으로 만들고, 메시지가 오면 옵저버 패턴으로 모든 접속자에게 알립니다.

#### 안티패턴

- **싱글턴 과다 사용:** 모든 객체를 싱글턴으로 만들면 코드가 엉키고 테스트가 어려워집니다.
- **불필요한 복잡성:** 간단한 작업에 복잡한 패턴을 사용하면 오히려 가독성이 떨어집니다.

## 7. Vue.js 프론트엔드와 Spring 백엔드 통합

Vue.js로 프론트엔드를 개발하고, Spring Boot를 사용하여 백엔드와 정적 파일 서버를 동시에 운영하는 방법입니다.

### 1. Vue.js 프로젝트 빌드

Vue CLI 또는 Vite를 사용하여 `npm run build` 명령어를 실행하면 `/dist` 폴더에 프로덕션용 정적 파일들이 생성됩니다.

### 2. Spring Boot에 정적 파일 삽입

생성된 `dist` 폴더의 모든 내용을 Spring Boot 프로젝트의 `src/main/resources/static` 디렉터리 아래로 복사합니다.

### 3. Gradle 설정 자동화 (선택 사항)

`build.gradle` 파일에 아래 태스크를 추가하여 빌드 시 자동으로 Vue 프로젝트를 빌드하고 복사하도록 설정할 수 있습니다.

```groovy
// build.gradle (Vue + Spring 자동 빌드)
task buildVue(type: Exec) {
    dependsOn 'npmInstall'
    workingDir 'src/main/web-frontend' // Vue 프로젝트 경로
    commandLine 'npm', 'run', 'build'
}

task copyVueToStatic(type: Copy) {
    dependsOn 'buildVue'
    from 'src/main/web-frontend/dist'
    into 'src/main/resources/static'
}

processResources.dependsOn 'copyVueToStatic'
```

### 4. SPA 라우팅 설정

Vue.js는 클라이언트 사이드 라우팅을 사용하므로, Spring Boot에서 모든 경로 요청을 `index.html`로 포워딩해야 합니다.

```java
// src/main/java/.../config/WebMvcConfig.java
package com.example.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Vue.js 라우팅을 위해 모든 경로를 index.html로 포워딩
        registry.addViewController("/{spring:[a-zA-Z0-9-]*}")
                .setViewName("forward:/index.html");
    }
}
```
