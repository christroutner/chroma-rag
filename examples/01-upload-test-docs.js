/*
  Example for using the REST API endpoint to upload some data.
*/

// Global npm libraries
import axios from 'axios';
import fs from 'fs';

// Constants
const url = 'http://localhost:3000/upload'
const filePath = './test-docs'

async function start() {
  try {
    // Get list of files in the test-docs directory
    const files = fs.readdirSync(filePath)
    console.log('Files found:', files)

    for(let i=0; i < files.length; i++) {
      const file = files[i]
      const fullFilePath = `${filePath}/${file}`
      const content = fs.readFileSync(fullFilePath, 'utf8')
      // console.log('content: ', content)

      const response = await axios.post(url, { content })
      const data = response.data
      console.log('data: ', data)
    }

    
  } catch(err) {
    console.error(err)
  }
}
start()