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
- **pnpm** - Gerenciador de pacotes

## 📁 Repositórios

### **Frontend** (este repositório)

- Interface web desenvolvida em Next.js
- Visualização de dados em tempo real
- Dashboard de insights

### **Backend**

🔗 **[Adapta Mídia API](https://github.com/velrino/adapta-midia-api)**

- API Python com [FastAPI](https://fastapi.tiangolo.com/tutorial/)
- Processamento de visão computacional ([YOLO](https://docs.ultralytics.com/pt/models/yolo11/) + [Deepface](https://pypi.org/project/deepface/))
- Integração com [NVIDIA LLAMA 3.3](https://build.nvidia.com/nvidia/llama-3_3-nemotron-super-49b-v1)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) para streaming de dados

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Python 3.8+
- pnpm
- Câmera/webcam

### 1. Frontend (este repositório)

```bash
git clone https://github.com/marcelocra/adapta-midia-frontend
cd adapta-midia-frontend
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

## 📁 Estrutura do Frontend

### **Diretórios Principais**

#### **`app/` - Next.js App Router**

- `layout.tsx` - Layout global da aplicação
- `page.tsx` - Página principal
- `globals.css` - Estilos globais

#### **`components/` - Componentes React**

```
components/
├── ui/                    # Componentes de interface (shadcn/ui)
├── ads/                   # Componentes para anúncios
│   ├── AdCard.tsx
│   ├── AdDetails.tsx
│   └── AdsList.tsx
├── chat/                  # Interface de chat com IA
│   └── ChatInterface.tsx
├── preview/               # Visualização em tempo real
│   ├── PreviewTab.tsx
│   ├── Webcam.tsx
│   └── display/
└── json-view/            # Visualização de dados JSON
```

#### **`hooks/` - Custom Hooks**

- `useInsightsWebSocket.ts` - WebSocket para insights
- `useJobPolling.ts` - Polling de jobs
- `useLanguage.ts` - Gerenciamento de idioma
- `useTypewriterEffect.ts` - Efeito de digitação

#### **`lib/` - Utilitários e Lógica**

- `ads.ts` - Lógica de anúncios
- `camera.ts` - Gerenciamento de câmera
- `chat.ts` - Funcionalidades de chat
- `__tests__/` - Testes unitários

#### **`interfaces/` - Tipos TypeScript**

- `ads.ts` - Tipos para anúncios
- `display.ts` - Tipos para display
- `webcam.ts` - Tipos para webcam

#### **`i18n/` - Internacionalização**

```
i18n/
├── en/index.ts           # Traduções em inglês
├── pt/index.ts           # Traduções em português
└── index.ts              # Configuração principal
```

#### **`context/` - Contextos React**

- `WebCamContext.tsx` - Contexto da webcam

#### **`public/` - Assets Estáticos**

- `ads/` - Vídeos de anúncios
- Ícones SVG

### **Configurações**

- `next.config.ts` - Configuração do Next.js
- `tailwind.config.ts` - Configuração do Tailwind
- `tsconfig.json` - Configuração do TypeScript
- `vitest.config.ts` - Configuração de testes

### **Arquitetura**

Esta estrutura segue as melhores práticas do Next.js 14 com App Router, separando claramente responsabilidades:

- **Separação de Responsabilidades**: Cada diretório tem uma função específica
- **Reutilização**: Componentes modulares e hooks customizados
- **Tipagem**: TypeScript em toda a aplicação
- **Testes**: Cobertura de testes unitários
- **Internacionalização**: Suporte a múltiplos idiomas
- **Escalabilidade**: Estrutura preparada para crescimento
