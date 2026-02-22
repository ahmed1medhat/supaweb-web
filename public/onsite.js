(function () {
  var DAY_IN_MS = 24 * 60 * 60 * 1000;
  var DEFAULT_PRIMARY_COLOR = "#22d3ee";
  var DEFAULT_TEXT_COLOR = "#f8fafc";
  var DEFAULT_BACKGROUND_STYLE = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";

  function getCurrentScript() {
    if (document.currentScript) {
      return document.currentScript;
    }

    var scripts = document.querySelectorAll("script[src]");
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      var candidate = scripts[index];
      var src = candidate.getAttribute("src") || "";
      if (src.indexOf("/onsite.js") !== -1) {
        return candidate;
      }
    }

    return null;
  }

  function safeHexColor(value, fallback) {
    if (typeof value !== "string") {
      return fallback;
    }

    return /^#[0-9a-f]{6}$/i.test(value.trim()) ? value.trim() : fallback;
  }

  function getPositionClass(type, position) {
    if (type === "top_bar") {
      return position === "bottom" ? "bottom:0;" : "top:0;";
    }

    if (type === "modal") {
      if (position === "top") {
        return "top:40px;";
      }

      if (position === "bottom") {
        return "bottom:40px;";
      }

      return "top:50%;transform:translate(-50%,-50%);";
    }

    if (position === "top") {
      return "top:24px;";
    }

    if (position === "center") {
      return "top:50%;transform:translateY(-50%);";
    }

    return "bottom:24px;";
  }

  function getStorageKey(campaign) {
    var suffix = campaign.frequency === "daily" ? "daily" : "session";
    return "supaweb:onsite:dismissed:" + suffix + ":" + campaign.id;
  }

  function isSuppressed(campaign) {
    var key = getStorageKey(campaign);

    try {
      if (campaign.frequency === "session") {
        return sessionStorage.getItem(key) === "1";
      }

      var raw = localStorage.getItem(key);
      if (!raw) {
        return false;
      }

      var timestamp = parseInt(raw, 10);
      if (!Number.isFinite(timestamp)) {
        return false;
      }

      return Date.now() - timestamp < DAY_IN_MS;
    } catch {
      return false;
    }
  }

  function persistSuppression(campaign) {
    var key = getStorageKey(campaign);

    try {
      if (campaign.frequency === "daily") {
        localStorage.setItem(key, String(Date.now()));
        return;
      }

      sessionStorage.setItem(key, "1");
    } catch {
      // Storage can be blocked by browser privacy settings.
    }
  }

  function createElement(tag, styleText, textContent) {
    var element = document.createElement(tag);
    if (styleText) {
      element.style.cssText = styleText;
    }
    if (typeof textContent === "string") {
      element.textContent = textContent;
    }
    return element;
  }

  function buildSurfaceStyle(campaign) {
    var primary = safeHexColor(campaign.primary_color, DEFAULT_PRIMARY_COLOR);
    var text = safeHexColor(campaign.text_color, DEFAULT_TEXT_COLOR);
    var background =
      typeof campaign.background_style === "string" && campaign.background_style.trim().length > 0
        ? campaign.background_style.trim()
        : DEFAULT_BACKGROUND_STYLE;

    return {
      primary: primary,
      text: text,
      background: background,
      border: primary + "66",
    };
  }

  function createCloseButton(onClose) {
    var button = createElement(
      "button",
      "border:1px solid rgba(255,255,255,0.35);background:transparent;color:#fff;border-radius:6px;padding:4px 8px;font-size:12px;font-weight:600;cursor:pointer;",
      "X",
    );
    button.type = "button";
    button.setAttribute("aria-label", "Dismiss campaign");
    button.addEventListener("click", onClose);
    return button;
  }

  function createCta(campaign, style) {
    if (!campaign.cta_url || String(campaign.cta_url).trim().length === 0) {
      return null;
    }

    var link = createElement(
      "a",
      "display:inline-flex;text-decoration:none;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;",
      campaign.cta_text && String(campaign.cta_text).trim().length > 0 ? campaign.cta_text.trim() : "Learn more",
    );
    link.href = String(campaign.cta_url).trim();
    link.style.backgroundColor = style.primary;
    link.style.color = "#020617";
    return link;
  }

  function renderTopBar(campaign, root, style, close) {
    var position = getPositionClass("top_bar", campaign.position || "top");
    var wrapper = createElement(
      "aside",
      "position:fixed;left:0;right:0;z-index:2147483000;border-top:1px solid " +
        style.border +
        ";border-bottom:1px solid " +
        style.border +
        ";box-shadow:0 10px 30px rgba(2,6,23,0.35);" +
        position,
    );
    wrapper.style.background = style.background;
    wrapper.style.color = style.text;

    var inner = createElement(
      "div",
      "max-width:1100px;margin:0 auto;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;",
    );
    var textCol = createElement("div", "min-width:0;display:flex;flex-direction:column;gap:4px;");
    var title = createElement(
      "p",
      "margin:0;font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      campaign.title && String(campaign.title).trim().length > 0 ? campaign.title.trim() : "Latest update",
    );
    var messageText =
      campaign.message && String(campaign.message).trim().length > 0 ? campaign.message.trim() : "";

    textCol.appendChild(title);
    if (messageText) {
      var message = createElement(
        "p",
        "margin:0;font-size:12px;opacity:.92;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
        messageText,
      );
      textCol.appendChild(message);
    }

    var actions = createElement("div", "display:flex;align-items:center;gap:8px;flex-shrink:0;");
    var cta = createCta(campaign, style);
    if (cta) {
      actions.appendChild(cta);
    }
    actions.appendChild(createCloseButton(close));

    inner.appendChild(textCol);
    inner.appendChild(actions);
    wrapper.appendChild(inner);
    root.appendChild(wrapper);
  }

  function renderModal(campaign, root, style, close) {
    var overlay = createElement(
      "div",
      "position:fixed;inset:0;z-index:2147483000;background:rgba(2,6,23,0.68);backdrop-filter:blur(2px);",
    );
    overlay.addEventListener("click", close);

    var position = getPositionClass("modal", campaign.position || "center");
    var modal = createElement(
      "aside",
      "position:fixed;left:50%;z-index:2147483001;width:min(92vw,560px);border:1px solid " +
        style.border +
        ";border-radius:16px;padding:18px;box-shadow:0 20px 48px rgba(2,6,23,0.45);" +
        position,
    );
    modal.style.background = style.background;
    modal.style.color = style.text;

    var header = createElement("div", "display:flex;align-items:flex-start;justify-content:space-between;gap:12px;");
    var textCol = createElement("div", "min-width:0;");
    var title = createElement(
      "p",
      "margin:0;font-size:20px;font-weight:700;",
      campaign.title && String(campaign.title).trim().length > 0 ? campaign.title.trim() : "Latest update",
    );
    textCol.appendChild(title);

    var messageText =
      campaign.message && String(campaign.message).trim().length > 0 ? campaign.message.trim() : "";
    if (messageText) {
      var message = createElement("p", "margin:10px 0 0;font-size:14px;line-height:1.45;opacity:.95;", messageText);
      textCol.appendChild(message);
    }

    header.appendChild(textCol);
    header.appendChild(createCloseButton(close));
    modal.appendChild(header);

    var cta = createCta(campaign, style);
    if (cta) {
      cta.style.marginTop = "14px";
      modal.appendChild(cta);
    }

    modal.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    root.appendChild(overlay);
    root.appendChild(modal);
  }

  function renderSlideIn(campaign, root, style, close) {
    var position = getPositionClass("slide_in", campaign.position || "bottom");
    var panel = createElement(
      "aside",
      "position:fixed;right:16px;z-index:2147483000;width:min(92vw,390px);border:1px solid " +
        style.border +
        ";border-radius:16px;padding:14px;box-shadow:0 18px 38px rgba(2,6,23,0.45);" +
        position,
    );
    panel.style.background = style.background;
    panel.style.color = style.text;

    var header = createElement("div", "display:flex;align-items:flex-start;justify-content:space-between;gap:10px;");
    var textCol = createElement("div", "min-width:0;");
    var title = createElement(
      "p",
      "margin:0;font-size:15px;font-weight:700;",
      campaign.title && String(campaign.title).trim().length > 0 ? campaign.title.trim() : "Latest update",
    );
    textCol.appendChild(title);

    var messageText =
      campaign.message && String(campaign.message).trim().length > 0 ? campaign.message.trim() : "";
    if (messageText) {
      var message = createElement("p", "margin:8px 0 0;font-size:12px;line-height:1.45;opacity:.95;", messageText);
      textCol.appendChild(message);
    }

    header.appendChild(textCol);
    header.appendChild(createCloseButton(close));
    panel.appendChild(header);

    var cta = createCta(campaign, style);
    if (cta) {
      cta.style.marginTop = "12px";
      panel.appendChild(cta);
    }

    root.appendChild(panel);
  }

  function renderCampaign(campaign) {
    if (!campaign || !campaign.id) {
      return;
    }

    if (isSuppressed(campaign)) {
      return;
    }

    var mount = createElement("div", "all:initial;");
    mount.id = "supaweb-onsite-root";
    document.body.appendChild(mount);

    function close() {
      persistSuppression(campaign);
      if (mount.parentNode) {
        mount.parentNode.removeChild(mount);
      }
    }

    var style = buildSurfaceStyle(campaign);
    if (campaign.type === "modal") {
      renderModal(campaign, mount, style, close);
      return;
    }

    if (campaign.type === "slide_in") {
      renderSlideIn(campaign, mount, style, close);
      return;
    }

    renderTopBar(campaign, mount, style, close);
  }

  function fetchActiveCampaign(siteKey, apiBase) {
    var params = new URLSearchParams({
      site_key: siteKey,
      path: window.location.pathname || "/",
    });

    return fetch(apiBase + "/api/onsite/active-campaign?" + params.toString(), {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
    })
      .then(function (response) {
        if (!response.ok) {
          return null;
        }

        return response.json();
      })
      .then(function (payload) {
        if (!payload || typeof payload !== "object") {
          return null;
        }

        return payload.campaign || null;
      })
      .catch(function () {
        return null;
      });
  }

  var scriptTag = getCurrentScript();
  if (!scriptTag) {
    return;
  }

  var siteKey = scriptTag.getAttribute("data-site");
  if (!siteKey) {
    return;
  }

  var apiBase = "https://supaweblabs.com";
  var apiBaseOverride = scriptTag.getAttribute("data-api-base");
  if (apiBaseOverride && apiBaseOverride.trim()) {
    apiBase = apiBaseOverride.trim().replace(/\/+$/, "");
  }

  try {
    var scriptUrl = new URL(scriptTag.src, window.location.href);
    if (!apiBaseOverride) {
      apiBase = scriptUrl.origin || apiBase;
    }
  } catch {
    // Keep fallback.
  }

  fetchActiveCampaign(siteKey.trim(), apiBase).then(function (campaign) {
    if (campaign) {
      renderCampaign(campaign);
    }
  });
})();
