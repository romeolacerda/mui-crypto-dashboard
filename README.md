# 📊 Newcharge Crypto Dashboard

Dashboard em tempo real para monitoramento de criptomoedas utilizando a API da Binance.

## 🚀 Tecnologias

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Recharts** - Biblioteca de gráficos para React
- **Binance WebSocket API** - Stream de dados em tempo real
- **AWS S3 + CloudFront** - Hospedagem e CDN

## 📦 Gerenciador de Pacotes

Este projeto utiliza **pnpm** como gerenciador de pacotes.

### Instalação do pnpm

```bash
npm install -g pnpm
```

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/romeolacerda/newcharge-crypto-dashboard.git

# Entre na pasta do projeto
cd newcharge-crypto-dashboard

# Instale as dependências
pnpm install
```

## 🏃 Executando o Projeto

### Desenvolvimento

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔄 Deploy Automático

O projeto utiliza GitHub Actions para deploy automático na AWS:

- Push na branch `main` dispara o workflow
- Build do projeto com Vite
- Deploy no S3
- Invalidação do cache do CloudFront

## 📊 Funcionalidades

- ✅ Monitoramento em tempo real de criptomoedas
- ✅ Gráficos interativos com histórico de preços
- ✅ Atualização automática via WebSocket
- ✅ Cálculo de variação percentual (24h)
- ✅ Interface responsiva

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Cria build de produção
```

- GitHub: [@romeolacerda](https://github.com/romeolacerda)
