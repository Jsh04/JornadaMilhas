import PhoneValidator from "../../../core/validations/PhoneValidator";

test.each([
    [true, '(11) 98765-4321'],
    [true, '(21) 99876-5432'],
    [true, '(85) 91234-5678'],

    // Celulares sem formatação
    [true, '11987654321'],
    [true, '21998765432'],
    [true, '85912345678'],

    // Celulares com código do país
    [true, '+55 11 98765-4321'],
    [true, '+5511987654321'],
    [true, '55 11 98765-4321'],
    [true, '5511987654321'],

    // Telefones fixos com formatação
    [true, '(11) 3456-7890'],
    [true, '(21) 2345-6789'],
    [true, '(85) 3234-5678'],

    // Telefones fixos sem formatação
    [true, '1134567890'],
    [true, '2123456789'],
    [true, '8532345678'],

    // Telefones fixos com código do país
    [true, '+55 11 3456-7890'],
    [true, '+551134567890'],
    [true, '551134567890'],

    // Diferentes separadores válidos
    [true, '11.98765.4321'],
    [true, '11 98765 4321'],
    [true, '11-98765-4321'],

    // DDD inválido
    [false, '(00) 98765-4321'],
    [false, '(10) 98765-4321'],
    [false, '(01) 98765-4321'],
    [false, '0987654321'],

    // Celular sem o dígito 9
    [false, '(11) 88765-4321'],
    [false, '11887654321'],
    [false, '(11) 78765-4321'],
    [false, '11787654321'],

    // Números muito curtos
    [false, '1198765'],
    [false, '119876543'],
    [false, '123456'],
    [false, '11987'],

    // Números muito longos
    [false, '119876543210000'],
    [false, '11987654321000'],
    [false, '1198765432100'],

    // Valores vazios ou inválidos
    [false, ''],
    [false, 'abcdefghijk'],
    [false, 'telefone'],
    [false, '(11) abcd-efgh'],

    // Espaços extras (mas válidos)
    [true, '  (11) 98765-4321  '],
    [true, '  11987654321  '],
])('isValid_ShouldReturn_%s_WhenPhonePassedIs_%s', (expected: boolean, value: string | null | undefined) => {
    expect(PhoneValidator.isValid(value)).toBe(expected);
});

test.each([
    [false, null],
    [false, undefined],
])('isValid_ShouldReturn_%s_WhenPhonePassedIs_%s', (expected: boolean, value: string | null | undefined) => {
    expect(PhoneValidator.isValid(value)).toBe(expected);
});
