# Vida de Formiga 3D

Jogo web 3D em que o jogador controla uma formiga em um quintal gigante.

## Estrutura limpa

- `index.html`: versao principal para GitHub Pages
- `JOGAR_3D.html`: versao local do mesmo jogo
- `assets/formiga_nova/`: modelo 3D real da formiga
- `servidor_3d.js`: servidor local simples
- `JOGAR_3D.bat`: abre o jogo no Windows

## Jogar localmente

Abra:

```text
JOGAR_3D.bat
```

Ou use o servidor local:

```bash
node servidor_3d.js
```

Depois acesse:

```text
http://127.0.0.1:5199/
```

## GitHub Pages

O arquivo `index.html` ja esta pronto para GitHub Pages usando Three.js via CDN.

Depois de ativar Pages no repositorio, a pagina fica em:

```text
https://carloshenriqueaze.github.io/ant-s-life/
```

## Controles

- `W`: andar / subir em arvores
- `S`: recuar / descer em arvores
- `A` e `D`: virar / contornar troncos
- `Shift + W`: correr com folego limitado
- `E`: entrar/sair de buracos, subir/descer de arvores e entrar/sair da arvore principal

## Recursos

- Formiga 3D real em glTF
- Mapa gigante com relevo
- Arvores enormes, montanhas, buracos, teias e predadores
- Arvore principal com caminho interno e missao de seiva
- Passaros no ceu
- Sistema de vida, comida e folego
