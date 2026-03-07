import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';
test('Cadastro_ShouldCreateCustomer_WhenPassedCorrectData', async ({ page }) => {
  
  const email = faker.internet.email();
  const nome = "test_" + faker.person.fullName();
  const cpfrRamdon = cpf.generate();
  await page.goto('http://localhost:5173/');


  await page.getByRole('link', { name: 'Cadastre-se' }).click();
  await page.getByRole('textbox', { name: 'Nome*:' }).click();
  await page.getByRole('textbox', { name: 'Nome*:' }).fill(nome);
  await page.getByRole('textbox', { name: 'Data de Nascimento*:' }).fill('2004-04-02');
  await page.getByRole('textbox', { name: 'CPF:' }).click();
  await page.getByRole('textbox', { name: 'CPF:' }).fill(cpfrRamdon);
  await page.getByRole('textbox', { name: 'Telefone:' }).click();
  await page.getByRole('textbox', { name: 'Telefone:' }).fill('(81) 9921');
  await page.getByRole('textbox', { name: 'Telefone:' }).press('Insert');
  await page.getByRole('textbox', { name: 'Telefone:' }).fill('(81) 99265-9528');
  await page.getByRole('textbox', { name: 'Cidade:' }).click();
  await page.getByRole('textbox', { name: 'Cidade:' }).fill('Recife');
  await page.getByLabel('Estado').selectOption('PE');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(email);
  await page.getByRole('textbox', { name: 'Confirmar e-mail:' }).click();
  await page.getByRole('textbox', { name: 'Confirmar e-mail:' }).fill(email);
  await page.getByRole('textbox', { name: 'Senha:', exact: true }).click();
  await page.getByRole('textbox', { name: 'Senha:', exact: true }).fill('1234');
  await page.getByRole('textbox', { name: 'Confirmar Senha:' }).click();
  await page.getByRole('textbox', { name: 'Confirmar Senha:' }).fill('1234');
  await page.getByRole('checkbox', { name: 'Li e aceito os termos e condi' }).check();
  await page.getByRole('button', { name: 'Criar minha conta' }).click();

  await page.waitForSelector('.swal2-popup.swal2-modal.swal2-icon-success', { timeout: 10000 });

  await page.getByRole('button', { name: 'OK' }).click();
});
