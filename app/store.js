/* store.js — la seule logique d'achat du site, partagée par l'app et le landing.
 *
 * POURQUOI CE FICHIER EXISTE
 * Le compte de vente (Polar.sh / Lemon Squeezy) n'existe pas encore le jour où la page est
 * en ligne, et l'identifiant produit change selon la boutique. Un lien cassé ou un « # »
 * sur le bouton d'achat coûte plus cher qu'une page qui vend autre chose : le visiteur croit
 * à un site à l'abandon. Donc : la page est Honnête par construction.
 *
 * COMMENT ÇA MARCHE
 *  - tout bouton <a data-buy="pro|team|sponsor"> reçoit son href depuis STORE (ci-dessous) ;
 *  - tant qu'un identifiant n'est pas renseigné, le bouton devient un mail pré-rempli
 *    « je veux la licence Pro » — Majed encaisse via le lien Polar qu'il envoie en réponse.
 *    Zéro lien mort, zéro mot de passe, zéro faux « paiement en ligne » ;
 *  - la mention « boutique en cours d'ouverture » s'affiche dans la foulée, pour ne pas
 *    laisser croire à une panne.
 *
 * CE QUE TU AS À FAIRE (2 minutes, une seule fois)
 *  1. crée les 2 produits sur Polar.sh (Pro 29 €, Agence 99 €) ;
 *  2. colle les liens https://buy.polar.sh/... dans pro et team ci-dessous ;
 *  3. régénère les deux boutons s'ils sont aussi dans app/index.html : ils sont réécrits
 *     par ce script, il n'y a rien à toucher dans le HTML.
 */
(function () {
  "use strict";

  var STORE = {
    /* ⬇⬇⬇ RENSEIGNE-ICI ⬇⬇⬇   (laisse "" tant que le produit n'existe pas) */
    pro:  "",   // ex. "https://buy.polar.sh/ppr_01..."  — Facturly Pro, 29 €
    team: "",   // ex. "https://buy.polar.sh/ppr_02..."  — Facturly Agence, 99 €
    cli:  "",       // ex. "https://buy.polar.sh/ppr_03..."  — fusion CLI, licence personnelle, 15 €
    "cli-team": "", // ex. "https://buy.polar.sh/ppr_04..."  — fusion CLI, licence équipe, 39 €
    sponsor: "https://github.com/sponsors/maxelxa",
    mail: "majed.benmansour@proton.me"
    /* ⬆⬆⬆ RENSEIGNE-ICI ⬆⬆⬆ */
  };

  var OBJET = {
    pro:  "Bonjour Majed, je veux la licence Facturly Pro (29 €). Mon code appareil : ",
    team: "Bonjour Majed, je veux la licence Facturly Agence (99 €, 5 postes). Nos codes appareils : "
  };

  function mailto(kind, extra) {
    return "mailto:" + STORE.mail +
      "?subject=" + encodeURIComponent("[Facturly] " + (kind === "team" ? "Licence Agence" : "Licence Pro")) +
      "&body=" + encodeURIComponent(OBJET[kind] + (extra || "") +
      "\n\n(Envoie-moi le lien de paiement, je règle et tu me génères la clé.)");
  }

  function wire() {
    var nodes = document.querySelectorAll("[data-buy]");
    var pending = 0;
    Array.prototype.forEach.call(nodes, function (a) {
      var kind = a.getAttribute("data-buy");
      var url = STORE[kind];
      if (url) {
        a.href = url;
      } else if (String(a.getAttribute("href") || "").indexOf("mailto:") === 0) {
        /* la page a déjà son propre mail pré-rempli (sujet propre au produit, prix exact) :
           on n'écrase pas — on marque juste l'état « boutique non ouverte », et on compte. */
        a.classList.add("buy-pending");
        pending++;
      } else {
        a.href = mailto(kind);
        a.classList.add("buy-pending");
        pending++;
      }
    });

    var note = document.querySelector("[data-buy-note]");
    if (note) {
      if (pending) {
        note.hidden = false;
        note.textContent = "La boutique en ligne ouvre cette semaine — en attendant, le bouton ci-dessus " +
          "prépare un e-mail : tu paies sur le lien que j'envoie en réponse (CB ou PayPal, via Polar.sh), " +
          "et tu reçois ton accès le jour même.";
      } else {
        note.hidden = true;
      }
    }

    /* Le code appareil est déjà dans le presse-papier du contexte Pro : autant le
       glisser dans le corps du mail, ça supprime l'étape qui fait abandonner. */
    var dev = document.getElementById("devCode");
    if (dev && pending) {
      Array.prototype.forEach.call(nodes, function (a) {
        var k = a.getAttribute("data-buy");
        if (k === "pro" || k === "team") {
          a.addEventListener("click", function () {
            var v = (dev.textContent || dev.value || "").trim();
            if (v) a.href = mailto(k, v + "\n");
          }, true);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else { wire(); }

  window.__store = { config: STORE, rerun: wire };
})();
