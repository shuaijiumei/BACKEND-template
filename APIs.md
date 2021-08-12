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
// 入参
{
  "user":{
    "bio": "my short introduce",  // 简介
    "image": "my photo",          // 图片的url
    "username": "my tby"          // nickname
  }
}
// 返回用户的所有信息 除开密码
{
  "user": {
    "bio": "my short introduce",
    "image": "my photo",
    "fans": [],
    "stars": [],
    "favorite": [
      "6114d3373263db2598f94a21"
    ],
    "_id": "6114b4152f3e231ae8b0d16b",
    "username": "my tby",
    "email": "740514874@qq.com",
    "createAt": "2021-08-12T05:39:33.810Z",
    "updateAt": "2021-08-12T05:39:33.811Z",
    "__v": 17
  }
}

```
```json
更新用户信息
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
```json
关注用户
"POST /profiles/:username/follow"
// 201
{
  "msg": "关注成功！"
}

// 400
{
  "error": "您已经关注过该用户"
}
```
```json
取消关注
"delete /profiles/:username/follow"
// 204

// 400
{
  "error": "您没有关注该用户"
}
```
```json
获取用户资料
"GET /profiles/:username"
// 未进行级联查询，返回都是id
{
  "follower": {
    "bio": null,
    "image": null,
    "fans": [], 
    "stars": [],
    "favorite": [],
    "_id": "61123193d4f01b60584678de",
    "username": "hwy",
    "email": "hwy123456x@163.com",
    "createAt": "2021-08-10T07:58:11.798Z",
    "updateAt": "2021-08-10T07:58:11.798Z",
    "__v": 8
  }
}
```

## 文章相关
```json
获取文章  筛选文章 根据tag 作者 数量
"get /articles"
// 入参 采用 query
{
  "author":"tby",
  "tag": "6114c8093263db2598f94a06"  // 传标签id 目前只支持一个标签查询
}
// 返回
{
  "articles": [
    {
      "tagList": [
        {
          "_id": "6114c81e3263db2598f94a0b",
          "tagName": "nodejs",
          "createAt": "2021-08-12T07:05:02.443Z",
          "updateAt": "2021-08-12T07:05:02.443Z",
          "author": "6114b4152f3e231ae8b0d16b",
          "__v": 0
        },
        {
          "_id": "6114c8093263db2598f94a06",
          "tagName": "movie",
          "createAt": "2021-08-12T07:04:41.955Z",
          "updateAt": "2021-08-12T07:04:41.955Z",
          "author": "6114b4152f3e231ae8b0d16b",
          "__v": 0
        }
      ],  // 文章打上的标签
      "favoritesCount": 0,
      "_id": "6114d668a3025f5bb4b95a26",
      "title": "tby-article-test",
      "description": "test article",
      "body": "article body",
      "createAt": "2021-08-12T08:06:00.895Z",
      "updateAt": "2021-08-12T08:06:00.895Z",
      "author": {
        "bio": "i am tby",
        "image": null,
        "fans": [],
        "stars": [],
        "favorite": [],
        "_id": "6114b4152f3e231ae8b0d16b",
        "username": "tby",
        "email": "740514874@qq.com",
        "createAt": "2021-08-12T05:39:33.810Z",
        "updateAt": "2021-08-12T05:39:33.811Z",
        "__v": 10
      }, // 作者
      "__v": 0
    }
  ],
  "articlesCount": 3 // 文章总数
}

```
```json
获取指定文章
"get /articles/:articleId"
// 无入参
// 返回 已经实现级联查询
{
  "article": {
    "tagList": [
      {
        "_id": "6114c81e3263db2598f94a0b",
        "tagName": "nodejs",
        "createAt": "2021-08-12T07:05:02.443Z",
        "updateAt": "2021-08-12T07:05:02.443Z",
        "author": "6114b4152f3e231ae8b0d16b",
        "__v": 0
      },
      {
        "_id": "6114c8093263db2598f94a06",
        "tagName": "movie",
        "createAt": "2021-08-12T07:04:41.955Z",
        "updateAt": "2021-08-12T07:04:41.955Z",
        "author": "6114b4152f3e231ae8b0d16b",
        "__v": 0
      }
    ],
    "favoritesCount": 0,
    "_id": "6114d668a3025f5bb4b95a26",
    "title": "tby-article-test",
    "description": "test article",
    "body": "article body",
    "createAt": "2021-08-12T08:06:00.895Z",
    "updateAt": "2021-08-12T08:06:00.895Z",
    "author": {
      "bio": "i am tby",
      "image": null,
      "fans": [],
      "stars": [],
      "favorite": [],
      "_id": "6114b4152f3e231ae8b0d16b",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-12T05:39:33.810Z",
      "updateAt": "2021-08-12T05:39:33.811Z",
      "__v": 10
    },
    "__v": 0
  }
}
```
```json
新建文章
"POST /articles/"
// 入参
{
  "article": {
    "title": "tby-article-test",
    "description": "test article",  // 简介
    "body": "article body",  
    "tagList": ["nodejs","movie"] // 支持数组，用户已经创建过的标签
  }
}
// 返回 已经实现级联查询
{
  "article": {
    "tagList": [
      {
        "_id": "6114c81e3263db2598f94a0b",
        "tagName": "nodejs",
        "createAt": "2021-08-12T07:05:02.443Z",
        "updateAt": "2021-08-12T07:05:02.443Z",
        "author": "6114b4152f3e231ae8b0d16b",
        "__v": 0
      },
      {
        "_id": "6114c8093263db2598f94a06",
        "tagName": "movie",
        "createAt": "2021-08-12T07:04:41.955Z",
        "updateAt": "2021-08-12T07:04:41.955Z",
        "author": "6114b4152f3e231ae8b0d16b",
        "__v": 0
      }
    ],
    "favoritesCount": 0,
    "_id": "6114d668a3025f5bb4b95a26",
    "title": "tby-article-test",
    "description": "test article",
    "body": "article body",
    "createAt": "2021-08-12T08:06:00.895Z",
    "updateAt": "2021-08-12T08:06:00.895Z",
    "author": {
      "bio": "i am tby",
      "image": null,
      "fans": [],
      "stars": [],
      "favorite": [],
      "_id": "6114b4152f3e231ae8b0d16b",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-12T05:39:33.810Z",
      "updateAt": "2021-08-12T05:39:33.811Z",
      "__v": 10
    },
    "__v": 0
  }
}
```
```json
更新文章
"PUT /articles/:articleId"
// 入参
{
  "article": {
    "title": "handsome boy",
    "tagList": ["ObjectId"] // 更新标签需要传入标签Id
  }
}

// 返回参数 未作级联查询，不需要从这里获取数据
{ 
  "article": {
    "tagList": [
      "6114c81e3263db2598f94a0b",
      "6114c8093263db2598f94a06"
    ],
    "favoritesCount": 0,
    "_id": "6114d668a3025f5bb4b95a26",
    "title": "handsome boy",
    "description": "test article",
    "body": "article body",
    "createAt": "2021-08-12T08:06:00.895Z",
    "updateAt": "2021-08-12T08:06:00.895Z",
    "author": "6114b4152f3e231ae8b0d16b",
    "__v": 0
  }
}
```
```json
删除文章
"delete /articles/:articleId"
// 不需要入参
// 返回204
```

## 评论相关
```json
添加评论
"POST /:articleId/comments"
// 入参
{
  "comment":{
    "commentText":"我是超级好宝宝!!!lallalal"
  }
}
// 返回 不返回文章的详细信息
{
  "comment": {
    "_id": "6114ddefe8965e3e4847a301",
    "commentText": "我!lallalal",
    "createAt": "2021-08-12T08:38:07.875Z",
    "updateAt": "2021-08-12T08:38:07.875Z",
    "author": {
      "bio": "i am tby",
      "image": null,
      "fans": [],
      "stars": [],
      "favorite": [],
      "_id": "6114b4152f3e231ae8b0d16b",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-12T05:39:33.810Z",
      "updateAt": "2021-08-12T05:39:33.811Z",
      "__v": 10
    },
    "article": "6114c7df3263db2598f94a01",
    "__v": 0
  }
}
```
```json
获取评论
"GET /:articleId/comments"
// 返回 包括作者详细信息
{
  "comments": [
    {
      "_id": "6114dc8f35e18051e839f359",
      "commentText": "我是超级好宝宝!!!lallalal",
      "createAt": "2021-08-12T08:32:15.972Z",
      "updateAt": "2021-08-12T08:32:15.973Z",
      "author": {
        "bio": "i am tby",
        "image": null,
        "fans": [],
        "stars": [],
        "favorite": [],
        "_id": "6114b4152f3e231ae8b0d16b",
        "username": "tby",
        "email": "740514874@qq.com",
        "createAt": "2021-08-12T05:39:33.810Z",
        "updateAt": "2021-08-12T05:39:33.811Z",
        "__v": 10
      },
      "article": "6114c7df3263db2598f94a01",
      "__v": 0
    },
    {
      "_id": "6114ddefe8965e3e4847a301",
      "commentText": "我!lallalal",
      "createAt": "2021-08-12T08:38:07.875Z",
      "updateAt": "2021-08-12T08:38:07.875Z",
      "author": {
        "bio": "i am tby",
        "image": null,
        "fans": [],
        "stars": [],
        "favorite": [],
        "_id": "6114b4152f3e231ae8b0d16b",
        "username": "tby",
        "email": "740514874@qq.com",
        "createAt": "2021-08-12T05:39:33.810Z",
        "updateAt": "2021-08-12T05:39:33.811Z",
        "__v": 10
      },
      "article": "6114c7df3263db2598f94a01",
      "__v": 0
    }
  ]
}
```
```json
删除评论
"delete /articles/:articleId/comments/:id"
// :id 评论id
```

## 点赞收藏相关
```json
给文章点赞 不需要登录 后期优化 只返回点赞数量
"POST /articles/:articleId/like"
// 返回
{
  "article": {
    "tagList": [],
    "favoritesCount": 1,
    "_id": "6114c7df3263db2598f94a01",
    "title": "何欣臭姐姐",
    "description": "test article",
    "body": "article body",
    "createAt": "2021-08-12T07:03:59.956Z",
    "updateAt": "2021-08-12T07:03:59.956Z",
    "author": "6114b4152f3e231ae8b0d16b",
    "__v": 0
  }
}
```
```json
收藏文章
"POST /:articleId/favorite"
//返回 收藏成功 201
{
  "msg": "收藏成功！"
}
//返回 已经收藏 400
{
  "error": "您已经收藏了该文章"
}
```
```json
"delete /articles/:articleId/favorite"
// 204
// 收藏成功

// 400
{
  "error": "您没有收藏该文章"
}
```

## 标签相关
```json
新建标签
"POST /tags"
{
  "tag": {
    "tagName": "nodejs"
  }
}
// 返回 附带用户信息
{
  "tag": {
    "_id": "6114e635c96b6755fc258ad3",
    "tagName": "node",
    "createAt": "2021-08-12T09:13:25.428Z",
    "updateAt": "2021-08-12T09:13:25.428Z",
    "author": {
      "bio": "i am tby",
      "image": null,
      "fans": [],
      "stars": [],
      "favorite": [
        "6114d3373263db2598f94a21"
      ],
      "_id": "6114b4152f3e231ae8b0d16b",
      "username": "tby",
      "email": "740514874@qq.com",
      "createAt": "2021-08-12T05:39:33.810Z",
      "updateAt": "2021-08-12T05:39:33.811Z",
      "__v": 17
    },
    "__v": 0
  }
}

// 400
{
"error": "已经存在同名标签"
}
```
```json
更新标签
"PUT /tags/:tagId"
// 入参
{
  "tag": {
    "tagName": "nodePPP"
  }
}

// 返回
{
  "tag": {
    "_id": "6114e7ca5017fa18cc662571",
    "tagName": "nodePPP",
    "createAt": "2021-08-12T09:20:10.921Z",
    "updateAt": "2021-08-12T09:20:10.921Z",
    "author": "6114b4152f3e231ae8b0d16b",
    "__v": 0
  }
}
```
```json
删除标签
"delete /tags/:tagId"
// 404
{
  "error": "标签id错误！请检查"
}
204
```
