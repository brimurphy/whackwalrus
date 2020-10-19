
describe("Timer", function() {
    it("Countdown timer", function() {
        var actual = randomTime(300, 1500)
        
        expect(actual).toBeLessThan(1500)
        expect(actual).toBeGreaterThan(300)
    })
})

describe("Validations", function() {
    it("Is valid name", function() {
        var name = "Brian"
        expect(isValidName(name)).toBe(true)
    })
    it("Is invalid name", function() {
        var name = ""
        expect(isValidName(name)).toBe(false)
    })
})