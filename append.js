const fs = require('fs');

const data = `

model AISettings {
  id              String   @id @default("singleton")
  provider        String   @default("openai") // openai, gemini, anthropic
  apiKey          String?
  modelName       String   @default("gpt-4o")
  temperature     Float    @default(0.7)
  maxTokens       Int      @default(1000)
  enableChat      Boolean  @default(true)
  enableVisual    Boolean  @default(true)
  enableRecommend Boolean  @default(true)
}

model SearchLog {
  id        String   @id @default(cuid())
  query     String
  results   Int      @default(0)
  userId    String?
  createdAt DateTime @default(now())
}
`;

fs.appendFileSync('d:/Shesham-Wood-Furniture/prisma/schema.prisma', data);
console.log('Appended to schema.prisma');
