# 📋 CNI Chamados — Gerenciamento de Chamados Corporativos

Aplicação web responsiva desenvolvida em Angular para gerenciamento de chamados de serviço corporativos.  
O sistema permite **listar, cadastrar, editar, excluir e pesquisar chamados em tempo real**, oferecendo uma interface simples, organizada e acessível, construída com tecnologias modernas de front-end.

---

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação web responsiva para gerenciamento de chamados de serviço corporativos, com foco em:

- Interface funcional e intuitiva
- Organização e boas práticas de código
- Simulação de dados sem dependência de backend
- Facilidade de avaliação e execução local

---

## ✅ Funcionalidades Implementadas

- 📄 Listagem de chamados de serviço
  - Exibição de ID, título, descrição, categoria e data de criação
- ➕ Cadastro de novos chamados
- ✏️ Edição de chamados existentes
- 🗑️ Exclusão de chamados com confirmação
- 🔍 Pesquisa e filtro de chamados em tempo real
  - Filtragem instantânea conforme o usuário digita
- 📅 Data de criação gerada automaticamente
- 🔔 Feedback visual ao usuário (sucesso, alerta e validações)
- 📱 Interface totalmente responsiva (desktop e mobile)
- 🌗 Suporte a tema claro e escuro (Light / Dark Mode)

---

## 🧪 Simulação de Dados

A aplicação utiliza dados simulados através de:

- Arquivo JSON inicial
- Persistência em LocalStorage
- Serviço Angular simulando uma API local

Não há dependência de backend, facilitando testes, avaliação e execução local.

---

## 🎨 UI / UX e Acessibilidade

- Componentes de UI utilizando **PrimeNG**
- Uso de **PrimeIcons** para padronização visual
- Layout responsivo com **Tailwind CSS**
- Interface simples, clara e intuitiva
- Feedback visual para ações do usuário
- Navegação direta entre telas
- Uso de padrões visuais consistentes para melhor experiência do usuário

---

## 🧱 Organização e Arquitetura

A aplicação foi estruturada seguindo boas práticas do Angular, com separação clara de responsabilidades:

- **Core**  
  Contém modelos, serviços e regras centrais da aplicação (ex.: serviços de chamados e tema).

- **Pages**  
  Componentes de páginas principais, como listagem e criação de chamados.

- **Shared**  
  Componentes reutilizáveis da aplicação, como o header (navbar).

- **Services**  
  Responsáveis pela simulação de persistência de dados e regras de negócio, utilizando LocalStorage.

Essa organização prioriza **legibilidade, reutilização de código, escalabilidade e fácil manutenção**.

---

## 🧠 Decisões Técnicas Relevantes

- Uso de **Standalone Components**, reduzindo boilerplate e simplificando a estrutura
- Uso do **novo Control Flow do Angular (`@if`)** e **Signals**, alinhado às versões mais recentes do framework
- Persistência de dados via **LocalStorage**, simulando um backend sem dependências externas
- Implementação de **tema claro e escuro** utilizando PrimeNG (Aura) e controle centralizado de tema
- Implementação de **filtro em tempo real** para melhorar a experiência do usuário
- Combinação de **PrimeNG + Tailwind CSS**, equilibrando produtividade, consistência visual e flexibilidade

---

## 🚀 Tecnologias Utilizadas

- **Angular CLI: 21.0.3**
- **Angular Framework: 21.0.3**
- **TypeScript**
- **PrimeNG**
- **PrimeIcons**
- **Tailwind CSS**
- **HTML5**
- **CSS3**
- **LocalStorage**
- **RxJS**
- **Git e GitHub**

### Justificativa das escolhas

- **Angular**: Framework robusto, escalável e amplamente utilizado em aplicações corporativas
- **PrimeNG**: Biblioteca de componentes rica, acessível e produtiva
- **Tailwind CSS**: Framework utilitário que permite construção rápida de layouts responsivos, maior controle visual direto no template e redução de CSS customizado, facilitando manutenção e padronização da interface
- **LocalStorage**: Permite simular persistência de dados sem backend
- **TypeScript**: Tipagem forte e maior segurança no desenvolvimento

---

## 🧭 Navegação da Aplicação

- `/chamados` → Listagem de chamados
- `/chamados/novo` → Cadastro de novo chamado

---

## 🤖 Uso de Inteligência Artificial e Ferramentas de Apoio

Durante o desenvolvimento deste projeto, foram utilizadas ferramentas de apoio baseadas em Inteligência Artificial (como ChatGPT) de forma pontual, com o objetivo de:

- Esclarecimento de dúvidas conceituais
- Apoio na revisão de trechos de código
- Sugestão de melhorias de organização e boas práticas
- Aceleração de tarefas repetitivas ou estruturais

Todas as decisões técnicas, arquitetura da aplicação, organização de pastas, fluxos, regras de negócio e ajustes finais de código foram realizadas e validadas pelo desenvolvedor, garantindo total compreensão e domínio sobre a solução entregue.

---

## 📊 Percentual Estimado de Autoria

- Código desenvolvido pelo autor: **60%**
- Código com apoio de ferramentas de IA: **40%**

A Inteligência Artificial foi utilizada como ferramenta de suporte e aceleração, sem substituir o raciocínio técnico, a tomada de decisões ou a implementação final.

---

## ⚙️ Instalação e Execução do Projeto

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Angular CLI instalado globalmente

### Passo a passo

```bash
# Clonar o repositório
git clone https://github.com/DersonSilva/cni-chamados.git

# Entrar na pasta do projeto
cd cni-chamados

# Instalar as dependências
npm install

# Executar o projeto
ng serve
```
