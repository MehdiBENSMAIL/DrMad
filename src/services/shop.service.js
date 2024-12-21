import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function setUserBasketFromLocalSource(userId, data) {
  return LocalSource.setUserBasket(userId, data)
}

async function getUserBasketFromLocalSource(userId) {
  return LocalSource.getUserBasket(userId)
}


async function shopLogin(data) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await shopLoginFromLocalSource(data)
  }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
  }
  return response
}

async function getAllViruses() {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAllVirusesFromLocalSource()
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
  }
  return response
}

async function setUserBasket(userId, data) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await setUserBasketFromLocalSource(userId, data)
  }
      // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier le panier'  }
  }
  return response
}

async function getUserBasket(userId) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getUserBasketFromLocalSource(userId)
  }
      // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le panier'  }
  }
  return response
}

export default {
  shopLogin,
  getAllViruses,
  getUserBasket,
  setUserBasket,
}