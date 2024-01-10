export function parseJwt(token) {
        try {
                const base64 = token
                        .split(".")[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/");
                const jsonPayload = decodeURIComponent(
                        atob(base64)
                                .split("")
                                .map((c) => {
                                        return (
                                                "%" +
                                                (
                                                        "00" +
                                                        c
                                                                .charCodeAt(0)
                                                                .toString(16)
                                                ).slice(-2)
                                        );
                                })
                                .join("")
                );

                return JSON.parse(jsonPayload);
        } catch (e) {
                return null;
        }
}
