# 1. ConfigModule, ConfigService

잊을만하면 여기서 에러가 나서, 이걸 좀 정확히 알고 가야겠다.

## 1. ConfigModule

ConfigModule은 nestjs에서 configuration value와 environment var 들을 관리하기 위해 제공해주는 기능이다.

환경변수를 .env에서 쉽게 가져올 수 있게 해주고, type-safe하고 일정한 방식으로 load할 수 있게 해줌.

ConfigModule을 사용하려면 일단 AppModule, 혹은 환경 변수에 접근해야 하는 다른 모듈에 import해줘야 한다.

```ts
import { ConfigModule } from "@nestjs/config";

@Module({
        imports: [
                ConfigModule.forRoot(),
                // ...
        ],
})
export class AppModule {}
```

## 2. ConfigService

ConfigService는 ConfigModule에서 제공하는 서비스로, 환경 변수와 설정 변수에 접근할 수 있게 해준다.

다른 모듈에 ConfigModule을 import하면, ConfigService는 자동으로 provider로 등록되고

다른 서비스, 컨트롤러, provider에 주입될 수 있게 된다.

```ts
@Injectable()
export class MyService {
        constructor(private configService: ConfigService) {}

        someMethod() {
                // get method를 통해 환경 변수에 접근할 수 있음
                const apikey = this.configService.get("API_KEY");
        }
}
```

## 3. Injecting custom config

useFactory 함수를 이용해 커스텀 config를 추가할 수 있다.

inject property를 사용해 어떤 dependencies가 factory 함수에 주입되어야 하는지 특정한다.

### 3.1. custom configuration provider를 정의한다.

이 provider는 내가 다른 곳에 주입할 configuration obj를 생성해준다.

이 obj에서는
{
provide : provider 이름,
useFactory : configuration obj를 생성하는 factory 함수,
inject : factory 함수가 필요한 dependencies 배열
}

이 들어간다.

e.g.

```ts
        {
                provide : "ex_env_var",
                inject : [ConfigService] // inject 배열의 요소들을 factory 함수에 매개변수처럼 넣어주겠다는 의미
                useFactory : (configService : ConfigService) => {
                        return {
                                myValue : configService.get("my_env_var")
                        }
                },
        }
```

여기서 팩토리 함수는 ConfigService 인스턴스를 파라미터로 받는다.

팩토리 함수 내부에서 ConfigsService를 이용해 환경 변수나 다른 config 변수에 접근할 수 있고,

그 후 configuration obj를 생성해 리턴한다.

### 3.2. Register custom configuration provider

이제 커스텀 congi provider를 module에 추가한다.

일반적으로 ConfigModule을 사용하는 동일한 모듈에서 실행되겠지만,

필요하다면 다른 모듈에서도 등록할 수 있음

```ts
        @Module({
                // config system을 관리하는 ConfigModule을 import 해야한다.
                // Appmodule에 전역으로 import 했다면 없어도 됨
                imports : [ConfigModule.forRoot()],

                providers : [
                        providers : [
                                {
                                        provide : ...,
                                        useFactory : () => {},
                                        inject : [ConfigService]
                                }
                        ]
                ]
        })

        export class MyModule{}
```

cf) forRoot() 는 ConfigService의 singleton 인스턴스를 생성하는 것을 의미한다.

이 하나의 인스턴스가 의존성 주입으로 프로그램 전 범위에 걸쳐 사용될 수 있음.

### 3.3 inject custom config value

만들어진 custom config를 service, controller, provider에 @Inject해 사용한다.

```ts
@Injectable()
export class MyService {
        constructor(@Inject("custom_config") private customConfig: any) {}

        someMethod() {
                console.log(this.customConfig.value);
        }
}
```

# 2. 생성된 인스턴스를 다른 모듈에서 사용
