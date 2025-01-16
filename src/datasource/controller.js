import {items, shopusers, bankaccounts, transactions} from "./data";
import { v4 as uuidv4 } from "uuid";
import { compareSync } from "bcryptjs";

import {errorResponse, normalResponse} from "@/services";
// import { checkAndFinalizeOrder } from '../order.service';

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
  return normalResponse({ user: {
      _id: user._id,
      name: user.name,
      login: user.login,
      email: user.email,
      session: user.session,
    }})
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
  if(!user) return errorResponse('L\'utilisateur n\'existe pas')

  if((!Array.isArray(data.basket.items))) return errorResponse('Le format du panier n\'est pas respecté')
  
  user.basket = data.basket;
  return normalResponse();
}

function getUserBasket(data) {
  const user = shopusers.find(e => e._id === data.userId);
  if(!user) return errorResponse('L\'utilisateur n\'existe pas')

  return normalResponse({ basket: user.basket ?? { items: [] } });
}

function addOrder(data) {
  const user = shopusers.find(e => e._id === data.userId);
  if(!user) return errorResponse('L\'utilisateur n\'existe pas')

  if(!Array.isArray(data.items) || data.items.length === 0)
    return errorResponse('Il n\'y a pas d\'items')

  const items = [];
  let totalPrice = 0;
  for(const itemData of data.items) {
    let item = {
      name: itemData.item.name,
      description: itemData.item.description,
      price: itemData.item.price,
      promotion: itemData.item.promotion,
      object: itemData.item.object,
    }
    items.push({item, amount: itemData.amount});

    let bestPromo = 0;
    itemData.item.promotion.forEach(promotion => {
      if(promotion.amount <= itemData.amount) {
        if(bestPromo < promotion.discount) {
          bestPromo = promotion.discount;
        }
      }
    })

    const normalPrice = itemData.amount * itemData.item.price;
    totalPrice += normalPrice / (1 + (bestPromo / 100) ) ;
  }

  const uuid = uuidv4();
  let orderData = {
    items,
    date: { "$date": Date.now() },
    total: totalPrice,
    status: 'waiting_payment',
    uuid
  }

  if(!user.orders) user.orders = [];
  user.orders.push(orderData);

  return normalResponse({ uuid })
}

function checkOrderExist(data) {
  const user = shopusers.find(e => e._id === data.userId)
  if(!user) return errorResponse('L\'utilisateur n\'existe pas')

  const order = user.orders?.find(e => e._id === data.orderId)
  let exist = false;
  let finalise;

  if(order) {
    exist = true;
    finalise = order.status === 'finalized';
  }

  return normalResponse({ exist, finalise })
}

function finaliseOrder(data) {
  let user = shopusers.find(e => e._id === data.userId)
  if(!user) return errorResponse('L\'utilisateur n\'existe pas')

  let order = user.orders?.find(e => e._id === data.orderId) ?? false
  if(!order) return errorResponse('La commande n\'existe pas')

  if(order.status !== 'waiting_payment')
    return errorResponse('La commande n\'est pas en attente de payement')

  order.status = 'finalized'
  return normalResponse()
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
}