# APis
baseURL: 'localhost:8088/api'
还剩 文章分类， 收藏文章， 关注用户 等三个功能没做
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
    "userInfo": {
      "bio": null,
      "image": null,
      "_id": "611230b2d4f01b60584678da",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-10T07:54:26.413Z",
      "updateAt": "2021-08-10T07:54:26.413Z",
      "__v": 0
    },
    "tagList": [
      {
        "_id": "61124208f34c7a5f542d93cb",
        "tagName": "reactjs",
        "createAt": "2021-08-10T09:08:24.949Z",
        "updateAt": "2021-08-10T09:08:24.949Z",
        "author": "611230b2d4f01b60584678da",
        "__v": 0
      }
    ]
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

## 文章相关
```json
获取文章  筛选文章 根据tag 作者 数量
"get /articles/"
// 入参
{
  
}
```
```json
新建文章
"POST /articles/"
// 入参
{
  "article": {
    "title": "tby",
    "description": "test article", // 简短描述
    "body": "article body",
    "tagName": ["reactjs"] // 数组
  }
}
// 返回
{
  "article": {
    "tagList": [
      {
        "_id": "61124208f34c7a5f542d93cb",
        "tagName": "reactjs",
        "createAt": "2021-08-10T09:08:24.949Z",
        "updateAt": "2021-08-10T09:08:24.949Z",
        "author": "611230b2d4f01b60584678da",
        "__v": 0
      }
    ],
    "favoritesCount": 0,
    "_id": "61124b4f5bc79859f487a19a",
    "title": "tby",
    "description": "test article",
    "body": "article body",
    "createAt": "2021-08-10T09:47:59.500Z",
    "updateAt": "2021-08-10T09:47:59.500Z",
    "author": {
      "bio": null,
      "image": null,
      "_id": "611230b2d4f01b60584678da",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-10T07:54:26.413Z",
      "updateAt": "2021-08-10T07:54:26.413Z",
      "__v": 0
    },
    "__v": 0
  }
}
```
