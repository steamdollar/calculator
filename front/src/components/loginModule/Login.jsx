export const Login = () => {
        return (
                <>
                        <a
                                href={`${process.env.REACT_APP_BACKEND_SERVER}/login/OauthLogin?s=kakao`}
                        >
                                카카오 로그인
                        </a>
                        <a
                                href={`${process.env.REACT_APP_BACKEND_SERVER}/login/OauthLogin?s=google`}
                        >
                                구글 로그인
                        </a>
                </>
        );
};
