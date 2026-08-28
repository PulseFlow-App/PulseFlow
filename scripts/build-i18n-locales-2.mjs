/**
 * Remaining locales: it, ru, th, my, he
 * Run: node scripts/build-i18n-locales-2.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const en = JSON.parse(fs.readFileSync(path.join(root, "i18n/en.json"), "utf8"));

function deepMerge(base, over) {
  if (over === undefined) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return over;
  const out = { ...base };
  for (const k of Object.keys(over)) out[k] = deepMerge(base[k], over[k]);
  return out;
}

function write(locale, overlay) {
  fs.writeFileSync(
    path.join(root, `i18n/${locale}.json`),
    JSON.stringify(deepMerge(en, overlay), null, 2) + "\n",
  );
  console.log("wrote", locale);
}

write("it", {
  nav: { skip: "Vai al contenuto", open_app: "Apri app", language: "Lingua" },
  footer: {
    tagline: "Il polso delle tue operazioni di affitto",
    home: "Home",
    plans: "Piani",
    terms: "Termini",
    privacy: "Privacy",
    app: "App",
  },
  demo: {
    eyebrow: "Demo",
    title: "Provalo tu",
    lead: "Scegli un ruolo. I dati di accesso sono già compilati.",
    account_label: "Account demo",
    owner: "Proprietario",
    employee: "Dipendente",
    manager: "Manager",
    owner_login: "Login demo proprietario",
    employee_login: "Login demo dipendente",
    email: "Email",
    password: "Password",
    open_login: "Apri login demo",
    open_demo: "Apri demo",
    scan: "Scansiona per accedere",
    qr_alt: "QR code al login demo precompilato",
    feature_dot: "Mostra funzione {n}",
  },
  home: {
    meta_title: "Pulse Flow - Il polso delle tue operazioni di affitto",
    meta_description:
      "Pulse Flow tiene stato delle proprietà, lavori, contatti e fatture in un polso condiviso per proprietari, manager e team sul campo.",
    og_description: "Il polso delle tue operazioni di affitto",
    eyebrow: "Nel polso",
    headline: "Pensato per l'ops degli affitti,<br />non per <em>liste generiche.</em>",
    sub: "Proprietà, lavori, contatti e fatture: un polso condiviso tra te e il tuo team, live su ogni schermo.",
    cta: "Apri Pulse Flow",
    swipe: "Scorri le card",
    features_label: "Funzioni del prodotto",
    slides_label: "Slide delle funzioni",
    card_properties: "Proprietà",
    card_properties_desc:
      "Stato, pin sulla mappa, note e una foto così lo staff riconosce il posto a colpo d'occhio.",
    card_jobs: "Lavori",
    card_jobs_desc:
      "Appuntamenti con finestre chiare e conferma letto e accettato dal team.",
    card_contacts: "Contatti",
    card_contacts_desc:
      "Pulizie, idraulici ed elettricisti: un tap per chiamare o scrivere su LINE o WhatsApp.",
    card_bills: "Fatture",
    card_bills_desc:
      "Invia una spesa, il proprietario approva, tutti vedono il totale in tempo reale.",
    why_eyebrow: "Perché questa app",
    why_title: "Perché ti serve questa app?",
    why_lead:
      "Scegli il posto che corrisponde a come gestisci gli affitti. Apri la guida del tuo ruolo.",
    audience_owner_title: "Sei un proprietario?",
    audience_owner_desc:
      "Vedi occupazione, lavoro urgente e spese senza chiamare per un aggiornamento.",
    audience_owner_cta: "Apri la guida proprietari",
    audience_manager_title: "Sei un property manager?",
    audience_manager_desc:
      "Ops quotidiane, report per i proprietari e passaggi di consegne in un posto solo.",
    audience_manager_cta: "Apri la guida manager",
    audience_staff_title: "Lavori su poche proprietà?",
    audience_staff_desc:
      "Lavori, Letto e accettato e proprietà assegnate sul telefono.",
    audience_staff_cta: "Apri la guida staff",
    plan_eyebrow: "Piani",
    plan_title: "Personale è gratis. Azienda sblocca il team.",
    plan_lead:
      "Il solo resta gratis. Il piano azienda aggiunge inviti, proprietà assegnate, chat, prenotazione lavori e reputazione del team.",
    plan_cta: "Vedi Free e Full →",
    close_title: "Metti un polso su ogni giorno di affitto.",
    close_lead:
      "Apri l'app, invita il team e gestisci il prossimo turnover da un solo posto.",
  },
  owners: {
    meta_title: "Per i proprietari · Pulse Flow",
    meta_description:
      "Sai cosa succede sulle tue proprietà. Attività, staff, fatture, manutenzione e check-in in un posto solo.",
    og_title: "Pulse Flow per i proprietari",
    og_description:
      "Sai cosa succede sulle tue proprietà. Attività, staff, fatture e check-in in un posto solo.",
    badge: "Per i proprietari",
    headline: "Sai cosa succede sulle tue proprietà.",
    sub: "Attività, staff, fatture, manutenzione e check-in in un posto solo.",
    cta_start: "Inizia con Pulse Flow",
    cta_demo: "Prova la demo",
    hero_alt: "Home proprietario con occupazione, task urgenti e check-in",
    t1_num: "01 · Panoramica",
    t1_title: "Vedi tutto a colpo d'occhio",
    t1_desc:
      "Occupazione, task urgenti e check-in in arrivo aggiornati live dal manager in loco. Sai cosa richiede attenzione senza aprire una chat.",
    t1_alt1: "Dashboard con readiness ops e stati delle proprietà",
    t1_alt2: "Task urgenti e check-in di questa settimana",
    t2_num: "02 · Proprietà",
    t2_title: "Ogni proprietà, stato e date del soggiorno",
    t2_desc:
      "Prima l'inventario azienda, poi la tua lista personale. Ogni card mostra occupazione, check-in/out e posizione: tu e il manager condividete la stessa immagine, senza foglio di calcolo.",
    t2_alt: "Elenco proprietà con stato, date e posizione",
    t3_num: "03 · Attività",
    t3_title: "Ogni task ha un responsabile",
    t3_desc:
      "Ogni task ha proprietà, scadenza e persona. Filtra per Mie o Urgenti per vedere cosa conta ora.",
    t3_alt: "Elenco task con proprietà, scadenza e assegnatario",
    t4_num: "04 · Ordini di lavoro",
    t4_title: "Invia lavori chiari. Seguili.",
    t4_desc:
      "Invia i dettagli: cosa, dove e quando. Contatta con chiamata, WhatsApp o LINE e vedi quando qualcuno è stato raggiunto.",
    t4_alt1: "Contatti con Ordina, Chiama e WhatsApp",
    t4_alt2: "Modulo ordine con cosa, dove e quando",
    t5_num: "05 · Conferme",
    t5_title: "Sai cosa è stato visto e accettato",
    t5_desc:
      "Lo staff conferma ogni lavoro con Letto e accettato prima dell'assegnazione. Fatture e conferme restano in Notifiche.",
    t5_alt1: "Chat di team con card ordine di servizio",
    t5_alt2: "Notifiche con fatture e conferme lavori",
    t6_num: "06 · Finanze",
    t6_title: "Vedi quanto spendi",
    t6_desc:
      "Filtra per periodo, proprietà o categoria. Vedi totale, pagato e in sospeso. Approva con un tap.",
    t6_alt1: "Finanze con totale, pagato e in sospeso",
    t6_alt2: "Fatture in sospeso con Segna pagato",
    t7_num: "07 · Performance",
    t7_title: "Sai chi consegna",
    t7_desc:
      "Valuta staff e fornitori ogni settimana. Costruisci uno storico e vedi chi tenere, rinnovare o sostituire.",
    t7_alt1: "Stelle settimanali per il team",
    t7_alt2: "Classifica aziendale per valutazione",
    close_title: "Apri l'app. Vedi la giornata.",
  },
  employees: {
    meta_title: "Per i property manager · Pulse Flow",
    meta_description:
      "Gestisci le ops quotidiane degli affitti da un solo polso. Proprietà, task, ordini, fatture e performance del team in un posto.",
    og_title: "Pulse Flow per i property manager",
    og_description:
      "Coordina proprietà, lavori, fornitori e team da un polso ops condiviso.",
    badge: "Per i property manager",
    headline: "Guida la giornata senza annegare nella chat.",
    sub: "Occupazione, lavoro urgente, check-in e fatture: un polso tra te, i proprietari e il team sul campo.",
    cta_start: "Inizia con Pulse Flow",
    cta_demo: "Prova la demo",
    hero_alt: "Home manager con readiness, occupazione e task urgenti",
    t1_num: "01 · Panoramica",
    t1_title: "Tutto il caldo di oggi su uno schermo",
    t1_desc: "Niente ricostruire il piano su WhatsApp ogni mattina.",
    t1_alt1: "Home manager con score di readiness e conteggi stato",
    t1_alt2: "Task urgenti, calendario check-in e volume settimanale",
    t2_num: "02 · Proprietà",
    t2_title: "Ogni villa, stato e date in un elenco",
    t2_desc: "Tu e il proprietario vedete la stessa immagine, senza foglio di calcolo.",
    t2_alt: "Elenco ville con stato, date e posizione",
    t3_num: "03 · Attività",
    t3_title: "Ogni task ha responsabile, scadenza, proprietà",
    t3_desc: "Filtra Mie o Urgenti e sai cosa fare dopo.",
    t3_alt: "Elenco task con proprietà, scadenza e assegnatario",
    t4_num: "04 · Ordini di lavoro",
    t4_title: "Invia il lavoro una volta, completo",
    t4_desc:
      "Chiama, WhatsApp o LINE dalla card e vedi chi è stato davvero raggiunto, oppure aggiungi lo staff all'app.",
    t4_alt1: "Contatti con Ordina, Chiama e WhatsApp",
    t4_alt2: "Modulo ordine con cosa, dove e quando",
    t5_num: "05 · Conferme",
    t5_title: "Lo staff vede il lavoro, lo accetta in app e lo prende",
    t5_desc: "Ogni conferma è registrata, niente si perde in chat.",
    t5_alt1: "Chat di team con card ordine di servizio",
    t5_alt2: "Notifiche con fatture e conferme lavori",
    t6_num: "06 · Finanze",
    t6_title: "Totali in sospeso e Segna pagato in un elenco",
    t6_desc: "Niente più scavi tra le foto in chat per una ricevuta.",
    t6_alt: "Elenco fatture con totale in sospeso e Segna pagato",
    t7_num: "07 · Performance",
    t7_title: "Le valutazioni settimanali costruiscono uno storico reale",
    t7_desc: "Sai chi tenere, rinnovare o sostituire.",
    t7_alt1: "Stelle settimanali per il team",
    t7_alt2: "Classifica aziendale per valutazione",
    close_title: "Apri l'app. Guida la giornata.",
  },
  staff: {
    meta_title: "Per lo staff sul campo · Pulse Flow",
    meta_description:
      "Vedi proprietà e lavori assegnati sul telefono. Letto e accettato, segna fatto, invia fatture, senza scavare nei gruppi chat.",
    og_title: "Pulse Flow per lo staff sul campo",
    og_description:
      "Proprietà assegnate, lavori chiari, Letto e accettato e fatture sul telefono.",
    badge: "Per lo staff sul campo",
    headline: "I tuoi lavori, le tue proprietà, su uno schermo di telefono.",
    sub: "Smetti di cercare l'ultima istruzione in un gruppo. Apri l'app e vedi cosa è tuo oggi.",
    extra:
      "Accetta con Letto e accettato, segna il lavoro fatto, invia ricevute e resta sullo stesso polso di proprietari e manager, nella lingua in cui lavori davvero.",
    cta_start: "Inizia con Pulse Flow",
    cta_demo: "Prova la demo",
    hero_alt: "Elenco task con lavori assegnati, orari e proprietà",
    t1_num: "01 · Solo la tua fetta",
    t1_title: "Proprietà assegnate, non tutto il portafoglio",
    t1_desc:
      "Vedi le proprietà che gestisci. Stato, check-in e lavoro aperto restano sulla tua rotta, senza scorrere i lavori di altri.",
    t1_alt1: "Home incentrata su stato proprietà e lavoro urgente",
    t1_alt2: "Task urgenti per la giornata",
    t2_num: "02 · Lavori che restano chiari",
    t2_title: "Cosa, dove e quando, prima di partire",
    t2_desc:
      "Ogni lavoro mostra proprietà, finestra oraria e dettagli. Niente più mezzi messaggi tipo «pulisci quella vicino alla spiaggia». Apri Lavori, conferma e parti.",
    t2_alt: "Elenco lavori e task con responsabilità chiara",
    t3_num: "03 · Letto e accettato",
    t3_title: "Un tap così il team sa che l'hai visto",
    t3_desc:
      "I nuovi ordini attendono il tuo Letto e accettato. Così proprietari e manager sanno che sei stato raggiunto, e tu ti proteggi se il brief cambia a metà giornata.",
    t3_alt1: "Chat di team con ordine di servizio da accettare",
    t3_alt2: "Notifiche per nuovi lavori e aggiornamenti",
    t4_num: "04 · Segna fatto",
    t4_title: "Chiudi il lavoro e lascia che l'ufficio si aggiorni",
    t4_desc:
      "Quando segni fatto, proprietari e manager ricevono notifica e una nota arriva in chat. Niente messaggio «fatto» separato in tre gruppi.",
    t4_alt: "Dettaglio ordine di servizio con orario e posizione",
    t5_num: "05 · Solo le tue fatture",
    t5_title: "Invia ricevute senza condividere tutto il budget",
    t5_desc:
      "Foto della ricevuta, importo, invio. Vedi solo ciò che hai inviato: totali e approvazioni restano a proprietari e manager.",
    t5_alt1: "Schermata fatture per l'invio spese",
    t5_alt2: "Dettaglio fattura con importo e stato",
    t6_num: "06 · La tua reputazione",
    t6_title: "Il buon lavoro compare sul tuo profilo pubblico",
    t6_desc:
      "Le stelle settimanali dei proprietari costruiscono una pagina di reputazione condividibile. Quello storico viaggia con te: utile per il prossimo contratto o un posto più forte nel team.",
    t6_alt1: "Endorsement e valutazioni a stelle",
    t6_alt2: "Classifica della performance del team",
    demo_eyebrow: "Demo · Vedila in azione",
    demo_title: "Prova la demo ora",
    demo_lead:
      "Apri il posto dipendente per passare tra lavori, accordi e proprietà assegnate in un flusso formato telefono.",
    demo_note: "Apri il login demo, conferma i campi, poi accedi.",
    close_title:
      "Conosci i lavori di oggi. Conferma ogni brief. Chiudi il cerchio quando hai finito.",
  },
  subscription: {
    meta_title: "Piani · Pulse Flow",
    meta_description:
      "Gratis per uso personale e staff invitato. Full per proprietari azienda: un abbonamento copre il team, incluso il reporting manager.",
    eyebrow: "Piani",
    headline: "Free, o Full.",
    sub: "Usalo da solo senza costi. Paga quando gestisci lo spazio azienda e inviti un team.",
    tiers_label: "Piani",
    free_name: "Free",
    free_who:
      "Gratis per sempre per il tuo uso e per lo staff che un'azienda invita.",
    free_li1: "Le tue proprietà, attività, fatture e contatti",
    free_li2: "Staff invitato: proprietà assegnate, lavori, fatture, chat di team",
    free_cta: "Inizia gratis",
    full_name: "Full",
    full_who: "Per i proprietari. Paga una volta, tutta l'azienda ce l'ha.",
    full_li1: "Prova 30 giorni, poi un abbonamento proprietario",
    full_li2: "Invita team, assegna proprietà, chat di team",
    full_li3: "Ordini di servizio, endorsement, finanze proprietario",
    full_included:
      "I manager invitati hanno reporting completo automaticamente. Nessun costo per posto.",
    full_cta: "Avvia prova azienda",
    join: "Già invitato in un team? Entra con il tuo link",
    referral_title: "Invita 5 persone → 1 anno Full gratis",
    referral_lead:
      "Copia il link referral nel Profilo. Puoi invitare nella tua azienda o semplicemente all'app: entrambi contano.",
    demo_title: "Demo",
    demo_lead: "Login proprietario o dipendente precompilato.",
    close_title: "Il tuo piano vive nel Profilo",
    sign_in: "Accedi",
  },
});

write("ru", {
  nav: {
    skip: "Перейти к содержимому",
    open_app: "Открыть приложение",
    language: "Язык",
  },
  footer: {
    tagline: "Всё под контролем. Каждый день.",
    home: "Главная",
    plans: "Тарифы",
    terms: "Условия",
    privacy: "Конфиденциальность",
    app: "Приложение",
  },
  demo: {
    eyebrow: "Демо",
    title: "Попробуйте сами",
    lead: "Выберите роль. Данные для входа уже заполнены.",
    account_label: "Демо-аккаунт",
    owner: "Владелец",
    employee: "Сотрудник",
    manager: "Менеджер",
    owner_login: "Демо-вход владельца",
    employee_login: "Демо-вход сотрудника",
    email: "Email",
    password: "Пароль",
    open_login: "Открыть демо-вход",
    open_demo: "Открыть демо",
    scan: "Отсканируйте для входа",
    qr_alt: "QR-код для демо-входа с заполненными полями",
    feature_dot: "Показать функцию {n}",
  },
    home: {
    meta_title: "Pulse Flow - всё, что происходит с арендой вашей собственности, в одном месте",
    meta_description:
      "Объекты, задачи, контакты и счета: всё для ежедневной работы. Данные обновляются сразу, на любом устройстве.",
    og_description: "Пульс вашей работы каждый день.",
    eyebrow: "В пульсе",
    headline: "Всё, что происходит с арендой вашей собственности - в одном месте.",
    sub:
      "Объекты, задачи, контакты и счета: всё, что нужно вам и команде для ежедневной работы. Данные обновляются сразу, на любом устройстве.",
    cta: "Открыть Pulse Flow",
    swipe: "Листайте карточки",
    features_label: "Возможности продукта",
    slides_label: "Слайды функций",
    card_properties: "Объекты",
    card_properties_desc:
      "Статус, расположение, заметки и фото - вся информация об объекте всегда под рукой.",
    card_jobs: "Задачи",
    card_jobs_desc:
      "Чёткие задачи со сроком выполнения и подтверждением «Прочитано и согласовано» от сотрудника.",
    card_contacts: "Контакты",
    card_contacts_desc:
      "Уборка, сантехника, электрика - позвонить или написать в LINE или WhatsApp можно сразу.",
    card_bills: "Счета",
    card_bills_desc:
      "Сотрудник отправляет расход, владелец подтверждает - сумма и статус сразу видны команде.",
    why_eyebrow: "Ваша роль",
    why_title: "Зачем вам Pulse Flow?",
    why_lead:
      "Выберите свою роль и посмотрите, как приложение помогает именно в вашей работе.",
    audience_owner_title: "Владелец недвижимости",
    audience_owner_desc:
      "Контролируйте загрузку, срочные задачи и расходы, не звоня каждый раз за обновлениями.",
    audience_owner_cta: "Открыть гид для владельцев",
    audience_manager_title: "Управляющий",
    audience_manager_desc:
      "Ежедневные операции, отчёты для владельцев и передача смен - всё в одном месте.",
    audience_manager_cta: "Открыть гид для управляющих",
    audience_staff_title: "Персонал",
    audience_staff_desc:
      "Задачи, подтверждения и закреплённые объекты - всё необходимое в телефоне.",
    audience_staff_cta: "Открыть гид для персонала",
    plan_eyebrow: "Тарифы",
    plan_title: "Личный аккаунт - бесплатно.",
    plan_lead:
      "Корпоративный план добавляет работу с командой: приглашения сотрудников, объекты, чат, заказы работ и рейтинг команды.",
    plan_cta: "Смотреть Free и Full →",
    close_title: "Пульс вашей работы каждый день.",
    close_lead:
      "Откройте приложение, пригласите команду и управляйте следующей уборкой между заездами прямо из Pulse Flow.",
  },
  owners: {
    meta_title: "Для владельцев · Pulse Flow",
    meta_description:
      "Знайте, что происходит на объектах. Задачи, персонал, счета, обслуживание и заезды — в одном месте.",
    og_title: "Pulse Flow для владельцев",
    og_description:
      "Знайте, что происходит на объектах. Задачи, персонал, счета и заезды — в одном месте.",
    badge: "Для владельцев",
    headline: "Знайте, что происходит на ваших объектах.",
    sub: "Задачи, персонал, счета, обслуживание и заезды — в одном месте.",
    cta_start: "Начать с Pulse Flow",
    cta_demo: "Попробовать демо",
    hero_alt: "Домашний экран владельца: занятость, срочные задачи и заезды",
    t1_num: "01 · Обзор",
    t1_title: "Всё с одного взгляда",
    t1_desc:
      "Занятость, срочные задачи и ближайшие заезды обновляет на месте ваш менеджер. Знайте, что требует внимания, не открывая чат.",
    t1_alt1: "Дашборд с готовностью ops и статусами объектов",
    t1_alt2: "Срочные задачи и заезды на этой неделе",
    t2_num: "02 · Объекты",
    t2_title: "Каждый объект, статус и даты проживания",
    t2_desc:
      "Сначала инвентарь компании, затем ваш личный список. На каждой карточке — занятость, заезд/выезд и локация: вы и менеджер видите одну картину без таблицы.",
    t2_alt: "Список объектов со статусом, датами и локацией",
    t3_num: "03 · Задачи",
    t3_title: "У каждой задачи есть ответственный",
    t3_desc:
      "У каждой задачи есть объект, срок и человек. Фильтруйте «Мои» или «Срочные», чтобы видеть, что важно сейчас.",
    t3_alt: "Список задач с объектом, сроком и исполнителем",
    t4_num: "04 · Наряды",
    t4_title: "Отправляйте понятные работы. Отслеживайте их.",
    t4_desc:
      "Отправьте детали: что, где и когда. Свяжитесь звонком, WhatsApp или LINE и видьте, когда человека достигли.",
    t4_alt1: "Контакты с действиями Заказать, Позвонить и WhatsApp",
    t4_alt2: "Форма заказа: что, где и когда",
    t5_num: "05 · Подтверждения",
    t5_title: "Знайте, что увидели и приняли",
    t5_desc:
      "Сотрудники подтверждают каждую работу «прочитано и согласовано» до назначения. Счета и подтверждения остаются в Уведомлениях.",
    t5_alt1: "Командный чат с карточкой сервисного заказа",
    t5_alt2: "Уведомления со счетами и подтверждениями работ",
    t6_num: "06 · Финансы",
    t6_title: "Видьте, сколько тратите",
    t6_desc:
      "Фильтр по периоду, объекту или категории. Итог, оплачено и ожидает. Утверждайте счета одним нажатием.",
    t6_alt1: "Финансы: итог, оплачено и ожидает",
    t6_alt2: "Ожидающие счета с «Отметить оплаченным»",
    t7_num: "07 · Результативность",
    t7_title: "Знайте, кто выполняет",
    t7_desc:
      "Оценивайте персонал и подрядчиков еженедельно. Стройте историю и решайте, кого оставить, продлить или заменить.",
    t7_alt1: "Еженедельные звёздные оценки команды",
    t7_alt2: "Рейтинг компании по оценкам",
    close_title: "Откройте приложение. Увидьте день.",
  },
  employees: {
    meta_title: "Для управляющих · Pulse Flow",
    meta_description:
      "Ведите ежедневный арендный ops из одного пульса. Объекты, задачи, наряды, счета и результативность команды — в одном месте.",
    og_title: "Pulse Flow для управляющих",
    og_description:
      "Координируйте объекты, работы, подрядчиков и команду из общего ops-пульса.",
    badge: "Для управляющих",
    headline: "Ведите день, не тоня в чатах.",
    sub: "Занятость, срочная работа, заезды и счета — один пульс между вами, владельцами и полевой командой.",
    cta_start: "Начать с Pulse Flow",
    cta_demo: "Попробовать демо",
    hero_alt: "Домашний экран менеджера: готовность, занятость и срочные задачи",
    t1_num: "01 · Обзор",
    t1_title: "Всё горячее сегодня на одном экране",
    t1_desc: "Не нужно каждое утро заново собирать план в WhatsApp.",
    t1_alt1: "Домашний экран менеджера с оценкой готовности и счётчиками статусов",
    t1_alt2: "Срочные задачи, календарь заездов и недельный объём",
    t2_num: "02 · Объекты",
    t2_title: "Каждая вилла, статус и даты в одном списке",
    t2_desc: "Вы и владелец видите одну картину — без таблицы.",
    t2_alt: "Список вилл со статусом, датами и локацией",
    t3_num: "03 · Задачи",
    t3_title: "У каждой задачи есть ответственный, срок, объект",
    t3_desc: "Фильтр «Мои» или «Срочные» — и ясно, что делать дальше.",
    t3_alt: "Список задач с объектом, сроком и исполнителем",
    t4_num: "04 · Наряды",
    t4_title: "Отправьте работу один раз, полностью",
    t4_desc:
      "Звонок, WhatsApp или LINE прямо с карточки — и видно, кого реально достигли. Или добавьте персонал в приложение.",
    t4_alt1: "Контакты с действиями Заказать, Позвонить и WhatsApp",
    t4_alt2: "Форма заказа: что, где и когда",
    t5_num: "05 · Подтверждения",
    t5_title: "Сотрудники видят работу, принимают в приложении и берут её",
    t5_desc: "Каждое подтверждение записано — ничего не теряется в чате.",
    t5_alt1: "Командный чат с карточкой сервисного заказа",
    t5_alt2: "Уведомления со счетами и подтверждениями работ",
    t6_num: "06 · Финансы",
    t6_title: "Ожидающие суммы и «Отметить оплаченным» в одном списке",
    t6_desc: "Больше не искать чеки в фото из чата.",
    t6_alt: "Список счетов с ожидающей суммой и «Отметить оплаченным»",
    t7_num: "07 · Результативность",
    t7_title: "Еженедельные оценки строят реальную историю",
    t7_desc: "Знайте, кого оставить, продлить или заменить.",
    t7_alt1: "Еженедельные звёздные оценки команды",
    t7_alt2: "Рейтинг компании по оценкам",
    close_title: "Откройте приложение. Ведите день.",
  },
  staff: {
    meta_title: "Для полевого персонала · Pulse Flow",
    meta_description:
      "Назначенные объекты и задачи на телефоне. «Прочитано и согласовано», отметьте готово, отправьте счета — без поиска в чат-группах.",
    og_title: "Pulse Flow для полевого персонала",
    og_description:
      "Назначенные объекты, понятные задачи, «прочитано и согласовано» и счета на телефоне.",
    badge: "Для полевого персонала",
    headline: "Ваши задачи, ваши объекты — на одном экране телефона.",
    sub: "Хватит искать последнюю инструкцию в группе. Откройте приложение и увидьте, что ваше сегодня.",
    extra:
      "Принимайте работы «прочитано и согласовано», отмечайте готово, отправляйте чеки и оставайтесь в одном пульсе с владельцами и менеджерами — на языке, на котором вы реально работаете.",
    cta_start: "Начать с Pulse Flow",
    cta_demo: "Попробовать демо",
    hero_alt: "Список задач с назначенными работами, временем и объектами",
    t1_num: "01 · Только ваш срез",
    t1_title: "Назначенные объекты, не весь портфель",
    t1_desc:
      "Вы видите объекты, которыми занимаетесь. Статус, заезды и открытая работа сфокусированы на вашем маршруте — без чужих задач в ленте.",
    t1_alt1: "Домашний экран со статусом объектов и срочной работой",
    t1_alt2: "Срочные задачи на день",
    t2_num: "02 · Задачи, которые остаются ясными",
    t2_title: "Что, где и когда — до выезда",
    t2_desc:
      "В каждой работе — объект, окно времени и детали. Больше никаких полусообщений вроде «убери ту у пляжа». Откройте Задачи, подтвердите и езжайте.",
    t2_alt: "Список работ и задач с ясной ответственностью",
    t3_num: "03 · Прочитано и согласовано",
    t3_title: "Одно подтверждение - команда знает, что вы увидели",
    t3_desc:
      "Новые сервисные заказы ждут вашего «прочитано и согласовано». Так владельцы и менеджеры знают, что вас достигли — и вы защищены, если бриф меняется днём.",
    t3_alt1: "Командный чат с сервисным заказом к согласованию",
    t3_alt2: "Уведомления о новых работах и обновлениях",
    t4_num: "04 · Отметить готово",
    t4_title: "Закройте работу — офис подтянется",
    t4_desc:
      "Когда вы отмечаете готово, владельцы и менеджеры получают уведомление, а заметка попадает в командный чат. Не нужно отдельно писать «готово» в трёх группах.",
    t4_alt: "Детали сервисного заказа с расписанием и локацией",
    t5_num: "05 · Только ваши счета",
    t5_title: "Отправляйте чеки, не раскрывая весь бюджет",
    t5_desc:
      "Сфотографируйте чек, укажите сумму, отправьте. Вы видите только свои подачи — итоги и утверждения у владельцев и менеджеров.",
    t5_alt1: "Экран счетов для отправки расходов",
    t5_alt2: "Детали счёта с суммой и статусом",
    t6_num: "06 · Ваша репутация",
    t6_title: "Хорошая работа видна в публичном профиле",
    t6_desc:
      "Еженедельные звёзды от владельцев собирают страницу репутации, которой можно делиться. Эта история идёт с вами — полезно для следующего контракта или более сильного места в команде.",
    t6_alt1: "Рекомендации и звёздные оценки",
    t6_alt2: "Рейтинг результативности команды",
    demo_eyebrow: "Демо · Смотрите в деле",
    demo_title: "Попробуйте демо сейчас",
    demo_lead:
      "Откройте место сотрудника и пройдите задачи, согласия и назначенные объекты в потоке размера телефона.",
    demo_note: "Откройте демо-вход, проверьте поля и войдите.",
    close_title:
      "Знайте задачи на сегодня. Подтверждайте каждый бриф. Замыкайте цикл, когда закончили.",
  },
  subscription: {
    meta_title: "Тарифы · Pulse Flow",
    meta_description:
      "Бесплатно для личного использования и приглашённого персонала. Full для владельцев компании — одна подписка на всю команду, включая отчётность менеджера.",
    eyebrow: "Тарифы",
    headline: "Free или Full.",
    sub: "Пользуйтесь сами бесплатно. Платите, когда ведёте корпоративное пространство и приглашаете команду.",
    tiers_label: "Тарифы",
    free_name: "Free",
    free_who:
      "Бесплатно навсегда для личного использования и для персонала, которого приглашает компания.",
    free_li1: "Ваши объекты, задачи, счета и контакты",
    free_li2: "Приглашённый персонал: назначенные объекты, работы, счета, командный чат",
    free_cta: "Начать бесплатно",
    full_name: "Full",
    full_who: "Для владельцев. Платите один раз — вся компания получает доступ.",
    full_li1: "30-дневный триал, затем одна подписка владельца",
    full_li2: "Пригласить команду, назначить объекты, командный чат",
    full_li3: "Сервисные заказы, рекомендации, финансы владельца",
    full_included:
      "Приглашённые менеджеры получают полную отчётность автоматически. Без платы за место.",
    full_cta: "Начать корпоративный триал",
    join: "Уже пригласили в команду? Войдите по ссылке",
    referral_title: "Пригласите 5 человек → 1 год Full бесплатно",
    referral_lead:
      "Скопируйте реферальную ссылку в Профиле. Можно пригласить в компанию или просто в приложение — оба случая засчитываются.",
    demo_title: "Демо",
    demo_lead: "Заранее заполненный вход владельца или сотрудника.",
    close_title: "Ваш тариф живёт в Профиле",
    sign_in: "Войти",
  },
});

console.log("it+ru done");
