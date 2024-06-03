const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

function summarizeText(text) {
  const stopWords = new Set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
    'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
    'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
    'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
    'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
  ]);

  const words = text.match(/\w+/g);
  const freqTable = {};

  words.forEach(word => {
    const lowerWord = word.toLowerCase();
    if (!stopWords.has(lowerWord)) {
      if (!freqTable[lowerWord]) {
        freqTable[lowerWord] = 0;
      }
      freqTable[lowerWord] += 1;
    }
  });

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const sentenceValue = {};

  sentences.forEach(sentence => {
    let sentenceWords = sentence.match(/\w+/g) || [];
    sentenceWords = sentenceWords.map(word => word.toLowerCase());

    sentenceWords.forEach(word => {
      if (freqTable[word]) {
        if (!sentenceValue[sentence]) {
          sentenceValue[sentence] = 0;
        }
        sentenceValue[sentence] += freqTable[word];
      }
    });
  });

  const sumValues = Object.values(sentenceValue).reduce((a, b) => a + b, 0);
  const average = sumValues / Object.values(sentenceValue).length;

  let summary = '';
  sentences.forEach(sentence => {
    if (sentenceValue[sentence] && sentenceValue[sentence] > average) {
      summary += ' ' + sentence.trim();
    }
  });

  return summary.trim();
}

app.post('/summarize', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const summary = summarizeText(text);
  return res.json({ summary });
});

app.listen(port, () => {
  console.log(`Summarization API running at http://localhost:${port}`);
});
