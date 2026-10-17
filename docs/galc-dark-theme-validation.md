# Tema claro e escuro — validação
Data: 17/10/2026 UTC (16/10 em São Paulo).
Base: cc6c590a7972d8c6a08b1da1e2657d364c5fbe82.

## Implementação
- js/theme.js: aplicação antecipada antes do CSS; padrão claro; preferência galc-theme em localStorage; leitura/escrita protegidas; sincronização entre abas.
- css/theme.css: cores centralizadas, componentes escuros, seletor 44×44 e foco visível; sem animação de transição global.
- Home, privacidade e termos: seletor com nome acessível e aria-pressed. Sem JS, permanece oculto e o tema claro funciona.
- Privacidade informa o armazenamento da preferência. Demonstrações mantêm suas identidades.
- Logo original preservada, com base clara no escuro.
- Nenhuma alteração em config.js, main.js, simulator.js, preços, imagens ou headers de segurança.

## Validação executada
- node --check js/theme.js e 11 testes existentes de contato: aprovados. Run https://github.com/Guilherme-Augusto-INF/GALC-Sites/actions/runs/38995444499
- 36 combinações: 3 páginas × 2 temas × 6 resoluções (320×568, 375×812, 430×932, 768×1024, 1366×768, 1920×1080). Sem overflow horizontal.
- Correção durante teste: header legal mobile com controle novo ocupava 132,8px; reorganizado para 101,2px. Header home permanece 66,8px mobile / 78,8px desktop.
- Alternância por Enter, estado acessível, persistência após recarga e navegação entre páginas: aprovados.
- Nome e mensagem preenchidos preservados ao alternar tema.
- Simulador Básico + 2 páginas: R$1.090–R$1.390; transferência do tipo de projeto sem apagar mensagem personalizada.
- Menu mobile no escuro abre por Enter, fecha por Escape e devolve foco ao botão.
- Console do preview sem erros/warnings da aplicação.
- Inspeção visual de hero e contato no escuro; verificação de contraste computado do texto institucional sem pares abaixo de AA no scanner limitado (exclui miniaturas das demos e fundos não sólidos). Bordas de campos reforçadas na revisão.
- Workflows temporários de teste removidos antes do merge.

## Limites
Sem envio real ao Web3Forms/WhatsApp. Sem certificação completa de acessibilidade, leitor de tela, INP de usuários reais ou teste de armazenamento bloqueado no navegador.
O tratamento de armazenamento indisponível foi inspecionado no código.
Lighthouse novo e smoke de produção serão registrados no PR após o deploy; notas anteriores não contam como nova medição.

Evidência visual: evidence/galc-dark-theme.jpg.
