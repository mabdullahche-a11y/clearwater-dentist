(() => {
const c = globalThis.CLEARWATER;
const k = c.clinic;
const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const list = (items, render) => items.map(render).join("");
const ext = ' target="_blank" rel="noopener"';
const generic = "Assalam o Alaikum! I'd like to request an appointment at " + k.name + ". Could you please share available slots?";
const wa = (message = generic) => "https://wa.me/" + k.whatsapp + "?text=" + encodeURIComponent(message);
const whatsLabel = "+" + k.whatsapp.replace(/^(92)(\d{3})(\d{7})$/, "$1 $2 $3");
const phone = k.phone || whatsLabel;
const urgent = k.emergency || phone;
const tel = number => "tel:" + number.replace(/[^+\d]/g, "");
const link = (href, label, css = "", external = false) => '<a class="' + css + '" href="' + esc(href) + '"' + (external ? ext : "") + '>' + esc(label) + '</a>';
const book = (label = "Book on WhatsApp", message) => link(wa(message),label,"button",true);
const serviceBook = service => book("Book on WhatsApp", "Assalam o Alaikum! I'd like to book a " + service.name + " consultation at " + k.name + ". Could you please share available slots?");
const mark = '<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M5 20c0-7 5-12 11-12 3 0 5 1 8 3M35 20c0 7-5 12-11 12-3 0-5-1-8-3M8 25l8-8a6 6 0 0 1 8 0l1 1M32 15l-8 8a6 6 0 0 1-8 0l-1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const brand = () => '<a href="index.html" class="brand">' + mark + '<span>' + esc(k.name) + '</span></a>';
const image = (photo, eager = false) => photo?.src ? '<img src="' + esc(photo.src) + '" alt="' + esc(photo.alt) + '" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async">' : '';
const figure = (photo, css = "", eager = false) => {
  if (!photo?.src) return "";
  const media = css === "service-photo"
    ? '<button class="crop zoom" type="button" data-zoom aria-label="Enlarge photo">' + image(photo,eager) + '</button>'
    : '<div class="crop">' + image(photo,eager) + '</div>';
  return '<figure class="' + css + '">' + media + (photo.caption ? '<figcaption>' + esc(photo.caption) + '</figcaption>' : '') + '</figure>';
};
const heading = (title, sub = "") => '<header class="section-head"><h2>' + esc(title) + '</h2>' + (sub ? '<p>' + esc(sub) + '</p>' : '') + '</header>';
const section = (title, content, css = "", sub = "") => content ? '<section class="section ' + css + '"><div class="wrap">' + heading(title,sub) + content + '</div></section>' : '';
const intro = (title, sub) => '<header class="page-intro"><div class="wrap"><h1>' + esc(title) + '</h1><p>' + esc(sub) + '</p></div></header>';
const category = i => c.categories[i]?.[0] ?? String(i);
const price = s => s.price == null ? "Price on request" : "From PKR " + Number(s.price).toLocaleString("en-PK");
const serviceLink = s => s.slug + ".html";
const services = c.services;
const chipSet = (indices, selected = "all") => '<div class="chips" role="group" aria-label="Filter by category">' + list(["all",...indices], i => '<button type="button" data-filter="' + esc(i) + '" aria-pressed="' + (String(i) === String(selected)) + '">' + esc(i === "all" ? "All categories" : category(i)) + '</button>') + '</div>';
const navItems = [["services","Treatments"],["team","Team"],["results","Results"],["about","About"],["contact","Contact"]];
const nav = (page, mobile) => list(mobile ? [...navItems,["reviews","Reviews"],["blog","Journal"],["faq","FAQs"],["booking","Appointment form"]] : navItems, ([id,label]) => '<a href="' + id + '.html"' + (page === id ? ' aria-current="page"' : '') + '>' + label + '</a>');
const hourLabel = time => {
  const [h,m] = time.split(":").map(Number);
  return (h % 12 || 12) + ":" + String(m).padStart(2,"0") + (h >= 12 ? " pm" : " am");
};
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const hours = (compact = false) => {
  const rows = [];
  for (const day of days) {
    const times = (k.hours[day] || []).map(([a,b]) => hourLabel(a) + " to " + hourLabel(b)).join("<br>") || "Closed";
    const last = rows.at(-1);
    if (compact && last?.times === times) last.end = day;
    else rows.push({day,times});
  }
  return '<table class="hours"><caption>' + (k.demo ? "Sample hours (Pakistan time)" : "Opening hours (Pakistan time)") +
    '</caption><tbody>' + list(rows, ({day,end,times}) => '<tr><th scope="row">' + day + (end ? " to " + end : "") +
      '</th><td>' + times + '</td></tr>') + '</tbody></table>';
};
const chrome = page => '<a class="skip" href="#main">Skip to content</a><div class="progress" aria-hidden="true"></div>' +
  (k.demo ? '<div class="ribbon"><span>Demo website. Your clinic&#39;s name, doctors and photos go here.</span><button type="button" data-dismiss aria-label="Dismiss demo banner">×</button></div>' : '') +
  '<div class="info"><div class="wrap info-row"><span data-open>' + (k.demo ? "Sample hours" : "See opening hours") + '</span>' + link("contact.html",k.address) + link(tel(urgent),"Emergency: " + urgent) + link(wa(),"WhatsApp " + whatsLabel,"",true) + '</div></div>' +
  '<header class="nav"><div class="wrap nav-row">' + brand() + '<nav class="desktop-nav" aria-label="Main navigation">' + nav(page,false) + '</nav><div class="nav-book">' + book() + '</div><button class="menu-button" data-open-dialog="menu">Menu</button></div></header>' +
  '<dialog id="menu" class="menu" aria-label="Site menu"><div class="dialog-top">' + brand() + '<button data-close aria-label="Close menu">×</button></div><nav aria-label="Mobile navigation">' + nav(page,true) + '</nav>' + book() + '</dialog>';
const footer = () => '<footer><div class="wrap footer-grid"><div>' + brand() + '<p>' + esc(k.tagline) + '</p>' + link(tel(phone),phone) + (k.email ? '<br>' + link("mailto:" + k.email,k.email) : '') + '</div><nav aria-label="Footer navigation">' + nav("",true) + link("privacy.html","Privacy") + '</nav><div>' + hours(true) + '</div></div><div class="wrap footer-end">' + (k.demo ? '<span>Fictional clinic demonstration</span>' : '<span>' + esc(k.name) + '</span>') + '<div>' + list(k.social, s => link(s.url,s.name,"",true)) + '</div>' + (c.credits.length ? '<div>Photography: ' + c.credits.map(s => link(s.url,s.name,"",true)).join(", ") + '</div>' : '') + '</div></footer>' +
  '<div class="mobile-bar">' + book() + link(tel(phone),"Call","button secondary") + '</div><a class="float button" href="' + esc(wa()) + '"' + ext + '>WhatsApp</a><button class="to-top" type="button" aria-label="Back to top" data-top>↑</button>' +
  '<dialog id="booking-sheet" class="sheet" aria-labelledby="sheet-title"><div class="dialog-top"><h2 id="sheet-title">Request an appointment</h2><button data-close aria-label="Close appointment form">×</button></div>' + form() + '</dialog>' +
  '<dialog id="lightbox" class="lightbox" aria-label="Enlarged photo"><button data-close aria-label="Close enlarged photo">×</button><div data-lightbox-image></div></dialog>';
const faq = items => list(items, ({q,a}) => '<details><summary>' + esc(q) + '</summary><div class="fold"><div><p>' + esc(a) + '</p></div></div></details>');
const gallery = () => {
  const cases = c.beforeAfter.filter(item => item.sample || (item.consent && item.before?.src && item.after?.src));
  return cases.length ? '<div data-filter-group>' + chipSet([...new Set(cases.map(x=>x.category))]) + '<div class="case-grid">' + list(cases, x =>
    '<figure class="case" data-category="' + esc(x.category) + '"><div class="comparison" style="--split:50%"><div class="comparison-side after">' + (image(x.after) || '<span>After photo</span>') + '</div><div class="comparison-side before">' + (image(x.before) || '<span>Before photo</span>') + '</div><span class="before-label">Before</span><span class="after-label">After</span><span class="handle" aria-hidden="true"><span>‹ ›</span></span><input type="range" min="0" max="100" value="50" aria-label="' + esc(x.title) + ': reveal before photo"></div><figcaption><strong>' + esc(x.title) + '</strong><br>' + (x.sample ? 'SAMPLE case, replace with consented patient photos. Confirm “Shown with patient consent” before publishing.' : 'Shown with patient consent. Individual outcomes vary.') + '</figcaption></figure>'
  ) + '</div></div>' : '';
};
const team = () => c.doctors.length ? '<div class="doctors ' + (c.doctors.length === 1 ? "solo" : "") + '">' + list(c.doctors,d => '<article id="' + esc(d.id) + '" class="doctor">' +
  (d.photo?.src ? '<button class="portrait zoom" type="button" data-zoom aria-label="Enlarge portrait">' + image(d.photo) + '</button>' : '<div class="portrait placeholder">' + mark + '<span>REPLACE: doctor portrait</span></div>') +
  '<div class="doctor-copy"><h3>' + esc(d.name || d.title) + '</h3>' + (d.sample ? '<p class="small">Sample profile</p>' : '<p>' + esc([d.title,d.speciality].filter(Boolean).join(" / ")) + '</p>') +
  '<p>' + esc(d.bio) + '</p>' + list([[d.qualifications,"Qualifications"],[d.languages,"Languages"],[d.availability,"Availability"]], ([items,label]) => items?.length ? '<p class="small"><strong>' + label + '</strong> ' + esc(items.join(", ")) + '</p>' : '') +
  (d.years != null ? '<p>' + esc(d.years) + ' years of experience</p>' : '') +
  (d.name && !d.sample ? book("Book with " + d.name, "Assalam o Alaikum! I'd like to book an appointment with " + d.name + " at " + k.name + ". Could you please share available slots?") : book()) + '</div></article>') + '</div>' : '';
const reviews = () => c.reviews.length ? '<div class="review-carousel" data-reviews aria-roledescription="carousel" aria-label="Patient reviews" tabindex="0">' + trust() +
  '<div>' + list(c.reviews, (r,i) => '<figure data-review' + (i ? ' hidden' : '') + '><blockquote>' + esc(r.quote) + '</blockquote><figcaption>' + esc(r.name) + '</figcaption></figure>') +
  '</div><div class="controls"><button data-review-step="-1" aria-label="Previous review">Previous</button><button data-review-step="1" aria-label="Next review">Next</button><button data-review-pause aria-pressed="false">Pause</button></div></div>' : '';
const trust = () => k.rating != null && k.reviewCount != null ? '<div class="trust"><strong>' + esc(k.rating) + '/5 on Google</strong><span data-count="' + esc(k.reviewCount) + '">' + esc(k.reviewCount) + '</span> reviews ' + (k.googleProfile ? link(k.googleProfile,"Read on Google","text-link",true) : '') + '</div>' : '';
const reels = () => c.reels.length ? '<div class="reels" data-reels role="region" aria-roledescription="carousel" aria-label="Video reels" tabindex="0"><div class="reel-stage">' + list(c.reels,(r,i) =>
  '<figure class="reel" data-reel data-src="' + esc(r.mp4) + '" data-instagram="' + esc(r.instagram) + '"><div class="reel-media">' + image(r.poster) + '</div><figcaption>' + esc(r.title) + '</figcaption></figure>') +
  '</div><div class="controls reel-controls"><button data-reel-step="-1" aria-label="Previous reel">Previous</button><div class="dots">' + list(c.reels,(r,i) => '<button data-reel-index="' + i + '" aria-label="Show reel ' + (i+1) + '"><span></span></button>') + '</div><button data-reel-step="1" aria-label="Next reel">Next</button></div><div class="controls"><button data-reel-audio aria-pressed="false">Unmute</button><button data-reel-pause aria-pressed="false">Pause</button></div></div>' : '';
const tiles = () => {
  const indices = c.categories.map((_,i)=>i).filter(i=>services.some(s=>s.category===i));
  return indices.length ? '<div class="tiles">' + list(indices,i => '<a href="services.html?category=' + i + '"><span class="tile-index">0' + (i+1) + '</span><h3>' + esc(category(i)) + '</h3><p>' + esc(c.categories[i][1]) + '</p><span class="tile-icon" aria-hidden="true">↗</span></a>') + '</div>' : '';
};
const cards = (items, filter = false) => items.length ? '<div class="service-grid">' + list(items,s => '<article' + (filter ? ' data-category="' + esc(s.category) + '"' : '') + '><a class="service-card" href="' + serviceLink(s) + '">' + (s.image?.src ? '<div class="crop">' + image(s.image) + '</div>' : '') +
  '<span class="small">' + esc(category(s.category)) + '</span><h3>' + esc(s.name) + '</h3><p>' + esc(s.short) + '</p><span class="text-link">Explore treatment</span></a></article>') + '</div>' : '';
const articles = items => items.length ? '<div class="journal-grid">' + list(items,b => '<a href="blog.html#' + esc(b.slug) + '"><span class="small">' + esc(b.topic) + '</span><h3>' + esc(b.title) + '</h3><span class="text-link">Read article</span></a>') + '</div>' : '';
const pricing = () => list(c.categories, ([label],i) => {
  const group = services.filter(s=>s.category===i);
  return group.length ? '<details><summary>' + esc(label) + '</summary><div class="fold"><div><dl class="price-list">' + list(group,s => '<div><dt>' + link(serviceLink(s),s.name) + '</dt><dd>' + esc(price(s)) + '</dd></div>') + '</dl></div></div></details>' : '';
});
const technology = () => c.technology.length ? '<div class="editorial-list">' + list(c.technology,t => '<div><h3>' + esc(t.title) + '</h3><p>' + esc(t.description) + '</p></div>') + '</div>' : '';
const emergency = () => '<aside class="emergency"><div class="wrap split"><div><h2>Dental emergency?</h2><p>Seek urgent dental care for facial swelling or dental trauma. Get emergency medical care for uncontrolled bleeding, serious facial injury or swelling that affects breathing.</p>' + link(c.emergencySource,"Emergency care guidance","text-link",true) + '</div><div class="actions">' +
  book("Urgent WhatsApp message","URGENT: I have a dental emergency (pain / swelling / broken tooth / bleeding)") + link(tel(urgent),"Call " + urgent,"button secondary") + '</div></div></aside>';
const visit = () => '<div class="visit split"><div class="map">' + (k.mapEmbed ? '<iframe src="' + esc(k.mapEmbed) + '" title="Map of ' + esc(k.city) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' : '') + '</div><div><h3>' + esc(k.address) + '</h3>' +
  (k.addressNote ? '<p class="small">' + esc(k.addressNote) + '</p>' : '') + hours() + '<div class="actions">' + link(k.mapLink,"Get directions","button secondary",true) + book() + '</div></div></div>';
function form() {
  const field = (label,name,input,wide=false) => '<label class="field' + (wide ? ' wide' : '') + '">' + label + input + '<span class="error" data-error="' + name + '"></span></label>';
  const select = (name,options,required=true) => '<select name="' + name + '"' + (required ? ' required' : '') + '><option value="">' + (required ? 'Choose an option' : 'No preference') + '</option>' + list(options,o => '<option>' + esc(o) + '</option>') + '</select>';
  return '<form data-booking novalidate><p>Share your preferences. The clinic confirms your appointment by WhatsApp reply.</p><div class="form-grid">' +
    field("Full name","name",'<input name="name" autocomplete="name" required maxlength="100">') +
    field("Service","service",select("service",["General consultation",...services.map(s=>s.name)])) +
    field("Preferred doctor (optional)","doctor",select("doctor",c.doctors.filter(d=>d.name&&!d.sample).map(d=>d.name),false)) +
    field("Patient type","patient",select("patient",["New patient","Returning patient"])) +
    field("Preferred date","date",'<input type="date" name="date" required>') +
    field("Preferred time","time",select("time",["Morning","Afternoon","Evening"])) +
    field("Short note (optional)","note",'<textarea name="note" maxlength="400" rows="3" placeholder="Keep it brief. Leave out medical records and ID numbers."></textarea>',true) +
    '</div><button type="submit" class="button">Continue to WhatsApp</button><p data-fallback hidden><a target="_blank" rel="noopener">Tap to open WhatsApp</a></p><noscript><p>' + link(wa(),"Request an appointment directly on WhatsApp","text-link",true) + '</p></noscript></form>';
}
const bookingSteps = () => '<ol class="booking-steps"><li><h3>Message us on WhatsApp</h3><p>Tell us what you’d like help with and when you’re free.</p></li><li><h3>We confirm your slot</h3><p>Look for a reply with an agreed date and time.</p></li><li><h3>Come in for your visit</h3><p>Bring your questions and any relevant dental records.</p></li></ol><div class="actions">' + book() + '<a href="booking.html" class="button secondary" data-open-dialog="booking-sheet">Use the appointment form</a></div>';
const home = () => '<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><h1>' + esc(k.headline) + '</h1><p>' + esc(k.introduction.replaceAll("{city}",k.city)) + '</p><div class="actions">' + book() + link("services.html","See treatments","button secondary") + '</div></div>' +
  figure(k.photo,"hero-photo",true) + '</div>' + (trust() ? '<div class="wrap">' + trust() + '</div>' : '') + '</section>' +
  section("Find the right care",tiles(),"categories","Start with what you want help with.") +
  (c.reassurance.length ? '<section class="section ease"><div class="wrap split"><div>' + heading("A visit that puts you at ease") + figure(c.clinic.detailPhoto,"ease-photo") + '</div><div class="editorial-list">' + list(c.reassurance,([title,copy])=>'<div><h3>'+esc(title)+'</h3><p>'+esc(copy)+'</p></div>') + '</div></div></section>' : '') +
  section("Common reasons to visit",cards(c.featured.map(slug=>services.find(s=>s.slug===slug)).filter(Boolean))) +
  section("Meet the team",team(),"mist") +
  section("Smile transformations",gallery(),"","Compare the two views with the slider.") +
  section("Short videos",reels(),"mist",k.demo ? "Silent sample clips made from illustrative stock photos." : "") +
  section("How booking works",bookingSteps(),"booking-band") +
  section("What patients say",reviews()) +
  section("Technology and hygiene",technology(),"mist") +
  section("Know the costs before you decide",pricing(),"pricing","Ask for a written estimate after your examination.") +
  section("Questions before your visit",c.faqs.length ? faq(c.faqs.slice(0,3)) + link("faq.html","See all questions","text-link") : "","mist") +
  section("From the dental journal",articles(c.blog.slice(0,3))) +
  section("Visit us in " + k.city,visit(),"mist") + emergency();
const descriptions = {
  index:[k.name + " | Dental care in " + k.city,k.tagline + " Explore dental treatments and request a visit on WhatsApp."],
  services:["Dental treatments","Explore preventive, cosmetic, restorative and surgical dental care."],
  team:["Meet the dental team","Get to know the people you can ask for when requesting a visit."],
  results:["Smile transformations","Compare before and after views and explore examples by treatment category."],
  reviews:["Patient reviews","Read verified patient feedback when it is available."],
  blog:["Dental journal","Practical reading for home care and your next dental appointment."],
  faq:["Questions before your visit","Answers about booking, costs and getting ready for a visit."],
  booking:["Request an appointment","Tell us what you need and send your preferences through WhatsApp."],
  contact:["Visit us in " + k.city,"Find directions, opening hours and ways to contact the clinic."],
  about:["Care you can ask questions about",k.tagline],
  privacy:["Privacy","How the website handles appointment information and external services."]
};
const servicePage = s => intro(s.name,s.long) +
  '<section class="section"><div class="wrap split"><div>' + heading("Who it’s for") + '<p>' + esc(s.who) + '</p><dl class="facts"><div><dt>Typical duration</dt><dd>' + esc(s.duration) + '</dd></div><div><dt>Price</dt><dd>' + esc(price(s)) + '</dd></div></dl>' + serviceBook(s) + '</div>' + figure(s.image,"service-photo") + '</div></section>' +
  section("What to expect",'<ol class="steps">' + list(s.steps,x=>'<li>'+esc(x)+'</li>') + '</ol><p class="small">General information only. Your dentist will advise on what\'s right for you after an examination.</p>',"mist") +
  section("Common questions",faq(s.faqs)) + section("Related treatments",cards([...services.filter(x=>x!==s&&x.category===s.category),...services.filter(x=>x!==s&&x.category!==s.category)].slice(0,3)),"mist");
function page(id, selected = "all") {
  const s = services.find(s=>s.slug===id);
  if (s) return servicePage(s);
  if (id === "index") return home();
  const [title,sub] = descriptions[id] || descriptions.index;
  const content = {
    services: () => section("Browse treatments",services.length ? '<div data-filter-group>' + chipSet([...new Set(services.map(s=>s.category))],selected) + cards(services,true) + '</div>' : ''),
    team: () => section("Dentist profiles",team()),
    results: () => section("Compare views",gallery()),
    reviews: () => section("What patients say",reviews() || (k.googleProfile ? link(k.googleProfile,"Read reviews on Google","button",true) : '<p>Verified patient feedback will be added when available.</p>')),
    blog: () => section("Find an article",articles(c.blog)) + list(c.blog,b=>'<article class="section article" id="'+esc(b.slug)+'"><div class="wrap">' + heading(b.title) + list(b.body,p=>'<p>'+esc(p)+'</p>') + (b.source ? link(b.source,"Further reading","text-link",true) : '') + '</div></article>'),
    faq: () => section("Frequently asked questions",faq(c.faqs),"mist"),
    booking: () => '<section class="section"><div class="wrap booking-layout"><div>' + heading("Your preferences") + form() + '</div><aside>' + heading("After you send it") + '<p>Look for a reply from the clinic. Your preferred slot may change depending on availability.</p>' + book("Message directly on WhatsApp") + '</aside></div></section>' + emergency(),
    contact: () => section("Directions and hours",visit()) + section("Get in touch",'<div class="actions">' + book() + link(wa(),whatsLabel,"button secondary",true) + link(tel(phone),"Call " + phone,"button secondary") + (k.email ? link("mailto:"+k.email,k.email,"button secondary") : '') + '</div>',"mist") + emergency(),
    about: () => '<section class="section"><div class="wrap split"><div>' + heading("The clinic story") + '<p>' + esc(k.story) + '</p></div>' + figure(k.photo,"service-photo") + '</div></section>' +
      section("What matters during a visit",list(c.reassurance,([title,copy])=>'<div class="values"><h3>'+esc(title)+'</h3><p>'+esc(copy)+'</p></div>'),"mist") + section("Technology and hygiene",technology()),
    privacy: () => section("What happens to your information",'<div class="article"><h3>Appointment requests</h3><p>The form prepares a message in your browser. When you continue, WhatsApp receives the prefilled text and lets you decide whether to send it. Please leave medical records and identity numbers out of the form.</p><h3>External services</h3><p>WhatsApp, map embeds and any Instagram videos are operated by their respective providers. They may process information such as your IP address when loaded or opened.</p><h3>Browser storage</h3><p>The website can remember that you dismissed the demo banner for the current session.</p><h3>Questions</h3><p>Use the contact page to reach the clinic about your information.</p>' + link("contact.html","Contact","text-link") + '</div>')
  };
  return intro(title,sub) + (content[id]?.() || "");
}
const metadata = id => {
  const s = services.find(s=>s.slug===id);
  const [title,description] = s ? [s.name,s.long] : (descriptions[id] || descriptions.index);
  return {title:id==="index" ? title : title + " | " + k.name,description,image:s?.image?.src || k.photo?.src};
};
const schema = () => ({
  "@context":"https://schema.org","@type":"Dentist",name:k.name,description:k.tagline,
  address:{"@type":"PostalAddress",addressLocality:k.city,addressCountry:"PK",...(!k.demo && {streetAddress:k.address})},
  ...(!k.demo && {telephone:phone,hasMap:k.mapLink,url:k.website || undefined,email:k.email || undefined,
    openingHoursSpecification:days.flatMap(day=>(k.hours[day]||[]).map(([opens,closes])=>({"@type":"OpeningHoursSpecification",dayOfWeek:day,opens,closes}))),
    sameAs:k.social.map(s=>s.url)}),
  ...(k.demo && {disambiguatingDescription:"Fictional clinic demonstration"})
});
const markup = (id,selected) => chrome(id) + '<main id="main" tabindex="-1">' + page(id,selected) +
  (c.stats.length ? section("Clinic figures",'<div class="stats">'+list(c.stats,x=>'<div><strong data-count="'+esc(x.value)+'">'+esc(x.value)+'</strong><p>'+esc(x.label)+'</p></div>')+'</div>') : '') +
  '</main>' + footer();
globalThis.ClearwaterRender = {markup,metadata,schema,esc,wa,hourLabel,days,pages:[...Object.keys(descriptions),...services.map(s=>s.slug)]};
})();

