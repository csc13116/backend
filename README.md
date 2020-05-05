# Server - Find my children
## Host link:
[https://dacnpm-backend.herokuapp.com/](https://dacnpm-backend.herokuapp.com/)
## APIs:
[https://documenter.getpostman.com/view/8829864/Szmb7L6L](https://documenter.getpostman.com/view/8829864/Szmb7L6L)
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
