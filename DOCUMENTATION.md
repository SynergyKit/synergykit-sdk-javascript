
# SynergyKit JavaScript SDK

<p align="left" style="margin-bottom:0;" >
<img src="https://synergykit.blob.core.windows.net/synergykit/synergykitlogo.png" alt="Synergykit" title="Synergykit" width="33%">
</p>


Backend as a Service SynergyKit for **fast and simple mobile/web/desktop applications development**. SynergyKit allows enterpreneurs implement an idea to project fast and low cost like Lean Startup, validates and runs product.

We know how hard can be to work with untried API, so we prepared SDKs for mostly used platforms.

**Another SDKs**

- [Android SDK](https://github.com/SynergyKit/synergykit-sdk-android)
- [iOS SDK](https://github.com/SynergyKit/synergykit-sdk-ios)
- [Node.js SDK](https://github.com/SynergyKit/synergykit-sdk-nodejs)

**Table of content**

[TOC]


## SynergyKit Initialization
Include the module:

```html
<script type="text/javascript" src="https://synergykit.blob.core.windows.net/synergykit/synergykit.min.js"></script>
```
Than initialize SynergyKit:
```javascript
Synergykit.Init(your_application_url, your_application_key, {
    debug: true // You should set it to false in production
});
```

## Documents
Documents are data saved in collections. Collections are basically tables in database where you can store your data. By sending requests to the documents endpoint, you can list, create, update or delete documents.

### Create new document

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**
| * | ? | Optional parameters | optional
```javascript
// Create instance of Data object and to the parametr specify the collection where to save
var spaceShip = Synergykit.Data("SpaceShips");

// Set any properities you want
spaceShip.set("type", "Star Fighter");
spaceShip.set("code", "ARC-170");
spaceShip.set("description", "Protecting the skies over Republic worlds were specialized clone fighter forces flying the latest in starfighter technology.");

// And save data to SynergyKit
spaceShip.save({
    success: function(spaceShip, statusCode) {
        // Your implementation after the space ship is saved
        console.log(spaceShip.get("type"));
    },
    error: function(error, statusCode) {
        // Your implementation if the save fails
    }
});
```
### Retrieve an existing document by ID

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**
|_id |string| API identificator | **required**

```javascript
var spaceShip = Synergykit.Data("SpaceShips");

// Set any properities you want
spaceShip.set("_id", "weh80EjefeEFEoejofe880");

// And fetch data from SynergyKit
spaceShip.fetch({
    success: function(spaceShip, statusCode) {
        // Your implementation after the space ship is fetched
    },
    error: function(error, statusCode) {
        // Your implementation if the fetch fails
    }
});
```
### Update document
Save method executes `PUT` request if `_id` is set.

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**
|_id |string| API identificator | **required**
| * | ? | Optional parameters | optional

```javascript
var spaceShip = Synergykit.Data("SpaceShips");

// Set any properities you want
spaceShip.set("_id", "weh80EjefeEFEoejofe880");
spaceShip.set("pilor", "Anakin");

spaceShip.save({
    success: function(spaceShip, statusCode) {
        // Your implementation after the space ship is updated
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```
### Delete document

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**
|_id |string| API identificator | **required**

```javascript
var spaceShip = Synergykit.Data("SpaceShips");

// Set any properities you want
spaceShip.set("_id", "weh80EjefeEFEoejofe880");

spaceShip.destroy({
    success: function(spaceShip, statusCode) {
        // Your implementation after the space ship is updated
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```

## Real-time data observerving
SDK supports real time communication through sockets. You can observe these types of changes.

- POST as "created"
- PUT as "updated"
- PATCH as "patched"
- DELETE as "deleted"

### Start observing whole collection
| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**

```javascript
// Create reference to the collection
var spaceShips = Synergykit.Data("SpaceShips");

// Specify the event of listening, allowed are "created", "updated", "patched" and "deleted"
spaceShips.on("created", function(createdSpaceShip) {
    // Work with returned instance like with any other SynergyKit object
});
```
### Start observing collection with filter
| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|collection |string| Location of document | **required**
|query |Synergykit.Query| Query with filter | **required**

```javascript
// Create reference to the collection
var spaceShips = Synergykit.Data("SpaceShips");

// Create query
var query = Synergykit.Query(spaceShips);
query.where().attribute("pilot").isEqualTo("Anakin");

// Specify the event of listening, allowed are "created", "updated", "patched" and "deleted" and set the querey as second parameter
spaceShips.on("created", query, function(createdSpaceShip) {
    // Work with returned instance like with any other SynergyKit object
});
```
### Stop observing
```javascript
// Create reference to the collection
var spaceShips = Synergykit.Data("SpaceShips");
spaceShips.off("created");
```
### Speak communication
Communication without data storage from device to device.

#### Send speak

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
| speakName | string | Name of the speak | **required**
| * | ? | Optional parameters | optional

```javascript
Synergykit.speak("typing", "May the force be with you!")
```
#### Receive speak

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|speakName |string|Name of the speak| **required**

```javascript
Synergykit.on("typing", function(message) {
    console.log(message); // "May the force be with you!"
})
```

## Queries
You can retrieve multiple objects at once by sending a request with query. If query has no conditions API returns simply lists of all objects in collection.

For more complex filtering and sorting Synergykit accepts OData standard. These queries can be used with data, users and files.

### Available conditions
Query string is builded according to [OData Protocol](http://odata.org) and is appended to the end of the url.

The OData Protocol specification defines how to standardize a typed, resource-oriented CRUD interface for manipulating data sources by providing collections of entries which must have required elements.

#### making query
```javascript
// Create reference to the collection
var spaceShips = Skit.Data("SpaceShips");

// Create query and insert reference to collection or users or files as first parameter
var query = Skit.Query(spaceShips);
query.where() // Initialize filter
.attribute("name") // Attribute which you want filter. Notice that you can chain the query functions
.isEqualTo("Anakin Skywalker")
.or()
.attribute("name")
.isNotEqualTo("Darth Vader")
.or()
.attribute("light_sabers")
.isGreaterThan(1) // You can also use isGreaterOrEqualThan()
.and()
.attribute("light_sabers")
.isLessThan(5) // You can also use isLessOrEqualThan()
.or()
.substringOf("name", "akin") // Searching for substring in name
.or()
.startsWith("name", "Ana") // Searching for starting string
.or()
.isInArray("ships", "Falcon") // Searching for starting string
.or()
.endsWith("name", "lker") // Now you get it, don't you? :)
.select("name,lightsaber,gender") // Projection of what attribute you want back
.orderBy("name").desc()
.skip(10) // How many results you want to skip
.top(20) // How many results you want get back
.inlineCount() // If you call this function, result will be number of checking results.
.find({
    success: function(spaceShips, statusCode) {
        // Your implementation after spaceShips array return
    },
    error: function(error, statusCode) {
        // Your implementation if the query fails
    }
}) // And run the query
```

Available relation operators

- `==` as `isEqualTo`
- `!=` as `isNotEqualTo`
- `>=` as `isGreaterOrEqualThan`
- `<=` as `isLessOrEqualThan`
- `>` as `isGreaterThan`
- `<` as `isLessThan`


## Users
Users are alfa and omega of every application. In SynergyKit you can easily work with your users by methods listed below.
### Create a new user   

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
| * | ? | Optional parameters | optional

```javascript
// Create instance of User object
var user = Synergykit.User();

// Set any properities you want
user.set("name", "Anakin Skywalker");
user.set("email", "anakin@skywalker.com");
user.set("password", "Falcon");

// And save user to SynergyKit
user.save({
    success: function(user, statusCode) {
        // Your implementation after the user is saved
    },
    error: function(error, statusCode) {
        // Your implementation if the save fails
    }
});
```
### Retrieve an existing user by ID

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**

```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");

// And retrieve user from SynergyKit
user.fetch({
    success: function(user, statusCode) {
        // Your implementation after the user is retrieved
    },
    error: function(error, statusCode) {
        // Your implementation if the retrieve fails
    }
});
```
### Update user
Save method executes `PUT` request if `_id` is set. 

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**
| * | ? | Optional parameters | optional

```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");
user.set("ship", "Falcon");

// And update user from SynergyKit
user.save({
    success: function(user, statusCode) {
        // Your implementation after the user is updated
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```
### Delete user

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**

```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");

// And delete user from SynergyKit
user.destroy({
    success: function(user, statusCode) {
        // Your implementation after the user is deleted
    },
    error: function(error, statusCode) {
        // Your implementation if the delete fails
    }
});
```

### Add role

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**
|role |string| | **required**
```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");

// And add role to user
user.addRole("pilot", {
    success: function(user, statusCode) {
        // Your implementation after the role is added
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```

### Remove role

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**
|role |string| |**required**|
```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");

// And remove role from user
user.removeRole("pilot", {
    success: function(user, statusCode) {
        // Your implementation after the role is removed
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```

### Activating user
By default, user is not activated. This mean, that you can use this state to validate user e-mail address by sending him activation link.

To activate user, send an email with this activation link /v2.1/users/activation/[ACTIVATION_HASH]. You can provide parameter callback with url address where you want to redirect user after activation.

Or **if you know that e-mail address is valid** you can activate user with SDK.

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**

```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("_id", "ewljqhqherphwejr");
user.set("isActivated", true);

// And update user to SynergyKit
user.save({
    success: function(user, statusCode) {
        // Your implementation after the user is updated
    },
    error: function(error, statusCode) {
        // Your implementation if the update fails
    }
});
```
### Login user
If user was registrated via normal way, which means by email and password, you can authenticate him with login method.

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|email |string| User e-mail | **required**
|password | string | User password | **required**
```javascript
// Create instance of User object
var user = Synergykit.User();
user.set("email", "anakin@skywalker.com");
user.set("password","Falcon");

// And login user to SynergyKit
user.login({
    success: function(user, statusCode) {
        // User object with session token will be returned
    },
    error: function(error, statusCode) {
        // Your implementation if the login fails
    }
});
```

### Add platform to user
Platforms are useful for pairing individual mobile devices or web applications to the user via registration ID. After assignment platform to the user you will be able to send push notifications to the device or application.

**Before you can work with platforms** of user is needed to login first. After successful login SDK receives sessionToken for authentication of user. Token is held by the SDK and is automatically inserted into the Headers.

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|platformName |string| Platform name, "android", "apple" and "web" are supported | **required**
|registrationId |string|Unique device id| **required**

```javascript
var platform = Synergykit.Platform()
platform.set("platformName", "android")
platform.set("registrationId", "2343wdhqr9689")
platform.save({
    success: function(platform, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

### Retrive platform 

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
| _id |string| API identificator | **required**

```javascript
var platform = Synergykit.Platform()
platform.set("_id", "qwefqwerqpweor")
platform.fetch({
    success: function(platform, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

### Update platform
Platforms contain of a few parameters but only two are updatable. Save method executes `PUT` request if `_id` is set, it could change `development` and `registrationId`. 

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**
|   registrationId  |   NSString    |   Device id   |   optional    |

```javascript
var platform = Synergykit.Platform()
platform.set("_id", "qwefqwerqpweor")
platform.set("registrationId", "7070EJR");
platform.save({
    success: function(platform, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

### Delete platform

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|_id |string| API identificator | **required**
```javascript
var platform = Synergykit.Platform()
platform.set("_id", "qwefqwerqpweor")
platform.destroy({
    success: function(platform, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

## Communication
In SynergyKit you can communicate with your users by different ways. There are listed some methods below this section.

One way is to sending push notifications into user devices. This action need to have filled your API key for Android devices in Settings, section Android. For push notifications into iOS devices you need to fill your password and certificates into Apple section in Settings.

Another way is to sending emails to your users. For this you need to create email templates in administration under Mailing section.

### Send notification

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|recipients | Synergykit.User| User or array of Users | **required**
|alert | string | Alert message of notification | optional
|badge | number | Badge to be shown on app icon | optional
|payload | string | Notification payload | optional
|sound | string | Soud to be played on notification income | optional

```javascript
var notification = Synergykit.Notification(SynergykitUser)
notification.set("alert", "I'm your father!")
notification.send({
    success: function(result, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

### Send email

| Parameter | Type | Notes | |
|:-|:-|:-|:-:|
|mailTemplate | string| Name of mail template | **required**
|email | string| Email of recipient | **required**
|subject | string|Subject of mail | **required**
|* | ? | Parameters for mail template | optional

```javascript
var mail = Synergykit.Mail("myTemplate")
mail.set("email", "anakin@skywalker.com")
mail.set("subject", "Greetings from Tatooine")
mail.send({
    success: function(result, statusCode) {
    
    },
    error: function(error, statusCode) {
    }
})
```

##Files

SynergyKit can be also used for storing as much quantity of files as you need for your application.

###Upload file

```javascript
var input = document.getElementById('fileinput');
var file = Synergykit.File(input.files[0])
file.upload({
    success: function(file, statusCode) {
        console.log(file.get())
    },
    error: function(error, statusCode) {
        console.log(error)
    }
})
```
###Retrieve file by ID

```javascript
var file = Synergykit.File()
file.set("_id", "JL08jljelr70jl")
file.fetch({
    success: function(file, statusCode) {
        console.log(file.get())
    },
    error: function(error, statusCode) {
        console.log(error)
    }
})
```
###Delete file

```javascript
var file = Synergykit.File()
file.set("_id", "JL08jljelr70jl")
file.destroy({
    success: function(result, statusCode) {
        
    },
    error: function(error, statusCode) {
        console.log(error)
    }
})
```
##Cloud Code

Our vision is to let developers build any app without dealing with servers. For complex apps, sometimes you just need a bit of logic that isn’t running on a mobile device. Cloud Code makes this possible.

###Run cloud code

```javascript
var cloudCode = Synergykit.CloudCode("example")
cloudCode.set("name", "Anakin")
cloudCode.run({
    success: function(result, statusCode) {
        
    },
    error: function(error, statusCode) {
        
    }
})
```
##Batch request
To reduce the amount of time spent on network round trips, you can get, create, update, or delete up to 50 objects in one call, using the batch endpoint.

###Adding to batch
Calling methods like `save`, `fetch`, `destroy` etc. without setting callbacks, add them to the batch buffer, where they are waiting in queue.

###Using batch

```javascript
var gameScore = Synergykit.Data("GameScore")
gameScore.set("score", 1337)
gameScore.save()

var gameScore2 = Synergykit.Data("GameScore")
gameScore2.set("score", 1338)
gameScore2.save()
Synergykit.runBatch({
    success: function(result, statusCode) {
        
    },
    error: function(error, statusCode) {
    
    }
})
```
## Changelog
### Version 2.1.4 (22. 4. 2015)

- **SynergyKit v2.1 support**
- Documents
- Real-time data observing
- Queries
- Users
- Platforms
- Roles
- Communication
- Files
- CloudCode
- Batching requests

## License

SynergyKit JavaScript SDK is available under the MIT license. See the LICENSE file for more info.