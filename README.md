#1
SELECT * FROM round JOIN game ON round.id = game.round_id WHERE round.id = ?

History Controller
User Controller
Calculator Controller

#API development

#1.1 Create player part

url: /api/player

method: POST

###request body: 
```
{
    "username" : "username"

    "user_image" : "user_image"
}
```
###response body:

```
{
    "success" : true,

    "message" : create user successfully
}
```
```
{
    "success" : false,

    "message" : fail to create user
}
```
```
{
    "success" : false,

    "message" : has same username on database
}
```

#1.2 Get player profile part

url: /api/player/:id

method: GET

###request body: 
```
{
    "username" : "username"

    "user_image" : "user_image"
}
```
###response body:

```
{
    "success" : true,

    "message" : get user profile successfully
}
```
```
{
    "success" : false,

    "message" : fail to get profile
}
```
#1.3 Delete player profile part

url: /api/player/:id

method: Delete

###request body: 
```
{
    "player_id" : "player_id"
}
```
###response body:

```
{
    "success" : true,

    "message" : delete user profile successfully
}
```
```
{
    "success" : false,

    "message" : fail to delete profile
}
```


#2.1 camera to calculate part
url: /api/camera

method: POST

###request body: 
```
{
    "score" : number
    "win player" : "player"
    "lose player" : "player"
    "round_id" : "round_id"
    "game_id" : "game_id"
}
```
###response body:

```
{
    "success" : true,

    "message" : record successfully
}
```
```
{
    "success" : false,

    "message" : fail to record
}
```

#3 Call History part
url: /api/history

method: GET

###request body: 
```
{
    "player_id" : "player_id"
}
```
###response body:

```
{
    "total_score" : number

    "message" : get total score successfully
}
```
```
{
    "success" : false,

    "message" : fail to get total score
}
```