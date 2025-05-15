const inputs = document.querySelectorAll(".otp-inputs input");
const countdownEl = document.getElementById("countdown");
const resendBtn = document.getElementById("resendBtn");

let timer = 30;

// Autofocus next input
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Fake OTP check
function verifyOTP() {
  const otp = Array.from(inputs).map(input => input.value).join("");
  if (otp === "1234") {
    alert("✅ OTP Verified!");
  } else {
    alert("❌ Invalid OTP");
  }
}

// Timer countdown
function startCountdown() {
  resendBtn.disabled = true;
  timer = 30;
  const interval = setInterval(() => {
    countdownEl.textContent = timer;
    timer--;
    if (timer < 0) {
      clearInterval(interval);
      resendBtn.disabled = false;
      countdownEl.textContent = "0";
    }
  }, 1000);
}

function resendOTP() {
  alert("🔄 OTP Sent Again");
  inputs.forEach(input => input.value = "");
  inputs[0].focus();
  startCountdown();
}

// Start on load
startCountdown();
