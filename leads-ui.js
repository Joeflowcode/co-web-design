(function () {
  const cfg = window.SANTIAM_LEADS;
  if (!cfg) return;

  function phoneHref(service) {
    return service.phone ? `tel:${service.phone}` : "";
  }

  function enhanceAnchors() {
    document.querySelectorAll("[data-lead-call]").forEach((el) => {
      const key = el.getAttribute("data-lead-call");
      const service = cfg[key];
      if (!service) return;
      if (service.phone) {
        el.href = phoneHref(service);
        if (service.phoneDisplay && el.hasAttribute("data-lead-label")) {
          el.textContent = service.phoneDisplay;
        }
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  function wireForms() {
    document.querySelectorAll("form[data-lead-form]").forEach((form) => {
      const key = form.getAttribute("data-lead-form");
      const service = cfg[key];
      if (!service) return;

      const status = form.querySelector(".form-status");
      const action = service.formAction || "";
      const needsConfig = !action || action.includes("YOUR_");

      if (!needsConfig) {
        form.action = action;
        form.method = "POST";
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        data.set("_service", service.name);
        data.set("_page", location.href);

        if (needsConfig) {
          const email = cfg.emailFallback;
          if (email) {
            const subject = encodeURIComponent(`${service.name} lead`);
            const body = encodeURIComponent(
              [...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n")
            );
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            return;
          }
          if (status) {
            status.classList.add("error");
            status.textContent =
              "Add your Formspree form ID in leads.js (or set emailFallback) to receive requests.";
          }
          return;
        }

        if (status) {
          status.classList.remove("error");
          status.textContent = "Sending…";
        }

        try {
          const res = await fetch(action, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" }
          });
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          if (status) status.textContent = "Got it — we’ll follow up soon.";
        } catch (err) {
          if (status) {
            status.classList.add("error");
            status.textContent = "Couldn’t send. Call or text us instead.";
          }
        }
      });
    });
  }

  enhanceAnchors();
  wireForms();
})();
