// Fonction utilitaire pour générer des réponses uniformes
function normalResponse(data = undefined, status = 200) {
    return baseResponse(0, status, data);
}

function errorResponse(data, status = 404) {
    return baseResponse(1, status, data);
}

function baseResponse(error, status, data) {
    return {error, status, data};
}

export {errorResponse, normalResponse};
