# Preparazione WhatsApp — 4 ottobre 2026

Staging dedicato: https://deskcomm-staging.cristianocosta.it.
Base applicativa stabile v1.70.0, senza aggiornamento a latest.
Questa verifica prepara un primo collegamento controllato. Nessun numero reale
collegato e nessun messaggio inviato durante la preparazione.

## Preparazione locale

133 correzioni editoriali del percorso QR/codice, gruppi, accesso IA e protezioni
di invio e Sicurezza in whatsapp-readiness-corrections.json. I limiti riducono il rischio
di blocco: non garantiscono che WhatsApp non blocchi un numero.
Il catalogo completo contiene ancora testi da rivedere; questo report non
certifica la traduzione integrale né le integrazioni esterne non configurate.

## Riscontri preliminari sul server

- Sei servizi CRM e undici Supabase dedicati. Nessuna porta WAHA/Redis/Postgres
  pubblicata; gateway Supabase soltanto su loopback 127.0.0.1:18080.
- `.env` permessi 600, `.runtime` 700. Sessioni WAHA e media in volumi dedicati;
  database e Storage in cartelle persistenti del solo staging.
- Tabelle public senza RLS: zero. Bucket whatsapp-media e internal-media privati.
- QR generato dal browser senza scansione; una sessione in attesa di connessione.
- Nessun secondo fattore verificato: cambio password provvisoria e attivazione
  MFA restano azioni del titolare prima dell’uso con dati personali.
- Backup database, sessioni e Storage riusciti; wrapper verificato e cron attivo
  ogni giorno alle 03:00 Europe/Berlin (stesso orario italiano). Archivi privati,
  conservazione 14 copie per tipo. Replica automatica fuori server ancora assente.
- Ripristino completo del dump con ON_ERROR_STOP in container senza rete/porte,
  database nuovo template0 e stesse estensioni: riuscito. Conteggi confrontati
  per organizzazioni, utenti, contatti e sessioni. Database live non modificato;
  dettaglio in whatsapp-readiness-restore.json.
- WAHA Core 2026.7.2 non firma i webhook: firma obbligatoria disattivata come da
  contratto stabile. Il webhook globale usa `http://app:3000/api/v1/webhooks/waha`
  sulla rete privata: richiesta sintetica senza sessione registrata restituisce
  200 e `accepted:false`; lo stesso percorso pubblico restituisce 403. Le sessioni
  ereditano questa configurazione globale e non hanno webhook propri. Non abilitare
  la richiesta di firma senza un provider che effettivamente firmi.
- Copia cifrata iniziale fuori server scaricata e confrontata tramite SHA-256;
  decifratura e contenuto verificati sul server. Replica periodica fuori server
  ancora assente; dettaglio in whatsapp-readiness-backup-copy.json.
- Profilo italiano e fuso Europe/Rome salvati e riletti dopo reload.
- CI e pubblicazione della nuova revisione ancora in corso a questo checkpoint.

## Primo collegamento del titolare

1. Da autenticato aprire https://deskcomm-staging.cristianocosta.it/login/reset
   e sostituire la password provvisoria; poi Impostazioni → Sicurezza → Attiva
   per la verifica in due passaggi. Modulo password e pagina Sicurezza verificati;
   nessuna nuova credenziale inserita durante il controllo.
2. Connessioni → WhatsApp tramite QR → Ricollega: sul telefono, WhatsApp →
   Dispositivi collegati → Collega un dispositivo; scansionare il QR corrente.
3. Lasciare IA in modalità test con elenco vuoto; nessuna campagna attiva.
4. Effettuare con una persona di fiducia una prova di ricezione e risposta manuale
   in Messaggi. In questa fase non abilitare tutti i gruppi personali/familiari.
5. Confermare ricezione, invio e riconnessione prima di attivare automatismi.

La prova end-to-end con WhatsApp richiede il numero del titolare e resta da
eseguire dopo la scansione. Backup di file di una sessione non associata non
dimostra il ripristino di una sessione WhatsApp autenticata.

## Fonti

File del repository, verifiche SSH/browser e documentazione ufficiale Supabase:
https://supabase.com/docs/guides/self-hosting/docker. Le scelte di prudenza sul
primo collegamento sono indicazioni operative; il percorso QR è già esistente.
