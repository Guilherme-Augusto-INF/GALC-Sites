# SEO, migração de domínio e indexação

## Estado e escopo

A página inicial contém conteúdo em HTML estático e é a única URL anunciada no sitemap. As páginas de demonstração são conceituais e estão marcadas `noindex,nofollow`; as páginas legais estão marcadas `noindex,follow`. Elas permanecem fora do sitemap por esse motivo. O site declara atendimento online para pequenos negócios de todo o estado de São Paulo, sem afirmar sede ou atendimento presencial.

A origem canônica configurada no código é `https://galsites.pages.dev/`. A configuração desses arquivos não comprova que esse endereço esteja criado, publicado ou acessível. Antes de divulgar a migração, confirme o deploy e os documentos públicos no endereço novo.

## Cloudflare Pages: publicação e redirecionamento

O repositório é um site estático na raiz, sem comando de build. No projeto Pages que servirá `galsites.pages.dev`, confirme o repositório conectado, a branch de produção e o diretório de saída raiz. Após o deploy, confira `/`, `/robots.txt`, `/sitemap.xml`, `/privacidade` e `/termos`.

O `_redirects` do Cloudflare Pages não oferece redirecionamento por domínio/host. Portanto, não se deve criar nesse arquivo uma regra de caminho que tente simular a migração: ela poderia redirecionar também a origem nova e causar loop. A documentação do Cloudflare recomenda Bulk Redirects para encaminhar um subdomínio `pages.dev` a outro domínio. No painel autorizado, configure a origem `galc-sites.pages.dev` para `https://galsites.pages.dev`, com status `301`, preservação do caminho/sufixo e da query string. Se o painel não aceitar um destino `pages.dev` ou não permitir aplicar a regra à origem antiga, confirme com o suporte/configuração da conta qual mecanismo de host é suportado antes de desativar o projeto antigo.

Mantenha o projeto antigo ativo até o destino novo responder corretamente e o redirecionamento ser testado. Valide a raiz e uma rota, por exemplo `/privacidade?origem=migracao`, confirmando resposta `301`, cabeçalho `Location` no host novo e query/path preservados. Confirme também que o host novo responde diretamente com sucesso e não retorna ao host antigo. Essas etapas exigem acesso ao painel Cloudflare e não podem ser garantidas pelo conteúdo do repositório.

Documentação: [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/) e [redirect de `pages.dev` por Bulk Redirects](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/).

## Google Search Console

1. Entre no Google Search Console com uma conta autorizada e adicione a propriedade de prefixo de URL `https://galsites.pages.dev/`. A verificação é vinculada ao host e ao método escolhido. O arquivo `google87f94d9d56cacf74.html` já existente não deve ser presumido como válido para a nova propriedade: confirme no painel se ele foi emitido para esse endereço; caso contrário, publique o arquivo ou a meta tag que o próprio Search Console fornecer.
2. Após o deploy, envie `https://galsites.pages.dev/sitemap.xml` em **Sitemaps**.
3. Use **Inspeção de URL** para consultar a página inicial, conferir a canonical escolhida pelo Google e solicitar rastreamento quando apropriado.
4. Mantenha a propriedade antiga durante a transição e acompanhe erros de rastreamento e cobertura. Sitemap enviado ou solicitação de rastreamento não significam indexação garantida.

A autenticação, a verificação de propriedade e o envio dependem de ação manual no Search Console.

## Bing Webmaster Tools

1. Entre no Bing Webmaster Tools com a conta autorizada e adicione `https://galsites.pages.dev/` como site. Se disponível, importe a propriedade verificada do Search Console; caso contrário, use o método de verificação fornecido pelo Bing e publique o token/arquivo correspondente sem substituir outros arquivos de verificação.
2. Envie `https://galsites.pages.dev/sitemap.xml` em **Sitemaps**.
3. Use a inspeção de URL para revisar a página inicial e acompanhe relatórios de rastreamento e indexação após a publicação.

A autenticação, a verificação e o envio dependem de ação manual no Bing Webmaster Tools. Nenhuma indexação ou posição é garantida.
