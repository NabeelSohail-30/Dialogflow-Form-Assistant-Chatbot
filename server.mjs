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

        switch (intent) {
            case "Default Welcome Intent": {
                const cities = ["Karachi", "Faisalabad", "Islamabad", "All Pakistan"];

                const cityButtons = cities.map(city => {
                    return {
                        "text": city,
                        "postback": city
                    };
                });

                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Hi there, Welcome to SMIT Form Assistant!, We offer our courses in the following cities, select your city to know more about the courses offered in your city."
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",
                                            "options": [
                                                cityButtons
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }
            case "City": {
                const city = req.body.queryResult.parameters.city;
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    `We offer the following courses in ${city}`
                                ]
                            }
                        },
                        {
                            "payload": {
                                "richContent": [
                                    [
                                        {
                                            "type": "chips",
                                            "options": [
                                                {
                                                    "text": "Web and Mobile Development",
                                                },
                                                {
                                                    "text": "AI Generated Chatbots",
                                                },
                                                {
                                                    "text": "Graphic Designing",
                                                },
                                                {
                                                    "text": "Flutter",
                                                },
                                            ]
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                });
                break;
            }
            case "Default Fallback Intent": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Sorry, I didn't get that. Can you rephrase?"
                                ]
                            }
                        },
                    ]
                });
                break;
            }
        }
    }
    catch (error) {
        console.error(`Dialogflow webhook error: ${error}`);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});