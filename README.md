# GALC-Sites — V2.5

Site institucional estático para apresentar serviços de desenvolvimento web, demonstrar possibilidades e receber solicitações de orçamento.

- Domínio canônico pretendido: https://galsites.pages.dev/ (ativação pendente de verificação no Cloudflare Pages)
- Repositório: https://github.com/Guilherme-Augusto-INF/GALC-Sites
- HTML, CSS e JavaScript puro. Sem build, framework ou bibliotecas de terceiros no frontend.
- Cloudflare Pages com integração GitHub; produção na branch `main`, demais branches em preview.

## Estrutura

```text
index.html                 Página institucional e formulário
privacidade.html           Informações de privacidade
termos.html                 Condições de uso do site
css/style.css              Estilos institucionais
css/demo.css               Base compartilhada e layouts próprios dos três segmentos
js/config.js               Marca, WhatsApp, Web3Forms, preços e tracking opcional
js/main.js                 Navegação, planos, formulário e consentimento
img/favicon.svg            Símbolo GALC-Sites
img/og-image-v25.png        Imagem oficial de compartilhamento 1200 × 630
img/galc-symbol-v25-96.png  Símbolo otimizado para cabeçalho e rodapé
demos/                    Demonstrações de barbearia, restaurante e consultório
_headers                   Headers do Cloudflare Pages
robots.txt                 Regras de rastreamento
sitemap.xml                Apenas URLs indexáveis de produção
```

## Alterar contato e configurações

A integração WhatsApp é configurada em **um único objeto em `js/config.js`**: `whatsapp` (país + DDD + número, somente dígitos) e `whatsappMessage`. Os botões institucionais recebem a mesma URL, com codificação da mensagem e `noopener noreferrer`.

O número atual é temporário. Não copie o número para novos componentes. Ao substituí-lo, confira também os links diretos já existentes nas páginas informativas; eles não são atualizados pelo JavaScript da home. Não publique número ou e-mail diferente sem confirmação do responsável.

A Access Key pública do Web3Forms já está configurada. **Não substitua nem reproduza a chave na documentação.** Tokens privados nunca devem ser incluídos no frontend. E-mail e Instagram só aparecem no rodapé quando configurados.

Preços centralizados em **prices, no js/config.js**, e renderizados por atributos data-price. Valores aprovados: Básico a partir de R$ 790, Profissional a partir de R$ 1.490 e Loja a partir de R$ 3.490. Os serviços complementares também ficam nesse objeto; não duplique preços em novos componentes. O HTML usa “Sob consulta” como fallback sem JavaScript. Quantidade de páginas/seções, revisões, integrações, manutenção, domínio e hospedagem dependem da proposta. Não transforme os exemplos em promessas de entrega sem aprovação do responsável.

## Escopos comerciais

Básico: uma página com até 3 seções e uma rodada; 5–10 dias úteis. Profissional: uma página com até 6 seções, protótipo e duas rodadas; 10–15 dias úteis. Loja: plataforma existente, até 20 produtos e revisões definidas na proposta; 15–30 dias úteis. Prazos após recebimento dos materiais e aprovação do escopo. Seção é um bloco da página, não outra página.

Manutenção básica: até uma hora mensal e verificações básicas. Manutenção com conteúdo: franquia definida na proposta, nunca ilimitada. Plataforma, gateway, domínio, hospedagem paga, produção de conteúdo e extras têm custos separados quando necessários. Valores não são garantia de preço final.

## Formulário

O `POST` vai para o Web3Forms. O JavaScript usa `FormData`, honeypot, validação dos campos e do telefone, bloqueio de submissão simultânea e timeout de 12 segundos. Uma resposta de sucesso limpa os dados e restaura a Access Key. Uma falha mantém os campos preenchidos para nova tentativa e oferece o WhatsApp como alternativa. Orçamento previsto é opcional, limitado a 80 caracteres; enviado pelo mesmo FormData. Selecionar um plano altera o tipo de projeto e apenas o texto gerado automaticamente, preservando os demais dados.

Para validar sem enviar mensagens, execute testes isolados com respostas simuladas. Para um teste completo, use no máximo o necessário, identifique como **TESTE TÉCNICO**, use dados fictícios e confira o recebimento. Sucesso da API não prova chegada na caixa postal. Não envie mensagens reais pelo WhatsApp durante testes.

## Demonstrações

Os três modelos são conceituais e permanecem `noindex,nofollow`. Não representam clientes reais, não recebem pedidos, agendamentos ou consultas e não contêm avaliações ou profissionais inventados.

- **Barbearia:** composição escura, monograma conceitual e lista de serviços.
- **Restaurante:** cardápio de leitura direta e conteúdo dividido por pratos.
- **Consultório:** diretório de informações, leitura calma e FAQ nativo.

Os CTAs de orçamento retornam a `index.html?modelo=<segmento>#contato`. A home aceita apenas os três valores conhecidos e preenche a intenção do pedido, sem sobrescrever uma mensagem personalizada. O cardápio e os serviços têm navegação interna real.

## Tipografia e direção visual

A página institucional preserva a família de sistema da V2 para evitar downloads de fontes e manter continuidade. O hero foi encurtado; o desenho de entrega substitui os dispositivos decorativos. As demos combinam Georgia/serif com system-ui quando a voz do segmento pede um tom editorial; o consultório usa system-ui para navegação e conteúdo. A escolha considera hierarquia, espaçamento e leitura, sem impor uma fonte única aos três segmentos.

Referências consultadas:
- https://designsystem.digital.gov/components/typography/
- https://designsystem.digital.gov/design-tokens/typesetting/overview/

## SEO

Canonical, Open Graph, dados estruturados, `robots.txt` e sitemap usam https://galsites.pages.dev/. A home é indexável. Páginas informativas ficam fora do sitemap por serem `noindex,follow`; demos são `noindex,nofollow`. A nova origem ainda depende de deploy e verificação externa. O título, a descrição e o conteúdo inicial da home refletem criação de sites para pequenos negócios com atendimento online em todo o estado de São Paulo. Não invente endereço físico nem crie páginas locais sem conteúdo útil e serviço real. Consulte `docs/seo-indexacao.md` para o redirecionamento de host e os passos manuais de indexação.

O JSON-LD descreve **Organization**, **WebSite** e **Service** com informações existentes no projeto. Não utiliza endereço, horário físico, avaliações, preço, CNPJ ou profissional inventado. `ProfessionalService` é depreciado no Schema.org e não é usado nesta versão.

Cloudflare Pages adiciona `X-Robots-Tag: noindex` aos previews por padrão. Preserve esse comportamento. Meça SEO em produção; não tente elevar a nota do preview removendo sua proteção. Indexabilidade técnica não garante indexação nem posição no Google.

- https://schema.org/Service
- https://schema.org/ProfessionalService
- https://developers.cloudflare.com/pages/configuration/preview-deployments/

## Privacidade e segurança

GA4 e Meta Pixel estão desativados enquanto seus IDs estiverem vazios. Só são inicializados após aceitação. O rodapé permite reabrir as preferências. Se tracking estiver configurado, rejeitar após aceitar recarrega a página para interromper a inicialização no próximo carregamento; isso não substitui uma implementação completa de remoção de cookies e Consent Mode dos respectivos fornecedores.

`_headers` restringe frames, recursos externos, permissões de câmera/microfone/localização e tipos MIME. A CSP permite os endpoints usados pelo Web3Forms e pelas integrações opcionais existentes. Ao adicionar um fornecedor, revise a política e teste os fluxos antes de publicar.

As páginas informativas precisam de revisão do responsável sobre identificação do controlador, critérios de retenção e atendimento a direitos. O texto não é certificação jurídica de conformidade com a LGPD.

## Testes automatizados

`node --test tests/form-flow.test.cjs` executa cenários isolados sem enviar dados ao Web3Forms e sem dependências. Esses testes não substituem a validação no navegador.

## Desenvolvimento e publicação

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O servidor local não aplica `_headers`: valide os headers no preview Cloudflare.

1. Crie a branch de trabalho a partir da `main` atual.
2. Confira mudanças recentes e preserve as configurações.
3. Abra o PR e aguarde o preview do commit correto.
4. Teste home e demos em 320×568, 375×812, 430×932, 768×1024, 1366×768 e 1920×1080.
5. Valide formulário, teclado, foco, menu, FAQ, consentimento, links, console e rede. Distinga testes simulados de envios reais.
6. Execute Lighthouse mobile e desktop. Registre data, URL e resultados reais; não copie notas antigas como medições novas.
7. Faça merge somente após os critérios obrigatórios. Aguarde o Cloudflare Pages e confira o commit implantado.
8. Execute smoke tests na URL de produção. Em regressão grave, reverta por novo commit ou rollback do deployment, preservando o histórico.

Nenhuma migração, serviço pago ou alteração em outro projeto é necessária para esta versão. Search Console, domínio comercial, dados legais e futuros cases reais dependem de decisões do proprietário.

## Identidade oficial V2.5

A marca oficial usa o símbolo G azul/ciano fornecido pelo proprietário. Os três PNGs originais em img/ são preservados. O arquivo chamado horizontal tem composição quase quadrada (1227 × 1226); não deve ser comprimido no cabeçalho.

Cabeçalho e páginas legais usam galc-symbol-v25-96.png com o nome em texto. A imagem tem width/height explícitos, 44 px no desktop e 40 px no mobile. Rodapé mantém nome branco e uma base clara sob o símbolo para contraste. Os nomes e desenhos das demonstrações permanecem intactos.

Favicons PNG 32/64 px, Apple Touch Icon 180 px e og-image-v25.png (1200 × 630) são derivados do original, sem recriação por IA. Apenas margens transparentes são aparadas antes do redimensionamento proporcional. Os arquivos com versão no nome têm cache de um ano; mudanças futuras exigem novo nome.

O script tools/build_brand_assets.py usa Pillow somente para preparar imagens fora do frontend. Não é uma dependência do site. A V2.4 e seu simulador permanecem presentes; JavaScript, configuração de contato e preços não foram alterados nesta aplicação de marca.
