document.addEventListener("DOMContentLoaded", function() {
    // Dark Mode Toggle with Web Storage (localStorage)
    const button = document.querySelector("#toggle-mode");
    const button_img = button ? button.querySelector("img") : null;
    const body = document.querySelector("body");

    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            if (button_img) {
                button_img.setAttribute("src", "img/sun.svg");
                button_img.setAttribute("alt", "day-mode");
            }
        } else {
            body.classList.remove("dark-mode");
            if (button_img) {
                button_img.setAttribute("src", "img/moon.svg");
                button_img.setAttribute("alt", "night-mode");
            }
        }
    }

    // Restore saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        applyTheme(true);
    }

    if (button) {
        button.addEventListener("click", function() {
            const isDark = !body.classList.contains("dark-mode");
            applyTheme(isDark);
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // Follower Counter Interaction with Web Storage (localStorage)
    const followBtn = document.getElementById("follow-btn");
    const counterDisplay = document.getElementById("counter-display");

    if (followBtn && counterDisplay) {
        // Load persisted state from localStorage
        let savedCount = parseInt(localStorage.getItem("followCount"), 10);
        let count = isNaN(savedCount) ? 0 : savedCount;
        let isFollowing = localStorage.getItem("isFollowing") === "true";

        // Restore UI according to saved state
        if (isFollowing) {
            followBtn.classList.add("follow-active");
            followBtn.textContent = "Following";
        } else {
            followBtn.classList.remove("follow-active");
            followBtn.textContent = "Follow";
        }
        counterDisplay.textContent = count;

        followBtn.addEventListener("click", function() {
            isFollowing = !isFollowing;

            if (isFollowing) {
                count++;
                followBtn.classList.add("follow-active");
                followBtn.textContent = "Following";
            } else {
                count = Math.max(0, count - 1);
                followBtn.classList.remove("follow-active");
                followBtn.textContent = "Follow";
            }

            // Save updated state to localStorage
            localStorage.setItem("followCount", count);
            localStorage.setItem("isFollowing", isFollowing);

            counterDisplay.textContent = count;
        });
    }


    // Terminal Modal Logic (Real SSH / Jumpbox via Tailscale)
    const openTerminalBtn = document.getElementById("open-terminal-btn");
    const closeTerminalBtn = document.getElementById("close-terminal-btn");
    const terminalModal = document.getElementById("terminal-modal");
    const terminalFrame = document.getElementById("terminal-frame");

    function openTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.add("active");
        terminalModal.setAttribute("aria-hidden", "false");
        // Load iframe src on demand
        if (terminalFrame && !terminalFrame.getAttribute("src")) {
            terminalFrame.setAttribute("src", terminalFrame.getAttribute("data-src") || "");
        }
    }

    function closeTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.remove("active");
        terminalModal.setAttribute("aria-hidden", "true");
        // Unload iframe when closed to save resources
        if (terminalFrame) {
            terminalFrame.setAttribute("src", "");
        }
    }

    if (openTerminalBtn) {
        openTerminalBtn.addEventListener("click", openTerminal);
    }

    if (closeTerminalBtn) {
        closeTerminalBtn.addEventListener("click", closeTerminal);
    }

    // Close when clicking modal backdrop
    if (terminalModal) {
        terminalModal.addEventListener("click", function(e) {
            if (e.target === terminalModal) {
                closeTerminal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && terminalModal && terminalModal.classList.contains("active")) {
            closeTerminal();
        }
    });
});