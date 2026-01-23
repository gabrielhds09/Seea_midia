# Logo Files

Para usar o logo corretamente:

1. Salve uma das imagens do logo (PNG ou SVG) como `logo-seea.png` ou `logo-seea.svg`
2. Coloque o arquivo na pasta `public/` na raiz do projeto
3. O caminho final deve ser: `seea-web/public/logo-seea.png`

O componente HeroCinematic agora está configurado para carregar a imagem diretamente.

Se preferir usar o SVG, altere a linha:
```tsx
src="/logo-seea.png"
```
para:
```tsx
src="/logo-seea.svg"
```
