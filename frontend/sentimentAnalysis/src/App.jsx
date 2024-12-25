import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2 } from 'lucide-react';


const SentimentAnalyzer = () => {
  const [data, setData] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setData(e.target.value);
  }

  const getSentimentColor = (sentiment) => {

    if (sentiment === 'Given sentence is Positive') {
      return 'bg-green-300'
    } else if (sentiment === 'Given sentence is Negative') {
      return 'bg-red-300'
    } else {
      return 'bg-yellow-300'
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log(data)

    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const url = 'http://localhost:8000/classification'

    const response = axios.post(url, { 'sentence': data }, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then( (response) => setAnalysis(response.data))
    

    setIsLoading(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(data)

  //   const url = 'http://localhost:8000/classification'

  //   const response = axios.post(url, { 'sentence': data }, 
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  //   )
  //   .then( (response) => setAnalysis(response.data))
  // }


  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
          <p className="mt-2 text-gray-600">
            Enter your text below to analyze its sentiment
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit = {handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={ data }
              onChange={ handleChange }
              placeholder="Type or paste your text here..."
              className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <button
            type = "text"
            disabled={!data || isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send size = { 20 } />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </form>
        
        {/* Results Section */}
        {analysis && (
          <div className={`p-6 rounded-lg ${ getSentimentColor(analysis) }`}>
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Sentiment:</span>
                <span className="capitalize">{ analysis }</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzer;