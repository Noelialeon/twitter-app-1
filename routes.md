| method | action | description | logged |
|:--------|:--------|:--------|:--------|
| GET   |  /signup   |  show form signup  | ❌ |
| POST   | /signup   |  create user | ❌ |
| GET   | /login   |  show form login | ❌ |
| POST | /login | login user session | ❌ |
| GET | /logout | destroy user session | ❌ |
| GET | /timeline | show all tweets | ❌ |
| GET | /profile/:username | show profile of :username | ❌ |
| GET | /profile/:username/follow | follow :username from logged user | ✅ |
| GET | /profile/:username/timeline | show :username | ✅ |
| GET | /tweets | show all tweets from logged user | ✅ |
| GET   | /tweets/new | show form create tweet of logged user | ✅ |
| POST | /tweets | create user tweet of logged user | ✅ |