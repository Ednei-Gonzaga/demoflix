const url = "https://demoflix-api.onrender.com/";




export async function login(email, senha) {
    let request;
    let response;
    try {
        request = await fetch(`${url}usuario/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        response = await request.json();
        return response;
    } catch {
        return "Houve um erro com servidor!";
    }

}

export async function criarConta(nome, email, senha) {
    let request;
    let response;
    try {
        request = await fetch(`${url}usuario/cadastro`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        })

        response = await request.json();
     
        return response;
    } catch {
        return "Houve um erro com servidor!";
    }

}

export async function deletar(id) {
    let request;
    try {
        request = await fetch(`${url}usuario/delete`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                id: id
            })
        })
    } catch {
        return "Houve um erro com servidor!";
    }
}

export async function favoritos(id) {
    let request;
    let response;
    try {
        request = await fetch(`${url}favorito/${id}`);
        response = await request.json();
    
        return response;
    } catch {
        return "Houve um erro com servidor!";
    }
}

export async function adicionarFavoritos(titulo, tipo, imagem, trailer, idTmdb, usuario) {
    let request;
    let response;
    try {
        request = await fetch(`${url}favorito/save`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                titulo: titulo,
                tipo: tipo,
                imagem: imagem,
                trailer: trailer,
                idTmdb: idTmdb,
                usuario: usuario
            })
        })
        response = await request.json();
        return response;
    } catch {
        return "Houve um erro com servidor!";
    }
}

export async function deletarFavoritos(tipo, idTmdb, usuario) {
    let request;
    let response;
    try {
        request = await fetch(`${url}favorito/delete`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                tipo: tipo,
                idTmdb: idTmdb,
                idUsuario: usuario
            })
        })
        response = await request.json();
        return response;
    } catch {
        return "Houve um erro com servidor!";
    }
}

