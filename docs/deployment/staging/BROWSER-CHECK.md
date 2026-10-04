# Controllo browser dello staging — 4 ottobre 2026

Ambiente: https://deskcomm-staging.cristianocosta.it, sessione amministratore
dell'organizzazione Deskcomm Staging. Dati sintetici, nessun numero WhatsApp
reale collegato e nessun messaggio inviato.

## Risultati prima della correzione

Caricamento verificato di Messaggi, Radar, Agenda, risposte rapide, funnel,
Contatti, attività da svolgere, CRM, agenti IA, ricontatti, casi, hub IA,
connessioni, webhook, risultati, Meta Ads, registro attività, analisi e
impostazioni. Verificate anche organizzazione, profilo, team, notifiche,
gestione funzioni e configurazione Agenda. Nessun errore o avviso nella console
raccolta durante questa navigazione. Questo non esclude errori intermittenti.

- Agenda: date settimanali visualizzate come `4"de" MMM`. Causa: token date-fns
  alterati nella traduzione. Corretti sette formati e aggiunte regressioni con
  data italiana reale; prova locale rossa prima, verde dopo la correzione.
- Nuovo contatto: invio con tutti i campi vuoti accettato, nonostante la
  descrizione richieda email o telefono. Rimasto un record vuoto di audit
  `c6712a09-a138-4c53-a352-c8e512bd67d2`, senza dati personali. Il modulo ora
  rifiuta identificatori vuoti o fatti di spazi; l'API generale resta invariata.
  Test del componente copre rifiuto, email sola e telefono solo. La CI deve
  verificare anche che togliere la guardia renda rossi i test.
- Corrette altre etichette Agenda, stati aperti e prima fonte webhook: 34 voci
  totali, elenco prima/dopo in `browser-check-corrections.json`.

Avvisi previsti: Google Agenda non configurato, nessun orario pubblicato,
Meta Ads senza account e notifiche push senza VAPID. Non sono guasti di
caricamento. Restano traduzioni fuorvianti nelle statistiche e nei ricontatti,
oltre a nomi portoghesi provenienti dai dati iniziali. L'interfaccia estensioni
non è stata accettata con una verifica finale. Non provati invii reali,
provider IA, sincronizzazioni Google e attribuzioni Meta.

## Correzione e pubblicazione

La base resta la release stabile 1.70.0, SHA
`cbf403e201627b49c0a9899f5a0cb5f12e02d975`. Il modulo contatto nella base stabile
è identico al modulo del fork prima della guardia: viene applicata solo questa
correzione oltre all'overlay italiano. Nessuna nuova funzione amministrativa
da registrare; nessun interruttore della gestione funzioni modificato.

Verifica locale Vitest bloccata da `ERR_PACKAGE_IMPORT_NOT_DEFINED` del pacchetto
installato su Windows. Controlli Linux e nuova pubblicazione staging ancora
in attesa al momento di questo commit. Non confondere codice corretto con
accettazione live: aggiungere qui i risultati effettivi dopo la CI e il deploy.
