# Login

Used to collect a Token for a registered User.

**URL** : `/api/auth/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "code": 200,
    "message": "ok",
    "status":"success",
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```
**Notes**

* token can also set into httponly cookie

```
set-cookie: token=93144b288eb1fdccbe46d6fc0f241a51766ecd3d; Max-Age=86400; Path=/; Expires=Mon, 04 Jul 2022 12:42:05 GMT; HttpOnly
```


## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "code": 400,
    "message": "'username' and 'password' combination is wrong.",
    "status":"failed",
}
```
