// const testError = () => {
//         try {
//                 throw "asdasdad";
//         } catch (e) {
//                 console.log(e);
//         }
// };

// testError();

class ErrorMessage extends Error {
        constructor(message: string, public additionalInfo: string) {
                super(message);
        }
}

const funcB = () => {
        try {
                console.log("bbbb");
                // throw new Error();
        } catch (e) {
                throw e;
        }
};

const funcC = () => {
        try {
                console.log("cccc");
                throw new ErrorMessage("error at funcC", "funcC error message");
        } catch (e) {
                throw e;
        }
};

const funcA = () => {
        try {
                console.log("aaaa");
                funcB();
                const awe = funcC();
        } catch (e) {
                console.log("eeeee");

                if (e instanceof ErrorMessage) {
                        console.error(e.additionalInfo);
                }
        }
};

funcA();
