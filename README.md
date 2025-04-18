# chroma-rag

This is a node.js JavaScript application that interfaces with Ollama and ChromaDB, in order to generate a RAG Database with a REST API. An LLM can then call this database to get RAG information for a prompt.

This is a prototype Express.js REST API server. It has an `/upload` endpoint for uploading data to the database. The `/query` endpoint allows Semantic Search queries for content from the database. That retrieved content can be used as part of a prompt to an LLM.

## Installation

- `git clone https://github.com/christroutner/chroma-rag`
- `cd chroma-rag`
- `docker-compose pull`
- `npm install`

## Running

- Start the Chroma database: `docker-compose up -d`
- Terminal 1: Start the Express server: `node index.js`
- Terminal 2: Change directory to examples: `cd examples`
- Load test data into database: `node 01-upload-test-docs.js`
- Query the database: `node 02-query.js`