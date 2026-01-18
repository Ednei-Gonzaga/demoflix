const dadoSalvo = localStorage.getItem("usuarioLogado");
export const token = JSON.parse(dadoSalvo);

export function getUsuario(token) {
    if (!token) {
        return null;
    }

    try {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));

        return tokenPayload;
    } catch (error) {
        console.error("Erro ao decodificar token: ", error);
        return null;
    }

}

export function tokenExpirado(token) {
    if (token == null) {
        return true;
    }

    try {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;

    } catch (error) {
         return true;
    }
}
