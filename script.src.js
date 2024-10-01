"use strict";
(function () {
	var theme_key = "theme1";
	var theme_switch_id = "theme-switch";
	var theme_switch_link_id = "theme-switch-link";

	function show_theme(theme, eln, defl) {
		if (null === theme || undefined === theme) {
			return false;
		}
		if (eln === theme_switch_id) {
			var option_switch = document.getElementById(theme_switch_id + "-" + theme.substring(6));
			if (null !== option_switch) {
				option_switch.selected = "selected";
			}
		} else if (eln === theme_switch_link_id) {
			document.getElementById(eln).textContent = defl + ": " + theme.substring(6);
		} else {
			console.debug("eln is", eln);
		}
	}

	function set_theme(theme) {
		if (null === theme) {
			try {
				theme = window.localStorage.getItem(theme_key);
			} catch (err) {
				console.error(err);
			}
			if (null === theme || undefined === theme) {
				return theme;
			}
		}
		document.documentElement.classList.remove("theme-light", "theme-dark", "theme-midnight", "theme-sc-auto",
			"theme-sc-light", "theme-sc-dark");
		if (theme !== "theme-auto") {
			document.documentElement.classList.add(theme);
			if (theme === "theme-sc-light" || theme === "theme-sc-dark") {
				document.documentElement.classList.add("theme-sc-auto");
			}
		}
		return theme;
	}

	var theme = set_theme(null);
	console.debug("localStorage theme is", theme);

	function set_all() {
		var el_theme_switch = document.getElementById(theme_switch_id);
		var el_theme_switch_link = document.getElementById(theme_switch_link_id);

		if (null !== el_theme_switch) {
			show_theme(theme, theme_switch_id);
			el_theme_switch.addEventListener("change", function () {
				var theme = this.value;
				if (theme === "theme-auto") {
					window.localStorage.removeItem(theme_key);
				} else {
					window.localStorage.setItem(theme_key, theme);
				}
				set_theme(theme);
			});
		} else {
			console.debug(theme_switch_id, "is null");
		}

		if (null !== el_theme_switch_link) {
			var defl = el_theme_switch_link.textContent;
			show_theme(theme, theme_switch_link_id, defl);
			el_theme_switch_link.addEventListener("click", function (e) {
				e.preventDefault();
				var theme = window.localStorage.getItem(theme_key);
				switch (theme) {
					case "theme-auto":
						theme = "theme-dark";
						break;
					case "theme-dark":
						theme = "theme-light";
						break;
					case "theme-light":
						theme = "theme-midnight";
						break;
					case "theme-midnight":
						theme = "theme-sc-auto";
						break;
					case "theme-sc-auto":
						theme = "theme-auto";
						break;
					default:
						theme = "theme-dark";
						break;
				}
				console.debug("new theme is", theme);
				if (theme === "theme-auto") {
					window.localStorage.removeItem(theme_key);
				} else {
					window.localStorage.setItem(theme_key, theme);
				}
				show_theme(set_theme(theme), theme_switch_link_id, defl);
				return false;
			});
		}

		if (window.location.hostname === "salif.github.io") {
			(function (c_, o_, u_, n_, t_, e_, r_) {
				e_ = c_.createElement('script'), r_ = c_.getElementsByTagName(o_)[0]; e_.async = 1;
				e_.setAttribute(n_, t_); e_.src = u_; r_.parentNode.insertBefore(e_, r_);
			})(document, 'script', 'https://gc.zgo.at/count.js', 'data-goatcounter', 'https://sgi.goatcounter.com/count');
		}
	}

	console.debug("readyState is", document.readyState);
	if (document.readyState === "loading") {
		window.addEventListener("DOMContentLoaded", set_all);
	} else {
		set_all();
	}

})();
