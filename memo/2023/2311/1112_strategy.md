중간에 인터페이스를 하나 껴서 구글, 카카오 oauth 로그인 class에 있는 메서드들을 포함하도록 했음.

이런식으로 특정 작업에 여러 알고리즘을 가지고 있고, 런타임에서 적절한 것을 선택해 사용해야할 때 사용한다.

1. 공통 인터페이스를 정의

정석적인 순서는 인터페이스를 먼저 만들고 그 다음 메서드를 만드는 거지만 아무튼..

인터페이스는 다음과 같이 정의 되었다.

```ts
export interface IOAuthProvider {
        redirectToProvider(clientId: string, redirectUrl: string): string;
        getToken(code: string, reqTokenDTO: reqTokenDTO);
        getUserInfo(token: any): Promise<userInfoDTO> | null;
}
```

이 인터페이스는 각 OAuth provider (googleOAuth, KakaoOAuth, ...) 가 동일한 구조를 가져

어플리케이션의 다른 부분에 영향을 주지않고 교체할 수 있도록 해준다.

각각의 provide class는 구체적인 구현 디테일은 캡슐화해서 가지고 있다.

이 인터페이스를 구현하는 class들은 다음과 같이 수정됨

```ts
        class GoogleOAuth extends OAuthService implements IOAuthProvider {...}
```

extends랑 implements 동시에 사용도 가능하구나..

2. loginService에 제3자(party : google, kakao, ...) 등과 인터페이스를 매핑하는 Map을 추가한다.

```ts
class LoginService {
        private providers: Map<string, IOAuthprovider>;

        // ...
}
```

provider로 사용할 수 있는건 카카오, 구글로그인 객체가 있고,

IOAuthprovider의 method를 전부 구현하고 있으므로

IOAuthprovider의 자리에 올 수 있음. 이거 덕타이핑인가?

찾아보니 ts 언어 체계는 그거랑 좀 달라서 비슷하지만 덕타이핑은 아닌듯..

아무튼 저 두 번째 인수 자리에 인스턴스를 넣으면 ts는 인터페이스 메서드가 다 구현되어 있는지를 체크하고,

호환 가능하다면 문제 없이 넘어간다.

//

이렇게 오래 이걸 붙잡고 있게 될 줄 몰랐는데 아무튼 이제 정말 더 건들 필요 없을 것 같다.

공부도 많이 되고 디자인 패턴을 실제로 적용해보면서 이해도도 확실히 높아졌고,

그간 다룰 기회가 없던 class의 extend, interface의 implement 키워드와 기능들을 사용해볼 수 있어서

시간을 들은 가치도 있는 것 같고, 나름 만족스러움.

오늘은 커밋할 수 있겠다..

//

1. 이제 다음에는 정말 쿠키를 전역 상태로 주고 이를 랜더링, 상태에 반영하는 작업을 하고,

2. db 스키마도 사용자의 정보를 고려해 다시 디자인하자.
