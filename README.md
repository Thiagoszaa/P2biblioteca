1. Rode o script `banco.sql` no MySQL/workbench.
2. Ajuste usuario/senha, só criar um .env com as senhas .
3. `npm install`
4. `npm start` (http://localhost:3000)

Rotas: GET /livro, GET /livro/:id, POST /livro, PUT /livro/:id, DELETE /livro/:id
Body (JSON): { "titulo": "...", "autor": "...", "isbn": "..." }
