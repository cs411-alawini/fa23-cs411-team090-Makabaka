# Database conceptual design

## UML diagram

![UML_diagram](images/UML.png)

## Entities

There are a total of 5 entities for our database design. Each is explained in detail as follows.

### 1. GameInfo

This is an entity regarding game information, with 18 attributes.

- **QueryID**
    - primary key
    - e.x. `10`
- QueryName
    - e.x. `Counter-Strike`
- ReleaseDate
    - e.x. `Nov 1 2000`
- RequiredAge
    - e.x. `0` or `17` ......
- RecommendationCount
    - e.x. `68991`
- ControllerSupport
    - TRUE / FALSE
- IsFree
    - TRUE / FALSE
- PriceCurrency
    - can be NULL if `IsFree` is TRUE
    - Type of currency
- PriceInitial
    - init price
- PriceFinal
    - Current price
- SupportURL
    - can be NULL
- DetailedDescrip
    - Most are descriptions, but can be NULL
- HeaderImage
    - e.x. `http://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg?t=1447887426`
- Reviews
    - For game reviewers, it can be NULL
- SupportedLanguages
    - Can't use space split, otherwise "Simplified Chinese Traditional Chinese" will be an error.

### 2. Genres

This is an entity regarding genres information.

- **GenresID**
    - PK(primary key)

- CategorySinglePlayer
    - TRUE / FALSE
- CategoryMultiplayer
    - TRUE / FALSE
- CategoryMMO
    - TRUE / FALSE
- CategoryVRSupport
    - TRUE / FALSE
- GenreIsNonGame
    - TRUE / FALSE
- GenreIsIndie
    - TRUE / FALSE
- GenreIsAction
    - TRUE / FALSE
- GenreIsAdventure
    - TRUE / FALSE
- GenreIsCasual
    - TRUE / FALSE
- GenreIsStrategy
    - TRUE / FALSE
- GenreIsRPG
    - TRUE / FALSE
- GenreIsSimulation
    - TRUE / FALSE
- GenreIsFreeToPlay
    - TRUE / FALSE
- GenreIsSports
    - TRUE / FALSE
- GenreIsRacing
    - TRUE / FALSE
- GenreIsMassivelyMultiplayer
    - TRUE / FALSE

### 3. Platform

This is an entity regarding platform information, with four attributes.

- **PlatformID**
    - primary key
    - e.x. `1`, `2` ..., `123`

- PlatformName
    - Now, 3 choices: Windows / Linux / Mac
- MinReqsText
    - can be NULL
- RecReqsText
    - can be NULL

### 4. DeveloperInfo

This is an entity regarding developer information, with three attributes.

- **DeveloperId**
    - prime key
    - e.x. `1`, `2` ..., `123`
- DeveloperName
    - e.x. `Value`
- Website
    - can be NULL

### 5. UserInfo

This is an entity regarding user login information, with four attributes.

1. **UserID**: a unique identifier to distinguish between users. This should be a string attribute and primary key for this table. NetId will serve as the username for login page.
2. UserName: a string attribute, the name of the user.
3. UserEmail: a string attribute, the email address of the user.
4. Password: a string attribute, password for login the platform.

This entity is designed according to the assumptions:
1. Every user in this platform will have a unique UserID and cannot be modified.
2. Users can change their password, which is the only allowed update operation for this entity table.
3. Once the user entered the UserName or UserEmail and Password, the system will automatically log in and to home page.


## Relations

There are a total of 5 relations in our database design, which will addressed in details as follows:

### 1. Favorites

`Favorites` is a relation between `UserInfo` and `GameInfo` to mark the favorite games of each user. This is a **many-to-many** relation, for each user can have multiple favorite games, and each game can be favorited by multiple users. However, we do have restrictions based on the following assumptions:
1. One user can only favorite the same game once. This is to ensure that `UserID` and `QueryID` combined can uniquely identify a favorite record.

### 2. Comments

`Comments` is a relation between `UserInfo` and `GameInfo` to mark the comments of each user on each game. The relation has the following attributes:
1. CommentID: a unique identifier to distinguish between comments. This should be a string attribute and primary key for this table. This attribute will be generated by the system automatically.
2. CommentText: a string attribute, the content of the comment.
3. Rating: an integer attribute, the rating of the game given by the user. This should be an integer between 1 and 5.
4. CommentDate: a string attribute, the date when the comment is posted. This should be a string following the format of `YYYY-MM-DD`.
5. UserID: Foreign key to `UserInfo`, to identify the user who posted the comment.
6. QueryID: Foreign key to `GameInfo`, to identify the game which the comment is posted on.

This is a **many-to-many** relation, for each user can have multiple comments on multiple games, and each game can be commented by multiple users.


### 3. Develop

`Develop` is a relation between `DeveloperInfo` and `GameInfo` to mark the games developed by each developer. This is a **many-to-many** relation, for each developer can develop multiple games, and each game can be developed by multiple developers.

### 4. GamePlatform

`GamePlatform` is a relation between `GameInfo` and `Platform` to mark the platforms that each game supports. This is a **one-to-many** relation, for each game can support multiple platforms, with its minimum and recommended requirements for each platform. But each platform with requirements can only be supported by one game.

### 5. GameGenres

`GameGenres` is a relation between `GameInfo` and `Genres` to mark the genres that each game belongs to. This is a **one-to-one** relation.



## Relational Schema
The database design will be converted into 10 tables.

**1. UserInfo**

```
UserInfo(
    UserID VARCHAR(255) [PK],
    UserName VARCHAR(255),
    UserEmail VARCHAR(255),
    Password VARCHAR(255)
)
```

**2. GameInfo**

```mysql
GameInfo(
    QueryID INT [PK],
    QueryName VARCHAR(255),
    ReleaseDate VARCHAR(255),
    RequiredAge INT,
    RecommendationCount INT,
    ControllerSupport BOOLEAN,
    IsFree BOOLEAN,
    PriceCurrency VARCHAR(255),
    PriceInitial INT,
    PriceFinal INT,
    SupportURL VARCHAR(255),
    DetailedDescrip VARCHAR(255),
    HeaderImage VARCHAR(255),
    Reviews VARCHAR(255),
    SupportedLanguages VARCHAR(255)
)
```

**3. Genres**

```mysql
Genres(
    GenresID INT [PK],
    CategorySinglePlayer BOOLEAN,
    CategoryMultiplayer BOOLEAN,
    CategoryMMO BOOLEAN,
    CategoryVRSupport BOOLEAN,
    GenreIsNonGame BOOLEAN,
    GenreIsIndie BOOLEAN,
    GenreIsAction BOOLEAN,
    GenreIsAdventure BOOLEAN,
    GenreIsCasual BOOLEAN,
    GenreIsStrategy BOOLEAN,
    GenreIsRPG BOOLEAN,
    GenreIsSimulation BOOLEAN,
    GenreIsFreeToPlay BOOLEAN,
    GenreIsSports BOOLEAN,
    GenreIsRacing BOOLEAN,
    GenreIsMassivelyMultiplayer BOOLEAN
)
```

**4. Platform**

```mysql
Platform(
    PlatformID INT [PK],
    PlatformName VARCHAR(255),
    MinReqsText VARCHAR(255),
    RecReqsText VARCHAR(255)
)
```

**5. DeveloperInfo**

```mysql
DeveloperInfo(
    DeveloperId INT [PK],
    DeveloperName VARCHAR(255),
    Website VARCHAR(255)
)
```

**6. Favorites**

```mysql
Favorites(
    UserID VARCHAR(255) [PK, FK to UserInfo.UserID],
    QueryID INT [PK, FK to GameInfo.QueryID]
)
```

**7. Comments**

```mysql
Comments(
    CommentID VARCHAR(255) [PK],
    CommentText VARCHAR(255),
    Rating INT,
    CommentDate VARCHAR(255),
    UserID VARCHAR(255) [FK to UserInfo.UserID],
    QueryID INT [FK to GameInfo.QueryID]
)
```

**8. Develop**

```mysql
Develop(
    DeveloperId INT [PK, FK to DeveloperInfo.DeveloperId],
    QueryID INT [PK, FK to GameInfo.QueryID]
)
```

**9. GamePlatform**

```mysql
GamePlatform(
    QueryID INT [PK, FK to GameInfo.QueryID],
    PlatformID INT [PK, FK to Platform.PlatformID],
    MinReqsText VARCHAR(255),
    RecReqsText VARCHAR(255)
)
```

**10. GameGenres**

```mysql
GameGenres(
    QueryID INT [PK, FK to GameInfo.QueryID],
    GenresID INT [PK, FK to Genres.GenresID]
)
```


## MySQL DDL commands

```mysql
# Entities


# Relationships


```