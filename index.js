/*
*/

// Global npm libraries
import { Ollama } from 'ollama';
import express from 'express';
import { ChromaClient, OllamaEmbeddingFunction } from 'chromadb';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';


// Constants
const OLLAMA_HOST = 'http://192.168.2.117:11434'
const CHROMADB_HOST = 'http://localhost:7230'
const OLLAMA_MODEL_EMBEDDING = 'nomic-embed-text'

async function start() {
  try {
    // START initialize libraries

    // Initialize Ollama
    const ollama = new Ollama({
      host: OLLAMA_HOST
    })

    // Initialize ChromaDB
    const clientChromaDB = new ChromaClient({
      path: CHROMADB_HOST,
    });

    // Initialize Ollama Embedding Function
    const embedder = new OllamaEmbeddingFunction({
        url: `${OLLAMA_HOST}/api/embeddings`,
        model: OLLAMA_MODEL_EMBEDDING,
    });


    // END initialize libraries

    // Create ChromaDB collection
    // const collection = await clientChromaDB.createCollection({
    //   name: 'ragdb',
    //   embeddingFunction: embedder,
    // });
    // console.log('collection: ', collection)

    const listCollections = await (await clientChromaDB.listCollections()).find(x => x === 'ragdb')
    console.log('listCollections: ', listCollections)

    if (!listCollections) {
      console.log('Collection does not exist, creating...')
      collection = await clientChromaDB.createCollection({
        name: 'ragdb',
        embeddingFunction: embedder,
      });
    }

    const collection = await clientChromaDB.getCollection({ name: 'ragdb' });

    const app = express();
    const port = 3000;
    
    // curl -H "Content-Type: application/json" -X POST -d '{ "content": "This is some content" }' localhost:3000/data
    app.post('/upload', express.json(), async (req, res) => {
      try {
        const data = req.body;
        console.log('data: ', data)

        const { content, metadata } = data
        console.log('content: ', content)

        const uniqueId = uuidv4();
        
        await collection.add({
          ids: [uniqueId],
          documents: [content],
          metadatas: [metadata]
        })

        res.json({ received: data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    });


    app.post('/query', express.json(), async (req, res) => {
      try {
        const { query } = req.body;
        console.log('query: ', query)

        const results = await collection.query({
          queryTexts: [query],
          nResults: 2
        })

        console.log('results: ', results)

        res.json({ results });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    })

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    
  } catch(err) {
    console.error(err)
  }
}
start()

async function processDocument(filePath, question) {
  console.log('Processing document...')
  console.log('filePath: ', filePath)
  console.log('question: ', question)
  return true
}