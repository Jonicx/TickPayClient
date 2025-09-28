import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  setLanguagePreference: (lang: Language) => void;
}

interface Translations {
  en: {
    [key: string]: string;
  };
  sw: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.events": "Events",
    "nav.about": "About",
    "nav.myTickets": "My Tickets",
    "nav.howToSell": "How to Sell",
    "nav.contact": "Contact",

    // Home page
    "home.tagline": "Your Premium Ticket Experience",
    "home.title": "Discover Amazing Events in Tanzania",
    "home.subtitle":
      "From live concerts to sports events, food festivals to comedy shows - find and book tickets for the best experiences across Tanzania.",
    "home.exploreEvents": "Explore Events",
    "home.myTickets": "My Tickets",
    "home.featuredEvents": "Featured Events",
    "home.featuredDesc":
      "Don't miss out on these popular events happening soon",
    "home.viewAllEvents": "View All Events",
    "home.trustedBy": "Trusted by Thousands",

    // Events page
    "events.tagline": "Premium Events",
    "events.title": "All Events",
    "events.description":
      "Find and book tickets for amazing events across Tanzania",
    "events.searchPlaceholder": "Search events, venues, or locations...",
    "events.showing": "Showing",
    "events.of": "of",
    "events.eventsCount": "events",
    "events.noEventsTitle": "No events found",
    "events.noEventsDesc":
      "Try adjusting your search or filters to find more events.",
    "events.clearFilters": "Clear Filters",
    "events.categories.all": "All",
    "events.categories.music": "Music",
    "events.categories.sports": "Sports",
    "events.categories.food": "Food",
    "events.categories.comedy": "Comedy",
    "events.categories.business": "Business",

    // About page
    "about.tagline": "About TickPay",
    "about.title": "Your Gateway to",
    "about.titleHighlight": "Amazing Experiences",
    "about.description":
      "TickPay is Tanzania's premier event ticketing platform, connecting people with unforgettable experiences across the country.",
    "about.storyTitle": "Our Story",
    "about.storyContent1":
      "Founded in 2025, TickPay was born from a simple vision: to make discovering and attending events in Tanzania as easy and enjoyable as possible. We recognized that Tanzania has a vibrant cultural scene with incredible music, sports, food festivals, comedy shows, and business events, but people often struggled to find and book tickets for these experiences.",
    "about.storyContent2":
      "Our team of passionate technologists and event enthusiasts came together to create a platform that would bridge this gap. We wanted to build something that would not only make ticket booking seamless but also help event organizers reach wider audiences and grow their events.",
    "about.storyContent3":
      "Today, TickPay serves customers across Tanzania, from Dar es Salaam to Zanzibar, from Arusha to Mwanza. We're proud to be part of Tanzania's growing digital economy and to contribute to the success of local events and entertainment.",
    "about.featuresTagline": "Premium Platform",
    "about.featuresTitle": "Why Choose TickPay?",
    "about.featuresDesc":
      "We're committed to providing the best ticketing experience in Tanzania",
    "about.feature1Title": "Secure Payments",
    "about.feature1Desc":
      "Your transactions are protected with bank-level security and encryption.",
    "about.feature2Title": "Easy Booking",
    "about.feature2Desc":
      "Find and book tickets for events across Tanzania in just a few clicks.",
    "about.feature3Title": "Trusted Platform",
    "about.feature3Desc":
      "Join thousands of satisfied customers who trust TickPay for their events.",
    "about.feature4Title": "Quality Events",
    "about.feature4Desc":
      "We partner with the best event organizers to bring you amazing experiences.",
    "about.missionTitle": "Our Mission",
    "about.missionContent":
      "To democratize access to events and entertainment in Tanzania by providing a reliable, secure, and user-friendly platform that connects event-goers with amazing experiences while supporting local event organizers and artists.",
    "about.stats1": "Events Hosted",
    "about.stats2": "Happy Customers",
    "about.stats3": "Cities Covered",

    // Profile
    "profile.title": "Account Settings",
    "profile.subtitle": "Manage your account details and preferences",
    "profile.profileTab": "Profile",
    "profile.securityTab": "Security", 
    "profile.preferencesTab": "Preferences",
    "profile.notificationsTab": "Notifications",
    "profile.profileInfo": "Profile Information",
    "profile.edit": "Edit",
    "profile.cancel": "Cancel",
    "profile.save": "Save",
    "profile.saveChanges": "Save Changes",
    "profile.saving": "Saving...",
    "profile.updating": "Updating...",
    "profile.admin": "Admin",
    "profile.firstName": "First Name",
    "profile.lastName": "Last Name",
    "profile.email": "Email Address",
    "profile.phone": "Phone Number",
    "profile.firstNamePlaceholder": "Enter your first name",
    "profile.lastNamePlaceholder": "Enter your last name", 
    "profile.emailPlaceholder": "Enter your email address",
    "profile.phonePlaceholder": "Enter your phone number",
    "profile.updateSuccess": "Profile Updated",
    "profile.profileUpdatedDesc": "Your profile has been successfully updated.",
    "profile.updateError": "Update Failed",
    "profile.security": "Security Settings",
    "profile.currentPassword": "Current Password",
    "profile.newPassword": "New Password",
    "profile.confirmPassword": "Confirm New Password",
    "profile.currentPasswordPlaceholder": "Enter your current password",
    "profile.newPasswordPlaceholder": "Enter a new password",
    "profile.confirmPasswordPlaceholder": "Confirm your new password",
    "profile.updatePassword": "Update Password",
    "profile.passwordUpdateSuccess": "Password Updated",
    "profile.passwordUpdatedDesc": "Your password has been successfully changed.",
    "profile.passwordUpdateError": "Password Update Failed",
    "profile.preferences": "Preferences",
    "profile.language": "Language",
    "profile.languageDesc": "Choose your preferred language",
    "profile.notifications": "Notification Settings",
    "profile.emailNotifications": "Email Notifications",
    "profile.emailNotificationsDesc": "Receive notifications via email",
    "profile.pushNotifications": "Push Notifications", 
    "profile.pushNotificationsDesc": "Receive push notifications in browser",
    "profile.smsNotifications": "SMS Notifications",
    "profile.smsNotificationsDesc": "Receive notifications via SMS",
    "profile.eventReminders": "Event Reminders",
    "profile.eventRemindersDesc": "Get reminded about upcoming events",
    "profile.paymentConfirmations": "Payment Confirmations",
    "profile.paymentConfirmationsDesc": "Receive payment confirmation messages",
    "profile.promotionalEmails": "Promotional Emails",
    "profile.promotionalEmailsDesc": "Receive marketing and promotional content",
    "profile.loginRequired": "Login Required",
    "profile.loginRequiredDesc": "Please log in to access your profile settings.",

    // Contact page
    "contact.tagline": "Get in Touch",
    "contact.title": "We'd Love to",
    "contact.titleHighlight": "Hear From You",
    "contact.description":
      "Have questions about events, need help with your tickets, or want to partner with us? We're here to help.",
    "contact.formTitle": "Send us a Message",
    "contact.nameLabel": "Full Name",
    "contact.namePlaceholder": "John Doe",
    "contact.emailLabel": "Email Address",
    "contact.emailPlaceholder": "john@example.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Tell us how we can help you...",
    "contact.sendButton": "Send Message",
    "contact.sendingButton": "Sending Message...",
    "contact.successTitle": "Message Sent!",
    "contact.successDesc":
      "Thank you for reaching out. We'll get back to you within 24 hours.",
    "contact.infoTagline": "Get In Touch",
    "contact.infoTitle": "Contact Information",
    "contact.infoDesc": "We're here to help with any questions or concerns",
    "contact.emailTitle": "Email Us",
    "contact.emailDetail": "support@tickpay.co.tz",
    "contact.emailDesc": "Send us an email and we'll respond within 24 hours",
    "contact.phoneTitle": "Call Us",
    "contact.phoneDetail": "+255 123 456 789",
    "contact.phoneDesc": "Monday to Friday, 8:00 AM to 6:00 PM EAT",
    "contact.visitTitle": "Visit Us",
    "contact.visitDetail": "Dar es Salaam, Tanzania",
    "contact.visitDesc": "Our office is located in the heart of the city",
    "contact.faqTitle": "Frequently Asked Questions",
    "contact.faqDesc":
      "Before reaching out, check if your question is answered in our common questions:",
    "contact.faq1": "How do I transfer or refund my ticket?",
    "contact.faq2": "What if I lose my QR code?",
    "contact.faq3": "How do I change my event date?",
    "contact.faq4": "What payment methods do you accept?",

    // My Tickets page
    "tickets.tagline": "Your Collection",
    "tickets.title": "My Tickets",
    "tickets.description": "View and manage your purchased event tickets",
    "tickets.findEvents": "Find Events",
    "tickets.noTicketsTitle": "No tickets yet",
    "tickets.noTicketsDesc":
      "You haven't purchased any tickets yet. Explore events and book your first ticket to get started.",
    "tickets.exploreEvents": "Explore Events",
    "tickets.instructionsTitle": "How to use your tickets:",
    "tickets.instruction1":
      "Arrive at the venue 30 minutes before the event starts",
    "tickets.instruction2":
      "Present your QR code at the entrance for quick scanning",
    "tickets.instruction3":
      "Keep your phone charged or take a screenshot as backup",

    // How to Sell page
    "sell.tagline": "For Event Organizers",
    "sell.title": "Sell Tickets with",
    "sell.titleHighlight": "TickPay",
    "sell.description":
      "Everything you need to go live in just a few quick steps. No hidden fees, no hassles — just the joy of making great events happen.",
    "sell.requestCall": "Request a Sales Call",
    "sell.createEvent": "Create Event",
    "sell.setupTitle": "Setup",
    "sell.setupDesc":
      "Create, update, and customise your event from the dashboard anytime. Submit when ready and update wherever, whenever.",
    "sell.promoteTitle": "Promote",
    "sell.promoteDesc":
      "Elevate your marketing efforts with TickPay's smart tools: social sharing, tracking links, promotional codes, contact lists, invitations and more.",
    "sell.executeTitle": "On The Day",
    "sell.executeDesc":
      "We offer a range of additional services including scanning equipment, on-site ticket sales, contactless payments, and access to our world-class field service team.",
    "sell.analyticsTitle": "Understand",
    "sell.analyticsDesc":
      "Access real-time reports, analytics, and reviews with our cutting-edge event dashboards.",
    "sell.calculatorTitle": "Ticket Sales Estimate",
    "sell.calculatorDesc":
      "TickPay offers two fees: commission and booking fees. Typically, event organisers pay the commission, and ticket buyers pay the booking fees. However, flexible pricing allows you to choose who pays which fee.",
    "sell.calculator.guests": "Number of Guests",
    "sell.calculator.ticketPrice": "Average ticket price",
    "sell.calculator.orderSize": "Average order size",
    "sell.calculator.commissionFee": "Commission fee",
    "sell.calculator.bookingFee": "Booking fee",
    "sell.calculator.organizerPays": "I will pay",
    "sell.calculator.guestsPay": "Guests will pay",
    "sell.calculator.guestsPayPerOrder": "Guests pay per order",
    "sell.calculator.turnover": "Turnover",
    "sell.calculator.youReceive": "You'd Receive",
    "sell.calculator.tickets": "Tickets",
    "sell.calculator.perOrder": "per order",
    "sell.calculator.inclVat": "incl. VAT",
    "sell.features.reservedSeating": "Reserved Seating",
    "sell.features.reservedSeatingDesc":
      "Effortlessly create your perfect seating plan for any venue, from a small hall to a massive stadium, with our drag-and-drop feature.",
    "sell.features.ticketScanning": "Ticket Scanning",
    "sell.features.ticketScanningDesc":
      "Use our free cutting-edge app to scan tickets on your mobile phone at the venue and access relevant info on your TickPay profile.",
    "sell.features.recurringEvents": "Recurring Events",
    "sell.features.recurringEventsDesc":
      "Automatically reuse the same setup for multi-day, regular, or repeated events. No need to rebuild.",
    "sell.features.analytics": "Real-Time Analytics",
    "sell.features.analyticsDesc":
      "Access comprehensive analytics directly from your TickPay dashboard, including site visits, sources, sales reports, check-in reports, and much more.",

    // Event cards
    "event.viewDetails": "View Details",
    "event.byBoda": "by boda",
    "event.bookNow": "Book Now",
    "event.soldOut": "Sold Out",
    "event.from": "From",

    // Event details
    "eventDetails.backToEvents": "Back to Events",
    "eventDetails.notFound": "Event not found",
    "eventDetails.bookTicket": "Book Ticket",
    "eventDetails.preview3D": "3D Preview",
    "eventDetails.eventDetails": "Event Details",
    "eventDetails.venue": "Venue",
    "eventDetails.dateTime": "Date & Time",
    "eventDetails.transport": "Transport",
    "eventDetails.weather": "Weather",
    "eventDetails.organizer": "Organizer",
    "eventDetails.price": "Price",
    "eventDetails.dalaDalaRoutes": "Dala Dala Routes",
    "eventDetails.bodaBodaTime": "Boda Boda Time",
    "eventDetails.walkingDistance": "Walking Distance",
    "eventDetails.weatherCondition": "Condition",
    "eventDetails.temperature": "Temperature",
    "eventDetails.outdoorEvent": "Outdoor Event",
    "eventDetails.indoorEvent": "Indoor Event",
    "eventDetails.premiumExperience": "Premium Experience",
    "eventDetails.eventLocation": "Event Location",
    "eventDetails.bookYourTicket": "Book Your Ticket",
    "eventDetails.date": "Date",
    "eventDetails.time": "Time",
    "eventDetails.perTicket": "per ticket",
    "eventDetails.bookNow": "Book Now",
    "eventDetails.securePayment": "Secure payment with M-Pesa",
    "eventDetails.digitalTicket": "Digital Ticket Preview",
    "eventDetails.view3DPreview": "View 3D Preview",
    "eventDetails.qrCodeMessage": "This QR code will be generated after purchase",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.retry": "Retry",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",
    "common.submit": "Submit",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.currency": "TZS",
  },
  sw: {
    // Navigation
    "nav.home": "Nyumbani",
    "nav.events": "Matukio",
    "nav.about": "Kuhusu",
    "nav.myTickets": "Tiketi Zangu",
    "nav.howToSell": "Jinsi ya Kuuza",
    "nav.contact": "Mawasiliano",

    // Home page
    "home.tagline": "Uzoefu Wako wa Tiketi za Ubora",
    "home.title": "Gundua Matukio ya Ajabu Tanzania",
    "home.subtitle":
      "Kutoka tamasha za muziki hadi michezo, sherehe za chakula hadi vipindi vya ucheshi - tafuta na uagize tiketi za uzoefu bora nchini Tanzania.",
    "home.exploreEvents": "Gundua Matukio",
    "home.myTickets": "Tiketi Zangu",
    "home.featuredEvents": "Matukio Maarufu",
    "home.featuredDesc":
      "Usisahau matukio haya maarufu yanayotokea hivi karibuni",
    "home.viewAllEvents": "Ona Matukio Yote",
    "home.trustedBy": "Tunaaminika na Maelfu",

    // Events page
    "events.tagline": "Matukio ya Ubora",
    "events.title": "Matukio Yote",
    "events.description":
      "Tafuta na uagize tiketi za matukio ya kushangaza nchini Tanzania",
    "events.searchPlaceholder": "Tafuta matukio, viwanja, au maeneo...",
    "events.showing": "Inaonyesha",
    "events.of": "ya",
    "events.eventsCount": "matukio",
    "events.noEventsTitle": "Hakuna matukio yaliyopatikana",
    "events.noEventsDesc":
      "Jaribu kurekebisha utafutaji wako au kichujio ili kupata matukio zaidi.",
    "events.clearFilters": "Futa Kichujio",
    "events.categories.all": "Yote",
    "events.categories.music": "Muziki",
    "events.categories.sports": "Michezo",
    "events.categories.food": "Chakula",
    "events.categories.comedy": "Ucheshi",
    "events.categories.business": "Biashara",

    // About page
    "about.tagline": "Kuhusu TickPay",
    "about.title": "Mlango Wako wa",
    "about.titleHighlight": "Uzoefu wa Kushangaza",
    "about.description":
      "TickPay ni jukwaa la kwanza la tiketi za matukio nchini Tanzania, linawaunganisha watu na uzoefu usiosahaulika kote nchini.",
    "about.storyTitle": "Hadithi Yetu",
    "about.storyContent1":
      "Ilianzishwa mnamo 2025, TickPay ilizaliwa kutokana na maono rahisi: kufanya ugunduo na kuhudhuria matukio nchini Tanzania kuwa rahisi na kufurahisha kadri inavyowezekana. Tuligundua kuwa Tanzania ina mazingira ya kitamaduni yenye haraka na muziki wa kushangaza, michezo, sherehe za chakula, vipindi vya ucheshi, na matukio ya kibiashara, lakini watu mara nyingi walikuwa na changamoto za kupata na kuagiza tiketi za uzoefu huu.",
    "about.storyContent2":
      "Timu yetu ya wateknolojia wenye shauku na wapenzi wa matukio walikuja pamoja kuunda jukwaa ambalo lingeboresha pengo hilo. Tulitaka kujenga kitu ambacho hakingefanya tu uagizo wa tiketi kuwa rahisi lakini pia kusaidia waandaaji wa matukio kufikia hadhira kubwa na kukuza matukio yao.",
    "about.storyContent3":
      "Leo, TickPay inahudumia wateja kote Tanzania, kutoka Dar es Salaam hadi Zanzibar, kutoka Arusha hadi Mwanza. Tunajivunia kuwa sehemu ya uchumi wa kidijitali unaokua wa Tanzania na kuchangia mafanikio ya matukio ya ndani na burudani.",
    "about.featuresTagline": "Jukwaa la Ubora",
    "about.featuresTitle": "Kwa Nini Chagua TickPay?",
    "about.featuresDesc":
      "Tumejitolea kutoa uzoefu bora wa kutoa tiketi nchini Tanzania",
    "about.feature1Title": "Malipo Salama",
    "about.feature1Desc":
      "Miamala yako inalindwa na usalama wa kiwango cha benki na usimbaji.",
    "about.feature2Title": "Uagizo Rahisi",
    "about.feature2Desc":
      "Tafuta na uagize tiketi za matukio kote Tanzania kwa mibonyezo michache tu.",
    "about.feature3Title": "Jukwaa la Kuaminika",
    "about.feature3Desc":
      "Jiunge na maelfu ya wateja wenye kuridhika ambao wanaamini TickPay kwa matukio yao.",
    "about.feature4Title": "Matukio ya Ubora",
    "about.feature4Desc":
      "Tunashirikiana na waandaaji bora wa matukio ili kukuletea uzoefu wa kushangaza.",
    "about.missionTitle": "Dhamira Yetu",
    "about.missionContent":
      "Kudemokratiza ufikiaji wa matukio na burudani nchini Tanzania kwa kutoa jukwaa la kuaminika, salama, na rahisi kwa mtumiaji ambalo linawaunganisha waendaji wa matukio na uzoefu wa kushangaza huku tukiwasaidia waandaaji wa matukio ya ndani na wasanii.",
    "about.stats1": "Matukio Yaliyofanyika",
    "about.stats2": "Wateja Wenye Furaha",
    "about.stats3": "Miji Iliyofunikwa",

    // Profile
    "profile.title": "Mipangilio ya Akaunti",
    "profile.subtitle": "Simamia maelezo ya akaunti na mapendekezo yako",
    "profile.profileTab": "Wasifu",
    "profile.securityTab": "Usalama", 
    "profile.preferencesTab": "Mapendekezo",
    "profile.notificationsTab": "Arifa",
    "profile.profileInfo": "Taarifa za Wasifu",
    "profile.edit": "Hariri",
    "profile.cancel": "Ghairi",
    "profile.save": "Hifadhi",
    "profile.saveChanges": "Hifadhi Mabadiliko",
    "profile.saving": "Inahifadhi...",
    "profile.updating": "Inasasisha...",
    "profile.admin": "Msimamizi",
    "profile.firstName": "Jina la Kwanza",
    "profile.lastName": "Jina la Mwisho",
    "profile.email": "Anwani ya Barua Pepe",
    "profile.phone": "Nambari ya Simu",
    "profile.firstNamePlaceholder": "Weka jina lako la kwanza",
    "profile.lastNamePlaceholder": "Weka jina lako la mwisho", 
    "profile.emailPlaceholder": "Weka anwani ya barua pepe",
    "profile.phonePlaceholder": "Weka nambari ya simu",
    "profile.updateSuccess": "Wasifu Umesasishwa",
    "profile.profileUpdatedDesc": "Wasifu wako umesasishwa kwa ufanisi.",
    "profile.updateError": "Usasishaji Umeshindikana",
    "profile.security": "Mipangilio ya Usalama",
    "profile.currentPassword": "Nenosiri la Sasa",
    "profile.newPassword": "Nenosiri Jipya",
    "profile.confirmPassword": "Thibitisha Nenosiri Jipya",
    "profile.currentPasswordPlaceholder": "Weka nenosiri lako la sasa",
    "profile.newPasswordPlaceholder": "Weka nenosiri jipya",
    "profile.confirmPasswordPlaceholder": "Thibitisha nenosiri jipya",
    "profile.updatePassword": "Sasisha Nenosiri",
    "profile.passwordUpdateSuccess": "Nenosiri Limesasishwa",
    "profile.passwordUpdatedDesc": "Nenosiri lako limebadilishwa kwa ufanisi.",
    "profile.passwordUpdateError": "Usasishaji wa Nenosiri Umeshindikana",
    "profile.preferences": "Mapendekezo",
    "profile.language": "Lugha",
    "profile.languageDesc": "Chagua lugha unayopendelea",
    "profile.notifications": "Mipangilio ya Arifa",
    "profile.emailNotifications": "Arifa za Barua Pepe",
    "profile.emailNotificationsDesc": "Pokea arifa kupitia barua pepe",
    "profile.pushNotifications": "Arifa za Kusonga", 
    "profile.pushNotificationsDesc": "Pokea arifa za kusonga katika kivinjari",
    "profile.smsNotifications": "Arifa za SMS",
    "profile.smsNotificationsDesc": "Pokea arifa kupitia SMS",
    "profile.eventReminders": "Vikumbusho vya Matukio",
    "profile.eventRemindersDesc": "Kumbushwa kuhusu matukio yanayokuja",
    "profile.paymentConfirmations": "Uthibitisho wa Malipo",
    "profile.paymentConfirmationsDesc": "Pokea ujumbe wa uthibitisho wa malipo",
    "profile.promotionalEmails": "Barua Pepe za Uuzaji",
    "profile.promotionalEmailsDesc": "Pokea maudhui ya uuzaji na utangazaji",
    "profile.loginRequired": "Unahitaji Kuingia",
    "profile.loginRequiredDesc": "Tafadhali ingia ili kufikia mipangilio ya wasifu wako.",

    // Contact page
    "contact.tagline": "Wasiliana Nasi",
    "contact.title": "Tungependa",
    "contact.titleHighlight": "Kusikia Kutoka Kwako",
    "contact.description":
      "Una maswali kuhusu matukio, unahitaji msaada na tiketi zako, au unataka kushirikiana nasi? Tuko hapa kukusaidia.",
    "contact.formTitle": "Tutumie Ujumbe",
    "contact.nameLabel": "Jina Kamili",
    "contact.namePlaceholder": "John Doe",
    "contact.emailLabel": "Anwani ya Barua Pepe",
    "contact.emailPlaceholder": "john@example.com",
    "contact.messageLabel": "Ujumbe",
    "contact.messagePlaceholder": "Tuambie jinsi tunavyoweza kukusaidia...",
    "contact.sendButton": "Tuma Ujumbe",
    "contact.sendingButton": "Inatuma Ujumbe...",
    "contact.successTitle": "Ujumbe Umetumwa!",
    "contact.successDesc":
      "Asante kwa kutufikia. Tutakujibu ndani ya masaa 24.",
    "contact.infoTagline": "Wasiliana Nasi",
    "contact.infoTitle": "Taarifa za Mawasiliano",
    "contact.infoDesc": "Tuko hapa kusaidia na maswali yoyote au wasiwasi",
    "contact.emailTitle": "Tutumie Barua Pepe",
    "contact.emailDetail": "support@tickpay.co.tz",
    "contact.emailDesc": "Tutumie barua pepe na tutajibu ndani ya masaa 24",
    "contact.phoneTitle": "Tupigie Simu",
    "contact.phoneDetail": "+255 123 456 789",
    "contact.phoneDesc": "Jumatatu hadi Ijumaa, 8:00 AM hadi 6:00 PM EAT",
    "contact.visitTitle": "Tutembelee",
    "contact.visitDetail": "Dar es Salaam, Tanzania",
    "contact.visitDesc": "Ofisi yetu ipo katikati ya jiji",
    "contact.faqTitle": "Maswali Yanayoulizwa Mara Kwa Mara",
    "contact.faqDesc":
      "Kabla ya kutufikia, angalia kama swali lako limejibiwa katika maswali yetu ya kawaida:",
    "contact.faq1": "Ninawezaje kuhamisha au kurejeshea tiketi yangu?",
    "contact.faq2": "Nikinipoteza msimbo wangu wa QR?",
    "contact.faq3": "Ninawezaje kubadilisha tarehe ya tukio langu?",
    "contact.faq4": "Mnakubali njia gani za kulipa?",

    // My Tickets page
    "tickets.tagline": "Mkusanyiko Wako",
    "tickets.title": "Tiketi Zangu",
    "tickets.description": "Ona na udhibiti tiketi zako ulizonunua",
    "tickets.findEvents": "Tafuta Matukio",
    "tickets.noTicketsTitle": "Hakuna tiketi bado",
    "tickets.noTicketsDesc":
      "Bado hujamunua tiketi yoyote. Gundua matukio na uagize tiketi yako ya kwanza ili kuanza.",
    "tickets.exploreEvents": "Gundua Matukio",
    "tickets.instructionsTitle": "Jinsi ya kutumia tiketi zako:",
    "tickets.instruction1": "Fika uwandani dakika 30 kabla ya tukio kuanza",
    "tickets.instruction2":
      "Onyesha msimbo wako wa QR kwenye mlango wa kuingia kwa msimamizi wa haraka",
    "tickets.instruction3":
      "Weka simu yako imejaa chaji au chukua picha kama backup",

    // How to Sell page
    "sell.tagline": "Kwa Waandaaji wa Matukio",
    "sell.title": "Uza Tiketi na",
    "sell.titleHighlight": "TickPay",
    "sell.description":
      "Kila kitu unachohitaji kuanza maisha katika hatua chache za haraka. Hakuna ada zilizofichwa, hakuna shida - ni furaha tu ya kufanya matukio makuu yatokee.",
    "sell.requestCall": "Omba Simu ya Mauzo",
    "sell.createEvent": "Unda Tukio",
    "sell.setupTitle": "Usanidi",
    "sell.setupDesc":
      "Unda, sasisha, na urekebishe tukio lako kutoka dashboard wakati wowote. Wasilisha unapotatayari na usasisha popote, wakati wowote.",
    "sell.promoteTitle": "Tangaza",
    "sell.promoteDesc":
      "Inua juhudi zako za uuzaji na vifaa vyetu vya akili: kushiriki kwa kijamii, viungo vya ufuatiliaji, misimbo ya kichocheo, orodha za mawasiliano, mialiko na zaidi.",
    "sell.executeTitle": "Siku ya Tukio",
    "sell.executeDesc":
      "Tunatoa huduma mbalimbali za ziada ikiwa ni pamoja na vifaa vya kusimama, mauzo ya tiketi pahali hapo, malipo yasiyo ya kugusa, na ufikiaji wa timu yetu ya ubora wa juu ya uwandani.",
    "sell.analyticsTitle": "Elewa",
    "sell.analyticsDesc":
      "Pata ripoti za wakati halisi, uchanganuzi, na utathmini na dashibodi zetu za hali ya juu za matukio.",
    "sell.calculatorTitle": "Makadirio ya Mauzo ya Tiketi",
    "sell.calculatorDesc":
      "TickPay inatoa ada mbili: kamisheni na ada za uagizo. Kwa kawaida, waandaaji wa matukio hulipa kamisheni, na wanunuzi wa tiketi hulipa ada za uagizo. Hata hivyo, bei rahisi inakuruhusu kuchagua ni nani alipa ada gani.",
    "sell.calculator.guests": "Idadi ya Wageni",
    "sell.calculator.ticketPrice": "Bei ya wastani ya tiketi",
    "sell.calculator.orderSize": "Ukubwa wa wastani wa agizo",
    "sell.calculator.commissionFee": "Ada ya kamisheni",
    "sell.calculator.bookingFee": "Ada ya uagizo",
    "sell.calculator.organizerPays": "Mimi nitalipa",
    "sell.calculator.guestsPay": "Wageni watalipa",
    "sell.calculator.guestsPayPerOrder": "Wageni wanalipa kwa agizo",
    "sell.calculator.turnover": "Mzunguko",
    "sell.calculator.youReceive": "Ungepokea",
    "sell.calculator.tickets": "Tiketi",
    "sell.calculator.perOrder": "kwa agizo",
    "sell.calculator.inclVat": "ikiwa ni pamoja na VAT",
    "sell.features.reservedSeating": "Viti Vilivyohifadhiwa",
    "sell.features.reservedSeatingDesc":
      "Unda mpango wako kamili wa kiti kwa uwanda wowote, kutoka ukumbi mdogo hadi stadium kubwa, na kipengele chetu cha kukokota na kuweka.",
    "sell.features.ticketScanning": "Kusimama Tiketi",
    "sell.features.ticketScanningDesc":
      "Tumia programu yetu ya bure ya hali ya juu kusimama tiketi kwenye simu yako ya mkono uwandani na upate taarifa husika kwenye wasifu wako wa TickPay.",
    "sell.features.recurringEvents": "Matukio Yanayorudiwa",
    "sell.features.recurringEventsDesc":
      "Tumia kiotomatiki mpangilio sawa kwa matukio ya siku nyingi, ya kawaida, au yanayorudiwa. Hakuna haja ya kujenga upya.",
    "sell.features.analytics": "Uchanganuzi wa Wakati Halisi",
    "sell.features.analyticsDesc":
      "Pata uchanganuzi mkamilifu moja kwa moja kutoka dashboard yako ya TickPay, ikiwa ni pamoja na ziara za tovuti, vyanzo, ripoti za mauzo, ripoti za uwekaji wa alama, na mengi zaidi.",

    // Event cards
    "event.viewDetails": "Ona Maelezo",
    "event.byBoda": "kwa boda",
    "event.bookNow": "Agiza Sasa",
    "event.soldOut": "Zimekwisha",
    "event.from": "Kutoka",

    // Event details
    "eventDetails.backToEvents": "Rudi Matukioz",
    "eventDetails.notFound": "Tukio halijapatikana",
    "eventDetails.bookTicket": "Agiza Tiketi",
    "eventDetails.preview3D": "Muonekano wa 3D",
    "eventDetails.eventDetails": "Maelezo ya Tukio",
    "eventDetails.venue": "Uwanda",
    "eventDetails.dateTime": "Tarehe na Wakati",
    "eventDetails.transport": "Usafiri",
    "eventDetails.weather": "Hali ya Hewa",
    "eventDetails.organizer": "Mpangaji",
    "eventDetails.price": "Bei",
    "eventDetails.dalaDalaRoutes": "Njia za Dala Dala",
    "eventDetails.bodaBodaTime": "Wakati wa Boda Boda",
    "eventDetails.walkingDistance": "Umbali wa Kutembea",
    "eventDetails.weatherCondition": "Hali",
    "eventDetails.temperature": "Joto",
    "eventDetails.outdoorEvent": "Tukio la Nje",
    "eventDetails.indoorEvent": "Tukio la Ndani",
    "eventDetails.premiumExperience": "Uzoefu wa Hali ya Juu",
    "eventDetails.eventLocation": "Mahali pa Tukio",
    "eventDetails.bookYourTicket": "Agiza Tiketi Yako",
    "eventDetails.date": "Tarehe",
    "eventDetails.time": "Wakati",
    "eventDetails.perTicket": "kwa tiketi",
    "eventDetails.bookNow": "Agiza Sasa",
    "eventDetails.securePayment": "Malipo salama na M-Pesa",
    "eventDetails.digitalTicket": "Muonekano wa Tiketi ya Kidijitali",
    "eventDetails.view3DPreview": "Ona Muonekano wa 3D",
    "eventDetails.qrCodeMessage": "Msimbo huu wa QR utatengenezwa baada ya ununuzi",

    // Common
    "common.loading": "Inapakia...",
    "common.error": "Hitilafu",
    "common.retry": "Jaribu Tena",
    "common.save": "Hifadhi",
    "common.cancel": "Ghairi",
    "common.edit": "Hariri",
    "common.delete": "Futa",
    "common.confirm": "Thibitisha",
    "common.back": "Rudi",
    "common.next": "Ijayo",
    "common.previous": "Iliyopita",
    "common.close": "Funga",
    "common.submit": "Wasilisha",
    "common.search": "Tafuta",
    "common.filter": "Chuja",
    "common.currency": "TZS",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference (only on client side)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tickpay_language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    // Save language preference (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('tickpay_language', language);
    }
    console.log('LanguageContext: language changed to:', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sw' : 'en';
    console.log('LanguageContext: toggleLanguage: changing from', language, 'to', newLang);
    setLanguage(newLang);
  };

  const setLanguagePreference = (lang: Language) => {
    console.log('LanguageContext: setLanguagePreference to', lang);
    setLanguage(lang);
  };

  const value = {
    language,
    t,
    toggleLanguage,
    setLanguagePreference,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}