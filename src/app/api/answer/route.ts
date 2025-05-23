import Together from "together-ai";
const together = new Together();

export async function POST(request: Request) {
  const { question } = await request.json();

  const res = await together.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that analyzes customer reviews and provides sentiment analysis. Please ONLY return either positive, negative, or neutral.",
      },
      { role: "user", content: question },
    ],
    logprobs: 1,
    max_tokens: 1,
  });

  const logprobs = Math.exp(res.choices[0].logprobs?.token_logprobs?.[0] ?? 0);
  const result = res.choices[0].message?.content;

  return Response.json({
    result,
    logprobs,
  });
}
