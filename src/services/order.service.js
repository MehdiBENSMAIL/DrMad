import LocalSource from "@/datasource/controller";
import {errorResponse} from "@/services/index";

// export const checkAndFinalizeOrder = (orderId, currentUserId) => {
//     const order = LocalSource.orders.find(order => order.id === orderId && order.userId === currentUserId);
//     if (order && order.status === 'attente') {
//         order.status = 'finalized';
//         return { success: true };
//     }
//     return { success: false };
// };

async function checkOrderExistFromLocalSource(data) {
    return LocalSource.checkOrderExist(data)
}

async function finaliseOrderFromLocalSource(data) {
    return LocalSource.finaliseOrder(data)
}

async function checkOrderExist(data) {
    let response;
    try {
        response = await checkOrderExistFromLocalSource(data)
    } catch(err) {
        response = errorResponse('erreur réseau, impossible de récupérer la commande')
    }
    return response
}

async function finaliseOrder(data) {
    let response;
    try {
        response = await finaliseOrderFromLocalSource(data);
    } catch(err) {
        response = errorResponse('erreur réseau, de finaliser la commande')
    }
    return response
}


export default {
    // checkAndFinalizeOrder
    checkOrderExist,
    finaliseOrder
}
