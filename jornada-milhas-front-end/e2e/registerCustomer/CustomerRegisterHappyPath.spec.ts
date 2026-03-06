import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/cadastro')
  await page.getByRole('textbox', { name: 'Nome*:' }).click();
  await page.getByRole('textbox', { name: 'Nome*:' }).fill('Jos');
  await page.getByRole('textbox', { name: 'Nome*:' }).press('Dead');
  await page.getByRole('textbox', { name: 'Nome*:' }).fill('Josp');
  await page.getByRole('textbox', { name: 'Nome*:' }).press('Dead');
  await page.getByRole('textbox', { name: 'Nome*:' }).fill('Jos');
  await page.getByRole('textbox', { name: 'Nome*:' }).press('Dead');
  await page.getByRole('textbox', { name: 'Nome*:' }).fill('José Silvio Henrique Barros de Souza');
  await page.getByRole('textbox', { name: 'Data de Nascimento*:' }).fill('2004-04-02');
  await page.getByRole('textbox', { name: 'CPF:' }).click();
  await page.getByRole('textbox', { name: 'CPF:' }).fill('701.885.884-42');
  await page.getByRole('textbox', { name: 'Telefone:' }).click();
  await page.getByRole('textbox', { name: 'Telefone:' }).fill('(81) 99265-9528');
  await page.getByRole('textbox', { name: 'Cidade:' }).click();
  await page.getByRole('textbox', { name: 'Cidade:' }).fill('Recife');
  await page.getByLabel('Estado').selectOption('PE');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('josesilvio.bs@gmail.com');
  await page.getByText('Confirmar e-mail:').click();
  await page.getByText('Confirmar e-mail:').click();
  await page.getByRole('textbox', { name: 'Confirmar e-mail:' }).fill('josesilvio.bs@gmail.com');
  await page.getByRole('textbox', { name: 'Senha:', exact: true }).click();
  await page.getByRole('textbox', { name: 'Senha:', exact: true }).fill('1234');
  await page.getByRole('textbox', { name: 'Confirmar Senha:' }).click();
  await page.getByRole('textbox', { name: 'Confirmar Senha:' }).fill('1234');
  await page.getByRole('checkbox', { name: 'Li e aceito os termos e condi' }).check();
  await page.getByRole('button', { name: 'Criar minha conta' }).click();

});