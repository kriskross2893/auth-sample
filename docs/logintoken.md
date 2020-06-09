# Login Token

----
This uses the simple username password format that you will have to send via the body of the request.
It will return a token which you should send to the protected API end points.

- **URL**
  - /login-token
- **Method**
  - `POST`
- **Body**
  - username: String
  - password: String
- **Success Response**
  - Code: 200
  - Content: `{message: 'Success', token: 'somelongtokengibberish123456'}`
- **Error Response**
  - Code: 401
  - Content: `{message: 'Unauthorized'}`
- **Sample Call** (javascript)

```javascript
  let response = await fetch(
    'https://auth-sample-nodejs.herokuapp.com/login-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      username: 'sampleUser',
      password: 'samplePass'
    })
  });
```

- **Sample Call** (python)

```python
  import requests

  jsonInput = {
      'username': 'sampleUser',
      'password': 'samplePass'
  }
  response = requests.post(
      'https://auth-sample-nodejs.herokuapp.com/login-token',
      json=jsonInput
  )
```
