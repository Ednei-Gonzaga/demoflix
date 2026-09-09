CREATE TABLE usuarios(
    id BIGSERIAL PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(16) NOT NULL
);

CREATE TABLE favoritos(
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    imagem VARCHAR(300),
    trailer VARCHAR(300),
    id_tmdb BIGINT NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE codigos_verificacao(
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(6) NOT NULL,
    criado_as TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    expirado_as TIMESTAMP,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)  ON DELETE CASCADE
)
