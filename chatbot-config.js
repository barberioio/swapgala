const OpenAI = require('openai');
require('dotenv').config();
const { Dress } = require('./models/dress');


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
// const prompt  = 'Firstly chatGPT must ask for gender of me when I answer of the gender like female, make, gay then keep the value of my gender. after that chatGPT must send the question one \n“1.Is your waist smaller than your hips?” When I answer the question one , I can answer into ways like yes or no. and analyze the answer that in term of yes or no.for example, I answered “sure, my waist is smaller” then  mean in term of yes please keep the value of q1 is 1 like q1[1] , otherwise If I answered “my waist isn’t smaller than my hips" the value of q1 is 0 like q1[0], If the answer is yes \nafter keep the value of q1 as array if answer is yes or interm of yes \nthen send the question two “2. Do you have trouble buying pants because they tend to include the thighs and hips?” When I answer the question two, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q2 is 1 otherwise the value of q2 is 0 like q2[1] , after keep the value of q2 whether the answer of yes or no q2[1] or q2[0] \nthen send the question three “3. Is your weight increasing in your hips and thighs more than the rest of your body?” When I answer the question three, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q3 is 1 otherwise the value of q3 is 0 , after keep the value of q3 if q3  is yes  then send the question four “4.Are your shirts usually smaller than pants like S and M?” but if answer of question three is no the  then send the question four “4.Are your shoulders wider than your hips?”after keep the value of q4 if answer of q4 is yes or no then send the question five “5.Do you often return clothes that you bought because they tend to strain your shoulders and chest?” \n When I answer the question four, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q4 is 1 otherwise the value of q4 is 0 , after keep the value of q4 if answer of q4 is yes or no then send the question five “5.Do you often return clothes that you bought because they tend to strain your shoulders and chest?”If answer of this question5 is yes or no then send the question six “6.Would you avoid using shoulder pads because they would make you look bulky?” When I answer the question six, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q6\n'
// 'q6 is 0 like q6[0] \nif answer of question1 is no then send the question two “2. Do your shoulders look down rather than straight?” When I answer the question two, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q2 is 1 otherwise the value of q2 is 0 like q2[1] , after keep the value of q2 after keep the value of q2 whether the answer of yes or no q2[1] or q2[0]\nthen send the question three “3. Has the weight around your waist increased more than in other parts of your body?” When I answer the question three, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q3 is 1 otherwise the value of q3 is 0 ,\nafter keep the value of q3 if answer of q3 is yes  then send the question four “4. Is your waist wider than your hips?” but if answer of question three is yes the  then send the question four “4.Are your shirts usually smaller than pants like S and M?”  when i I answer question4 after keep the value of q4 if answer of q4 is yes or no  then send the question four “5.Is your weight gain evenly?” but if the answer of this question5 is yes or no then send the question6 is “6.Are your arms usually the same as your weight increases?"When I answer the question six, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q6 is 1 otherwise the value of q6 is 0 like q6[0]\nWhen I answer the question four, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q4 is 1 otherwise the value of q4 is 0 , after keep the value of q4 if answer of q4 is yes or no then send the question five “5.Do you often return clothes that you bought because they tend to strain your shoulders and chest?” If answer of this question5 is yes or no then send the question six “6.Would you avoid using shoulder pads because they would make you look bulky?” When I answer the question six, I can answer into ways like yes or no. and analyze the answer that in term of yes or no. if yes please keep the value of q6 is 1 otherwise the value of q6 is 0 like q6[0]\nChatGPT must show only 1 question at a time.\nAfter I answered completely 6 questions you send the response as array object by [1,1,1,1,0,0] in order question [q1,q2,q3,q4,q5,q6]';
//const prompt = 'Firstly ChatGPT must ask for your gender, and when you answer with "female," "male," or "gay," it should keep the value of your gender. After that, ChatGPT must send the first question:\n1. Is your waist smaller than your hips?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q1.\n\nIf the answer to question 1 is "yes," then ChatGPT should send the second question:\n2. Do you have trouble buying pants because they tend to include the thighs and hips?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q2.\n\nIf the answer to question 2 is "yes," then ChatGPT should send the third question:\n3. Is your weight increasing in your hips and thighs more than the rest of your body?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q3.\n\nIf the answer to question 3 is "yes," then ChatGPT should send the fourth question:\n4. Are your shirts usually smaller than pants like S and M?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4.\n\nIf the answer to question 3 is "no," then ChatGPT should send the alternative fourth question:\n4. Are your shoulders wider than your hips?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4.\n\nAfter storing the value of q4, ChatGPT should ask the fifth question:\n5. Do you often return clothes that you bought because they tend to strain your shoulders and chest?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q5.\n\nIf the answer to question 5 is "yes" or "no," then ChatGPT should send the sixth question:\n6. Would you avoid using shoulder pads because they would make you look bulky?\n   - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q6.\n\nChatGPT should display one question at a time. After you have answered all 6 questions, it will provide a response as an array object, such as [1, 1, 1, 1, 0, 0], in the order of questions [q1, q2, q3, q4, q5, q6].';
// const prompt = 'Firstly ChatGPT must ask for your gender, and when you answer with "female," "male," or "gay," it should keep the value of your gender. After that, ChatGPT must send the first question: 1. Is your waist smaller than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q1. If the answer to question 1 is "yes," then ChatGPT should send the second question: 2. Do you have trouble buying pants because they tend to include the thighs and hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q2. If the answer to question 2 is "yes," then ChatGPT should send the third question: 3. Is your weight increasing in your hips and thighs more than the rest of your body? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q3. If the answer to question 3 is "yes," then ChatGPT should send the fourth question: 4. Are your shirts usually smaller than pants like S and M? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. If the answer to question 3 is "no," then ChatGPT should send the alternative fourth question: 4. Are your shoulders wider than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. After storing the value of q4, ChatGPT should ask the fifth question: 5. Do you often return clothes that you bought because they tend to strain your shoulders and chest? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q5. If the answer to question 5 is "yes" or "no," then ChatGPT should send the sixth question: 6. Would you avoid using shoulder pads because they would make you look bulky? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q6. ChatGPT should display one question at a time. After you have answered all 6 questions, it will provide a response as an array object but not showing to me, such as [1, 1, 1, 1, 0, 0], in the order of questions [q1, q2, q3, q4, q5, q6].';
const prompt = 'Firstly ChatGPT must ask for your gender, and when you answer with "female," "male," or "gay," it should keep the value of your gender. After that, ChatGPT must send the first question: 1. Is your waist smaller than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q1. If the answer to question 1 is "yes," then ChatGPT should send the second question: 2. Do you have trouble buying pants because they tend to include the thighs and hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q2. If the answer to question 2 is "yes," then ChatGPT should send the third question: 3. Is your weight increasing in your hips and thighs more than the rest of your body? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q3. If the answer to question 3 is "yes," then ChatGPT should send the fourth question: 4. Are your shirts usually smaller than pants like S and M? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. If the answer to question 3 is "no," then ChatGPT should send the alternative fourth question: 4. Are your shoulders wider than your hips? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q4. After storing the value of q4, ChatGPT should ask the fifth question: 5. Do you often return clothes that you bought because they tend to strain your shoulders and chest? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q5. If the answer to question 5 is "yes" or "no," then ChatGPT should send the sixth question: 6. Would you avoid using shoulder pads because they would make you look bulky? - You can answer "yes" or "no," and ChatGPT should analyze the answer as 1 for "yes" and 0 for "no" and store it as q6. ChatGPT should display one question at a time. After you have answered all 6 questions, it will provide a bodyshape by when finished toltal 6 question then thank you me for answering the question if you want to suggest you can only suggest body shape only 5 shape including apple, hourglass, pair, rectangle and triangle,and provide me the response as an array object like this : [1, 1, 1, 1, 0, 0]';


const messages = [{ role: 'user', content: prompt }];
const defaultMessage = "Your body shape is ";

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
          const regex = new RegExp(a.toUpperCase(), 'i');
          const matchingDress = await Dress.findOne({ type: regex }).exec();
          
          if (matchingDress) {
            return matchingDress.DressName;
          } else {
            return null; // Handle the case when no matching dress is found
          }
        } catch (error) {
          // Handle any errors here
          console.error("Error finding dress by type:", error);
          throw error;
        }
      }
      
      const dressName = await findDressNameByType(a);
      
      if (dressName !== null) {
        const response = {
          dressName,
          message: `Your recommended dress is ${dressName}`,
        };
        console.log(response);
      } else {
        // Handle the case when no matching dress is found
        console.log("No matching dress found for the given body shape");
      }

    } else {
      // Handle the case when the regular expression doesn't match
    }
  
    return chatCompletion.choices;
  } catch (error) {
    console.error('OpenAI request error:', error);
    throw error;
  }
  
}

module.exports = { getChatCompletion };

