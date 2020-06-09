import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import debugLib from 'debug';

dotenv.config();
debugLib.enable(process.env.DEBUG);

const debug = debugLib('auth-sample:server');
const port = process.env.PORT;
const host = process.env.HOST;

const app = express();

app.use(bodyParser.json());
app.use(helmet());

app.get('/', function(req, res) {
  res.send('Hello World');
});

const user = 'sampleUser';
const pass = 'samplePass';
const xAuth = '12345thisIsMyToken';

/**
 * Basic login. No one should use this
 */
app.post('/login-basic', function(req, res) {
  const {
    username,
    password
  } = req.body;

  if (username === user && password === pass) {
    res.json({
      message: 'Success',
    });
  }
});

/**
 * Some de-facto login implementation where they will encode your token using jsonwebtoken implementation
 */
app.post('/login-token', function(req, res) {
  const {
    username,
    password
  } = req.body;

  if (username === user && password === pass) {
    const token = jwt.sign({user}, 'secret');
    res.json({
      message: 'Success',
      token
    });
  }
});

/**
 * The api to access using the token recieved previously from the login-token endpoint
 */
app.get('/protected-api', function(req, res) {
  const {
    authorization,
    'x-auth-token': xAuthToken
  } = req.headers;

  const [type, token] = authorization.split(' ');
  try {
    if (type === 'Basic') {
      const [username, password] = atob(token).split(':');

      if (username === user && password === pass) {
        res.json({
          message: 'Hello you have accessed the protected-api'
        });
      } else {
        throw new Error('Unauthorized');
      }
    } else if (type === 'Bearer') {
      const valid = jwt.verify(token, 'secret');
      if (valid) {
        res.json({
          message: 'Hello you have accessed the protected-api'
        });
      }
    } else if (xAuthToken && xAuthToken === xAuth) {
      res.json({
        message: 'Hello you have accessed the protected-api'
      });
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: 'Not Found'
    });
  }
});


let listener;
export const startApp = (callback) => {
  listener = app.listen(
    port,
    host,
    () => {
      if (callback) {
        callback();
      }

      const address = listener.address().address;
      debug(`Server listening on http://[${address}]:${port} (PID ${process.pid})`);
    }
  );
};

export const stopApp = callback => {
  return listener.close(callback);
};

export const getListener = () => {
  return listener;
};

/* istanbul ignore if */
if (require.main === module) {
  startApp();
}

export default startApp;
