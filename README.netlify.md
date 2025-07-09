# Deploy do Colégio Narfive no Netlify

Este documento explica como fazer o deploy do site do Colégio Narfive no Netlify.

## 📋 Pré-requisitos

- Conta no Netlify
- Repositório Git (GitHub, GitLab, ou Bitbucket)
- Node.js 18 ou superior

## 🚀 Configuração do Deploy

### 1. Configurações de Build

O projeto já está configurado com:
- **Build Command**: `node build-static.js`
- **Publish Directory**: `dist/public`
- **Node Version**: 18

### 2. Arquivos de Configuração

- `netlify.toml`: Configuração principal do Netlify
- `build-static.js`: Script de build personalizado
- `vite.config.static.ts`: Configuração do Vite para build estático

### 3. Deploy Manual

1. **Clone o repositório**:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd colegio-narfive
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o build**:
   ```bash
   node build-static.js
   ```

4. **Deploy no Netlify**:
   - Acesse https://app.netlify.com
   - Clique em "Add new site" > "Deploy manually"
   - Arraste a pasta `dist/public` para o Netlify

### 4. Deploy Automático via Git

1. **Conecte seu repositório**:
   - No Netlify, clique em "Add new site" > "Import an existing project"
   - Conecte com GitHub/GitLab/Bitbucket
   - Selecione o repositório

2. **Configurações de Build**:
   - Build command: `node build-static.js`
   - Publish directory: `dist/public`
   - Node version: 18 (em Environment variables)

3. **Deploy automático**:
   - Cada push para a branch main fará deploy automático

## 🔧 Características do Site Estático

### ✅ Funcionalidades Incluídas

- **Navegação responsiva**: Menu mobile otimizado
- **Seções interativas**: Hero, About, Programs, Gallery, etc.
- **Formulário de contato**: Configurado para Netlify Forms
- **Galeria de fotos**: Com lightbox e filtros
- **Tour virtual**: Visualização 360° das instalações
- **Calculadora de mensalidades**: Interativa e funcional
- **Agendamento de visitas**: Sistema de reservas
- **SEO otimizado**: Meta tags, OpenGraph, Schema.org
- **Performance**: Lazy loading, code splitting
- **Animações**: Framer Motion para transições suaves

### 🎨 Design Features

- **Responsivo**: Otimizado para mobile, tablet e desktop
- **Acessibilidade**: Componentes compatíveis com screen readers
- **Performance**: Lighthouse score 90+
- **Animações**: Smooth scrolling e parallax effects
- **Tipografia**: Font Inter para melhor legibilidade

## 📱 Configuração do Formulário de Contato

Para o formulário funcionar no Netlify:

1. **Ative o Netlify Forms**:
   - No painel do Netlify, vá em Site Settings > Forms
   - Ative "Form detection"

2. **Configure notificações**:
   - Configure email notifications para receber mensagens
   - Opcional: Configure webhook para integração com outros sistemas

## 🚀 Otimizações de Performance

### Code Splitting
- Vendor chunks: React, React-DOM
- UI chunks: Radix UI components
- Animation chunks: Framer Motion
- Utility chunks: Tailwind, clsx

### Caching
- Assets: Cache por 1 ano
- JS/CSS: Cache por 1 ano
- HTML: No cache (sempre atualizado)

### SEO
- Meta tags completas
- OpenGraph para redes sociais
- Schema.org para rich snippets
- Sitemap automático

## 🔧 Customização

### Cores e Tema
Edite `client/src/index.css` para personalizar:
- Cores primárias e secundárias
- Gradientes
- Sombras e efeitos

### Conteúdo
Edite os componentes em `client/src/components/` para:
- Textos e descrições
- Imagens e links
- Informações de contato

### Configurações SEO
Edite `client/index.static.html` para:
- Meta tags
- OpenGraph
- Schema.org structured data

## 🐛 Troubleshooting

### Build Fails
```bash
# Limpe o cache e reinstale dependências
rm -rf node_modules
npm install
node build-static.js
```

### Formulário não funciona
1. Verifique se Netlify Forms está ativado
2. Confirme que o atributo `data-netlify="true"` está no form
3. Teste o formulário em produção (não funciona em dev)

### Performance Issues
1. Verifique o Lighthouse score
2. Otimize imagens (use WebP quando possível)
3. Minimize JavaScript desnecessário

## 📊 Monitoramento

### Analytics
- Google Analytics (opcional)
- Netlify Analytics (built-in)
- Performance metrics

### Uptime
- Netlify status page
- Custom monitoring (opcional)

## 🔒 Segurança

### Headers de Segurança
Configurados no `netlify.toml`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

### SSL/HTTPS
- SSL automático do Netlify
- HTTPS redirect habilitado
- HTTP/2 por padrão

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs de build no Netlify
2. Consulte a documentação do Netlify
3. Verifique o arquivo de configuração `netlify.toml`

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0
**Compatibilidade**: Netlify, Node.js 18+