import { ScrollSpy } from 'bootstrap';

declare global {
  interface Window {
    bootstrap: any;
  }
}

export function scroller() {
  window.addEventListener("DOMContentLoaded", (_) => {
    // Navbar shrink function
    var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector("#mainNav");
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove("navbar-shrink");
      } else {
        navbarCollapsible.classList.add("navbar-shrink");
      }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector("#mainNav");
    if (mainNav) {
      new ScrollSpy(document.body, {
        target: "#mainNav",
        offset: 74,
      });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler: HTMLElement | null =
      document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem: HTMLElement) {
      responsiveNavItem.addEventListener("click", () => {
        if (
          navbarToggler &&
          window.getComputedStyle(navbarToggler).display !== "none"
        ) {
          navbarToggler?.click();
        }
      });
    });
  });
}

scroller();
