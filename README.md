# Tripleten web_project_around_pt

- Este repositório contém a implementação do Projeto 8, seguindo todas as especificações e requisitos técnicos definidos no curso. O objetivo é criar uma página interativa com cartões dinâmicos, modais funcionais e manipulação de DOM utilizando JavaScript puro.

🚀 Sobre o Projeto
O projeto consiste em uma página web composta por cartões gerados dinamicamente, um sistema de pop-ups/modais e funcionalidades completas para criação, visualização e remoção de cards. Toda a lógica foi implementada seguindo boas práticas de JavaScript, estruturação de arquivos e estilo de código.

🧩 Funcionalidades Implementadas
✔️ Cards iniciais

- Gerados a partir de um elemento <template> no HTML.
- Baseados no array initialCards contendo seis objetos com name e link.
- Construídos pela função getCardElement().

✔️ Interações com o Card

- Botão de curtir altera a cor do coração.
- Botão de deletar remove o card do DOM.
- Clique na imagem abre um modal com imagem ampliada + título.

✔️ Criação de novos cards

- Ao clicar no botão Criar no modal “Novo Local”:
- O modal é fechado.
- Um novo card aparece como primeiro item do container.

✔️ Modais

- Abertos e fechados pelas funções openModal() e closeModal().
- Modal “Editar perfil” preenche os campos automaticamente com os dados atuais.
- Ao enviar o formulário de edição, nome e descrição do perfil são atualizados.

👨‍💻 Boas Práticas e Regras Atendidas
🟦 Estilo de Código

- Variáveis com substantivos e descrições claras.
- Funções com nomes descritivos começando por verbos.
- camelCase usado em todo o projeto.
- Sem abreviações ambíguas.
- Cada função realiza apenas uma tarefa.

🟦 JavaScript

- Todos os elementos do DOM armazenados em const.
- Nenhum uso de innerHTML com dados do usuário.
- Ausência de código duplicado.
- let utilizado apenas quando o valor realmente muda.
- Otimização: elementos DOM montados antes de serem inseridos.
- Sem código morto ou não utilizado.

🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Manipulação de DOM
- Estrutura modular com pastas dedicadas (blocks, images, scripts)
