import LocalSource from "@/datasource/controller";
import {errorResponse} from "@/services/index";

async function getAccountAmountFromLocalSource(number) {
  return LocalSource.getAccountAmount(number)
}

async function getAccountTransactionsFromLocalSource(number) {
  return LocalSource.getAccountTransactions(number)
}

async function getAccountAmount(number) {
  let response;
  try {
    response = await getAccountAmountFromLocalSource(number)
  }
  catch(err) {
    response = errorResponse('erreur réseau, impossible de se loguer')
  }
  return response
}

async function getAccountTransactions(number) {
  let response;
  try {
    response = await getAccountTransactionsFromLocalSource(number)
  }
  catch(err) {
    response = errorResponse('erreur réseau, impossible de se loguer')
  }
  return response
}

export default {
  getAccountAmount,
  getAccountTransactions,
}
