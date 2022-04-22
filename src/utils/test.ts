const axios = require('axios');


export async function getUser() {
    try {
      console.log('ТЕСТЫ ЗАПУЩЕНЫ!')
      const responseAuth = await axios.get('http://127.0.0.1:4000/auth');
      console.log(responseAuth.data)
      await axios.post('http://127.0.0.1:4000/hello',{},{
        headers: { 
          'Authorization': responseAuth.data.base64,
          'Outp': responseAuth.data.token,
        }
      });
      console.log('ВСЕ ХОРОШО!')
    } catch (error) {
      console.error(error);
    }
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
