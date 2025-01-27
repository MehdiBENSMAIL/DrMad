import { bankaccounts, items, shopusers, transactions } from "@/datasource/data";
import { v4 as uuidv4 } from "uuid";
import { compareSync } from "bcryptjs";

import { errorResponse, normalResponse } from "@/services";

function shopLogin(data) {
    // Vérifier si le login et le mot de passe sont fournis
    if (!data.login || !data.password) return errorResponse('Aucun login ou mot de passe fourni')

    // Trouver l'utilisateur par login
    let user = shopusers.find((e) => e.login === data.login);
    if (!user) return errorResponse('Login ou mot de passe incorrect')

    // Vérifier le mot de passe
    if (!compareSync(data.password, user.password)) return errorResponse('Login ou mot de passe incorrect')

    // Générer un uuid de session pour l'utilisateur si non existant
    if (!user.session) user.session = uuidv4();

    // Retourner uniquement les champs nécessaires
    return normalResponse({
        user: {
            _id: user._id,
            name: user.name,
            login: user.login,
            email: user.email,
            session: user.session,
        }
    })
}

function getAllViruses() {
    return normalResponse({ items })
}

function getAccountAmount(number) {
    if (!number) return errorResponse('Aucun numéro de compte bancaire fourni')
    let account = bankaccounts.find((a) => a.number === number);
    if (!account) return errorResponse('Numéro de compte bancaire incorrect')

    return normalResponse({ amount: account.amount })
}

function getAccountTransactions(number) {
    if (!number) return errorResponse('Aucun numéro de compte bancaire fourni')
    let account = bankaccounts.find((a) => a.number === number);
    if (!account) return errorResponse('Numéro de compte bancaire incorrect')

    return normalResponse({ transactions: transactions.filter((t) => t.account === account._id) ?? '' });
}

function setUserBasket(data) {
    let user = shopusers.find(e => e._id === data.userId);
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    if ((!Array.isArray(data.basket.items))) return errorResponse('Le format du panier n\'est pas respecté')

    user.basket = data.basket;
    return normalResponse();
}

function getUserBasket(data) {
    const user = shopusers.find(e => e._id === data.userId);
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    return normalResponse({ basket: user.basket ?? { items: [] } });
}

function addOrder(data) {
    const user = shopusers.find(e => e._id === data.userId);
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    if (!Array.isArray(data.items) || data.items.length === 0)
        return errorResponse('Il n\'y a pas d\'items')

    const items = [];
    let totalPrice = 0;
    for (const itemData of data.items) {
        let item = {
            name: itemData.item.name,
            description: itemData.item.description,
            price: itemData.item.price,
            promotion: itemData.item.promotion,
            object: itemData.item.object,
        }
        items.push({ item, amount: itemData.amount });

        let bestPromo = 0;
        itemData.item.promotion.forEach(promotion => {
            if (promotion.amount <= itemData.amount) {
                if (bestPromo < promotion.discount) {
                    bestPromo = promotion.discount;
                }
            }
        })

        const normalPrice = itemData.amount * itemData.item.price;
        totalPrice += normalPrice / (1 + (bestPromo / 100));
    }

    const uuid = uuidv4();
    let orderData = {
        items,
        date: { "$date": new Date().toISOString() },
        total: totalPrice,
        status: 'waiting_payment',
        _id: uuid,
    }

    if (!user.orders) user.orders = [];
    user.orders.push(orderData);

    return normalResponse({ uuid })
}

function checkOrderExist(data) {
    const user = shopusers.find(e => e._id === data.userId)
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    const order = user.orders?.find(e => e._id === data.orderId)
    let exist = false;
    let finalise, detail;

    if (order) {
        exist = true;
        finalise = order.status === 'finalized';
        detail = {date: order.date, total: order.total};
    }

    return normalResponse({ exist, finalise, detail })
}

function getAllOrders(data) {
    let user = shopusers.find(e => e._id === data.userId)
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')
    return normalResponse({ orders: user.orders ?? [] })
}

function finaliseOrder(data) {
    let user = shopusers.find(e => e._id === data.userId)
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    let order = user.orders?.find(e => e._id === data.orderId) ?? false
    if (!order) return errorResponse('La commande n\'existe pas')

    if (order.status !== 'waiting_payment')
        return errorResponse('La commande n\'est pas en attente de payement')

    let transaction = transactions.find(e => e._id === data.transactionId)
    if(!transaction) return errorResponse('La transaction n\'existe pas')
    if(transaction.amount >= 0) return errorResponse('La transaction amout >= 0')
    if(-transaction.amount < order.total) return errorResponse('Le prix de la commande est trop élevé')
    if(transaction.destination !== data.userId) return errorResponse('Cette transaction n\'est pas associé à ce compte')

    order.status = 'finalized'
    return normalResponse()
}

function cancelOrder(data) {
    let user = shopusers.find(e => e._id === data.userId)
    if (!user) return errorResponse('L\'utilisateur n\'existe pas')

    let order = user.orders?.find(e => e._id === data.orderId) ?? false
    if (!order) return errorResponse('La commande n\'existe pas')

    if (order.status !== 'waiting_payment')
        return errorResponse('La commande n\'est pas en attente de payement')

    order.status = 'cancelled'
    return normalResponse()
}

// TP 5 partie 2
function getAccount(data) {
    let account = bankaccounts.find(e => e.number === data.number);
    if (!account) { return errorResponse('Numéro de compte invalide') }

    return normalResponse({ account });
}

function getTransactions(data) {
    let transactions = transactions.filter(e => e._id === data);
    if (!transactions) { return errorResponse('Aucune transaction pour ce compte') }

    return normalResponse({ transactions });
}

function createWithdraw(data) {
    let account = bankaccounts.find(e => e._id === data.idAccount);
    if (!account) { return errorResponse('id de compte invalide') }

    if (data.amount <= 0 || data.amount > account.amount) {
        return errorResponse('Montant invalide/solde insuffisant.')
    }

    let transaction = {
        "_id": uuidv4(),
        "amount": -data.amount,
        "account": account._id,
        "date": { "$date": new Date().toISOString() },
        "uuid": uuidv4()
    }

    account.amount -= data.amount;
    transactions.push(transaction);

    return normalResponse({ uuid: transaction.uuid, amount: account.amount })
}

function createPayment(data) {
    let senderAccount = bankaccounts.find(e => e._id === data.idAccount)
    let receiverAccount = bankaccounts.find(e => e.number === data.destNumber)

    if (!senderAccount || !receiverAccount) { return errorResponse('id/numéro de compte invalide') }

    if (data.amount <= 0 || data.amount > senderAccount.amount) {
        return errorResponse('Montant invalide/solde insuffisant.')
    }

    let senderTransaction = {
        "_id": uuidv4(),
        "amount": -data.amount,
        "destination": receiverAccount._id,
        "account": senderAccount._id,
        "date": { "$date": new Date().toISOString() },
        "uuid": uuidv4()
    }

    let receiverTransaction = {
        "_id": uuidv4(),
        "amount": data.amount,
        "account": receiverAccount._id,
        "date": senderTransaction.date,
        "uuid": uuidv4()
    }

    senderAccount.amount -= data.amount;
    receiverAccount.amount += data.amount;
    transactions.push([senderTransaction, receiverTransaction]);

    return normalResponse({ uuid: receiverTransaction.uuid, amount: receiverAccount.amount })
}

export default {
    shopLogin,
    getAllViruses,
    getAccountAmount,
    getAccountTransactions,
    setUserBasket,
    getUserBasket,
    addOrder,
    checkOrderExist,
    finaliseOrder,
    getAllOrders,
    cancelOrder,
    getAccount,
    getTransactions,
    createWithdraw,
    createPayment
}