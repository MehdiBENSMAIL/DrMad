import { items, shopusers, bankaccounts, transactions } from './data'
import { v4 as uuidv4 } from 'uuid'
import { compareSync } from 'bcryptjs'

function shopLogin(data) {
  // Vérifier si le login et le mot de passe sont fournis
  if (!data.login || !data.password) {
    return { error: 1, status: 404, data: 'Aucun login ou mot de passe fourni' };
  }

  // Trouver l'utilisateur par login
  let user = shopusers.find(e => e.login === data.login);
  if (!user) {
    return { error: 1, status: 404, data: 'Login ou mot de passe incorrect' };
  }

  // Vérifier le mot de passe
  if (!compareSync(data.password, user.password)) {
    return { error: 1, status: 404, data: 'Login ou mot de passe incorrect' };
  }

  // Générer un uuid de session pour l'utilisateur si non existant
  if (!user.session) {
    user.session = uuidv4();
  }

  // Retourner uniquement les champs nécessaires
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  };

  console.log("HELLO")
  return { error: 0, status: 200, data: u, redirect: '/shop/buy' };
}

function getAllViruses() {
  return { error: 0, data: items };
}

function getAccountAmount(number) {
  if (!number) return { error: 1, status: 404, data: 'Aucun numéro de compte bancaire fourni' };
  let account = bankaccounts.find(a => a.number === number);
  if (!account) return { error: 1, status: 404, data: 'Numéro de compte bancaire incorrect' };
  return { error: 0, status: 200, data: account.amount };
}

function getAccountTransactions(number) {
  if (!number) return { error: 1, status: 404, data: 'Aucun numéro de compte bancaire fourni' };
  let account = bankaccounts.find(a => a.number === number);
  if (!account) return { error: 1, status: 404, data: 'Numéro de compte bancaire incorrect' };
  // Récupérer les transactions grâce à l'_id du compte
  let trans = transactions.filter(t => t.account === account._id);
  return { error: 0, status: 200, data: trans };
}

export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
}