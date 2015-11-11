import request from 'superagent';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import config from '../config';

function getUrl(path) {
  if (path.startsWith('http') || canUseDOM) {
    return path;
  }

  return process.env.WEBSITE_HOSTNAME ?
    `http://${process.env.WEBSITE_HOSTNAME}${path}` :
    `http://127.0.0.1:${config.port}${path}`;
}

const HttpClient = {

  post: (path,data) => new Promise((resolve, reject) => {
    request
      .post(getUrl(path))
      .send(data)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

};

export default HttpClient;
