# MorarMorei

## Instalar Docker:
https://docs.docker.com/install/

## Instalar Docker Compose:
https://docs.docker.com/compose/install/

## Criando o banco de dados (basta rodar 1 vez)
`sudo docker-compose run web rake db:create`

## Para migrar o banco de dados (quando algum commit adiciona alguma migration)
`sudo docker-compose run web rake db:migrate`

## Para popular o banco de dados (com o arquivo db/TBL_IMV_ROCA.csv)
Aviso: pode demorar alguns minutos.
`sudo docker-compose run web rake db:seed`

## Desenvolvendo com Docker:

Apos instalar o Docker, Docker Compose e clonar o repositorio, de build na imagem:
`sudo docker-compose build`

Para iniciar o container:
`sudo docker-compose up -d`

Para parar o container:
`sudo docker-compose down`

O site estara rodando em `localhost:3000`.

Quaisquer alteracoes nos arquivos em /app serao automaticamente refletidas no site, basta dar refresh no browser.

Para rodar um bash no container (que tem Ruby, Rails, etc instalado), execute:
`sudo docker-compose run web bash`

Dentro do bash do container voce pode criar um novo controller, por exemplo, executando:
`rails generate controller NomeController`

Para encerrar a sessao, aperte CTRL-P e depois CTRL-Q.

## Instalando novas dependencias:

Todas as dependencias devem ser adicionadas ou no Dockerfile, ou no Gemfile.
Apos refletir as alteracoes no container:
`sudo docker-compose down`

`sudo docker-compose build`

`sudo docker-compose up -d`

