import LocalSource from "@/datasource/controller";
import { errorResponse } from "@/services/index";

/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLoginFromLocalSource(data) {
  return LocalSource.shopLogin(data)
}

async function getAllVirusesFromLocalSource() {
  return LocalSource.getAllViruses()
}

async function setUserBasketFromLocalSource(data) {
  return LocalSource.setUserBasket(data)
}

async function getUserBasketFromLocalSource(data) {
  return LocalSource.getUserBasket(data)
}

async function addOrderFromLocalSource(data) {
  return LocalSource.addOrder(data)
}

async function shopLogin(data) {
  let response;
  try {
    response = await shopLoginFromLocalSource(data)
  } catch(err) {
    response = errorResponse('erreur réseau, impossible de se connecter')
  }
  return response
}

async function getAllViruses() {
  let response;
  try {
    response = await getAllVirusesFromLocalSource()
  } catch(err) {
    response = errorResponse('erreur réseau, impossible de récupérer la liste des viruses')
  }
  return response
}

async function setUserBasket(data) {
  let response;
  try {
    response = await setUserBasketFromLocalSource(data)
  } catch(err) {
    response = errorResponse('erreur réseau, impossible de modifier le panier')
  }
  return response
}

async function getUserBasket(data) {
  let response;
  try {
    response = await getUserBasketFromLocalSource(data)
  } catch(err) {
    response = errorResponse('erreur réseau, impossible de récupérer le panier')
  }
  return response
}

async function addOrder(data) {
  let response;
  try {
    response = await addOrderFromLocalSource(data);
  } catch(err) {
    response = errorResponse('erreur réseau, d\'ajouter un item dans le panier')
  }
  return response
}

export default {
  shopLogin,
  getAllViruses,
  getUserBasket,
  setUserBasket,
  addOrder,
}

