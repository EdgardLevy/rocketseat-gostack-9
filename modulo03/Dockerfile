# este arquivo define as intrucoes para montar uma imagem
# define a imagem a ser utilizada
# nesse caso eh node:alpine com funcionalidades
# bem reduzidas
FROM node:alpine
# diretorio que vai ser usado no container
WORKDIR /usr/app
# copia os arquivos para o dir
COPY package*.json ./
# executa o yarn para a instalacao de pacotes
RUN yarn
# depois copia todos os outros arquivos

# o arquivo .dockerignore configura quais arquivos serao ignorados pelo docker
# copia todos outros arquivos e pastas
COPY . ./

#expoe a porta que o app usa
EXPOSE 3333
#instrucoes do comando
CMD ['yarn','dev']
