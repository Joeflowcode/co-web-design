/* Santiam Nearby lead + tracking config
   Replace bounce/boat phones with your call-tracking numbers.
   Replace form endpoints with Formspree (or Tally) form IDs.
*/
window.SANTIAM_LEADS = {
  emailFallback: "", // optional: hello@yourdomain.com for mailto fallback
  bounce: {
    id: "bounce",
    name: "Bounce House Rentals",
    phone: "", // e.g. "+15415550101"
    phoneDisplay: "", // e.g. "(541) 555-0101"
    // Get a free endpoint at https://formspree.io
    formAction: "https://formspree.io/f/YOUR_BOUNCE_FORM_ID",
    offerPath: "bounce-houses-lyons-oregon.html",
    urgency: "This weekend bookings open"
  },
  boat: {
    id: "boat",
    name: "Boat Concierge",
    phone: "", // e.g. "+15415550102"
    phoneDisplay: "",
    formAction: "https://formspree.io/f/YOUR_BOAT_FORM_ID",
    offerPath: "detroit-lake-boat-concierge.html",
    urgency: "Lake-day delivery still available"
  },
  tire: {
    id: "tire",
    name: "Oregon Mobile Tire",
    phone: "+15415078401",
    phoneDisplay: "(541) 507-8401",
    formAction: "",
    offerPath: "https://oregonmobiletire.com",
    external: true,
    urgency: "24/7 Highway 22 roadside help"
  },
  general: {
    id: "general",
    name: "Santiam Nearby Services",
    phone: "+15415078401",
    phoneDisplay: "(541) 507-8401",
    formAction: "https://formspree.io/f/YOUR_GENERAL_FORM_ID",
    offerPath: "index.html#businesses",
    urgency: "This weekend service requests"
  }
};
