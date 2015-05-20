var TENANT = "synergykit-sample-app",
    KEY = "a03f2ee1-59e2-463d-a30b-02920075f530",
    COLLECTION = "example",
    DATA = null,
    DATA2 = null,
    USER = null,
    USER2 = null,
    FILE = null,
    PLATFORM = null


describe("SynergyKIT", function() {
    describe("Initialization", function() {
        it("should return intialization credentials", function() {
            Synergykit.Init(TENANT, KEY)
            chai.assert.equal(Synergykit.tenant, TENANT)
            chai.assert.equal(Synergykit.key, KEY)
        })
    })
    describe("Testing API root", function() {
        it("should return error null", function(done) {
            Synergykit.request({},{
                success: function(apiDetail, statusCode) {
                    chai.assert.equal(apiDetail.tenant, TENANT)
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    done()
                }
            })
        })
    })
    // Batch
    describe("Batch POST /data", function(){
        it("should return created data with code 200 twice", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("score", 1337)
            gameScore.save()

            var gameScore2 = Synergykit.Data("GameScore")
            gameScore2.set("score", 1338)
            gameScore2.save()
            Synergykit.runBatch({
                success: function(result) {
                    chai.assert.equal(result.length, 2)
                    
                    for(var i in result) {
                        var gameScoreResult = Synergykit.Data("GameScore")
                        gameScoreResult.set("_id", result[i].get("_id"))
                        gameScoreResult.destroy()
                    }
                    Synergykit.runBatch({
                        success: function(result, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        },
                        error: function(error) {
                        }
                    })
                },
                error: function(error) {
                }
            })
        })
    })

    /*describe("POST /files", function(){
        it("should return uploaded file", function(done) {
            var file = Synergykit.File("logo_orange.png")
            file.upload({
                success: function(file, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    file.fetch({
                        success: function(refreshedFile, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(refreshedFile.get("_id"), file.get("_id"))  
                            FILE = refreshedFile                          
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })*/


    /*describe("GET /files/:id", function(){
        it("should return file by id", function(done) {
            var file = Synergykit.File()
            file.set("_id", FILE.get("_id"))
            file.fetch({
                success: function(file, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(FILE.get("_id"), file.get("_id"))  
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })*/
    describe("GET /files", function(){
        it("should return files", function(done) {
            var query = Synergykit.Query(Synergykit.File()).top(1)
            query.find({
                success: function(file, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    FILE = file
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    /*describe("DELETE /files/:id", function(){
        it("should delete file by id", function(done) {
            FILE.destroy({
                success: function(result, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })*/

    describe("POST /functions/:url", function(){
        it("should run function by url", function(done) {
            var cloudCode = Synergykit.CloudCode("example")
            cloudCode.set("name", "Anakin")
            cloudCode.run({
                success: function(result, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    /*describe("POST /mail/:url", function(){
        it("should send mail by url", function(done) {
            var mail = Synergykit.Mail("werq")
            mail.set("email", "tomas.herma@letsgood.com")
            mail.set("subject", "Test SDK")
            mail.set("name", "Anakin")s
            mail.send({
                success: function(result, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })*/

    describe("POST /data", function(){
        it("should return created data with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("score", 1337)
            gameScore.save({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    gameScore.fetch({
                        success: function(refreshedGameScore, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(refreshedGameScore.get("_id"), gameScore.get("_id"))  
                            DATA = refreshedGameScore                          
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /data", function(){
        it("should return created data with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("score", 1337)
            gameScore.save({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    DATA2 = gameScore
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("GET /data/:url", function(){
        it("should return requested data with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            var query = Synergykit.Query(gameScore)
            query.find({
                success: function(results, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(results[0].get("score"), 1337)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("PUT /data/:url/:id", function(){
        it("should return updated data with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set(DATA.get())
            gameScore.set("score", 1338)
            gameScore.save({
                success: function(updatedScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(updatedScore.get("score"), 1338)
                    chai.assert.equal(updatedScore.get("__v"), 1)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /data/:url with query", function(){
        it("should return requested data with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            var query = Synergykit.Query(gameScore).where().attribute("score").isEqualTo(1338)
            query.find({
                success: function(results, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(results[0].get("score"), 1338)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /data/:url with query", function(){
        it("should return requested data with code 200", function(done) {
            var query = Synergykit.Query(Synergykit.Data("GameScore"))
            query.find({
                success: function(results, statusCode) {
                    console.log(results.length)
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(results.length, 2)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /data/:url/:id", function(){
        it("should return requested data by id with code 200", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("_id", DATA.get("_id"))
            gameScore.fetch({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(gameScore.get("_id"), DATA.get("_id"))
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("GET /data/:url/:id", function(){
        it("should return refreshed data by id with code 200", function(done) {
            DATA.fetch({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(gameScore.get("_id"), DATA.get("_id"))
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    
    

    describe("POST /users", function(){
        it("should return created user", function(done) {
            var user = Synergykit.User()
            user.set("name", "Anakin Skywalker")
            user.set("email", "anakin@skywalker.com")
            user.set("password", "test")
            user.save({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    user.fetch({
                        success: function(refreshedUser, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(refreshedUser.get("hashedPassword"), user.get("hashedPassword"))
                            USER = refreshedUser                          
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users", function(){
        it("should return created user", function(done) {
            var user = Synergykit.User()
            user.set("name", "Anakin Skywalker 2")
            user.set("email", "anakin2@skywalker.com")
            user.set("password", "test")
            user.save({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    user.fetch({
                        success: function(refreshedUser, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(refreshedUser.get("hashedPassword"), user.get("hashedPassword"))
                            USER2 = refreshedUser                          
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users/login", function(){
        it("should return logged user", function(done) {
            var user = Synergykit.User()
            user.set("email", "anakin@skywalker.com")
            user.set("password", "test")
            user.login({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(user.get("email"), "anakin@skywalker.com")
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /data/:collection/:id/:user_id", function(){
        it("add access to data", function(done) {
            DATA.addAccess(USER, {
                success: function(data, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(data.get("user_ids").length, 2)
                    DATA = data
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("DELETE /data/:collection/:id/:user_id", function(){
        it("remove access to data", function(done) {
            DATA.removeAccess(USER, {
                success: function(data, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(data.get("user_ids").length, 1)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /files/:id/:user_id", function(){
        it("add access to file", function(done) {
            FILE.addAccess(USER, {
                success: function(file, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(file.get("user_ids").length, 1)
                    FILE = file
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("DELETE /files/:id/:user_id", function(){
        it("remove access to file", function(done) {
            FILE.removeAccess(USER, {
                success: function(file, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(file.get("user_ids").length, 0)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users/:id/roles", function(){
        it("should update user role by id", function(done) {          
            USER2.addRole("test1",{
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(user.get("roles").length, 2)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("DELETE /users/:id/roles/test1", function(){
        it("should update user role by id", function(done) {          
            USER2.removeRole("test1",{
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(user.get("roles").length, 1)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users/notification", function(){
        it("should send notification to user", function(done) {
            var notification = Synergykit.Notification(USER)
            notification.set("alert", "I'm your father!")
            notification.send({
                success: function(result, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users/:id/platforms", function(){
        it("should return added platform of user", function(done) {
            var platform = Synergykit.Platform()
            platform.set("platformName", "android")
            platform.set("registrationId", "2343wdhqr9689")
            platform.save({
                success: function(platform, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.notEqual(platform.get("_id"), undefined)
                    platform.fetch({
                        success: function(refreshedPlatform, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(refreshedPlatform.get("registrationId"), platform.get("registrationId"))
                            PLATFORM = refreshedPlatform                          
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    
    describe("GET /users/:id/platforms/:platform", function(){
        it("should return user platforms by id", function(done) {
            var platform = Synergykit.Platform()
            platform.set("_id", PLATFORM.get("_id"))
            platform.fetch({
                success: function(platform, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(platform.get("registrationId"), PLATFORM.get("registrationId"))
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })    
    describe("PUT /users/:id/platforms/:platform", function(){
        it("should update user platform by id", function(done) {
            PLATFORM.set("registrationId", "2343wdhqr96899")
            PLATFORM.save({
                success: function(platform, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(platform.get("registrationId"), "2343wdhqr96899")
                    chai.assert.equal(platform.get("__v"), 1)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /users/:id/platforms", function(){
        it("should get user platforms by query", function(done) {
            var platform = Synergykit.Platform()
            platform.fetch({
                success: function(platforms, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(platforms[0].get("platformName"), "android")
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("DELETE /users/:id/platforms/:platform", function(){
        it("should delete user platform and return empty object", function(done) {
            PLATFORM.destroy({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })


    describe("GET /users/:id", function(){
        it("should return user by id", function(done) {
            var user = Synergykit.User()
            user.set("_id", USER.get("_id"))
            user.fetch({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(user.get("email"), USER.get("email"))
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })    
    describe("PUT /users/:id", function(){
        it("should update user by id", function(done) {            
            USER.fetch({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    user.set("name", "Darth Vader")
                    user.save({
                        success: function(user, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            chai.assert.equal(user.get("name"), "Darth Vader")
                            done()
                        },
                        error: function(error, statusCode) {
                            chai.assert.equal(statusCode, 200)
                            done()
                        }
                    })
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /users", function(){
        it("should get users by query", function(done) {
            var query = Synergykit.Query(Synergykit.User()).where().startsWith("name","Darth")
            query.find({
                success: function(users, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(users[0].get("name"), "Darth Vader")
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("GET /users", function(){
        it("should get all users", function(done) {
            var user = Synergykit.User()
            var query = Synergykit.Query(user)
            query.find({
                success: function(users, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    //chai.assert.equal(users.length, 2)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("DELETE /users/:id", function(){
        it("should delete user by id", function(done) {
            USER.destroy({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("DELETE /data/:url/:id", function(){
        it("should return empty object with code 200", function(done) {
            DATA.destroy({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
    describe("DELETE /data/:url/:id", function(){
        it("should return empty object and delete data 2", function(done) {
            DATA2.destroy({
                success: function(gameScore, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("POST /users/login", function(){
        it("should return logged user", function(done) {
            var user = Synergykit.User()
            user.set("email", "anakin2@skywalker.com")
            user.set("password", "test")
            user.login({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    chai.assert.equal(user.get("email"), "anakin2@skywalker.com")
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })

    describe("DELETE /users/:id", function(){
        it("should delete user 2 by id", function(done) {
            USER2.destroy({
                success: function(user, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                },
                error: function(error, statusCode) {
                    chai.assert.equal(statusCode, 200)
                    done()
                }
            })
        })
    })
})