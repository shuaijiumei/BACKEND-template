# APis
baseURL: 'localhost:8088/api'
## 用户相关
```json
登录
"post /users/login"

// 入参
{
  "user": {
    "email": "740514874@qq.com", // 用户email
    "password": "12314"        // 用户密码
}
}

//  返回参数
{
  "bio": null, // 用户个人简介
  "image": null,  // 用户图片
  "_id": "610ce7cc87bd366ba8da9b98", // 数据库唯一id
  "username": "tby",  // 用户名称
  "email": "740514874@qq.com",  // 用户email
  "token": "e"  //  token 
}
```
```json
注册
"post /users"

// 入参
{
  "user": {
    "username": "hwy",
    "email": "hwy@qq.com",
    "password": "hwy123456",
    "bio": "i am hwy",
    "image": null
  }
}

// 返回参数
{
  "user": {
    "bio": "i am hwy",
    "image": null,
    "_id": "6110c13cc4f0bb59bcc276f0",
    "username": "hwy",
    "email": "hwy@qq.com",
    "createAt": "2021-08-09T05:46:36.092Z",
    "updateAt": "2021-08-09T05:46:36.092Z",
    "__v": 0
  }
}
```
```json
获取当前登录用户

"get /user"
token Bearer 类型
// 入参
无 请求带入token

// 返回参数
{
  "user": {
    "bio": "i am hwy",
    "image": null,
    "_id": "6110c13cc4f0bb59bcc276f0",
    "username": "hwy",
    "email": "hwy@qq.com",
    "createAt": "2021-08-09T05:46:36.092Z",
    "updateAt": "2021-08-09T05:46:36.092Z",
    "__v": 0
  }
}
```
```json
更新用户
"put /user"

还没做 根据信息传入更新用户信息
```
```json
"PUT /user"
// 入参
{
  "user": {
    "bio": "i am hwy",  // 个人简介
    "image": null,    // image URL CDN
    "username": "hwy",  // 用户昵称
    "password": "1234"  // 用户密码
  }
}

// 返参
{
  "user": {
    "bio": "i am hwy",
    "image": null,
    "_id": "6110c13cc4f0bb59bcc276f0",
    "username": "hwy",
    "email": "hwy@qq.com",
    "createAt": "2021-08-09T05:46:36.092Z",
    "updateAt": "2021-08-09T05:46:36.092Z",
    "__v": 0
  }
}
```