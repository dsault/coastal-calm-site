/** Peak stay-nights: inclusive start..end. Used by the booking form. */
window.PEAK_PERIODS = [
  { name: "Chinese New Year", start: "2026-02-16", end: "2026-02-18", minNights: 2 },
  { name: "Holy Week", start: "2026-03-28", end: "2026-04-06", minNights: 2 },
  { name: "Araw ng Kagitingan weekend", start: "2026-04-08", end: "2026-04-11", minNights: 2 },
  { name: "Labor Day weekend", start: "2026-05-01", end: "2026-05-03", minNights: 2 },
  { name: "Independence Day weekend", start: "2026-06-12", end: "2026-06-14", minNights: 2 },
  { name: "National Heroes weekend", start: "2026-08-29", end: "2026-08-31", minNights: 2 },
  { name: "Bonifacio weekend", start: "2026-11-28", end: "2026-11-30", minNights: 2 },
  { name: "Christmas & New Year", start: "2026-12-24", end: "2027-01-02", minNights: 2 },
  { name: "Chinese New Year", start: "2027-02-05", end: "2027-02-07", minNights: 2 },
  { name: "Holy Week", start: "2027-03-20", end: "2027-03-29", minNights: 2 },
  { name: "Labor Day weekend", start: "2027-04-30", end: "2027-05-02", minNights: 2 },
  { name: "Independence Day weekend", start: "2027-06-11", end: "2027-06-13", minNights: 2 },
  { name: "Christmas & New Year", start: "2027-12-24", end: "2028-01-02", minNights: 2 },
];

window.peakStay = (function () {
  function parse(iso) {
    return new Date(iso + "T12:00:00");
  }
  function ymd(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function addDays(iso, days) {
    const d = parse(iso);
    d.setDate(d.getDate() + days);
    return ymd(d);
  }
  function nightsBetween(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((parse(checkOut) - parse(checkIn)) / 86400000));
  }
  function hitsFor(checkIn, checkOut) {
    const nights = nightsBetween(checkIn, checkOut);
    const start = parse(checkIn);
    const hits = [];
    for (let i = 0; i < nights; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const night = ymd(d);
      const period = window.PEAK_PERIODS.find(function (p) {
        return night >= p.start && night <= p.end;
      });
      if (period) hits.push({ date: night, name: period.name, minNights: period.minNights });
    }
    return hits;
  }
  function validate(checkIn, checkOut) {
    const nights = nightsBetween(checkIn, checkOut);
    const hits = hitsFor(checkIn, checkOut);
    const names = [];
    hits.forEach(function (h) {
      if (names.indexOf(h.name) === -1) names.push(h.name);
    });
    const minNights = hits.length
      ? Math.max.apply(
          null,
          hits.map(function (h) {
            return h.minNights;
          }),
        )
      : 0;
    if (!checkIn || !checkOut) {
      return { ok: false, nights: nights, peakNames: names, minNights: minNights, error: "Choose check-in and check-out dates." };
    }
    if (nights <= 0) {
      return { ok: false, nights: nights, peakNames: names, minNights: Math.max(minNights, 1), error: "Choose a check-out date after check-in." };
    }
    if (hits.length && nights < minNights) {
      return {
        ok: false,
        nights: nights,
        peakNames: names,
        minNights: minNights,
        error: "Peak dates (" + names.join(", ") + ") need a " + minNights + "-night stay. Please add a night.",
      };
    }
    return { ok: true, nights: nights, peakNames: names, minNights: minNights };
  }
  function minCheckout(checkIn) {
    if (!checkIn) return "";
    const oneNight = addDays(checkIn, 1);
    const probe = validate(checkIn, oneNight);
    if (!probe.ok && probe.minNights >= 2) return addDays(checkIn, probe.minNights);
    return oneNight;
  }
  return { validate: validate, minCheckout: minCheckout, addDays: addDays };
})();
