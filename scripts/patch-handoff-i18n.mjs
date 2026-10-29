/**
 * Translate multi-company / handoff marketing strings.
 * Run: node scripts/patch-handoff-i18n.mjs && python3 scripts/build-locale-sites.py
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function set(obj, dotted, value) {
  const parts = dotted.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

const patches = {
  de: {
    "common.roles_owner_li3":
      "Organisationsdaten, Einladungen, Abrechnung und wer welchen Zugang zu welchen Objekten hat",
    "common.roles_manager_li3":
      "Kann mit einem Login in mehreren Firmen arbeiten; keine Organisationsabrechnung, keine Objektzugangs-Zuweisung",
    "common.roles_staff_li3":
      "Eine persönliche Objektliste für Nebenkunden, für die Firma unsichtbar bis zur Übergabe",
    "home.audience_manager_desc":
      "Eine oder mehrere Firmen führen. Den Tag einmal aufbauen; die Schicht mit ihrer Historie übergeben.",
    "home.plan_personal_desc":
      "Solo-Objekte auf Ihrer eigenen Liste. Für immer kostenlos. Später an einen Firmenbesitzer übergeben, wenn Sie einen mitbringen.",
    "home.plan_company_desc":
      "Sie haben einen Manager, eine Reinigungskraft oder Dienstleister. USD 15 / Monat für die Firma, 10 Sitze inklusive, danach USD 2 pro Extra-Sitz. Nur der Besitzer zahlt.",
    "home.faq_a4":
      "Personal ist für immer kostenlos. Company kostet USD 15 / Monat und enthält 10 Team-Sitze; jeder Extra-Sitz kostet USD 2 / Monat. Pro addiert USD 9 / Monat auf Personal oder Company für Connect your agent. Die Abrechnung ist noch nicht live, daher erhält jedes Konto ab Anmeldung 3 Monate vollen Zugang inklusive Pro.",
    "home.faq_a9":
      "Ja. Personal ist für immer kostenlos für Objekte auf Ihrer eigenen Liste. Jobs, Ausgaben und Gäste funktionieren ohne Team. Wenn ein echter Besitzer dazukommt, laden Sie ihn ein, die Objekte in seine Firma zu übernehmen; Sie können Manager bleiben.",
    "home.faq_a10":
      "Jede Firmen- und persönliche Arbeitsumgebung ist getrennt. Objekte, Team, Gäste und Finanzen sehen nur Personen in dieser Umgebung. Gäste sehen nur, was Sie teilen. Ein Manager in mehreren Firmen wechselt die Umgebung in den Einstellungen; Inventare vermischen sich nicht.",
    "home.faq_q11": "Kann ein Manager für mehr als eine Firma arbeiten?",
    "home.faq_a11":
      "Ja. Jeder Firmenbesitzer lädt ihn als Manager ein. Ein Login behält einen Sitz in jeder Firma plus eine persönliche Objektliste. Die aktive Firma wird in den Einstellungen gewechselt.",
    "owners.access_g2_desc":
      "Organisation verwalten, Manager, Feldpersonal und Gäste einladen, Objekte zuweisen und Zugänge steuern. Eine Objektübergabe annehmen, wenn ein Manager Villen zuerst unter Personal angelegt hat: sie wechseln in Ihre Firma, Sie werden Besitzer, er bleibt Manager. Personal nach Skills, Ort, Karte und Bewertungen suchen. Chat, Erwähnungen, wöchentliche Endorsements und Firmen-Rangliste.",
    "managers.meta_description":
      "Tagesgeschäft für Ferienhaus-Manager in einer oder mehreren Firmen: was heute dringend ist, wer es macht und wie es endete. Bestätigte Jobs; persönliche Villen bei Bedarf an einen Besitzer übergeben.",
    "managers.og_description":
      "Betriebssoftware für Manager: mehrere Firmen mit einem Login, den Tag einmal aufbauen, persönliche Objekte bei Bedarf an einen Besitzer übergeben.",
    "managers.sub":
      "Was dringend ist, wer vor Ort ist, welche Check-ins kommen und welche Rechnungen offen sind. Mit einem Login über mehrere Firmen arbeiten. Ihr Besitzer sieht dasselbe und fragt nicht mehr nach.",
    "managers.free_note":
      "Ihr Sitz ist kostenlos. Jeder Firmenbesitzer zahlt für seinen Workspace.",
    "managers.features_access_lead":
      "Dieselbe Tagesarbeit wie der Besitzer. Umbenennen der Organisation, Bearbeiten der Firmenobjektliste und Objektzugang fürs Personal bleiben beim Besitzer. Ein Login kann Sitze in mehreren Firmen halten; Wechsel in den Einstellungen.",
    "managers.access_g1_desc":
      "Jedes Firmenobjekt mit Status, Daten und Details sehen. House Guides und Notizen aktuell halten. Airbnb- oder Booking.com-Kalenderexporte in Bookings synchronisieren. Persönliche Objekte bleiben auf Ihrer Liste, bis Sie einen Besitzer einladen, sie in eine Firma zu übernehmen.",
    "managers.access_g2_desc":
      "Personal, Gäste und Kollegen einladen. Neue Leute über Staff Search nach Skills, Gebiet, Karte und Bewertungen finden. Chat, Erwähnungen, wöchentliche Endorsements und Firmen-Rangliste. Persönliche Objekte mit einem Einladungslink an einen echten Besitzer übergeben: er wird Besitzer, Sie bleiben Manager.",
    "staff.access_g2_desc":
      "Ihre persönlichen Objekte für Nebenkunden bleiben für die Firma unsichtbar, bis Sie einen Besitzer einladen, sie in eine Firma zu übernehmen. Ihr Profil hält Skills, Gebiet, Kartenpin, wöchentliche Endorsements und Ranglistenplatz. Laden Sie Bekannte mit Ihrem eigenen Link ein.",
    "terms.what_body":
      "Pulse Flow ist ein gemeinsames Ops-Tool: Objekte, Aufgaben, Jobs, Ausgabenrechnungen, Kontakte, Teamchat, Gastaufenthalte, House Guides, Übergabenotizen, Objektübergabe zwischen persönlicher und Firmenumgebung, Wartungslogs, Berichte und ein optionaler KI-Agent. Es ist keine Partei an Miet- oder Arbeitsverhältnissen.",
    "terms.roles_intro":
      "Reinigung und andere Jobarten sind Arbeitslabels, keine eigenen Kontorollen. Feldkollegen nutzen den Staff-Sitz. Ein Login kann Sitze in mehr als einer Firma plus eine persönliche Objektliste halten.",
    "terms.roles_li1":
      "Besitzer: Firmeneinstellungen, Objekte, Einladungen, Softwareabrechnung wenn live, und Annahme von Objektübergaben in seine Firma.",
    "terms.roles_li2":
      "Manager: Tagesgeschäft mit dem Besitzer in einer oder mehreren Firmen. Einige Firmeneinstellungen bleiben beim Besitzer. Persönliche Objekte können per Einladung an einen Besitzer übergeben werden.",
    "terms.roles_li3":
      "Staff: zugewiesene Objekte, Aufgaben, Jobs, Teamchat und Ausgabenrechnungen. Optionale persönliche Objektliste für Nebenkunden.",
    "terms.roles_li5":
      "KI-Agent: optionaler Helfer nur für Besitzer und Manager, begrenzt auf den aktiven Workspace.",
    "terms.owner_li4":
      "Personal prüfen, Arbeit beaufsichtigen und Gästedaten rechtmäßig verarbeiten. Manager teilen Ops-Zugang; Firmeneinstellungen und einige Inventarkontrollen bleiben beim Besitzer. Die Annahme einer Objektübergabe verschiebt diese Objekte und zugehörige Ops-Datensätze in Ihren Firmen-Workspace.",
    "privacy.updated": "Pulse Flow · Zuletzt aktualisiert: 29. Oktober 2026",
    "privacy.collect_li1":
      "Kontodaten: Name, E-Mail, Rolle, Organisationsmitgliedschaften und optionale Profildetails.",
    "privacy.collect_li2":
      "Betriebsdaten: Objekte (inkl. Fotos und Listing-Links), Aufgaben, Jobs, Kontakte, Teamchat, Ausgabenrechnungen und Belege, Berichte, Gastaufenthalte, House Guides, Objektdetails und Zugangsinformationen, Wartungslogs, Objektübergabe-Einladungen sowie optionale Kalenderexport-Links und importierte Belegung.",
    "privacy.who_li1":
      "Besitzer und Manager sehen die Daten in jedem Firmen-Workspace, dem sie angehören, inklusive Personalarbeit und Rechnungen, Gastaufenthalten, Support-Chat und Deposit-Einträgen. Firmenwechsel legt kein Inventar einer anderen Firma offen.",
    "privacy.who_li2":
      "Staff sieht Profil, zugewiesene Objekte, Aufgaben, Jobs, Teamchat und die eingereichten Rechnungen. Hochgeladene Beleg- und Objektfotos liegen in Cloud-Speicher. Persönliche Objekte bleiben im persönlichen Workspace, bis sie an eine Firma übergeben werden.",
    "privacy.who_li5":
      "Einladungen und Übergaben: wenn Sie jemanden einladen oder eine Objektübergabe senden, speichern wir Einladung, E-Mail und Beitritts- bzw. Annahmeeintrag für die beteiligten Firmen.",
    "privacy.use_li2":
      "Die von Ihnen genutzten Funktionen bereitstellen und Firmen- sowie persönliche Workspaces voneinander getrennt halten",
  },
  fr: {
    "common.roles_owner_li3":
      "Détails de l'organisation, invitations, facturation, et qui a accès à quelle propriété",
    "common.roles_manager_li3":
      "Peut travailler dans plusieurs entreprises avec un seul compte; pas de facturation org, pas d'attribution d'accès aux propriétés",
    "common.roles_staff_li3":
      "Une liste personnelle de propriétés pour des clients à côté, invisible à l'entreprise jusqu'à la passation",
    "home.audience_manager_desc":
      "Gérez une ou plusieurs entreprises. Construisez la journée une fois; passez le relais avec son historique.",
    "home.plan_personal_desc":
      "Propriétés en solo sur votre propre liste. Gratuit pour toujours. Remettez-les à un propriétaire d'entreprise plus tard si vous en amenez un.",
    "home.plan_company_desc":
      "Vous avez un manager, un agent d'entretien ou des prestataires. USD 15 / mois pour l'entreprise, 10 sièges inclus, puis USD 2 par siège supplémentaire. Seul le propriétaire paie.",
    "home.faq_a4":
      "Personal est gratuit pour toujours. Company coûte USD 15 / mois et inclut 10 sièges d'équipe; chaque siège supplémentaire coûte USD 2 / mois. Pro ajoute USD 9 / mois sur Personal ou Company pour Connect your agent. La facturation n'est pas encore active, donc chaque compte a 3 mois d'accès complet, Pro inclus, dès l'inscription.",
    "home.faq_a9":
      "Oui. Personal est gratuit pour toujours pour les propriétés de votre liste. Travaux, dépenses et hôtes fonctionnent sans équipe. Quand un vrai propriétaire arrive, invitez-le à reprendre ces propriétés dans son entreprise; vous pouvez rester manager.",
    "home.faq_a10":
      "Chaque espace entreprise et personnel est séparé. Propriétés, équipe, hôtes et finances ne sont visibles que pour les personnes de cet espace. Les hôtes ne voient que ce que vous partagez. Un manager sur plusieurs entreprises change d'espace dans Réglages; les inventaires ne se mélangent pas.",
    "home.faq_q11": "Un manager peut-il travailler pour plus d'une entreprise?",
    "home.faq_a11":
      "Oui. Chaque propriétaire d'entreprise l'invite comme manager. Un compte garde un siège dans chaque entreprise plus une liste personnelle de propriétés. Ils changent d'entreprise active dans Réglages.",
    "owners.access_g2_desc":
      "Gérez l'organisation, invitez managers, personnel de terrain et hôtes, assignez les propriétés et contrôlez les accès. Acceptez une passation de propriétés quand un manager a d'abord enregistré des villas en Personal: elles passent dans votre entreprise, vous devenez propriétaire, il reste manager. Cherchez le personnel par compétences, lieu, carte et avis. Chat, mentions, recommandations hebdomadaires et classement d'entreprise.",
    "managers.meta_description":
      "Opérations quotidiennes pour managers de locations saisonnières sur une ou plusieurs entreprises: ce qui est urgent aujourd'hui, qui s'en occupe, et comment ça s'est terminé. Travaux confirmés; remettez des villas personnelles à un propriétaire quand c'est prêt.",
    "managers.og_description":
      "Opérations pour managers: plusieurs entreprises sur un compte, construisez la journée une fois, remettez des propriétés personnelles à un propriétaire quand c'est prêt.",
    "managers.sub":
      "Ce qui est urgent, qui est sur place, quels check-ins arrivent et quelles factures sont ouvertes. Travaillez sur plusieurs entreprises avec un seul compte. Votre propriétaire voit la même chose et arrête de poser des questions.",
    "managers.free_note":
      "Votre siège est gratuit. Chaque propriétaire d'entreprise paie pour son espace.",
    "managers.features_access_lead":
      "Mêmes opérations quotidiennes que le propriétaire. Renommer l'organisation, modifier la liste des propriétés d'entreprise et l'accès du personnel restent au propriétaire. Un compte peut avoir des sièges dans plusieurs entreprises; changez dans Réglages.",
    "managers.access_g1_desc":
      "Voir chaque propriété d'entreprise avec statut, dates et détails. Garder guides maison et notes à jour. Synchroniser les exports calendrier Airbnb ou Booking.com dans Bookings. Les propriétés personnelles restent sur votre liste jusqu'à ce que vous invitiez un propriétaire à les reprendre dans une entreprise.",
    "managers.access_g2_desc":
      "Invitez personnel, hôtes et collègues. Trouvez des personnes via la recherche de talents par compétences, zone, carte et avis. Chat, mentions, recommandations hebdomadaires et classement. Remettez des propriétés personnelles à un vrai propriétaire avec un lien d'invitation: il devient propriétaire, vous restez manager.",
    "staff.access_g2_desc":
      "Vos propriétés personnelles pour des clients à côté restent invisibles à l'entreprise jusqu'à ce que vous invitiez un propriétaire à les reprendre. Votre profil garde compétences, zone, épingle carte, recommandations hebdomadaires et place au classement. Invitez des personnes que vous connaissez avec votre propre lien.",
    "terms.what_body":
      "Pulse Flow est un outil d'ops partagé: propriétés, tâches, travaux, notes de frais, contacts, chat d'équipe, séjours hôtes, guides maison, notes de passation, passation de propriétés entre espaces personnel et entreprise, journaux d'entretien, rapports et un agent IA optionnel. Ce n'est pas une partie à une relation locative ou d'emploi.",
    "terms.roles_intro":
      "Le nettoyage et d'autres types de travaux sont des libellés, pas des rôles de compte séparés. Les collègues de terrain utilisent le siège staff. Un compte peut avoir des sièges dans plus d'une entreprise plus une liste personnelle de propriétés.",
    "terms.roles_li1":
      "Propriétaire: paramètres d'entreprise, propriétés, invitations, facturation logicielle quand elle est active, et acceptation des passations de propriétés dans son entreprise.",
    "terms.roles_li2":
      "Manager: ops quotidiennes avec le propriétaire sur une ou plusieurs entreprises. Certains paramètres restent au propriétaire. Les propriétés personnelles peuvent être remises à un propriétaire via invitation.",
    "terms.roles_li3":
      "Staff: propriétés assignées, tâches, travaux, chat d'équipe et notes de frais. Liste personnelle optionnelle pour clients à côté.",
    "terms.roles_li5":
      "Agent IA: aide optionnelle pour propriétaires et managers uniquement, limitée à leur espace actif.",
    "terms.owner_li4":
      "Vérifiez le personnel, supervisez le travail et traitez les données hôtes légalement. Les managers partagent l'accès ops; paramètres d'entreprise et certains contrôles d'inventaire restent au propriétaire. Accepter une passation déplace ces propriétés et les enregistrements ops liés dans votre espace entreprise.",
    "privacy.updated": "Pulse Flow · Dernière mise à jour: 29 octobre 2026",
    "privacy.collect_li1":
      "Données de compte: nom, e-mail, rôle, adhésions d'organisation et détails de profil optionnels.",
    "privacy.collect_li2":
      "Données d'exploitation: propriétés (photos et liens d'annonce inclus), tâches, travaux, contacts, chat d'équipe, notes de frais et reçus, rapports, séjours hôtes, guides maison, détails de propriété et informations d'accès, journaux d'entretien, invitations de passation de propriétés, et liens d'export calendrier optionnels avec occupation importée.",
    "privacy.who_li1":
      "Propriétaires et managers voient les données de chaque espace entreprise auquel ils appartiennent, y compris travail et factures du personnel, séjours hôtes, chat Support et dépôts. Changer d'entreprise n'expose pas l'inventaire d'une autre.",
    "privacy.who_li2":
      "Le staff voit son profil, propriétés assignées, tâches, travaux, chat d'équipe et les factures qu'il soumet. Photos de reçus et de propriétés téléversées sont stockées dans le cloud. Les propriétés personnelles restent dans l'espace personnel jusqu'à passation à une entreprise.",
    "privacy.who_li5":
      "Invitations et passations: quand vous invitez quelqu'un ou envoyez une passation de propriétés, nous stockons l'invitation, l'e-mail et l'enregistrement d'adhésion ou d'acceptation pour les entreprises concernées.",
    "privacy.use_li2":
      "Fournir les fonctions que vous utilisez et garder les espaces entreprise et personnels séparés les uns des autres",
  },
  es: {
    "common.roles_owner_li3":
      "Datos de la organización, invitaciones, facturación y quién accede a cada propiedad",
    "common.roles_manager_li3":
      "Puede trabajar en varias empresas con un solo acceso; sin facturación de la org, sin asignación de acceso a propiedades",
    "common.roles_staff_li3":
      "Una lista personal de propiedades para clientes propios, invisible a la empresa hasta la entrega",
    "home.audience_manager_desc":
      "Gestiona una o más empresas. Monta el día una vez; entrega el turno con su historial.",
    "home.plan_personal_desc":
      "Propiedades en solitario en tu propia lista. Gratis para siempre. Entrégalas a un dueño de empresa más tarde si traes uno.",
    "home.plan_company_desc":
      "Tienes un manager, una limpieza o proveedores. USD 15 / mes por la empresa, 10 asientos incluidos, luego USD 2 por asiento extra. Solo paga el dueño.",
    "home.faq_a4":
      "Personal es gratis para siempre. Company cuesta USD 15 / mes e incluye 10 asientos de equipo; cada asiento extra cuesta USD 2 / mes. Pro suma USD 9 / mes en Personal o Company para Connect your agent. La facturación aún no está activa, así que cada cuenta tiene 3 meses de acceso completo, incluido Pro, desde el alta.",
    "home.faq_a9":
      "Sí. Personal es gratis para siempre para propiedades en tu propia lista. Trabajos, gastos e invitados funcionan sin equipo. Cuando entra un dueño real, invítalo a llevar esas propiedades a su empresa; tú puedes seguir como manager.",
    "home.faq_a10":
      "Cada espacio de empresa y personal está separado. Propiedades, equipo, invitados y finanzas solo los ven las personas de ese espacio. Los invitados solo ven lo que compartes. Un manager en varias empresas cambia de espacio en Ajustes; los inventarios no se mezclan.",
    "home.faq_q11": "¿Puede un manager trabajar para más de una empresa?",
    "home.faq_a11":
      "Sí. Cada dueño de empresa lo invita como manager. Un acceso mantiene un asiento en cada empresa más una lista personal de propiedades. Cambian la empresa activa en Ajustes.",
    "owners.access_g2_desc":
      "Gestiona la organización, invita managers, personal de campo e invitados, asigna propiedades y controla el acceso. Acepta una entrega de propiedades cuando un manager registró villas primero en Personal: pasan a tu empresa, tú eres dueño, él sigue como manager. Busca personal por habilidades, ubicación, mapa y reseñas. Chat, menciones, avales semanales y ranking de empresa.",
    "managers.meta_description":
      "Operaciones diarias para managers de alquiler vacacional en una o más empresas: qué urge hoy, quién lo hace y cómo terminó. Trabajos confirmados; entrega villas personales a un dueño cuando esté listo.",
    "managers.og_description":
      "Operaciones para managers: varias empresas con un acceso, monta el día una vez, entrega propiedades personales a un dueño cuando esté listo.",
    "managers.sub":
      "Qué urge, quién está en sitio, qué check-ins llegan y qué facturas están abiertas. Trabaja en varias empresas con un solo acceso. Tu dueño ve lo mismo y deja de preguntar.",
    "managers.free_note":
      "Tu asiento es gratis. Cada dueño de empresa paga su espacio.",
    "managers.features_access_lead":
      "Las mismas operaciones diarias que el dueño. Renombrar la org, editar la lista de propiedades de la empresa y el acceso del personal se quedan con el dueño. Un acceso puede tener asientos en varias empresas; cambia en Ajustes.",
    "managers.access_g1_desc":
      "Ve cada propiedad de la empresa con estado, fechas y detalles. Mantén guías de casa y notas al día. Sincroniza exportaciones de calendario de Airbnb o Booking.com en Bookings. Las propiedades personales siguen en tu lista hasta que invites a un dueño a llevarlas a una empresa.",
    "managers.access_g2_desc":
      "Invita personal, invitados y colegas. Encuentra gente con búsqueda de talento por habilidades, zona, mapa y reseñas. Chat, menciones, avales semanales y ranking. Entrega propiedades personales a un dueño real con un enlace de invitación: él es dueño, tú sigues como manager.",
    "staff.access_g2_desc":
      "Tus propiedades personales para clientes propios siguen invisibles a la empresa hasta que invites a un dueño a llevarlas a una empresa. Tu perfil guarda habilidades, zona, pin de mapa, avales semanales y puesto en el ranking. Invita a gente que conoces con tu propio enlace.",
    "terms.what_body":
      "Pulse Flow es una herramienta de ops compartida: propiedades, tareas, trabajos, gastos, contactos, chat de equipo, estancias de invitados, guías de casa, notas de entrega, entrega de propiedades entre espacios personal y de empresa, registros de mantenimiento, informes y un agente de IA opcional. No es parte de ninguna relación de alquiler o empleo.",
    "terms.roles_intro":
      "La limpieza y otros tipos de trabajo son etiquetas, no roles de cuenta separados. El personal de campo usa el asiento staff. Un acceso puede tener asientos en más de una empresa más una lista personal de propiedades.",
    "terms.roles_li1":
      "Dueño: ajustes de empresa, propiedades, invitaciones, facturación de software cuando esté activa, y aceptación de entregas de propiedades en su empresa.",
    "terms.roles_li2":
      "Manager: ops diarias con el dueño en una o más empresas. Algunos ajustes se quedan con el dueño. Las propiedades personales se pueden entregar a un dueño por invitación.",
    "terms.roles_li3":
      "Staff: propiedades asignadas, tareas, trabajos, chat de equipo y gastos. Lista personal opcional para clientes propios.",
    "terms.roles_li5":
      "Agente de IA: ayuda opcional solo para dueños y managers, limitada a su espacio activo.",
    "terms.owner_li4":
      "Verifica al personal, supervisa el trabajo y trata los datos de invitados conforme a la ley. Los managers comparten acceso ops; ajustes de empresa y algunos controles de inventario se quedan con el dueño. Aceptar una entrega mueve esas propiedades y registros ops relacionados a tu espacio de empresa.",
    "privacy.updated": "Pulse Flow · Última actualización: 29 de octubre de 2026",
    "privacy.collect_li1":
      "Datos de cuenta: nombre, correo, rol, membresías de organización y detalles de perfil opcionales.",
    "privacy.collect_li2":
      "Datos de operaciones: propiedades (incluidas fotos y enlaces de anuncio), tareas, trabajos, contactos, chat de equipo, gastos y recibos, informes, estancias de invitados, guías de casa, detalles de propiedad e información de acceso, registros de mantenimiento, invitaciones de entrega de propiedades, y enlaces opcionales de exportación de calendario con ocupación importada.",
    "privacy.who_li1":
      "Dueños y managers ven los datos de cada espacio de empresa al que pertenecen, incluido trabajo y facturas del personal, estancias, chat de Support y depósitos. Cambiar de empresa no expone el inventario de otra.",
    "privacy.who_li2":
      "El staff ve su perfil, propiedades asignadas, tareas, trabajos, chat de equipo y las facturas que envía. Las fotos de recibos y propiedades se almacenan en la nube. Las propiedades personales permanecen en su espacio personal hasta entregarse a una empresa.",
    "privacy.who_li5":
      "Invitaciones y entregas: cuando invitas a alguien o envías una entrega de propiedades, guardamos la invitación, el correo y el registro de unión o aceptación de las empresas implicadas.",
    "privacy.use_li2":
      "Ofrecer las funciones que usas y mantener separados los espacios de empresa y personales",
  },
  it: {
    "common.roles_owner_li3":
      "Dettagli organizzazione, inviti, fatturazione e chi accede a quale proprietà",
    "common.roles_manager_li3":
      "Può lavorare in più aziende con un solo accesso; niente fatturazione org, niente assegnazione accessi proprietà",
    "common.roles_staff_li3":
      "Una lista personale di proprietà per clienti propri, invisibile all'azienda fino al passaggio",
    "home.audience_manager_desc":
      "Gestisci una o più aziende. Costruisci il giorno una volta; passa il turno con la sua cronologia.",
    "home.plan_personal_desc":
      "Proprietà in solitaria sulla tua lista. Gratis per sempre. Passale a un proprietario aziendale più tardi se ne porti uno.",
    "home.plan_company_desc":
      "Hai un manager, un addetto alle pulizie o fornitori. USD 15 / mese per l'azienda, 10 posti inclusi, poi USD 2 per posto extra. Paga solo il proprietario.",
    "home.faq_a4":
      "Personal è gratis per sempre. Company costa USD 15 / mese e include 10 posti team; ogni posto extra costa USD 2 / mese. Pro aggiunge USD 9 / mese su Personal o Company per Connect your agent. La fatturazione non è ancora attiva, quindi ogni account ha 3 mesi di accesso completo, Pro incluso, dal giorno dell'iscrizione.",
    "home.faq_a9":
      "Sì. Personal è gratis per sempre per le proprietà sulla tua lista. Lavori, spese e ospiti funzionano senza team. Quando arriva un vero proprietario, invitalo a portare quelle proprietà nella sua azienda; tu puoi restare manager.",
    "home.faq_a10":
      "Ogni spazio azienda e personale è separato. Proprietà, team, ospiti e finanze sono visibili solo alle persone di quello spazio. Gli ospiti vedono solo ciò che condividi. Un manager su più aziende cambia spazio in Impostazioni; gli inventari non si mischiano.",
    "home.faq_q11": "Un manager può lavorare per più di un'azienda?",
    "home.faq_a11":
      "Sì. Ogni proprietario di azienda lo invita come manager. Un accesso tiene un posto in ogni azienda più una lista personale di proprietà. Cambiano l'azienda attiva in Impostazioni.",
    "owners.access_g2_desc":
      "Gestisci l'organizzazione, invita manager, personale sul campo e ospiti, assegna proprietà e controlla gli accessi. Accetta un passaggio di proprietà quando un manager ha prima registrato ville in Personal: passano nella tua azienda, tu sei proprietario, lui resta manager. Cerca personale per competenze, luogo, mappa e recensioni. Chat, menzioni, endorsement settimanali e classifica aziendale.",
    "managers.meta_description":
      "Operazioni quotidiane per manager di affitti vacanza su una o più aziende: cosa è urgente oggi, chi lo fa e come è andata. Lavori confermati; passa ville personali a un proprietario quando è pronto.",
    "managers.og_description":
      "Operazioni per manager: più aziende con un accesso, costruisci il giorno una volta, passa proprietà personali a un proprietario quando è pronto.",
    "managers.sub":
      "Cosa è urgente, chi è sul posto, quali check-in arrivano e quali fatture sono aperte. Lavora su più aziende con un solo accesso. Il tuo proprietario vede la stessa cosa e smette di fare domande.",
    "managers.free_note":
      "Il tuo posto è gratis. Ogni proprietario di azienda paga per il suo spazio.",
    "managers.features_access_lead":
      "Stesse ops quotidiane del proprietario. Rinomina org, modifica lista proprietà aziendali e accesso del personale restano al proprietario. Un accesso può avere posti in più aziende; cambia in Impostazioni.",
    "managers.access_g1_desc":
      "Vedi ogni proprietà aziendale con stato, date e dettagli. Tieni aggiornati house guide e note. Sincronizza export calendario Airbnb o Booking.com in Bookings. Le proprietà personali restano sulla tua lista finché non inviti un proprietario a portarle in un'azienda.",
    "managers.access_g2_desc":
      "Invita personale, ospiti e colleghi. Trova persone con la ricerca talent per competenze, zona, mappa e recensioni. Chat, menzioni, endorsement settimanali e classifica. Passa proprietà personali a un vero proprietario con un link di invito: lui diventa proprietario, tu resti manager.",
    "staff.access_g2_desc":
      "Le tue proprietà personali per clienti propri restano invisibili all'azienda finché non inviti un proprietario a portarle in un'azienda. Il profilo tiene competenze, zona, pin mappa, endorsement settimanali e posto in classifica. Invita persone che conosci con il tuo link.",
    "terms.what_body":
      "Pulse Flow è uno strumento ops condiviso: proprietà, compiti, lavori, note spese, contatti, chat di team, soggiorni ospiti, house guide, note di passaggio, passaggio proprietà tra spazi personale e aziendale, log di manutenzione, report e un agente IA opzionale. Non è parte di alcun rapporto di locazione o lavoro.",
    "terms.roles_intro":
      "Pulizie e altri tipi di lavoro sono etichette, non ruoli account separati. I colleghi sul campo usano il posto staff. Un accesso può avere posti in più di un'azienda più una lista personale di proprietà.",
    "terms.roles_li1":
      "Proprietario: impostazioni azienda, proprietà, inviti, fatturazione software quando attiva, e accettazione di passaggi proprietà nella sua azienda.",
    "terms.roles_li2":
      "Manager: ops quotidiane con il proprietario su una o più aziende. Alcune impostazioni restano al proprietario. Le proprietà personali possono essere passate a un proprietario via invito.",
    "terms.roles_li3":
      "Staff: proprietà assegnate, compiti, lavori, chat di team e note spese. Lista personale opzionale per clienti propri.",
    "terms.roles_li5":
      "Agente IA: aiuto opzionale solo per proprietari e manager, limitato allo spazio attivo.",
    "terms.owner_li4":
      "Verifica il personale, supervisiona il lavoro e tratta i dati ospiti legalmente. I manager condividono l'accesso ops; impostazioni azienda e alcuni controlli inventario restano al proprietario. Accettare un passaggio sposta quelle proprietà e i record ops correlati nel tuo spazio aziendale.",
    "privacy.updated": "Pulse Flow · Ultimo aggiornamento: 29 ottobre 2026",
    "privacy.collect_li1":
      "Dati account: nome, email, ruolo, membership organizzazione e dettagli profilo opzionali.",
    "privacy.collect_li2":
      "Dati operativi: proprietà (foto e link annuncio inclusi), compiti, lavori, contatti, chat di team, note spese e ricevute, report, soggiorni ospiti, house guide, dettagli proprietà e informazioni di accesso, log di manutenzione, inviti di passaggio proprietà, e link export calendario opzionali con occupazione importata.",
    "privacy.who_li1":
      "Proprietari e manager vedono i dati di ogni spazio aziendale a cui appartengono, incluso lavoro e fatture dello staff, soggiorni, chat Support e depositi. Cambiare azienda non espone l'inventario di un'altra.",
    "privacy.who_li2":
      "Lo staff vede profilo, proprietà assegnate, compiti, lavori, chat di team e le fatture che invia. Foto di ricevute e proprietà caricate sono in cloud. Le proprietà personali restano nello spazio personale fino al passaggio a un'azienda.",
    "privacy.who_li5":
      "Inviti e passaggi: quando inviti qualcuno o invii un passaggio proprietà, memorizziamo invito, email e record di adesione o accettazione per le aziende coinvolte.",
    "privacy.use_li2":
      "Fornire le funzioni che usi e mantenere separati gli spazi aziendali e personali",
  },
};

// Continue in part 2 file load - write remaining locales below
Object.assign(patches, {
  tr: {
    "common.roles_owner_li3":
      "Organizasyon bilgileri, davetler, faturalama ve hangi mülke kimin erişeceği",
    "common.roles_manager_li3":
      "Tek girişle birden fazla şirkette çalışabilir; org faturalaması yok, mülk erişim ataması yok",
    "common.roles_staff_li3":
      "Yan müşteriler için kişisel mülk listesi; şirkete teslim edilene kadar görünmez",
    "home.audience_manager_desc":
      "Bir veya daha fazla şirketi yönetin. Günü bir kez kurun; vardiyayı geçmişiyle teslim edin.",
    "home.plan_personal_desc":
      "Kendi listenizdeki solo mülkler. Sonsuza kadar ücretsiz. Gerçek bir sahip getirdiğinizde daha sonra şirket sahibine devredin.",
    "home.plan_company_desc":
      "Bir yönetici, temizlikçi veya tedarikçileriniz var. Şirket için ayda USD 15, 10 koltuk dahil, sonra ekstra koltuk başına USD 2. Yalnızca sahip öder.",
    "home.faq_a4":
      "Personal sonsuza kadar ücretsizdir. Company ayda USD 15 olup 10 ekip koltuğu içerir; her ekstra koltuk ayda USD 2. Pro, Connect your agent için Personal veya Company üzerine ayda USD 9 ekler. Faturalama henüz canlı değil, bu yüzden her hesap kayıttan itibaren Pro dahil 3 ay tam erişim alır.",
    "home.faq_a9":
      "Evet. Personal, kendi listenizdeki mülkler için sonsuza kadar ücretsizdir. İşler, giderler ve misafirler ekip olmadan çalışır. Gerçek bir sahip katıldığında, bu mülkleri şirketine alması için davet edin; siz yönetici kalabilirsiniz.",
    "home.faq_a10":
      "Her şirket ve kişisel çalışma alanı ayrıdır. Mülkler, ekip, misafirler ve finans yalnızca o alandaki kişilere görünür. Misafirler yalnızca paylaştığınızı görür. Birden fazla şirketteki yönetici Ayarlar'da alan değiştirir; envanterler karışmaz.",
    "home.faq_q11": "Bir yönetici birden fazla şirket için çalışabilir mi?",
    "home.faq_a11":
      "Evet. Her şirket sahibi onu yönetici olarak davet eder. Tek giriş her şirkette bir koltuk ve kişisel mülk listesi tutar. Aktif şirketi Ayarlar'dan değiştirirler.",
    "owners.access_g2_desc":
      "Organizasyonu yönetin, yöneticileri, saha personelini ve misafirleri davet edin, mülkleri atayın ve erişimi kontrol edin. Bir yönetici villaları önce Personal altında kaydettiyse mülk devrini kabul edin: sizin şirketinize geçer, siz sahip olursunuz, o yönetici kalır. Personeli beceri, konum, harita ve yorumlara göre arayın. Sohbet, bahsetmeler, haftalık onaylar ve şirket sıralaması.",
    "managers.meta_description":
      "Bir veya daha fazla şirkette tatil kiralama yöneticileri için günlük operasyon: bugün ne acil, kim yapıyor ve nasıl bitti. Onaylı işler; hazır olunca kişisel villaları bir sahibe devredin.",
    "managers.og_description":
      "Yöneticiler için operasyon: tek girişle birden fazla şirket, günü bir kez kurun, hazır olunca kişisel mülkleri bir sahibe devredin.",
    "managers.sub":
      "Ne acil, kim sahada, hangi check-in'ler geliyor ve hangi faturalar açık. Tek girişle birden fazla şirkette çalışın. Sahibiniz aynı şeyi görür ve sormayı bırakır.",
    "managers.free_note":
      "Koltukunuz ücretsiz. Her şirket sahibi kendi alanı için öder.",
    "managers.features_access_lead":
      "Sahiple aynı günlük ops. Org yeniden adlandırma, şirket mülk listesi düzenleme ve personel mülk erişimi sahibe aittir. Tek giriş birden fazla şirkette koltuk tutabilir; Ayarlar'dan geçin.",
    "managers.access_g1_desc":
      "Her şirket mülkünü durum, tarihler ve ayrıntılarla görün. Ev rehberlerini ve notları güncel tutun. Airbnb veya Booking.com takvim dışa aktarımlarını Bookings'e senkronlayın. Kişisel mülkler, bir sahibi şirkete alması için davet edene kadar listenizde kalır.",
    "managers.access_g2_desc":
      "Personel, misafir ve meslektaşları davet edin. Beceri, bölge, harita ve yorumlarla yetenek aramasından insan bulun. Sohbet, bahsetmeler, haftalık onaylar ve sıralama. Davet bağlantısıyla kişisel mülkleri gerçek bir sahibe devredin: o sahip olur, siz yönetici kalırsınız.",
    "staff.access_g2_desc":
      "Yan müşteriler için kişisel mülkleriniz, bir sahibi şirkete alması için davet edene kadar şirkete görünmez. Profiliniz beceri, bölge, harita pini, haftalık onaylar ve sıralama yerini tutar. Tanıdıklarınızı kendi bağlantınızla davet edin.",
    "terms.what_body":
      "Pulse Flow paylaşılan bir ops aracıdır: mülkler, görevler, işler, gider faturaları, kişiler, ekip sohbeti, misafir konaklamaları, ev rehberleri, devir notları, kişisel ve şirket alanları arasında mülk devri, bakım kayıtları, raporlar ve isteğe bağlı bir yapay zeka ajanı. Kiralama veya istihdam ilişkisinin tarafı değildir.",
    "terms.roles_intro":
      "Temizlik ve diğer iş türleri etiketlerdir, ayrı hesap rolleri değil. Saha ekibi staff koltuğunu kullanır. Tek giriş birden fazla şirkette koltuk ve kişisel mülk listesi tutabilir.",
    "terms.roles_li1":
      "Sahip: şirket ayarları, mülkler, davetler, canlıyken yazılım faturalaması ve mülk devirlerini şirketlerine kabul etme.",
    "terms.roles_li2":
      "Yönetici: bir veya daha fazla şirkette sahip ile günlük ops. Bazı şirket ayarları sahibe aittir. Kişisel mülkler davetle bir sahibe devredilebilir.",
    "terms.roles_li3":
      "Staff: atanan mülkler, görevler, işler, ekip sohbeti ve gider faturaları. Yan müşteriler için isteğe bağlı kişisel mülk listesi.",
    "terms.roles_li5":
      "Yapay zeka ajanı: yalnızca sahipler ve yöneticiler için isteğe bağlı yardımcı, aktif alanlarıyla sınırlı.",
    "terms.owner_li4":
      "Personeli denetleyin, işi gözetin ve misafir verilerini yasal işleyin. Yöneticiler ops erişimini paylaşır; şirket ayarları ve bazı envanter kontrolleri sahibe aittir. Mülk devrini kabul etmek bu mülkleri ve ilgili ops kayıtlarını şirket alanınıza taşır.",
    "privacy.updated": "Pulse Flow · Son güncelleme: 29 Ekim 2026",
    "privacy.collect_li1":
      "Hesap verileri: ad, e-posta, rol, organizasyon üyelikleri ve isteğe bağlı profil ayrıntıları.",
    "privacy.collect_li2":
      "Operasyon verileri: mülkler (fotoğraf ve ilan bağlantıları dahil), görevler, işler, kişiler, ekip sohbeti, gider faturaları ve makbuzlar, raporlar, misafir konaklamaları, ev rehberleri, mülk ayrıntıları ve erişim bilgileri, bakım kayıtları, mülk devri davetleri ve isteğe bağlı takvim dışa aktarma bağlantıları ile içe aktarılan doluluk.",
    "privacy.who_li1":
      "Sahipler ve yöneticiler ait oldukları her şirket alanındaki verileri görür; personel işi ve faturaları, misafir konaklamaları, Support sohbeti ve depozito kayıtları dahil. Şirket değiştirmek başka bir şirketin envanterini açmaz.",
    "privacy.who_li2":
      "Staff profilini, atanan mülkleri, görevleri, işleri, ekip sohbetini ve gönderdiği faturaları görür. Yüklenen makbuz ve mülk fotoğrafları bulutta saklanır. Kişisel mülkler bir şirkete devredilene kadar kişisel alanda kalır.",
    "privacy.who_li5":
      "Davetler ve devirler: birini davet ettiğinizde veya mülk devri gönderdiğinizde, ilgili şirketler için daveti, e-postayı ve katılma veya kabul kaydını saklarız.",
    "privacy.use_li2":
      "Kullandığınız özellikleri sağlamak ve şirket ile kişisel alanları birbirinden ayrı tutmak",
  },
  ru: {
    "common.roles_owner_li3":
      "Данные организации, приглашения, биллинг и кто к каким объектам имеет доступ",
    "common.roles_manager_li3":
      "Может работать в нескольких компаниях с одним входом; без биллинга организации, без назначения доступа к объектам",
    "common.roles_staff_li3":
      "Личный список объектов для сторонних клиентов, невидимый компании до передачи",
    "home.audience_manager_desc":
      "Ведите одну или несколько компаний. Соберите день один раз; передайте смену с её историей.",
    "home.plan_personal_desc":
      "Одиночные объекты в вашем списке. Бесплатно навсегда. Позже передайте их владельцу компании, если приведёте его.",
    "home.plan_company_desc":
      "У вас есть управляющий, клинер или подрядчики. USD 15 / месяц за компанию, 10 мест включено, далее USD 2 за доп. место. Платит только владелец.",
    "home.faq_a4":
      "Personal бесплатен навсегда. Company стоит USD 15 / месяц и включает 10 мест команды; каждое доп. место стоит USD 2 / месяц. Pro добавляет USD 9 / месяц к Personal или Company для Connect your agent. Биллинг ещё не включён, поэтому каждый аккаунт получает 3 месяца полного доступа, включая Pro, со дня регистрации.",
    "home.faq_a9":
      "Да. Personal бесплатен навсегда для объектов в вашем списке. Работы, расходы и гости работают без команды. Когда появится настоящий владелец, пригласите его принять объекты в свою компанию; вы можете остаться управляющим.",
    "home.faq_a10":
      "Каждое пространство компании и личное пространство отдельно. Объекты, команда, гости и финансы видны только людям этого пространства. Гости видят только то, чем вы делитесь. Управляющий в нескольких компаниях переключает пространство в Настройках; инвентари не смешиваются.",
    "home.faq_q11": "Может ли управляющий работать более чем в одной компании?",
    "home.faq_a11":
      "Да. Каждый владелец компании приглашает его как управляющего. Один вход держит место в каждой компании плюс личный список объектов. Активную компанию переключают в Настройках.",
    "owners.access_g2_desc":
      "Управляйте организацией, приглашайте управляющих, полевой персонал и гостей, назначайте объекты и контролируйте доступ. Примите передачу объектов, если управляющий сначала завёл виллы в Personal: они переходят в вашу компанию, вы становитесь владельцем, он остаётся управляющим. Ищите персонал по навыкам, месту, карте и отзывам. Чат, упоминания, еженедельные оценки и рейтинг компании.",
    "managers.meta_description":
      "Ежедневные операции для управляющих краткосрочной арендой в одной или нескольких компаниях: что срочно сегодня, кто делает и чем закончилось. Подтверждённые работы; передайте личные виллы владельцу, когда готовы.",
    "managers.og_description":
      "Операции для управляющих: несколько компаний с одним входом, соберите день один раз, передайте личные объекты владельцу, когда готовы.",
    "managers.sub":
      "Что срочно, кто на объекте, какие заезды и какие счета открыты. Работайте в нескольких компаниях с одним входом. Владелец видит то же самое и перестаёт спрашивать.",
    "managers.free_note":
      "Ваше место бесплатно. Каждый владелец компании платит за своё пространство.",
    "managers.features_access_lead":
      "Те же ежедневные ops, что у владельца. Переименование организации, правка списка объектов компании и доступ персонала остаются у владельца. Один вход может держать места в нескольких компаниях; переключение в Настройках.",
    "managers.access_g1_desc":
      "Смотрите каждый объект компании со статусом, датами и деталями. Держите гайды и заметки актуальными. Синхронизируйте экспорт календаря Airbnb или Booking.com в Bookings. Личные объекты остаются в вашем списке, пока вы не пригласите владельца принять их в компанию.",
    "managers.access_g2_desc":
      "Приглашайте персонал, гостей и коллег. Находите людей через поиск по навыкам, району, карте и отзывам. Чат, упоминания, еженедельные оценки и рейтинг. Передайте личные объекты настоящему владельцу ссылкой-приглашением: он становится владельцем, вы остаётесь управляющим.",
    "staff.access_g2_desc":
      "Ваши личные объекты для сторонних клиентов невидимы компании, пока вы не пригласите владельца принять их в компанию. Профиль хранит навыки, район, метку на карте, еженедельные оценки и место в рейтинге. Приглашайте знакомых своей ссылкой.",
    "terms.what_body":
      "Pulse Flow это общий ops-инструмент: объекты, задачи, работы, счета расходов, контакты, командный чат, гостевые проживания, гайды по дому, заметки передачи, передача объектов между личным и корпоративным пространствами, журналы обслуживания, отчёты и опциональный ИИ-агент. Он не сторона арендных или трудовых отношений.",
    "terms.roles_intro":
      "Уборка и другие типы работ это ярлыки, а не отдельные роли аккаунта. Полевые коллеги используют место staff. Один вход может держать места более чем в одной компании плюс личный список объектов.",
    "terms.roles_li1":
      "Владелец: настройки компании, объекты, приглашения, биллинг ПО когда он активен, и принятие передач объектов в свою компанию.",
    "terms.roles_li2":
      "Управляющий: ежедневные ops с владельцем в одной или нескольких компаниях. Часть настроек остаётся у владельца. Личные объекты можно передать владельцу по приглашению.",
    "terms.roles_li3":
      "Staff: назначенные объекты, задачи, работы, командный чат и счета расходов. Опциональный личный список объектов для сторонних клиентов.",
    "terms.roles_li5":
      "ИИ-агент: опциональный помощник только для владельцев и управляющих, в пределах активного пространства.",
    "terms.owner_li4":
      "Проверяйте персонал, контролируйте работу и обрабатывайте данные гостей законно. Управляющие делят ops-доступ; настройки компании и часть контроля инвентаря остаются у владельца. Принятие передачи переносит эти объекты и связанные ops-записи в ваше корпоративное пространство.",
    "privacy.updated": "Pulse Flow · Последнее обновление: 29 октября 2026",
    "privacy.collect_li1":
      "Данные аккаунта: имя, email, роль, членства в организациях и опциональные детали профиля.",
    "privacy.collect_li2":
      "Операционные данные: объекты (включая фото и ссылки объявлений), задачи, работы, контакты, командный чат, счета расходов и чеки, отчёты, гостевые проживания, гайды по дому, детали объектов и доступ, журналы обслуживания, приглашения на передачу объектов, а также опциональные ссылки экспорта календаря и импортированная занятость.",
    "privacy.who_li1":
      "Владельцы и управляющие видят данные каждого корпоративного пространства, к которому принадлежат, включая работу и счета персонала, проживания, Support-чат и депозиты. Смена компании не открывает инвентарь другой.",
    "privacy.who_li2":
      "Staff видит профиль, назначенные объекты, задачи, работы, командный чат и отправленные счета. Загруженные фото чеков и объектов хранятся в облаке. Личные объекты остаются в личном пространстве до передачи компании.",
    "privacy.who_li5":
      "Приглашения и передачи: когда вы приглашаете кого-то или отправляете передачу объектов, мы храним приглашение, email и запись вступления или принятия для затронутых компаний.",
    "privacy.use_li2":
      "Предоставлять используемые вами функции и держать корпоративные и личные пространства отделёнными друг от друга",
  },
});

Object.assign(patches, {
  he: {
    "common.roles_owner_li3":
      "פרטי הארגון, הזמנות, חיוב, ומי מקבל גישה לאיזה נכס",
    "common.roles_manager_li3":
      "יכול לעבוד בכמה חברות עם התחברות אחת; בלי חיוב ארגון, בלי הקצאת גישה לנכסים",
    "common.roles_staff_li3":
      "רשימת נכסים אישית ללקוחות צד, בלתי נראית לחברה עד למסירה",
    "home.audience_manager_desc":
      "נהלו חברה אחת או יותר. בנו את היום פעם אחת; העבירו את המשמרת עם ההיסטוריה שלה.",
    "home.plan_personal_desc":
      "נכסים סולו ברשימה שלכם. חינם לתמיד. מסרו אותם לבעל חברה אחר כך אם תביאו אחד.",
    "home.plan_company_desc":
      "יש לכם מנהל, מנקה או ספקים. USD 15 לחודש לחברה, 10 מושבים כלולים, ואז USD 2 לכל מושב נוסף. רק הבעלים משלם.",
    "home.faq_a4":
      "Personal חינם לתמיד. Company עולה USD 15 לחודש וכולל 10 מושבי צוות; כל מושב נוסף עולה USD 2 לחודש. Pro מוסיף USD 9 לחודש על Personal או Company עבור Connect your agent. החיוב עדיין לא פעיל, ולכן כל חשבון מקבל 3 חודשי גישה מלאה כולל Pro מיום ההרשמה.",
    "home.faq_a9":
      "כן. Personal חינם לתמיד לנכסים ברשימה שלכם. עבודות, הוצאות ואורחים עובדים בלי צוות. כשנכנס בעלים אמיתי, הזמינו אותו לקחת את הנכסים לחברה שלו; אתם יכולים להישאר מנהלים.",
    "home.faq_a10":
      "כל סביבת חברה ואישית נפרדת. נכסים, צוות, אורחים וכספים נראים רק לאנשים באותה סביבה. אורחים רואים רק מה שאתם משתפים. מנהל בכמה חברות מחליף סביבה בהגדרות; המלאי לא מתערבב.",
    "home.faq_q11": "האם מנהל יכול לעבוד ביותר מחברה אחת?",
    "home.faq_a11":
      "כן. כל בעל חברה מזמין אותו כמנהל. התחברות אחת שומרת מושב בכל חברה וגם רשימת נכסים אישית. מחליפים חברה פעילה בהגדרות.",
    "owners.access_g2_desc":
      "נהלו את הארגון, הזמינו מנהלים, צוות שטח ואורחים, שייכו נכסים ושלטו בגישה. קבלו מסירת נכסים כשמנהל רשם וילות קודם תחת Personal: הן עוברות לחברה שלכם, אתם הופכים לבעלים, הוא נשאר מנהל. חפשו צוות לפי כישורים, מיקום, מפה וביקורות. צ'אט, אזכורים, המלצות שבועיות ולוח דירוג חברה.",
    "managers.meta_description":
      "תפעול יומיומי למנהלי השכרות נופש בחברה אחת או יותר: מה דחוף היום, מי עושה וכיצד זה הסתיים. עבודות מאושרות; מסרו וילות אישיות לבעלים כשמוכנים.",
    "managers.og_description":
      "תפעול למנהלים: כמה חברות בהתחברות אחת, בנו את היום פעם אחת, מסרו נכסים אישיים לבעלים כשמוכנים.",
    "managers.sub":
      "מה דחוף, מי באתר, אילו צ'ק-אין מגיעים ואילו חשבונות פתוחים. עבדו בכמה חברות עם התחברות אחת. הבעלים רואה אותו דבר ומפסיק לשאול.",
    "managers.free_note":
      "המושב שלכם חינם. כל בעל חברה משלם על הסביבה שלו.",
    "managers.features_access_lead":
      "אותו תפעול יומיומי כמו הבעלים. שינוי שם ארגון, עריכת רשימת נכסי החברה וגישת צוות לנכסים נשארים אצל הבעלים. התחברות אחת יכולה להחזיק מושבים בכמה חברות; החלפה בהגדרות.",
    "managers.access_g1_desc":
      "ראו כל נכס חברה עם סטטוס, תאריכים ופרטים. שמרו מדריכי בית והערות מעודכנים. סנכרנו ייצוא יומן Airbnb או Booking.com ל-Bookings. נכסים אישיים נשארים ברשימה שלכם עד שתזמינו בעלים לקחת אותם לחברה.",
    "managers.access_g2_desc":
      "הזמינו צוות, אורחים ועמיתים. מצאו אנשים בחיפוש כישורים לפי אזור, מפה וביקורות. צ'אט, אזכורים, המלצות שבועיות ולוח דירוג. מסרו נכסים אישיים לבעלים אמיתי עם קישור הזמנה: הוא הופך לבעלים, אתם נשארים מנהלים.",
    "staff.access_g2_desc":
      "הנכסים האישיים שלכם ללקוחות צד נשארים בלתי נראים לחברה עד שתזמינו בעלים לקחת אותם לחברה. הפרופיל שומר כישורים, אזור, סימון במפה, המלצות שבועיות ומקום בלוח הדירוג. הזמינו אנשים שאתם מכירים עם הקישור שלכם.",
    "terms.what_body":
      "Pulse Flow הוא כלי תפעול משותף: נכסים, משימות, עבודות, חשבונות הוצאה, אנשי קשר, צ'אט צוות, שהיות אורחים, מדריכי בית, הערות מסירה, מסירת נכסים בין סביבה אישית לחברה, יומני תחזוקה, דוחות וסוכן AI אופציונלי. הוא אינו צד ביחסי שכירות או העסקה.",
    "terms.roles_intro":
      "ניקיון וסוגי עבודה אחרים הם תוויות, לא תפקידי חשבון נפרדים. עמיתי שטח משתמשים במושב staff. התחברות אחת יכולה להחזיק מושבים ביותר מחברה אחת וגם רשימת נכסים אישית.",
    "terms.roles_li1":
      "בעלים: הגדרות חברה, נכסים, הזמנות, חיוב תוכנה כשהוא פעיל, וקבלת מסירות נכסים לחברה שלו.",
    "terms.roles_li2":
      "מנהל: תפעול יומיומי עם הבעלים בחברה אחת או יותר. חלק מהגדרות החברה נשארות אצל הבעלים. נכסים אישיים אפשר למסור לבעלים בהזמנה.",
    "terms.roles_li3":
      "Staff: נכסים משויכים, משימות, עבודות, צ'אט צוות וחשבונות הוצאה. רשימת נכסים אישית אופציונלית ללקוחות צד.",
    "terms.roles_li5":
      "סוכן AI: עזרה אופציונלית לבעלים ומנהלים בלבד, מוגבלת לסביבה הפעילה שלהם.",
    "terms.owner_li4":
      "בדקו צוות, פקחו על עבודה וטפלו בנתוני אורחים כחוק. מנהלים חולקים גישת תפעול; הגדרות חברה וחלק מבקרות המלאי נשארות אצל הבעלים. קבלת מסירת נכסים מעבירה את הנכסים ורשומות התפעול הקשורות לסביבת החברה שלכם.",
    "privacy.updated": "Pulse Flow · עודכן לאחרונה: 29 באוקטובר 2026",
    "privacy.collect_li1":
      "נתוני חשבון: שם, אימייל, תפקיד, חברויות בארגון ופרטי פרופיל אופציונליים.",
    "privacy.collect_li2":
      "נתוני תפעול: נכסים (כולל תמונות וקישורי מודעה), משימות, עבודות, אנשי קשר, צ'אט צוות, חשבונות הוצאה וקבלות, דוחות, שהיות אורחים, מדריכי בית, פרטי נכס ומידע גישה, יומני תחזוקה, הזמנות מסירת נכסים, וקישורי ייצוא יומן אופציונליים עם תפוסה מיובאת.",
    "privacy.who_li1":
      "בעלים ומנהלים רואים את הנתונים בכל סביבת חברה שאליה הם שייכים, כולל עבודת צוות וחשבונות, שהיות, צ'אט Support ופיקדונות. החלפת חברה לא חושפת מלאי של חברה אחרת.",
    "privacy.who_li2":
      "Staff רואים את הפרופיל, נכסים משויכים, משימות, עבודות, צ'אט צוות והחשבונות שהם שולחים. תמונות קבלות ונכסים מועלות נשמרות בענן. נכסים אישיים נשארים בסביבה האישית עד למסירה לחברה.",
    "privacy.who_li5":
      "הזמנות ומסירות: כשאתם מזמינים מישהו או שולחים מסירת נכסים, אנחנו שומרים את ההזמנה, האימייל ורשומת הצטרפות או קבלה לחברות המעורבות.",
    "privacy.use_li2":
      "לספק את התכונות שאתם משתמשים בהן ולשמור סביבות חברה ואישיות נפרדות זו מזו",
  },
  ar: {
    "common.roles_owner_li3":
      "تفاصيل المؤسسة والدعوات والفوترة ومن يحصل على الوصول لأي عقار",
    "common.roles_manager_li3":
      "يمكن العمل في عدة شركات بتسجيل دخول واحد؛ بدون فوترة للمؤسسة وبدون تعيين وصول للعقارات",
    "common.roles_staff_li3":
      "قائمة عقارات شخصية لعملاء جانبيين، غير مرئية للشركة حتى التسليم",
    "home.audience_manager_desc":
      "أدِر شركة واحدة أو أكثر. ابنِ اليوم مرة واحدة؛ سلّم الوردية بتاريخها الكامل.",
    "home.plan_personal_desc":
      "عقارات فردية في قائمتك. مجانية للأبد. سلّمها لاحقاً لمالك شركة إن أحضرت واحداً.",
    "home.plan_company_desc":
      "لديك مدير أو منظّف أو موردون. USD 15 شهرياً للشركة، 10 مقاعد مشمولة ثم USD 2 لكل مقعد إضافي. المالك وحده يدفع.",
    "home.faq_a4":
      "Personal مجاني للأبد. Company بسعر USD 15 شهرياً ويشمل 10 مقاعد فريق؛ كل مقعد إضافي USD 2 شهرياً. Pro يضيف USD 9 شهرياً على Personal أو Company لـ Connect your agent. الفوترة غير مفعّلة بعد، لذلك كل حساب يحصل على 3 أشهر وصول كامل بما فيها Pro من يوم التسجيل.",
    "home.faq_a9":
      "نعم. Personal مجاني للأبد لعقارات قائمتك. الأعمال والمصروفات والضيوف تعمل بدون فريق. عندما ينضم مالك حقيقي، ادعه ليأخذ تلك العقارات إلى شركته؛ يمكنك البقاء مديراً.",
    "home.faq_a10":
      "كل مساحة شركة وشخصية منفصلة. العقارات والفريق والضيوف والمالية يراها فقط أشخاص تلك المساحة. الضيوف يرون فقط ما تشاركه. المدير في عدة شركات يبدّل المساحة في الإعدادات؛ المخزونات لا تختلط.",
    "home.faq_q11": "هل يمكن لمدير العمل لأكثر من شركة؟",
    "home.faq_a11":
      "نعم. كل مالك شركة يدعوه كمدير. تسجيل دخول واحد يحتفظ بمقعد في كل شركة إضافة إلى قائمة عقارات شخصية. يبدّلون الشركة النشطة في الإعدادات.",
    "owners.access_g2_desc":
      "أدِر المؤسسة، ادعُ المديرين وطاقم الميدان والضيوف، خصّص العقارات وتحكّم بالوصول. اقبل تسليم عقارات عندما سجّل مدير الفلل أولاً تحت Personal: تنتقل إلى شركتك، تصبح مالكاً، ويبقى مديراً. ابحث عن الطاقم بالمهارات والموقع والخريطة والمراجعات. دردشة وإشارات وتزكيات أسبوعية ولوحة ترتيب للشركة.",
    "managers.meta_description":
      "عمليات يومية لمديري إيجار العطلات في شركة واحدة أو أكثر: ما العاجل اليوم ومن ينفّذه وكيف انتهى. أعمال مؤكدة؛ سلّم فللًا شخصية لمالك عندما تكون جاهزاً.",
    "managers.og_description":
      "عمليات للمديرين: عدة شركات بتسجيل دخول واحد، ابنِ اليوم مرة واحدة، سلّم عقارات شخصية لمالك عندما تكون جاهزاً.",
    "managers.sub":
      "ما العاجل، من في الموقع، أي تسجيلات وصول قادمة وأي فواتير مفتوحة. اعمل عبر عدة شركات بتسجيل دخول واحد. مالكك يرى الشيء نفسه ويتوقف عن السؤال.",
    "managers.free_note":
      "مقعدك مجاني. كل مالك شركة يدفع عن مساحته.",
    "managers.features_access_lead":
      "نفس العمليات اليومية للمالك. إعادة تسمية المؤسسة وتعديل قائمة عقارات الشركة ووصول الطاقم للعقارات تبقى للمالك. تسجيل دخول واحد يمكنه حمل مقاعد في عدة شركات؛ التبديل في الإعدادات.",
    "managers.access_g1_desc":
      "اطّلع على كل عقار شركة مع الحالة والتواريخ والتفاصيل. أبقِ أدلة المنزل والملاحظات محدّثة. زامن تصدير تقويم Airbnb أو Booking.com إلى Bookings. العقارات الشخصية تبقى في قائمتك حتى تدعو مالكاً ليأخذها إلى شركة.",
    "managers.access_g2_desc":
      "ادعُ الطاقم والضيوف والزملاء. اعثر على أشخاص عبر بحث المواهب بالمهارات والمنطقة والخريطة والمراجعات. دردشة وإشارات وتزكيات أسبوعية ولوحة ترتيب. سلّم عقارات شخصية لمالك حقيقي برابط دعوة: يصبح مالكاً وتبقى مديراً.",
    "staff.access_g2_desc":
      "عقاراتك الشخصية لعملاء جانبيين تبقى غير مرئية للشركة حتى تدعو مالكاً ليأخذها إلى شركة. ملفك يحفظ المهارات والمنطقة ودبوس الخريطة والتزكيات الأسبوعية ومرتبة اللوحة. ادعُ من تعرفهم برابطك.",
    "terms.what_body":
      "Pulse Flow أداة عمليات مشتركة: عقارات ومهام وأعمال وفواتير مصروفات وجهات اتصال ودردشة فريق وإقامات ضيوف وأدلة منزل وملاحظات تسليم وتسليم عقارات بين المساحة الشخصية ومساحة الشركة وسجلات صيانة وتقارير ووكيل ذكاء اصطناعي اختياري. ليست طرفاً في علاقة إيجار أو توظيف.",
    "terms.roles_intro":
      "التنظيف وأنواع العمل الأخرى تسميات وليست أدوار حساب منفصلة. زملاء الميدان يستخدمون مقعد staff. تسجيل دخول واحد يمكنه حمل مقاعد في أكثر من شركة إضافة إلى قائمة عقارات شخصية.",
    "terms.roles_li1":
      "المالك: إعدادات الشركة والعقارات والدعوات وفوترة البرنامج عند تفعيلها وقبول تسليم العقارات إلى شركته.",
    "terms.roles_li2":
      "المدير: عمليات يومية مع المالك في شركة واحدة أو أكثر. بعض إعدادات الشركة تبقى للمالك. يمكن تسليم العقارات الشخصية لمالك عبر دعوة.",
    "terms.roles_li3":
      "Staff: عقارات معيّنة ومهام وأعمال ودردشة فريق وفواتير مصروفات. قائمة عقارات شخصية اختيارية لعملاء جانبيين.",
    "terms.roles_li5":
      "وكيل الذكاء الاصطناعي: مساعدة اختيارية للمالكين والمديرين فقط، محدودة بمساحتهم النشطة.",
    "terms.owner_li4":
      "تحقّق من الطاقم وأشرف على العمل وعالج بيانات الضيوف قانونياً. المديرون يشاركون وصول العمليات؛ إعدادات الشركة وبعض ضوابط المخزون تبقى للمالك. قبول تسليم عقارات ينقل تلك العقارات وسجلات العمليات المرتبطة إلى مساحة شركتك.",
    "privacy.updated": "Pulse Flow · آخر تحديث: 29 أكتوبر 2026",
    "privacy.collect_li1":
      "بيانات الحساب: الاسم والبريد والدور وعضويات المؤسسة وتفاصيل ملف اختيارية.",
    "privacy.collect_li2":
      "بيانات العمليات: العقارات (بما فيها الصور وروابط الإعلان) والمهام والأعمال وجهات الاتصال ودردشة الفريق وفواتير المصروفات والإيصالات والتقارير وإقامات الضيوف وأدلة المنزل وتفاصيل العقار ومعلومات الوصول وسجلات الصيانة ودعوات تسليم العقارات وروابط تصدير تقويم اختيارية مع إشغال مستورد.",
    "privacy.who_li1":
      "المالكون والمديرون يرون بيانات كل مساحة شركة ينتمون إليها، بما في ذلك عمل الطاقم والفواتير وإقامات الضيوف ودردشة الدعم وسجلات العربون. تبديل الشركة لا يكشف مخزون شركة أخرى.",
    "privacy.who_li2":
      "يرى Staff ملفه والعقارات المعيّنة والمهام والأعمال ودردشة الفريق والفواتير التي يرسلها. صور الإيصالات والعقارات المرفوعة تُخزَّن في السحابة. العقارات الشخصية تبقى في المساحة الشخصية حتى تُسلَّم لشركة.",
    "privacy.who_li5":
      "الدعوات والتسليمات: عندما تدعو شخصاً أو ترسل تسليم عقارات، نخزّن الدعوة والبريد وسجل الانضمام أو القبول للشركات المعنية.",
    "privacy.use_li2":
      "توفير الميزات التي تستخدمها والحفاظ على مساحات الشركة والشخصية منفصلة عن بعضها",
  },
  th: {
    "common.roles_owner_li3":
      "รายละเอียดองค์กร คำเชิญ การเรียกเก็บเงิน และใครเข้าถึงทรัพย์สินใดได้",
    "common.roles_manager_li3":
      "ทำงานได้หลายบริษัทด้วยล็อกอินเดียว ไม่มีการเรียกเก็บเงินองค์กร ไม่มีการมอบหมายการเข้าถึงทรัพย์สิน",
    "common.roles_staff_li3":
      "รายการทรัพย์สินส่วนตัวสำหรับลูกค้าข้างเคียง มองไม่เห็นจากบริษัทจนกว่าจะส่งมอบ",
    "home.audience_manager_desc":
      "ดูแลหนึ่งหรือหลายบริษัท สร้างวันทำงานครั้งเดียว ส่งมอบกะพร้อมประวัติ",
    "home.plan_personal_desc":
      "ทรัพย์สินเดี่ยวในรายการของคุณ ฟรีตลอดไป ส่งต่อให้เจ้าของบริษัททีหลังถ้าพาเข้ามา",
    "home.plan_company_desc":
      "คุณมีผู้จัดการ แม่บ้าน หรือผู้รับเหมา USD 15 / เดือนต่อบริษัท รวม 10 ที่นั่ง แล้ว USD 2 ต่อที่นั่งเพิ่ม มีเพียงเจ้าของที่จ่าย",
    "home.faq_a4":
      "Personal ฟรีตลอดไป Company ราคา USD 15 / เดือน รวม 10 ที่นั่งทีม ที่นั่งเพิ่มละ USD 2 / เดือน Pro เพิ่ม USD 9 / เดือนบน Personal หรือ Company สำหรับ Connect your agent การเรียกเก็บเงินยังไม่เปิด ดังนั้นทุกบัญชีได้สิทธิ์เต็ม 3 เดือนรวม Pro นับจากวันสมัคร",
    "home.faq_a9":
      "ได้ Personal ฟรีตลอดไปสำหรับทรัพย์สินในรายการของคุณ งาน ค่าใช้จ่าย และแขกใช้ได้โดยไม่ต้องมีทีม เมื่อมีเจ้าของจริง เชิญให้รับทรัพย์สินเข้าบริษัทของเขา คุณอยู่เป็นผู้จัดการได้",
    "home.faq_a10":
      "พื้นที่บริษัทและส่วนตัวแยกกัน ทรัพย์สิน ทีม แขก และการเงินเห็นได้เฉพาะคนในพื้นที่นั้น แขกเห็นเฉพาะที่คุณแชร์ ผู้จัดการหลายบริษัทสลับพื้นที่ในตั้งค่า คลังไม่ปนกัน",
    "home.faq_q11": "ผู้จัดการทำงานให้ได้มากกว่าหนึ่งบริษัทไหม",
    "home.faq_a11":
      "ได้ เจ้าของแต่ละบริษัทเชิญเป็นผู้จัดการ ล็อกอินเดียวเก็บที่นั่งในแต่ละบริษัทบวกรายการทรัพย์สินส่วนตัว สลับบริษัทที่ใช้งานในตั้งค่า",
    "owners.access_g2_desc":
      "จัดการองค์กร เชิญผู้จัดการ ทีมภาคสนาม และแขก มอบหมายทรัพย์สินและควบคุมการเข้าถึง รับการส่งมอบทรัพย์สินเมื่อผู้จัดการบันทึกวิลล่าใน Personal ก่อน: ย้ายเข้าบริษัทของคุณ คุณเป็นเจ้าของ เขาอยู่เป็นผู้จัดการ ค้นหาทีมตามทักษะ สถานที่ แผนที่ และรีวิว แชท การกล่าวถึง การรับรองรายสัปดาห์ และกระดานอันดับบริษัท",
    "managers.meta_description":
      "ปฏิบัติการรายวันสำหรับผู้จัดการเช่าพักร้อนในหนึ่งหรือหลายบริษัท: อะไรรีบวันนี้ ใครทำ และจบอย่างไร งานที่ยืนยันแล้ว ส่งวิลล่าส่วนตัวให้เจ้าของเมื่อพร้อม",
    "managers.og_description":
      "ปฏิบัติการสำหรับผู้จัดการ: หลายบริษัทด้วยล็อกอินเดียว สร้างวันทำงานครั้งเดียว ส่งทรัพย์สินส่วนตัวให้เจ้าของเมื่อพร้อม",
    "managers.sub":
      "อะไรรีบ ใครอยู่หน้างาน เช็คอินไหนกำลังมา และบิลไหนเปิดอยู่ ทำงานข้ามหลายบริษัทด้วยล็อกอินเดียว เจ้าของเห็นสิ่งเดียวกันและเลิกถาม",
    "managers.free_note":
      "ที่นั่งของคุณฟรี เจ้าของแต่ละบริษัทจ่ายพื้นที่ของตน",
    "managers.features_access_lead":
      "ปฏิบัติการรายวันแบบเดียวกับเจ้าของ การเปลี่ยนชื่อองค์กร แก้รายการทรัพย์สินบริษัท และการเข้าถึงทีมอยู่กับเจ้าของ ล็อกอินเดียวถือที่นั่งได้หลายบริษัท สลับในตั้งค่า",
    "managers.access_g1_desc":
      "ดูทรัพย์สินบริษัททุกหลังพร้อมสถานะ วันที่ และรายละเอียด อัปเดตคู่มือบ้านและบันทึก ซิงก์ปฏิทินส่งออก Airbnb หรือ Booking.com เข้า Bookings ทรัพย์สินส่วนตัวอยู่ในรายการของคุณจนกว่าจะเชิญเจ้าของมารับเข้าบริษัท",
    "managers.access_g2_desc":
      "เชิญทีม แขก และเพื่อนร่วมงาน หาคนผ่านค้นหาทักษะตามพื้นที่ แผนที่ และรีวิว แชท การกล่าวถึง การรับรองรายสัปดาห์ และกระดานอันดับ ส่งทรัพย์สินส่วนตัวให้เจ้าของจริงด้วยลิงก์เชิญ: เขาเป็นเจ้าของ คุณอยู่เป็นผู้จัดการ",
    "staff.access_g2_desc":
      "ทรัพย์สินส่วนตัวสำหรับลูกค้าข้างเคียงมองไม่เห็นจากบริษัทจนกว่าจะเชิญเจ้าของมารับเข้าบริษัท โปรไฟล์เก็บทักษะ พื้นที่ หมุดแผนที่ การรับรองรายสัปดาห์ และอันดับ เชิญคนที่รู้จักด้วยลิงก์ของคุณ",
    "terms.what_body":
      "Pulse Flow เป็นเครื่องมือ ops ร่วม: ทรัพย์สิน งาน ใบสั่งงาน บิลค่าใช้จ่าย ผู้ติดต่อ แชททีม การเข้าพักแขก คู่มือบ้าน บันทึกส่งมอบ การส่งมอบทรัพย์สินระหว่างพื้นที่ส่วนตัวกับบริษัท บันทึกซ่อมบำรุง รายงาน และเอเจนต์ AI ทางเลือก ไม่ใช่คู่สัญญาเช่าหรือจ้างงาน",
    "terms.roles_intro":
      "งานทำความสะอาดและประเภทงานอื่นเป็นป้ายกำกับ ไม่ใช่บทบาทบัญชีแยก เพื่อนร่วมงานภาคสนามใช้ที่นั่ง staff ล็อกอินเดียวถือที่นั่งได้มากกว่าหนึ่งบริษัทบวกรายการทรัพย์สินส่วนตัว",
    "terms.roles_li1":
      "เจ้าของ: การตั้งค่าบริษัท ทรัพย์สิน คำเชิญ การเรียกเก็บซอฟต์แวร์เมื่อเปิดใช้ และการรับส่งมอบทรัพย์สินเข้าบริษัท",
    "terms.roles_li2":
      "ผู้จัดการ: ops รายวันกับเจ้าของในหนึ่งหรือหลายบริษัท การตั้งค่าบางอย่างอยู่กับเจ้าของ ทรัพย์สินส่วนตัวส่งมอบให้เจ้าของได้ผ่านคำเชิญ",
    "terms.roles_li3":
      "Staff: ทรัพย์สินที่ได้รับมอบหมาย งาน ใบสั่งงาน แชททีม และบิลค่าใช้จ่าย รายการทรัพย์สินส่วนตัวทางเลือกสำหรับลูกค้าข้างเคียง",
    "terms.roles_li5":
      "เอเจนต์ AI: ผู้ช่วยทางเลือกสำหรับเจ้าของและผู้จัดการเท่านั้น จำกัดพื้นที่ที่ใช้งานอยู่",
    "terms.owner_li4":
      "ตรวจสอบทีม กำกับงาน และจัดการข้อมูลแขกอย่างถูกกฎหมาย ผู้จัดการแชร์การเข้าถึง ops การตั้งค่าบริษัทและการควบคุมคลังบางส่วนอยู่กับเจ้าของ การรับส่งมอบจะย้ายทรัพย์สินและบันทึก ops ที่เกี่ยวข้องเข้าพื้นที่บริษัทของคุณ",
    "privacy.updated": "Pulse Flow · อัปเดตล่าสุด: 29 ตุลาคม 2026",
    "privacy.collect_li1":
      "ข้อมูลบัญชี: ชื่อ อีเมล บทบาท สมาชิกภาพองค์กร และรายละเอียดโปรไฟล์ทางเลือก",
    "privacy.collect_li2":
      "ข้อมูลปฏิบัติการ: ทรัพย์สิน (รวมรูปและลิงก์ประกาศ) งาน ใบสั่งงาน ผู้ติดต่อ แชททีม บิลค่าใช้จ่ายและใบเสร็จ รายงาน การเข้าพักแขก คู่มือบ้าน รายละเอียดทรัพย์สินและข้อมูลการเข้าถึง บันทึกซ่อมบำรุง คำเชิญส่งมอบทรัพย์สิน และลิงก์ส่งออกปฏิทินทางเลือกพร้อมการเข้าพักที่นำเข้า",
    "privacy.who_li1":
      "เจ้าของและผู้จัดการเห็นข้อมูลในแต่ละพื้นที่บริษัทที่สังกัด รวมงานและบิลของทีม การเข้าพัก แชท Support และเงินมัดจำ การสลับบริษัทไม่เปิดคลังของบริษัทอื่น",
    "privacy.who_li2":
      "Staff เห็นโปรไฟล์ ทรัพย์สินที่ได้รับมอบหมาย งาน ใบสั่งงาน แชททีม และบิลที่ส่ง รูปใบเสร็จและทรัพย์สินที่อัปโหลดเก็บในคลาวด์ ทรัพย์สินส่วนตัวอยู่ในพื้นที่ส่วนตัวจนกว่าจะส่งมอบให้บริษัท",
    "privacy.who_li5":
      "คำเชิญและการส่งมอบ: เมื่อคุณเชิญใครหรือส่งการส่งมอบทรัพย์สิน เราเก็บคำเชิญ อีเมล และบันทึกการเข้าร่วมหรือยอมรับของบริษัทที่เกี่ยวข้อง",
    "privacy.use_li2":
      "ให้ฟีเจอร์ที่คุณใช้ และแยกพื้นที่บริษัทกับส่วนตัวออกจากกัน",
  },
  my: {
    "common.roles_owner_li3":
      "အဖွဲ့အစည်းအသေးစိတ်၊ ဖိတ်ကြားမှုများ၊ ငွေတောင်းခံခြင်းနှင့် မည်သည့်ပိုင်ဆိုင်မှုကို မည်သူဝင်ရောက်နိုင်သည်",
    "common.roles_manager_li3":
      "လော့ဂ်အင်တစ်ခုဖြင့် ကုမ္ပဏီအများတွင် အလုပ်လုပ်နိုင်သည်။ အဖွဲ့အစည်းငွေတောင်းခံခြင်းမရှိ၊ ပိုင်ဆိုင်မှုဝင်ရောက်ခွင့်သတ်မှတ်ခြင်းမရှိ",
    "common.roles_staff_li3":
      "ဘေးဘက်ဖောက်သည်များအတွက် ကိုယ်ပိုင်ပိုင်ဆိုင်မှုစာရင်း၊ လွှဲပြောင်းသည်အထိ ကုမ္ပဏီမှမမြင်ရ",
    "home.audience_manager_desc":
      "ကုမ္ပဏီတစ်ခု သို့မဟုတ် အများကို စီမံပါ။ နေ့ကို တစ်ကြိမ်တည်ဆောက်ပါ။ အလှည့်ကို မှတ်တမ်းနှင့်အတူ လွှဲပါ။",
    "home.plan_personal_desc":
      "ကိုယ်ပိုင်စာရင်းရှိ တစ်ဦးတည်းပိုင်ဆိုင်မှုများ။ အမြဲအခမဲ့။ ကုမ္ပဏီပိုင်ရှင်ခေါ်လာရင် နောက်မှ လွှဲပေးနိုင်သည်။",
    "home.plan_company_desc":
      "မန်နေဂျာ၊ သန့်ရှင်းရေး သို့မဟုတ် ပေးသွင်းသူများရှိသည်။ ကုမ္ပဏီအတွက် တစ်လ USD 15၊ ထိုင်ခုံ 10 ပါဝင်ပြီး ထပ်ဆောင်းတစ်ခုံ USD 2။ ပိုင်ရှင်သာ ပေးချေသည်။",
    "home.faq_a4":
      "Personal သည် အမြဲအခမဲ့။ Company သည် တစ်လ USD 15 ဖြစ်ပြီး အဖွဲ့ထိုင်ခုံ 10 ပါဝင်သည်။ ထပ်ဆောင်းတစ်ခုံ တစ်လ USD 2။ Pro သည် Connect your agent အတွက် Personal သို့မဟုတ် Company ပေါ်တွင် တစ်လ USD 9 ထပ်ပေါင်းသည်။ ငွေတောင်းခံခြင်း မဖွင့်သေးသောကြောင့် အကောင့်တိုင်းသည် စာရင်းသွင်းသည့်နေ့မှ Pro အပါအဝင် ၃ လ အပြည့်အဝင်ရရှိသည်။",
    "home.faq_a9":
      "ဟုတ်ကဲ့။ Personal သည် ကိုယ်ပိုင်စာရင်းရှိ ပိုင်ဆိုင်မှုများအတွက် အမြဲအခမဲ့။ အလုပ်များ၊ အသုံးစရိတ်နှင့် ဧည့်သည်များသည် အဖွဲ့မလိုဘဲ အလုပ်လုပ်သည်။ တကယ့်ပိုင်ရှင်လာလျှင် ထိုပိုင်ဆိုင်မှုများကို သူ့ကုမ္ပဏီသို့ ယူရန် ဖိတ်ပါ။ သင်မန်နေဂျာအဖြစ် ဆက်နေနိုင်သည်။",
    "home.faq_a10":
      "ကုမ္ပဏီနှင့် ကိုယ်ပိုင်လုပ်ငန်းခွင်တစ်ခုစီ သီးခြားဖြစ်သည်။ ပိုင်ဆိုင်မှုများ၊ အဖွဲ့၊ ဧည့်သည်များနှင့် ငွေကြေးကို ထိုလုပ်ငန်းခွင်ရှိသူများသာ မြင်ရသည်။ ဧည့်သည်များသည် သင်မျှဝေသည့်အရာသာ မြင်ရသည်။ ကုမ္ပဏီအများရှိ မန်နေဂျာသည် ဆက်တင်တွင် လုပ်ငန်းခွင်ပြောင်းသည်။ စာရင်းများ မရောမယှက်ပါ။",
    "home.faq_q11": "မန်နေဂျာတစ်ဦးသည် ကုမ္ပဏီတစ်ခုထက်ပို၍ အလုပ်လုပ်နိုင်ပါသလား။",
    "home.faq_a11":
      "ဟုတ်ကဲ့။ ကုမ္ပဏီပိုင်ရှင်တိုင်းက မန်နေဂျာအဖြစ် ဖိတ်သည်။ လော့ဂ်အင်တစ်ခုသည် ကုမ္ပဏီတစ်ခုစီတွင် ထိုင်ခုံနှင့် ကိုယ်ပိုင်ပိုင်ဆိုင်မှုစာရင်းကို ထိန်းထားသည်။ တက်ကြွသောကုမ္ပဏီကို ဆက်တင်တွင် ပြောင်းသည်။",
    "owners.access_g2_desc":
      "အဖွဲ့အစည်းကို စီမံပါ၊ မန်နေဂျာများ၊ ကွင်းဆင်းဝန်ထမ်းနှင့် ဧည့်သည်များကို ဖိတ်ပါ၊ ပိုင်ဆိုင်မှုများသတ်မှတ်ပြီး ဝင်ရောက်ခွင့်ထိန်းချုပ်ပါ။ မန်နေဂျာက ဗီလာများကို Personal အောက်တွင် အရင်မှတ်သားထားလျှင် ပိုင်ဆိုင်မှုလွှဲပြောင်းကို လက်ခံပါ။ သင့်ကုမ္ပဏီသို့ ရွှေ့သည်၊ သင်ပိုင်ရှင်ဖြစ်ပြီး သူမန်နေဂျာအဖြစ် ဆက်ရှိသည်။ ကျွမ်းကျင်မှု၊ တည်နေရာ၊ မြေပုံနှင့် သုံးသပ်ချက်ဖြင့် ဝန်ထမ်းရှာပါ။ ချတ်၊ ဖော်ပြချက်များ၊ အပတ်စဉ်အသိအမှတ်ပြုမှုနှင့် ကုမ္ပဏီအဆင့်စာရင်း။",
    "managers.meta_description":
      "ကုမ္ပဏီတစ်ခု သို့မဟုတ် အများအတွက် အားလပ်ရက်ငှားရမ်းမန်နေဂျာများ၏ နေ့စဉ်လုပ်ငန်းများ။ ယနေ့ အရေးကြီးသည်မှာ ဘာလဲ၊ ဘယ်သူလုပ်လဲ၊ ဘယ်လိုအဆုံးသတ်လဲ။ အတည်ပြုထားသောအလုပ်များ။ အဆင်သင့်ဖြစ်လျှင် ကိုယ်ပိုင်ဗီလာများကို ပိုင်ရှင်ထံ လွှဲပါ။",
    "managers.og_description":
      "မန်နေဂျာများအတွက် လုပ်ငန်းများ။ လော့ဂ်အင်တစ်ခုဖြင့် ကုမ္ပဏီအများ၊ နေ့ကို တစ်ကြိမ်တည်ဆောက်ပါ၊ အဆင်သင့်ဖြစ်လျှင် ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများကို ပိုင်ရှင်ထံ လွှဲပါ။",
    "managers.sub":
      "ဘာအရေးကြီးလဲ၊ ဘယ်သူနေရာမှာလဲ၊ ဘယ် check-in များလာမလဲ၊ ဘယ်ဘေလ်များဖွင့်ထားလဲ။ လော့ဂ်အင်တစ်ခုဖြင့် ကုမ္ပဏီအများတွင် အလုပ်လုပ်ပါ။ ပိုင်ရှင်က တူညီသောအရာကို မြင်ပြီး မေးခွန်းမေးခြင်းရပ်သည်။",
    "managers.free_note":
      "သင့်ထိုင်ခုံအခမဲ့။ ကုမ္ပဏီပိုင်ရှင်တိုင်း မိမိလုပ်ငန်းခွင်အတွက် ပေးချေသည်။",
    "managers.features_access_lead":
      "ပိုင်ရှင်နှင့် တူညီသော နေ့စဉ် ops။ အဖွဲ့အစည်းအမည်ပြောင်းခြင်း၊ ကုမ္ပဏီပိုင်ဆိုင်မှုစာရင်းပြင်ဆင်ခြင်းနှင့် ဝန်ထမ်းပိုင်ဆိုင်မှုဝင်ရောက်ခွင့်သည် ပိုင်ရှင်တွင် ရှိသည်။ လော့ဂ်အင်တစ်ခုသည် ကုမ္ပဏီအများတွင် ထိုင်ခုံထားနိုင်သည်။ ဆက်တင်တွင် ပြောင်းပါ။",
    "managers.access_g1_desc":
      "အခြေအနေ၊ ရက်စွဲနှင့် အသေးစိတ်နှင့်အတူ ကုမ္ပဏီပိုင်ဆိုင်မှုတိုင်းကို ကြည့်ပါ။ အိမ်လမ်းညွှန်နှင့် မှတ်စုများကို လက်ရှိထားပါ။ Airbnb သို့မဟုတ် Booking.com ပြက္ခဒိန်တင်ပို့မှုကို Bookings သို့ စင့်ခ်လုပ်ပါ။ ပိုင်ရှင်ကို ကုမ္ပဏီသို့ ယူရန် ဖိတ်သည်အထိ ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများသည် သင့်စာရင်းတွင် ရှိနေသည်။",
    "managers.access_g2_desc":
      "ဝန်ထမ်း၊ ဧည့်သည်နှင့် လုပ်ဖော်ကိုင်ဖက်များကို ဖိတ်ပါ။ ကျွမ်းကျင်မှု၊ ဧရိယာ၊ မြေပုံနှင့် သုံးသပ်ချက်ဖြင့် အရည်အချင်းရှာဖွေမှုမှ လူရှာပါ။ ချတ်၊ ဖော်ပြချက်များ၊ အပတ်စဉ်အသိအမှတ်ပြုမှုနှင့် အဆင့်စာရင်း။ ဖိတ်ကြားလင့်ခ်ဖြင့် ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများကို တကယ့်ပိုင်ရှင်ထံ လွှဲပါ။ သူပိုင်ရှင်ဖြစ်ပြီး သင်မန်နေဂျာအဖြစ် ဆက်ရှိသည်။",
    "staff.access_g2_desc":
      "ဘေးဘက်ဖောက်သည်များအတွက် သင့်ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများသည် ပိုင်ရှင်ကို ကုမ္ပဏီသို့ ယူရန် ဖိတ်သည်အထိ ကုမ္ပဏီမှ မမြင်ရ။ ပရိုဖိုင်တွင် ကျွမ်းကျင်မှု၊ ဧရိယာ၊ မြေပုံပင်၊ အပတ်စဉ်အသိအမှတ်ပြုမှုနှင့် အဆင့်နေရာရှိသည်။ သိသူများကို သင့်လင့်ခ်ဖြင့် ဖိတ်ပါ။",
    "terms.what_body":
      "Pulse Flow သည် မျှဝေသော ops ကိရိယာဖြစ်သည်။ ပိုင်ဆိုင်မှုများ၊ တာဝန်များ၊ အလုပ်များ၊ အသုံးစရိတ်ဘေလ်များ၊ အဆက်အသွယ်များ၊ အဖွဲ့ချတ်၊ ဧည့်သည်နေထိုင်မှုများ၊ အိမ်လမ်းညွှန်များ၊ လွှဲမှတ်စုများ၊ ကိုယ်ပိုင်နှင့် ကုမ္ပဏီလုပ်ငန်းခွင်ကြား ပိုင်ဆိုင်မှုလွှဲပြောင်းခြင်း၊ ပြုပြင်ထိန်းသိမ်းမှတ်တမ်းများ၊ အစီရင်ခံစာများနှင့် ရွေးချယ်နိုင်သော AI အေးဂျင့်။ ငှားရမ်းခြင်း သို့မဟုတ် အလုပ်အကိုင်ဆက်ဆံရေး၏ ပါတီမဟုတ်ပါ။",
    "terms.roles_intro":
      "သန့်ရှင်းရေးနှင့် အခြားအလုပ်အမျိုးအစားများသည် တံဆိပ်များဖြစ်ပြီး သီးခြားအကောင့်အခန်းကဏ္ဍများမဟုတ်။ ကွင်းဆင်းလုပ်ဖော်ကိုင်ဖက်များသည် staff ထိုင်ခုံကို သုံးသည်။ လော့ဂ်အင်တစ်ခုသည် ကုမ္ပဏီတစ်ခုထက်ပို၍ ထိုင်ခုံနှင့် ကိုယ်ပိုင်ပိုင်ဆိုင်မှုစာရင်းကို ထိန်းထားနိုင်သည်။",
    "terms.roles_li1":
      "ပိုင်ရှင်။ ကုမ္ပဏီဆက်တင်များ၊ ပိုင်ဆိုင်မှုများ၊ ဖိတ်ကြားမှုများ၊ တက်ကြွချိန်တွင် ဆော့ဖ်ဝဲငွေတောင်းခံခြင်းနှင့် ပိုင်ဆိုင်မှုလွှဲပြောင်းများကို မိမိကုမ္ပဏီသို့ လက်ခံခြင်း။",
    "terms.roles_li2":
      "မန်နေဂျာ။ ကုမ္ပဏီတစ်ခု သို့မဟုတ် အများတွင် ပိုင်ရှင်နှင့် နေ့စဉ် ops။ အချို့ကုမ္ပဏီဆက်တင်များသည် ပိုင်ရှင်တွင် ရှိသည်။ ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများကို ဖိတ်ကြားမှုဖြင့် ပိုင်ရှင်ထံ လွှဲနိုင်သည်။",
    "terms.roles_li3":
      "Staff။ သတ်မှတ်ထားသော ပိုင်ဆိုင်မှုများ၊ တာဝန်များ၊ အလုပ်များ၊ အဖွဲ့ချတ်နှင့် အသုံးစရိတ်ဘေလ်များ။ ဘေးဘက်ဖောက်သည်များအတွက် ရွေးချယ်နိုင်သော ကိုယ်ပိုင်ပိုင်ဆိုင်မှုစာရင်း။",
    "terms.roles_li5":
      "AI အေးဂျင့်။ ပိုင်ရှင်နှင့် မန်နေဂျာများအတွက်သာ ရွေးချယ်နိုင်သော အကူအညီ၊ တက်ကြွသောလုပ်ငန်းခွင်နှင့် ကန့်သတ်ထားသည်။",
    "terms.owner_li4":
      "ဝန်ထမ်းများကို စိစစ်ပါ၊ အလုပ်ကို ကြီးကြပ်ပါ၊ ဧည့်သည်ဒေတာကို တရားဝင်ကိုင်တွယ်ပါ။ မန်နေဂျာများသည် ops ဝင်ရောက်ခွင့်ကို မျှဝေသည်။ ကုမ္ပဏီဆက်တင်များနှင့် စာရင်းထိန်းချုပ်မှုအချို့သည် ပိုင်ရှင်တွင် ရှိသည်။ ပိုင်ဆိုင်မှုလွှဲပြောင်းကို လက်ခံခြင်းသည် ထိုပိုင်ဆိုင်မှုများနှင့် ဆက်စပ် ops မှတ်တမ်းများကို သင့်ကုမ္ပဏီလုပ်ငန်းခွင်သို့ ရွှေ့သည်။",
    "privacy.updated": "Pulse Flow · နောက်ဆုံးအပ်ဒိတ်: ၂၉ အောက်တိုဘာ ၂၀၂၆",
    "privacy.collect_li1":
      "အကောင့်ဒေတာ။ အမည်၊ အီးမေးလ်၊ အခန်းကဏ္ဍ၊ အဖွဲ့အစည်းအသင်းဝင်မှုများနှင့် ရွေးချယ်နိုင်သော ပရိုဖိုင်အသေးစိတ်။",
    "privacy.collect_li2":
      "လုပ်ငန်းဒေတာ။ ပိုင်ဆိုင်မှုများ (ဓာတ်ပုံနှင့် ကြော်ငြာလင့်ခ်များအပါအဝင်)၊ တာဝန်များ၊ အလုပ်များ၊ အဆက်အသွယ်များ၊ အဖွဲ့ချတ်၊ အသုံးစရိတ်ဘေလ်နှင့် ပြေစာများ၊ အစီရင်ခံစာများ၊ ဧည့်သည်နေထိုင်မှုများ၊ အိမ်လမ်းညွှန်များ၊ ပိုင်ဆိုင်မှုအသေးစိတ်နှင့် ဝင်ရောက်ခွင့်အချက်အလက်၊ ပြုပြင်ထိန်းသိမ်းမှတ်တမ်းများ၊ ပိုင်ဆိုင်မှုလွှဲဖိတ်ကြားမှုများနှင့် တင်သွင်းထားသော နေထိုင်မှုနှင့်အတူ ရွေးချယ်နိုင်သော ပြက္ခဒိန်တင်ပို့လင့်ခ်များ။",
    "privacy.who_li1":
      "ပိုင်ရှင်နှင့် မန်နေဂျာများသည် မိမိတို့ပါဝင်သော ကုမ္ပဏီလုပ်ငန်းခွင်တစ်ခုစီရှိ ဒေတာကို မြင်ရသည်။ ဝန်ထမ်းအလုပ်နှင့် ဘေလ်များ၊ ဧည့်သည်နေထိုင်မှုများ၊ Support ချတ်နှင့် အပ်ငွေမှတ်တမ်းများအပါအဝင်။ ကုမ္ပဏီပြောင်းခြင်းသည် အခြားကုမ္ပဏီစာရင်းကို မဖော်ပြပါ။",
    "privacy.who_li2":
      "Staff သည် ပရိုဖိုင်၊ သတ်မှတ်ထားသော ပိုင်ဆိုင်မှုများ၊ တာဝန်များ၊ အလုပ်များ၊ အဖွဲ့ချတ်နှင့် ပေးပို့သောဘေလ်များကို မြင်ရသည်။ တင်ထားသော ပြေစာနှင့် ပိုင်ဆိုင်မှုဓာတ်ပုံများကို ကလောက်ဒ်တွင် သိမ်းသည်။ ကိုယ်ပိုင်ပိုင်ဆိုင်မှုများသည် ကုမ္ပဏီသို့ လွှဲသည်အထိ ကိုယ်ပိုင်လုပ်ငန်းခွင်တွင် ရှိနေသည်။",
    "privacy.who_li5":
      "ဖိတ်ကြားမှုများနှင့် လွှဲပြောင်းမှုများ။ တစ်ဦးကို ဖိတ်သောအခါ သို့မဟုတ် ပိုင်ဆိုင်မှုလွှဲပို့သောအခါ သက်ဆိုင်သောကုမ္ပဏီများအတွက် ဖိတ်ကြားမှု၊ အီးမေးလ်နှင့် ပါဝင်ခြင်း သို့မဟုတ် လက်ခံမှတ်တမ်းကို သိမ်းသည်။",
    "privacy.use_li2":
      "သင်အသုံးပြုသော အင်္ဂါရပ်များကို ပေးပြီး ကုမ္ပဏီနှင့် ကိုယ်ပိုင်လုပ်ငန်းခွင်များကို တစ်ခုနှင့်တစ်ခု သီးခြားထားရန်",
  },
});

for (const [locale, map] of Object.entries(patches)) {
  const file = path.join(root, "i18n", `${locale}.json`);
  const dict = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [key, value] of Object.entries(map)) {
    const clean = value.replace(/[—–]/g, ", ");
    set(dict, key, clean);
  }
  fs.writeFileSync(file, JSON.stringify(dict, null, 2) + "\n");
  console.log("patched", locale, Object.keys(map).length);
}
