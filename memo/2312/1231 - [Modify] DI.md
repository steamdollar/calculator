현재 백엔드 구성을 살펴보면

각 모듈에 모듈, 컨트롤러, 서비스가 있는데, 여기에 더해 utils 파일이 있고,

여기서 함수를 직접 가져와서 사용한다.

그런데 이건 nestJS의 핵심원칙인 DI를 위반하는 행동이다.

이럴 경우 나중에 문제가 생길 수 있다는 피드백을 받게되었다.

따라서 이를 수정해보도록 하자.

Injectable class를 하나 만들고,

여기에 utils 등의 다른 파일들에 있는 함수들이나 속성들을 옮겨주면 될 것이다.

커스텀 타입이나 인터페이스는 .type.ts 파일에 모으고, import해주면 될 듯

1. 모듈에 .provider.ts 파일을 하나 만들고, @Injectable한 class를 하나 만든다.

2. 기존 .utils.ts 파일의 함수를 .provider.ts의 주입 가능한 class에 옮긴다.

3. 각 함수들이 서로를 호출 할 경우 this를 붙여 호출해주면 된다.

4. 이 provider가 사용될 .module.ts 파일에서 @Module의 provider 목록에 생성된 provider class를 추가한다.

5. 이 provider class를 사용할 service (or controller?)의 생성자 함수의 인수에 provider를 추가해준다.
