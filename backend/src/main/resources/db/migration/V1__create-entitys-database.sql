CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(16) NOT NULL
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    imagem VARCHAR(300),
    trailer VARCHAR(300),
    id_tmdb BIGINT NOT NULL,

    usuario_id INT NOT NULL,
        CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
            REFERENCES usuarios (id)
            ON DELETE CASCADE
);
