# CREATE SUBJECT

**URL** : `/api/subjects/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "name": "[plain text, subject name]",
    "book": "[plain text, book name]",
    "author": "[plain text, book author]",
    "duration": "[duration in hour]"
}
```

**Data example For Create New SUBJECT**

```json
{
  "name": "AQIDAH",
  "book": "Utsul Tsalatsah",
  "author": "Syaikh XXX",
  "duration": "4"
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

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "code": 400,
    "message": "Failed to adding new subjects",
    "status":"failed"
}
```

# GET ALL SUBJECTS

**URL** : `/api/subjects/`

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
      "name": "AQIDAH AKHLAK",
      "book": "Utsul Tsalatsah",
      "author": "Syaikh XXX",
      "duration": "4"
    },
    {
      "id" : "akdn221nkjqndjknue",
      "name": "FIQIH",
      "book": "FIQIH KONTEMPORER",
      "author": "Syaikh XXX",
      "duration": "4"
    }
  ]
}
```

# GET SUBJECT BY ID

**URL** : `/api/subjects/{subjectId}`

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
      "id" : "akdn221nkjqndjknue",
      "name": "FIQIH",
      "book": "FIQIH KONTEMPORER",
      "author": "Syaikh XXX",
      "duration": "4"
    }
  ]
}
```
# UPDATE USER

**URL** : `/api/subjects/{subjectId}`

**Method** : `PUT`

**Auth required** : YES

**Data constraints are the same like CREATE SUBJECTS, but need to add subjectId and used different HTTP METHOD (PUT)

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

**URL** : `/api/subjects/{subjectId}`

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