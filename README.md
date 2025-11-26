# 📌 Projeto DemoFlix

## 📖 Sobre o Projeto

O DemoFlix é uma aplicação Fullstack desenvolvida especificamente para **DESKTOP** para consolidar competências técnicas em Java (Spring Boot), JavaScript, HTML e CSS. O sistema consome dados externos da API do TMDB para oferecer um catálogo imersivo de filmes e séries, permitindo aos usuários explorar sinopses, detalhes técnicos e assistir a trailers.

*Principais Funcionalidades:*

- ✅ **Autenticação**: Cadastro e Login de usuários.
- ✅ **Catálogo Interativo**: Visualização detalhada e trailers de filmes e séries de diversos gêneros.
- ✅ **Gestão de Favoritos**: O usuário pode montar e gerenciar sua própria lista personalizada de títulos.
- ✅ **Exclusão de Conta**: Usuários têm a opção de deletar sua conta permanentemente.

### 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-%2300E599.svg?style=for-the-badge&logo=neon&logoColor=black)

- **HTML** → Estrutura da página e marcação semântica.
- **CSS** → Estilização da interface e responsividade.
- **JavaScript** → Manipulação do DOM e comunicação com a API do TMDB.
- **Java & Spring Boot** → Lógica do Backend e desenvolvimento da API REST.
- **Neon & Spring Data JPA** → Banco de dados PostgreSQL Serverless gerenciado via JPA para persistência de dados.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura Monorepo organizada da seguinte forma:

```text
demoflix/
│
├── 📂 backend/              # API Java Spring Boot
│   ├── src/main/java       # Lógica do Backend (Controller, Service, Repository)
│   ├── src/main/resources  # Configurações (application.properties)
│   ├── Dockerfile          # Configuração Docker para o Render
│   └── pom.xml             # Dependências Maven
│
├── 📂 frontend/             # Aplicação Web
│   ├── 📂 public/           # Arquivos estáticos (Imagens, Ícones)
│   ├── 📂 src/              # Código fonte
│   │   ├── 📂 css/          # Folhas de estilo
│   │   ├── 📂 js/           # Scripts e Lógica
│   │   └── 📂 pages/        # Páginas HTML adicionais
│   └── index.html           # Ponto de entrada principal
│
└── README.md               # Documentação

```
---
## 🚀 Demonstração ao Vivo e Performance

O projeto está online! O pipeline de deploy utiliza o **Netlify** para o frontend e o **Render** para a API backend..

🔗 **Acesse agora:** [**DemoFlix Live**](https://demoflix3.netlify.app)

> **⚠️ Observação:**
> Como a aplicação está hospedada em planos **gratuitos**, o servidor pode entrar em modo de hibernação. Portanto, o primeiro acesso pode levar alguns segundos a mais para acordar o **backend** ou aprensentar lentidão. Agradeço a compreensão!

---

## 👨‍💻 Autor

**Desenvolvido por Ednei Gonzaga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ednei-gonzaga-ti)



---
# 📌 Project DemoFlix - Version "English"

## 📖 About the Project

DemoFlix is a Fullstack application developed to consolidate technical skills in Java (Spring Boot), JavaScript, HTML, and CSS. The system consumes external data from TMDB to offer an immersive catalog of movies and TV shows, allowing users to explore synopses, technical details, and watch trailers.

*Key Features:*

- ✅**Authentication**: User registration and Login.
- ✅**Interactive Catalog**: Detailed views and trailers for movies and series across various genres.
- ✅**Favorites Management**: Users can build and manage their own personalized list of titles.
- ✅**Account Deletion**: Users have the option to permanently delete their account.

### 🛠 Technologies Used

The project was developed using the following technologies:

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-%2300E599.svg?style=for-the-badge&logo=neon&logoColor=black)

- **HTML** → Page structure and semantic markup.
- **CSS** → Interface styling and.
- **JavaScript** → DOM manipulation and communication with the TMDB API.
- **Java & Spring Boot** → Backend logic and REST API development.
- **Neon & Spring Data JPA** → Serverless PostgreSQL database managed via JPA for data persistence.

## 📂 Project Structure

The project follows a Monorepo architecture organized as follows:

```text
demoflix/
│
├── 📂 backend/              # Java Spring Boot API
│   ├── src/main/java       # Backend Logic (Controller, Service, Repository)
│   ├── src/main/resources  # Configuration (application.properties)
│   ├── Dockerfile          # Docker configuration for Render
│   └── pom.xml             # Maven dependencies
│
├── 📂 frontend/             # Web Application
│   ├── 📂 public/           # Static assets (Images, Icons)
│   ├── 📂 src/              # Source code
│   │   ├── 📂 css/          # Stylesheets
│   │   ├── 📂 js/           # Scripts & Logic
│   │   └── 📂 pages/        # Additional HTML pages
│   └── index.html           # Main entry point
│
└── README.md               # Documentation
```
---
## 🚀 Live Demo & Performance

The project is live! The deployment pipeline utilizes **Netlify** for the frontend and **Render** for the backend API.

🔗 **Check it out:** [**DemoFlix Live**](https://demoflix3.netlify.app)

> **⚠️ Infrastructure Note:**
> Since this application is hosted on free tier instances, the server may experience a "Cold Start" delay. The **first request** might take a few seconds to wake up the backend. Thank you for understanding!

---

## 👨‍💻 Author

**Developed by Ednei Gonzaga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ednei-gonzaga-ti)


