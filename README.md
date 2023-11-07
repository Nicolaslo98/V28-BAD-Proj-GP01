# SELECT * FROM round JOIN game ON round.id = game.round_id WHERE round.id = ?

API development

#1.1 login part

url: /login

method: POST

###request body: 
```
{
    "username" : "username"

    "password" : "username"
}
```
###response body:

```
{
    "success" : true,

    "message" : login success
}
{
    session.user : "username"
}
```
```
{
    "success" : false,

    "message" : invalid username or password
}
```