
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const services = [["🏠","Residential Construction","Custom homes, duplexes and apartment blocks built to your plan."],["🏢","Commercial Buildings","Offices, showrooms and shopping spaces delivered on schedule."],["🏭","Industrial Sheds","PEB structures, warehouses and factory floors with strong foundations."],["🛠️","Renovation & Repair","Structural repair, waterproofing and complete home makeovers."],["📐","Design & Planning","Architectural drawings, 3D views and approvals handled for you."],["🧱","Interior & Finishing","Flooring, false ceilings, painting and modular fittings."]];
const projects = [["Sunrise Residency","Residential","Salt Lake, Kolkata","G+4 · 18 flats · 2023","Eighteen-flat apartment block with covered parking, lift and rooftop garden."],["Hira Heights","Residential","Behala, Kolkata","G+3 · 2022","Premium family duplex cluster with vastu-friendly layouts."],["Metro Business Hub","Commercial","Park Street, Kolkata","12,000 sq ft · 2023","Office complex with glass façade and efficient central cooling."],["City Square Mall Wing","Commercial","Howrah","22,000 sq ft · 2021","Retail wing with food court, delivered two weeks ahead of schedule."],["Eastern Logistics Park","Industrial","Dankuni","60,000 sq ft · 2022","PEB warehouse with heavy-duty flooring and loading docks."],["Green Valley Factory","Industrial","Kharagpur","35,000 sq ft · 2024","Manufacturing shed with power-ready foundations and drainage."]];
const steps = [["Consult","Free site visit and requirement discussion."],["Plan & Quote","Drawings, material list and a fixed, transparent quote."],["Build","Daily supervision with weekly photo updates."],["Handover","Quality checks, clean-up and a written warranty."]];
const reviews = [["Our flat was ready before the promised date and the quality is excellent.","Rina Das, Salt Lake"],["Clear pricing, no hidden charges. The team answered every call.","Amit Sen, Behala"],["They built our warehouse flooring perfectly for heavy loads.","S. Kumar, Dankuni"]];
const leads = []; let filter = "All", busy = false;
const art = (i, c) => { let h = "", x = 10; for (let k = 0; k < 9; k++) { const ht = 40 + ((i * 37 + k * 53) % 70); h += `<rect x="${x}" y="${150 - ht}" width="30" height="${ht}" fill="${k % 2 ? "#F5B700" : "#0B2F66"}" opacity=".${k % 2 ? 9 : 8}"/>`; x += 36; } return `<svg viewBox="0 0 340 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${h}</svg>`; };
$("#sv").innerHTML = services.map(([i, t, d], k) => `<div class="card" data-aos="fade-up" style="transition-delay:${k * 70}ms"><div class="ico">${i}</div><h3>${t}</h3><p>${d}</p><button class="btn o" data-sv="${t}">Enquire now →</button></div>`).join("");
$("#st").innerHTML = steps.map(([t, d]) => `<div class="card step" data-aos="fade-up"><h3>${t}</h3><p>${d}</p></div>`).join("");
$("#rv").innerHTML = reviews.map(([q, a]) => `<div class="swiper-slide"><div class="q">“${q}”<b>${a}</b></div></div>`).join("");
const drawProjects = () => {
  const list = projects.map((p, i) => [p, i]).filter(([p]) => filter === "All" || p[1] === filter);
  $("#pj").innerHTML = list.length ? list.map(([p, i]) => `<button class="card proj" data-p="${i}">${art(i)}<div><small>${p[1]} · ${p[2]}</small><h3>${p[0]}</h3><p>${p[3]}</p></div></button>`).join("") : "<p>No projects in this category yet.</p>";
};
$("#ch").innerHTML = ["All", "Residential", "Commercial", "Industrial"].map(c => `<button class="chip ${c === filter ? "on" : ""}" data-f="${c}">${c}</button>`).join("");
drawProjects();
const openModal = i => { const p = projects[i]; $("#mb").innerHTML = art(i) + `<div><small>${p[1]} · ${p[2]}</small><h3>${p[0]}</h3><p><b>${p[3]}</b></p><p>${p[4]}</p><button class="btn" data-q="${p[1]}">Build something similar →</button></div>`; $("#md").hidden = false; document.body.style.overflow = "hidden"; };
const closeModal = () => { $("#md").hidden = true; document.body.style.overflow = ""; };
const gotoQuote = () => { closeModal(); $("#quote").scrollIntoView({ behavior: "smooth" }); };
document.addEventListener("click", e => {
  const t = e.target;
  if (t.closest("[data-sv]")) gotoQuote(t.closest("[data-sv]").dataset.sv);
  else if (t.closest("[data-q]")) gotoQuote(t.closest("[data-q]").dataset.q);
  else if (t.closest("[data-p]")) openModal(+t.closest("[data-p]").dataset.p);
  else if (t.closest("[data-f]")) { filter = t.closest("[data-f]").dataset.f; $$(".chip").forEach(c => c.classList.toggle("on", c.dataset.f === filter)); drawProjects(); }
  else if (t === $("#md") || t.closest("#mx")) closeModal();
  if (t.closest("#nv a")) { $("#nv").classList.remove("open"); $("#bg").setAttribute("aria-expanded", "false"); }
});
document.addEventListener("keydown", e => e.key === "Escape" && closeModal());
$("#bg").onclick = () => { const o = $("#nv").classList.toggle("open"); $("#bg").setAttribute("aria-expanded", o); };
const counted = new WeakSet();
const count = el => { if (counted.has(el)) return; counted.add(el); const to = +el.dataset.n; if (window.gsap) { const o = { v: 0 }; gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => el.textContent = Math.round(o.v) + "+" }); } else el.textContent = to + "+"; };
new IntersectionObserver((es, ob) => es.forEach(x => { if (x.isIntersecting) { count(x.target); ob.unobserve(x.target); } }), { threshold: .5 }) && $$("[data-n]").forEach(el => new IntersectionObserver(es => es[0].isIntersecting && count(el), { threshold: .4 }).observe(el));
if (window.AOS) AOS.init({ once: true, duration: 700 }); else $$("[data-aos]").forEach(x => x.classList.add("aos-animate"));
if (window.gsap) gsap.from(".links a", { y: -12, opacity: 0, stagger: .08, duration: .6 });
if (window.lottie) { const L = (s, c, r) => ({ ty: "gr", it: [{ ty: "rc", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [s, s] }, r: { a: 0, k: 10 } }, { ty: "st", c: { a: 0, k: c }, o: { a: 0, k: 100 }, w: { a: 0, k: 7 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] });
  const lay = (i, s, c, d) => ({ ty: 4, ind: i, ip: 0, op: 120, st: 0, ks: { o: { a: 0, k: 100 }, r: { a: 1, k: [{ t: 0, s: [d > 0 ? 45 : 45], i: { x: [.5], y: [1] }, o: { x: [.5], y: [0] } }, { t: 120, s: [45 + 360 * d] }] }, p: { a: 0, k: [100, 100, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } }, shapes: [L(s, c)] });
  lottie.loadAnimation({ container: $("#lot"), renderer: "svg", loop: true, autoplay: true, animationData: { v: "5.7.0", fr: 30, ip: 0, op: 120, w: 200, h: 200, layers: [lay(1, 120, [.04, .18, .4, 1], -1), lay(2, 150, [.96, .72, 0, 1], 1)] } }); }
if (window.Swiper) new Swiper("#sw", { loop: true, autoplay: { delay: 4500, disableOnInteraction: false }, pagination: { el: ".swiper-pagination", clickable: true } });
