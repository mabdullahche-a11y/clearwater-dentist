/* Edit this file to rebrand every page. Null means unconfirmed. Empty lists hide their sections. */
globalThis.CLEARWATER = {
  clinic: {
    demo: true, name: "Clearwater Dental", tagline: "Dental care, clearly explained.",
    headline: "Know what your teeth need.",
    introduction: "Dental visits in {city} with time for questions and clear answers.",
    city: "Gujranwala", address: "Gujranwala, Pakistan", addressNote: "Demo location. A clinic address will be added here.",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Gujranwala%2C%20Pakistan",
    mapEmbed: "https://maps.google.com/maps?q=Gujranwala%2C%20Pakistan&output=embed",
    website: "", email: "", phone: "", whatsapp: "923215928003", emergency: "",
    social: [], googleProfile: "", rating: null, reviewCount: null,
    hours: { Monday: [["10:00","19:00"]], Tuesday: [["10:00","19:00"]], Wednesday: [["10:00","19:00"]], Thursday: [["10:00","19:00"]], Friday: [["10:00","13:00"],["15:00","19:00"]], Saturday: [["10:00","17:00"]], Sunday: [] },
    detailPhoto: { src:"assets/stock/tools.jpg", alt:"Dental instruments resting on a tray" },
    story: "Clearwater Dental is a fictional Gujranwala practice built around a simple idea: you should understand your options before you decide on treatment.",
    photo: { src: "assets/stock/room.jpg", alt: "An empty dental treatment room with an examination chair and overhead lamp", caption: "Illustrative stock photo. Replace with your clinic." },
  },
  theme: {
    primary: "#0E4F5C", ink: "#10262B", background: "#FBFAF7", mist: "#E8F1F0",
    coral: "#E07A5F", line: "#D9E4E3", white: "#F7FCFB", muted: "#455D60",
    error: "#9B3326", shadow: "#10262B38", scrim: "#10262B99",
    headingFont: "Fraunces", bodyFont: "Manrope", radius: "8px"
  },
  defaultTheme: "teal",
  presets: {
    teal: {},
    navy: { primary: "#183959", ink: "#14283C", mist: "#E8EFF7", line: "#D5E0EB", coral: "#D98268", muted: "#465C71" },
    warm: { primary: "#624735", ink: "#34271E", background: "#FCF8EF", mist: "#F0E6D6", line: "#E1D4C0", coral: "#CE765A", muted: "#615245" }
  },
  categories: [
    ["Preventive","Check-ups, professional cleaning and gum care"],
    ["Cosmetic","Whitening, veneers and smile planning"],
    ["Restorative","Repair damaged teeth and replace missing teeth"],
    ["Orthodontics","Explore braces and clear aligners"],
    ["Surgical","Extractions, wisdom teeth and implants"],
    ["Children’s","Check-ups and care for growing smiles"]
  ],
  reassurance: [
    ["Clear costs before treatment","Ask for an estimate, what it includes and which costs could change after an examination."],
    ["Time for numbing to work","Tell your dentist if you’re nervous or still feel discomfort. Agree on a signal to pause."],
    ["Sterilisation you can see","Ask how instruments are prepared and how the team keeps equipment clean between visits."],
    ["Honest recommendations","Discuss which care is urgent, what can wait and what the alternatives involve."]
  ],
  doctors: [
    { id: "doctor-portrait", name: "", title: "Dentist profile", qualifications: [], speciality: "", years: null,
      bio: "Add the dentist’s verified profile, clinical interests and approach to patient care.",
      photo: null, languages: [], availability: [], sample: true }
  ],
  // Each treatment row becomes a service record. Prices are null until supplied by the clinic.
  services: [
    ["routine-checkup","Routine check-up",0,"An examination of your teeth, gums and mouth.","For anyone due for a check-up or who has noticed a change in their mouth.","Review your health history|Examine your teeth and gums|Discuss findings and next steps","Often one visit","Will I need X-rays?","Your dentist may suggest them if they would help answer a specific question."],
    ["scaling-polishing","Scaling & polishing",0,"Professional cleaning removes hardened deposits that brushing cannot remove.","For people with visible tartar or who have been advised to have a professional clean.","Check your gum health|Remove deposits with dental instruments|Polish where appropriate and discuss home care","Often one visit","Is it the same as whitening?","Cleaning can lift some surface stains. Whitening changes the shade of natural teeth."],
    ["gum-treatment","Gum treatment",0,"Gum care starts with checking for inflammation and measuring the spaces around teeth.","For people with bleeding gums, persistent bad breath or loose teeth.","Check your gums and review risk factors|Discuss cleaning above or below the gumline|Reassess healing and plan maintenance","One or more visits plus review","Can brushing alone remove tartar?","A dental professional removes hardened tartar with instruments."],
    ["teeth-whitening","Teeth whitening",1,"Whitening uses a dental bleaching product to lighten natural teeth.","For adults who want to discuss tooth colour and have had their teeth and gums assessed.","Assess the cause of discolouration|Choose a suitable method and shade goal|Discuss sensitivity and follow-up","Depends on the whitening method","Will my crowns whiten?","Crowns, veneers and fillings do not lighten like natural enamel."],
    ["veneers","Veneers",1,"A veneer covers the front surface of a tooth to change its shape or appearance.","For people exploring options for chips, shape differences or stubborn discolouration.","Check your bite and discuss alternatives|Plan the shape and discuss any enamel removal|Fit the veneer and review your bite","Usually several appointments","Is enamel removal permanent?","Enamel removed during preparation does not grow back. Ask about options before deciding."],
    ["smile-makeover","Smile planning",1,"A consultation to plan changes in tooth shape, position or colour. The plan may involve more than one treatment.","For people who want to understand several cosmetic or functional options together.","Describe what you would like to change|Assess teeth, gums and bite|Discuss staged options and estimates","One planning visit, treatment varies","Do I have to choose several treatments?","Your dentist can discuss individual options and whether any treatment is appropriate."],
    ["root-canal","Root canal",2,"Root canal treatment removes inflamed or infected tissue from inside a tooth and seals the cleaned canals.","For a tooth with damaged or infected pulp when the dentist considers it restorable.","Examine the tooth and take images if needed|Numb the area, clean and seal the canals|Restore the tooth with a filling or crown as advised","One or more visits, plus restoration","Will I need a crown?","That depends on the tooth, its position and how much healthy structure remains."],
    ["dental-fillings","Dental fillings",2,"A filling repairs a cavity or a small area of damaged tooth.","For a tooth with decay, a small chip or a filling that needs replacement.","Assess the tooth|Remove damaged material and place the filling|Check the fit and bite","Often one visit","Can I eat afterwards?","Ask about the material used and wait for numbness to wear off before chewing."],
    ["crowns-bridges","Crowns & bridges",2,"A crown covers a tooth. A bridge uses support from neighbouring teeth or implants to fill a gap.","For people with weakened teeth or a gap they wish to restore.","Assess the tooth or gap and review options|Prepare supporting teeth if needed and take a scan or impression|Fit the restoration and check the bite","Usually several appointments","How do I clean under a bridge?","Your dentist can demonstrate a floss threader or another tool that fits the space."],
    ["dentures","Dentures",2,"Removable dentures replace some or all missing teeth.","For people looking for a removable option for missing teeth.","Check the mouth and take impressions|Try the fit and bite|Fit the denture and review sore spots","Several appointments, including adjustments","Can dentures need adjusting?","Yes. Your mouth can change over time, and a new denture may need early adjustments."],
    ["braces","Braces",3,"Brackets and wires move teeth gradually under supervision.","For children, teens or adults with tooth alignment or bite concerns.","Assess your bite and take records|Fit braces if suitable|Attend adjustments and plan retainers","Often months to several years","Will I need retainers?","Retainers help maintain tooth positions after active treatment. Ask how long to wear them."],
    ["clear-aligners","Clear aligners",3,"Removable trays move teeth in stages according to an orthodontic plan.","For selected alignment or bite concerns after a full assessment.","Review the bite and take scans|Fit trays and discuss daily wear|Check progress and plan retention","Varies with the movements needed","Can I remove them to eat?","Aligners are usually removed to eat and to brush. Follow the wear schedule from your dentist."],
    ["dental-implants","Dental implants",4,"An implant is a fixture placed in the jaw that can support a replacement tooth.","For people with missing teeth when their health, gums and bone are suitable.","Review your health and assess the site|Place the implant if suitable and allow healing|Fit the replacement tooth and plan ongoing care","Usually several months across stages","Is bone grafting always needed?","It depends on the bone available at the proposed site."],
    ["tooth-extraction","Tooth extraction",4,"Extraction removes a tooth when keeping it is unsuitable or other options do not meet your needs.","For teeth that cannot be predictably restored or when removal is recommended for a specific reason.","Review options and take images as needed|Numb the area and remove the tooth|Explain healing, aftercare and replacement options","Often one procedure visit plus healing","What if bleeding will not stop?","Seek emergency medical care if you have heavy bleeding that will not stop."],
    ["wisdom-tooth","Wisdom tooth assessment",4,"A check of how a wisdom tooth is coming through and whether it needs monitoring or treatment.","For pain, swelling or repeated problems around the back teeth.","Examine the area and review imaging if needed|Discuss monitoring, treatment or referral|Plan aftercare if the tooth is removed","Assessment first, procedure and healing vary","Do all wisdom teeth need removal?","Your dentist may recommend monitoring a wisdom tooth that is healthy and causing no problems."],
    ["kids-dentistry","Children’s dentistry",5,"Age-appropriate check-ups, prevention and treatment for children.","For children getting their first teeth, due for a check-up or experiencing a dental concern.","Help your child get familiar with the room|Check teeth and gums when your child is ready|Discuss brushing, prevention and next steps","Often one short check-up","When should my child first visit?","Arrange a first visit after the first tooth appears or by their first birthday."]
  ].map(([slug,name,category,long,who,steps,duration,q,a]) => ({
    slug,name,category,short:long,long,who,steps:steps.split("|"),duration,price:null,faqs:[{q,a}],
    image: category === 0 ? {src:"assets/stock/room.jpg",alt:"An example dental examination room"} :
      category === 2 || category === 4 ? {src:"assets/stock/tools.jpg",alt:"Dental instruments on a tray"} :
      {src:"assets/stock/model.jpg",alt:"Dental tools next to a model of teeth"}
  })),
  featured: ["scaling-polishing","root-canal","clear-aligners"],
  reviews: [],
  faqs: [
    {q:"How do I request an appointment?",a:"Send a WhatsApp message or use the booking form. The clinic confirms the date and time by reply."},
    {q:"Can I ask for an estimate first?",a:"Yes. Ask what the consultation costs and when you can expect a written treatment estimate."},
    {q:"What should I bring to my first visit?",a:"Bring a medication and allergy list and any recent dental records or images you have."},
    {q:"What if I’m nervous about treatment?",a:"Tell your dentist what worries you. Ask them to explain each step and agree on a signal to pause."},
    {q:"How can I change my appointment?",a:"Use the same WhatsApp conversation to request a different time."}
  ],
  blog: [
    {slug:"flossing",title:"How to clean between your teeth",topic:"Everyday care",source:"https://www.ada.org/resources/ada-library/oral-health-topics/floss",body:["A toothbrush cleans the surfaces it can reach. Floss or an interdental brush helps reach the areas where teeth meet. Try cleaning between your teeth once a day, at a time you can stick with.","Guide the floss gently between two teeth. Curve it around the side of one tooth and slide it up and down, then repeat against its neighbour. Avoid snapping the floss into your gums.","If you have a bridge, braces or larger gaps, ask your dentist to show you a tool that fits. Mention bleeding that keeps coming back."]},
    {slug:"children",title:"Caring for your child’s first teeth",topic:"Children’s care",source:"https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes",body:["Start brushing when the first tooth appears. Use a soft child-sized brush and a tiny smear of fluoride toothpaste for children under three. For ages three to six, use a pea-sized amount and supervise brushing.","Book a first dental visit when the first tooth comes through or by the first birthday. Early visits help you learn how to care for new teeth and let your child get familiar with the dental setting.","Help with brushing until your child can reach every surface reliably. If brushing feels like a daily struggle, tell your dentist what’s hard and ask for a demonstration."]},
    {slug:"first-visit",title:"What to expect at a first visit",topic:"Your appointment",body:["The visit usually begins with a conversation about your health, previous dental treatment and what you want help with. Bring a list of medications and allergies, and any recent dental X-rays you already have.","Your dentist checks your teeth, gums and mouth. They may suggest X-rays if those would help assess a concern. Ask them to explain what they see and show you where the problem is, if possible.","Before you leave, ask which next steps are time-sensitive and what costs to expect. If you’re nervous, say so at the start and agree on how to pause during the exam."]},
    {slug:"root-canal-myths",title:"Three common root canal myths",topic:"Treatment explained",source:"https://www.aae.org/patients/root-canal-treatment/myths-root-canals/",body:["“A root canal always hurts.” Local anaesthetic is used during treatment. Your experience can vary, so tell the dentist if you feel discomfort and ask what to expect afterwards.","“Removing the tooth is always simpler.” Extraction and root canal treatment solve different problems. Ask whether the tooth can be restored and what keeping or replacing it would involve.","“Treatment ends when the canals are sealed.” The tooth still needs an appropriate final restoration. Ask what type is recommended and when it should be fitted."]}
  ],
  beforeAfter: [
    {title:"Before and after preview",category:1,before:null,after:null,consent:false,sample:true}
  ],
  // Silent previews made from licensed stock photography. Replace with clinic footage.
  reels: [
    {title:"Sample · Treatment room",mp4:"assets/stock/room-demo.mp4",poster:{src:"assets/stock/room-poster.webp",alt:"Empty dental treatment room"}},
    {title:"Sample · Instrument tray",mp4:"assets/stock/tools-demo.mp4",poster:{src:"assets/stock/tools-poster.webp",alt:"Dental instruments laid out on a tray"}},
    {title:"Sample · Dental model",mp4:"assets/stock/model-demo.mp4",poster:{src:"assets/stock/model-poster.webp",alt:"Dental instruments and a model of teeth"}}
  ],
  stats: [],
  technology: [],
  credits: [
    {name:"Pavel Danilyuk (Pexels)",url:"https://www.pexels.com/photo/empty-dentist-office-6812461/"},
    {name:"Polina Zimmerman (Pexels)",url:"https://www.pexels.com/photo/close-up-of-dental-instruments-4687361/"},
    {name:"Cedric Fauntleroy (Pexels)",url:"https://www.pexels.com/photo/close-up-shot-of-dental-tools-4269365/"}
  ],
  emergencySource: "https://www.nhs.uk/nhs-services/dentists/how-to-find-an-nhs-dentist-in-an-emergency/"
};

