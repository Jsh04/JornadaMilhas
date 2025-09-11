import EmailUtils from "../../utils/EmailUtils"


test.each([
  [true, "usuario@email.com"],
  [true, "usuario.sobrenome@dominio.com.br"],
  [true, "meu-email123@provedor.net"],
  [true, "nome+tag@empresa.co"],
  [false ,"usuarioemail.com"],
  [false, "usuario@"],
  [false, "@dominio.com" ],
  [false, "usuario@dominio"],  
  [false, "usuario@dominio."],
  [false, "usuario@dominio..com" ],
  [false, ""]
])("validEmail_ShouldBeReturn %s_WhenEmailPassedIs %s", (expected: boolean, value: string) => {
    expect(EmailUtils.validEmail(value)).toBe(expected);
})