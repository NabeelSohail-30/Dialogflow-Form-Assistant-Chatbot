import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhook', async (req, res) => {
    try {
        const intent = req.body.queryResult.intent.displayName;
        const params = req.body.queryResult.parameters;

        switch (intent) {
            case "Default Welcome Intent": {
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
                                                {
                                                    "text": "Karachi",
                                                },
                                                {
                                                    "text": "Faisalabad",
                                                },
                                                {
                                                    "text": "Islamabad",
                                                },
                                                {
                                                    "text": "All Pakistan",
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
            case "City": {
                const city = params.city;
                if (city === "All Pakistan" || city === "Karachi" || city === "Faisalabad" || city === "Islamabad") {
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
                }
                else {
                    res.send({
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        `Sorry, we don't offer our courses in ${city}. Please select the city from the following.`
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
                                                        "text": "Karachi",
                                                    },
                                                    {
                                                        "text": "Faisalabad",
                                                    },
                                                    {
                                                        "text": "Islamabad",
                                                    },
                                                    {
                                                        "text": "All Pakistan",
                                                    },
                                                ]
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    });
                }
                break;
            }
            case "Course": {
                const course = params.courses;
                if (course === "Web and Mobile Development" || course === "AI Generated Chatbots" || course === "Graphic Designing" || course === "Flutter") {
                    res.send({
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        `You have selected ${course}, please enter your Full Name`
                                    ]
                                }
                            },
                        ]
                    });
                }
                else {
                    res.send({
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        `Sorry, we don't offer ${course} course in your city. Please select the course from the following.`
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
                }
                break;
            }
            case "FullName": {
                const name = params.name.name;
                if (name === undefined || name === null || name === "") {
                    res.send({
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        `Please enter your Full Name`
                                    ]
                                }
                            },
                        ]
                    });
                } else {
                    res.send({
                        "fulfillmentMessages": [
                            {
                                "text": {
                                    "text": [
                                        `Your name is ${name}, please enter your Father++`
                                    ]
                                }
                            },
                        ]
                    });
                }
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

/*------------------Schema------------------*/
const formData = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    fatherCnic: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    haveLaptop: {
        type: Boolean,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    }
});

const Form = mongoose.model('Form', formData);

/*---------------------------MongoDB---------------------------*/
// let dbURI = 'mongodb+srv://NabeelSohail:Nabeel30@cluster0.lidnkc6.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(dbURI);
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is connected');
// }
// );
// mongoose.connection.on('error', (err) => {
//     console.log('Mongoose connection error: ', err);
// }
// );
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose is disconnected');
// }
// );
// process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//         console.log('Mongoose is disconnected due to application termination');
//         process.exit(0);
//     });
// }
// );