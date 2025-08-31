import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";
dotenv.config();



const pdf = "./atomichabits.pdf";

async function init() {
  const loader = new PDFLoader(pdf);
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({
    apiKey : process.env.GEMINI_API_KEY,
    model: "text-embedding-004",
    configuration: {
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    },
  });

  // ✅ batch in groups of 100
  const batchSize = 100;
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = docs.slice(i, i + batchSize);

    console.log(`Embedding batch ${i / batchSize + 1} of ${Math.ceil(docs.length / batchSize)}`);

    await QdrantVectorStore.fromDocuments(batch, embeddings, {
      url: "http://localhost:6333",
      collectionName: "gsrawat",
    });
  }

  console.log("✅ All documents indexed successfully!");
}

init();