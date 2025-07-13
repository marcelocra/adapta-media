# Adapta Mídia - Sistema de Análise de Audiência OOH

> **Plataforma inteligente para análise comportamental de audiência em campanhas Out-of-Home (OOH) usando visão computacional e IA generativa.**

## 🎯 Sobre o Projeto

O **Adapta Mídia** é uma solução inovadora que combina **visão computacional** e **inteligência artificial** para analisar o comportamento da audiência em anúncios físicos (Out-of-Home). A plataforma utiliza tecnologias de ponta para detectar pessoas, analisar características demográficas e gerar insights estratégicos automaticamente.

### 🔍 Funcionalidades Principais

#### **Preview - Detecção em Tempo Real**

![Preview da Detecção](doc/preview.gif)

- **🔬 YOLO (Detecção de Objetos)**: Identifica e conta o número total de pessoas visualizando anúncios OOH
- **👤 Deepface (Análise Facial)**: Análise detalhada da audiência com:
  - **Gênero**: Distribuição entre homens e mulheres
  - **Idade**: Faixas etárias e idade média dos espectadores
  - **Etnia**: Classificação demográfica da audiência
  - **Emoção**: Estado emocional (feliz, neutro, surpreso, etc.)
- **📊 Métricas em Tempo Real**: Visualização instantânea dos dados coletados

#### **Insights - Inteligência Artificial Generativa**

![Insights da IA](doc/insights.gif)

- **🤖 NVIDIA LLAMA 3.3**: Processamento avançado dos dados coletados
- **📈 Análise Comportamental**: Insights estratégicos sobre a performance dos anúncios
- **💡 Recomendações**: Sugestões para otimização de campanhas futuras
- **📋 Relatórios**: Análises detalhadas em linguagem natural sobre:
  - Padrões de comportamento da audiência
  - Efetividade por perfil demográfico
  - Melhores horários e localizações
  - Estratégias de targeting personalizado

## 🛠️ Stack Tecnológica

### **Frontend**

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/UI** - Componentes UI modernos
- **WebSocket** - Comunicação em tempo real

### **Backend & IA**

- **FastAPI** - API Python de alta performance
- **YOLO v8** - Detecção de objetos em tempo real
- **DeepFace** - Análise facial e demográfica
- **NVIDIA LLAMA 3.3** - Modelo de linguagem para insights
- **MongoDB** - Banco de dados NoSQL
- **OpenCV** - Processamento de vídeo

### **Infraestrutura**

- **WebRTC** - Captura de câmera
- **WebSocket** - Streaming de dados em tempo real
- **Docker** - Containerização
- **pnpm** - Gerenciador de pacotes

## 📁 Repositórios

### **Frontend** (este repositório)

- Interface web desenvolvida em Next.js
- Visualização de dados em tempo real
- Dashboard de insights

### **Backend**

🔗 **[Adapta Mídia API](https://github.com/velrino/adapta-midia-api)**

- API Python com FastAPI
- Processamento de visão computacional (YOLO + Deepface)
- Integração com NVIDIA LLAMA 3.3
- WebSocket para streaming de dados

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Python 3.8+
- pnpm
- Câmera/webcam

### 1. Frontend (este repositório)

```bash
git clone https://github.com/velrino/adapta-hackathon-front
cd adapta-hackathon-front
pnpm install
pnpm dev
```

### 2. Backend

```bash
git clone https://github.com/velrino/adapta-midia-api
cd adapta-midia-api
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Acesse a aplicação

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## 📊 Como Usar

1. **📹 Ative a detecção**: A câmera captura pessoas em tempo real
2. **👁️ Visualize dados**: Acompanhe métricas demográficas instantâneas
3. **🤖 Gere insights**: Use IA para analisar comportamentos da audiência
4. **📈 Otimize campanhas**: Aplique recomendações estratégicas

## 🎯 Casos de Uso

- **🏪 Retail**: Análise de fluxo em vitrines e displays
- **🚇 Transporte**: Efetividade de anúncios em estações e terminais
- **🏟️ Eventos**: Engajamento de audiência em patrocínios
- **🏙️ Mídia Exterior**: Performance de outdoors e totens digitais
