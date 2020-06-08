# Protected API

----
This is a mock endpoint that will simulate someways people guard their API and
how you will be able to access it given some instructions on how they implemented
their authentication scheme.

- **URL**
  - /protected-api
- **Headers**
  pass one of these headers
  - Authorization: Basic base64EncodedUsernameAndPassword
  - Authorization: Bearer jsonWebToken
  - X-Auth-Token: 12345thisIsMyToken
- **Method**
  - `GET`
- **Success Response**
  - Code: 200
  - Content: `{message: 'Hello you have accessed the protected-api'}`
- **Error Response**
  - Code: 404
  - Content: `{message: 'Not Found'}`
- **Sample Call**

```javascript
  // basic authentication using base64
  const token = atob('sampleUser:samplePass')
  let response = await fetch('/protected-api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Basic ' + token
    }
  });
```

```python
  # basic authentication using base64
  import base64

  data = 'sampleUser:samplePass'
  token = base64.b64encode(data.encode("utf-8"))
  token = str(token, "utf-8")
  headers = {'Authorization', 'Basic ' + token, 'Content-Type': 'application/json;charset=utf-8'}
  response = requests.get('/login-token',headers=headers)
```
