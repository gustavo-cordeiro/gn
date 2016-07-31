# Formulário

Utilizando o JSON `fields.json` que está na raiz do repositório, renderizar o formulário de pedidos da forma que é exibido [aqui](https://www.getninjas.com.br/moda-e-beleza/cabeleireiros).

# Informações adicionais

- No exemplo, na pergunta "Qual será o serviço", o último campo é um `input` do tipo `text`, para este exemplo não é necessário faze-lo. (só é preciso exibir os `checkbox`);
- É necessário exibir a mensagem "este campo é requerido" para os marcados como `required: true`;
- Campos do tipo `enumerable` podem ser tanto `checkbox` quanto `select`, o que diferencia um do outro é a opção `allow_multiple_value`, quando essa opção estiver como `true` é um campo do tipo `checkbox` quando estiver como `false` é do tipo `select`.;
- O formulário não precisa fazer `POST`;

#Para rodar

- Dependencias: NPM e Gulp;
- Clonar o projeto;
- $ npm install;
- $ gulp serve;
