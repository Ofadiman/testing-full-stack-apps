import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { faker } from "@faker-js/faker";

faker.seed(1);

const posts = [];
for (let i = 0; i < 10; i++) {
  posts.push({
    id: faker.string.uuid(),
    content: faker.lorem.sentences(3),
    title: faker.lorem.sentences(1),
    likes: faker.number.int({ min: 0, max: 100 }),
  });
}

writeFileSync(
  join(process.cwd(), "db.json"),
  JSON.stringify({ posts }, null, 2),
);
