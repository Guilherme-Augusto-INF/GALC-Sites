# Estúdio Web — site institucional estático

## O que vem pronto
- HTML, CSS, JavaScript puro, sem etapa de compilação, sem framework e sem dependências pagas obrigatórias.
- Página principal e três demonstrações navegáveis (barbearia, restaurante e consultório).
- Layout responsivo, menu mobile, FAQ nativo, botões de WhatsApp com texto, cards de serviços, formulário com Web3Forms, gerenciamento básico de consentimento, SEO e cabeçalhos de segurança.
- Política de privacidade e termos em rascunho (devem passar por revisão e personalização).

## Estrutura
```
index.html
privacidade.html
termos.html
css/style.css
js/config.js
js/main.js
img/favicon.svg
img/og-image.svg
demos/barbearia.html
demos/restaurante.html
demos/consultorio.html
_headers
robots.txt
sitemap.xml
README.md
```

## Passo 1 — personalize
1. Edite `js/config.js`: brand, whatsapp com `55` + DDD + número sem pontuação, email, instagram, preços, chave Web3Forms.
2. **Também edite manualmente** nome, textos e título dentro de `index.html`, `privacidade.html`, `termos.html`, campos do JSON-LD e descrições — a configuração JS substitui apenas elementos visuais marcados com `data-brand` e preços.
3. Substitua TODAS as ocorrências de `SEU-DOMINIO.com.br` pelo domínio real em `index.html`, `robots.txt`, `sitemap.xml`.
4. Crie artes de portfólio e depoimentos AUTÊNTICOS, com autorização antes de publicá-los. Os cards atuais estão claramente marcados como conceito e nenhum depoimento fictício está divulgado como real.
5. Confira escopo, preços, garantia de revisões e termos comerciais; não prometa mais do que pode cumprir.
6. Troque emails e identificação do controlador nas páginas legais e valide a política com profissional apropriado. LGPD: além de consentimento para pixels, você precisa de informação transparente, retenção, atendimento a direitos, medidas de segurança e contratos adequados com fornecedores.
7. Para fotografia real ou cases, use imagens otimizadas (AVIF/WebP), com alt relevante e autorizações; as imagens atuais são SVG/CSS leves, sem bibliotecas ou downloads.

## Passo 2 — configurar Web3Forms (grátis)
1. Acesse https://web3forms.com, crie uma Access Key gratuita e valide seu endereço de recebimento.
2. Cole a chave em `js/config.js` -> `web3formsAccessKey`.
3. O formulário envia `POST` para `https://api.web3forms.com/submit` via `fetch`, verifica resposta e exibe sucesso/erro. Sem a chave, o formulário informa claramente que não está configurado.
4. Teste com seus dados e confira o recebimento e a pasta spam. Não dependa apenas do formulário como canal de contato.
5. Ative proteção contra spam conforme recursos disponíveis do Web3Forms, como honeypot e proteção adicional, se necessária. Considere Turnstile/verificação backend se receber abuso. Chave pública do Web3Forms não é segredo, mas evite expor credenciais privadas no JavaScript.

## Passo 3 — testar localmente
Execute na pasta `estudio-web`:
```bash
python -m http.server 8000
```
Acesse `http://localhost:8000`, clique nos links, teste layout mobile, teclado, banner de privacidade e formulário após adicionar chave.

## Passo 4 — deploy no Cloudflare Pages
**Opção A — sem Git:** entre em https://dash.cloudflare.com -> Workers & Pages -> Create -> Pages / Direct Upload; envie a pasta de arquivos estáticos ou o ZIP de conteúdo e escolha um nome para o projeto. Se usar a plataforma de drag-and-drop, a pasta com `index.html` deve ser a raiz do deployment. Não precisa de build. O resultado terá URL `seu-projeto.pages.dev`.
**Opção B — com GitHub:** coloque estes arquivos na raiz de um repositório; em Cloudflare Pages escolha conectar repositório, branch de produção, framework `None`, comando de build vazio, diretório de saída `/` ou diretório raiz conforme solicitado no painel. Novos commits geram deploy automático.
**Atenção:** um projeto criado como Direct Upload não muda posteriormente para integração Git sem criar um novo projeto.

## Passo 5 — domínio personalizado
No projeto Pages abra **Custom domains** -> **Set up a domain** e digite o domínio. Se for domínio raiz (`exemplo.com.br`), o domínio deve estar adicionado como zona Cloudflare e usar seus nameservers. Se for subdomínio (`www.exemplo.com.br`), siga a orientação de CNAME do painel, apontando ao hostname do Pages. Faça associação no painel ANTES de editar manualmente o CNAME. Aguarde validação do certificado. **O domínio em si pode ser pago**, mesmo com hospedagem gratuita.

## Passo 6 — SEO e métricas
- Confirme URL canônica, OG, sitemap e JSON-LD com dados reais. Evite `LocalBusiness` com endereço inventado; o projeto usa `ProfessionalService`.
- Cadastre o domínio no Google Search Console, solicite indexação e envie `/sitemap.xml`.
- Teste em https://pagespeed.web.dev e observe Core Web Vitals reais. Não há promessa de nota 100.
- `ga4Id` e `metaPixelId` em `js/config.js` são opcionais; scripts são carregados apenas após aceitação do visitante. Se ativar, revise obrigações de privacidade e requisitos dos respectivos provedores.
- `localStorage` registra `accepted`/`rejected`; para oferecer alteração posterior adicione um painel "Gerenciar cookies". O mecanismo de exemplo é um ponto de partida e não garante sozinho conformidade integral à LGPD.
- Se precisar de revogação imediata com tracking ativo, implemente controles que bloqueiem novos eventos, limpem cookies relevantes quando aplicável e recarreguem a página; reveja Consent Mode e configurações de tags com um profissional.

## Checklist de publicação
[ ] Número WhatsApp real
[ ] Access Key Web3Forms e teste com envio de ponta a ponta
[ ] Nome, emails, domínio e identidade reais
[ ] Política e termos completos revisados
[ ] Valores e escopo comercial aprovados
[ ] Portfólio e depoimentos reais, sem avaliações inventadas
[ ] Testes de toque, teclado, contraste e layout móvel
[ ] Links de demonstração, formulário e FAQ testados
[ ] Sem placeholders de domínio e marca na versão pública
[ ] Search Console e PageSpeed após deploy

## Recomendações para otimizar conversão
1. Meça cliques em WhatsApp, envio válido de formulário e visitas às demonstrações (com consentimento quando necessário).
2. Faça uma única mudança por experimento: título do hero, texto do CTA, plano destaque ou posição do formulário.
3. Publique 2–3 estudos de caso verdadeiros com segmento, problema, solução, permissão de imagem e resultados verificáveis.
4. Adicione uma pergunta de qualificação (prazo ou orçamento) apenas se não reduzir demais os contatos.
5. Crie landing pages específicas por nicho quando houver demanda real e acompanhe conversões em vez de apenas acessos.
6. Crie uma proposta e tempo de resposta comercial consistentes; não exiba prazos falsos no site.

## Fontes oficiais
- Cloudflare Direct Upload: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Cloudflare Custom Domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Web3Forms: https://docs.web3forms.com/getting-started/installation