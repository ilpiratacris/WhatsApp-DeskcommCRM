# Preparazione WhatsApp — 4 ottobre 2026

Staging dedicato: https://deskcomm-staging.cristianocosta.it.
Base applicativa stabile v1.70.0, senza aggiornamento a latest.
Questa verifica prepara un primo collegamento controllato. Nessun numero reale
collegato e nessun messaggio inviato durante la preparazione.

## Preparazione locale

Correzioni editoriali del percorso QR/codice, gruppi, accesso IA e protezioni
di invio in whatsapp-readiness-corrections.json. I limiti riducono il rischio
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
- Primo backup riuscito: database, sessioni e Storage. Verifica del ripristino,
  programmazione giornaliera, CI e pubblicazione sono riportate nella sezione
  finale dopo l’esecuzione: questa versione è il checkpoint prima del deploy.

## Primo collegamento del titolare

1. Impostazioni → Sicurezza: sostituire la password provvisoria e attivare MFA.
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
