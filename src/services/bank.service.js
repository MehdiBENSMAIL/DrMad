import LocalSource from "@/datasource/controller";
import {errorResponse} from "@/services/index";

// Fonctions secondaires

async function bankLoginFromLocalSource(data) {
    return LocalSource.bankLogin(data)
}

async function getAccountAmountFromLocalSource(data) {
    return LocalSource.getAccountAmount(data)
}

async function getAccountTransactionsFromLocalSource(data) {
    return LocalSource.getAccountTransactions(data)
}

async function getAccountFromLocalSource(data) {
    return LocalSource.getAccount(data);
}

async function getTransactionsFromLocalSource(data) {
    return LocalSource.getTransactions(data);
}

async function createWithdrawFromLocalSource(data) {
    return LocalSource.createWithdraw(data);
}

async function createPaymentFromLocalSource(data) {
    return LocalSource.createPayment(data);
}

// Fonctions principales

async function getAccountAmount(data) {
    let response;
    try {
        response = await getAccountAmountFromLocalSource(data)
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de se loguer')
    }
    return response
}

async function getAccountTransactions(data) {
    let response;
    try {
        response = await getAccountTransactionsFromLocalSource(data)
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de se loguer')
    }
    return response
}

async function getAccount(data) {
    let response
    try {
        response = await getAccountFromLocalSource(data);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de récupérer le compte.');
    }
    return response;
}

async function getTransactions(data) {
    let response
    try {
        response = await getTransactionsFromLocalSource(data);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de récupérer les transactions.');
    }
    return response;
}

async function createWithdraw(data) {
    let response
    try {
        response = await createWithdrawFromLocalSource(data);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de créer une transaction.');
    }
    return response;
}

async function createPayment(data) {
    let response
    try {
        response = await createPaymentFromLocalSource(data);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible d\'effectuer un payement.');
    }
    return response;
}

async function bankLogin(account) {
    let response
    try {
        response = await bankLoginFromLocalSource(account);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de se connecter à la banque.');
    }
    return response;
}

export default {
    getAccountAmount,
    getAccountTransactions,
    getAccount,
    getTransactions,
    createWithdraw,
    createPayment,
    bankLogin
}
