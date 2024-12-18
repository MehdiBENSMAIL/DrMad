import LocalSource from "@/datasource/controller";

export const checkAndFinalizeOrder = (orderId, currentUserId) => {
    const order = LocalSource.orders.find(order => order.id === orderId && order.userId === currentUserId);
    if (order && order.status === 'attente') {
        order.status = 'finalized';
        return { success: true };
    }
    return { success: false };
};

export default {
    checkAndFinalizeOrder
}
