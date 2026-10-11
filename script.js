document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#toggle-mode");
    const button_img = button.querySelector("img");
    const body = document.querySelector("body");

    button.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        
        if (button_img.getAttribute("src") === "img/moon.svg") {
            button_img.setAttribute("src", "img/sun.svg");
        } else {
            button_img.setAttribute("src", "img/moon.svg");
        }
    });

    // Follower Counter Interaction
    const followBtn = document.getElementById("follow-btn");
    const counterDisplay = document.getElementById("counter-display");
    let count = 0;

    if (followBtn && counterDisplay) {
        followBtn.addEventListener("click", function() {
            count++;
            counterDisplay.textContent = count;
            if (followBtn.textContent === "Follow") {
                followBtn.textContent = "Following";
            } else {
                followBtn.textContent = "Follow";
            };
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