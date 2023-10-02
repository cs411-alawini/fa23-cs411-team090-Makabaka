# Database conceptual design

## UML diagram

![UML_diagram](images/UML.png)


## Entities

There are a total of 6 entities for our database design. Each is explained in detail as follows.

### 1. GameInfo

This is an entity regarding game information, with 18 attributes.
 
1. **QueryID**: a unique identifier to distinguish between queries. This should be a numeric attribute and primary key for this table. 
2. QueryName: a string attribute, the name of the query.
3. ReleaseDate: a date attribute, the release date of the query.
4. RequiredAge: a numeric attribute, the required age for the query.
5. RecommendationCount: a numeric attribute, the number of recommendations for the query.
6. ControllerSupport: a boolean attribute, indicating whether the query supports controller input (TRUE) or not (FALSE).
7. IsFree: a boolean attribute, indicating whether the query is free (TRUE) or not (FALSE)
8. PriceCurrency: a string attribute, the type of currency for the query. This attribute can be NULL if IsFree is TRUE.
9. PriceInitial: a numeric attribute, the initial price of the query.
10. PriceFinal: a numeric attribute, the current price of the query.
11. SupportURL: a string attribute, the support URL for the query. This attribute can be NULL.
12. DetailedDescrip: a string attribute, the detailed description of the query. Most are descriptions, but this attribute can be NULL.
13. HeaderImage: a string attribute, the URL of the header image for the query.
14. Reviews: a string attribute, for game reviewers' comments. This attribute can be NULL.
15. SupportedLanguages: a string attribute, the supported languages for the query. Note that spaces should not be used as separators to avoid errors (e.g., "Simplified Chinese Traditional Chinese").

### 2. Genres

This is an entity regarding genre information.
1. **GenresID**:a unique identifier to distinguish between genres. This should be a numeric attribute and primary key for this table.
2. GenreIsSinglePlayer: a boolean attribute, indicating whether the genre supports single-player mode (TRUE) or not (FALSE).
3. GenreIsMultiplayer: a boolean attribute, indicating whether the genre supports multiplayer mode (TRUE) or not (FALSE).
4. GenreIsMMO: a boolean attribute, indicating whether the genre supports massively multiplayer online (MMO) mode (TRUE) or not (FALSE).
5. GenreIsVRSupport: a boolean attribute, indicating whether the genre supports virtual reality (VR) (TRUE) or not (FALSE).
6. GenreIsNonGame: a boolean attribute, indicating whether the genre is a non-game (TRUE) or not (FALSE).
7. GenreIsIndie: a boolean attribute, indicating whether the genre is indie (TRUE) or not (FALSE).
8. GenreIsAction: a boolean attribute, indicating whether the genre is action (TRUE) or not (FALSE).
9. GenreIsAdventure: a boolean attribute, indicating whether the genre is adventure (TRUE) or not (FALSE).
10. GenreIsCasual: a boolean attribute, indicating whether the genre is casual (TRUE) or not (FALSE).
11. GenreIsStrategy: a boolean attribute, indicating whether the genre is strategy (TRUE) or not (FALSE).
12. GenreIsRPG: a boolean attribute, indicating whether the genre is a role-playing game (RPG) (TRUE) or not (FALSE).
13. GenreIsSimulation: a boolean attribute, indicating whether the genre is simulation (TRUE) or not (FALSE).
14. GenreIsFreeToPlay: a boolean attribute, indicating whether the genre is free to play (TRUE) or not (FALSE).
15. GenreIsSports: a boolean attribute, indicating whether the genre is sports (TRUE) or not (FALSE).
16. GenreIsRacing: a boolean attribute, indicating whether the genre is racing (TRUE) or not (FALSE).
17. GenreIsMassivelyMultiplayer: a boolean attribute, indicating whether the genre is massively multiplayer (TRUE) or not (FALSE).





### 3. Platform

This is an entity regarding platform information, with four attributes.

1. **PlatformID**:a unique identifier to distinguish between platforms. This should be a numeric attribute and primary key for this table.
2. PlatformName: a string attribute, the name of the platform. There are currently three choices: Windows, Linux, and Mac. 
3. MinReqsText: a string attribute, the minimum requirements text for the platform. This attribute can be NULL, meaning it is optional and may not always have a value.
4.  RecReqsText: a string attribute, the recommended requirements text for the platform. This attribute can also be NULL, indicating that it is optional and may not always have a value.

### 4. DeveloperInfo

This is an entity regarding developer information, with three attributes.

1. **DeveloperID**: a unique identifier to distinguish between developers. This should be a string attribute and primary key for this table.
2. DeveloperName: a string attribute, the name of the developer.
3.  Website: a string attribute, the website associated with the developer. This attribute can be NULL, meaning it is optional and may not always have a value.



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

### 6. DLCInfo

This is an entity regarding DLC information, with five attributes.

1. **DLCID**: a unique identifier to distinguish between DLCs. This should be a string attribute and primary key for this table. This attribute will be generated by the system automatically.
2. QueryID: Foreign key to `GameInfo`, to identify the game which the DLC belongs to.
3. DLCName: a string attribute, the name of the DLC.
4. DLCPriceCurrency: a string attribute, the currency of the DLC price.
5. DLCPrice: an numeric attribute, the price of the DLC.


## Relations

There are a total of 6 relations in our database design, which will addressed in details as follows:

### 1. Favorites

`Favorites` is a relation between `UserInfo` and `GameInfo` to mark the favorite games of each user. This is a **many-to-many** relation, for each user can have multiple favorite games, and each game can be favorited by multiple users. However, we do have restrictions based on the following assumptions:
1. One user can only favorite the same game once. This is to ensure that `UserID` and `QueryID` combined can uniquely identify a favorite record.

### 2. Comments

`Comments` is a relation between `UserInfo` and `GameInfo` to mark the comments of each user on each game.This is a **many-to-many** relation, for each user can have multiple comments on multiple games, and each game can be commented by multiple users.
 The relation has the following attributes:
1. CommentID: a unique identifier to distinguish between comments. This should be a string attribute and primary key for this table. This attribute will be generated by the system automatically.
2. CommentText: a string attribute, the content of the comment.
3. Rating: an integer attribute, the rating of the game given by the user. This should be an integer between 1 and 5.
4. CommentDate: a string attribute, the date when the comment is posted. This should be a string following the format of `YYYY-MM-DD`.
5. UserID: Foreign key to `UserInfo`, to identify the user who posted the comment.
6. QueryID: Foreign key to `GameInfo`, to identify the game which the comment is posted on.



### 3. Develop

`Develop` is a relation between `DeveloperInfo` and `GameInfo` to mark the games developed by each developer. This is a **many-to-many** relation, for each developer can develop 0 or more games, and each game can be developed by 1 or more developers.

### 4. GamePlatform

`GamePlatform` is a relation between `GameInfo` and `Platform` to mark the platforms that each game supports. This is a **one-to-many** relation, for each game can support multiple platforms, with its minimum and recommended requirements for each platform. But each platform with requirements can only be supported by one game.

### 5. GameGenres

`GameGenres` is a relation between `GameInfo` and `Genres` to mark the genres that each game belongs to. This is a **one-to-one** relation.


### 6. HaveDLC

`HaveDLC` is a relation between `GameInfo` and `DLCInfo` to mark the DLCs that each game has. This is a **one-to-many** relation, for each game can have 0 or more DLCs, but each DLC can only belong to one game.


## Relational Schema
The database design will be converted into 11 tables.

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

**11. DLCInfo**

```mysql
DLCInfo(
    DLCID INT [PK],
    QueryID INT [FK to GameInfo.QueryID],
    DLCName VARCHAR(255),
    DLCPriceCurrency VARCHAR(255),
    DLCPrice INT
)
```


## MySQL DDL commands

```mysql
# Entities


# Relationships


```
