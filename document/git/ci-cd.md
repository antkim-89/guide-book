## Jenkins CI/CD 윈도우 환경 가이드 🚀

안녕하세요\! Windows 환경에서 Jenkins를 사용하여 CI/CD 파이프라인을 구축하는 방법을 단계별로 안내해 드리겠습니다. 설치부터 간단한 파이프라인 실행까지의 과정을 다룹니다.

---

### 1\. Jenkins 설치하기 🛠️

Jenkins를 설치하기 전, 시스템에 **Java(JDK)** 가 먼저 설치되어 있어야 합니다. Jenkins는 Java 11 또는 17 버전을 권장합니다.

#### 가. 사전 준비: Java JDK 17 설치

1.  [Oracle Java 17 다운로드 페이지](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) 또는 다른 OpenJDK 배포판 사이트로 이동합니다.

2.  `Windows x64 Installer`를 다운로드하여 설치합니다.

3.  설치 후, 환경 변수를 설정합니다.

    - **JAVA_HOME**: JDK가 설치된 경로 (예: `C:\Program Files\Java\jdk-17`)
    - **Path**: `%JAVA_HOME%\bin` 추가

    CMD(명령 프롬프트)에서 아래 명령어로 설치를 확인합니다.

    ```bash
    java -version
    ```

#### 나. Jenkins 설치

1.  \*\*[Jenkins 다운로드 페이지](https://www.jenkins.io/download/)\*\*로 이동합니다.
2.  **Long-Term Support (LTS)** 버전의 **Windows** 설치 파일(`jenkins.msi`)을 다운로드합니다.
3.  다운로드한 `.msi` 파일을 실행하고, 설치 마법사의 안내를 따릅니다.
    - **Logon Type**: `Run service as LocalSystem`을 선택하는 것이 가장 간단합니다.
    - **Port**: Jenkins가 사용할 포트를 지정합니다. 기본값은 **8080**입니다. 다른 프로그램이 8080 포트를 사용 중이라면 다른 포트(예: 9090)로 변경하세요.
    - **Java Home**: 설치된 JDK 17 경로를 올바르게 지정해줍니다.
4.  설치가 완료되면 Jenkins가 Windows 서비스로 자동 등록되어 실행됩니다.

---

### 2\. Jenkins 구동 및 초기 설정 ⚙️

#### 가. Jenkins 접속

1.  웹 브라우저를 열고 주소창에 `http://localhost:8080` (또는 설치 시 지정한 포트)을 입력합니다.
2.  **Unlock Jenkins** 화면이 나타납니다. 화면에 표시된 경로에서 `initialAdminPassword` 파일을 찾아 내용을 복사하여 붙여넣습니다.
    - 경로 예시: `C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword`
    - `ProgramData` 폴더는 숨김 폴더일 수 있습니다.

#### 나. 플러그인 설치

1.  비밀번호 입력 후, **Install suggested plugins** (추천 플러그인 설치)를 선택합니다. CI/CD에 필수적인 대부분의 플러그인이 자동으로 설치됩니다.

#### 다. 관리자 계정 생성

1.  플러그인 설치가 완료되면 첫 번째 관리자 계정 정보를 입력합니다. (사용자 이름, 비밀번호, 이름, 이메일 주소)

#### 라. 인스턴스 설정

1.  Jenkins URL을 확인하는 화면이 나옵니다. 특별한 경우가 아니라면 기본값 그대로 두고 `Save and Finish`를 클릭합니다.
2.  이제 Jenkins를 사용할 준비가 되었습니다\!

#### 마. Jenkins 서비스 관리

Jenkins는 Windows 서비스로 동작하므로, 수동으로 시작하거나 중지할 수 있습니다.

- `Win + R` 키를 눌러 `services.msc`를 실행합니다.
- 목록에서 `Jenkins`를 찾아 마우스 오른쪽 버튼으로 **시작/중지/다시 시작**할 수 있습니다.

---

### 3\. 파이프라인 설정하기 (GitHub 연동 예시) 🚀

가장 기본적인 '빌드-테스트-배포' 단계를 포함하는 파이프라인을 만들어 보겠습니다. 여기서는 GitHub에 있는 소스 코드를 가져와서 실행하는 예제를 다룹니다.

#### 가. Jenkinsfile 준비

CI/CD의 작업 순서를 코드로 정의한 파일을 **Jenkinsfile**이라고 합니다. 프로젝트의 루트 디렉토리에 이 파일을 생성하고 GitHub에 Push해야 합니다.

아래는 간단한 예시 `Jenkinsfile`입니다.

**Jenkinsfile**

```groovy
pipeline {
    agent any // 어떤 Jenkins 에이전트에서든 실행 가능

    stages {
        stage('Build') { // '빌드' 단계
            steps {
                echo 'Building the application...'
                // 실제 빌드 명령어 (예: mvn clean install)
            }
        }
        stage('Test') { // '테스트' 단계
            steps {
                echo 'Testing the application...'
                // 실제 테스트 명령어 (예: mvn test)
            }
        }
        stage('Deploy') { // '배포' 단계
            steps {
                echo 'Deploying the application...'
                // 실제 배포 스크립트 실행
            }
        }
    }
}
```

#### 나. Jenkins에서 파이프라인 프로젝트 생성

1.  Jenkins 대시보드에서 \*\*`New Item`\*\*을 클릭합니다.
2.  아이템 이름을 입력하고 \*\*`Pipeline`\*\*을 선택한 후 `OK`를 클릭합니다.

#### 다. 파이프라인 구성

1.  **`General`** 탭에서 프로젝트에 대한 설명을 간단히 작성할 수 있습니다.

2.  **`Pipeline`** 탭으로 스크롤을 내립니다.

    - **Definition**: `Pipeline script from SCM`을 선택합니다. (소스 코드 관리 시스템에서 파이프라인 스크립트를 가져오겠다는 의미)
    - **SCM**: `Git`을 선택합니다.
    - **Repository URL**: 여러분의 GitHub 프로젝트 URL을 입력합니다. (예: `https://github.com/user/my-project.git`)
    - **Credentials**: 공개 저장소(Public Repository)라면 `None`으로 두어도 됩니다. 비공개 저장소라면 `Add` 버튼을 눌러 GitHub 계정 정보를 등록해야 합니다.
    - **Branch Specifier**: `*/main` 또는 `*/master` 등 Jenkinsfile이 있는 브랜치 이름을 입력합니다.
    - **Script Path**: `Jenkinsfile` (기본값이므로 수정할 필요 없음)

3.  `Save` 버튼을 눌러 설정을 저장합니다.

#### 라. 파이프라인 실행 및 결과 확인

1.  프로젝트 페이지에서 왼쪽 메뉴의 \*\*`Build Now`\*\*를 클릭하여 파이프라인을 수동으로 실행합니다.
2.  **Build History** 아래에 빌드 번호(\#1, \#2...)가 생성됩니다.
3.  빌드가 진행되는 동안 **Stage View**에서 각 단계(Build, Test, Deploy)의 진행 상황을 실시간으로 확인할 수 있습니다.
4.  빌드 번호를 클릭하고 **`Console Output`** 메뉴로 이동하면 `echo`로 출력한 메시지를 포함한 전체 실행 로그를 볼 수 있습니다.

성공적으로 실행되면 Stage View의 모든 단계가 녹색으로 표시됩니다. 이제 GitHub에 코드를 Push할 때마다 자동으로 빌드가 실행되도록 웹훅(Webhook)을 설정하면 완벽한 CI 환경이 구축됩니다.

이 가이드가 Jenkins를 시작하는 데 도움이 되길 바랍니다\!
