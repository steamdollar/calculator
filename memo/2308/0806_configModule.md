# ConfigModule

ref : https://docs.nestjs.com/techniques/configuration

## 1. install

```bash
npm i --save @nestjs/config
```

@nestjs/config lib 자체가 내부적으로 dotenv를 사용한다.

## 2. set up

이제 ConfigModule을 import해서 사용할 수 있다.

일반적으로는 AppModule 속으로 가져와서,

`.forRoot()` static method를 사용해 모듈의 행동을 조정한다.

다음과 같이 appModule에 import한다.

```ts
        // ...

        @Module({
                imports : [ConfigModule.forRoot()]
        })

        rxport class AppModule []
```

이렇게 하면 디폴트 경로에서 .env 파일을 load, parse해

안의 데이터를 k-v 형태로 process.env에 추가히고

그 결과룰 ConfigService를 통해 접근할 수 있는 private 구조에 저장한다.

`forRoot()` method는 환경 변수를 읽을 수 있는 get() method를 제공하는 ConfigService를 등록한다.

### 2-1. 커스텀 env file path

디폴트로 가져오는건 `.env`였고, 이를 변경하려면 forRoot method에 객체 형태의 매개변수를 설정한다.

개발 모드, 프로덕션 모드에 따라 다르게 하고 싶다면 이런 식으로..

혹은 여러개를 줄 수도 있음.
(e.g. ['.env.development.local', '.env.development'])

중복되는 경우 가장 처음에 오는 k-v를 사용한다.

```ts
ConfigModule.forRoot({
  envFilePath: "development.env",
});
```

.env 파일을 무시하고 싶다면 다음 k-v를 추가한다.

```ts
ConfigModule.forRoot({
  ignoreEnvFile: true,
});
```

### 2-2. 전역 사용

ConfigModule을 다른 모듈에서 사용하고 싶다면 이를 import 해야하는데,

전역 모듈로 설정해주면 일일히 module마다 import해줄 필요가 없다.

다음과 같이 전역으로 설정해주면 루트 모듈에만 import해주면 된다.

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```

단, 이 말은 import를 일일히 명시할 필요가 없다는 말이지,

각 모듈의 provider에서 의존성을 조절하는 일은 여전히 해줘야 한다.

2-3에서 좀 더 자세히..

## 2-3. Custom config file

프로젝트가 커지면 사용자 지정 설정 파일을 활용해 중첩된 config json를 반환할 수 있다.
이를 이용해 관련 구성 설정을 기능별로 묶고, (db config 라던지) 각각의 설정을 개별 파일에 저장해 따로 관리할 수 있다.

커스텀 config 파일은 configuration 객체를 반환하는 팩토리 함수를 export한다. 이에 관해서는

`config/web3.ts`, `modules/web3Module/web3.module.ts` 을 참조.

web3.ts에서 ConfigService의 복수의 환경 변수들을 가져와

depth가 여러 단계인 객체를 리턴하는 함수를 작성하고 export 한다.

이걸 web3module에서 받아주면 훨씬 가독성이 좋아진다..

```ts
// web3.module.ts
providers: [
                Web3Provider,
                {
                        provide: "BlockchainConfig",
                        inject: [ConfigService],
                        useFactory: ethersFactory,
                },
        ],
```

ConfigService는 이미 Global로 설정되어 있는데, 그럼에도 inject의 value로 ConfigService를 다시 언급해줘야 한다.

Nest가 어떤 의존성을 팩토리 함수에 주입해야하는지 알아야 하기 때문.

다시 말해, 팩토리 함수가 ConfigService에 의존한다는 걸 nest에 명시해줘야 한다.

`사용할 수 있게 준비해두는 것`과 `사용한다고 알려주는 것`의 차이인듯..

//

동일한 방법으로 db config도 따로 정리할 수 있는데,

import하는 시점에서 동일 시점에 import되는 ConfigService와 모듈을 사용하려면

시퀄라이즈모듈에선 다음과 같이

forRootAsync method를 사용한다.

```ts
// app.module.ts
        @Module({
                imports : [
                        ConfigModule.forRoot({ isGlobal : true}),
                        SequelizeModule.forRootAsync({
                                imports : [ConfigModule],
                                inject : [ConfigService],
                                useFactory : sequelizeConfig
                        }),
                        // ...
                ],
                control
        })
```

sequelizeConfig는 다음과 같음

```ts
export const sequelizeConfig = (
  configService: ConfigService
): SequelizeModuleOptions => ({
  dialect: "mysql",
  host: configService.get("DB_HOST"),
  port: +configService.get("DB_PORT"), // +는 parseInt 대신 쓰임
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_NAME"),
  models: [Wallet, Trading, Gecko, Coin],
});
```

## 3. ConfigService

ConfigService를 통해 환경 변수에 접근하기 위해서는 COnfigService를 주입하는 것 부터 시작해야 한다.

다른 모듈이나 provider와 동일하게 우선 이를 포함하는 module인 ConfigModule을 import 한다. (전역으로 가져왔다면 이건 생략 가능)

이 후 ConfigService를 사용하고 싶은 class의 생성자 함수에 넣어주면 된다.

```ts
        constructor(private configService : ConfigService) {

                const host = this.configService.get<string>("DB_USER")
        }
```
