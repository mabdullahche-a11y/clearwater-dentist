(() => {
const config = globalThis.CLEARWATER;
const render = globalThis.ClearwaterRender;
const params = new URLSearchParams(location.search);
const themeName = [params.get("theme"), config.defaultTheme, "teal"].find(name => Object.hasOwn(config.presets,name));
const theme = {...config.theme,...config.presets[themeName]};
const root = document.documentElement;
const motion = matchMedia("(prefers-reduced-motion: no-preference)");
for (const [key,value] of Object.entries(theme)) {
  root.style.setProperty("--"+key,key.endsWith("Font") ? JSON.stringify(value) : value);
}
const customFonts = [theme.headingFont,theme.bodyFont].filter(font => !["Fraunces","Manrope"].includes(font));
if (customFonts.length) {
  const fonts = new URL("https://fonts.googleapis.com/css2");
  for (const font of new Set(customFonts)) fonts.searchParams.append("family",font + ":wght@400;500;700;800");
  fonts.searchParams.set("display","swap");
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = fonts.href;
  document.head.append(stylesheet);
}
const id = document.body.dataset.page;
const meta = render.metadata(id);
document.title = meta.title;
for (const [key,value] of Object.entries({description:meta.description,"og:title":meta.title,"og:description":meta.description,"og:image":meta.image ? new URL(meta.image,config.clinic.website || location.href).href : ""})) {
  document.querySelector('meta[content][data-meta="' + key + '"]')?.setAttribute("content",value);
}
document.querySelector("#dentist-schema").textContent = JSON.stringify(render.schema());
document.querySelector("#site").innerHTML = render.markup(id,params.get("category") || "all");
const $ = (selector, base=document) => base.querySelector(selector);
const $$ = (selector, base=document) => [...base.querySelectorAll(selector)];

if (params.has("theme") && themeName) {
  for (const anchor of $$('a[href]')) {
    const href = anchor.getAttribute("href");
    if (!/^[\w-]+\.html(?:[?#]|$)/.test(href)) continue;
    const target = new URL(href,location.href);
    target.searchParams.set("theme",themeName);
    anchor.setAttribute("href",target.href);
  }
}
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) requestAnimationFrame(() => target.scrollIntoView());
}

const ribbon = $(".ribbon");
try {
  if (ribbon && sessionStorage.getItem("clearwater-ribbon-dismissed")) ribbon.hidden = true;
} catch {}
$("[data-dismiss]")?.addEventListener("click",() => {
  ribbon.hidden = true;
  try {sessionStorage.setItem("clearwater-ribbon-dismissed","1");} catch {}
});

const pakistanClock = new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Karachi",weekday:"long",hour:"2-digit",minute:"2-digit",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit"});
function localTime() {
  return Object.fromEntries(pakistanClock.formatToParts().map(part => [part.type,part.value]));
}
function updateHours() {
  const {weekday,hour,minute} = localTime();
  const now = hour + ":" + minute;
  const schedule = config.clinic.hours;
  const intervals = schedule[weekday] || [];
  const current = intervals.find(([start,end]) => now >= start && now < end);
  let label = "Closed";
  if (current) {
    label = "Open now · until " + render.hourLabel(current[1]);
  } else {
    const today = intervals.find(([start]) => start > now);
    if (today) label += " · opens " + render.hourLabel(today[0]);
    else {
      const index = render.days.indexOf(weekday);
      for (let offset=1; offset<=7; offset++) {
        const day = render.days[(index+offset)%7];
        if (!schedule[day]?.length) continue;
        label += " · opens " + day + " at " + render.hourLabel(schedule[day][0][0]);
        break;
      }
    }
  }
  $("[data-open]").textContent = label + (config.clinic.demo ? " (demo)" : "");
  const time = localTime();
  for (const date of $$('input[type="date"]')) date.min = [time.year,time.month,time.day].join("-");
}
updateHours();
setInterval(updateHours,30000);

for (const trigger of $$("[data-open-dialog]")) {
  trigger.addEventListener("click", event => {
    event.preventDefault();
    document.getElementById(trigger.dataset.openDialog)?.showModal();
  });
}
for (const dialog of $$("dialog")) {
  $("[data-close]",dialog).addEventListener("click",() => dialog.close());
  dialog.addEventListener("click",event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}
for (const button of $$("[data-zoom]")) {
  button.addEventListener("click",() => {
    const dialog = $("#lightbox");
    const photo = $("img",button);
    const large = document.createElement("img");
    $("[data-lightbox-image]",dialog).replaceChildren(large);
    large.src = photo.currentSrc || photo.src;
    large.alt = photo.alt;
    dialog.showModal();
  });
}
for (const form of $$("[data-booking]")) {
  const prompts = {name:"Enter your full name.",service:"Choose a service.",patient:"Tell us whether you’ve visited before.",date:"Choose a date from today onwards.",time:"Choose a preferred time."};
  function error(field,message) {
    const hint = $('[data-error="' + field.name + '"]',form);
    hint.textContent = message;
    field.setAttribute("aria-invalid",String(Boolean(message)));
  }
  for (const [name] of Object.entries(prompts)) {
    const field = form.elements[name];
    const hint = $('[data-error="' + name + '"]',form);
    hint.id = (form.closest("dialog") ? "sheet-" : "page-") + name + "-error";
    hint.setAttribute("aria-live","polite");
    field.setAttribute("aria-describedby",hint.id);
    field.addEventListener("input",() => error(field,""));
  }
  form.addEventListener("submit",event => {
    event.preventDefault();
    updateHours();
    let firstError;
    for (const [name,prompt] of Object.entries(prompts)) {
      const field = form.elements[name];
      const valid = field.value.trim() && field.validity.valid;
      error(field,valid ? "" : prompt);
      if (!valid && !firstError) firstError = field;
    }
    if (firstError) { firstError.focus(); return; }
    const values = Object.fromEntries(new FormData(form));
    const date = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",timeZone:"UTC"}).format(new Date(values.date + "T00:00:00Z"));
    const message = [
      "Assalam o Alaikum! I'd like to request an appointment at " + config.clinic.name + ".",
      "", "Full name: " + values.name.trim(), "Service: " + values.service,
      "Preferred doctor: " + (values.doctor || "No preference"), "Patient type: " + values.patient,
      "Preferred date: " + date, "Preferred time: " + values.time,
      ...(values.note.trim() ? ["Concern: " + values.note.trim()] : []),
      "", "Could you please confirm whether a slot is available?"
    ].join("\n");
    const url = render.wa(message);
    const fallback = $("[data-fallback]",form);
    $("a",fallback).href = url;
    fallback.hidden = false;
    const popup = window.open("about:blank","_blank");
    if (popup) {
      popup.opener = null;
      popup.location.replace(url);
    } else {
      $("a",fallback).focus();
    }
  });
}

for (const group of $$("[data-filter-group]")) {
  const chips = $$("[data-filter]",group);
  const items = $$("[data-category]",group);
  const filter = (category,animate) => {
    if (!chips.some(chip => chip.dataset.filter === category)) category = "all";
    for (const chip of chips) chip.setAttribute("aria-pressed",String(chip.dataset.filter===category));
    for (const item of items) {
      item.hidden = category !== "all" && item.dataset.category !== category;
      item.classList.remove("filtered-in");
      if (animate && !item.hidden) requestAnimationFrame(() => item.classList.add("filtered-in"));
    }
  };
  filter($('[aria-pressed="true"]',group)?.dataset.filter || "all",false);
  for (const chip of chips) chip.addEventListener("click",() => filter(chip.dataset.filter,true));
}
for (const slider of $$('.comparison input[type="range"]')) {
  slider.addEventListener("input",() => {
    slider.parentElement.style.setProperty("--split",slider.value + "%");
    slider.setAttribute("aria-valuetext",slider.value + "% before photo");
  });
  slider.addEventListener("pointerdown",event => {
    const bounds = slider.getBoundingClientRect();
    slider.value = Math.round(100 * (event.clientX - bounds.left) / bounds.width);
    slider.dispatchEvent(new Event("input"));
  });
}
for (const summary of $$("details > summary")) {
  summary.addEventListener("click",event => {
    if (!motion.matches) return;
    event.preventDefault();
    const details = summary.parentElement;
    const siblings = [];
    for (let item = details.nextElementSibling; item; item = item.nextElementSibling) {
      siblings.push([item,item.getBoundingClientRect().top]);
    }
    details.open = !details.open;
    for (const [item,top] of siblings) {
      const shift = top - item.getBoundingClientRect().top;
      if (shift) item.animate([{transform:"translateY("+shift+"px)"},{transform:"translateY(0)"}],
        {duration:440,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});
    }
  });
}

function rotation(group,selector,tick,delay) {
  const pause = $(selector,group);
  let paused = !motion.matches;
  let visible = false;
  const label = () => {
    pause.textContent = paused ? "Play" : "Pause";
    pause.setAttribute("aria-pressed",String(paused));
  };
  label();
  pause.addEventListener("click",() => { paused = !paused; label(); });
  motion.addEventListener("change",() => { paused = !motion.matches; label(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; },{threshold:.25}).observe(group);
  setInterval(() => {
    if (!paused && visible && !document.hidden && !group.matches(":hover,:focus-within")) tick();
  },delay);
}
for (const group of $$("[data-reviews]")) {
  const cards = $$("[data-review]",group);
  let active = 0;
  function move(step) {
    active = (active + step + cards.length) % cards.length;
    cards.forEach((card,i) => { card.hidden = i !== active; });
  }
  for (const button of $$("[data-review-step]",group)) button.addEventListener("click",() => move(Number(button.dataset.reviewStep)));
  group.addEventListener("keydown",event => {
    if (!["ArrowLeft","ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    move(event.key==="ArrowLeft" ? -1 : 1);
  });
  if (cards.length > 1) rotation(group,"[data-review-pause]",() => move(1),6500);
  else $(".controls",group).hidden = true;
}
for (const group of $$("[data-reels]")) {
  const cards = $$("[data-reel]",group);
  const dots = $$("[data-reel-index]",group);
  const audio = $("[data-reel-audio]",group);
  const stage = $(".reel-stage",group);
  let active = 0;
  let muted = true;
  let visible = false;
  let start;
  function show(index) {
    active = (index + cards.length) % cards.length;
    cards.forEach((card,i) => {
      let offset = i - active;
      if (offset > cards.length/2) offset -= cards.length;
      if (offset < -cards.length/2) offset += cards.length;
      const distance = Math.abs(offset);
      card.style.setProperty("--offset",offset);
      card.style.setProperty("--depth",Math.max(1,10-distance));
      card.style.setProperty("--scale",distance ? ".79" : "1");
      card.style.setProperty("--reel-opacity",distance > 2 ? "0" : distance ? ".65" : "1");
      card.inert = distance > 1;
      if (!distance) dots[i].setAttribute("aria-current","true");
      else dots[i].removeAttribute("aria-current");
      const media = $(".reel-media",card);
      let video = $("video",media);
      let embed = $("iframe",media);
      if (visible && distance <= 1 && card.dataset.src && !video) {
        video = document.createElement("video");
        video.src = card.dataset.src;
        video.playsInline = true;
        video.loop = true;
        video.preload = "metadata";
        video.muted = true;
        video.addEventListener("click",() => { if (i === active) audio.click(); });
        media.append(video);
      }
      if (visible && distance === 0 && !video && card.dataset.instagram && !embed) {
        embed = document.createElement("iframe");
        embed.src = card.dataset.instagram;
        embed.title = $("figcaption",card).textContent;
        embed.allow = "autoplay; fullscreen; encrypted-media";
        media.append(embed);
      }
      if (embed && (!visible || distance)) embed.remove();
      if (video) {
        video.muted = distance > 0 || muted;
        if (!visible || distance > 1) video.remove();
        else if (distance || !motion.matches) {
          video.pause();
          video.controls = !distance && !motion.matches;
        } else video.play().catch(() => {});
      }
    });
    audio.hidden = !cards[active].dataset.src;
  }
  audio.addEventListener("click",() => {
    muted = !muted;
    audio.textContent = muted ? "Unmute" : "Mute";
    audio.setAttribute("aria-pressed",String(!muted));
    const video = $("video",cards[active]);
    if (video) { video.muted = muted; video.play().catch(() => {}); }
  });
  for (const button of $$("[data-reel-step]",group)) button.addEventListener("click",() => show(active + Number(button.dataset.reelStep)));
  dots.forEach((button,i) => button.addEventListener("click",() => show(i)));
  stage.addEventListener("pointerdown",event => { start = event.clientX; });
  stage.addEventListener("pointercancel",() => { start = undefined; });
  stage.addEventListener("pointerup",event => {
    const delta = event.clientX - start;
    start = undefined;
    if (Math.abs(delta)>32) show(active + (delta<0 ? 1 : -1));
  });
  group.addEventListener("keydown",event => {
    if (!["ArrowLeft","ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    show(active + (event.key==="ArrowLeft" ? -1 : 1));
  });
  show(0);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; show(active); },{threshold:.15}).observe(stage);
  motion.addEventListener("change",() => show(active));
  if (cards.length > 1) rotation(group,"[data-reel-pause]",() => show(active+1),7500);
  else $(".reel-controls",group).hidden = $("[data-reel-pause]",group).hidden = true;
}

const navbar = $(".nav");
const progress = $(".progress");
const topButton = $("[data-top]");
const footer = $("footer");
const float = $(".float");
const mobileBar = $(".mobile-bar");
const parallax = $$(".ease-photo img,.service-photo img");
let pending = false;
function scrollState() {
  const max = root.scrollHeight - innerHeight;
  progress.style.transform = "scaleX(" + (max > 0 ? scrollY/max : 0) + ")";
  navbar.classList.toggle("scrolled",scrollY > 120);
  const footerVisible = footer.getBoundingClientRect().top < innerHeight;
  topButton.hidden = scrollY < 320 || footerVisible;
  float.hidden = footerVisible;
  mobileBar.hidden = footerVisible;
  if (motion.matches) for (const photo of parallax) {
    const bounds = photo.parentElement.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) continue;
    const shift = Math.max(-10,Math.min(10,(bounds.top-innerHeight/2)*.027));
    photo.style.transform = "scale(1.07) translateY(" + shift + "px)";
  }
  pending = false;
}
addEventListener("scroll",() => {
  if (!pending) { pending = true; requestAnimationFrame(scrollState); }
},{passive:true});
addEventListener("resize",scrollState);
topButton.addEventListener("click",() => window.scrollTo({top:0,behavior:motion.matches?"smooth":"auto"}));
scrollState();

if (motion.matches) {
  root.classList.add("js","motion");
  const headline = $(".hero h1");
  if (headline) {
    const words = headline.textContent.trim().split(/\s+/);
    headline.setAttribute("aria-label",words.join(" "));
    headline.replaceChildren(...words.flatMap((word,i) => {
      const span = document.createElement("span");
      span.className = "word";
      span.setAttribute("aria-hidden","true");
      span.style.setProperty("--i",i);
      span.textContent = word;
      return i ? [" ",span] : [span];
    }));
    if (!location.hash && scrollY < 20) {
      const preloader = document.createElement("div");
      preloader.className = "preloader";
      preloader.setAttribute("aria-hidden","true");
      const label = document.createElement("span");
      label.textContent = config.clinic.name;
      preloader.append(label);
      document.body.append(preloader);
      setTimeout(() => preloader.remove(),1100);
    }
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const item = entry.target;
      if (item.matches("[data-count]")) {
        const end = Number(item.dataset.count);
        const format = new Intl.NumberFormat("en-PK",{maximumFractionDigits:2});
        const start = performance.now();
        const frame = now => {
          const t = Math.min(1,(now-start)/650);
          item.textContent = format.format(Number.isInteger(end) ? Math.round(end*t) : end*t);
          if (t < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      } else {
        item.classList.remove("pending");
        item.classList.add("revealed");
      }
      observer.unobserve(item);
    }
  },{threshold:.08});
  for (const section of $$(".section")) {
    if (section.getBoundingClientRect().top > innerHeight) section.classList.add("pending");
    $$(".wrap > *",section).forEach((child,i) => child.style.setProperty("--stagger",Math.min(i,5)));
    observer.observe(section);
  }
  for (const count of $$("[data-count]")) observer.observe(count);
}
motion.addEventListener("change",() => {
  if (!motion.matches) {
    root.classList.remove("motion");
    for (const image of parallax) image.style.removeProperty("transform");
  }
});
})();

