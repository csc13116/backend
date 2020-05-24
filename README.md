# JWT-Auth
### Host link:
[https://dacnpm-backend.herokuapp.com/](https://dacnpm-backend.herokuapp.com/)
### Lấy vị trí của con theo ID của nó
### ID con để test
#### 5e92c4b13d0b35496c7722fa
#### 5e92c35b3d0b35496c7722f6
#### Route: /children/:id/ping (GET)
#### JSON res:
{
    "_id": "5eca8b311fcaf800174e4a3b",
    "latitude": 10.7142,
    "longitude": 106.1838,
    "children": "5e92c4b13d0b35496c7722fa",
    "time": "2020-05-24T14:56:49.065Z"
}

### ID để test lấy vị trí con về
#### 5e932814d26d1d1d9c5cd034
#### Route: /users/:id/getchildrenping
##### JSON res:
[
    [
        {
            "_id": "5e92c3873d0b35496c7722f7",
            "latitude": 76.9879234,
            "longitude": 76.9879234,
            "time": 1586676615038
        },
    ],
    [
        {
            "_id": "5e92c4ec3d0b35496c7722fb",
            "latitude": 27.89842,
            "longitude": 88.09078,
            "time": 1586676972262
        }
    ]
]

### ID để test ping vị trí của con
#### 5e92c35b3d0b35496c7722f6
#### 5e92c4b13d0b35496c7722fa
#### Route: /children/ping
#### Type: POST
#### Body:
latitude: ,
longitude: ,
id: ,
##### JSON res:
{
    "savedPosition": {
        "_id": "5e92c4ec3d0b35496c7722fb",
        "latitude": 27.89842,
        "longitude": 88.09078,
        "children": "5e92c4b13d0b35496c7722fa",
        "time": 1586676972262,
        "__v": 0
    }
}
