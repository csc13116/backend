# JWT-Auth

### Host link:

[https://dacnpm-backend.herokuapp.com/](https://dacnpm-backend.herokuapp.com/)

### Lấy lịch sử vị trí của con theo ID của nó

#### Route: /children/:id/pings (GET)

#### JSON res:

```json
[
  {
    "_id": "5f0f37849fb68f00175be8d7",
    "latitude": "177.09230989894",
    "longitude": "90.90000009",
    "children": "5f0f3203d34788c2ef3b0943",
    "time": "2020-07-15T17:06:12.038Z"
  }
]
```

---

### Lấy vị trí của con theo ID của nó

#### Route: /children/:id/ping (GET)

#### JSON res:

```json
{
  "_id": "5eca8b311fcaf800174e4a3b",
  "latitude": "10.7142",
  "longitude": "106.1838",
  "children": "5e92c4b13d0b35496c7722fa",
  "time": "2020-05-24T14:56:49.065Z"
}
```

---

### Đổi tên của con

#### Route: /children/name (POST)

#### Body:

```json
{
"id": ,
"name": ,
}
```

#### JSON res:

```json
{
  "result": 1
}
```

##### Lưu ý: 1 là OK, 0 là error

---

### Lấy danh sách của con và ping cuối cùng của đứa con đầu tiên

#### Route: users/:id/children (GET)

#### JSON res:

```json
[
  {
    "_id": "5f0f3203d34788c2ef3b0943",
    "name": "Long",
    "user": "5ec5378cbff5f40017a5e40c",
    "defaultPing": {
      "_id": "5f0f37849fb68f00175be8d7",
      "latitude": "177.09230989894",
      "longitude": "90.90000009",
      "children": "5f0f3203d34788c2ef3b0943",
      "time": "2020-07-15T17:06:12.038Z"
    }
  },
  {
    "_id": "5f0f3255d34788c2ef3b0944",
    "name": "temp",
    "user": "5ec5378cbff5f40017a5e40c"
  },
  {
    "_id": "5f0f32c6d34788c2ef3b0945",
    "name": "Long",
    "user": "5ec5378cbff5f40017a5e40c"
  }
]
```

---

### ID để test lấy vị trí con về

#### 5e932814d26d1d1d9c5cd034

#### Route: /users/:id/getchildrenping

##### JSON res:

```json
[
  [
    {
      "_id": "5e92c3873d0b35496c7722f7",
      "latitude": "76.9879234",
      "longitude": "76.9879234",
      "time": 1586676615038
    }
  ],
  [
    {
      "_id": "5e92c4ec3d0b35496c7722fb",
      "latitude": "27.89842",
      "longitude": "88.09078",
      "time": 1586676972262
    }
  ]
]
```

---

### ID để test ping vị trí của con

#### Route: /children/ping (POST)

#### Body:

```json
{
"latitude": ,
"longitude": ,
"id": ,
}
```

##### JSON res:

```json
{
  "result": 1
}
```

##### Lưu ý: 1 là OK, 0 là error

```

```
