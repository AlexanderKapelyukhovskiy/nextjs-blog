import { MongoClient } from "mongodb";

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

function createClient() {
  const url = process.env.MONGO_URL;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

export async function insertAnswer(answer) {
  const client = createClient();
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const result = await client
      .db("questionsApp")
      .collection("answers")
      .insertOne(answer);

    return result.ops[0];
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function getAnswers() {
  const client = createClient();

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const result = await client.db("questionsApp").collection("answers").find();

    return (await result.toArray()).sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    //await listDatabases(client);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.close();
  }
}
