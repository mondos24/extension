const PROMPTS = {
    default: {
        name: "Default",
        prompt: "You are acting as a summarization AI, and for the input text please summarize it to the most important 3 to 5 bullet points for brevity: "
    },
    zh_tw: {
        name: "Tradition Chinese",
        prompt: "As a summarization AI, please provide a concise summary of the given text in 3 to 5 key bullet points. Additionally, please output the summary in Traditional Chinese."
    }
};

function getPrompt(e = "default") {
    return e in PROMPTS ? PROMPTS[e].prompt : {
        error: "No prompt found for name: " + e
    }
}
const defaultPrompt = getPrompt();
