import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  try {
    const apiKey = process.env.EASYBROKER_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'EASYBROKER_API_KEY is not configured' }),
      };
    }

    // Extract propertyId if provided via redirect
    let propertyId = event.queryStringParameters?.propertyId;
    
    // Fallback: Parsear del path si el redirect no inyectó el query param
    if (!propertyId && event.path) {
      const parts = event.path.split('/');
      if (parts.length >= 4 && parts[1] === 'api' && parts[2] === 'properties') {
        propertyId = parts[3];
      }
    }

    // Clean up queryStringParameters to forward to EasyBroker
    const queryParamsObj = { ...event.queryStringParameters };
    delete queryParamsObj.propertyId; // Remove our internal routing param
    delete queryParamsObj.debug;      // Remove debug param

    let apiUrl = 'https://api.easybroker.com/v1/properties';
    if (propertyId) {
      apiUrl += `/${propertyId}`;
    }

    // Add remaining query parameters
    if (Object.keys(queryParamsObj).length > 0) {
      const queryParams = new URLSearchParams(queryParamsObj as Record<string, string>).toString();
      apiUrl += `?${queryParams}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        'X-Authorization': apiKey,
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('EasyBroker API Error:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch from EasyBroker' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Optional, if they hit it directly
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
