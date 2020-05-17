# qdata

## usage
```sh
npm i qdata -g
qdata test.xlsx 0 B A 1 7 C
```

## args
fileName sheetNumber keyColumn valueColumn startRow endRow typeColumn

## output 
### obj.json
```json
{
  "id": "ID",
  "firstName": "名",
  "lastName": "姓",
  "email": "邮箱",
  "gender": "性别",
  "ipAddress": "IP 地址",
  "birthday": "生日"
}
```
### prop.json

```json
[
  {
    "label": "ID",
    "prop": "id"
  },
  {
    "label": "名",
    "prop": "firstName"
  },
  {
    "label": "姓",
    "prop": "lastName"
  },
  {
    "label": "邮箱",
    "prop": "email"
  },
  {
    "label": "性别",
    "prop": "gender"
  },
  {
    "label": "IP 地址",
    "prop": "ipAddress"
  },
  {
    "label": "生日",
    "prop": "birthday"
  }
]
```

### mock.json
```json
{
  "id": "@word(3,8)",
  "firstName": "@word(3,8)",
  "lastName": "@word(3,8)",
  "email": "@email",
  "gender|1-100": 1,
  "ipAddress": "@word(3,8)",
  "birthday": "@date(\"yyyy-MM-dd\")"
}
``` 
