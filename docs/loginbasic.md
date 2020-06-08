# Login Basic

----
This uses the simple username password format that you will have to send via the body of the request.
This authentication is the most basic and should not be used in real life situations.

- **URL**
  - /login-basic
- **Method**
  - `POST`
- **Body**
  - username: String
  - password: String
- **Success Response**
  - Code: 200
  - Content: `{message: 'Success'}`
- **Error Response**
  - Code: 401
  - Content: `{message: 'Unauthorized'}`
- **Sample Call**

```javascript
  let response = await fetch('/login-basic', {
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

```python
  jsonInput = {'username': 'sampleUser', 'password': 'samplePass'}
  response = requests.post('/login-basic',json=jsonInput)
```
