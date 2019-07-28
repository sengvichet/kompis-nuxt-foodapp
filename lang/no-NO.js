export default {
  landing: {
    hero: {
      title: 'Mer mat, mindre stress',
      join: 'Prøv gratis nå',
      sub_title: 'Umiddelbar tilgang uten kredittkort'
    },
    features: {
      feature1_title: 'Full oversikt',
      feature1_text1: 'Enkel oppgavestyring for deg og dine ansatte',
      feature1_text2: '+ tilgang til alle historiske rapporter om temperaturer, avvik, tiltak osv..',

      feature2_title: 'Klar tale',
      feature2_text1: 'Vi lytter til brukernes ønsker og ideer for å kunne bygge den beste løsningen for deg og din bedrift.',
      feature2_text2: 'Hjelp oss bli best!',

      feature3_title: 'Tilgjengelig',
      feature3_text1: 'Vår app virker på alle flater; iPhone, Mac, PC eller Android',
      feature3_text2: 'kun fordi… det er 2018!'
    },
    pricing: {

      pricing1_title: 'Latterlig billig',
      pricing1_text1: 'Vi vil det skal være lett å lykkes i matbransjen!',
      pricing1_text2: 'Er du en catering kokk eller en matgründer med ide?',
      pricing1_text3: 'Da betaler du kun',
      pricing1_annual_amount: '990 kr i året',
      pricing1_monthly_amount: 'eller 149 kr per måned',

      pricing2_title: 'Enklere hverdag',
      pricing2_text1: 'Er dere bedrift med flere enn to ansatte?',
      pricing2_text2: 'Da kan du enkelt håndtere rutiner, oppgavestyring og ansatte på flere lokasjoner fra din telefon.',
      pricing2_text3: 'Søvnløse netter elimineres for',
      pricing2_annual_amount: '3,500 kr i året',
      pricing2_monthly_amount: 'eller 449 kr per måned',

      pricing3_title: 'Avansert +',
      pricing3_text1: 'Er du en litt større bedrift eller vet hva du ønsker',
      pricing3_text2: 'Ta kontakt for å diskutere muligheter for integrasjoner og samarbeid.',
      pricing3_text3: 'Automatisert arbeidsflyt fra',
      pricing3_annual_amount: '15,000 kr i året',
      pricing3_monthly_amount: 'eller 2,000 kr per måned',


      mva_text: '* priser er eks mva',
    },
    header: {
      login: 'Logg inn',
      register: 'Prøv gratis nå'

    },
    register_form: {

      step1: {
        title: 'Ønsker du en enklere hverdag?',
        input: 'Skriv inn ditt firmanavn her...',
        try_now: 'prøver lykken!'
      },
      step2: {
        title: 'Du er allerede halveis, bekreft dine detaljer for å komme igang:',
        company_name: 'Ditt firmanavn',
        organization_id: 'Ditt organisasjonsnummer',
        post_code: 'Ditt postnummer',
        city: 'Ditt poststed',
        email: 'Email Address',
        first_name: 'Ditt fornavn',
        last_name: 'Ditt etternavn',
        password: 'Ditt passord',
        confirm_password: 'Bekreft ditt passord',
        register: 'Registrer meg som bruker',
        error_already_exists: 'En konto med denne e-post adressen eksisterer allerede',
        error_check_inputs: 'Sjekk at alle feltene er fylt ut'
      },
      step3: {
        title: 'Nesten fremme',
        sub_title1: 'Vi har sendt deg en bekreftelse per e-post for å forsikre oss om at dette er deg.',
        sub_title2: 'Vennligst sjekk din inboks og trykk på linken, så er du i gang!'
      }

    }
  },
  auth: {
    email: 'Din e-post',
    password: 'Passord',
    login: 'Logg inn',
    code: 'Din kode',
    new_password: 'Nytt passord',
    save_new_password: 'Lagre',
    reset_password: 'Resett ditt passord',
    forget_password_text: 'Glemt ditt passord?',
    register_account_text: 'Prøv gratis i dag',
    temporary_password: 'Midlertidige passord',

    confirm: {
      verified: 'Din konto er blitt bekreftet -> vennligst logg inn!',
      error: 'Vi klarer desverre ikke å bekrefte din e-post'
    },
    forget_password: {
      error: 'Vi har sendt deg instruksjoner per e-post. Følger du disse er du tilbake på 1 2 3 '
    },
    complete_forget_password: {
      success: 'Passordet ditt er endret. Logg inn som normalt '
    }
  },

  //
  //    ###    ########  ########
  //   ## ##   ##     ## ##     ##
  //  ##   ##  ##     ## ##     ##
  // ##     ## ########  ########
  // ######### ##        ##
  // ##     ## ##        ##
  // ##     ## ##        ##

  app: {
    header: {
      menu: {
        tasks: 'Dine arbeidsoppgaver',
        reports: 'Historikk & rapporter',
        edit_profile: 'Oppdater din profil',
        signout: 'Logg ut',
        manage_users: 'Brukeradministrasjon',
        switch_user: 'Skift bruker',
        switch_user_page_title: 'Velg din brukerkonto',
        switch_user_new_login: 'Logg inn ny bruker'

      }
    },

    //
    //  ######   ######## ##    ## ######## ########     ###    ##
    // ##    ##  ##       ###   ## ##       ##     ##   ## ##   ##
    // ##        ##       ####  ## ##       ##     ##  ##   ##  ##
    // ##   #### ######   ## ## ## ######   ########  ##     ## ##
    // ##    ##  ##       ##  #### ##       ##   ##   ######### ##
    // ##    ##  ##       ##   ### ##       ##    ##  ##     ## ##
    //  ######   ######## ##    ## ######## ##     ## ##     ## ########

    general: {
      edit: 'Endre: %s',
      user_settings: 'User Settings',
      are_you_sure_delete: 'Ønsker du å slette %s ?',
      are_you_sure_cant_undo: `Er du helt sikker? Det er ikke mulig å angre!`,
      yes_delete: ' Slett i vei!',
      no_delete: 'Nei, de trenger jeg!',
      save: 'Lagre',
      next: 'Neste',
      yes: 'Ja',
      no: 'Nei',
      at: 'hos', // this person 'at' this company
      of: 'av',
      for: 'for',
      cancel: 'Avbryt',
      days_of_the_month: {
        mon: 'Man',
        tue: 'Tir',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lør',
        sun: 'Søn'
      },
      days_of_the_week: {
        mon: 'Mandag',
        tue: 'Tirsdag',
        wed: 'Onsdag',
        thu: 'Torsdag',
        fri: 'Fredag',
        sat: 'Lørdag',
        sun: 'Søndag'
      }
    },

    //
    // ######## #### ##     ## ########
    //    ##     ##  ###   ### ##
    //    ##     ##  #### #### ##
    //    ##     ##  ## ### ## ######
    //    ##     ##  ##     ## ##
    //    ##     ##  ##     ## ##
    //    ##    #### ##     ## ########
    time: {
      on_the: 'den', // on the day of the month
    },

    //
    // ##        #######   ######     ###    ######## ####  #######  ##    ##  ######
    // ##       ##     ## ##    ##   ## ##      ##     ##  ##     ## ###   ## ##    ##
    // ##       ##     ## ##        ##   ##     ##     ##  ##     ## ####  ## ##
    // ##       ##     ## ##       ##     ##    ##     ##  ##     ## ## ## ##  ######
    // ##       ##     ## ##       #########    ##     ##  ##     ## ##  ####       ##
    // ##       ##     ## ##    ## ##     ##    ##     ##  ##     ## ##   ### ##    ##
    // ########  #######   ######  ##     ##    ##    ####  #######  ##    ##  ######



    locations: {
      locations: 'Lokasjoner & utstyr',
      devices: 'Utstyrsliste',
      number_of_devices: 'Du har %s enheter',
      number_of_devices_to_be_updates: 'Lagre temperaturer for ( %s enheter )',
      logged_successfuly: '%s tempereaturer ble lagret',
      one_device_at_least: 'Gjør minst en endring før du lagrer',
      last_time_logged: 'Sist avlest',
      logg_error: 'Vi kan ikke lagre din avlesning. Prøv gjerne igjen. ',
      make_one_change: 'Gjør minst en endring før du lagrer',
      location_deleted: 'Din lokasjon %s er blitt slettet',
      delete_error: 'Vi kan ikke slette denne lokasjonen. Prøv gjerne igjen.',
      location_updated: 'Informasjon om %s er blitt oppdatert',
      update_error: 'Vi kan ikke endre denne lokasjonen. Prøv gjerne igjen.',
      location_added: 'Informasjon om %s er blitt oppdatert',
      add_error: 'Vi kan ikke legge til denne lokasjonen. Prøv gjerne igjen.',
      nothing_to_show: 'Her finnes det ikke stort å vise :)',
      all_good: 'Vi er i rute - er du? :P',
      danger: 'Varsel - dette ser ikke bra ut!',
      add_new_location: 'Legg til ny lokasjon',
      location_name: 'Navn på din lokasjon',
      location: 'Lokasjonbeskrivelse'
    },

    //
    // ########  ######## ##     ## ####  ######  ########  ######
    // ##     ## ##       ##     ##  ##  ##    ## ##       ##    ##
    // ##     ## ##       ##     ##  ##  ##       ##       ##
    // ##     ## ######   ##     ##  ##  ##       ######    ######
    // ##     ## ##        ##   ##   ##  ##       ##             ##
    // ##     ## ##         ## ##    ##  ##    ## ##       ##    ##
    // ########  ########    ###    ####  ######  ########  ######


    devices: {
      devices: 'Utstyrsliste',
      manual_units: 'Temperaturavlesning',
      automatic_units: 'Automatisert avlesning',
      devices_logged: 'Dine temperaturer er blitt oppdatert',
      temperature: 'Temperatur',
      device_type: 'Type utstyr',
      refrigerator: 'Kjøleenhet',
      freezer: 'Fryseenhet',
      dishwasher1: 'Hovedvask',
      dishwasher2: 'Skylletemperatur',
      device_deleted: ' Du har slettet %s',
      delete_error: 'Vi kan ikke slette denne enheten. Prøv gjerne igjen.',
      device_updated: 'Du har oppdatert %s',
      update_error: 'Vi kan ikke endre denne enheten. Prøv gjerne igjen.',
      device_added: 'Din enhet %s er blitt lagt til',
      add_error: 'Vi kan ikke legge til denne enheten. Prøv gjerne igjen.',
      last_logged: ' Sist oppdatert den: ',
      add_new_device: 'Legg til nytt utstyr',
      device_name: 'Navn på denne enheten',
      name: 'Beskrivende navn',
      type: 'Type utstyr',
      error_select_type: 'Vi kan ikke legge til denne enheten uten at du velger type enhet. Prøv  igjen.'

    },


    //  ######  ######## ##    ##  ######   #######  ########   ######
    // ##    ## ##       ###   ## ##    ## ##     ## ##     ## ##    ##
    // ##       ##       ####  ## ##       ##     ## ##     ## ##
    //  ######  ######   ## ## ##  ######  ##     ## ########   ######
    //       ## ##       ##  ####       ## ##     ## ##   ##         ##
    // ##    ## ##       ##   ### ##    ## ##     ## ##    ##  ##    ##
    //  ######  ######## ##    ##  ######   #######  ##     ##  ######

    sensors: {
      sensors: 'Automatisert avlesning',
      historical_temp: " 's historical temperature",
      past_one_hours: 'Past 1 hours',
      past_three_hours: 'Past 3 hours',
      past_six_hours: 'Past 6 hours',
      past_eleven_hours: 'Past 12 hours',
      past_twenty_four_hours: 'Past 24 hours',
      past_seven_days: 'Past 7 days',
      past_fourteen_days: 'Past 14 days',
      past_thirty_days: 'Past 30 days'

    },

    //
    // ######## ##     ##  ######  ######## ########  ######## ####  #######  ##    ##  ######
    // ##        ##   ##  ##    ## ##       ##     ##    ##     ##  ##     ## ###   ## ##    ##
    // ##         ## ##   ##       ##       ##     ##    ##     ##  ##     ## ####  ## ##
    // ######      ###    ##       ######   ########     ##     ##  ##     ## ## ## ##  ######
    // ##         ## ##   ##       ##       ##           ##     ##  ##     ## ##  ####       ##
    // ##        ##   ##  ##    ## ##       ##           ##     ##  ##     ## ##   ### ##    ##
    // ######## ##     ##  ######  ######## ##           ##    ####  #######  ##    ##  ######

    exceptions: {
      deviation_report_title: 'Navn på avvik',
      deviation_description_label: 'Beskriv hendelsen',
      deviation_description_placeholder: 'Beskriv hva som skjedde / forårsaket avviket',
      corrective_measures_label: 'Tiltak utført',
      corrective_measures_placeholder: 'Tiltak som ble utført denne gangen',
      how_solved_label: 'Utbedringer utført for fremtiden',
      how_solved_placeholder: 'Tiltak som forsikrer at man unngår fremtidige avvik',
      exception_added: 'Ditt avvik har blitt lagret',
      add_error: 'Vi kunne ikke lagre ditt avvik. Prøv igjen',
      create_deviation_report: 'Lagre avviksrapport',
      review_comment: 'Skriv din kommentar om dette avviket'
    },

    //
    // ########  ######## ########   #######  ########  ########  ######
    // ##     ## ##       ##     ## ##     ## ##     ##    ##    ##    ##
    // ##     ## ##       ##     ## ##     ## ##     ##    ##    ##
    // ########  ######   ########  ##     ## ########     ##     ######
    // ##   ##   ##       ##        ##     ## ##   ##      ##          ##
    // ##    ##  ##       ##        ##     ## ##    ##     ##    ##    ##
    // ##     ## ######## ##         #######  ##     ##    ##     ######

    reports: {
      todays_reports: "I dag",
      this_weeK_reports: 'Denne uka',
      all_reports: 'Alle',
      no_reports_today: 'Ingen rapporter idag',
      no_reports_this_week: 'Ingen rapporter denne uken',
      no_reports_yet: 'Ingen rapporter enda',
      open_deviation_report: 'Se avviksrapport',
      open_delivery_report: 'Se leveringsrapport',
      open_order_report: 'Open link to order details',
      open_cooldown_report: 'Se ro deg ned',
      create_deviation_report: 'Lag avviksrapport',
      deviation_report: 'Avviksrapport',
      written_by: 'Skrevet av',
      what_happened: 'Hva skjedde? Kort beskrivelse:',
      why_happened: 'Hvorfor skjedde dette? Kort beskrivelse:',
      how_fixed: 'Hvordan ble det tatt hånd om? Kort beskrivelse:',
      reviewed_by: 'Anmeldt av:',
      reviewed_by_comment: 'Anmelderkommentar:',
      not_yet: 'Ikke anmeldt ennå!',
      what_happened_title: 'Hendelse',
      why_happened_title: 'Årsak',
      how_fixed_title: 'Strakstiltak',
      logged_at: 'Lagret den: ',
      temperature_log_report: 'Temperaturrapport',
      was_not_completed: 'ble ikke fullført',
      cleaning_log: 'Renholdsoversikt',
      others_log: 'Andre oppgaver',
      others_log: 'Other things log',
      manufacturer_log: 'Produksjonsrapport',
      ship_log: 'Transportrapport',
      package_log: 'Pakkerapport',
      manufacturing: 'Produksjon',
      shipping: 'Transport',
      packaging: 'Pakking',
      cleaning: 'Renhold',
      temperature_log: 'Temperaturavlesning',
      other_things: 'Andre oppgaver',
      deviations: 'Avvik',
      and_x_others: ' og %s andre',
      delivery: 'Innkommende levering',
      cooldown: 'Ro deg ned',
      keepwarming: 'Hold oppvarming',
      filters: {
        task_types: 'Oppgave type',
        locations: 'Plassering',
        users: 'Fullført av bruker',
        deviations: 'Inneholder avvik',
      }

    },

    //
    // ########    ###     ######  ##    ##  ######
    //    ##      ## ##   ##    ## ##   ##  ##    ##
    //    ##     ##   ##  ##       ##  ##   ##
    //    ##    ##     ##  ######  #####     ######
    //    ##    #########       ## ##  ##         ##
    //    ##    ##     ## ##    ## ##   ##  ##    ##
    //    ##    ##     ##  ######  ##    ##  ######

    tasks: {
      task: 'Oppgave',
      today: 'I dag',
      this_week: 'Denne uka',
      all_taks: 'Alle',
      tasks_management: 'Oppgavebehandling',
      your_tasks: 'Dine arbeidsoppgaver',
      unassigned_tasks: 'Bonusoppgaver',
      assigned_to_others: 'Oppgaver du har delegert',
      edit_task: 'Endre oppgave',
      task_title: 'Beskrivende navn på oppgave',
      task_description_label: 'Detlajert beskrivelse',
      task_description_placeholder: 'F.eks. husk å fylle på med toalettpapir på kundetoalettene',
      task_location: 'Hvor oppgaven skal utføres:',
      or_others: ' eller andre',
      task_type: 'Type oppgave',
      task_types: {
        select: 'Velg type oppgave',
        logtemp: 'Temperaturavlesning',
        clean: 'Renhold',
        clean_plural: 'renholdsoppgaver',
        others: 'Annen oppgave',
        others_plural: 'andre oppgaver',
        deviation_log: 'Logavvik ',
        deviation_review: 'Gjennomgå avvik ',
        cooldown_log: 'Logg nedkjøling ',
        warmkeeping_log: 'Logg varmebehandling '
      },
      assign_to: 'Deleger til',
      repeat: 'Gjenta oppgaven',
      time: 'Tidspunkt',
      select_time: 'Velg tidpsunkt:',
      repeat_type: {
        select: 'Velg frekvens',
        never: 'Én gang',
        daily: 'Daglig',
        weekly: 'Ukentlig',
        monthly: 'Måneldig'
      },
      task_updated: 'Oppagve: %s er blitt oppdatert.',
      update_error: 'Kunne ikke oppdate oppgaven, prøv igjen.',
      task_added: 'Ny oppgave er lagret',
      add_error: 'Kunne ikke lagre oppgaven, prøv igjen.',
      select_user: 'Velg ansvarsperson',
      anyone: 'Enhver brukertype',
      any_employee: 'Enhver ansatt',
      any_manager: 'Enhver leder',
      any_owner: 'Enhver eier',
      any_user: 'En bruker eller mer',
      employee: 'En ansatt eller mer',
      manager: 'En leder eller mer',
      owner: 'En eier eller mer',
      task_assinged_to: 'Tilordne oppgave til å:',
      select_taks_loaction: 'Oppgaven skal utføres på',
      due: 'innen',
      save_x_device: 'Lagre %s enhet',
      save_x_devices: 'Lagre %s enheter',
      save_x_log: 'Lagre %s logg',
      save_x_logs: 'Lagre %s logger',
      create_new_task: 'Definer ny oppgave',
      prefix_clean: 'Renhold ',
      prefix_others: 'Annen',
      prefix_logtemp: 'Temperaturavlesning',
      prefix_manufacturer: 'Produsere ',
      prefix_package: 'Pakke ',
      prefix_ship: 'Sende ',
      things: ' ting',
      products: ' produkter.',
      orders: ' bestillinger.',
      for_x_devices: '%s temperaturer',
      to_log: 'skal registreres',
      in: ' i ',
      task_logged: 'Oppgave: %s er fullført',
      logg_error: 'Kunne ikke fullføre oppgave. Prøv igjen.',
      filters: {
        task_type: 'Oppgave type',
        task_repeat: 'Gjenta',
        task_status: 'Status',
        created_by: 'Laget av',
        assigned_to: 'Tilordnet',
        location: 'Oppgaveplassering',
        task_open: 'Åpen',
        task_closed: 'Lukket',
        task_completed: 'fullført'
      }
    },

    /*
      ##        #######   ######    ######
      ##       ##     ## ##    ##  ##    ##
      ##       ##     ## ##        ##
      ##       ##     ## ##   ####  ######
      ##       ##     ## ##    ##        ##
      ##       ##     ## ##    ##  ##    ##
      ########  #######   ######    ######
    */
    logs: {
      log: 'Prosess',
      header: 'Varemottak & temperaturprosesser',
      logged: 'Logget',
      select_location: 'Velg Lokasjon',
      defaults: {
        select_type: 'Velg type prosess',
        type: 'Type Prosess',
        name: 'Ny Prosess',
        new_log: 'Registrer ',
        condition_query: 'Er varene i god stand?',
        keepwarming_query: 'Vil du fortsette keepwarming dette elementet?'
      },
      delivery: {
        name: 'Varemottak',
        from: 'fra',
        senderNameDefault: 'Avsender',
        batchNo: 'Sporingsnummer',
        messages: {
          successMessage1: 'Varemottak ferdig! Sett varene i egnet oppbevaring umiddelbart!',
          failureWarning: 'Send varene i retur!',
          typeOfGoods: 'Hva slags varer er det?',
          measure_temp: 'Mål kjernetemperatur på varene',
        },
        goodsTypes: {
          default: 'Type varer',
          frozen: 'Frossenvarer',
          refrigerated: 'Kjølevarer',
          dry: 'Tørrvarer'
        },
        report: {
          typeOfGoods: 'Type varer',
          temp: 'Temperatur ved mottak',
          logStatus: 'Varetilstand',
          condition_good: 'Bra',
          condition_bad: 'Dårlig'
        }
      },
      cooldown: {
        name: 'Nedkjøling',
        batchNo: 'Sporingsnummer',
        messages: {
          name_items: 'Navngi matvaren, og legg til ingredienser',
          measure_temp: 'Mål starttemperatur på matvaren',
          successMessage1: 'Du vil bli bedt om å måle igjen om 2 timer',
          failureWarning: 'Nedkjølingsprosess feilet. Matvaren må kastes!',
        },
        report: {
          firstReading: 'Første måling',
          food_item: 'Matvare'
        }
      },
      warmkeeping: {
        name: 'Varmehold',
        item_name: 'Navngi matvaren',
        batchNo: 'Sporingsnummer',
        messages: {
          name_items: 'Navngi matvaren, og legg til ingredienser',
          measure_temp: 'Mål temperatur på matvaren',
          successMessage1: 'Du vil bli bedt om å måle igjen om 2 timer',
          failureWarning: 'Varmehold feilet. Matvaren må kastes!'
        },
        report: {
          firstReading: 'Første måling',
          food_item: 'Matvare'
        }
      }
    },

    //
    // ##     ##  ######  ######## ########   ######
    // ##     ## ##    ## ##       ##     ## ##    ##
    // ##     ## ##       ##       ##     ## ##
    // ##     ##  ######  ######   ########   ######
    // ##     ##       ## ##       ##   ##         ##
    // ##     ## ##    ## ##       ##    ##  ##    ##
    //  #######   ######  ######## ##     ##  ######
    //
    users: {
      managers: 'Ledere',
      owners: 'Eiere',
      employees: 'Ansatte',
      since: 'Siden',
      first_name: 'Fornavn',
      last_name: 'Etternavn',
      user_email: 'E-post adresse',
      user_type: 'Type ansatt',
      user_locations: 'Den ansatte vil jobbe på følgende lokasjoner:',
      user_types: {
        select: 'Velg riktig type',
        owner: 'Eier',
        manager: 'Leder',
        employee: 'Ansatt',
        select_user_review_deviation: 'Auto tilordne revisjonsavviksoppgaver til:',
        select_user_make: 'Auto tilordne oppgaver til:',
        select_user_pack: 'Auto tilordne pakningsavviksoppgaver til:',
        select_user_ship: 'Auto tilordne leveringsavviksoppgaver til:'
      },
      user_deleted: '%s er blitt slettet.',
      delete_error: 'Kan ikke slette ansatt. Prøv igjen.',
      user_updated: 'Informasjon om %s er oppdatert.',
      update_error: 'Kan ikke oppdatere informajson om ansatt. Prøv igjen.',
      add_new_user: 'Legg til ny ansatt',
      user_added: '%s er nå en ny ansatt',
      add_error: 'Kan ikke lagre en ny ansatt. Prøv igjen',
      confirmed: 'Bekreftet',
      not_confirmed: 'Ikke bekreftet',
      phone: 'Telefonnummer',
      pin_code: 'Pin Kode'

    },
    //
    // ########  ######## ##       #### ##     ## ######## ########  ##    ##
    // ##     ## ##       ##        ##  ##     ## ##       ##     ##  ##  ##
    // ##     ## ##       ##        ##  ##     ## ##       ##     ##   ####
    // ##     ## ######   ##        ##  ##     ## ######   ########     ##
    // ##     ## ##       ##        ##   ##   ##  ##       ##   ##      ##
    // ##     ## ##       ##        ##    ## ##   ##       ##    ##     ##
    // ########  ######## ######## ####    ###    ######## ##     ##    ##
    //
    // ########   #######  #### ##    ## ########  ######
    // ##     ## ##     ##  ##  ###   ##    ##    ##    ##
    // ##     ## ##     ##  ##  ####  ##    ##    ##
    // ########  ##     ##  ##  ## ## ##    ##     ######
    // ##        ##     ##  ##  ##  ####    ##          ##
    // ##        ##     ##  ##  ##   ###    ##    ##    ##
    // ##         #######  #### ##    ##    ##     ######

    delivery_points: {
      delivery_points: 'Utleveringspunkt',
      add_new_point: 'Legg til utleveringspunkt',
      name: 'Navn',
      address: 'Adresse',
      floor: 'Etasje',
      desc: 'Beskrivelse / kommentar til bud',
      point_added: '%s utleveringspunkt er nå tilgjengelig',
      add_error: 'Kunne ikke lagre utleveringspunkt, prøv igjen. ',
      point_deleted: '%s utleveringspunkt ble slettet.',
      delete_error: 'Kunne ikke slette utleveringspunkt, prøv igjen.',
      point_updated: '%s utleveringspunkt er blitt oppdatert.',
      update_error: 'Kunne ikke oppdatere uteveringspunkt, prøv igjen.'

    },


    //  ######     ###    ######## ########  ######    #######  ########  #### ########  ######
    // ##    ##   ## ##      ##    ##       ##    ##  ##     ## ##     ##  ##  ##       ##    ##
    // ##        ##   ##     ##    ##       ##        ##     ## ##     ##  ##  ##       ##
    // ##       ##     ##    ##    ######   ##   #### ##     ## ########   ##  ######    ######
    // ##       #########    ##    ##       ##    ##  ##     ## ##   ##    ##  ##             ##
    // ##    ## ##     ##    ##    ##       ##    ##  ##     ## ##    ##   ##  ##       ##    ##
    //  ######  ##     ##    ##    ########  ######    #######  ##     ## #### ########  ######

    categories: {
      add_new_category: 'Produktkategorier',
      name: 'Kategorinavn',
      category_added: '%s kategori er opprettet',
      add_error: 'Kan ikke lagre kategori, prøv igjen.',
      category_deleted: '%s er slettet.',
      delete_error: 'Kan ikke slette kategori, prøv igjen.',
      category_updated: '%s er oppdatert med ny informasjon.',
      update_error: 'Kunne ikke oppdatere kategorien, prøv igjen.'

    },

    //
    // ##     ## #### ########  ########  #######   ######
    // ##     ##  ##  ##     ## ##       ##     ## ##    ##
    // ##     ##  ##  ##     ## ##       ##     ## ##
    // ##     ##  ##  ##     ## ######   ##     ##  ######
    //  ##   ##   ##  ##     ## ##       ##     ##       ##
    //   ## ##    ##  ##     ## ##       ##     ## ##    ##
    //    ###    #### ########  ########  #######   ######

    videos: {
      videos: 'Videoer',
      add_new_video: 'Ny video',
      name: 'Videonavn',
      youtube: 'YouTube url',
      desc: 'Beskrivelse av video',
      video_added: '%s ble lagt til.',
      add_error: 'Kunne ikke lagre video, prøv igjen.',
      video_deleted: '%s ble slettet.',
      delete_error: 'Kunne ikke slette video, prøv igjen.',
      video_updated: '%s er oppdatert med ny informasjon.',
      update_error: 'Kunne ikke oppdatere video, prøv igjen.'

    },

    //
    //  ######  ##     ##  ######  ########  #######  ##     ## ######## ########   ######
    // ##    ## ##     ## ##    ##    ##    ##     ## ###   ### ##       ##     ## ##    ##
    // ##       ##     ## ##          ##    ##     ## #### #### ##       ##     ## ##
    // ##       ##     ##  ######     ##    ##     ## ## ### ## ######   ########   ######
    // ##       ##     ##       ##    ##    ##     ## ##     ## ##       ##   ##         ##
    // ##    ## ##     ## ##    ##    ##    ##     ## ##     ## ##       ##    ##  ##    ##
    //  ######   #######   ######     ##     #######  ##     ## ######## ##     ##  ######

    customers: {
      customer: 'Kunde',
      add_new_customer: 'Legg til kunde',
      name: 'Foretningsnavn',
      id: 'Organisasjonsnummer',
      first_name: 'Fornavn',
      last_name: 'Etternavn',
      contact_person: 'Kontaktperson',
      email: 'E-post adresse',
      delivery_points: 'Kunden vil få tilgang til følgende utleveringspunkt',
      customer_added: '%s ble opprettet',
      add_error: 'Kunne ikke opprette kunde, prøv igjen.',
      customer_deleted: '%s ble slettet.',
      delete_error: 'Kunne ikke slette kunde, prøv igjen.',
      customer_updated: '%s er oppdatert med ny informasjon.',
      update_error: 'Kunne ikke oppdatere kundeinformasjon, prøv igjen.',
      phone: 'Telefonnummer',
      discount: 'Rabatt prosentdel'
    },
    //
    // ########  ########   #######  ########  ##     ##  ######  ########  ######
    // ##     ## ##     ## ##     ## ##     ## ##     ## ##    ##    ##    ##    ##
    // ##     ## ##     ## ##     ## ##     ## ##     ## ##          ##    ##
    // ########  ########  ##     ## ##     ## ##     ## ##          ##     ######
    // ##        ##   ##   ##     ## ##     ## ##     ## ##          ##          ##
    // ##        ##    ##  ##     ## ##     ## ##     ## ##    ##    ##    ##    ##
    // ##        ##     ##  #######  ########   #######   ######     ##     ######

    products: {
      product: 'Produkt',
      add_new_product: 'Nytt produkt',
      thumnail: 'Produktbilde',
      name: 'Produktnavn',
      price: 'Pris per produkt (eks mva)',
      minimum_order_quantity: 'Minimum antall',
      category: 'Produktkategori',
      desc: 'Produktbeskrivelse',
      product_added: '%s ble opprettet.',
      add_error: 'Kunne ikke opprette produkt, prøv igjen.',
      product_deleted: '%s ble slettet.',
      delete_error: 'Kunne ikke slette produkt, prøv igjen',
      product_updated: '%s ble oppdatert med ny informasjon.',
      update_error: 'Kunne ikke opdatere produkt, prøv igjen senere.',
      location: 'Product location'
    },


    // ##     ## ######## ##    ## ##     ##
    // ###   ### ##       ###   ## ##     ##
    // #### #### ##       ####  ## ##     ##
    // ## ### ## ######   ## ## ## ##     ##
    // ##     ## ##       ##  #### ##     ##
    // ##     ## ##       ##   ### ##     ##
    // ##     ## ######## ##    ##  #######

    menu: {
      company: {
        location_managment: 'Arbeidsstasjoner & utstyr',
        tasks: 'Dine arbeidsoppgaver',
        reports: 'Rapporter & avvik',
        user_managment: 'Ansatte & brukere',
        shop_managment: 'Dine butikker & ordre',
        log_as_customer: 'Dine leverandører & bestillinger',
        signout: 'Logg ut',
        orders: 'Nye ordre & historikk',
        products: 'Dine produkter',
        customers: 'Kundeliste',
        videos: 'Promovideoer',
        categories: 'Produktkategorier',
        delivery_points: 'Utleveringspunkt',
        landing_page_settings: 'Hjemmesideinstillinger',

      },
      customer: {
        orders: 'Ordrehistorikk',
        go: 'Besøk butikken',
        employees: 'Dine ansatte',
        log_as_company: 'Firmadashboard',
        signout: 'Logg ut',
      }
    },

    //
    //  ######  ##     ##  #######  ########   ######
    // ##    ## ##     ## ##     ## ##     ## ##    ##
    // ##       ##     ## ##     ## ##     ## ##
    //  ######  ######### ##     ## ########   ######
    //       ## ##     ## ##     ## ##              ##
    // ##    ## ##     ## ##     ## ##        ##    ##
    //  ######  ##     ##  #######  ##         ######

    shops: {
      shops: 'Dine butikker',
      add_new_shop: 'Legg til ny butikk',
      enable_landing_page: 'Vis hjemmeside',
      enable_videos_page: 'Vis videoside',
      shop_name: 'Butikknavn',
      shop_domain: 'Handle eget domenenavn ex: shop.mydomain.com',
      create_cname: 'Opprett en ny CNAME-post, nevner den',
      set_it_as: 'og sett verdien til',
      shop_updated: 'Butikken ble oppdatert',
      delivery_frequency: 'Leveringsfrekvens',
      daily_delivery: 'Daglig levering',
      weekly_delivery: 'Ukentlig levering',
      delivery_time_of_day: 'Tidspunkt for levering',
      delivery_time_from: 'Levering fra kl',
      delivery_time_to: 'Levering til kl',
      enable_delivery_time_for_customer: 'La kunden sette tidspunkt for levering',
      order_deadline: 'Bestillingsfrist, dager før',
      order_deadline_time: 'Bestillingsfrist, tid på dagen',
      enable_machine_service: 'Aktiver maskinbetjeningsordrer',
      machine_service_title: 'Maskintjeneste tittel',
      machine_service_heading: 'Maskintjeneste overskrift',
      machine_service_button: 'Maskinknapp',
      enable_recurring_orders: 'Tillat gjentatte bestillinger',
      shipping_cost: 'Frakt kostnad'
    },

    //
    //  ######  ##     ##  ######  ########  #######  ##     ## ######## ########
    // ##    ## ##     ## ##    ##    ##    ##     ## ###   ### ##       ##     ##
    // ##       ##     ## ##          ##    ##     ## #### #### ##       ##     ##
    // ##       ##     ##  ######     ##    ##     ## ## ### ## ######   ########
    // ##       ##     ##       ##    ##    ##     ## ##     ## ##       ##   ##
    // ##    ## ##     ## ##    ##    ##    ##     ## ##     ## ##       ##    ##
    //  ######   #######   ######     ##     #######  ##     ## ######## ##     ##
    //
    // ##          ###    ##    ## ########  #### ##    ##  ######
    // ##         ## ##   ###   ## ##     ##  ##  ###   ## ##    ##
    // ##        ##   ##  ####  ## ##     ##  ##  ####  ## ##
    // ##       ##     ## ## ## ## ##     ##  ##  ## ## ## ##   ####
    // ##       ######### ##  #### ##     ##  ##  ##  #### ##    ##
    // ##       ##     ## ##   ### ##     ##  ##  ##   ### ##    ##
    // ######## ##     ## ##    ## ########  #### ##    ##  ######
    //
    // ########     ###     ######   ########
    // ##     ##   ## ##   ##    ##  ##
    // ##     ##  ##   ##  ##        ##
    // ########  ##     ## ##   #### ######
    // ##        ######### ##    ##  ##
    // ##        ##     ## ##    ##  ##
    // ##        ##     ##  ######   ########

    customer_landing_page: {
      is_active: 'Publiser destinasjonssiden?',
      page_header_1: 'Første overskrift',
      weekdays: 'Innstillinger for ukedager',
      heading: 'Navn på retten',
      description: 'Beskrivelse',
      is_open: 'Serveres det denne dagen?',
      allergens_noun: 'Allergener',
      every_day: 'Hver dag',
      text_for_every_day: 'Tekst for "hver dag"',
      cta_button_text: 'Tekst for "gå til butikk"-knapp',
      allergens: {
        soy: 'Soya',
        gluten: 'Gluten',
        milk: 'Laktose',
        peanuts: 'Peanøtter',
        eggs: 'Egg',
        fish: 'Fisk',
        nuts: 'Nøtter',
        shellfish: 'Skalldyr',
        celery: 'Seleri',
        mustard: 'Sennep',
        sesamy_seeds: 'Sesamfrø',
        sulfites: 'Sulfitter',
        invertebrates: 'Bløtdyr',
      },
      about_us_heading: 'Overskrift for "Om oss"',
      about_us_text: 'Tekst for "Om oss"',
      contact_us_heading: 'Overskrift for "Kontakt oss"',
      contact_us_text: 'Tekst for "Kontakt oss"',
      contact_us_address: 'Forretningsadresse',
      contact_us_email: 'Bedrifts-e-post',
      contact_us_phone: 'Jobbtelefon',
      cta_is_active: 'Knappen er aktiv?',
      cta_text: 'CTA-knappetekst',
      days_is_active: 'Dags seksjon er aktiv?',
    },
    //
    //  #######  ########  ########  ######## ########   ######
    // ##     ## ##     ## ##     ## ##       ##     ## ##    ##
    // ##     ## ##     ## ##     ## ##       ##     ## ##
    // ##     ## ########  ##     ## ######   ########   ######
    // ##     ## ##   ##   ##     ## ##       ##   ##         ##
    // ##     ## ##    ##  ##     ## ##       ##    ##  ##    ##
    //  #######  ##     ## ########  ######## ##     ##  ######

    orders: {
      placed_on: 'Denne orderen ble lagt den',
      of: 'of',
      to_be_delivered: 'ønsker orderen levert til',
      ordered_goods_to: 'bestilte varer for levering på',
      production: 'Produksjon',
      to_be_produced: 'Generér produksjonsplan',
      invoicing: 'Fakturering',
      recurring: 'Repeterende',
      oustanding: 'Nye ordre',
      history: 'Historiske ordre',
      to_be_invoiced: 'Generér fakturagrunnlag',
      on: 'den',
      confirmed: 'Morgendagens ordre',
      future: 'Fremtidige ordre',
      history: 'Historiske ordre',
      filters: 'Filtere',
      filter_types: 'Filtertyper',
      add_filter: 'Legg til filter',
      sum: 'Sum',
      total: 'total',
      count: 'Count',
      sub_total: 'Subtotal eks MVA',
      grand_total: 'Total sum',
      freight: 'Frakt',
      pending: 'Fremtidige',
      canceled: 'avbrutt',
      completed: 'fullført',
      order_status: 'Ordre status'

    },
    //
    // ########  ########  #### ##    ## ########
    // ##     ## ##     ##  ##  ###   ##    ##
    // ##     ## ##     ##  ##  ####  ##    ##
    // ########  ########   ##  ## ## ##    ##
    // ##        ##   ##    ##  ##  ####    ##
    // ##        ##    ##   ##  ##   ###    ##
    // ##        ##     ## #### ##    ##    ##

    print: {
      make: 'Produksjonsplan',
      product: 'Produkter bestilt',
      count: 'Antall',
      created_at: 'Bestillingsdato',
      comment: 'Kommentar',
      contact_person: 'Kontaktperson',
      phone_number: 'Telefonnummer',
      pack: 'Følgeseddel',
      deliver: 'Kjøreplan',
      delivery_instructions: 'Leverings instruks',
      order_number: 'Ordre #'
    },
    print_invoice: {
      title: 'Ordreliste',
      period: 'Periode',
      count: 'Antall',
      report_date: 'Rapportdato',
      delivery_date: 'Leveringsdato',
      delivery_note: 'Følgeseddel'

    }
  }
}