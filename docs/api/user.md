# CREATE USER

**URL** : `/api/users/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "name": "[user name]",
    "markForDelete": "[true if deleted, false otherwise]",
    "username": "[valid username address]",
    "password": "[password in plain text, can be empty if user type is STUDENT]",
    "guardian": "[parents or wali name, must be filled if type is STUDENT]",
    "userPhone": "[plain text]",
    "guardianPhone": "[plain text], must be filled if type is STUDENT",
    "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
    "city": "[plain text, must be filled if type is STUDENT]",
    "role": "[TEACHER, STUDENT, ADMIN]",
    "lastEducation": "[must be filled if type is TEACHER]"
  
}
```

**Data example For Create New STUDENT**

```json
{
    "name": "Budi Santoso",
    "birthDate": "29-12-1997T00:00:00+00:00",
    "guardian": "Budi Waseso",
    "guardianPhone": "08129181921",
    "userPhone": "088819291929",
    "city": "Madiun",
    "role": "STUDENT"
}
```
**Data example For Create New TEACHER**

```json
{
    "name": "Budi Santoso",
    "username": "budi.santoso@gmail.com",
    "password": "njkj12321adsas",
    "lastEducation": "S2 King Abdul Aziz",  
    "birthDate": "29-12-1997T00:00:00+00:00",
    "userPhone": "088819291929",
    "role": "TEACHER"
}
```

**Data example For Create New ADMIN**

```json
{
    "name": "Deddy Mustanto",
    "username": "deddy.mustanto@gmail.com",
    "password": "njkj12321adsas",
    "role": "ADMIN"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "code": 200,
    "message": "ok",
    "status":"success"
}
```
## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "code": 400,
    "message": "Failed to adding new user",
    "status":"failed"
}
```

# GET ALL USER

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": [
    {
      "id" : "adnqwrqw2891enjw",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    },
    {
      "id" : "asdqwjeje12jne2j1nj",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    }
  ]
}
```

# GET ALL USER BY ROLE

**URL** : `/api/users/role/{role}`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": [
    {
      "id" : "adnqwrqw2891enjw",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    },
    {
      "id" : "asdqwjeje12jne2j1nj",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    }
  ]
}
```

# COUNT ALL USER BY TYPE

**URL** : `/api/users/count`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": {
      "STUDENT": 20,
      "TEACHER": 40
    }
}
```

# GET USER BY ID

**URL** : `/api/users/{userId}`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": [
    {
      "id" : "asdnasdqwjenkjnk2enk",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    }
  ]
}
```

# GET USER BY name

**URL** : `/api/users/name/{name}`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": [
    {
      "id" : "asdnasdqwjenkjnk2enk",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    }
  ]
}
```

# GET USER BY name and role

**URL** : `/api/users/name/{name}/role/{role}`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success",
  "data": [
    {
      "id" : "asdnasdqwjenkjnk2enk",
      "name": "[user name]",
      "username": "[valid username address]",
      "password": "[password in plain text, can be empty if user type is STUDENT]",
      "guardian": "[parents or wali name, must be filled if type is STUDENT]",
      "userPhone": "[plain text]",
      "guardianPhone": "[plain text], must be filled if type is STUDENT",
      "birthDate": "[DD-MM-YYYY, must be filled if type is STUDENT]",
      "city": "[plain text, must be filled if type is STUDENT]",
      "role": "[TEACHER, STUDENT, ADMIN]",
      "lastEducation": "[must be filled if type is TEACHER]"
    }
  ]
}
```

# UPDATE USER

**URL** : `/api/users/{userId}`

**Method** : `PUT`

**Auth required** : YES

**Data constraints are the same like CREATE USER, but need to add userID and used different HTTP METHOD (PUT)

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success"
}
```


# DELETE USER

**URL** : `/api/users/{userId}`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "message": "ok",
  "status": "success"
}
```