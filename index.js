import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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' // This is also the default, can be omitted
});

const runPrompt = async () => {
    const prompt = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

    // Introduce a delay between API calls
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before making the next API call

    const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 10,
        temperature: 1,
    });

    const parsableJSONresponse = response.choices[0].text;
    const parsedResponse = JSON.parse(parsableJSONresponse);

    console.log("Question: ", parsedResponse.Q);
    console.log("Answer: ", parsedResponse.A);
};

runPrompt();
