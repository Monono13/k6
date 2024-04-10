import http from "k6/http";
import { sleep, check } from "k6";


export const options = {
    vus: 3,
    duration: '5s'
}


const url = 'http://148.255.0.234/';


export default function () {
    const response = http.get(url);
    check(response, {
      'status is 200': (r) => r.status === 200,
      'has PDF files': (r) => {
        if (r.body.includes('.pdf') || r.body.includes('.PDF')) {
          const matches = r.body.match(/[^\/]+\.pdf/gi); 
          if (matches && matches.length > 0) {
            console.log('Se encontraron los siguientes archivos PDF:');
            matches.forEach((match, index) => {
              console.log(`${index + 1}. ${match}`);
            });
            return true;
          }
        }
        return false;
      }
    });
  }
