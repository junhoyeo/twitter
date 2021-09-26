// import hanja
// url = "https://openapi.naver.com/v1/search/news.json?query=골프레슨&display=32&start=1&sort=sim"
// headers = {
//   "X-Naver-Client-Id": "5cfqoG0IXMNKr1r6IWYW",
//   "X-Naver-Client-Secret": "soGiflMCwV",
// }

// import requests

// # send request to url with headers
// response = requests.get(url, headers=headers)

// # load json from response text
// import json
// result = json.loads(response.text)

// for item in result['items']:
//     title = item['title']
//     print(hanja.translate(title, 'combination'))
//     print(item['description'])
//     print(item['link'])
//     print(item['pubDate'])

//     import { supabase } from 'src/utils/database';

import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function (
  _request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const { data } = await axios.get(
      'https://openapi.naver.com/v1/search/news.json?query=twitter&display=48&start=1&sort=sim',
      {
        headers: {
          'X-Naver-Client-Id': '5cfqoG0IXMNKr1r6IWYW',
          'X-Naver-Client-Secret': 'soGiflMCwV',
        },
      },
    );
    return response.json(data);
  } catch (error) {
    console.log(error);
    return response.send(400);
  }
}
