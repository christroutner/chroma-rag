/*
  This example demonstrates how to query the database.
*/

import axios from 'axios';

const url = 'http://localhost:3000/query'

async function start() {
  try {
    const query = "What is a UTXO?"
    const response = await axios.post(url, { query })
    console.log(response.data)
  } catch(err) {
    console.error(err)
  }
}
start()