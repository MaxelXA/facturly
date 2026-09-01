/* =====================================================================
   Facturly — offline invoice / quote / credit-note generator
   Single-file app. No backend, no network calls. All data in localStorage.
   (c) Majed Ben Mansour — free edition.
   ===================================================================== */
(function () {
"use strict";

/* ---------------------------------------------------------------- i18n */
var T = {
fr:{upgrade:"Passer Pro",docType:"Type de document",invoice:"Facture",quote:"Devis",credit:"Avoir",
 number:"Numéro",issueDate:"Date d'émission",dueDate:"Échéance",country:"Pays & fiscalité",
 vatApplied:"Assujetti à la TVA",vatRate:"Taux TVA (%)",currency:"Devise",exportZero:"Export / TVA 0 % (client étranger)",
 withholding:"Retenue à la source",stamp:"Timbre / taxes fixes (montant)",extras:"Options",
 showLogo:"Afficher le logo",logo:"Logo",accent:"Couleur",template:"Modèle",
 proOnly:"Modern & Minimal · Relances · Devis→Facture · iCSV = version Pro",
 yourCo:"Émetteur",client:"Client",pickClient:"Choisir depuis l'archive",lines:"Lignes",addLine:"+ Ligne",
 bulk:"Coller (TSV)",notes:"Notes / conditions",payLink:"Lien de paiement",preview:"Aperçu",zoom:"Plein écran",
 genPdf:"Télécharger le PDF",print:"Imprimer / PDF",save:"Enregistrer",sendMail:"Envoyer par email",
 profileTitle:"Mon profil",profileNote:"Rempli une fois, réutilisé sur tous vos documents. Stocké localement dans ce navigateur.",
 dataTitle:"Sauvegarde des données",dataNote:"Exportez un JSON pour transférer profil, archive et compteur vers un autre poste.",
 exportJson:"Exporter (.json)",importJson:"Importer (.json)",wipe:"Effacer toutes les données",
 archiveTitle:"Archive",exportCsv:"Export CSV",exportIcsv:"Export iCSV (comptable)",type:"Type",date:"Date",
 client2:"Client",total:"Total TTC",status:"Statut",
 archEmpty:"Aucun document. Enregistrez le premier depuis l'onglet Document.",clientsTitle:"Clients récurrents",
 proLede:"Paiement unique. Pas d'abonnement. Fonctionne hors-ligne, à vie.",
 activate:"Activer ma licence",activateNote:"Clé reçue par email après achat. Stockée dans ce navigateur uniquement, aucune vérification en ligne.",
 activateBtn:"Activer",saved:"Enregistré ✓",copied:"Copié",needClient:"Renseignez le client",
 p1:"Documents illimités + archive sans limite",p2:"Modèles Modern & Minimal",p3:"Sans mention « généré avec Facturly »",
 p4:"Devis → facture en 1 clic",p5:"Relances de paiement rédigées pour vous",p6:"Multi-devises & taux de change enregistrés",
 p7:"Export comptable iCSV",
 a1:"Tout le plan Pro, jusqu'à 5 utilisateurs",a2:"Logo & nom personnalisés sur les factures",
 a3:"Pack de 20 modèles de devis/lignes",a4:"Export comptable iCSV par client",a5:"Droit de le fournir à vos clients finaux",
 best:"le plus rentable",
 fLegalName:"Nom / Raison sociale",fOwner:"Nom de l'exploitant",fAddress:"Adresse",fZipCity:"CP / Ville",fCountry:"Pays",
 fEmail:"Email",fPhone:"Téléphone",fSite:"Site web",fMF:"Matricule fiscal",fRC:"Registre de commerce",fVAT:"N° TVA",
 fRib:"RIB / IBAN",fBank:"Banque",fPaypal:"PayPal / Wise / Payoneer",fTerms:"Conditions par défaut",
 qty:"Qté",unit:"Unité",pu:"P.U. HT",amount:"Montant HT",vat:"TVA",desc:"Désignation",
 sub:"Total HT",disc:"Remise",taxes:"TVA",stampL:"Timbre / taxes",wh:"Retenue à la source",payable:"Net à payer",
 paid:"Acompte / déjà payé",due:"Solde",issued:"Émis le",du:"Échéance",vatNum:"N° TVA",mf:"Mat. fiscal",rc:"RC",
 bankDetails:"Coordonnées bancaires",thankYou:"Merci de votre confiance",legalNote:"Mentions",
 noVat:"TVA non applicable",exportMention:"Exportation de services — TVA 0 %",
 fAedRate:"Taux 1 EUR → AED (factures aux Émirats)",fAedHint:"Sur une facture émirienne, le MONTANT DE TVA doit être exprimé en AED même si vous facturez en euros. Vous saisissez le cours vous-même : l'outil n'en va chercher aucun sur Internet.",
 quoteValid:"Devis valable 30 jours. Bon pour accord, date et signature du client.",
 watermark:"Généré avec Facturly",proLockMsg:"Fonction Pro — activez votre licence dans l'onglet Pro.",
 licenceOk:"Licence valide. Merci ! Tout est débloqué.",licenceBad:"Clé invalide pour ce navigateur. Vérifiez la saisie.",
 r1:"Relance",dup:"Dupliquer",del:"Supprimer",use:"Ouvrir",convert:"Devis → Facture",
 limitFree:"Version gratuite : 12 documents / mois. Passez Pro pour lever la limite.",
 exportsLeft:"{n} exports PDF restants ce mois"},
ar:{upgrade:"الترقية",docType:"نوع الوثيقة",invoice:"فاتورة",quote:"عرض سعر",credit:"ملحقة تخفيض",
 number:"الرقم",issueDate:"تاريخ الإصدار",dueDate:"أجل الدفع",country:"الدولة والجباية",
 vatApplied:"خاضع للضريبة على القيمة المضافة",vatRate:"نسبة TVA %",currency:"العملة",exportZero:"تصدير — TVA بصفر",
 withholding:"إيقاف عند المصدر",stamp:"تمبر / معلوم قار",extras:"خيارات",
 showLogo:"إظهار الشعار",logo:"الشعار",accent:"اللون",template:"النموذج",
 proOnly:"Modern و Minimal والتذكير وتحويل عرض السعر = نسخة Pro",
 yourCo:"المصدر",client:"الحريف",pickClient:"من الأرشيف",lines:"أسطر",addLine:"+ سطر",bulk:"لصق",
 notes:"ملاحظات / شروط",payLink:"رابط الدفع",preview:"معاينة",zoom:"ملء الشاشة",
 genPdf:"تحميل PDF",print:"طباعة",save:"حفظ",sendMail:"إرسال بالبريد",
 profileTitle:"ملفي",profileNote:"يُملأ مرة واحدة ويُستعمل في كل الوثائق. محفوظ في هذا المتصفح.",
 dataTitle:"نسخ البيانات",dataNote:"صدّر ملف JSON لنقل ملفك وأرشيفك إلى جهاز آخر.",
 exportJson:"تصدير",importJson:"استيراد",wipe:"حذف كل البيانات",
 archiveTitle:"الأرشيف",exportCsv:"CSV",exportIcsv:"iCSV",type:"النوع",date:"التاريخ",
 client2:"الحريف",total:"المجموع",status:"الحالة",
 archEmpty:"لا توجد وثائق.",clientsTitle:"الحرفاء المنتظمون",
 proLede:"دفعة وحيدة، بلا اشتراك، يعمل دون إنترنت إلى الأبد.",
 activate:"تفعيل الرخصة",activateNote:"المفتاح يصلك بالبريد بعد الشراء. يُحفظ في هذا المتصفح فقط.",
 activateBtn:"تفعيل",saved:"تم الحفظ ✓",copied:"تم النسخ",needClient:"أدخل الحريف",
 p1:"وثائق غير محدودة",p2:"نموذجا Modern و Minimal",p3:"حذف عبارة Facturly",
 p4:"تحويل عرض السعر إلى فاتورة",p5:"رسائل تذكير جاهزة",p6:"عملات متعددة",p7:"تصدير محاسبي iCSV",
 a1:"كل مزايا Pro لخمسة مستعملين",a2:"شعارك واسمك على الفواتير",a3:"20 نموذج جاهز",
 a4:"تصدير محاسبي لكل حريف",a5:"حق تسليمه لحرفائك",
 best:"الأكثر مردودية",
 fLegalName:"الإسم / الشركة",fOwner:"إسم المستغل",fAddress:"العنوان",fZipCity:"المدينة والرمز",fCountry:"الدولة",
 fEmail:"البريد",fPhone:"الهاتف",fSite:"الموقع",fMF:"الرقم الجبائي",fRC:"السجل التجاري",fVAT:"معرّف الجبائي",
 fRib:"RIB",fBank:"البنك",fPaypal:"PayPal / Wise",fTerms:"الشروط",
 qty:"الكمية",unit:"الوحدة",pu:"سعر",amount:"المجموع",vat:"TVA",desc:"التسمية",
 sub:"المجموع خارج الخطي",disc:"تخفيض",taxes:"TVA",stampL:"التمبر",wh:"إيقاف",payable:"الصافي المستحق",
 paid:"مدفوع",due:"البقية",issued:"بتاريخ",du:"أجل",vatNum:"TVA",mf:"رقم جبائي",rc:"س.ت",
 bankDetails:"المعطيات البنكية",thankYou:"شكرا لثقتكم",legalNote:"إشارات",
 noVat:"لا تُطبق عليه TVA",exportMention:"تصدير خدمات — TVA بصفر",
 fAedRate:"سعر 1 EUR → AED (فواتير الإمارات)",fAedHint:"في الفاتورة الإماراتية يجب بيان مبلغ الضريبة بالدرهم حتى لو كانت الفاتورة باليورو. تُدخل السعر يدويًا: لا يجلب التطبيق أي سعر من الإنترنت.",
 quoteValid:"عرض السعر صالح لثلاثين يوما.",watermark:"أُنجز بواسطة Facturly",
 proLockMsg:"ميزة Pro — فعّل الرخصة.",licenceOk:"رخصة صالحة.",licenceBad:"مفتاح غير صالح.",
 r1:"تذكير",dup:"نسخ",del:"حذف",use:"فتح",convert:"عرض سعر ← فاتورة",
 limitFree:"النسخة المجانية: 12 وثيقة في الشهر.",exportsLeft:"بقي {n} تصدير هذا الشهر"},
en:{upgrade:"Go Pro",docType:"Document type",invoice:"Invoice",quote:"Quote",credit:"Credit note",
 number:"Number",issueDate:"Issue date",dueDate:"Due date",country:"Country & tax",
 vatApplied:"VAT registered",vatRate:"VAT rate (%)",currency:"Currency",exportZero:"Export / 0% VAT (foreign client)",
 withholding:"Withholding tax",stamp:"Stamp duty / fixed taxes",extras:"Options",
 showLogo:"Show logo",logo:"Logo",accent:"Accent colour",template:"Template",
 proOnly:"Modern & Minimal · chasing · quote→invoice · iCSV = Pro",
 yourCo:"From",client:"Bill to",pickClient:"Pick from archive",lines:"Line items",addLine:"+ Line",bulk:"Paste (TSV)",
 notes:"Notes / terms",payLink:"Payment link",preview:"Preview",zoom:"Fullscreen",
 genPdf:"Download PDF",print:"Print / PDF",save:"Save",sendMail:"Email it",
 profileTitle:"My profile",profileNote:"Fill once, reused on every document. Stored locally in this browser.",
 dataTitle:"Backup",dataNote:"Export a JSON to move profile, archive and numbering counter to another machine.",
 exportJson:"Export (.json)",importJson:"Import (.json)",wipe:"Erase all data",
 archiveTitle:"Archive",exportCsv:"Export CSV",exportIcsv:"Export iCSV",type:"Type",date:"Date",
 client2:"Client",total:"Total incl. tax",status:"Status",
 archEmpty:"No documents yet. Save one from the Document tab.",clientsTitle:"Repeat clients",
 proLede:"One payment. No subscription. Works offline forever.",
 activate:"Activate licence",activateNote:"Key is emailed after purchase. Stored in this browser only, never phoned home.",
 activateBtn:"Activate",saved:"Saved ✓",copied:"Copied",needClient:"Enter a client",
 p1:"Unlimited documents & archive",p2:"Modern & Minimal templates",p3:"No “generated with Facturly” line",
 p4:"Quote → invoice in one click",p5:"Ready-written payment chasing emails",p6:"Multi-currency with saved rates",
 p7:"Accounting iCSV export",
 a1:"All of Pro, up to 5 users",a2:"Your logo and name on invoices",a3:"20 ready quote/line templates",
 a4:"Per-client accounting export",a5:"Right to ship it to your own clients",
 best:"best value",
 fLegalName:"Trading name",fOwner:"Owner",fAddress:"Address",fZipCity:"Postcode / City",fCountry:"Country",
 fEmail:"Email",fPhone:"Phone",fSite:"Website",fMF:"Tax ID",fRC:"Company reg.",fVAT:"VAT number",
 fRib:"RIB / IBAN",fBank:"Bank",fPaypal:"PayPal / Wise / Payoneer",fTerms:"Default terms",
 qty:"Qty",unit:"Unit",pu:"Unit price",amount:"Amount",vat:"VAT",desc:"Description",
 sub:"Subtotal",disc:"Discount",taxes:"VAT",stampL:"Stamp / taxes",wh:"Withholding",payable:"Total due",
 paid:"Paid / deposit",due:"Balance",issued:"Issued",du:"Due",vatNum:"VAT",mf:"Tax ID",rc:"Reg.",
 bankDetails:"Bank details",thankYou:"Thank you for your business",legalNote:"Legal",
 noVat:"VAT not applicable",exportMention:"Export of services — 0% VAT",
 fAedRate:"Rate 1 EUR → AED (UAE invoices)",fAedHint:"A UAE tax invoice must state the VAT amount in AED even when you bill in euro. You type the rate yourself: the tool fetches no FX rate over the network.",
 quoteValid:"This quote is valid for 30 days. Signed and dated acceptance.",
 watermark:"Generated with Facturly",proLockMsg:"Pro feature — activate your licence.",
 licenceOk:"Licence valid. Everything unlocked.",licenceBad:"Key not valid for this browser.",
 r1:"Chase",dup:"Duplicate",del:"Delete",use:"Open",convert:"Quote → Invoice",
 limitFree:"Free plan: 12 documents per month. Go Pro to remove the limit.",
 exportsLeft:"{n} PDF exports left this month"}};

var CUR=[
 {c:"TND",s:"DT",n:3},{c:"MAD",s:"DH",n:2},{c:"DZD",s:"DA",n:2},{c:"EGP",s:"E£",n:2},
 {c:"EUR",s:"€",n:2},{c:"USD",s:"$",n:2},{c:"GBP",s:"£",n:2},{c:"XOF",s:"CFA",n:0},
 {c:"CAD",s:"C$",n:2},{c:"CHF",s:"CHF",n:2},{c:"SAR",s:"SR",n:2},{c:"AED",s:"AED",n:2}];

/* ⚠ TAUX INDICATIFS — à faire valider par un comptable avant mise en ligne.
   Tout est modifiable dans l'interface, donc une erreur ne bloque pas l'utilisateur. */
var COUNTRY={
 TN:{name:"Tunisie",flag:"🇹🇳",cur:"TND",dVat:19,stamp:0,legal:"Numérotation séquentielle obligatoire. Conservation 10 ans.",
    note:"Export de services vers un client non résident : TVA 0 %. Les recettes d'export en devises doivent être rapatriées (réglementation des changes — à valider avec votre banque)."},
 MA:{name:"Maroc",flag:"🇲🇦",cur:"MAD",dVat:20,stamp:0,legal:"Mentions ICE / IF / RC / CNSS requises sur la facture.",
    note:"TVA sur les services : exigibilité à l'encaissement. Export : TVA 0 %."},
 DZ:{name:"Algérie",flag:"🇩🇿",cur:"DZD",dVat:19,stamp:0,legal:"NIF + NIS obligatoires.",
    note:"Facturation en dinar pour les opérations locales. Export : TVA 0 % sous conditions."},
 EG:{name:"Égypte",flag:"🇪🇬",cur:"EGP",dVat:14,stamp:0,legal:"Numérotation conforme aux exigences ETA.",
    note:"Export de services hors TVA. Timbre fiscal : à confirmer."},
 FR:{name:"France",flag:"🇫🇷",cur:"EUR",dVat:20,stamp:0,legal:"Franchise en base : « TVA non applicable, art. 293 B du CGI ». Pénalités 3× taux légal + 40 €.",
    note:"Pensez à la facture électronique (PPF) obligatoire en 2026-2027 selon votre régime."},
 BE:{name:"Belgique",flag:"🇧🇪",cur:"EUR",dVat:21,stamp:0,legal:"Autoliquidation possible pour client assujetti (art. 44bis C. TVA).",
    note:"Vérifiez l'assujettissement TVA de votre client UE."},
 AE:{name:"Émirats arabes unis",flag:"🇦🇪",cur:"AED",dVat:5,stamp:0,
    legal:"Mention « فاتورة ضريبية / Tax Invoice » et TRN à 15 chiffres requis. La TVA doit être exprimée en AED.",
    note:"Assujetti seulement au-delà de AED 375 000 de CA sur 12 mois (inscription volontaire dès 187 500). Freelance hors Emirats facturant un client EAU : autoliquidation (reverse charge) — le client VAT-enregistré déclare la TVA, pas vous. PINT-AE : déploiement par paliers depuis 2027 ; cet outil ne prétend pas le produire."},
 SA:{name:"Arabie saoudite",flag:"🇸🇦",cur:"SAR",dVat:15,stamp:0,
    legal:"فاتورة ضريبية / Tax Invoice, VAT number, numérotation séquentielle. ZATCA phase 2 exige un XML signé et un QR code : ne pas promettre ce point.",
    note:"Enregistré en Arabie ⇒ ZATCA phase 2 (crypto-stamp + QR) obligatoire et NON couvert par cet outil. VAT 15 %. 0 % sur l'export de services hors KSA."},
 XX:{name:"International / export",flag:"🌍",cur:"EUR",dVat:0,stamp:0,legal:"Aucune TVA locale facturée. Conservez la preuve de prestation hors du pays du client.",
    note:"Idéal clients US / UK / UE sans établissement. Vérifiez d'éventuelles retenues à la source locales."}};

function idLabels(d){
  /* Un seul champ de saisie, l'étiquette suit le pays. Ajouter un « champ TRN » à côté du
     « matricule fiscal » aurait fait deux champs dont un vide, et une facture tunisienne
     avec une ligne « TRN : » — c'est ainsi qu'on abîme un document pour trois lignes d'idée. */
  var c=(d&&d.country)||"";
  if(c==="AE")return{a:"TRN",b:"TRN",short:"TRN"};
  if(c==="SA")return{a:"VAT No.",b:"VAT",short:"VAT"};
  if(c==="MA")return{a:"IF",b:"ICE",short:"IF"};
  if(c==="DZ")return{a:"NIF",b:"NIS",short:"NIF"};
  return{a:t("mf"),b:t("rc"),short:t("mf")};
}
var UNITS=["HUR","DAY","MO","EA","KGM","LTR","PRC","QUA","SET","SVCA"];

function num(x){
  /* L'interface est française : « 3,67 » est la façon NORMALE de taper un taux de change, et
     +"3,67" vaut NaN → 0. Ce 0 silencieux imprimait « VAT amount in AED : 0.00 » sur une facture
     de 458,75. Règle reprise de numNorm() de l'outil fusion : même produit, même convention, un
     seul jeu de règles à apprendre. On ne devine pas un séparateur ambigu → 0, et un 0 sur le
     taux fait afficher « renseignez le taux » au lieu d'un montant faux. */
  if(typeof x==="number")return isFinite(x)?x:0;
  if(x==null||x==="")return 0;
  var s=String(x).trim();
  if(!/^-?[\d\s\u00a0.,]+$/.test(s))return 0;
  if(/^0\d/.test(s.replace(/^-/,"")))return 0;          /* « 007 » est un code, pas un montant */
  var t=s.replace(/[\s\u00a0]/g,"");
  if(/,\d{1,2}$/.test(t)&&/\d\.\d/.test(t))t=t.replace(/\./g,"").replace(",",".");
  else if(/,/.test(t)&&!/\.\d*$/.test(t))t=t.replace(",",".");
  else if(/,/.test(t))t=t.replace(/,/g,".");
  var m=t.match(/^-?\d+(?:[.,]\d+)?/);
  if(!m)return 0;
  var v=parseFloat(m[0].replace(",","."));
  return isFinite(v)?v:0;}


/* ------------------------------------------------------------- helpers */
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function t(k){var d=T[S.lang]||T.fr;if(d&&d[k]!=null)return d[k];if(T.fr[k]!=null)return T.fr[k];return k;}
function money(v,dec){dec=(dec==null?2:dec);v=+v||0;
  var s=v.toFixed(dec).split(".");return s[0].replace(/\B(?=(\d{3})+(?!\d))/g," ")+(s[1]?"."+s[1]:"");}
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function isoToday(off){var d=new Date();if(off)d.setDate(d.getDate()+off);
  return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);}
function addDays(iso,n){var d=new Date((iso||isoToday())+"T00:00:00");d.setDate(d.getDate()+n);
  return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);}
function toast(m){var e=$("#toast");e.textContent=m;e.classList.add("show");
  clearTimeout(toast._i);toast._i=setTimeout(function(){e.classList.remove("show");},2800);}
function hash(s){s=String(s);var h1=0x9e3779b9,h2=0x85ebca6b,i,c;
  for(i=0;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h1=(h1<<13)|(h1>>>19);h2=Math.imul(h2^c,1597334677)^h1;}
  h1=Math.imul(h1^(h1>>>16),2246822507);h2=Math.imul(h2^(h2>>>13),3266489909);
  function hx(x){x=(x>>>0).toString(36).toUpperCase();while(x.length<6)x="0"+x;return x.slice(0,5);}
  return hx(h1)+"-"+hx(h2);}
function deviceCode(){var v=localStorage.getItem("fx_dev");
  if(!v){v=hash(navigator.userAgent+"|"+screen.width+"|"+(new Date().getTimezoneOffset())+"|fx-salt-v1").slice(0,10).toUpperCase();
    localStorage.setItem("fx_dev",v);}return v;}
function download(name,text,mime){
  var b=new Blob([text],{type:mime||"text/plain;charset=utf-8"}),a=document.createElement("a"),u="";
  try{u=URL.createObjectURL(b);}catch(e){}
  a.href=u;a.download=name;a.rel="noopener";a.style.display="none";
  document.body.appendChild(a);
  if(typeof a.click==="function"){try{a.click();}catch(e){}}
  setTimeout(function(){try{if(u&&URL.revokeObjectURL)URL.revokeObjectURL(u);}catch(e){}a.remove();},600);}

/* --------------------------------------------------------------- state */
var KEY="facturly.v1";
var S={lang:"fr",plan:"free",licence:"",profile:{},documents:[],counter:{},
  doc:{id:"",type:"facture",number:"",date:isoToday(),due:addDays(isoToday(),30),country:"TN",
       vatApplied:true,vatRate:19,currency:"TND",exportZero:false,withholding:false,whRate:15,
       discount:0,stamp:0,paid:0,lines:[],notes:"",payLink:"",template:"classic",
       accent:"#0f172a",logo:"",showLogo:true,seller:"",buyer:""}};
function blankLine(){return{d:"",q:1,u:"HUR",p:0,v:+(S.doc.vatRate||0)||0};}
function isPro(){return S.plan==="pro";}
function load(){try{var r=JSON.parse(localStorage.getItem(KEY));if(r&&typeof r==="object"){
    for(var k in r){if(k==="doc")Object.assign(S.doc,r.doc);else S[k]=r[k];}}}catch(e){}
  if(!S.doc.lines||!S.doc.lines.length)S.doc.lines=[blankLine()];
  if(!S.counter)S.counter={};if(!S.documents)S.documents=[];if(!S.profile)S.profile={};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}

/* ----------------------------------------------------------- currency */
function cur(){for(var i=0;i<CUR.length;i++)if(CUR[i].c===S.doc.currency)return CUR[i];return CUR[4];}
function fmt(v){var c=cur();return money(v,c.n)+" "+c.s;}
function fillCurrencies(){var h="";for(var i=0;i<CUR.length;i++)h+='<option value="'+CUR[i].c+'">'+CUR[i].c+'</option>';
  $("#currencySel").innerHTML=h;}

/* ---------------------------------------------------------- numbering */
function nextNumber(){var y=new Date().getFullYear(),pre={facture:"F",devis:"D",avoir:"A"}[S.doc.type]||"F";
  var k=S.doc.country+"-"+S.doc.type+"-"+y,n=(S.counter[k]||0)+1;
  return pre+"-"+y+"-"+("000"+n).slice(-4);}
function commitNumber(){var y=new Date().getFullYear();var k=S.doc.country+"-"+S.doc.type+"-"+y;
  S.counter[k]=(S.counter[k]||0)+1;}

/* ------------------------------------------------------------ compute */
function compute(){
  var d=S.doc,noVat=(!d.vatApplied)||d.exportZero,factor=1-(num(d.discount)/100),tot=0,tax=0;
  var lines=(d.lines||[]).map(function(l){
    var base=num(l.q)*num(l.p),rate=noVat?0:num(l.v),amt=base*factor,tx=noVat?0:amt*rate/100;
    tot+=amt;tax+=tx;return{d:l.d,qty:l.q,unit:l.u,pu:l.p,rate:rate,amt:amt,tax:tx,total:amt+tx};});
  var sub=tot/(factor||1),disc=sub-tot,stamp=num(d.stamp),ttc=tot+tax+stamp;
  var wh=d.withholding?tot*(num(d.whRate)/100):0,paid=num(d.paid);
  return{lines:lines,sub:sub,disc:disc,taxable:tot,vat:tax,stamp:stamp,ttc:ttc,wh:wh,
         payable:ttc,net:ttc-wh,paid:paid,due:Math.max(0,ttc-wh-paid),exempt:!!noVat};}

/* ---------------------------------------------------------- document */

function docCss(){
  var a=S.doc.accent||"#0f172a",tpl=S.doc.template;
  var base='@page{size:A4;margin:0}html,body{margin:0;padding:0;background:#fff}'
   +'*{box-sizing:border-box}'
   +'body{font-family:"Helvetica Neue",Helvetica,Arial,"Segoe UI",Tahoma,sans-serif;color:#111;font-size:11px;width:210mm}'
   +'.pg{min-height:297mm;display:flex;flex-direction:column;padding:0}'
   +'.band{background:'+a+';color:#fff;padding:12mm 14mm 9mm;display:flex;justify-content:space-between;gap:8mm;align-items:flex-start}'
   +'.co{font-size:17px;font-weight:700;letter-spacing:-.3px;line-height:1.3}'
   +'.ttl{font-size:22px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;opacity:.95;text-align:end}'
   +'.meta{font-size:9.2px;line-height:1.6;opacity:.86;margin-top:1.8mm}'
   +'.right{text-align:end}'
   +'.grid2{display:flex;gap:8mm;padding:7mm 14mm 3mm}'
   +'.box{flex:1;border:1px solid #e3e6ec;border-radius:5px;padding:4.5mm 5mm}'
   +'.box h4{margin:0 0 2mm;font-size:7.8px;letter-spacing:1.3px;text-transform:uppercase;color:#8b93a5;font-weight:700}'
   +'.box div{line-height:1.5;white-space:pre-line}'
   +'.padx{padding:0 14mm}'
   +'table{width:100%;border-collapse:collapse}'
   +'th{background:#f5f7fa;color:#5b6478;font-size:8.4px;letter-spacing:.6px;text-transform:uppercase;text-align:left;padding:2.6mm 2mm}'
   +'th.r,td.r{text-align:right;font-variant-numeric:tabular-nums}'
   +'td{padding:2.4mm 2mm;border-bottom:1px solid #eef1f5;vertical-align:top;line-height:1.45}'
   +'tr.tot td{border:0;padding:1.4mm 2mm}.totlab{color:#5b6478;font-size:10px}'
   +'.band2{background:'+a+';color:#fff;padding:2.8mm 4mm;border-radius:4px;font-size:13.5px;font-weight:800}'
   +'.foot{margin-top:auto;padding:6mm 14mm 7mm;font-size:8.2px;color:#707a90;line-height:1.6;display:flex;gap:6mm;justify-content:space-between;border-top:1px solid #eef1f5}'
   +'.wm{text-align:center;font-size:8.5px;color:#aab2c0;padding:2mm 0 4mm}'
   +'.logo{height:12mm;max-width:52mm;object-fit:contain;display:block;margin-bottom:2mm}'
   +'.pay{margin-top:2.5mm;font-size:8.6px;background:rgba(255,255,255,.18);padding:1.5mm 3mm;border-radius:4px;display:inline-block}';
  if(tpl==="modern")base+='.band{padding:14mm 14mm 11mm}.co{font-size:21px}.ttl{font-size:25px}.box{background:#fafbfd}';
  if(tpl==="minimal")base+='.band{background:#fff;color:#11;padding:10mm 14mm 6mm;border-bottom:2px solid '+a
     +';align-items:flex-end}.ttl{color:'+a+'}.meta{color:#555}.box{border:0;padding:0;background:transparent}';
  return base;}

/* L'aperçu ET le PDF doivent dire la même chose. Avant : chaque chemin fabriquait ses
   mentions dans son coin, et le chemin jsPDF n'en fabriquait AUCUNE — le PDF téléchargé
   par un client français en franchise de base ne portait pas « TVA non applicable,
   art. 293 B du CGI », et celui d'un client émirien ni le TRN ni la TVA en AED.
   Deux fonctions partagées, un seul endroit où la règle vit. */
function legalLines(d){
  var c=compute(),ct=COUNTRY[d.country]||COUNTRY.XX,out=[];
  if(d.exportZero)out.push(ct.name==="France"?"Exportation de services — TVA non applicable":t("exportMention"));
  else if(!d.vatApplied)out.push(t("noVat")+(d.country==="FR"?" (art. 293 B du CGI)":""));
  if(d.type==="devis")out.push(t("quoteValid"));
  if(d.country==="AE"&&!d.exportZero){
    /* Exigence des EAU, et la seule qu'on puisse honorer sans service de change : quand on facture
       en EUR ou USD, le MONTANT DE TVA doit aussi être exprimé en AED. Taux saisi à la main dans le
       profil — pas d'appel réseau, sinon on perd la promesse « ça marche hors-ligne, même en avion ». */
    var r=num(S.profile.aedRate);
    if(r>0)out.push("VAT amount in AED : "+(c.vat*r).toFixed(2)+" AED (taux "+r+", saisi à la main — à revérifier le jour de l'émission)");
    else out.push("⚠ Client EAU : la TVA doit aussi être exprimée en AED. Renseignez le taux de conversion dans le profil.");
  }
  if(ct.legal)out.push(ct.legal);
  if(S.profile.terms)out.push(S.profile.terms);
  if(d.notes)out.push(d.notes);
  return out;}
function idLines(d){
  /* Le champ de saisie ne change pas selon le pays, son ÉTIQUETTE oui (TRN aux EAU,
     VAT No. en KSA, IF/ICE au Maroc, NIF/NIS en Algérie). Une source pour l'aperçu et le PDF. */
  var L=idLabels(d);
  return[S.profile.matricule?L.a+" "+S.profile.matricule:"",
         S.profile.rne?L.b+" "+S.profile.rne:"",
         S.profile.vatNumber?t("vatNum")+" "+S.profile.vatNumber:""].filter(Boolean);}

function renderPreview(){
  var c=compute(),d=S.doc,ct=COUNTRY[d.country]||COUNTRY.XX,cc=cur(),L=(S.lang==="ar");
  var noVat=c.exempt;
  var ttl=t({facture:"invoice",devis:"quote",avoir:"credit"}[d.type]);
  var me=[d.seller].filter(Boolean).join("\n");
  function cols(){var h='<th>'+t("desc")+'</th><th class="r">'+t("qty")+'</th>';
    h+= noVat?'<th class="r">'+t("pu")+'</th><th class="r">'+t("amount")+'</th>'
             :'<th class="r">'+t("pu")+'</th><th class="r">'+t("vat")+'</th><th class="r">'+t("amount")+'</th>';
    return h;}
  function cell(l){var b='<td class="r">'+money(+l.qty||0,2)+'</td><td class="r">'+money(+l.pu||0,cc.n)+'</td>';
    return b+(noVat?"":'<td class="r">'+(+l.rate||0)+'%</td>')+'<td class="r"><b>'+money(+l.amt||0,cc.n)+"</b></td>";}
  var rows=c.lines.filter(function(l){return l.d||l.pu;}).map(function(l){
    return "<tr><td>"+esc(l.d)+"</td>"+cell(l)+"</tr>";}).join("");
  var cs=noVat?4:5;
  var tot='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+t("sub")+'</td><td class="r"><b>'+fmt(c.sub)+"</b></td></tr>";
  if(c.disc)tot+='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+t("disc")+" "+d.discount+'%</td><td class="r">−'+fmt(c.disc)+"</td></tr>";
  tot+='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+(noVat?t("noVat"):t("taxes")+" "+(+d.vatRate||0)+"%")+'</td><td class="r">'+fmt(c.vat)+"</td></tr>";
  if(c.stamp)tot+='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+t("stampL")+'</td><td class="r">'+fmt(c.stamp)+"</td></tr>";
  tot+='<tr class="tot"><td colspan="'+cs+'" class="r"></td><td class="r"><div class="band2">'+t("payable")+" "+fmt(c.payable)+"</div></td></tr>";
  if(c.wh)tot+='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+t("wh")+" "+d.whRate+'%</td><td class="r">−'+fmt(c.wh)+"</td></tr>";
  if(c.paid>0)tot+='<tr class="tot"><td colspan="'+cs+'" class="r totlab">'+t("paid")+'</td><td class="r">−'+fmt(c.paid)+"</td></tr>"
    +'<tr class="tot"><td colspan="'+cs+'" class="r totlab"><b>'+t("due")+'</b></td><td class="r"><b>'+fmt(c.due)+"</b></td></tr>";

  var legal=legalLines(d);

  var bank=[S.profile.bank,S.profile.rib,S.profile.paypal].filter(Boolean).join(" · ");
  var ident=idLines(d).join(" · ");

  var html='<!doctype html><html lang="'+S.lang+'" dir="'+(L?"rtl":"ltr")+'"><head><meta charset="utf-8">'
   +"<style>"+docCss()+"</style></head><body><div class='pg'>"
   +'<div class="band"><div>'
     +(d.showLogo&&d.logo?'<img class="logo" src="'+d.logo+'" alt="">':"")
     +'<div class="co">'+esc(S.profile.legalName||"—")+"</div>"
     +'<div class="meta">'+esc([S.profile.address,S.profile.city,S.profile.country].filter(Boolean).join("\n"))+"</div>"
   +"</div><div class='right'>"
     +'<div class="ttl">'+esc(ttl)+"</div>"
     +'<div class="meta"><b>'+esc(d.number||"—")+"</b><br>"+t("issued")+" "+esc(d.date)
     +(d.due?"<br>"+t("du")+" "+esc(d.due):"")+(cc.c!=="EUR"?"<br>"+esc(cc.c):"")+"</div>"
     +(d.payLink?'<div class="pay">'+(L?"رابط الدفع":"Payer en ligne →")+"</div>":"")
   +"</div></div>"
   +'<div class="grid2"><div class="box"><h4>'+t("yourCo")+"</h4><div>"+esc(me)+"</div></div>"
   +'<div class="box"><h4>'+t("client")+"</h4><div>"+esc(d.buyer||"")+"</div></div></div>"
   +'<div class="padx"><table><thead><tr>'+cols()+"</tr></thead><tbody>"+rows+"</tbody></table>"
   +"<table style='margin-top:3mm'>"+tot+"</table></div>"
   +'<div class="padx" style="margin-top:4mm"><div class="box" style="border:0;padding:0"><h4>'+t("legalNote")
     +'</h4><div style="font-size:9px;line-height:1.55;color:#5b6478">'+legal.map(esc).join("<br>")+"</div></div></div>"
   +'<div class="foot"><div>'+(bank?"<b>"+t("bankDetails")+"</b><br>"+esc(bank):"")+(ident?"<br>"+esc(ident):"")
     +"</div><div class='right'>"+esc(t("thankYou"))+"</div></div>"
   +(isPro()?"":"<div class='wm'>"+esc(t("watermark"))+" — facturly.app</div>")
   +"</div></body></html>";
  $("#previewFrame").srcdoc=html;
  window.__fxHtml=html;
}

/* --------------------------------------------------------------- UI */
function freeLeft(){if(isPro())return null;var m=isoToday().slice(0,7);
  var n=S.documents.filter(function(x){return (x.date||"").slice(0,7)===m;}).length;
  return Math.max(0,12-n);}
function recalcTotals(){
  var c=compute(),d=S.doc,ct=COUNTRY[d.country]||COUNTRY.XX;
  var h='<div class="trow"><span>'+t("sub")+"</span><span>"+fmt(c.sub)+"</span></div>";
  if(c.disc)h+='<div class="trow"><span>'+t("disc")+" "+d.discount+"%</span><span>−"+fmt(c.disc)+"</span></div>";
  h+='<div class="trow"><span>'+(c.exempt?t("noVat"):t("taxes")+" "+(+d.vatRate||0)+"%")+'</span><span>'+fmt(c.vat)+"</span></div>";
  if(c.stamp)h+='<div class="trow"><span>'+t("stampL")+"</span><span>"+fmt(c.stamp)+"</span></div>";
  h+='<div class="trow big"><span>'+t("payable")+"</span><span>"+fmt(c.payable)+"</span></div>";
  if(c.wh)h+='<div class="trow"><span>'+t("wh")+" "+d.whRate+"%</span><span>−"+fmt(c.wh)+"</span></div>";
  if(c.paid>0)h+='<div class="trow"><span>'+t("paid")+"</span><span>−"+fmt(c.paid)+"</span></div>"
    +'<div class="trow due"><span>'+t("due")+"</span><span>"+fmt(c.due)+"</span></div>";
  var left=freeLeft();
  if(left!=null)h+='<div class="trow"><span style="font-size:11px;opacity:.65">'+t("exportsLeft").replace("{n}",left)+"</span><span></span></div>";
  $("#totalsBox").innerHTML=h;
  $("#countryHint").innerHTML="<strong>"+ct.flag+" "+ct.name+"</strong><br>"+esc(ct.note)+"<br><em>"+esc(ct.legal)+"</em>";
  renderPreview();
}
function renderLinesStructure(){
  var w=$("#linesWrap"),noVat=(!S.doc.vatApplied)||S.doc.exportZero;
  var h='<div class="lrow head"><div>'+t("desc")+"</div><div>"+t("qty")+"</div><div>"+t("pu")+"</div><div>"
    +(noVat?t("unit"):t("vat")+"%")+'</div><div style="text-align:end">'+t("amount")+"</div><div></div><div></div></div>";
  (S.doc.lines||[]).forEach(function(l,i){
    var o="";UNITS.forEach(function(u){o+='<option'+(u===l.u?" selected":"")+">"+u+"</option>";});
    h+='<div class="lrow" data-i="'+i+'">'
      +'<input class="desc" data-k="d" value="'+esc(l.d)+'" placeholder="Prestation…">'
      +'<input data-k="q" type="number" step="0.25" value="'+esc(l.q)+'">'
      +'<input data-k="p" type="number" step="0.01" value="'+esc(l.p)+'">'
      +(noVat?'<input class="nolock" disabled value="'+esc(l.u)+'">':'<input data-k="v" type="number" step="0.5" value="'+esc(l.v)+'">')
      +'<div class="lt"></div>'
      +'<select data-k="u">'+o+"</select>"
      +'<button class="lx" data-del="'+i+'">×</button></div>';});
  w.innerHTML=h;
  $$("#linesWrap .lrow:not(.head)").forEach(function(row){
    var i=+row.getAttribute("data-i");
    $$("[data-k]",row).forEach(function(inp){
      var ev=inp.tagName==="SELECT"?"change":"input";
      inp.addEventListener(ev,function(){
        var k=inp.getAttribute("data-k");
        S.doc.lines[i][k]=(k==="d"||k==="u")?inp.value:(parseFloat(inp.value)||0);
        save();refreshLineAmounts();recalcTotals();});});
  });
  $$("[data-del]",w).forEach(function(b){b.addEventListener("click",function(){
    var i=+b.getAttribute("data-del");
    if(S.doc.lines.length<=1)S.doc.lines[0]=blankLine();else S.doc.lines.splice(i,1);
    save();renderLines();recalcTotals();});});
  refreshLineAmounts();
}
function refreshLineAmounts(){var cc=cur();
  $$("#linesWrap .lrow:not(.head)").forEach(function(row){var l=S.doc.lines[+row.getAttribute("data-i")];
    var e=$(".lt",row);if(e)e.textContent=money((+l.q||0)*(+l.p||0),cc.n);});}
function renderLines(){renderLinesStructure();}
function renderLinesMoney(){var cc=cur();
  $$("#linesWrap .lrow:not(.head)").forEach(function(row){var l=S.doc.lines[+row.getAttribute("data-i")];
    var e=$(".lt",row);if(e)e.textContent=money((+l.q||0)*(+l.p||0),cc.n);});}

/* ------------------------------------------------------------- exports */
/* jsPDF est fourni EN LOCAL (vendor/) : la promesse « fonctionne hors-ligne » doit être vraie,
   pas conditionnelle à un CDN. On ne retombe sur le CDN que si le fichier local manque. */
function ensureJsPDF(cb){
  if(window.jspdf&&window.jspdf.jsPDF)return cb(true);
  if(ensureJsPDF._done)return cb(ensureJsPDF._ok);
  var tried=0, sources=["vendor/jspdf.umd.min.js",
                       "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];
  function next(){
    if(tried>=sources.length){ensureJsPDF._done=true;ensureJsPDF._ok=false;cb(false);return;}
    var s=document.createElement("script"), settled=false;
    s.src=sources[tried++];
    var giveup=setTimeout(function(){ if(!settled){settled=true;s.remove();next();} },4000);
    s.onload=function(){ if(settled)return; settled=true; clearTimeout(giveup);
      if(window.jspdf&&window.jspdf.jsPDF){ensureJsPDF._done=true;ensureJsPDF._ok=true;cb(true);} else next(); };
    s.onerror=function(){ if(settled)return; settled=true; clearTimeout(giveup); s.remove(); next(); };
    document.head.appendChild(s);}
  next();}
function printable(s){return String(s==null?"":s)
  .replace(/‘|’/g,"'").replace(/“|”/g,'"').replace(/[–—]/g,"-").replace(/\u00a0/g," ")
  .replace(/×/g,"x").replace(/−/g,"-").replace(/[\u0600-\u06FF\u202A-\u202E]/g,"?");}
function hex2rgb(x){x=String(x||"#0f172a").replace("#","");if(x.length===3)x=x[0]+x[0]+x[1]+x[1]+x[2]+x[2];
  return [parseInt(x.slice(0,2),16)||15,parseInt(x.slice(2,4),16)||23,parseInt(x.slice(4,6),16)||42];}
function pdfViaJsPDF(){
  var doc=new window.jspdf.jsPDF({unit:"mm",format:"a4"});
  /* jsPDF attache .text() par INSTANCE (ni le prototype ni .API) : sans ce point
     d'accroche, aucun test ne peut vérifier ce que le PDF CONTIENT réellement.
     window.__test est undefined en usage normal → coût zéro pour l'acheteur. */
  if(window.__test&&window.__test.__onDoc)window.__test.__onDoc(doc);
  var d=S.doc,c=compute(),cc=cur(),W=210,M=14,A=hex2rgb(d.accent),dark=[17,17,17],grey=[95,100,118],lite=[140,148,164];
  function T_(s){return printable(s);}
  doc.setFillColor(A[0],A[1],A[2]);doc.rect(0,0,W,36,"F");
  doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(15);
  doc.text(T_(S.profile.legalName||"—"),M,14);
  doc.setFont("helvetica","normal");doc.setFontSize(7.8);
  doc.text(T_([S.profile.address,S.profile.city,S.profile.country].filter(Boolean).join("  ·  ")),M,20,{maxWidth:W-2*M-62});
  doc.setFont("helvetica","bold");doc.setFontSize(19);
  doc.text(T_({facture:"FACTURE",devis:"DEVIS",avoir:"AVOIR / NOTE DE CRÉDIT"}[d.type]),W-M,15,{align:"right"});
  doc.setFont("helvetica","normal");doc.setFontSize(8.2);
  doc.text(T_(d.number||""),W-M,21,{align:"right"});
  doc.text(T_(t("issued")+" "+d.date+(d.due?"   ·   "+t("du")+" "+d.due:"")+"   ·   "+cc.c),W-M,26,{align:"right"});
  var y=46;
  function party(label,val,x,w){
    doc.setFillColor(250,251,253);doc.setDrawColor(225,229,236);doc.roundedRect(x,y,w,27,2,2,"FD");
    doc.setFontSize(6.8);doc.setFont("helvetica","bold");doc.setTextColor(lite[0],lite[1],lite[2]);
    doc.text(T_(label).toUpperCase(),x+4,y+6);
    doc.setFont("helvetica","normal");doc.setTextColor(dark[0],dark[1],dark[2]);doc.setFontSize(8.6);
    doc.text(String(val||"").split(/\r?\n/).map(T_).slice(0,5),x+4,y+12,{lineHeightFactor:1.4,maxWidth:w-8});}
  party(t("yourCo"),d.seller,M,83);party(t("client"),d.buyer,W-M-83,83);
  y+=35;
  var noVat=c.exempt;
  var cols=noVat?[[t("desc"),83,0,"left"],[t("qty"),17,1,"right"],[t("pu"),29,1,"right"],[t("amount"),30,1,"right"]]
               :[[t("desc"),71,0,"left"],[t("qty"),15,1,"right"],[t("pu"),25,1,"right"],[t("vat")+" %",14,1,"right"],[t("amount"),30,1,"right"]];
  doc.setFillColor(245,247,250);doc.rect(M,y,W-2*M,7.5,"F");
  doc.setFont("helvetica","bold");doc.setFontSize(6.8);doc.setTextColor(grey[0],grey[1],grey[2]);
  var x=M+2;cols.forEach(function(k){doc.text(T_(k[0]),k[3]==="right"?x+k[1]-4:x,y+5,{align:k[3]});x+=k[1];});
  y+=11;doc.setFont("helvetica","normal");doc.setFontSize(8.6);doc.setTextColor(dark[0],dark[1],dark[2]);
  c.lines.filter(function(l){return l.d||l.pu;}).forEach(function(l){
    var cells=[l.d,money(+l.qty||0,2),money(+l.pu||0,cc.n)];
    if(!noVat)cells.push((+l.rate||0)+"%");cells.push(money(+l.amt||0,cc.n));
    x=M+2;var first=cells.shift();
    doc.text(T_(first||""),x,y,{maxWidth:cols[0][1]-4});x+=cols[0][1];
    cells.forEach(function(v,i2){doc.text(T_(v),x+cols[i2+1][1]-4,y,{align:"right"});x+=cols[i2+1][1];});
    y+=6;doc.setDrawColor(238,241,245);doc.line(M,y-2,W-M,y-2);
    if(y>235){doc.addPage();y=18;}});
  y+=5;var tx=W-M-74;
  function trow(lab,val,band){
    if(band){doc.setFillColor(A[0],A[1],A[2]);doc.roundedRect(tx-8,y-5,88,10,1.6,1.6,"F");
      doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(10.5);
      doc.text(T_(lab),tx-3,y+1.6);doc.text(T_(val),W-M-2,y+1.6,{align:"right"});
      doc.setFont("helvetica","normal");y+=12;return;}
    doc.setFontSize(8.6);doc.setTextColor(grey[0],grey[1],grey[2]);
    doc.text(T_(lab),tx+22,y,{align:"right"});
    doc.setTextColor(dark[0],dark[1],dark[2]);doc.text(T_(val),W-M,y,{align:"right"});y+=5.6;}
  trow(t("sub"),fmt(c.sub));
  if(c.disc)trow(t("disc")+" "+d.discount+"%","-"+fmt(c.disc));
  trow(noVat?t("noVat"):t("taxes")+" "+(+d.vatRate||0)+"%",fmt(c.vat));
  if(c.stamp)trow(t("stampL"),fmt(c.stamp));
  trow(t("payable"),fmt(c.payable),true);
  if(c.wh)trow(t("wh")+" "+d.whRate+"%","-"+fmt(c.wh));
  if(c.paid>0){trow(t("paid"),"-"+fmt(c.paid));trow(t("due"),fmt(c.due));}
  var fy=274;doc.setDrawColor(235,238,243);doc.line(M,fy-4,W-M,fy-4);
  doc.setFontSize(7);doc.setTextColor(112,122,144);
  /* Le pied de page du PDF était construit À LA MAIN, séparément de l'aperçu : deux bugs
     invisibles à l'œil nus. (a) aucune mention légale n'y passait — pas de « TVA non
     applicable, art. 293 B du CGI » pour un client français en franchise de base, pas de
     « VAT amount in AED » pour un client émirien, alors que l'aperçu les affichait : le
     document qui part chez le client n'était pas celui qu'on avait contrôlé. (b) l'étiquette
     fiscale était codée en dur (t("mf")/t("rc")), donc une facture aux Émirats sortait en
     « MF … » au lieu de « TRN … ». Les deux chemins tirent maintenant des mêmes fonctions. */
  var foot=[];
  if(S.profile.bank||S.profile.rib)foot.push(t("bankDetails")+" : "+[S.profile.bank,S.profile.rib,S.profile.paypal].filter(Boolean).join(" / "));
  foot=foot.concat(idLines(d));
  legalLines(d).forEach(function(x){if(foot.indexOf(x)<0)foot.push(x);});
  if(foot.length>4)foot=foot.slice(0,4);   /* la place manque sous le tableau : on garde les mentions qui engagent */
  if(foot.length)doc.text(foot.map(T_).join("   ·   "),M,fy+1,{lineHeightFactor:1.45,maxWidth:W-2*M});
  if(!isPro()){doc.setFontSize(7.2);doc.setTextColor(170,178,192);
    doc.text(T_(t("watermark"))+" — facturly.app",W/2,290,{align:"center"});}
  var safe=String(d.buyer||"client").split(/\r?\n/)[0].replace(/[^\w\u0600-\u06FF-]+/g,"").slice(0,26)||"client";
  doc.save(({facture:"facture",devis:"devis",avoir:"avoir"}[d.type])+"-"+(d.number||"x")+"-"+safe+".pdf");
  return true;}
function printIt(){
  var h=window.__fxHtml||"";if(!h)return;
  var old=document.getElementById("fxPrint");if(old)old.remove();
  var st=document.createElement("style");st.id="fxPrint";
  st.textContent="body>*{display:none!important}body>#fxPrintRoot{display:block!important}#fxPrintRoot{position:absolute;inset:0;background:#fff;z-index:9999}";
  document.head.appendChild(st);
  var root=document.createElement("div");root.id="fxPrintRoot";
  var m=h.match(/<style>([\s\S]*?)<\/style>/),bodyM=h.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  root.innerHTML=(m?"<style>"+m[1]+"<\/style>":"")+(bodyM?bodyM[1]:"");
  document.body.appendChild(root);
  setTimeout(function(){window.print();bump();},80);}
function downloadPdf(){
  if(S.plan==="free"&&freeLeft()<=0){toast(t("limitFree"));activate("pro");return;}
  var pdfLibDown=(ensureJsPDF._done===true&&ensureJsPDF._ok===false);
  if(S.lang==="ar"||pdfLibDown){toast("→ Imprimer → Enregistrer en PDF");renderPreview();printIt();return;}
  ensureJsPDF(function(ok){
    if(!ok){printIt();return;}
    try{pdfViaJsPDF();bump();toast("PDF ✓");}
    catch(e){console.error(e);printIt();}});}
function bump(){save();recalcTotals();}

/* ---------------------------------------------------------- documents */
function saveDoc(){
  if(!(S.doc.buyer||"").trim()){toast(t("needClient"));return;}
  var c=compute();
  if(!S.doc.number)S.doc.number=nextNumber();
  var o={id:S.doc.id||("x"+Date.now().toString(36)),type:S.doc.type,number:S.doc.number,date:S.doc.date,
    due:S.doc.due,buyer:S.doc.buyer,country:S.doc.country,currency:cur().c,total:c.payable,dueAmount:c.due,
    status:S.doc.type==="devis"?"envoye":"impayee",lines:JSON.parse(JSON.stringify(S.doc.lines||[])),snapshot:JSON.parse(JSON.stringify(S.doc))};
  var i=-1;S.documents.forEach(function(x,k){if(x.id===o.id)i=k;});
  if(i>=0)S.documents[i]=o;else{S.documents.push(o);commitNumber();}
  S.doc.id=o.id;save();renderArchive();toast(t("saved"));
}
var STAT={impayee:["st-impay","⚠"],partielle:["st-partiel","½"],payee:["st-pay","✓"],
  brouillon:["st-brouillon","·"],envoye:["st-envoye","→"],refuse:["st-refuse","✕"]};
function renderArchive(){
  var q=($("#archSearch").value||"").toLowerCase(),tb=$("#archTable tbody"),rows=S.documents.slice().reverse();
  if(q)rows=rows.filter(function(d){return JSON.stringify(d).toLowerCase().indexOf(q)>=0;});
  $("#archEmpty").classList.toggle("hidden",rows.length>0);
  tb.innerHTML=rows.map(function(d){
    var n=-1;CUR.forEach(function(x,k){if(x.c===d.currency)n=x.n;});
    var st=STAT[d.status]||STAT.impayee;
    return "<tr data-id='"+d.id+"'><td><b>"+esc(d.number)+"</b></td><td>"+esc(t({facture:"invoice",devis:"quote",avoir:"credit"}[d.type]))
      +"</td><td>"+esc(d.date)+"</td><td>"+esc(String(d.buyer||"").split(/\r?\n/)[0])+"</td>"
      +"<td class='num'>"+money(d.total,n<0?2:n)+" "+esc(d.currency)+"</td>"
      +"<td><span class='pill "+st[0]+"' data-st>"+st[1]+"</span></td>"
      +"<td style='white-space:nowrap;text-align:end'><button class='btn btn-ghost btn-xs' data-open>"+t("use")+"</button>"
      +(d.type==="devis"?"<button class='btn btn-ghost btn-xs' data-conv>"+t("convert")+"</button>":"")
      +"<button class='btn btn-ghost btn-xs' data-rem>"+t("r1")+"</button>"
      +"<button class='btn btn-ghost btn-xs' data-dup>"+t("dup")+"</button>"
      +"<button class='btn btn-ghost btn-xs' data-del>"+t("del")+"</button></td></tr>";}).join("");
  $$("tr[data-id]",tb).forEach(function(tr){
    var doc=null;S.documents.forEach(function(x){if(x.id===tr.getAttribute("data-id"))doc=x;});
    if(!doc)return;
    var on=function(sel,fn){var e=$(sel,tr);if(e)e.addEventListener("click",fn);};
    on("[data-open]",function(){S.doc=JSON.parse(JSON.stringify(doc.snapshot));S.doc.id=doc.id;fillForm();activate("doc");});
    on("[data-del]",function(){if(window.confirm("Supprimer "+doc.number+" ?")){
      S.documents=S.documents.filter(function(x){return x.id!==doc.id;});save();renderArchive();}});
    on("[data-dup]",function(){var n=JSON.parse(JSON.stringify(doc.snapshot));n.id="";n.number=nextNumber();
      n.date=isoToday();n.due=addDays(isoToday(),30);S.doc=n;fillForm();activate("doc");});
    on("[data-st]",function(){var o=["impayee","partielle","payee","brouillon","envoye","refuse"];
      doc.status=o[(o.indexOf(doc.status)+1)%o.length];save();renderArchive();});
    on("[data-rem]",function(){if(!isPro()){toast(t("proLockMsg"));activate("pro");return;}
      openModal(t("r1")+" — "+doc.number,"<textarea id='mo'>"+esc(reminderText(doc))+"</textarea>"
        +"<button class='btn btn-primary btn-sm' id='moc' style='margin-top:10px'>"+t("copied")+"</button>");});
    on("[data-conv]",function(){if(!isPro()){toast(t("proLockMsg"));activate("pro");return;}
      var n=JSON.parse(JSON.stringify(doc.snapshot));n.id="";n.type="facture";n.number=nextNumber();
      n.date=isoToday();n.due=addDays(isoToday(),15);S.doc=n;fillForm();activate("doc");
      toast("Devis → Facture ✓");});
  });
  var names={};S.documents.forEach(function(d){var n=String(d.buyer||"").split(/\r?\n/)[0];if(n)names[n]=(names[n]||0)+1;});
  $("#clientsList").innerHTML=Object.keys(names).map(function(n){
    return "<button class='chip' data-c='"+esc(n)+"'>"+esc(n)+" <span style='color:#94a3b8'>"+names[n]+"</span></button>";
  }).join("")||"<span class='muted'>—</span>";
  $$("#clientsList .chip").forEach(function(b){b.addEventListener("click",function(){
    var last=null;S.documents.forEach(function(d){if(String(d.buyer||"").split(/\r?\n/)[0]===b.getAttribute("data-c"))last=d;});
    if(last){S.doc.buyer=last.buyer;fillForm();activate("doc");}});});
}
function reminderText(d){
  var nm=String(d.buyer||"").split(/\r?\n/)[0]||"Bonjour";
  return (S.lang==="fr"
   ?"Bonjour "+nm+",\n\nSauf erreur de notre part, le document "+d.number+" d'un montant de "+money(d.total,2)+" "+d.currency
    +" (échéance du "+(d.due||"—")+") reste impayé à ce jour.\n\nNous vous remercions de bien vouloir régulariser sous 5 jours. Passé ce délai, les pénalités de retard prévues seront applicables.\n\nSi votre règlement est déjà parti, merci de ne pas tenir compte de ce message.\n\nCordialement,\n"+(S.profile.legalName||"")
   :"Hello "+nm+",\n\nOur records show document "+d.number+" for "+money(d.total,2)+" "+d.currency+" (due "+(d.due||"n/a")+") is still outstanding.\n\nWe would be grateful if you could arrange payment within 5 business days.\n\nIf payment has already been sent, please disregard this note.\n\nKind regards,\n"+(S.profile.legalName||""));}
function openModal(title,body){$("#modalTitle").textContent=title;$("#modalBody").innerHTML=body;$("#modal").classList.remove("hidden");
  var c=$("#moc");if(c)c.addEventListener("click",function(){var e=$("#mo");e.focus();e.select();
    try{navigator.clipboard.writeText(e.value);}catch(x){document.execCommand("copy");}toast(t("copied"));});}

/* --------------------------------------------------------------- pro */
function licenceValid(k){
  if(!k)return false;
  var p=String(k).toUpperCase().replace(/\s/g,"").split("-");
  if(p.length!==4||p[0]!=="FACT")return false;
  var b=p[1],t2=p[2],chk=p[3];
  if(!/^[A-Z0-9]{5}$/.test(b)||!/^[A-Z0-9]{5}$/.test(t2)||!/^[A-Z0-9]{3}$/.test(chk))return false;
  var exp=hash(deviceCode()+"|"+b+t2+"|fx26").slice(0,3);
  if(exp===chk)return true;
  /* La « clé master » n'existe que dans LICENSE-GENERATOR.html, sur mon poste.
     Elle est volontairement absente de tout fichier distribué : sinon n'importe qui
     peut lire le sel dans le bundle public et déverrouiller l'app sur tous les postes. */
  return false;
}
function paintPro(){
  $("#planTag").textContent=isPro()?"Pro":"Gratuit";
  $("#planTag").className="tag"+(isPro()?" pro":"");
  $$("[data-pro-only]").forEach(function(e){e.style.display=isPro()?"none":"";});
  $("#btnUpgrade").style.display=isPro()?"none":"";
  var b=$("#btnActivate");if(b)b.value=t("activateBtn");
}

/* ---------------------------------------------------------- fill form */
function fillForm(){
  var d=S.doc;
  if(!d.number)d.number=nextNumber();
  $("#docNumber").value=d.number;$("#docDate").value=d.date;$("#docDue").value=d.due;
  $("#countrySel").value=d.country;$("#currencySel").value=d.currency;
  $("#vatApplied").checked=!!d.vatApplied;$("#vatRate").value=d.vatRate;
  $("#exportZero").checked=!!d.exportZero;$("#withholding").checked=!!d.withholding;
  $("#whRate").value=d.whRate;$("#discountRate").value=d.discount;$("#stampDuty").value=d.stamp;
  $("#templateSel").value=d.template;$("#accent").value=d.accent;$("#showLogo").checked=!!d.showLogo;
  $("#sellerBlock").value=d.seller||"";$("#buyerBlock").value=d.buyer||"";
  $("#notes").value=d.notes||"";$("#payLink").value=d.payLink||"";
  $$("#docTypeSeg button").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-type")===d.type);});
  renderLines();recalcTotals();
}
function loadProfileInputs(){$$("[data-pf]").forEach(function(e){e.value=S.profile[e.getAttribute("data-pf")]||"";});}
function readProfileInputs(){$$("[data-pf]").forEach(function(e){S.profile[e.getAttribute("data-pf")]=e.value;});save();}
function bind(sel,ev,fn){var e=$(sel);if(e)e.addEventListener(ev,fn);}
function applyLang(){
  document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==="ar"?"rtl":"ltr";
  $$("[data-t]").forEach(function(e){var v=t(e.getAttribute("data-t"));if(v)e.textContent=v;});
  $("#uiLang").value=S.lang;
}
function activate(v){$$(".tab").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-view")===v);});
  $$(".view").forEach(function(s){s.classList.toggle("active",s.id==="view-"+v);});
  if(v==="archive")renderArchive();if(v==="profile")loadProfileInputs();if(v==="doc")renderPreview();}

/* -------------------------------------------------------------- boot */
function init(){
  load();
  if(!S.doc.seller)S.doc.seller=localStorage.getItem("fx_seller")||"";
  if(S.licence&&licenceValid(S.licence))S.plan="pro";else if(S.plan==="pro")S.plan="free";
  fillCurrencies();applyLang();paintPro();loadProfileInputs();fillForm();

  bind("#uiLang","change",function(){S.lang=this.value;applyLang();save();recalcTotals();renderLines();});
  $$(".tab").forEach(function(b){b.addEventListener("click",function(){activate(b.getAttribute("data-view"));});});
  $$("#docTypeSeg button").forEach(function(b){b.addEventListener("click",function(){
    S.doc.type=b.getAttribute("data-type");S.doc.id="";S.doc.number="";
    $$("#docTypeSeg button").forEach(function(x){x.classList.toggle("active",x===b);});
    save();fillForm();});});
  bind("#docNumber","input",function(){S.doc.number=this.value;save();recalcTotals();});
  bind("#docDate","change",function(){S.doc.date=this.value;save();recalcTotals();});
  bind("#docDue","change",function(){S.doc.due=this.value;save();recalcTotals();});
  bind("#countrySel","change",function(){var c=COUNTRY[this.value]||COUNTRY.XX;S.doc.country=this.value;
    S.doc.currency=c.cur;S.doc.vatRate=c.dVat;S.doc.vatApplied=c.dVat>0;S.doc.stamp=c.stamp;
    S.doc.lines.forEach(function(l){l.v=c.dVat;});
    $("#currencySel").value=c.cur;$("#vatRate").value=c.dVat;$("#vatApplied").checked=S.doc.vatApplied;$("#stampDuty").value=c.stamp;
    renderLines();save();recalcTotals();});
  bind("#vatApplied","change",function(){S.doc.vatApplied=this.checked;save();renderLines();recalcTotals();});
  bind("#vatRate","input",function(){S.doc.vatRate=parseFloat(this.value)||0;S.doc.lines.forEach(function(l){l.v=S.doc.vatRate;});save();renderLines();recalcTotals();});
  bind("#currencySel","change",function(){S.doc.currency=this.value;save();renderLines();recalcTotals();});
  bind("#exportZero","change",function(){S.doc.exportZero=this.checked;save();renderLines();recalcTotals();});
  bind("#withholding","change",function(){S.doc.withholding=this.checked;save();recalcTotals();});
  bind("#whRate","input",function(){S.doc.whRate=parseFloat(this.value)||0;save();recalcTotals();});
  bind("#discountRate","input",function(){S.doc.discount=parseFloat(this.value)||0;save();recalcTotals();});
  bind("#stampDuty","input",function(){S.doc.stamp=parseFloat(this.value)||0;save();recalcTotals();});
  bind("#paid","input",function(){S.doc.paid=parseFloat(this.value)||0;save();recalcTotals();});
  bind("#templateSel","change",function(){if(!isPro()&&this.value!=="classic"){toast(t("proLockMsg"));activate("pro");this.value="classic";return;}
    S.doc.template=this.value;save();recalcTotals();});
  bind("#accent","input",function(){S.doc.accent=this.value;save();recalcTotals();});
  bind("#showLogo","change",function(){S.doc.showLogo=this.checked;save();recalcTotals();});
  bind("#logoInput","change",function(){var f=this.files[0];if(!f)return;var r=new FileReader();
    r.onload=function(){var i=new Image();i.onload=function(){var sc=Math.min(1,560/i.width),cv=document.createElement("canvas");
      cv.width=Math.round(i.width*sc);cv.height=Math.round(i.height*sc);cv.getContext("2d").drawImage(i,0,0,cv.width,cv.height);
      S.doc.logo=cv.toDataURL("image/png");save();recalcTotals();};i.onerror=function(){toast("image illisible");};i.src=r.result;};
    r.readAsDataURL(f);});
  bind("#sellerBlock","input",function(){S.doc.seller=this.value;localStorage.setItem("fx_seller",this.value);save();recalcTotals();});
  bind("#buyerBlock","input",function(){S.doc.buyer=this.value;save();recalcTotals();});
  bind("#notes","input",function(){S.doc.notes=this.value;save();recalcTotals();});
  bind("#payLink","input",function(){S.doc.payLink=this.value;save();recalcTotals();});
  bind("#btnAddLine","click",function(){S.doc.lines.push(blankLine());save();renderLines();recalcTotals();});
  bind("#btnBulk","click",function(){var b=$("#bulkBox");if(b.classList.contains("hidden")){b.classList.remove("hidden");b.value="";b.focus();
    $("#btnBulk").textContent="OK";}else{b.classList.add("hidden");$("#btnBulk").textContent=t("bulk");
      var txt=(b.value||"").trim();if(txt){txt.split(/\r?\n/).forEach(function(r){
        var p=r.split(/\t|;/);if(p.length<2)p=r.split(/,/);
        S.doc.lines.push({d:(p[0]||"").trim(),q:parseFloat(p[1])||1,u:(p[3]||"").trim()||"HUR",p:parseFloat(p[2])||0,v:+S.doc.vatRate||0});});
        save();renderLines();recalcTotals();toast("✓");}}});
  bind("#btnPdf","click",downloadPdf);
  bind("#btnPrint","click",function(){renderPreview();printIt();});
  bind("#btnSave","click",saveDoc);
  bind("#btnSend","click",function(){
    var m=String(S.doc.buyer||"").match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    var body="Bonjour,\n\nVeuillez trouver ci-jet le document "+(S.doc.number||"")+" d'un montant de "+fmt(compute().payable)+".\n\n"+t("thankYou")+"\n"+(S.profile.legalName||"");
    location.href="mailto:"+(m?m[0]:"")+"?subject="+encodeURIComponent(t({facture:"invoice",devis:"quote",avoir:"credit"}[S.doc.type])+" "+(S.doc.number||""))+"&body="+encodeURIComponent(body);});
  bind("#btnFullscreen","click",function(){var f=$("#previewFrame");if(f.requestFullscreen)f.requestFullscreen();});
  bind("#modalClose","click",function(){$("#modal").classList.add("hidden");});
  bind("#modal","click",function(e){if(e.target===this)this.classList.add("hidden");});
  bind("#btnProfileSave","click",function(){readProfileInputs();
    S.doc.seller=[S.profile.legalName,S.profile.address,S.profile.city,S.profile.country,
      (S.profile.matricule?idLabels(S.doc).short+" "+S.profile.matricule:"")].filter(Boolean).join("\n");
    save();fillForm();toast(t("saved"));});
  $$("[data-pf]").forEach(function(e){e.addEventListener("input",function(){
    S.profile[e.getAttribute("data-pf")]=e.value;save();});});
  bind("#btnExportJson","click",function(){download("facturly-backup-"+isoToday()+".json",JSON.stringify(S,null,2),"application/json");});
  bind("#importJson","change",function(){var f=this.files[0];if(!f)return;var r=new FileReader();
    r.onload=function(){try{var o=JSON.parse(r.result);if(!o||typeof o!=="object")throw 0;S=o;if(!S.doc.lines)S.doc.lines=[blankLine()];
      save();applyLang();paintPro();fillForm();loadProfileInputs();toast("✓");}catch(e){toast("JSON invalide");}};r.readAsText(f);});
  bind("#btnWipe","click",function(){if(window.confirm("Tout effacer ?")){localStorage.removeItem(KEY);location.reload();}});
  bind("#btnActivate","click",function(){var k=$("#licenseKey").value.trim();var msg=$("#licenseMsg");
    if(licenceValid(k)){S.licence=k;S.plan="pro";save();paintPro();msg.textContent=t("licenceOk");msg.style.color="#059669";
      renderPreview();$$("[data-pro-only]").forEach(function(e){e.style.display="none";});}
    else{msg.textContent=t("licenceBad");msg.style.color="#dc2626";}});
  bind("#btnUpgrade","click",function(){activate("pro");});
  var dc=$("#devCode");
  if(dc){dc.textContent=deviceCode();dc.addEventListener("click",function(){
    try{navigator.clipboard.writeText(deviceCode());}catch(e){}
    var t=document.createElement("textarea");t.value=deviceCode();document.body.appendChild(t);t.select();
    try{document.execCommand("copy");}catch(e){}t.remove();toast("Code appareil copié ✓");});}
  bind("#archSearch","input",renderArchive);
  bind("#btnArchExport","click",function(){
    var h="number;date;due;type;client;country;currency;total_due;balance_due;status\n";
    S.documents.forEach(function(d){
      var who=String(d.buyer||"").split(/\r?\n/)[0].replace(/"/g,"'");
      h+=[d.number,d.date,d.due,d.type,'"'+who+'"',d.country,d.currency,
          (+d.total||0).toFixed(3),(+d.dueAmount||0).toFixed(3),d.status].join(";")+"\n";});
    download("facturly-archive.csv","\ufeff"+h,"text/csv;charset=utf-8");});
  bind("#btnArchIcsv","click",function(){if(!isPro()){toast(t("proLockMsg"));activate("pro");return;}
    var rate=(+S.doc.vatRate||0),h="Rec;Date;Piece;Libelle;Client;Pays;Base;TVA;Total;Devise\n";
    S.documents.forEach(function(d,i){
      var tot=+d.total||0, base=tot/(1+rate/100);
      h+=[1000+i,d.date,d.number,'"'+String(d.buyer||"").split(/\r?\n/)[0].replace(/"/g,"'")+'"',
          d.country,base.toFixed(3),(tot-base).toFixed(3),tot.toFixed(3),d.currency].join(";")+"\n";});
    download("facturly-icsv.csv","\ufeff"+h,"text/csv;charset=utf-8");});
  bind("#btnPickClient","click",function(){activate("archive");});
  document.addEventListener("keydown",function(e){
    if((e.metaKey||e.ctrlKey)&&(e.key==="s"||e.key==="S")){e.preventDefault();saveDoc();}
    if((e.metaKey||e.ctrlKey)&&(e.key==="p"||e.key==="P")){e.preventDefault();renderPreview();printIt();}});
  if("serviceWorker" in navigator&&location.protocol!=="file:"){try{navigator.serviceWorker.register("sw.js");}catch(e){}}
  window.addEventListener("beforeunload",save);
  save();
}
window.__test={compute:compute,num:num,legalLines:legalLines,idLines:idLines,__onDoc:null,pdfViaJsPDF:pdfViaJsPDF,ensureJsPDF:ensureJsPDF,licenceValid:licenceValid,
  deviceCode:deviceCode,parseCheck:function(){return true;},
  /* getters/mutateurs explicites : sans eux un test qui oublie de restaurer l'état contamine
     en silence tous ceux qui le suivent (et window.eval ne voit pas la portée du module) */
  snapshotCountry:function(){return S.doc.country;},snapshotCurrency:function(){return S.doc.currency;},
  snapshotVat:function(){return S.doc.vatRate;},snapshotLineVat:function(){return S.doc.lines[0]&&S.doc.lines[0].v;},
  setProfile:function(patch){for(var k in patch)S.profile[k]=patch[k];save();renderPreview();return S.profile;},
  getProfile:function(){return S.profile;},
  restoreTN:function(){var c=COUNTRY.TN;S.doc.country="TN";S.doc.currency=c.cur;S.doc.vatRate=c.dVat;
    S.doc.stamp=c.stamp;S.doc.lines.forEach(function(l){l.v=c.dVat;});
    var cs=document.getElementById("countrySel");if(cs)cs.value="TN";
    var cu=document.getElementById("currencySel");if(cu)cu.value=c.cur;
    var vr=document.getElementById("vatRate");if(vr)vr.value=c.dVat;
    renderLines();recalcTotals();renderPreview();return S.doc.country;}};

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
