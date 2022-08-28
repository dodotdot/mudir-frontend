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

# COUNT USER ID PROGRESS BY METHOD

**URL** : `/api/quran-progress/user/:userId/method/count`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "data": [
    {
      "method": "SABAQ",
      "total": 3
    },
    {
      "method": "SABAQI",
      "total": 3
    },
    {
      "method": "MANZIL",
      "total": 3
    }
  ],
  "status": "OK"
}
```

# GET PROGRESS BY USER ID

**URL** : `/api/quran-progress/user/:userId/progress`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "data": {
    "userId": 1,
    "totalSurat": 3,
    "surat": "Al-Baqarah",
    "ayat": 4
  },
  "status": "OK"
}
```

# GET METHOD

**URL** : `/api/quran-progress/method/:method`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "data": [
    {
      "id": 30,
      "createdDate": "2022-08-28T00:00:00+07:00",
      "userId": 4,
      "name": "Budi baik",
      "method": "Sabaq"
    },
    {
      "id": 31,
      "createdDate": "2022-08-28T00:00:00+07:00",
      "surat": "Al-Kafirun",
      "ayat": 4,
      "juz": 29,
      "userId": 5,
      "name": "Budi ok",
      "method": "Sabaq"
    },
    {
      "id": 32,
      "createdDate": "2022-08-28T00:00:00+07:00",
      "userId": 8,
      "name": "deni",
      "method": "Sabaq"
    }
  ],
  "status": "OK"
}
```

# GET ALL USER QURAN PROGRESS
**URL** : `/api/quran-progress/user/progress`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "code": 200,
  "data": [
    {
      "userId": 1,
      "name": "admin",
      "total": 3
    },
    {
      "userId": 5,
      "name": "Budi ok",
      "total": 1
    }
  ],
  "status": "OK"
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