/**
 * Sidebar
 */
function toggleSidebar() {
    document
        .getElementById("sidebar")
        .classList
        .toggle("open");
}

window.toggleSidebar = toggleSidebar;

/**
 * Filter Dropdowns
 */
function toggleSection(id) {

    const section =
        document.getElementById(id);

    section.classList.toggle("open");
}
window.toggleSection = toggleSection;