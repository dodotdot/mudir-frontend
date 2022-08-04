# CREATE QURAN PROGRESS

**URL** : `/api/quran-progress/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "surat": "[plain text]",
    "ayat": "[plain text]",
    "juz": "[plain text]",
    "userid": "[id from table user, numeric only]",
    "method": "[SABAQ, MANZIL, SABAQI]"
}
```

**Data example For Create New SUBJECT**

```json
{
  "surat": "Al-Kafirun",
  "ayat": "3",
  "juz": "30",
  "userid": "2",
  "method": "SABAQ"
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
    "message": "Gagal membuat quran progress",
    "status":"failed"
}
```

# GET ALL QURAN PROGRESS

**URL** : `/api/quran-progress/`

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
      "surat": "Al-Kafirun",
      "ayat": "3",
      "juz": "30",
      "userid": "2",
      "method": "SABAQ"
    },
    {
      "id": "2",
      "createdDate": "yyyy-MM-dd",
      "markForDelete": "false",
      "surat": "Al-Kafirun",
      "ayat": "3",
      "juz": "30",
      "userid": "2",
      "method": "SABAQ"
    }
  ]
}
```

# GET SUBJECT BY USER ID

**URL** : `/api/quran-progress/user/:userId

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
      "surat": "Al-Kafirun",
      "ayat": "3",
      "juz": "30",
      "userid": "2",
      "method": "SABAQ"
    }
  ]
}
```

# GET SUBJECT BY USER AND METHOD

**URL** : `/api/quran-progress/user/:userId/method/:method`

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
      "surat": "Al-Kafirun",
      "ayat": "3",
      "juz": "30",
      "userid": "2",
      "method": "SABAQ"
    }
  ]
}
```

# DELETE QURAN PROGRESS

**URL** : `/api/quran-progress/{quranProgressId}`

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