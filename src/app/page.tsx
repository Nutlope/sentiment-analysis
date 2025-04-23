"use client";

import { FormEvent, useState } from "react";

const sampleReviews = [
  {
    text: "I absolutely love this product! It works just as described and has made my life so much easier. Highly recommend it to everyone looking for a reliable solution.",
    type: "Positive",
  },
  {
    text: "The product broke after just a week of use. I'm very disappointed with the quality and wouldn't recommend it to anyone. The customer service was unhelpful too.",
    type: "Negative",
  },
  {
    text: "The product is decent, but I expected it to be a bit better for the price. It does the job, but there are a lot of similar products out there that are more affordable.",
    type: "Neutral",
  },
];

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle");
  const [logprobs, setLogprobs] = useState<number | null>(null);

  const useRandomReview = () => {
    const randomReview =
      sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
    setQuestion(randomReview.text);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("pending");

    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    if (!res.body) return;

    const { result, logprobs } = await res.json();

    setAnswer(result);
    setLogprobs(logprobs);
    setStatus("done");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col px-4">
      {status === "idle" ? (
        <div className="flex grow flex-col justify-center">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold">Sentiment Analysis</h1>
            <p className="text-gray-600">
              Enter a product review below to analyze its sentiment, or use a
              random example to try it out.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
            <textarea
              rows={5}
              placeholder="Add a review to see the sentiment"
              autoFocus
              name="prompt"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="block w-full rounded border border-gray-300 p-2 outline-black"
            />
            <div className="flex justify-between gap-2">
              <button
                className="w-fit rounded bg-black px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                type="submit"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={useRandomReview}
                className="text-sm font-medium text-gray-700 transition hover:underline"
              >
                Use Random Review
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col justify-end">
            <div className="grid grid-cols-4">
              <p className="col-span-3 text-xl">{question}</p>

              <div className="text-right">
                <button
                  className="rounded bg-black px-3 py-2 font-medium text-white disabled:opacity-50"
                  disabled={status === "pending"}
                  onClick={() => {
                    setQuestion("");
                    setAnswer("");
                    setStatus("idle");
                  }}
                >
                  Try another review
                </button>
              </div>
            </div>
          </div>

          <div className="py-8">
            <p className="whitespace-pre-wrap">
              <b>{answer}</b>{" "}
              {answer &&
                logprobs &&
                `(${(logprobs * 100).toFixed(0)}% probability)`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
