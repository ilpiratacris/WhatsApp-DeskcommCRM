# DeskcommCRM — report staging

Data: 2026-10-03. Branch: `test/initial-evaluation`.

## Stato

Audit iniziale completato. Deployment e prove applicative ancora da eseguire.
Nessun numero WhatsApp collegato e nessun dato cliente inserito.

## Verifiche effettive

- Checkout del fork: `6390a86338d86a93a086f6dd709a43a83d80cef6`; branch corretto,
  albero inizialmente pulito, fetch e merge di `origin/main`: già aggiornato.
- Coolify raggiungibile tramite HTTPS su `ssshh.cristianocosta.it`, sessione browser
  autenticata; versione visualizzata `4.3.23`, server `localhost` pronto.
- DNS Cloudflare del pannello: A `89.117.61.169`, con proxy. SSH al dominio
  proxato va in timeout; l'alias SSH locale `cosmo-builder` raggiunge lo stesso
  host `vmi2912628`, confermato anche dal terminale integrato Coolify.
- Ubuntu 24.04.5 LTS, x86_64, 6 core; Docker 29.8.1 e Compose 5.5.1
  secondo la scheda server Coolify.
- Misura SSH: RAM totale 11960 MiB, disponibile circa 7106 MiB; swap assente;
  filesystem `/` 96 GiB, 73 GiB occupati, 24 GiB disponibili (76%).
- 27 container in esecuzione. I container con healthcheck riportano healthy;
  questo non costituisce una verifica applicativa degli altri servizi.
- `coolify-proxy` sano, rete bridge esterna `coolify`, `Internal=false`;
  entrypoint `http=:80`, `https=:443`, resolver `letsencrypt` con HTTP challenge.
- Nessuna occorrenza `deskcomm` nelle label dei container ispezionati o nei
  file di routing sotto `/data/coolify/proxy/dynamic`; nessun container Deskcomm
  preesistente trovato.
- Validazione locale dei due Compose con valori fittizi e senza segreti:
  sei servizi attivi (app, worker, scheduler, WAHA, Redis, SRH), nessuna porta
  pubblicata sul host, solo app collegata a internal e proxy; Caddy e voce
  esclusi. È una prova del modello Compose, non del deploy.
- Le tre immagini upstream `1.70.0` sono disponibili per linux/amd64.
  Tag upstream `v1.70.0`: `38eb1fa8224c482ee3d616da4ce0b7544694c714`.
  Compose prod e Traefik sono identici al tag; il baseline SQL del branch
  differisce dal tag, quindi l'installazione deve usare SQL e kit della release.

## Baseline selezionato

Release numerica `1.70.0`, senza canale `latest` e senza build sul server.
Digest degli indici OCI verificati nel registry:

| Immagine | Digest |
|---|---|
| `ghcr.io/melgarafael/deskcommcrm:1.70.0` | `sha256:26cdc7abca2aa47040fe8bc5a73b8b501cb70f2082d19c21b5d3f06f3600aea9` |
| `ghcr.io/melgarafael/deskcomm-worker:1.70.0` | `sha256:f623664343e5de43810ef47b1ae2bafd373ae9167a8780a3d601d803a4c88ce0` |
| `ghcr.io/melgarafael/deskcomm-scheduler:1.70.0` | `sha256:ec4d12831439fedc9263abb85cfd51d0523910a7f5364ba7250dfeccd81fbf7a` |

Configurazione ricavata dall'audit: `TRAEFIK_NETWORK=coolify`,
`TRAEFIK_ENTRYPOINT=https`, `TRAEFIK_ENTRYPOINT_HTTP=http`,
`TRAEFIK_CERTRESOLVER=letsencrypt`. Solo app sulla rete del proxy;
Redis, WAHA e worker su reti della nuova installazione. Caddy e profili voce
rimangono esclusi. Nomi Compose e volumi dovranno essere dedicati allo staging.

## Da completare

- Scelta condivisa del sottodominio e verifica/configurazione DNS Cloudflare.
- Scelta Supabase dedicato cloud oppure self-hosted, configurazione Auth,
  baseline della release, estensioni e bucket privato `whatsapp-media`.
- Validazione del Compose effettivo, budget risorse e deploy isolato.
- HTTPS e redirect, health completo, login e onboarding tramite browser;
  blocco esterno del webhook globale WAHA.
- Confronto stato degli altri servizi prima/dopo e aggiornamento del report.

Scelte richieste all'utente: nome del sottodominio (proposta
`deskcomm-staging.cristianocosta.it`) e collocazione Supabase. La sessione
Cloudflare è autenticata. Il connettore Supabase elenca l'organizzazione
«Cristiano Costa», ma nessun progetto dedicato Deskcomm; i progetti esistenti
non sono stati modificati. Creare un progetto cloud richiede prima di
verificare costi e organizzazione con l'utente.

L'installer ufficiale prevede cron di drain e agente aggiornamenti; prima
di utilizzarlo verificare che questi restino circoscritti all'installazione
e che il baseline non venga aggiornato automaticamente durante la valutazione.

Nessun deploy, bootstrap DB, cambio DNS, modifica proxy, firewall, swap o
servizio preesistente eseguito fino a questo checkpoint. Nessuna modifica al
codice prodotto: grafi, Novità e Gestione funzioni non richiedono aggiornamenti
funzionali per questo audit documentale.

## Provenienza

Prove correnti: Git/GitHub/GHCR, SSH, interfaccia Coolify e DNS Cloudflare.
Piano e vincoli: `CLAUDE.md`, `AGENTS.md`, skill `deskcomm-instalar` e
`deskcomm-doutrina`, `HANDOFF-ilpiratacris-staging.md`, `docs/runbooks/deploy.md`.
Wiki consultata come contesto procedurale, non come prova dello stato attuale:
`wiki/concepts/coolify-supabase-db-access.md`,
`wiki/analyses/workpress-proxy-coolify-deploy-procedure.md`,
`wiki/analyses/fondazione-fundraise-cf-template-deploy-2026-05-10.md`.
