# frontend_architecture
프론트엔드 애플리케이션의 설계 기반 다지기

## 작업 환경 관련 오류
- vue3 : vue/no-multiple-template-root 오류 발생시 extension을 vetur을 비활성하고 volar를 활성화 해주자

## Layer 설계 시각화

![스크린샷 2024-01-24 오후 11 01 58](https://github.com/deokyeong93/frontend_architecture/assets/66895208/b101216e-3d0f-4aa5-8f18-5d08ad42f50b)

### NoN Front Frame Layer
- core : Infra, API, Domain이 구현되어 있는 레포
  - lib: Infra 관련 로직 구현
  - service
    - apis: API
    - controller: Domain
  - style: 자바스크립트가 아니라 레이어 설계에서는 생략

### Front Frame Layer
- react-app
- vue3-app
- vue2-app
    
