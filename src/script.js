function setNavHeight() {
    const navbar = document.getElementById("navbar");
    const navHeight = navbar.offsetHeight;
    document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
}
window.addEventListener("load", setNavHeight);
window.addEventListener("resize", setNavHeight);




function scrollToSection(sectionId) {
	const section = document.getElementById(sectionId);
	const container = document.getElementById("scroll-container");
	const navbar = document.getElementById("navbar");
	const navbarHeight = navbar.offsetHeight;

	container.scrollTo({
		top: section.offsetTop - navbarHeight,
		behavior: "smooth",
	});
}

document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.getElementById("navbar");
	const container = document.getElementById("scroll-container");
	const navButtons = document.getElementById("nav-buttons");
	const sections = ["home", "qualifications", "my-work", "about-me"];

	function setActiveSection() {
		const scrollPosition = container.scrollTop;
		const navbarHeight = navbar.offsetHeight;
		const containerHeight = container.clientHeight;

		// Find which section is currently most visible
		let activeSection = sections[0];
		let maxVisibility = 0;

		for (const sectionId of sections) {
			const section = document.getElementById(sectionId);
			const sectionTop = section.offsetTop - navbarHeight;
			const sectionHeight = section.offsetHeight;

			// Calculate how much of the section is visible
			const visibleHeight = Math.min(containerHeight, sectionTop + sectionHeight - scrollPosition) - Math.max(0, sectionTop - scrollPosition);

			const visibilityRatio = visibleHeight / containerHeight;

			// Only consider sections that are at least 30% visible
			if (visibilityRatio > maxVisibility && visibilityRatio > 0.3) {
				maxVisibility = visibilityRatio;
				activeSection = sectionId;
			}
		}

		// Update navigation styles - only for navbar links
		document.querySelectorAll(".desktop-nav-link.navbar-link").forEach((link) => {
			const section = link.getAttribute("data-section");
			if (section === activeSection) {
				link.classList.add("bg-warning", "text-base-100", "hover:bg-white");
				link.classList.remove("text-white", "btn-primary");
			} else {
				link.classList.remove("bg-warning", "text-base-100", "hover:bg-white");
				if (link.classList.contains("btn")) {
					link.classList.add("btn-primary", "text-white");
				}
			}
		});
	}

	// Update active section on scroll
	container.addEventListener("scroll", setActiveSection);

	// Update active section when clicking navigation
	const originalScrollToSection = window.scrollToSection;
	window.scrollToSection = function (sectionId) {
		originalScrollToSection(sectionId);
		setTimeout(setActiveSection, 100); // Update active section after scroll animation starts
	};

	container.addEventListener("scroll", function () {
		const navButtonsBottom = navButtons.getBoundingClientRect().bottom;

		if (navButtonsBottom < 0) {
			navbar.classList.remove("lg:opacity-0", "lg:pointer-events-none");
		} else {
			navbar.classList.add("lg:opacity-0", "lg:pointer-events-none");
		}
	});
});
