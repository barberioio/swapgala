const OpenAI = require('openai');
require('dotenv').config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// });



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// const callChat = async () => {
//   console.log("Willy");
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });

//   console.log(chatCompletion.choices);
// }
const prompt  = 'Firstly chatGPT must ask for gender of me when I answer of the gender like female, make, gay then keep the value of my gender. after that chatGPT must send the question one “1.Is your waist smaller than your hips?” When I answer the question one , I can answer into ways like yes or no. and analyze the answer that in term of yes or no.for example, I answered “sure, my waist is smaller” then  mean in term of yes please keep the value of q1 is 1 like q1[1] , otherwise If I answered “my waist isn’t smaller than my hips" the value of q1 is 0 like q1[0], after keep the value of q1 as array then send the question two “2. Do you have trouble buying pants because they tend to include the thighs and hips?” When I answer the question two, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q2 is 1 otherwise the value of q2 is 0 like q2[1] , after keep the value of q2 then send the question three “3. Is your weight increasing in your hips and thighs more than the rest of your body?” When I answer the question three, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q3 is 1 otherwise the value of q3 is 0 , after keep the value of q3 then send the question four “4.Are your shirts usually smaller than pants like S and M?” When I answer the question four, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q4 is 1 otherwise the value of q4 is 0 like q4[0] , after keep the value of q4 then send the question five “5.Do you often return clothes that you bought because they tend to strain your shoulders and chest?” When I answer the question five, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q5 is 1 otherwise the value of q5 is 0 like q5[0]  , after keep the value of q5 then send the question six “6.Would you avoid using shoulder pads because they would make you look bulky?” When I answer the question six, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q6 is 1 otherwise the value of q6 is 0 like q6[0]  After I answered completely 6 questions you send the response as array object by [1,1,1,1,0,0] in order question [q1,q2,q3,q4,q5,q6]';
const messages = [{role: 'user', content: prompt}];
const defaultMessage = "Welcome to the chat. Please tell us about your gender";

async function getChatCompletion(req, res) {
  console.log('req :' + req.body);
  const { message } = req.body;
  messages.push({role: 'user', content: message});

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });
    messages.push(chatCompletion.choices[0].message);

    console.log(messages);

    return chatCompletion.choices;
  } catch (error) {
    console.error('OpenAI request error:', error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
}

module.exports = { getChatCompletion };
