import { db } from "@/db";
import { posts } from "@/db/schemas/post-schema";

function generateId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 32);
}

const seed = async () => {
  const userId = "gc7XDJy6g7kN5Z6OofCCe3TLxhXtSpsz";
  try {
    console.log("\n---------seeding--------\n");

    await db.insert(posts).values([
      {
        id: generateId(),
        userId,
        title: "Hello World 1",
        content: "This is a test post 1",
      },
      {
        id: generateId(),
        userId,
        title: "Hello World 2",
        content: "This is a test post 2",
      },
    ]);
    console.log("Seed successful");
  } catch (error) {
    console.error("Seed failed", error);
  }
};
seed();
