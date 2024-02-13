from db import conn

def init_db():
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(50), 
            password VARCHAR(50) NOT NULL,
            role VARCHAR(16) NOT NULL,
            PRIMARY KEY (username)
        );

        CREATE TABLE IF NOT EXISTS files (
            name VARCHAR(50),
            branch VARCHAR(16) NOT NULL,
            body VARCHAR(100) NOT NULL,
            author VARCHAR(50),
            PRIMARY KEY (name),
            FOREIGN KEY (author) REFERENCES users(username)
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL,
            title VARCHAR(50) NOT NULL,
            time timestamp NOT NULL,
            filename VARCHAR(50),
            PRIMARY KEY (id),
            FOREIGN KEY (filename) REFERENCES files(name)
        );
        """
    )

    conn.commit()

    print("Succecfully initialized tables!")

if __name__ == "__main__":
    init_db()