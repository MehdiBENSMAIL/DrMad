import LocalSource from "@/datasource/controller";
import {errorResponse} from "@/services/index";

// Fonctions secondaires

async function bankLoginFromLocalSource(data) {
    return LocalSource.bankLogin(data)
}

async function getAccountAmountFromLocalSource(number) {
    return LocalSource.getAccountAmount(number)
}

async function getAccountTransactionsFromLocalSource(number) {
    return LocalSource.getAccountTransactions(number)
}

async function getAccountFromLocalSource(number) {
    return LocalSource.getAccount(number);
}

async function getTransactionsFromLocalSource(number) {
    return LocalSource.getTransactions(number);
}

async function createWithdrawFromLocalSource(number) {
    return LocalSource.createWithdraw(number);
}

async function createPaymentFromLocalSource(number) {
    return LocalSource.createPayment(number);
}

// Fonctions principales

async function getAccountAmount(number) {
    let response;
    try {
        response = await getAccountAmountFromLocalSource(number)
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de se loguer')
    }
    return response
}

async function getAccountTransactions(number) {
    let response;
    try {
        response = await getAccountTransactionsFromLocalSource(number)
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de se loguer')
    }
    return response
}

async function getAccount(number) {
    let response
    try {
        response = await getAccountFromLocalSource(number);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de récupérer le compte.');
    }
    return response;
}

async function getTransactions(number) {
    let response
    try {
        response = await getTransactionsFromLocalSource(number);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de récupérer les transactions.');
    }
    return response;
}

async function createWithdraw(number) {
    let response
    try {
        response = await createWithdrawFromLocalSource(number);
    } catch (err) {
        response = errorResponse('erreur réseau, impossible de créer une transaction.');
    }
    return response;
}

async function createPayment(number) {
    let response
    try {
        response = await createPaymentFromLocalSource(number);
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
