# DB 가이드 문서

이 문서는 MySQL과 PostgreSQL의 개발을 위한 DB 가이드입니다. 데이터베이스 설치부터 간단한 쿼리 작성, 성능 튜닝까지 꼭 알아야 할 핵심 내용을 담았습니다.

## 1. DB 설치 및 연결

| 구분                 | MySQL                                                                                                                       | PostgreSQL                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **설치 방법**        | Windows: MySQL Installer<br>macOS: Homebrew로 `brew install mysql`<br>Linux: apt로 `sudo apt install mysql-server`          | Windows/macOS: 공식 Installer<br>Linux: apt로 `sudo apt install postgresql`                                            |
| **GUI 도구**         | MySQL Workbench: 모델링, 개발, 관리 기능이 통합되어 있어 편리합니다.                                                        | pgAdmin: 쿼리 편집, 서버 관리, 모니터링 등 다양한 기능을 제공합니다.                                                   |
| **Java Spring 연결** | Maven 의존성: `mysql-connector-java`<br>application.properties: `spring.datasource.url=jdbc:mysql://localhost:3306/db_name` | Maven 의존성: `postgresql`<br>application.properties: `spring.datasource.url=jdbc:postgresql://localhost:5432/db_name` |

## 2. 데이터베이스 모델링

### 데이터베이스 설계 기본 개념

데이터베이스 설계는 비즈니스 요구사항을 분석하여 효율적인 데이터 구조를 만드는 과정입니다.

#### 1. 엔티티(Entity)와 속성(Attribute)

**엔티티(Entity)**: 데이터베이스에 저장할 대상이 되는 실체

- 예: 사용자, 상품, 주문, 카테고리

**속성(Attribute)**: 엔티티의 특성이나 성질

- 예: 사용자의 이름, 나이, 이메일

**예시:**

```
사용자(Users) 엔티티
├── 사용자ID (Primary Key)
├── 이름
├── 이메일
├── 나이
├── 가입일
└── 상태
```

#### 2. 관계(Relationship)

**관계의 종류:**

- **1:1 (One-to-One)**: 한 엔티티의 인스턴스가 다른 엔티티의 인스턴스와 정확히 하나씩 대응
- **1:N (One-to-Many)**: 한 엔티티의 인스턴스가 다른 엔티티의 여러 인스턴스와 대응
- **N:M (Many-to-Many)**: 한 엔티티의 여러 인스턴스가 다른 엔티티의 여러 인스턴스와 대응

**예시:**

```
사용자(Users) 1:N 주문(Orders)
├── 한 사용자는 여러 주문을 가질 수 있음
└── 한 주문은 하나의 사용자에만 속함

상품(Products) N:M 주문(Orders)
├── 한 상품은 여러 주문에 포함될 수 있음
└── 한 주문은 여러 상품을 포함할 수 있음
└── 중간 테이블: 주문상품(OrderItems) 필요
```

### 테이블 생성 (CREATE TABLE)

데이터베이스에서 데이터를 저장할 테이블을 생성합니다.

#### 기본 테이블 생성

```sql
-- 사용자 테이블 생성
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age TINYINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 주문 테이블 생성
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 상품 테이블 생성
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 주문상품 중간 테이블 (N:M 관계)
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_order_product (order_id, product_id)
);
```

#### 제약조건 (Constraints)

| 제약조건        | 설명                              | 예시                                             |
| --------------- | --------------------------------- | ------------------------------------------------ |
| **PRIMARY KEY** | 기본키, 유일하고 NULL이 아님      | `id INT PRIMARY KEY`                             |
| **FOREIGN KEY** | 외래키, 다른 테이블의 기본키 참조 | `FOREIGN KEY (user_id) REFERENCES users(id)`     |
| **UNIQUE**      | 유일한 값, 중복 불가              | `email VARCHAR(255) UNIQUE`                      |
| **NOT NULL**    | NULL 값 허용하지 않음             | `name VARCHAR(100) NOT NULL`                     |
| **CHECK**       | 값의 범위나 조건 제한             | `age TINYINT CHECK (age >= 0 AND age <= 150)`    |
| **DEFAULT**     | 기본값 설정                       | `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` |

#### 인덱스 생성

```sql
-- 단일 컬럼 인덱스
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_date ON orders(order_date);

-- 복합 인덱스
CREATE INDEX idx_user_name_email ON users(name, email);

-- 유니크 인덱스
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);

-- 인덱스 삭제
DROP INDEX idx_user_email ON users;
```

### 테이블 수정 (ALTER TABLE)

기존 테이블의 구조를 변경합니다.

```sql
-- 컬럼 추가
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 컬럼 수정
ALTER TABLE users MODIFY COLUMN age INT;

-- 컬럼 삭제
ALTER TABLE users DROP COLUMN phone;

-- 컬럼 이름 변경
ALTER TABLE users CHANGE COLUMN age user_age INT;

-- 제약조건 추가
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0);

-- 제약조건 삭제
ALTER TABLE users DROP CONSTRAINT chk_age;
```

### 테이블 삭제 (DROP TABLE)

```sql
-- 테이블 삭제
DROP TABLE users;

-- 테이블이 존재할 때만 삭제
DROP TABLE IF EXISTS users;

-- 외래키 제약조건 때문에 삭제가 안 될 때
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE users;
SET FOREIGN_KEY_CHECKS = 1;
```

## 3. SQL 기본 문법

SQL은 데이터베이스를 다루는 언어입니다. 아래의 문법을 익히고 자유롭게 사용할 수 있어야 합니다.

### 데이터 조회 (SELECT)

가장 많이 사용되는 명령어입니다. 필요한 컬럼만 명시하여 조회하는 습관을 들이세요. `SELECT *`는 테스트용으로만 사용하고, 실제 서비스 코드에서는 성능 저하를 막기 위해 필요한 컬럼을 명시하는 것이 좋습니다.

```sql
-- 모든 컬럼 조회 (성능 저하의 원인이 될 수 있으므로, 꼭 필요한 경우에만 사용)
SELECT * FROM users;

-- 특정 컬럼 조회 (권장)
SELECT id, name, email FROM users WHERE name = '김철수';
```

### 데이터 추가/수정/삭제 (INSERT, UPDATE, DELETE)

| 명령어     | 설명                                                                                                                                     | 예시                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **INSERT** | 새로운 데이터 행을 추가합니다. 모든 컬럼에 값을 지정하는 경우, 컬럼 목록을 생략할 수 있습니다.                                           | `INSERT INTO users (name, age) VALUES ('김영희', 25);` |
| **UPDATE** | 기존 데이터의 값을 수정합니다. WHERE 절을 빠뜨리면 전체 데이터가 수정되니 각별히 주의하세요.                                             | `UPDATE users SET age = 26 WHERE name = '김영희';`     |
| **DELETE** | 데이터를 삭제합니다. WHERE 절을 통해 삭제할 대상을 정확히 지정해야 합니다. 실수로 WHERE 절을 누락하면 테이블의 모든 데이터가 삭제됩니다. | `DELETE FROM users WHERE name = '김영희';`             |

#### INSERT 상세 예시

```sql
-- 단일 행 삽입
INSERT INTO users (name, email, age) VALUES ('김철수', 'kim@example.com', 30);

-- 여러 행 한 번에 삽입
INSERT INTO users (name, email, age) VALUES
    ('이영희', 'lee@example.com', 25),
    ('박민수', 'park@example.com', 35),
    ('최지영', 'choi@example.com', 28);

-- 다른 테이블에서 데이터 복사
INSERT INTO users (name, email, age)
SELECT name, email, age FROM temp_users WHERE age > 20;

-- ON DUPLICATE KEY UPDATE (중복 시 업데이트)
INSERT INTO users (id, name, email, age)
VALUES (1, '김철수', 'kim@example.com', 30)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    age = VALUES(age);
```

#### UPDATE 상세 예시

```sql
-- 단일 컬럼 수정
UPDATE users SET age = 31 WHERE id = 1;

-- 여러 컬럼 수정
UPDATE users SET
    name = '김철수',
    age = 31,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- 서브쿼리를 사용한 수정
UPDATE users SET age = (
    SELECT AVG(age) FROM users WHERE department = '개발팀'
) WHERE department = '개발팀';

-- JOIN을 사용한 수정
UPDATE users u
JOIN orders o ON u.id = o.user_id
SET u.last_order_date = o.order_date
WHERE o.order_date > u.last_order_date;
```

#### DELETE 상세 예시

```sql
-- 조건에 맞는 행 삭제
DELETE FROM users WHERE age < 18;

-- 서브쿼리를 사용한 삭제
DELETE FROM users WHERE id IN (
    SELECT user_id FROM orders WHERE order_date < '2020-01-01'
);

-- JOIN을 사용한 삭제
DELETE u FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.order_date < '2020-01-01';
```

### MERGE문 (UPSERT)

MERGE문은 조건에 따라 INSERT, UPDATE, DELETE를 한 번에 수행할 수 있는 강력한 문법입니다.

#### MySQL의 INSERT ... ON DUPLICATE KEY UPDATE

```sql
-- 기본 MERGE (중복 시 업데이트)
INSERT INTO users (id, name, email, age)
VALUES (1, '김철수', 'kim@example.com', 30)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    email = VALUES(email),
    age = VALUES(age),
    updated_at = CURRENT_TIMESTAMP;

-- 복합 키가 있는 경우
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1, 101, 2, 15000)
ON DUPLICATE KEY UPDATE
    quantity = quantity + VALUES(quantity),
    unit_price = VALUES(unit_price);
```

#### PostgreSQL의 ON CONFLICT

```sql
-- 기본 UPSERT
INSERT INTO users (id, name, email, age)
VALUES (1, '김철수', 'kim@example.com', 30)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    age = EXCLUDED.age,
    updated_at = CURRENT_TIMESTAMP;

-- 복합 키가 있는 경우
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1, 101, 2, 15000)
ON CONFLICT (order_id, product_id) DO UPDATE SET
    quantity = order_items.quantity + EXCLUDED.quantity,
    unit_price = EXCLUDED.unit_price;
```

### 트랜잭션 (TRANSACTION)

데이터베이스의 일관성을 보장하기 위해 여러 SQL 문을 하나의 작업 단위로 묶는 기능입니다.

```sql
-- 트랜잭션 시작
START TRANSACTION;

-- 여러 SQL 문 실행
INSERT INTO users (name, email) VALUES ('김철수', 'kim@example.com');
INSERT INTO orders (user_id, total_amount) VALUES (LAST_INSERT_ID(), 50000);

-- 성공 시 커밋
COMMIT;

-- 실패 시 롤백
-- ROLLBACK;
```

#### 트랜잭션 예시

```sql
-- 주문 처리 트랜잭션
START TRANSACTION;

BEGIN;
    -- 1. 주문 생성
    INSERT INTO orders (user_id, total_amount, status)
    VALUES (1, 100000, 'pending');

    SET @order_id = LAST_INSERT_ID();

    -- 2. 주문 상품 추가
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES (@order_id, 101, 2, 25000);

    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES (@order_id, 102, 1, 50000);

    -- 3. 재고 차감
    UPDATE products SET stock_quantity = stock_quantity - 2 WHERE id = 101;
    UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 102;

    -- 4. 주문 상태 업데이트
    UPDATE orders SET status = 'processing' WHERE id = @order_id;

COMMIT;
```

### 저장 프로시저 (Stored Procedure)

자주 사용되는 SQL 로직을 데이터베이스에 저장하여 재사용할 수 있습니다.

```sql
-- 저장 프로시저 생성
DELIMITER //
CREATE PROCEDURE GetUserOrders(IN user_id INT)
BEGIN
    SELECT
        o.id,
        o.order_date,
        o.total_amount,
        o.status,
        COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = user_id
    GROUP BY o.id, o.order_date, o.total_amount, o.status
    ORDER BY o.order_date DESC;
END //
DELIMITER ;

-- 저장 프로시저 호출
CALL GetUserOrders(1);

-- 저장 프로시저 삭제
DROP PROCEDURE IF EXISTS GetUserOrders;
```

### 뷰 (VIEW)

복잡한 쿼리를 가상의 테이블로 만들어 재사용할 수 있습니다.

```sql
-- 뷰 생성
CREATE VIEW user_order_summary AS
SELECT
    u.id as user_id,
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.order_date) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;

-- 뷰 사용
SELECT * FROM user_order_summary WHERE total_orders > 5;

-- 뷰 삭제
DROP VIEW IF EXISTS user_order_summary;
```

### 테이블 연결 (JOIN)

둘 이상의 테이블에 분산된 데이터를 합쳐서 조회할 때 사용합니다.

| JOIN 종류           | 설명                                        | 사용 시기                                                                                | 예시                                                      |
| ------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **INNER JOIN**      | 양쪽 테이블에 모두 존재하는 데이터만 조회   | 두 테이블 모두에 매칭되는 데이터가 필요한 경우                                           | 사용자와 구매 내역이 모두 있는 경우만 조회                |
| **LEFT JOIN**       | 왼쪽 테이블의 모든 데이터를 기준으로 연결   | 왼쪽 테이블의 모든 데이터를 보여주되, 오른쪽 테이블에 매칭되는 데이터가 있으면 함께 표시 | 모든 사용자를 보여주되, 구매 내역이 있으면 함께 표시      |
| **RIGHT JOIN**      | 오른쪽 테이블의 모든 데이터를 기준으로 연결 | 오른쪽 테이블의 모든 데이터를 보여주되, 왼쪽 테이블에 매칭되는 데이터가 있으면 함께 표시 | 모든 구매 내역을 보여주되, 사용자 정보가 있으면 함께 표시 |
| **FULL OUTER JOIN** | 양쪽 테이블의 모든 데이터를 조회            | 양쪽 테이블의 모든 데이터를 보여주고 싶은 경우                                           | 사용자와 구매 내역의 모든 조합을 보고 싶은 경우           |

```sql
-- `users` 테이블과 `purchases` 테이블을 사용자 ID(user_id)로 연결하여
-- 사용자 이름과 구매한 상품 이름을 조회합니다.
SELECT
    u.name,
    p.product_name
FROM
    users u
INNER JOIN
    purchases p ON u.id = p.user_id;
```

### 데이터 정렬 (ORDER BY)

조회한 데이터를 특정 컬럼을 기준으로 정렬할 때 사용합니다.

**정렬 옵션:**

- `ASC`: 오름차순 (기본값)
- `DESC`: 내림차순

**예시:**

```sql
-- 이름으로 오름차순 정렬
SELECT * FROM users ORDER BY name ASC;

-- 나이로 내림차순 정렬
SELECT * FROM users ORDER BY age DESC;

-- 여러 컬럼으로 정렬 (이름 오름차순, 나이 내림차순)
SELECT * FROM users ORDER BY name ASC, age DESC;

-- NULL 값 처리 (NULL을 맨 앞으로)
SELECT * FROM users ORDER BY name IS NULL, name ASC;
```

### 데이터 그룹화 (GROUP BY)

특정 컬럼의 값이 같은 행들을 그룹으로 묶어 집계 함수와 함께 사용합니다.

**주요 집계 함수:**

- `COUNT()`: 개수
- `SUM()`: 합계
- `AVG()`: 평균
- `MAX()`: 최댓값
- `MIN()`: 최솟값

**예시:**

```sql
-- 부서별 직원 수 조회
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;

-- 부서별 평균 급여 조회
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- HAVING 절로 그룹 필터링 (평균 급여가 5000 이상인 부서만)
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 5000;
```

### 데이터 필터링 (WHERE, HAVING)

조건에 맞는 데이터만 조회할 때 사용합니다.

**WHERE vs HAVING:**

- `WHERE`: 그룹화 전에 개별 행을 필터링
- `HAVING`: 그룹화 후에 그룹을 필터링

**예시:**

```sql
-- WHERE: 개별 행 필터링
SELECT department, COUNT(*) as employee_count
FROM employees
WHERE salary > 3000  -- 급여가 3000 이상인 직원만
GROUP BY department;

-- HAVING: 그룹 필터링
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;  -- 직원 수가 5명 이상인 부서만
```

### 중복 제거 (DISTINCT)

조회 결과에서 중복된 값을 제거할 때 사용합니다.

**예시:**

```sql
-- 중복된 부서명 제거
SELECT DISTINCT department FROM employees;

-- 여러 컬럼 조합에서 중복 제거
SELECT DISTINCT department, position FROM employees;

-- COUNT와 함께 사용
SELECT COUNT(DISTINCT department) as unique_departments FROM employees;
```

### 인덱싱 (INDEXING)

데이터베이스의 검색 성능을 향상시키기 위해 특정 컬럼에 인덱스를 생성합니다.

**인덱스 종류:**

- **단일 인덱스**: 하나의 컬럼에 대한 인덱스
- **복합 인덱스**: 여러 컬럼 조합에 대한 인덱스
- **유니크 인덱스**: 중복 값을 허용하지 않는 인덱스

**예시:**

```sql
-- 단일 인덱스 생성
CREATE INDEX idx_user_name ON users(name);
CREATE INDEX idx_user_email ON users(email);

-- 복합 인덱스 생성 (여러 컬럼 조합)
CREATE INDEX idx_user_name_email ON users(name, email);

-- 유니크 인덱스 생성
CREATE UNIQUE INDEX idx_user_email_unique ON users(email);

-- 인덱스 삭제
DROP INDEX idx_user_name ON users;
```

### 고급 필터링 기법

#### 1. LIKE 패턴 매칭

```sql
-- '김'으로 시작하는 이름
SELECT * FROM users WHERE name LIKE '김%';

-- '김'이 포함된 이름
SELECT * FROM users WHERE name LIKE '%김%';

-- '김'으로 끝나는 이름
SELECT * FROM users WHERE name LIKE '%김';

-- 정확히 3글자인 이름
SELECT * FROM users WHERE name LIKE '___';
```

#### 2. IN과 NOT IN

```sql
-- 특정 값들 중 하나와 일치
SELECT * FROM users WHERE department IN ('개발팀', '마케팅팀', '영업팀');

-- 특정 값들과 일치하지 않음
SELECT * FROM users WHERE department NOT IN ('개발팀', '마케팅팀');
```

#### 3. BETWEEN 범위 검색

```sql
-- 나이가 20~30 사이인 사용자
SELECT * FROM users WHERE age BETWEEN 20 AND 30;

-- 날짜 범위 검색
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

#### 4. IS NULL과 IS NOT NULL

```sql
-- 이메일이 없는 사용자
SELECT * FROM users WHERE email IS NULL;

-- 이메일이 있는 사용자
SELECT * FROM users WHERE email IS NOT NULL;
```

#### 5. CASE WHEN 조건부 처리

```sql
-- 나이대별 분류
SELECT
    name,
    age,
    CASE
        WHEN age < 20 THEN '청소년'
        WHEN age BETWEEN 20 AND 29 THEN '20대'
        WHEN age BETWEEN 30 AND 39 THEN '30대'
        ELSE '40대 이상'
    END as age_group
FROM users;
```

## 4. DB 성능 관리 핵심

### 테이블 정규화 (Normalization)

정규화란 이상현상이 있는 릴레이션을 분해하여 이상현상을 없애는 과정입니다. 이상현상이 존재하는 릴레이션을 분해하여 여러 개의 릴레이션을 생성하게 되며, 정규형이 높아질수록 이상현상은 줄어들게 됩니다.

즉, 쉽게 말하면 테이블 간에 중복된 데이터를 허용하지 않는다는 것입니다. 중복된 데이터를 허용하지 않음으로써 무결성(Integrity)를 유지할 수 있으며, DB의 저장 용량 역시 줄일 수 있습니다.

#### 정규화의 장단점

| 구분     | 내용                                                                                                                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **장점** | • 데이터베이스 변경 시 이상 현상(Anomaly)을 제거할 수 있음<br>• 새로운 데이터 형의 추가로 인한 확장 시, 구조를 변경하지 않아도 되거나 일부만 변경해도 됨<br>• 데이터베이스와 연동된 응용 프로그램에 최소한의 영향만을 미치게 되어 응용프로그램의 생명을 연장 |
| **단점** | • 릴레이션의 분해로 인해 릴레이션 간의 JOIN연산이 많아짐<br>• 질의에 대한 응답 시간이 느려질 수도 있음<br>• 조인이 많이 발생하여 성능 저하가 나타나면 **반정규화(De-normalization)**를 적용할 수도 있음                                                      |

#### 정규화 단계별 상세 설명

| 정규형 단계          | 조건                                 | 설명                                                               | 예시                                                                                 |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **1차 정규형 (1NF)** | 모든 컬럼이 원자값을 가져야 함       | 더 이상 나눌 수 없는 하나의 값만 저장                              | 하나의 셀에 여러 개의 값이 들어있지 않도록 테이블을 분리                             |
| **2차 정규형 (2NF)** | 1차 정규형 + 부분 함수 종속성 제거   | 기본 키의 일부에만 종속되는 컬럼이 없어야 함                       | 복합 기본 키 사용 시, 복합 키의 전체가 아닌 일부에만 종속된 컬럼을 분리              |
| **3차 정규형 (3NF)** | 2차 정규형 + 이행적 함수 종속성 제거 | 기본 키를 제외한 일반 컬럼이 다른 일반 컬럼에 종속되는 경우를 없앰 | 학생 테이블의 학과(Department)와 학과 위치(Department_Location)를 별도 테이블로 분리 |

#### 1차 정규화 (1NF) 상세 예시

**정규화 전 (1NF 위반)**

| 이름   | 나이 | 수강과목     |
| ------ | ---- | ------------ |
| 홍길동 | 20   | C,C++        |
| 이순신 | 21   | Java         |
| 이산   | 22   | DB, 운영체제 |

**정규화 후 (1NF 만족)**

| 이름   | 나이 | 수강과목 |
| ------ | ---- | -------- |
| 홍길동 | 20   | C        |
| 홍길동 | 20   | C++      |
| 이순신 | 21   | Java     |
| 이산   | 22   | DB       |
| 이산   | 22   | 운영체제 |

#### 2차 정규화 (2NF) 상세 예시

**정규화 전 (2NF 위반)**

| 학생 이름 | 나이 | 수강과목 |
| --------- | ---- | -------- |
| 홍길동    | 20   | C        |
| 홍길동    | 20   | C++      |
| 이순신    | 21   | Java     |
| 이산      | 22   | DB       |
| 이산      | 22   | 운영체제 |

**정규화 후 (2NF 만족)**

| 학생 이름 | 나이 |
| --------- | ---- |
| 홍길동    | 20   |
| 이순신    | 21   |
| 이산      | 22   |

| 학생 이름 | 수강과목 |
| --------- | -------- |
| 홍길동    | C        |
| 홍길동    | C++      |
| 이순신    | Java     |
| 이산      | DB       |
| 이산      | 운영체제 |

#### 3차 정규화 (3NF) 상세 예시

**정규화 전 (3NF 위반)**

| 학생 코드 | 학생이름 | DOB        | Street       | City | State      | ZIP   |
| --------- | -------- | ---------- | ------------ | ---- | ---------- | ----- |
| 001       | 홍길동   | 1990-01-01 | 강남대로 123 | 서울 | 서울특별시 | 12345 |
| 002       | 이순신   | 1991-02-02 | 강남대로 456 | 서울 | 서울특별시 | 12345 |
| 003       | 이산     | 1992-03-03 | 부산대로 789 | 부산 | 부산광역시 | 54321 |

**정규화 후 (3NF 만족)**

| 학생 코드 | 학생 이름 | DOB        | ZIP   |
| --------- | --------- | ---------- | ----- |
| 001       | 홍길동    | 1990-01-01 | 12345 |
| 002       | 이순신    | 1991-02-02 | 12345 |
| 003       | 이산      | 1992-03-03 | 54321 |

| ZIP   | Street       | City | State      |
| ----- | ------------ | ---- | ---------- |
| 12345 | 강남대로 123 | 서울 | 서울특별시 |
| 12345 | 강남대로 456 | 서울 | 서울특별시 |
| 54321 | 부산대로 789 | 부산 | 부산광역시 |

#### BCNF (Boyce-Codd Normal Form)

BCNF는 3차 정규화를 조금 더 강화한 버전입니다. 이는 3차 정규화에서 해결할 수 없는 이상현상을 해결할 수 있습니다. BCNF란 3차 정규화를 만족하면서 모든 결정자가 후보키 집합에 속한 정규형입니다.

**BCNF 조건:**

- 제 3 정규화를 만족해야 함
- 모든 결정자가 후보키 집합에 속해야 함

**BCNF 예시:**

| 학생ID | 과목         | 교수   | 교수실 |
| ------ | ------------ | ------ | ------ |
| 001    | 데이터베이스 | 김교수 | A101   |
| 002    | 데이터베이스 | 김교수 | A101   |
| 003    | 운영체제     | 이교수 | B202   |

위 테이블에서 (학생ID, 과목)이 기본키이고, 교수는 과목에 의해 결정되므로 교수는 과목에 종속됩니다. 하지만 교수는 후보키가 아니므로 BCNF를 위반합니다.

**BCNF 정규화 후:**

| 학생ID | 과목         |
| ------ | ------------ |
| 001    | 데이터베이스 |
| 002    | 데이터베이스 |
| 003    | 운영체제     |

| 과목         | 교수   | 교수실 |
| ------------ | ------ | ------ |
| 데이터베이스 | 김교수 | A101   |
| 운영체제     | 이교수 | B202   |

### 쿼리 튜닝

SQL 쿼리는 데이터베이스에서 데이터를 추출하거나 조작하는 데 사용됩니다. 그러나 대용량 데이터나 복잡한 쿼리의 경우 성능이 저하될 수 있습니다. 이러한 문제를 해결하기 위해 SQL 쿼리를 튜닝할 필요가 있습니다.

#### 1. 인덱스 최적화

인덱스는 대용량 데이터베이스에서 데이터 검색 속도를 향상시키는 핵심 기술입니다.

**인덱스 생성 전략:**

- **선택도가 높은 컬럼**: 고유한 값이 많은 컬럼에 인덱스 생성
- **자주 사용되는 WHERE 절**: 쿼리에서 자주 사용되는 조건 컬럼
- **JOIN 조건**: 테이블 연결에 사용되는 컬럼
- **정렬 기준**: ORDER BY에 자주 사용되는 컬럼

**인덱스 성능 최적화:**

```sql
-- 복합 인덱스 생성 시 컬럼 순서가 중요
-- 자주 사용되는 조건을 앞에 배치
CREATE INDEX idx_user_email_name ON users(email, name);

-- 쿼리 최적화 예시
-- 정규화 전 (느린 쿼리)
SELECT * FROM orders WHERE order_date > '2021-01-01' ORDER BY order_id;

-- 정규화 후 (빠른 쿼리)
-- order_date와 order_id에 인덱스가 있는 경우
SELECT * FROM orders WHERE order_date > '2021-01-01' ORDER BY order_id;
```

#### 2. 적절한 JOIN 사용

JOIN은 두 개 이상의 테이블에서 데이터를 결합하는 데 사용되지만, 데이터베이스 성능에 부정적인 영향을 미칠 수 있습니다.

**JOIN 최적화 방법:**

- 불필요한 JOIN 제거
- 적절한 JOIN 순서 선택
- 작은 테이블을 먼저 JOIN

**예시:**

```sql
-- 비효율적인 JOIN (불필요한 customers 테이블 조인)
SELECT orders.*
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
WHERE orders.order_date > '2021-01-01';

-- 효율적인 쿼리 (JOIN 제거)
SELECT *
FROM orders
WHERE order_date > '2021-01-01';

-- 필요한 경우에만 JOIN 사용
SELECT orders.*, customers.name
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
WHERE orders.order_date > '2021-01-01';
```

#### 3. 서브쿼리 최소화

서브쿼리는 복잡한 쿼리를 작성할 때 유용하지만, 성능 저하의 원인이 될 수 있습니다.

**서브쿼리 대안:**

- JOIN 사용
- EXISTS 사용
- UNION 사용

**예시:**

```sql
-- 비효율적인 서브쿼리
SELECT *
FROM orders
WHERE customer_id IN (
    SELECT customer_id
    FROM customers
    WHERE gender = 'F'
);

-- 효율적인 JOIN 사용
SELECT orders.*
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
WHERE customers.gender = 'F';

-- EXISTS 사용 (더 효율적)
SELECT *
FROM orders o
WHERE EXISTS (
    SELECT 1
    FROM customers c
    WHERE c.customer_id = o.customer_id
    AND c.gender = 'F'
);
```

#### 4. 쿼리 실행 계획 분석

쿼리 실행 계획을 확인하여 성능 저하 원인을 파악하고 최적화할 수 있습니다.

**EXPLAIN 사용법:**

```sql
-- MySQL에서 실행 계획 확인
EXPLAIN SELECT *
FROM orders
WHERE order_date > '2021-01-01'
ORDER BY order_id;

-- 실행 계획 결과 해석
-- type: ALL (Full Table Scan) - 비효율적
-- type: ref, range, index - 효율적
-- key: 사용된 인덱스
-- rows: 검색된 행 수
```

#### 5. WHERE 절 최적화

WHERE 절을 최적화하여 필요한 데이터만 검색하도록 합니다.

**최적화 방법:**

- 인덱스가 있는 컬럼을 WHERE 절에 사용
- 함수 사용 최소화
- LIKE 패턴 최적화

**예시:**

```sql
-- 비효율적인 WHERE 절
SELECT * FROM users WHERE UPPER(name) = 'KIM';
SELECT * FROM users WHERE name LIKE '%김%';

-- 효율적인 WHERE 절
SELECT * FROM users WHERE name = '김철수';
SELECT * FROM users WHERE name LIKE '김%';  -- 인덱스 활용 가능
```

#### 6. LIMIT과 OFFSET 최적화

대용량 데이터에서 페이징 처리 시 성능을 최적화합니다.

**예시:**

```sql
-- 비효율적인 OFFSET 사용 (대용량 데이터에서 느림)
SELECT * FROM orders ORDER BY id LIMIT 10 OFFSET 10000;

-- 효율적인 커서 기반 페이징
SELECT * FROM orders WHERE id > 10000 ORDER BY id LIMIT 10;
```

#### 7. GROUP BY와 ORDER BY 최적화

집계 함수와 정렬을 최적화합니다.

**예시:**

```sql
-- 비효율적인 GROUP BY
SELECT category, COUNT(*)
FROM products
GROUP BY category
ORDER BY COUNT(*) DESC;

-- 효율적인 GROUP BY (인덱스 활용)
SELECT category, COUNT(*)
FROM products
WHERE category IS NOT NULL
GROUP BY category
ORDER BY category;  -- 인덱스가 있는 컬럼으로 정렬
```

#### 8. 쿼리 캐싱 활용

자주 실행되는 쿼리의 결과를 캐시하여 성능을 향상시킵니다.

**예시:**

```sql
-- 자주 사용되는 통계 쿼리
SELECT COUNT(*) as total_users FROM users WHERE created_at >= '2024-01-01';

-- 캐시된 결과 활용 (애플리케이션 레벨에서)
-- Redis나 Memcached 사용
```

#### 9. 데이터 타입 최적화

적절한 데이터 타입을 사용하여 저장 공간과 성능을 최적화합니다.

**예시:**

```sql
-- 비효율적인 데이터 타입
CREATE TABLE users (
    id VARCHAR(255),  -- INT가 더 효율적
    age VARCHAR(10),  -- TINYINT가 더 효율적
    created_at DATETIME  -- TIMESTAMP가 더 효율적
);

-- 효율적인 데이터 타입
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    age TINYINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. 쿼리 튜닝 체크리스트

| 항목         | 확인사항                           | 예시                                    |
| ------------ | ---------------------------------- | --------------------------------------- |
| **인덱스**   | WHERE 절 컬럼에 인덱스가 있는가?   | `CREATE INDEX idx_name ON users(name);` |
| **JOIN**     | 불필요한 JOIN이 있는가?            | 필요한 테이블만 JOIN                    |
| **서브쿼리** | JOIN으로 대체할 수 있는가?         | `EXISTS` 또는 `JOIN` 사용               |
| **SELECT**   | 필요한 컬럼만 조회하는가?          | `SELECT id, name` vs `SELECT *`         |
| **WHERE**    | 인덱스를 활용하는 조건인가?        | `name = '값'` vs `UPPER(name) = '값'`   |
| **ORDER BY** | 인덱스가 있는 컬럼으로 정렬하는가? | 인덱스 컬럼 우선 사용                   |
| **LIMIT**    | 적절한 페이징을 사용하는가?        | 커서 기반 페이징 고려                   |

---

이 문서가 DB 사용에 큰 도움이 되기를 바랍니다. 추가로 궁금한 점이 있다면 언제든지 질문해 주세요. 예를 들어, "데이터베이스 정규화에 대해 더 자세히 알려줘"와 같이 구체적으로 물어보시면 더 깊이 있는 답변을 드릴 수 있습니다.
