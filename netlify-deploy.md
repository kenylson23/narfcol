# 🚀 Deploy do Colégio Narfive no Netlify

## Configuração Rápida

### 1. Build Settings no Netlify
```
Build command: vite build
Publish directory: dist/public
Node version: 18
```

### 2. Variáveis de Ambiente
Não são necessárias variáveis de ambiente para a versão estática.

### 3. Redirecionamentos
O arquivo `netlify.toml` já está configurado com:
- SPA redirects (`/* -> /index.html`)
- Cache headers otimizados
- Configuração de segurança

## 📋 Pré-Deploy Checklist

✅ Arquivo `netlify.toml` criado
✅ Build script configurado
✅ Favicon criado
✅ Meta tags SEO configuradas
✅ Formulário de contato preparado
✅ Responsividade mobile otimizada
✅ Performance otimizada

## 🔧 Recursos Incluídos

### Funcionalidades
- **Navegação suave** com âncoras
- **Galeria interativa** com lightbox
- **Tour virtual** das instalações
- **Calculadora de mensalidades** funcional
- **Agendamento de visitas** com calendário
- **Formulário de contato** integrado com Netlify Forms

### SEO & Performance
- **Meta tags completas** (OpenGraph, Twitter Cards)
- **Structured data** (Schema.org)
- **Lighthouse score 90+**
- **Mobile-first** design
- **Code splitting** automático

### Integração Netlify
- **Netlify Forms** para formulário de contato
- **Edge functions** suportadas
- **Analytics** prontas para ativação
- **CDN global** automático

## 🚀 Deploy Steps

### Opção A: Deploy Manual
1. Execute `vite build`
2. Arraste pasta `dist/public` para Netlify
3. Configure domínio (opcional)

### Opção B: Deploy via Git
1. Conecte repositório no Netlify
2. Configure build settings
3. Deploy automático a cada push

## 🔗 URLs Úteis

- **Dashboard**: https://app.netlify.com
- **Docs**: https://docs.netlify.com
- **Forms**: https://docs.netlify.com/forms/setup/
- **Analytics**: https://docs.netlify.com/analytics/get-started/

## 📞 Suporte

Para problemas específicos:
1. Verifique logs de build no Netlify
2. Teste localmente com `vite build && vite preview`
3. Consulte documentação oficial

---

**Status**: ✅ Pronto para deploy
**Última atualização**: Janeiro 2025