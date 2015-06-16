// Synergykit JS SDK version 2.1.15
var synergykitBasicApi = "%s.api.synergykit.com"
var synergykitApiVersion = "/v2.1"

var Synergykit = {
    tenant: null,
    key: null,
    token: null,
    loggedUser: null,
    debug: false,
    local: false,
    api: "",
    modules: {},
    batches: []
}

Synergykit.Init = function(tenant, key, options) {
    options = options || {}
    Synergykit.tenant = Synergykit.urlify(tenant)
    Synergykit.key = key
    Synergykit.debug = options.debug || false
    Synergykit.api = "https://" + synergykitBasicApi.replace("%s", Synergykit.tenant)
    Synergykit.socketApi = "wss://" + synergykitBasicApi.replace("%s", Synergykit.tenant)
    if (options.local) {
        Synergykit.local = true
        Synergykit.api = "http://localhost:5078"
        Synergykit.socketApi = "ws://localhost:5078"
    }
}

Synergykit.Errors = {
    NO_SUCCESS_CALLBACK: "No success callback was found. You have to specify it.",
    NO_ERROR_CALLBACK: "No error callback was found. You have to specify it.",
    NO_EMAIL: "Email was not specified.",
    NO_OLD_PASSWORD: "Old password was not specified.",
    NO_PASSWORD: "Password was not specified.",
    NO_ROLES: "Roles were not specified.",
    NO_ID: "ID was not specified.",
    NO_USER_ID: "User ID was not specified.",
    NO_USER_IDS: "No user ids were specified.",
    NO_PLATFORM_ID: "No id was specified.",
    NO_PLATFORM_USER_ID: "No user id was specified.",
    NO_PLATFORM_NAME: "Platform name was not specified.",
    NO_PLATFORM_REGISTRATION_ID: "Registration id was not specified.",
    NO_PATH: "Path of the file was not specified.",
    NO_FILE: "File was not specified.",
    NO_URL: "Url was not specified.",
    NO_SUBJECT: "Subject was not specified.",
    NO_SYNERGYKIT_OBJECT: "Synergykit object was not specified.",
    NO_AUTH_DATA: "No authData was specified.",
    NO_FACEBOOK_DATA: "No facebook data was specified.",
    NO_FACEBOOK_ID: "No facebook id was specified.",
    NO_FACEBOOK_ACCESS_TOKEN: "No facebook access token was specified.",
    NO_TWITTER_DATA: "No twitter data was speicfied.",
    NO_TWITTER_ID: "No twitter id was specified.",
    NO_TWITTER_SCREEN_NAME: "No twitter screen name was specified.",
    NO_TWITTER_CONSUMER_KEY: "No twitter consumer key was specified.",
    NO_TWITTER_CONSUMER_SECRET: "No twitter consumer secret was specified.",
    NO_TWITTER_AUTH_TOKEN: "No twitter auth token was specified.",
    NO_TWITTER_AUTH_TOKEN_SECRET: "No twitter auth token secret was specified.",
    NO_GOOGLE_DATA: "No google data was specified.",
    NO_GOOGLE_ID: "No google id was specified.",
    NO_ANONYMOUS_DATA: "No anonymous data was specified."
}

function SynergykitObject() {
    this.data = {
        __v: 0,
        _id: null,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    }
}

SynergykitObject.prototype.set = function(key, value) {
    if (Synergykit.isObject(key) && value === undefined) {
        this.data = key
    } else {
        this.data[key] = value
    }

}

SynergykitObject.prototype.get = function(key) {
    if (key === undefined) {
        var object = {}
        for (var i in this.data) {
            object[i] = this.data[i]
        }
        return object
    }
    return this.data[key]
}


function Data(collection, synergykit) {
    Data.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.collection = collection
    this.endpoint = "/data/" + Synergykit.urlify(collection)
    this.query = {}
}


Data.super_ = SynergykitObject

Data.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Data,
        enumarable: false
    }
})

Data.prototype.save = function(callbacks) {
    if (this.get("_id") && this.get("__v") !== undefined) {
        this.synergykit.request({
            method: "PUT",
            endpoint: this.endpoint + "/" + this.get("_id")
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "POST",
            endpoint: this.endpoint
        }, callbacks, this)
    }
}

Data.prototype.fetch = function(callbacks) {
    this.synergykit.request({
        method: "GET",
        endpoint: this.endpoint + "/" + this.get("_id")
    }, callbacks, this)
}

Data.prototype.addAccess = function(user_id, callbacks) {
    if (user_id instanceof this.synergykit.modules.Users) {
        user_id = user_id.get("_id")
    }
    this.synergykit.request({
        method: "POST",
        endpoint: this.endpoint + "/" + this.get("_id") + "/" + user_id
    }, callbacks, this)
}

Data.prototype.removeAccess = function(user_id, callbacks) {
    if (user_id instanceof this.synergykit.modules.Users) {
        user_id = user_id.get("_id")
    }
    this.synergykit.request({
        method: "DELETE",
        endpoint: this.endpoint + "/" + this.get("_id") + "/" + user_id
    }, callbacks, this)
}

Data.prototype.destroy = function(callbacks) {
    if (this.get("_id")) {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint + "/" + this.get("_id")
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint
        }, callbacks, this)
    }
}

Data.prototype.socketSave = function(callback) {
    if (this.get("_id") && this.get("__v") !== undefined) {
        this.synergykit.socketUpdate(this, callback)
    } else {
        this.synergykit.socketCreate(this, callback)
    }
}

Data.prototype.socketDestroy = function(callback) {
    if (this.get("_id")) {
        this.synergykit.socketDestroy(this, callback)
    } else {
        throw Errors.NO_ID
    }
}

Data.prototype.on = function(eventName, filter, callback) {
    var options = {
        eventName: eventName
    }
    if (Synergykit.isFunction(filter)) {
        callback = filter
    } else {
        options.filter = {
            name: filter.name,
            query: filter.query["$filter"]
        }
    }
    this.synergykit.subscribe(options, this, callback)
}

Data.prototype.speak = function(eventName, data) {
    if (!data) {
        data = {}
    }
    this.synergykit.speak(eventName, data, this)
}

Data.prototype.off = function(eventName, filter, callback) {
    var options = {
        eventName: eventName
    }
    if (Synergykit.isFunction(filter)) {
        callback = filter
    } else if (Synergykit.isObject(filter)) {
        options.filter = filter
    }
    this.synergykit.unsubscribe(options, this)
}


function Files(file, name, synergykit) {
    Files.super_.apply(this, arguments)
    this.name = name
    this.file = file
    this.synergykit = synergykit
    this.endpoint = "/files"
}

Files.super_ = SynergykitObject

Files.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Files,
        enumarable: false
    }
})

Files.prototype.upload = function(callbacks) {
    if (!this.file) {
        throw Synergykit.Errors.NO_FILE
    } else {
        var formData = new FormData();
        if (this.name) {
            formData.append("name", this.name)
        }
        formData.append("file", this.file)
        this.synergykit.request({
            method: "POST",
            formData: formData,
            endpoint: this.endpoint
        }, callbacks, this)
    }
}

Files.prototype.fetch = function(callbacks) {
    this.synergykit.request({
        method: "GET",
        endpoint: this.endpoint + "/" + this.get("_id")
    }, callbacks, this)
}

Files.prototype.destroy = function(callbacks) {
    if (this.get("_id")) {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint + "/" + this.get("_id")
        }, callbacks, this)
    } else {
        throw Synergykit.Errors.NO_ID
    }
}

Files.prototype.addAccess = function(user_id, callbacks) {
    if (user_id instanceof this.synergykit.modules.Users) {
        user_id = user_id.get("_id")
    }
    this.synergykit.request({
        method: "POST",
        endpoint: this.endpoint + "/" + this.get("_id") + "/" + user_id
    }, callbacks, this)
}

Files.prototype.removeAccess = function(user_id, callbacks) {
    if (user_id instanceof this.synergykit.modules.Users) {
        user_id = user_id.get("_id")
    }
    this.synergykit.request({
        method: "DELETE",
        endpoint: this.endpoint + "/" + this.get("_id") + "/" + user_id
    }, callbacks, this)
}

function Functions(url, synergykit) {
    Functions.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.url = url
    this.endpoint = "/functions"
}

Functions.super_ = SynergykitObject

Functions.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Functions,
        enumarable: false
    }
})

Functions.prototype.run = function(callbacks) {
    if (!this.url) {
        throw Synergykit.Errors.NO_URL
    } else {
        this.synergykit.request({
            method: "POST",
            body: this.get(),
            endpoint: this.endpoint + "/" + this.url
        }, callbacks)
    }
}

function Logs(path, synergykit) {
    Logs.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.endpoint = "/logs"
}

Logs.super_ = SynergykitObject

Logs.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Logs,
        enumarable: false
    }
})

function Mailing(url, synergykit) {
    Mailing.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.url = url
    this.endpoint = "/mailing"
}

Mailing.super_ = SynergykitObject

Mailing.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Mailing,
        enumarable: false
    }
})

Mailing.prototype.send = function(callbacks) {
    if (!this.url) {
        throw Synergykit.Errors.NO_URL
    } else if (!this.get("email")) {
        throw Synergykit.Errors.NO_EMAIL
    } else if (!this.get("subject")) {
        throw Synergykit.Errors.NO_SUBJECT
    } else {
        this.synergykit.request({
            method: "POST",
            body: this.get(),
            endpoint: "/mail/" + this.url
        }, callbacks)
    }
}

function Notifications(userIds, synergykit) {
    Notifications.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.userIds = userIds
    this.endpoint = "/users/notification"
}

Notifications.super_ = SynergykitObject

Notifications.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Notifications,
        enumarable: false
    }
})

Notifications.prototype.send = function(callbacks) {
    this.set("userIds", this.userIds)
    this.synergykit.request({
        method: "POST",
        body: this.get(),
        endpoint: this.endpoint
    }, callbacks)
}

function Platforms(synergykit) {
    Platforms.super_.apply(this, arguments)

    this.synergykit = synergykit
    this.endpoint = "/users"


}

Platforms.super_ = SynergykitObject

Platforms.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Platforms,
        enumarable: false
    }
})

Platforms.prototype.save = function(callbacks) {
    if (!this.get("platformName")) {
        throw Synergykit.Errors.NO_PLATFORM_NAME
    } else if (!this.get("registrationId")) {
        throw Synergykit.Errors.NO_PLATFORM_REGISTRATION_ID
    } else {
        if (this.get("_id")) {
            this.synergykit.request({
                method: "PUT",
                endpoint: this.endpoint + "/me/platforms/" + this.get("_id")
            }, callbacks, this)
        } else {
            this.synergykit.request({
                method: "POST",
                endpoint: this.endpoint + "/me/platforms"
            }, callbacks, this)
        }
    }
}

Platforms.prototype.fetch = function(callbacks) {
    if (!this.get("_id")) {
        this.synergykit.request({
            method: "GET",
            endpoint: this.endpoint + "/me/platforms"
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "GET",
            endpoint: this.endpoint + "/me/platforms/" + this.get("_id")
        }, callbacks, this)
    }

}

Platforms.prototype.destroy = function(callbacks) {
    if (this.get("_id")) {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint + "/me/platforms/" + this.get("_id")
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint + "/me/platforms"
        }, callbacks, this)
    }
}

function Users(synergykit) {
    Users.super_.apply(this, arguments)
    this.synergykit = synergykit
    this.endpoint = "/users"
    this.query = {}
}

Users.super_ = SynergykitObject

Users.prototype = Object.create(SynergykitObject.prototype, {
    constructor: {
        value: Users,
        enumarable: false
    }
})

Users.prototype.save = function(callbacks) {
    if (this.get("_id") && this.get("__v") !== undefined) {
        this.synergykit.request({
            method: "PUT",
            endpoint: this.endpoint + "/" + this.get("_id")
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "POST",
            endpoint: this.endpoint
        }, callbacks, this)
    }
}

Users.prototype.fetch = function(callbacks) {
    this.synergykit.request({
        method: "GET",
        endpoint: this.endpoint + "/" + this.get("_id")
    }, callbacks, this)
}

Users.prototype.login = function(callbacks) {
    if (!this.get("email")) {
        throw Synergykit.Errors.NO_EMAIL
    } else if (!this.get("password")) {
        throw Synergykit.Errors.NO_PASSWORD
    } else {
        this.synergykit.request({
            method: "POST",
            endpoint: this.endpoint + "/login"
        }, callbacks, this)
    }
}

var facebook = function(callbacks) {
    if (!this.get("authData")) {
        throw Errors.NO_AUTH_DATA
    } else {
        var authData = this.get("authData")
        if (!authData.facebook) {
            throw Errors.NO_FACEBOOK_DATA
        } else {
            var facebook = authData.facebook
            if (!facebook.id) {
                throw Errors.NO_FACEBOOK_ID
            } else if (!facebook.accessToken) {
                throw Errors.NO_FACEBOOK_ACCESS_TOKEN
            } else {
                this.synergykit.request({
                    method: "POST",
                    endpoint: this.endpoint
                }, callbacks, this)
            }
        }
    }
}

Users.prototype.facebookLogin = facebook
Users.prototype.facebookRegistration = facebook

var twitter = function(callbacks) {
    if (!this.get("authData")) {
        throw Errors.NO_AUTH_DATA
    } else {
        var authData = this.get("authData")
        if (!authData.twitter) {
            throw Errors.NO_TWITTER_DATA
        } else {
            var twitter = authData.twitter
            if (!twitter.id) {
                throw Errors.NO_TWITTER_ID
            } else if (!twitter.screenName) {
                throw Errors.NO_TWITTER_SCREEN_NAME
            } else if (!twitter.consumerKey) {
                throw Errors.NO_TWITTER_CONSUMER_KEY
            } else if (!twitter.consumerSecret) {
                throw Errors.NO_TWITTER_CONSUMER_SECRET
            } else if (!twitter.authToken) {
                throw Errors.NO_TWITTER_AUTH_TOKEN
            } else if (!twitter.authTokenSecret) {
                throw Errors.NO_TWITTER_AUTH_TOKEN_SECRET
            } else {
                this.synergykit.request({
                    method: "POST",
                    endpoint: this.endpoint
                }, callbacks, this)
            }
        }
    }
}

Users.prototype.twitterLogin = twitter
Users.prototype.twitterRegistration = twitter

var google = function(callbacks) {
    if (!this.get("authData")) {
        throw Errors.NO_AUTH_DATA
    } else {
        var authData = this.get("authData")
        if (!authData.google) {
            throw Errors.NO_GOOGLE_DATA
        } else {
            var google = authData.google
            if (!google.id) {
                throw Errors.NO_GOOGLE_ID
            } else {
                this.synergykit.request({
                    method: "POST",
                    endpoint: this.endpoint
                }, callbacks, this)
            }
        }
    }
}

Users.prototype.googleLogin = google
Users.prototype.googleRegistration = google

Users.prototype.anonymousLogin = function(callbacks) {
    if (!this.get("authData")) {
        throw Errors.NO_AUTH_DATA
    } else {
        var authData = this.get("authData")
        if (!authData.anonymous) {
            throw Errors.NO_ANONYMOUS_DATA
        } else {
            this.synergykit.request({
                method: "POST",
                endpoint: this.endpoint
            }, callbacks, this)
        }
    }
}

Users.prototype.addRole = function(role, callbacks) {
    this.synergykit.request({
        method: "POST",
        body: {
            role: role
        },
        endpoint: this.endpoint + "/" + this.get("_id") + "/roles"
    }, callbacks, this)
}

Users.prototype.removeRole = function(role, callbacks) {
    this.synergykit.request({
        method: "DELETE",
        endpoint: this.endpoint + "/" + this.get("_id") + "/roles/" + role
    }, callbacks, this)
}

Users.prototype.resetPassword = function(callbacks) {
    this.synergykit.request({
        method: "POST",
        endpoint: this.endpoint + "/reset-password/" + this.get("_id")
    }, callbacks, this)
}

Users.prototype.changePassword = function(callbacks) {
    if (!this.get("old_password")) {
        throw Synergykit.Errors.NO_OLD_PASSWORD
    } else if (!this.get("password")) {
        throw Synergykit.Errors.NO_PASSWORD
    } else {
        this.synergykit.request({
            method: "POST",
            endpoint: this.endpoint + "/change-password/" + this.get("_id")
        }, callbacks, this)
    }
}


Users.prototype.destroy = function(callbacks) {
    if (this.get("_id")) {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint + "/" + this.get("_id")
        }, callbacks, this)
    } else {
        this.synergykit.request({
            method: "DELETE",
            endpoint: this.endpoint
        }, callbacks, this)
    }
}



function Query(object, synergykit) {
    this.query = {}
    if (Synergykit.isString(object)) {
        this.name = object
    } else {
        this.object = object
    }
    this.synergykit = synergykit
    return this
}

Query.prototype.where = function() {
    this.query["$filter"] = ""
    return this
}


Query.prototype.select = function(select) {
    this.query["$select"] = Synergykit.isArray(select) ? select.join(",") : select
    return this
}

Query.prototype.inlineCount = function() {
    this.query["$inlinecount"] = true
    return this
}

Query.prototype.top = function(top) {
    this.query["$top"] = parseInt(top)
    return this
}

Query.prototype.skip = function(skip) {
    this.query["$skip"] = parseInt(skip)
    return this
}

Query.prototype.orderBy = function(orderby) {
    this.query["$orderby"] = orderby
    return this
}

Query.prototype.desc = function() {
    this.query["$orderby"] += " desc"
    return this
}

Query.prototype.asc = function() {
    this.query["$orderby"] += " asc"
    return this
}

Query.prototype.toString = function() {
    return this.query
}


// ---- Filter Section ----
Query.prototype.attribute = function(attribute) {
    this.query["$filter"] += "'" + attribute + "'"
    return this
}


// ---- Filter Operators ----
Query.prototype.and = function() {
    this.query["$filter"] += " and "
    return this
}

Query.prototype.or = function() {
    this.query["$filter"] += " or "
    return this
}

Query.prototype.isEqualTo = function(parameter) {
    this.query["$filter"] += " eq " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isNotEqualTo = function(parameter) {
    this.query["$filter"] += " ne " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isGreaterThan = function(parameter) {
    this.query["$filter"] += " gt " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isGreaterOrEqual = function(parameter) {
    this.query["$filter"] += " ge " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isLessThan = function(parameter) {
    this.query["$filter"] += " lt " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isLessOrEqualThan = function(parameter) {
    this.query["$filter"] += " le " + Synergykit.checkParameter(parameter)
    return this
}

Query.prototype.isInArray = function(parameter) {
    this.query["$filter"] += " in " + checkParameter(parameter)
    return this
}

Query.prototype.isNotInArray = function(parameter) {
    this.query["$filter"] += " nin " + checkParameter(parameter)
    return this
}

// ---- Filter Functions ----
Query.prototype.substringOf = function(attribute, parameter) {
    this.query["$filter"] += "substringof('" + parameter + "', " + attribute + ")"
    return this
}

Query.prototype.startsWith = function(attribute, parameter) {
    this.query["$filter"] += "startswith(" + attribute + ", '" + parameter + "')"
    return this
}

Query.prototype.endsWith = function(attribute, parameter) {
    this.query["$filter"] += "endswith(" + attribute + ", '" + parameter + "')"
    return this
}

Query.prototype.find = function(callbacks) {
    if (!this.object) {
        throw Synergykit.Errors.NO_SYNERGYKIT_OBJECT
    } else {
        this.synergykit.request({
            method: "GET",
            query: this.query,
            endpoint: this.object.endpoint
        }, callbacks, this.object)
    }

}

Synergykit.checkParameter = function(parameter) {
    if (Synergykit.isString(parameter)) {
        return "'" + parameter + "'"
    }
    return parameter
}

Synergykit.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


Synergykit.modules.Query = Query
Synergykit.modules.Data = Data
Synergykit.modules.Files = Files
Synergykit.modules.Functions = Functions
Synergykit.modules.Logs = Logs
Synergykit.modules.Mailing = Mailing
Synergykit.modules.Notifications = Notifications
Synergykit.modules.Platforms = Platforms
Synergykit.modules.Users = Users


Synergykit.rt = {
    client: null,
    socket: null,
    connected: false,
    queue: [],
    listeners: {},
    attemps: 0,
    maxAttemps: 10,
    connect: function(data) {
        Synergykit.rt.connected = false
        try {
            Synergykit.rt.client = new WebSocket(Synergykit.socketApi, "echo-protocol")
        } catch (e) {
            if (data.synergykit.debug) {
                console.log(e.message)
            }
        }
    },
    reconnect: function(data) {
        if (Synergykit.rt.attemps < Synergykit.rt.maxAttemps) {
            setTimeout(function() {
                Synergykit.rt.connect(data)
            }, 1000 * Synergykit.rt.attemps)
            Synergykit.rt.attemps++
        }
    },
    unsubscribed: function(data) {
        if (data.synergykit.debug && data) {
            console.log("Unsubscribed from collection '" + data.collection + "', event '" + data.message)
        }
    },
    unauthorized: function(data) {
        if (data.synergykit.debug && data) {
            console.log("Unauthorized: " + data.message)
        }
    },
    checkConnection: function(data) {
        if (Synergykit.rt.client == null) {
            Synergykit.rt.listeners.unsubscribed = Synergykit.rt.unsubscribed
            Synergykit.rt.listeners.unauthorized = Synergykit.rt.unauthorized
            Synergykit.rt.connect(data)

            Synergykit.rt.client.onopen = function() {
                Synergykit.rt.attemps = 0
                Synergykit.rt.connected = true
                if (data.synergykit.debug) {
                    console.log("Connected")
                }
            }
            Synergykit.rt.client.onerror = function(error) {
                if (data.synergykit.debug) {
                    console.log("Connection Error: " + error.toString());
                }
            }
            Synergykit.rt.client.onclose = function() {
                if (data.synergykit.debug) {
                    console.log("Disconnected")
                }
                Synergykit.rt.reconnect(data)
                for (var i in Synergykit.rt.queue) {
                    Synergykit.rt.queue[i]()
                }
            }
            Synergykit.rt.client.onmessage = function(message) {
                if (message && message.data) {
                    try {
                        message = JSON.parse(message.data)
                    } catch (e) {
                        console.log(e.message)
                    }
                    if (Synergykit.rt.listeners[message.event]) {
                        Synergykit.rt.listeners[message.event](message.data)
                    }

                }
            }
        }
    },
    send: function(data) {
        if (Synergykit.rt.connected) {
            Synergykit.rt.client.send(JSON.stringify(data))
        } else {
            setTimeout(function() {
                Synergykit.rt.send(data)
            }, 1000)
        }
    },
    addListener: function(data) {
        Synergykit.rt.checkConnection(data)
        var name
        if (data.object) {
            if (data.filter && data.filter.name && data.filter.query) {
                name = data.eventName + "_" + data.object.collection + "_" + data.filter.name
                var listener = function() {
                    Synergykit.rt.send({
                        event: "subscribe",
                        data: {
                            tenant: data.synergykit.tenant,
                            key: data.synergykit.key,
                            token: data.synergykit.token,
                            filter: data.filter,
                            eventName: data.eventName,
                            collectionName: data.object.collection
                        }
                    })
                }
                listener()
                Synergykit.rt.queue.push(listener)

                Synergykit.rt.listeners[name] = function(result) {
                    if (data && data.object) {
                        data.object.set(result)
                        data.callback(data.object)
                    } else {
                        data.callback(result)
                    }

                }
                Synergykit.rt.listeners["subscribed_" + name] = function() {
                    if (data.synergykit.debug) {
                        console.log("Subscribed to collection '" + data.object.collection + "', event '" + data.eventName + "', filter '" + data.filter.name)
                    }
                }
            } else {
                name = data.eventName + "_" + data.object.collection
                var listener = function() {
                    Synergykit.rt.send({
                        event: "subscribe",
                        data: {
                            tenant: data.synergykit.tenant,
                            key: data.synergykit.key,
                            token: data.synergykit.token,
                            eventName: data.eventName,
                            collectionName: data.object.collection
                        }
                    })
                }
                listener()
                Synergykit.rt.queue.push(listener)
                Synergykit.rt.listeners[name] = function(result) {
                    if (data && data.object) {
                        data.object.set(result)
                        data.callback(data.object)
                    } else {
                        data.callback(result)
                    }

                }
                Synergykit.rt.listeners["subscribed_" + name] = function() {
                    if (data.synergykit.debug) {
                        console.log("Subscribed to collection '" + data.object.collection + "', event '" + data.eventName)
                    }
                }
            }
        } else {
            name = data.eventName
            var listener = function() {
                Synergykit.rt.send({
                    event: "subscribe",
                    data: {
                        tenant: data.synergykit.tenant,
                        key: data.synergykit.key,
                        token: data.synergykit.token,
                        eventName: data.eventName
                    }
                })
            }
            listener()
            Synergykit.rt.queue.push(listener)
            Synergykit.rt.listeners[data.eventName] = function(result) {
                if (data && data.object) {
                    data.object.set(result)
                    data.callback(data.object)
                } else {
                    data.callback(result)
                }

            }
            Synergykit.rt.listeners["subscribed_" + name] = function() {
                if (data.synergykit.debug) {
                    console.log("Subscribed to event '" + name)
                }
            }
        }
    },
    removeListener: function(data) {
        var name
        Synergykit.rt.checkConnection(data)
        if (data.object) {
            if (data.filter) {
                name = data.eventName + "_" + data.object.collection + "_" + data.filter.name
                delete Synergykit.rt.listeners[name]
                var listener = function() {
                    Synergykit.rt.send({
                        event: "unsubscribe",
                        data: {
                            tenant: data.synergykit.tenant,
                            key: data.synergykit.key,
                            token: data.synergykit.token,
                            filter: data.filter,
                            eventName: data.eventName,
                            collectionName: data.object.collection
                        }
                    })
                }
                listener()
                Synergykit.rt.queue.push(listener)
                Synergykit.rt.listeners["unsubscribed_" + name] = function() {
                    if (data.synergykit.debug) {
                        console.log("Unsubscribed from collection '" + data.object.collection + "', event '" + data.eventName + "', filter '" + data.filter.name)
                    }
                }
            } else {
                name = data.eventName + "_" + data.object.collection
                delete Synergykit.rt.listeners[name]
                var listener = function() {
                    Synergykit.rt.send({
                        event: "unsubscribe",
                        data: {
                            tenant: data.synergykit.tenant,
                            key: data.synergykit.key,
                            token: data.synergykit.token,
                            eventName: data.eventName,
                            collectionName: data.object.collection
                        }
                    })
                }
                listener()
                Synergykit.rt.queue.push(listener)
                Synergykit.rt.listeners["unsubscribed_" + name] = function() {
                    if (data.synergykit.debug) {
                        console.log("Unsubscribed from collection '" + data.object.collection + "', event '" + data.eventName)
                    }
                }
            }
        } else {
            name = data.eventName
            delete Synergykit.rt.listeners[name]
            var listener = function() {
                Synergykit.rt.send({
                    event: "unsubscribe",
                    data: {
                        tenant: data.synergykit.tenant,
                        key: data.synergykit.key,
                        token: data.synergykit.token,
                        eventName: data.eventName,
                    }
                })
            }
            listener()
            Synergykit.rt.queue.push(listener)
            Synergykit.rt.listeners["unsubscribed_" + name] = function() {
                if (data.synergykit.debug) {
                    console.log("Unsubscribed from event '" + data.eventName)
                }
            }
        }
    },
    speak: function(data) {
        Synergykit.rt.checkConnection(data)
        var listener = function() {
            Synergykit.rt.send({
                event: "speak",
                data: {
                    tenant: data.synergykit.tenant,
                    token: data.synergykit.token,
                    eventName: data.eventName,
                    message: data.message
                }
            })
        }
        listener()
        Synergykit.rt.queue.push(listener)
    },
    create: function(data) {
        Synergykit.rt.checkConnection(data)
        var listener = function() {
            Synergykit.rt.send({
                event: "create",
                data: {
                    tenant: data.synergykit.tenant,
                    token: data.synergykit.token,
                    key: data.synergykit.key,
                    collectionName: data.object.collection,
                    data: data.object.get()
                }
            })
        }
        listener()
        Synergykit.rt.listeners["created"] = function(result) {
            if (data && data.object) {
                data.object.set(result)
                data.callback(data.object)
            } else {
                data.callback(result)
            }

        }

    },
    update: function(data) {
        Synergykit.rt.checkConnection(data)
        var listener = function() {
            Synergykit.rt.send({
                event: "update",
                data: {
                    tenant: data.synergykit.tenant,
                    token: data.synergykit.token,
                    key: data.synergykit.key,
                    collectionName: data.object.collection,
                    id: data.object.get("_id"),
                    data: data.object.get()
                }
            })
        }
        listener()
        Synergykit.rt.listeners["updated"] = function(result) {
            if (data && data.object) {
                data.object.set(result)
                data.callback(data.object)
            } else {
                data.callback(result)
            }

        }

    },
    destroy: function(data) {
        Synergykit.rt.checkConnection(data)
        var listener = function() {
            Synergykit.rt.send({
                event: "delete",
                data: {
                    tenant: data.synergykit.tenant,
                    token: data.synergykit.token,
                    key: data.synergykit.key,
                    collectionName: data.object.collection,
                    id: data.object.get("_id")
                }
            })
        }
        listener()
        Synergykit.rt.listeners["deleted"] = function(result) {
            if (data && data.object) {
                data.object.set(result)
                data.callback(data.object)
            } else {
                data.callback(result)
            }

        }

    }
}

Synergykit.runBatch = function(callbacks) {
    var method = "POST"
    var endpoint = "/batch"
    var uri = Synergykit.api + synergykitApiVersion + endpoint
    if (Synergykit.debug) {
        console.log('calling: ' + method + ' ' + uri);
    }
    Synergykit._start = new Date().getTime()

    var request = Synergykit.createCORSRequest(method, uri);
    request.setRequestHeader("Content-Type", "application/json")

    if (Synergykit.token) {
        request.setRequestHeader("SessionToken", Synergykit.token)
    }

    request.setRequestHeader("Authorization", "Basic " + Synergykit.Base64.encode(Synergykit.tenant + ":" + Synergykit.key))
    request.onload = function() {
        try {
            var results = JSON.parse(request.responseText)
            Synergykit._end = new Date().getTime()
            if (request.status >= 200 && request.status < 400) {
                if (Synergykit.debug) {
                    console.log('Success (time: ' + Synergykit.calcTimeDiff() + '): POST ' + uri);
                }
                if (callbacks && typeof(callbacks.success) === "function") {
                    var resultCallback = []
                    for (var i in results) {
                        var result = results[i]
                        var response = null
                        var resultBody = result.body
                        if (result.statusCode == 200) {
                            if (Synergykit.batches[result.id] && Synergykit.batches[result.id].object instanceof SynergykitObject) {
                                var object = Synergykit.batches[result.id].object
                                if (resultBody) {
                                    if (Synergykit.isArray(resultBody)) {
                                        if (resultBody.length > 0) {
                                            response = []
                                            for (var j in resultBody) {
                                                var clonedObject = null
                                                if (object instanceof Synergykit.modules.Data) {
                                                    clonedObject = Synergykit.Data(object.collection)
                                                } else if (object instanceof Synergykit.modules.Files) {
                                                    clonedObject = Synergykit.modules.File(object.path)
                                                } else if (object instanceof Synergykit.modules.Functions) {
                                                    clonedObject = Synergykit.CloudCode(object.url)
                                                } else if (object instanceof Synergykit.modules.Logs) {

                                                } else if (object instanceof Synergykit.modules.Mailing) {
                                                    clonedObject = Synergykit.Mail(object.url)
                                                } else if (object instanceof Synergykit.modules.Platforms) {
                                                    clonedObject = Synergykit.Platform(object.user_id)
                                                } else if (object instanceof Synergykit.modules.Users) {
                                                    clonedObject = Synergykit.User()
                                                }
                                                clonedObject.set(resultBody[j])
                                                response.push(clonedObject)
                                            }
                                        } else {
                                            response = resultBody
                                        }
                                    } else {
                                        if (object instanceof Synergykit.modules.Users && resultBody.sessionToken) {
                                            Synergykit.token = resultBody.sessionToken
                                            object.synergykit = Synergykit
                                        }
                                        object.set(resultBody)
                                        if (object instanceof Synergykit.modules.Users) {
                                            Synergykit.loggedUser = object
                                        }
                                        response = object
                                    }
                                }
                                resultCallback.push(response)
                                    //console.log(resultCallback)
                            }
                        } else {
                            resultCallback.push({
                                status: result.status,
                                code: result.code,
                                message: result.message
                            })
                        }
                    }
                    Synergykit.batches = []
                    try {
                        callbacks.success(resultCallback, request.status)
                    } catch (e) {
                        console.error(e.stack)
                        if (Synergykit.errorCallback) {
                            Synergykit.errorCallback({
                                status: "error",
                                code: "SKIT01-001",
                                message: e.message
                            })
                        }
                    }
                } else {
                    //throw Errors.NO_SUCCESS_CALLBACK 
                }
            } else {
                Synergykit.batches = []
                err = true
                var code = result && result.code ? result.code : "SKIT01-001"
                var message = result && result.message ? result.message : ""
                if (Synergykit.debug) {
                    console.log('Error (' + request.status + ')(' + code + '): ' + message);
                }
                if (callbacks && typeof(callbacks.error) === "function") {
                    try {
                        callbacks.error(result, request.status)
                    } catch (e) {
                        console.error(e.stack)
                        if (Synergykit.errorCallback) {
                            Synergykit.errorCallback({
                                status: "error",
                                code: "SKIT01-001",
                                message: e.message
                            })
                        }
                    }
                } else {
                    //throw Synergykit.Errors.NO_ERROR_CALLBACK 
                }
            }

        } catch (e) {
            console.error(e.stack)
        }
    }

    request.onerror = function() {

    }

    var body = []
    for (var i in Synergykit.batches) {
        var batch = Synergykit.batches[i]
        var queryString = ""
        if (batch.options.query) {
            var qs = batch.options.query || {}
            var counter = 0
            for (var j in qs) {
                if (counter == 0) {
                    queryString += "?"
                } else {
                    queryString += "&"
                }
                queryString += j + "=" + qs[j]
                counter++
            }
        }
        body.push({
            id: parseInt(i),
            method: batch.options.method,
            endpoint: batch.options.endpoint + queryString,
            body: batch.options.body ? batch.options.body : batch.object.get()
        })
    }
    request.send(JSON.stringify(body))
}

Synergykit.request = function(options, callbacks, object) {
    if (callbacks == undefined) {
        Synergykit.batches.push({
            options: options,
            object: object
        })
    } else {
        var method = options.method || "GET"
        var endpoint = options.endpoint || "/"
        var body = {}
        if (object && object instanceof SynergykitObject) {
            body = object.data
        }
        if (options.body) {
            body = options.body
        }
        var qs = options.query || {}
        var queryString = ""
        if (options.query) {
            var counter = 0
            for (var i in qs) {
                if (counter == 0) {
                    queryString += "?"
                } else {
                    queryString += "&"
                }
                queryString += i + "=" + qs[i]
                counter++
            }
        }
        var uri = Synergykit.api + synergykitApiVersion + endpoint
        if (Synergykit.debug) {
            console.log('calling: ' + method + ' ' + uri + queryString);
        }
        Synergykit._start = new Date().getTime()

        var request = Synergykit.createCORSRequest(method, uri + queryString);
        //request.open(method, uri + queryString, true)
        if (!options.formData) {
            request.setRequestHeader("Content-Type", "application/json")
        }

        if (Synergykit.token) {
            request.setRequestHeader("SessionToken", Synergykit.token)
        }

        request.setRequestHeader("Authorization", "Basic " + Synergykit.Base64.encode(Synergykit.tenant + ":" + Synergykit.key))
        request.onload = function() {
            try {
                var result = JSON.parse(request.responseText)
                Synergykit._end = new Date().getTime()
                if (request.status >= 200 && request.status < 400) {
                    if (Synergykit.debug) {
                        console.log('Success (time: ' + Synergykit.calcTimeDiff() + '): ' + method + ' ' + uri + queryString);
                    }

                    if (callbacks && typeof(callbacks.success) === "function") {
                        if (object instanceof SynergykitObject) {
                            var response = null
                            if (result) {
                                if (Synergykit.isArray(result)) {
                                    if (result.length > 0) {
                                        response = []
                                        for (var i in result) {
                                            var clonedObject = null
                                            if (object instanceof Synergykit.modules.Data) {
                                                clonedObject = Synergykit.Data(object.collection)
                                            } else if (object instanceof Synergykit.modules.Files) {
                                                clonedObject = Synergykit.modules.File(object.path)
                                            } else if (object instanceof Synergykit.modules.Functions) {
                                                clonedObject = Synergykit.CloudCode(object.url)
                                            } else if (object instanceof Synergykit.modules.Logs) {

                                            } else if (object instanceof Synergykit.modules.Mailing) {
                                                clonedObject = Synergykit.Mail(object.url)
                                            } else if (object instanceof Synergykit.modules.Platforms) {
                                                clonedObject = Synergykit.Platform(object.user_id)
                                            } else if (object instanceof Synergykit.modules.Users) {
                                                clonedObject = Synergykit.User()
                                            }
                                            clonedObject.set(result[i])
                                            response.push(clonedObject)
                                        }
                                    } else {
                                        response = result
                                    }
                                } else {
                                    if (object instanceof Synergykit.modules.Users && result.sessionToken) {
                                        Synergykit.token = result.sessionToken
                                        object.synergykit = Synergykit
                                    }
                                    if (Synergykit.isNumber(result)) {
                                        result = {
                                            count: result
                                        }
                                    }
                                    object.set(result)
                                    if (object instanceof Synergykit.modules.Users) {
                                        Synergykit.loggedUser = object
                                    }
                                    response = object
                                }
                            }
                            try {
                                callbacks.success(response, request.status)
                            } catch (e) {
                                console.error(e.stack)
                                if (Synergykit.errorCallback) {
                                    Synergykit.errorCallback({
                                        status: "error",
                                        code: "SKIT01-001",
                                        message: e.message
                                    })
                                }
                            }
                        } else {
                            try {
                                callbacks.success(result, request.status)
                            } catch (e) {
                                console.error(e.stack)
                                if (Synergykit.errorCallback) {
                                    Synergykit.errorCallback({
                                        status: "error",
                                        code: "SKIT01-001",
                                        message: e.message
                                    })
                                }
                            }

                        }
                    } else {
                        //throw Synergykit.Errors.NO_SUCCESS_CALLBACK 
                    }
                } else {
                    err = true
                    var code = result && result.code ? result.code : "SKIT01-001"
                    var message = result && result.message ? result.message : ""
                    if (Synergykit.debug) {
                        console.log('Error (' + request.status + ')(' + code + '): ' + message);
                    }
                    if (callbacks && typeof(callbacks.error) === "function") {
                        try {
                            callbacks.error(result, request.status)
                        } catch (e) {
                            console.error(e.stack)
                            if (Synergykit.errorCallback) {
                                Synergykit.errorCallback({
                                    status: "error",
                                    code: "SKIT01-001",
                                    message: e.message
                                })
                            }
                        }
                    } else {
                        //throw Synergykit.Errors.NO_ERROR_CALLBACK 
                    }
                }
            } catch (e) {
                console.error(e.stack)
            }
        }

        request.onerror = function() {

        }

        if (options.formData) {
            request.send(options.formData)
        } else {
            request.send(JSON.stringify(body))
        }
    }
}

Synergykit.createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url, true);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

Synergykit.Data = function(name) {
    var data = new Synergykit.modules.Data(name, Synergykit)
    return data
}

Synergykit.User = function() {
    var user = new Synergykit.modules.Users(Synergykit)
    return user
}

Synergykit.Notification = function(users) {
    var userIds = []
    if (Synergykit.isString(users)) {
        userIds.push(users)
    } else if (users instanceof SynergykitObject && users.get("_id")) {
        userIds.push(users.get("_id"))
    } else if (Synergykit.isArray(users)) {
        for (var i in users) {
            var user = users[i]
            if (user instanceof SynergykitObject && user.get("_id")) {
                userIds.push(user.get("_id"))
            } else if (Synergykit.isString(user)) {
                userIds.push(user)
            }
        }
    }
    if (userIds.length > 0) {
        var notification = new Synergykit.modules.Notifications(userIds, Synergykit)
        return notification
    } else {
        throw Synergykit.Errors.NO_USER_IDS
    }
}

Synergykit.Platform = function() {

    var platform = new Synergykit.modules.Platforms(Synergykit)
    return platform

}

Synergykit.CloudCode = function(url) {

    var functionData = new Synergykit.modules.Functions(url, Synergykit)
    return functionData
}

Synergykit.Mail = function(url) {

    var mail = new Synergykit.modules.Mailing(url, Synergykit)
    return mail

}

Synergykit.File = function(path, name) {
    var file = new Synergykit.modules.Files(path, name, Synergykit)
    return file
}

Synergykit.Query = function(object) {
    var query = new Synergykit.modules.Query(object, Synergykit)
    return query
}

Synergykit.on = function(eventName, callback) {
    Synergykit.rt.addListener({
        synergykit: Synergykit,
        eventName: eventName,
        callback: callback
    })
}
Synergykit.off = function(eventName) {
    Synergykit.rt.removeListener({
        eventName: eventName,
        synergykit: Synergykit
    })
}

Synergykit.socketCreate = function(object, callback) {
    var next = function() {
        Synergykit.rt.create({
            synergykit: Synergykit,
            object: object,
            callback: callback
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }
}

Synergykit.socketUpdate = function(object, callback) {
    var next = function() {
        Synergykit.rt.update({
            synergykit: Synergykit,
            object: object,
            callback: callback
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }
}

Synergykit.socketDestroy = function(object, callback) {
    var next = function() {
        Synergykit.rt.destroy({
            synergykit: Synergykit,
            object: object,
            callback: callback
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }
}

Synergykit.subscribe = function(options, object, callback) {
    var next = function() {
        Synergykit.rt.addListener({
            synergykit: Synergykit,
            eventName: options.eventName,
            filter: options.filter,
            object: object,
            callback: callback
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }

}
Synergykit.unsubscribe = function(options, object) {
    var next = function() {
        Synergykit.rt.removeListener({
            eventName: options.eventName,
            filter: options.filter,
            synergykit: Synergykit,
            object: object
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }

}

Synergykit.speak = function(eventName, message) {
    var next = function() {
        Synergykit.rt.speak({
            synergykit: Synergykit,
            eventName: eventName,
            message: message
        })
    }
    if (!Synergykit.token) {
        var user = Synergykit.User()
        user.set("authData", {
            anonymous: {}
        })
        user.anonymousLogin({
            success: next
        })
    } else {
        next()
    }

}


/*
 *  A private method to get call timing of last call
 */
Synergykit.calcTimeDiff = function() {
    var time = Synergykit._end - Synergykit._start;
    return (time / 1000).toFixed(4);
}

// Helpers
// Is a given variable an object?
Synergykit.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

Synergykit.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

Synergykit.isFunction = function(obj) {
    return typeof obj == 'function' || false;
};

Synergykit.isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

Synergykit.urlify = function(str) {
    return str.replace(/_/g, '-')
        .replace(/ /g, '-')
        .replace(/:/g, '-')
        .replace(/\\/g, '-')
        .replace(/\//g, '-')
        .replace(/[^a-zA-Z0-9\-]+/g, '')
        .replace(/-{2,}/g, '-')
        .toLowerCase();
};

Synergykit.Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Synergykit.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                Synergykit.Base64._keyStr.charAt(enc1) + Synergykit.Base64._keyStr.charAt(enc2) +
                Synergykit.Base64._keyStr.charAt(enc3) + Synergykit.Base64._keyStr.charAt(enc4);

        }

        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }
}