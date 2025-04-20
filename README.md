# chroma-rag

This is a node.js JavaScript application that interfaces with Ollama and ChromaDB, in order to generate a RAG Database with a REST API. An LLM can then call this database to get RAG information for a prompt.

This is a prototype Express.js REST API server. It has an `/upload` endpoint for uploading data to the database. The `/query` endpoint allows Semantic Search queries for content from the database. That retrieved content can be used as part of a prompt to an LLM.

## Installation & Running

- `git clone https://github.com/christroutner/chroma-rag`
- `cd chroma-rag`
- `docker-compose pull`
- `docker-compose build --no-cache`
- `docker-compose up -d`

## Usage

See the following JavaScript examples scripts:

- [Upload document example](./examples/01-upload-test-docs.js) - Upload markdown documents to the RAG database.
- [Retrieval example](./examples/02-query.js) - Submit a semantic-text query and retrieve relevant documents.

## License
[MIT](./LICENSE.md)