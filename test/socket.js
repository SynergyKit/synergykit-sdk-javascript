var TENANT = "synergykit-sample-app",
    KEY = "a03f2ee1-59e2-463d-a30b-02920075f530",
    COLLECTION = "example",
    DATA = null,
    DATA2 = null


Synergykit.Init(TENANT, KEY, {
    debug: true,
    local: false,
    strategy: "sockets"
})

var gameScore = Synergykit.Data("gamescore")

gameScore.on("created", function(data) {
    console.log("first", data.get("score"))
})
setTimeout(function() {
    gameScore.off("created")
}, 2000)


setTimeout(function() {
    gameScore.on("created", function(data) {
        console.log("second", data.get("score"))
    })
    gameScore.on("created", function(data) {
        console.log("third", data.get("score"))
    })
}, 3000)


setTimeout(function() {
    var gameScore = Synergykit.Data("GameScore")
    gameScore.set("score", 1337)
    gameScore.save({
        success: function(gameScoreResult) {
            DATA = gameScoreResult
        }
    })
}, 4000)


/*
describe("SynergyKit", function() {

    describe("create data", function() {
        it("should return created data with code", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("score", 1337)
            gameScore.save({
                success: function(gameScoreResult) {
                    DATA = gameScoreResult
                    chai.assert.equal(gameScoreResult.get("score"), 1337)
                    done()
                }
            })
        })
    })

    describe("create data", function() {
        it("should return created data with code", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            gameScore.set("score", 1337)
            gameScore.save({
                success: function(gameScoreResult) {
                    DATA2 = gameScoreResult
                    chai.assert.equal(gameScoreResult.get("score"), 1337)
                    done()
                }
            })
        })
    })

    describe("fetch data", function() {
        it("should return fetched data with code", function(done) {
            DATA.fetch({
                success: function(result) {
                    chai.assert.equal(result.get("score"), 1337)
                    done()
                }
            })
        })
    })

    describe("get data", function() {
        it("should return got data with code", function(done) {
            var gameScore = Synergykit.Data("GameScore")
            var query = Synergykit.Query(gameScore).top(2)
            query.find({
                success: function(results) {
                    chai.assert.equal(results.length, 2)
                    done()
                }
            })
        })
    })

    describe("destroy data", function() {
        it("should return got data with code", function(done) {
            DATA.destroy(function() {
                DATA2.destroy(function() {
                    done()
                })
            })
        })
    })
})*/