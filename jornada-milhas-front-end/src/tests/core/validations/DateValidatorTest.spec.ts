
import DateValidator from '../../../core/validations/DateValidator';


test.each([
    [false, ""],
    [false, null],
    [false, undefined],
    [true, "2000-01-15"],
    [true, "2000-01-15T10:30:00"],
    [true, "2000-01-15T10:30:00.000Z"],
    [false, "data-invalida"],
    [false, "32/13/2000"],
    [true, "2000-02-30T10:30:00"],
    [false, "2000-13-01"],
    [true, "2000-01-01"],
    [true, "2000-12-31"],
    [true, "2000-02-29"],
    [true, "2001-02-29"],
    [false, "12345678"],
    [false, "   "],
    [true, "1900-01-01"],
    [true, "2100-12-31"],
    [false, "31/12/2000"],
    [false, "!@#$%^&*()"]
])
("dateIsValid_ShouldReturn_%s_WhenDatePassedIs_%s", (expected: boolean, value: string | null | undefined) => {
    expect(DateValidator.dateIsValid(value)).toBe(expected);
});

test.each([
    ["2000-01-01", 18, true],
    ["2010-01-01", 18, false],
    ["", 18, false],
    ["2008-01-02", 18, true],
])
("minAge_ShouldReturn_%s_WhenDatePassedIs_%s", (value: string, minAge: number, expected: boolean) => {
    expect(DateValidator.minAge(value, minAge)).toBe(expected);
});


test("minAge_ShouldReturnFalse_WhenMinimumAgeWasntReachedDueOfmonth", () => {
    const dateNow = new Date();
    const yearBirth = new Date().getUTCFullYear() - 18;
    const dateTest = new Date(Date.UTC(yearBirth, dateNow.getUTCMonth(), dateNow.getUTCDate() + 1));
    const dateStringTest = dateTest.toUTCString();
    expect(DateValidator.minAge(dateStringTest, 18)).toBe(false)
})

