// MainContainer.js
import React from "react";

const MainContainer = ({ children }) => {
        return (
                <div
                        className="main-container"
                        style={{
                                width: "70%",
                                margin: "0 auto",
                                maxWidth: "1200px",
                        }}
                >
                        {children}
                </div>
        );
};

export default MainContainer;
