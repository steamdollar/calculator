const testError = () => {
        try {
                throw "asdasdad";
        } catch (e) {
                console.log(e);
        }
};

testError();
