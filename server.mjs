import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhook', async (req, res) => {
    try {
        const intent = req.body.queryResult.intent.displayName;
        const queryText = req.body.queryResult.queryText;
        if (intent === 'Default Welcome Intent') {
            res.send({
                fulfillmentMessages: [{
                    text: { text: [`Hi There, Welcome to SMIT Form Assist, Select a City`] }
                }]
            });
        } else
            res.send({
                fulfillmentMessages: [{
                    text: { text: [`Sorry, I didn't get that. Can you rephrase your question?`] }
                }]
            });
    }
    catch (error) {
        console.error(`Dialogflow webhook error: ${error}`);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});