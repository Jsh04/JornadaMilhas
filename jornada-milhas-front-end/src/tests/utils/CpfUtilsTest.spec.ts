import { CpfUtils } from "../../utils/CpfUtils";

test("validCpf_SholdBeTrue_WhenValidCpf", () => {
    const cpfValido = '12345678909';
    expect(CpfUtils.validCpf(cpfValido)).toBe(true);
})

test.each([
    [true, "886.002.660-17"],
    [false, "000.000.000-00"],
    [false, ""],
    [false, "102345"]
])
    ("validCpf_SholdBe_%s_WhenCpfIs %s", (expected, cpf) => {
     expect(CpfUtils.validCpf(cpf as string)).toBe(expected as boolean);
})


