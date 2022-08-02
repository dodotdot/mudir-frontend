# CREATE SUBJECT PROGRESS

**URL** : `/api/subject-progress/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "userid": "[id from table user, numeric only]",
    "subjectId": "[id from table subject, numeric only]"
}
```

**Data example For Create New SUBJECT**

```json
{
  "userid": "2",
  "subjectid": "3"
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
    "message": "Gagal membuat subject progress",
    "status":"failed"
}
```

# GET ALL SUBJECT PROGRESS

**URL** : `/api/subject-progress/`

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
      "id": "1",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "2",
      "subjectid": "3"
    },
    {
      "id": "2",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "4",
      "subjectid": "2"
    }
  ]
}
```

# GET SUBJECT BY USER ID

**URL** : `/api/subject-progress/user/:userId

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
      "id": "1",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "2",
      "subjectid": "3"
    },
    {
      "id": "2",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "4",
      "subjectid": "2"
    }
  ]
}
```

# GET SUBJECT BY SUBJECT

**URL** : `/api/subject-progress/subject/:subjectId`

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
      "id": "1",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "2",
      "subjectid": "3"
    },
    {
      "id": "2",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "4",
      "subjectid": "2"
    }
  ]
}
```

# GET SUBJECT BY USER AND SUBJECT

**URL** : `/api/subject-progress/user/:userId/subject/:subjectId`

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
      "id": "1",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "2",
      "subjectid": "3"
    },
    {
      "id": "2",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "userid": "4",
      "subjectid": "2"
    }
  ]
}
```

# DELETE SUBJECT PROGRESS

**URL** : `/api/subject-progress/{subjectProgressId}`

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