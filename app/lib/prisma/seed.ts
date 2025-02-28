import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialPosts = [{ name: "Post 1" }, { name: "Post 2" }, { name: "Post 3" }];

const seed = async () => {
  // clean up before the seeding (optional)
  await prisma.post.deleteMany();

  // you could also use createMany
  // but it is not supported for databases
  // e.g. SQLite https://github.com/prisma/prisma/issues/10710
  for (const post of initialPosts) {
    await prisma.post.create({
      data: post,
    });
  }
};

seed();
