const OpenAI = require('openai');
require('dotenv').config();
const { Dress } = require('./models/dress');
const { Shape } = require('./models/shape')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const prompt = 'Firstly User send any message to chatbot then ChatGPT must send the first question: 1. Is your waist smaller than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q1. If the answer to question 1 is "yes," then ChatGPT should send the second question: 2. Do you have trouble buying pants because they tend to include the thighs and hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q2. If the answer to question 2 is "yes," then ChatGPT should send the third question: 3. Is your weight increasing in your hips and thighs more than the rest of your body? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q3. If the answer to question 3 is "yes," then ChatGPT should send the fourth question: 4. Are your shirts usually smaller than pants like S and M? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. If the answer to question 3 is "no," then ChatGPT should send the alternative fourth question: 4. Are your shoulders wider than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. After storing the value of q4, ChatGPT should ask the fifth question: 5. Do you often return clothes that you bought because they tend to strain your shoulders and chest? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q5. If the answer to question 5 is "yes" or "no," then ChatGPT should send the sixth question: 6. Would you avoid using shoulder pads because they would make you look bulky? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q6. ChatGPT should display one question at a time. After you have answered all 6 questions, it will provide a bodyshape by when finished toltal 6 question then thank you me for answering the question if you want to suggest you can only suggest body shape only 5 shape including apple, hourglass, pair, rectangle and triangle,and provide me the response as an array object like this : [1, 1, 1, 1, 0, 0]';

const messages = [{ role: 'user', content: prompt }];

async function getChatCompletion(req, res) {
  console.log('req :' + req.body);
  const { message } = req.body;
  messages.push({ role: 'user', content: message });

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });
    messages.push(chatCompletion.choices[0].message);
  
    console.log(messages);
  
    const regex = /\[(.*?)\]/;
    const match = chatCompletion.choices[0].message.content.match(regex);
    if (match) {
      const valuesString = match[1];
      const valuesArray = valuesString.split(', ').map(Number);
  
      console.log(valuesArray);
  
      const excelFilePath = './capstone.xlsx';
  
      const { findValueInExcel } = require('./process-xlsx');
  
      const a = findValueInExcel(excelFilePath, valuesArray);
      console.log(a);
  
      async function findDressNameByType(a) {
        try {
          const regex = new RegExp(a, 'i');
          const dressesMatchingQuery = await Dress.find({ type: regex }).exec();
          return dressesMatchingQuery;
        } catch (error) {
          console.error("Error finding dress by type:", error);
          throw error;
        }
      }

      async function findShapeByType(a) {
        try {
          const regex = new RegExp(a, 'i');
          const shapeMatchingQuery = await Shape.find({ type: regex }).exec();
          return shapeMatchingQuery;
        } catch (error) {
          console.error("Error finding shape by type:", error);
          throw error;
        }
      }
      
      const dressName = await findDressNameByType(a);
      const shapeName = await findShapeByType(a);

      
      if (dressName !== null && shapeName != null) {
        const response = {
          shapeName,
          dressName,
          chatCompletion: chatCompletion.choices[0].message.content
        };
        console.log(response);
        return res.json(response);
      } else {
        // Handle the case when no matching dress is found
        console.log("No matching dress found for the given body shape");
      }

    } else {
      // Handle the case when the regular expression doesn't match
    }
    
    return res.json(chatCompletion.choices);
    // return chatCompletion.choices;
  } catch (error) {
    console.error('OpenAI request error:', error);
    throw error;
  }
  
}

module.exports = { getChatCompletion };

