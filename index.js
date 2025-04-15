const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post("/mensagem", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: mensagem }],
    });

    res.json({ resposta: resposta.choices[0].message.content });
  } catch (error) {
    res.status(500).send("Erro ao processar a mensagem.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});