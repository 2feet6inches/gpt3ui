import defaultHandler from "@/pages/api/_defaultHandler";
import { errorResponse, successResponse } from "@/libs/respone-format";
import { Configuration, OpenAIApi } from "openai";

const handler = defaultHandler();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generatePrompt(question: string) {
    return question
}

handler.post(async (req, res) => {
    try {
        const response: any = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generatePrompt(req.body.question),
            temperature: 0.6,
            max_tokens: Number(process.env.OPENAI_MAX_TOKENS) ? Number(process.env.OPENAI_MAX_TOKENS) : 20
        });

        if (response.status !== 200) {
            return res.status(500).send(
                errorResponse(
                    500,
                    'Predict failed',
                    response.data,
                ));
        }

        res.status(200).send(successResponse(200, response.data));
    } catch (error: any) {
        console.log(error)
        return res.status(500).send(
            errorResponse(
                500,
                'Predict service crash',
                error?.response?.data,
            ));
    }
})

export default handler;
