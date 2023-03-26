CREATE TABLE wallet (
    addr VARCHAR(256) PRIMARY KEY,
    belong VARCHAR(20) NOT NULL,
    purpose VARCHAR(32) NOT NULL
);

CREATE TABLE trading (
    idx INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    wallet VARCHAR(256) NOT NULL,
    tolerance INT NOT NULL,
    entry INT NOT NULL,
    sl INT NOT NULL,
    tp INT NOT NULL,
    ticker VARCHAR(32) NOT NULL,
    result BOOLEAN,
    memo TEXT,
    FOREIGN KEY (wallet) REFERENCES wallet(addr)
);

CREATE TABLE balance (
    addr VARCHAR(256) NOT NULL,
    coin VARCHAR(255) NOT NULL,
    balance FLOAT NOT NULL,
    FOREIGN KEY (addr) REFERENCES wallet(addr)
);

CREATE TABLE coin (
    name VARCHAR(32),
    listed_market VARCHAR(32)
);

CREATE TABLE project_wallet (
    wallet VARCHAR(256) NOT NULL,
    project VARCHAR(256) NOT NULL,
    PRIMARY KEY (wallet, project)
);

CREATE TABLE project (
    name VARCHAR(255) PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL
);
