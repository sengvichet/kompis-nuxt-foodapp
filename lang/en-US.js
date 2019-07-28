export default {
  //
  // ##          ###    ##    ## ########  #### ##    ##  ######
  // ##         ## ##   ###   ## ##     ##  ##  ###   ## ##    ##
  // ##        ##   ##  ####  ## ##     ##  ##  ####  ## ##
  // ##       ##     ## ## ## ## ##     ##  ##  ## ## ## ##   ####
  // ##       ######### ##  #### ##     ##  ##  ##  #### ##    ##
  // ##       ##     ## ##   ### ##     ##  ##  ##   ### ##    ##
  // ######## ##     ## ##    ## ########  #### ##    ##  ######

  landing: {
    hero: {
      title: 'More play, more gay',
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
      pricing1_annual_amount: '99 kr i året',
      pricing1_monthly_amount: 'eller 49 kr per måned',

      pricing2_title: 'Enklere hverdag',
      pricing2_text1: 'Er dere bedrift med flere enn to ansatte?',
      pricing2_text2: 'Da kan du enkelt håndtere rutiner, oppgavestyring og ansatte på flere lokasjoner fra din telefon.',
      pricing2_text3: 'Søvnløse netter elimineres for',
      pricing2_annual_amount: '5,000 kr i året',
      pricing2_monthly_amount: 'eller 700 kr per måned',

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
        register: 'Registrer med som bruker',
        error_already_exists: 'En konto med denne e-post adressen eksisterer allerede',
        error_check_inputs: 'Please check all inputs are filled'
      },
      step3: {
        title: 'Nesten fremme',
        sub_title1: 'Vi har sendt deg en bekreftelse per e-post for å forsikre oss om at dette er deg.',
        sub_title2: 'Vennligst sjekk din inboks og trykk på linken, så er du i gang!'
      }

    }
  },
  auth: {
    email: 'Email',
    password: 'Password',
    login: 'Login',
    code: 'Code',
    new_password: 'New Password',
    save_new_password: 'Save New Password',
    reset_password: 'Reset Password',
    forget_password_text: 'Forget Password ?',
    register_account_text: 'Register New Account',
    temporary_password: 'Temporary Password',

    confirm: {
      verified: 'Account has been verified successfuly, please login to your account',
      error: 'Unable to confirm your email'
    },
    forget_password: {
      error: 'Please check your email and follow the reset instructions'
    },
    complete_forget_password: {
      success: 'Password changed, try to loggin with your new password now.'
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
        tasks: 'Tasks',
        reports: 'Reports',
        edit_profile: 'Edit Profile',
        signout: 'Signout',
        manage_users: 'Manage users',
        switch_user: 'Switch users',
        switch_user_page_title: 'Select your account',
        switch_user_new_login: 'Log in with a different account'
      }
    },
    /*
         ######   ######## ##    ## ######## ########     ###    ##
        ##    ##  ##       ###   ## ##       ##     ##   ## ##   ##
        ##        ##       ####  ## ##       ##     ##  ##   ##  ##
        ##   #### ######   ## ## ## ######   ########  ##     ## ##
        ##    ##  ##       ##  #### ##       ##   ##   ######### ##
        ##    ##  ##       ##   ### ##       ##    ##  ##     ## ##
         ######   ######## ##    ## ######## ##     ## ##     ## ########
    */
    general: {
      edit: 'Edit: %s',
      user_settings: 'User Settings',
      are_you_sure_delete: 'Are you sure you want to delete %s ?',
      are_you_sure_cant_undo: `Are you sure? You can't undo this!`,
      yes_delete: ' Yes I am sure!',
      no_delete: 'No, thanks!',
      yes: 'Yes',
      no: 'No',
      of: 'of',
      at: 'at', // this person 'at' this company
      for: 'for',
      save: 'Save changes',
      next: 'Next',
      cancel: 'Cancel',
      days_of_the_month: {
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat',
        sun: 'Sun'
      },
      days_of_the_week: {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday'
      }
    },

    /*
        ######## #### ##     ## ########
           ##     ##  ###   ### ##
           ##     ##  #### #### ##
           ##     ##  ## ### ## ######
           ##     ##  ##     ## ##
           ##     ##  ##     ## ##
           ##    #### ##     ## ########

    */
    time: {
      on_the: 'den', // on the day of the month
    },


    /*
    ##        #######   ######     ###    ######## ####  #######  ##    ##  ######
    ##       ##     ## ##    ##   ## ##      ##     ##  ##     ## ###   ## ##    ##
    ##       ##     ## ##        ##   ##     ##     ##  ##     ## ####  ## ##
    ##       ##     ## ##       ##     ##    ##     ##  ##     ## ## ## ##  ######
    ##       ##     ## ##       #########    ##     ##  ##     ## ##  ####       ##
    ##       ##     ## ##    ## ##     ##    ##     ##  ##     ## ##   ### ##    ##
    ########  #######   ######  ##     ##    ##    ####  #######  ##    ##  ######
    */

    locations: {
      locations: 'locations',
      devices: 'devices',
      number_of_devices: 'You have %s devices',
      number_of_devices_to_be_updates: 'Save all updated ( %s devices )',
      logged_successfuly: '%s devices has been logged successfuly.',
      one_device_at_least: 'Please make at least 1 change to values',
      last_time_logged: 'Last time logged',
      logg_error: 'Unable to log devices, please try again later.',
      make_one_change: 'Please make at least 1 change to values',
      location_deleted: 'Location %s has been deleted successfuly.',
      delete_error: 'Unable to delete location, please try again later.',
      location_updated: 'Location %s has been modified successfuly.',
      update_error: 'Unable to edit location, please try again later.',
      location_added: 'Location %s has been added successfuly.',
      add_error: 'Unable to add location, please try again later.',
      nothing_to_show: 'Nothing to show',
      all_good: 'All good on the hood',
      danger: ' Danger status',
      add_new_location: 'Add New Location',
      location_name: 'Location name',
      location: 'Location description'
    },

    /*
    ########  ######## ##     ## ####  ######  ########  ######
    ##     ## ##       ##     ##  ##  ##    ## ##       ##    ##
    ##     ## ##       ##     ##  ##  ##       ##       ##
    ##     ## ######   ##     ##  ##  ##       ######    ######
    ##     ## ##        ##   ##   ##  ##       ##             ##
    ##     ## ##         ## ##    ##  ##    ## ##       ##    ##
    ########  ########    ###    ####  ######  ########  ######
    */
    devices: {
      devices: 'Devices',
      manual_units: 'Manual Units',
      automatic_units: 'Automatic Units',
      devices_logged: 'devices  has been logged successfuly.',
      temperature: 'Temperature',
      device_type: 'Device Type',
      refrigerator: 'Refrigerator',
      freezer: 'Freezer',
      dishwasher1: 'Main wash',
      dishwasher2: 'Rinse temperature',
      device_deleted: 'Device %s has been deleted successfuly.',
      delete_error: 'Unable to delete device, please try again later.',
      device_updated: 'Device %s has been modified successfuly.',
      update_error: 'Unable to edit device, please try again later.',
      device_added: 'Devcice %s has been added successfuly.',
      add_error: 'Unable to add device, please try again later.',
      last_logged: ' Last logged: ',
      add_new_device: 'Add New Device',
      name: 'Device Name',
      type: 'Device Type',
      error_select_type: 'Unable to add device, please select device type.'
    },
    /*
 ######  ######## ##    ##  ######   #######  ########   ######
##    ## ##       ###   ## ##    ## ##     ## ##     ## ##    ##
##       ##       ####  ## ##       ##     ## ##     ## ##
 ######  ######   ## ## ##  ######  ##     ## ########   ######
      ## ##       ##  ####       ## ##     ## ##   ##         ##
##    ## ##       ##   ### ##    ## ##     ## ##    ##  ##    ##
 ######  ######## ##    ##  ######   #######  ##     ##  ######
*/
    sensors: {
      sensors: 'Sensors',
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

    /*
    ######## ##     ##  ######  ######## ########  ######## ####  #######  ##    ##  ######
    ##        ##   ##  ##    ## ##       ##     ##    ##     ##  ##     ## ###   ## ##    ##
    ##         ## ##   ##       ##       ##     ##    ##     ##  ##     ## ####  ## ##
    ######      ###    ##       ######   ########     ##     ##  ##     ## ## ## ##  ######
    ##         ## ##   ##       ##       ##           ##     ##  ##     ## ##  ####       ##
    ##        ##   ##  ##    ## ##       ##           ##     ##  ##     ## ##   ### ##    ##
    ######## ##     ##  ######  ######## ##           ##    ####  #######  ##    ##  ######
    */
    exceptions: {
      deviation_report_title: 'Deviation report title',
      deviation_description_label: 'Description of actual cause',
      deviation_description_placeholder: 'Description of the cause',
      corrective_measures_label: 'Corrective Measures taken',
      corrective_measures_placeholder: 'Corrective Measures taken this time',
      how_solved_label: 'Steps taken to avoid future incidents',
      how_solved_placeholder: 'Steps taken to avoid future incidents',
      exception_added: 'Exception has been filed successfuly.',
      add_error: 'Unable to file exception, please try again later.',
      create_deviation_report: 'Create deviation report: ',
      review_comment: 'Write your comment about this deviation'
    },

    /*
    ########  ######## ########   #######  ########  ########  ######
    ##     ## ##       ##     ## ##     ## ##     ##    ##    ##    ##
    ##     ## ##       ##     ## ##     ## ##     ##    ##    ##
    ########  ######   ########  ##     ## ########     ##     ######
    ##   ##   ##       ##        ##     ## ##   ##      ##          ##
    ##    ##  ##       ##        ##     ## ##    ##     ##    ##    ##
    ##     ## ######## ##         #######  ##     ##    ##     ######
    */
    reports: {
      todays_reports: "Today's Reports",
      this_weeK_reports: 'This Week Reports',
      all_reports: 'All Reports',
      no_reports_today: 'No reports today',
      no_reports_this_week: 'No reports this week',
      no_reports_yet: 'No reports yet',
      open_deviation_report: 'Open link to deviation report',
      open_delivery_report: 'Open link to inbound delivery report',
      open_order_report: 'Open link to order details',
      open_cooldown_report: 'Open link to cooldown report',
      create_deviation_report: 'Create deviation report:',
      deviation_report: 'Deviation Report',
      written_by: 'Written by',
      what_happened: 'What happened ?',
      why_happened: 'Why it happened',
      how_fixed: 'How it was fixed ?',
      reviewed_by: 'Reviewed By:',
      reviewed_by_comment: 'Reviewer comment:',
      not_yet: 'Not reviewed yet!',
      what_happened_title: 'Incident',
      why_happened_title: 'Cause',
      how_fixed_title: 'Corrective measures',
      logged_at: 'logged at: ',
      temperature_log_report: 'Temperature log report',
      was_not_completed: 'was not completed',
      cleaning_log: 'Cleaning log',
      others_log: 'Other things log',
      manufacturer_log: 'Manufacturing log',
      ship_log: 'Shipping log',
      package_log: 'Packaging log',
      manufacturing: 'Manufacturing',
      shipping: 'Shipping',
      packaging: 'Packaging',
      cleaning: 'Cleaning',
      temperature_log: 'Temperature log',
      other_things: 'Other things',
      deviations: 'Deviations',
      and_x_others: ' and %s others',
      delivery: 'Inbound Delivery',
      cooldown: 'Cooldown',
      keepwarming: 'Keep Warming',
      filters: {
        task_types: 'Task type',
        locations: 'Location',
        users: 'Completed by user',
        deviations: 'Contains deviation',
      }

    },

    /*
    ########    ###     ######  ##    ##  ######
       ##      ## ##   ##    ## ##   ##  ##    ##
       ##     ##   ##  ##       ##  ##   ##
       ##    ##     ##  ######  #####     ######
       ##    #########       ## ##  ##         ##
       ##    ##     ## ##    ## ##   ##  ##    ##
       ##    ##     ##  ######  ##    ##  ######
    */
    tasks: {
      task: 'Task',
      today: 'Today',
      this_week: 'This Week',
      all_taks: 'All Tasks',
      tasks_management: 'Tasks Management',
      your_tasks: 'Your Tasks',
      unassigned_tasks: 'Unassigned Tasks',
      assigned_to_others: 'Assigned To Others',
      edit_task: 'Edit Task',
      task_title: 'Task title',
      task_description_label: 'Tasks Description',
      task_description_placeholder: 'Make sure there is enough toilet paper in the stalls',
      task_location: 'Task location',
      or_others: ' or others',
      task_type: 'Task type',
      task_types: {
        select: 'Select task type',
        logtemp: 'Log Temperature',
        clean: 'Clean',
        clean_plural: 'cleaning tasks',
        others: 'Others',
        others_plural: 'other tasks',
        deviation_log: 'Log deviation ',
        deviation_review: 'Review deviation ',
        cooldown_log: 'Log cooldown ',
        warmkeeping_log: 'Log warmkeeping '
      },
      assign_to: 'Assign to',
      repeat: 'Repeat',
      time: 'Time',
      select_time: 'Select time:',
      repeat_type: {
        select: 'Select repeat type',
        never: 'Once',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly'
      },
      task_updated: 'Task: %s has been updated successfuly.',
      update_error: 'Unable to update task, please try again later.',
      task_added: 'Task has been created successfuly.',
      add_error: 'Unable to create task, please try again later.',
      select_user: 'Select User',
      anyone: 'Anyone',
      any_employee: 'Any employee',
      any_manager: 'Any manager',
      any_owner: 'Any owner',
      any_user: 'One user or more',
      task_assinged_to: 'Assign task to:',
      select_taks_loaction: 'Select task location',
      due: 'due',
      save_x_device: 'Save %s device',
      save_x_devices: 'Save %s devices',
      save_x_log: 'Save %s log',
      save_x_logs: 'Save %s logs',
      create_new_task: 'Create new task',
      prefix_clean: 'Clean ',
      prefix_logtemp: 'Log temperature',
      prefix_others: 'Do other ',
      prefix_manufacturer: 'Manufacturer ',
      prefix_package: 'Package ',
      prefix_ship: 'Ship ',
      things: ' things',
      products: ' products.',
      orders: ' orders.',
      for_x_devices: '%s temperatures',
      to_log: 'to log',
      in: ' in ',
      task_logged: 'Task: %s has been logged successfuly.',
      logg_error: 'Unable to log task, please try again later.',
      filters: {
        task_type: 'Task type',
        task_repeat: 'Repeat',
        task_status: 'Status',
        created_by: 'Created by',
        assigned_to: 'Assigned to',
        location: 'Task location',
        task_open: 'Open',
        task_closed: 'Closed',
        task_completed: 'Completed'
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
      log: 'Process',
      header: 'Inbound deliveries & temperature procedures',
      logged: 'Logged',
      select_location: 'Select location',
      defaults: {
        select_type: 'Select process type',
        type: 'Process Type',
        name: 'New Process',
        new_log: 'New ',
        condition_query: 'Are the items in good condition?',
        keepwarming_query: 'Do you want to continue keepwarming this item ?'
      },
      delivery: {
        name: 'Inbound delivery',
        from: 'from',
        senderNameDefault: 'Sender Name',
        batchNo: 'Batch number',
        measure_temp: 'Measure the core temperature of the items',
        messages: {
          successMessage1: 'Inbound delivery log completed, place in appropriate storage immediately!',
          failureWarning: 'Return goods to sender',
          typeOfGoods: 'What type of goods are they?',
          measure_temp: 'Mål kjernetemperatur på varene',
        },
        goodsTypes: {
          default: 'Type of goods',
          frozen: 'Frozen',
          refrigerated: 'Refridgerated',
          dry: 'Dry'
        },
        report: {
          typeOfGoods: 'Type of goods',
          temp: 'Temperature when received',
          logStatus: 'Delivery condition',
          condition_good: 'Good',
          condition_bad: 'Bad'
        }
      },
      cooldown: {
        name: 'Cooldown Log',
        batchNo: 'Batch number',
        messages: {
          name_items: 'Name the food item and add ingredients',
          measure_temp: 'Measure the starting temperature of the food item',
          successMessage1: 'After saving, you will be required to measure again in 2 hours',
          failureWarning: 'Cooldown process failed, the item must be discarded',
        },
        report: {
          firstReading: 'First Reading',
          food_item: 'Food Item'
        }
      },
      warmkeeping: {
        name: 'Warmkeeping Log',
        item_name: 'Item Name',
        batchNo: 'Batch number',
        messages: {
          name_items: 'Name the food item and add ingredients',
          measure_temp: 'Measure the temperature of the food item',
          successMessage1: 'After saving, you will be required to measure again in 2 hours',
          failureWarning: 'Warmkeeping process failed, the item must be discarded',
        },
        report: {
          firstReading: 'First Reading',
          food_item: 'Food Item'
        }
      }
    },
    /*
    ##     ##  ######  ######## ########   ######
    ##     ## ##    ## ##       ##     ## ##    ##
    ##     ## ##       ##       ##     ## ##
    ##     ##  ######  ######   ########   ######
    ##     ##       ## ##       ##   ##         ##
    ##     ## ##    ## ##       ##    ##  ##    ##
     #######   ######  ######## ##     ##  ######
    */
    users: {
      managers: 'Managers',
      owners: 'Owners',
      employees: 'Employees',
      since: 'Since',
      first_name: 'First name',
      last_name: 'Last name',
      user_email: 'User email',
      user_type: 'User type',
      user_locations: 'User will have access to the following locations',
      user_types: {
        select: 'Select user type',
        owner: 'Owner',
        manager: 'Manager',
        employee: 'Employee',
        select_user_review_deviation: 'Auto assign review deviation tasks to:',
        select_user_make: 'Auto assign making tasks to:',
        select_user_pack: 'Auto assign packing deviation tasks to:',
        select_user_ship: 'Auto assign shipping deviation tasks to:'
      },
      user_deleted: 'User %s has been deleted successfuly.',
      delete_error: 'Unable to delete user, please try again later',
      user_updated: 'User %s has been updated successfuly.',
      update_error: 'Unable to update user please try again later',
      add_new_user: 'Add new user',
      user_added: 'User %s has been created successfuly.',
      add_error: 'Unable to create user, please try again later.',
      confirmed: 'Confirmed',
      not_confirmed: 'Not confirmed',
      phone: 'Phone number',
      pin_code: 'Pin Code'

    },

    /*
    ########  ######## ##       #### ##     ## ######## ########  ##    ##
    ##     ## ##       ##        ##  ##     ## ##       ##     ##  ##  ##
    ##     ## ##       ##        ##  ##     ## ##       ##     ##   ####
    ##     ## ######   ##        ##  ##     ## ######   ########     ##
    ##     ## ##       ##        ##   ##   ##  ##       ##   ##      ##
    ##     ## ##       ##        ##    ## ##   ##       ##    ##     ##
    ########  ######## ######## ####    ###    ######## ##     ##    ##

    ########   #######  #### ##    ## ########  ######
    ##     ## ##     ##  ##  ###   ##    ##    ##    ##
    ##     ## ##     ##  ##  ####  ##    ##    ##
    ########  ##     ##  ##  ## ## ##    ##     ######
    ##        ##     ##  ##  ##  ####    ##          ##
    ##        ##     ##  ##  ##   ###    ##    ##    ##
    ##         #######  #### ##    ##    ##     ######
    */
    delivery_points: {
      delivery_points: 'Delivery Points',
      add_new_point: 'Add new delivery point',
      name: 'Name',
      address: 'Address',
      floor: 'Floor',
      desc: 'Description',
      point_added: 'Delivery Point %s has been created successfuly.',
      add_error: 'Unable to create delivery point, please try again later.',
      point_deleted: 'Delivery Point %s has been deleted successfuly.',
      delete_error: 'Unable to delete delivery point, please try again later',
      point_updated: 'Delivery Point %s has been updated successfuly.',
      update_error: 'Unable to update delivery point please try again later'

    },

    /*
       ######     ###    ######## ########  ######    #######  ########  #### ########  ######
      ##    ##   ## ##      ##    ##       ##    ##  ##     ## ##     ##  ##  ##       ##    ##
      ##        ##   ##     ##    ##       ##        ##     ## ##     ##  ##  ##       ##
      ##       ##     ##    ##    ######   ##   #### ##     ## ########   ##  ######    ######
      ##       #########    ##    ##       ##    ##  ##     ## ##   ##    ##  ##             ##
      ##    ## ##     ##    ##    ##       ##    ##  ##     ## ##    ##   ##  ##       ##    ##
       ######  ##     ##    ##    ########  ######    #######  ##     ## #### ########  ######
      */
    categories: {
      add_new_category: 'Add new category',
      name: 'Category name',
      category_added: 'Category %s has been created successfuly.',
      add_error: 'Unable to create category, please try again later.',
      category_deleted: 'Category %s has been deleted successfuly.',
      delete_error: 'Unable to delete category, please try again later',
      category_updated: 'Category %s has been updated successfuly.',
      update_error: 'Unable to update category please try again later'

    },

    /*
    ##     ## #### ########  ########  #######   ######
    ##     ##  ##  ##     ## ##       ##     ## ##    ##
    ##     ##  ##  ##     ## ##       ##     ## ##
    ##     ##  ##  ##     ## ######   ##     ##  ######
     ##   ##   ##  ##     ## ##       ##     ##       ##
      ## ##    ##  ##     ## ##       ##     ## ##    ##
       ###    #### ########  ########  #######   ######
    */
    videos: {
      videos: 'Videos',
      add_new_video: 'Add new video',
      name: 'Video name',
      youtube: 'Video YouTube Link',
      desc: 'Video Description',
      video_added: 'Video %s has been created successfuly.',
      add_error: 'Unable to create video, please try again later.',
      video_deleted: 'Video %s has been deleted successfuly.',
      delete_error: 'Unable to delete video, please try again later',
      video_updated: 'Video %s has been updated successfuly.',
      update_error: 'Unable to update video please try again later'
    },

    /*
     ######  ##     ##  ######  ########  #######  ##     ## ######## ########   ######
    ##    ## ##     ## ##    ##    ##    ##     ## ###   ### ##       ##     ## ##    ##
    ##       ##     ## ##          ##    ##     ## #### #### ##       ##     ## ##
    ##       ##     ##  ######     ##    ##     ## ## ### ## ######   ########   ######
    ##       ##     ##       ##    ##    ##     ## ##     ## ##       ##   ##         ##
    ##    ## ##     ## ##    ##    ##    ##     ## ##     ## ##       ##    ##  ##    ##
     ######   #######   ######     ##     #######  ##     ## ######## ##     ##  ######
    */
    customers: {
      customer: 'Customer',
      add_new_customer: 'Add new customer',
      name: 'Business Name',
      id: 'Organization ID',
      first_name: 'First Name',
      last_name: 'Last Name',
      contact_person: 'Contact Person',
      email: 'Email',
      delivery_points: 'Customer will have access to the following delivery points',
      customer_added: 'Customer %s has been created successfuly.',
      add_error: 'Unable to create customer, please try again later.',
      customer_deleted: 'Customer %s has been deleted successfuly.',
      delete_error: 'Unable to delete customer, please try again later',
      customer_updated: 'Customer %s has been updated successfuly.',
      update_error: 'Unable to update customer please try again later',
      phone: 'Phone number',
      discount: 'Discount percentage'
    },

    /*

    ########  ########   #######  ########  ##     ##  ######  ########  ######
    ##     ## ##     ## ##     ## ##     ## ##     ## ##    ##    ##    ##    ##
    ##     ## ##     ## ##     ## ##     ## ##     ## ##          ##    ##
    ########  ########  ##     ## ##     ## ##     ## ##          ##     ######
    ##        ##   ##   ##     ## ##     ## ##     ## ##          ##          ##
    ##        ##    ##  ##     ## ##     ## ##     ## ##    ##    ##    ##    ##
    ##        ##     ##  #######  ########   #######   ######     ##     ######

    */
    products: {
      product: 'Product',
      add_new_product: 'Add New Product',
      thumnail: 'Product Image',
      name: 'Product Name',
      price: 'Product Price',
      minimum_order_quantity: 'Minimum Order Quantity',
      category: 'Product Category',
      desc: 'Product Description',
      product_added: 'Product %s has been created successfuly.',
      add_error: 'Unable to create product, please try again later.',
      product_deleted: 'Product %s has been deleted successfuly.',
      delete_error: 'Unable to delete product, please try again later',
      product_updated: 'Product %s has been updated successfuly.',
      update_error: 'Unable to update product please try again later',
      location: 'Product location'
    },

    /*

    ##     ## ######## ##    ## ##     ##
    ###   ### ##       ###   ## ##     ##
    #### #### ##       ####  ## ##     ##
    ## ### ## ######   ## ## ## ##     ##
    ##     ## ##       ##  #### ##     ##
    ##     ## ##       ##   ### ##     ##
    ##     ## ######## ##    ##  #######

    */
    menu: {
      company: {
        location_managment: 'Work stations & equipment',
        tasks: 'Your tasks',
        reports: 'Reports & deviations',
        user_managment: 'Employees & users',
        shop_managment: 'Your shops & orders',
        log_as_customer: 'Your Suppliers & orders',
        signout: 'Sign Out',
        orders: 'Orders',
        products: 'Product Management',
        customers: 'Customer Management',
        videos: 'Video Management',
        categories: 'Category Management',
        delivery_points: 'Delivery Point Managment',
        landing_page_settings: 'Landing page settings',

      },
      customer: {
        orders: 'Orders',
        go: 'Go to Shop',
        employees: 'Employees',
        log_as_company: 'Company View',
        signout: 'Sign Out',
      }
    },

    //  ######  ##     ##  #######  ########   ######
    // ##    ## ##     ## ##     ## ##     ## ##    ##
    // ##       ##     ## ##     ## ##     ## ##
    //  ######  ######### ##     ## ########   ######
    //       ## ##     ## ##     ## ##              ##
    // ##    ## ##     ## ##     ## ##        ##    ##
    //  ######  ##     ##  #######  ##         ######

    shops: {
      shops: 'Your shops',
      add_new_shop: 'Add new shop',
      shop_name: 'Shop name',
      shop_domain: 'Shop custom domain name ex: shop.mydomain.com',
      create_cname: 'Create a new CNAME record, name it',
      set_it_as: 'and set the value to',
      shop_updated: 'Shop has been updated',
      delivery_frequency: 'Delivery schedule',
      daily_delivery: 'Daily delivery',
      weekly_delivery: 'Weekly delivery',
      delivery_time_of_day: 'Delivery time of day',
      delivery_time_from: 'Delivery from',
      delivery_time_to: 'Delivery until',
      enable_delivery_time_for_customer: 'Show delivery time to customer',
      enable_landing_page: 'Enable landing page',
      enable_videos_page: 'Enable videos page',
      order_deadline: 'Order deadline, days before',
      order_deadline_time: 'Order deadline, time of day',
      enable_machine_service: 'Enable machine service orders',
      machine_service_title: 'Machine service title',
      machine_service_heading: 'Machine service heading',
      machine_service_button: 'Machine service button',
      enable_recurring_orders: 'Allow recurring orders',
      shipping_cost: 'Shipping cost'
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
      is_active: 'Publish the landing page ?',
      page_header_1: 'First header',
      is_open: 'Are you open for business?',
      weekdays: 'Settings for weekdays',
      every_day: 'Every day',
      text_for_every_day: 'Text for "every day"',
      heading: 'Name of the dish',
      cta_button_text: 'Text for "go to shop" button',
      description: 'Description',
      allergens_noun: 'Allergens',
      allergens: {
        soy: 'Soy',
        gluten: 'Gluten',
        milk: 'Lactose',
        peanuts: 'Peanuts',
        eggs: 'Eggs',
        fish: 'Fish',
        nuts: 'Nuts',
        shellfish: 'Shellfish',
        celery: 'Celery',
        mustard: 'Mustard',
        sesamy_seeds: 'Sesamy seeds',
        sulfites: 'Sulfites',
        invertebrates: 'Invertebrates',
      },
      about_us_heading: 'Heading for "About us"',
      about_us_text: 'Text for "About us"',
      contact_us_heading: 'Heading for "Contact us"',
      contact_us_text: 'Text for "Contact us"',
      contact_us_address: 'Business address',
      contact_us_email: 'Business email',
      contact_us_phone: 'Business phone',
      cta_is_active: 'Button is active ?',
      cta_text: 'CTA button text',
      days_is_active: 'Days section is active ?',
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
      placed_on: 'This order was placed on',
      of: 'from',
      to_be_delivered: 'wants the order delivered at',
      ordered_goods_to: 'ordered goods to be delivered at',
      on: 'on the',
      confirmed: 'Tomorrows orders',
      production: 'Production',
      to_be_produced: 'Generate production report',
      invoicing: 'Invoicing',
      recurring: 'Recurring',
      oustanding: 'Oustanding',
      history: 'History',
      to_be_invoiced: 'Generate invoicing report',
      future: 'Future orders',
      history: 'Historical orders',
      filters: 'Filters',
      filter_types: 'Filter types',
      add_filter: 'Add filter',
      sum: 'Sum',
      total: 'total',
      count: 'Count',
      sub_total: 'Sub total ex MVA',
      grand_total: 'Sum total',
      freight: 'Freight',
      pending: 'Pending',
      canceled: 'Canceled',
      completed: 'Completed',
      order_status: 'Order Status'
    },

    /*

    ########  ########  #### ##    ## ########
    ##     ## ##     ##  ##  ###   ##    ##
    ##     ## ##     ##  ##  ####  ##    ##
    ########  ########   ##  ## ## ##    ##
    ##        ##   ##    ##  ##  ####    ##
    ##        ##    ##   ##  ##   ###    ##
    ##        ##     ## #### ##    ##    ##

    */
    print: {
      make: 'Make',
      product: 'Product',
      count: 'Count',
      created_at: 'Order created at:',
      comment: 'Comment',
      contact_person: 'Contact person',
      phone_number: 'Phone number',
      pack: 'Delivery note',
      deliver: 'Deliver',
      delivery_instructions: 'Delivery instructions',
      order_number: 'Order #'
    },
    print_invoice: {
      title: 'Order summary',
      period: 'Period',
      count: 'Count',
      report_date: 'Report date',
      delivery_date: 'Delivery date',
      delivery_note: 'Delivery note'
    }
  }
}