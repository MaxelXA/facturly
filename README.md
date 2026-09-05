# Facturly — factures, devis et fusion de CSV, hors-ligne

Un générateur de factures et de devis pour les indépendants qui facturent en **TND, MAD, DZD, EGP, EUR, AED, SAR**, plus une fusionneuse de gros fichiers CSV pour les comptables. Aucun serveur, aucun compte, aucune télémétrie : l'outil tourne dans le navigateur et tes données restent sur ton poste.

**Outil gratuit (en ligne, sans compte)** : <https://maxelxa.github.io/facturly/app/>

**Fusionneuse CSV gratuite** : <https://maxelxa.github.io/facturly/csvmerge/>

**Modèle de facture à imprimer** : <https://maxelxa.github.io/facturly/modele-facture.html>

**Site / services** : <https://maxelxa.github.io/facturly/>

## Ce que la version gratuite fait déjà

- Factures et devis, deux modèles (Classic, Elegant), export PDF A4 et impression
- Mentions par pays : matricule fiscal, RNE, timbre fiscal, TVA à 0 % sur l'export de services, pénalités de retard
- 12 devises, dont le dinar à **3 décimales**, taux saisis par toi (jamais téléchargés)
- Numérotation séquentielle sans trou, archive locale, sauvegarde/restauration JSON
- Export CSV de saisie (point-virgule, virgules décimales, BOM UTF-8) et **iCSV** pour le comptable
- Interface et documents en **français, arabe (RTL) et anglais**
- 12 documents par mois, sans limite de durée

## Ce que Pro ajoute (29 €, une fois)

Documents illimités · modèles Modern et Minimal · devis → facture en 1 clic · relances rédigées (J+7, J+15, J+30, FR et AR) · taux de change enregistrés · import iCSV · sans mention « généré avec Facturly ». Licence liée au poste, réactivation gratuite et illimitée si tu changes de machine.

**Comment acheter maintenant** : un des boutons « Acheter » du site prépare un e-mail, tu me l'envoies avec le *code appareil* affiché dans l'onglet Pro, tu reçois la clé le jour même. La boutique en ligne (paiement par carte, livraison automatique) est en cours d'ouverture — tant qu'elle n'est pas là, je n'écris nulle part qu'elle existe.

## Ce que ce dépôt contient

`index.html` + les pages de vente et SEO, `app/` (l'outil, un seul fichier JS + son PDF intégré), `csvmerge/` (la fusionneuse), `store.js` (liens de boutique, vides tant que la boutique n'est pas ouverte). C'est **le dossier publié tel quel** : les outils de construction, les tests, la prospection et tout ce qui touche aux coordonnées bancaires ne sont pas ici et ne le seront pas.

## Ce que je ne promets pas

- Facturly n'est **pas** conforme à la facture électronique tunisienne (TTN / El Fatoora) au sens de la transmission : il produit le document, les mentions, les totaux et l'archivage. Le fichier TEIF, la signature ANCE et le dépôt sur la plateforme restent un prestataire habilité.
- Les taux de TVA sont **indicatifs et modifiables**. Fais valider taux et mentions par ton comptable avant la première facture réelle.
- Les chiffres de vitesse ou de gain de temps publiés ailleurs ne sont pas mesurés ici : je ne mets un nombre sur une page que s'il sort d'un outil que je peux te montrer.

## Services

Audit de performance et accélération de site (Lighthouse, mesure réelle sur ton URL), migration, maintenance. Devis et délais sur la page <https://maxelxa.github.io/facturly/service-audit-site.html>.

## Licence

Le code est public pour qu'on puisse vérifier ce qu'il fait de tes données — pas pour être redistribué comme un produit. La version gratuite reste gratuite et sans filigrane payant ; Pro et l'usage en marque blanche (pack Agence) sont sous licence nominative.
