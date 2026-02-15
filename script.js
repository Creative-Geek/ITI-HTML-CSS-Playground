/*
This script file is split into 4 sections:

1. View Transitions API - Cross-document view transitions (Chrome 126+)
2. Student Grade Management System
3. Hero image scroll effect - gradual transformation
4. Contact Form Validation
5. Login Modal Functionality
*/

// Fifth section: Login Modal Functionality

function login() {
  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-surface">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="loginForm" novalidate>
              <div class="mb-3">
                <label for="loginEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="loginEmail" placeholder="Enter your email" required>
                <div class="invalid-feedback" id="emailError">Please enter a valid email address.</div>
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password" required>
                <div class="invalid-feedback" id="passwordError">Password must be at least 6 characters.</div>
              </div>
              <button type="submit" class="btn btn-accent w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById("loginModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Get modal element
  const modalElement = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Show modal using Bootstrap
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Email validation
  emailInput.addEventListener("input", function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.value)) {
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
    } else {
      this.classList.remove("is-invalid");
      this.classList.add("is-valid");
    }
  });

  // Password validation
  passwordInput.addEventListener("input", function () {
    if (this.value.length < 6) {
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
    } else {
      this.classList.remove("is-invalid");
      this.classList.add("is-valid");
    }
  });

  // Form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      isValid = false;
    } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
    }

    // Validate password
    if (passwordInput.value.length < 6) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      isValid = false;
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    }

    if (isValid) {
      // Close modal
      modal.hide();

      // Show success alert
      setTimeout(function () {
        alert("Logged in successfully!");
      }, 300);
    }
  });
}

// First section: View Transitions API - Cross-document view transitions (Chrome 126+)

function getPageDepth(pathname) {
  const cleanPath = pathname.split("/").pop() || "index.html";
  const path = cleanPath === "" ? "index.html" : cleanPath;

  const depths = {
    "index.html": 0,
    "": 0,
    "about.html": 1,
    "products.html": 1,
    "contact.html": 1,
    "miniApps.html": 2,
    "libManagementSystem.html": 3,
    "todoList.html": 3,
  };
  return depths[path] !== undefined ? depths[path] : 1;
}

window.addEventListener("pageswap", async (e) => {
  if (!e.viewTransition) {
    return;
  }

  const fromUrl = new URL(e.activation.from.url);
  const toUrl = new URL(e.activation.entry.url);

  const fromDepth = getPageDepth(fromUrl.pathname);
  const toDepth = getPageDepth(toUrl.pathname);

  // Determine transition type based on navigation depth
  if (e.activation.navigationType === "reload") {
    e.viewTransition.types.add("reload");
  } else if (toDepth > fromDepth) {
    // Going deeper: Home -> About/Products/Contact/Library
    e.viewTransition.types.add("push");
  } else if (toDepth < fromDepth) {
    // Going back: Any page -> Home
    e.viewTransition.types.add("pop");
  } else {
    // Same level: About <-> Products <-> Contact
    // Use push for visual consistency
    e.viewTransition.types.add("push");
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (!e.viewTransition) {
    document.body.style.opacity = "1";
    return;
  }
});

// Second section: Student Grade Management System

// take user input: Name, Age, grades (multiple grades)
// user enters stop or empty string -> we stop taking grades
// contraint: grades must be 3 at least, each between 0 and 100 and must be a number (errors should display a message and ask again)
// schema: student name -> string, student age -> int, student grades -> array of ints
// we calculated avg grade, highest and lowest grade
// avg is the grading number, 90+  Excellent, 80+  Very Good, 70+  Good, 60+  Pass, Less than 60  Fail

// continuation system: push the first user to an array of object, after student 1, ask user if they want to continue,
// if yes, take the next user, if no, stop the program and display the array of objects

// when user ends we display the students name and their avg and their grade level, etc.
function studentManagement() {
  if (
    prompt(
      "Welcome to the student grade calculator! do you want to continue?(y/n)"
    ).toLowerCase() !== "y"
  ) {
    return;
  } else {
    let students = [];

    do {
      let student = {
        name: "",
        age: 0,
        grades: [],
        avg: 0,
        highest: 0,
        lowest: 0,
        status: "",
      };

      while (true) {
        let inputName = prompt("Enter student name:");
        if (inputName === null || inputName.trim() === "") {
          alert("Name is required.");
          continue;
        }
        student.name = inputName.trim();
        break;
      }

      while (true) {
        let inputAge = prompt("Enter student age:");
        if (inputAge === null || inputAge.trim() === "") {
          alert("Age is required.");
          continue;
        }

        let ageNum = Number(inputAge);

        if (isNaN(ageNum) || !Number.isInteger(ageNum) || ageNum <= 0) {
          alert("Please enter a valid whole number for age.");
          continue;
        }

        student.age = ageNum;
        break;
      }

      while (true) {
        let msg = `Enter grade #${student.grades.length + 1}`;
        if (student.grades.length >= 3) {
          msg += ` (or leave empty/type 'stop' to finish):`;
        } else {
          msg += ` (minimum 3 required):`;
        }

        let inputGrade = prompt(msg);

        if (student.grades.length >= 3) {
          if (
            inputGrade === null ||
            inputGrade.trim() === "" ||
            inputGrade.toLowerCase() === "stop"
          ) {
            break;
          }
        }

        if (inputGrade === null || inputGrade.trim() === "") {
          alert("Grade cannot be empty (you need at least 3 grades to stop).");
          continue;
        }

        let gradeNum = Number(inputGrade);

        if (isNaN(gradeNum)) {
          alert("Grade must be a number.");
          continue;
        }
        if (gradeNum < 0 || gradeNum > 100) {
          alert("Grade must be between 0 and 100.");
          continue;
        }

        student.grades.push(gradeNum);
      }

      let sum = student.grades.reduce((acc, curr) => acc + curr, 0);
      student.avg = sum / student.grades.length;
      student.highest = Math.max(...student.grades);
      student.lowest = Math.min(...student.grades);

      if (student.avg >= 90) student.status = "Excellent";
      else if (student.avg >= 80) student.status = "Very Good";
      else if (student.avg >= 70) student.status = "Good";
      else if (student.avg >= 60) student.status = "Pass";
      else student.status = "Fail";

      students.push(student);
    } while (
      prompt("Do you want to add another student?(y/n)").toLowerCase() === "y"
    );

    let report = "Students Report:\n";
    students.forEach((student, index) => {
      report += `Student #${index + 1}:\n`;
      report += `Name: ${student.name}\n`;
      report += `Age: ${student.age}\n`;
      report += `Grades: ${student.grades.join(", ")}\n`;
      report += `Average: ${Math.round(student.avg * 100) / 100}\n`;
      report += `Highest: ${student.highest}\n`;
      report += `Lowest: ${student.lowest}\n`;
      report += `Status: ${student.status}\n\n`;
    });

    alert(report);
  }
}

// Third section: Hero image scroll effect - gradual transformation

window.addEventListener("scroll", function () {
  const heroImg = document.querySelector(".hero img, .hero-section img");
  if (heroImg) {
    const scrollPosition = window.scrollY;
    const maxScroll = 500;

    const progress = Math.min(scrollPosition / maxScroll, 1);

    const scale = 1 + progress * 0.2;

    const brightness = 0.5 - progress * 0.15;

    const blur = progress * 4;

    heroImg.style.transform = `scale(${scale})`;
    heroImg.style.filter = `brightness(${brightness}) blur(${blur}px)`;
  }
});

// Fourth section: Contact Form Validation

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectSelect = document.getElementById("subject");
  const messageTextarea = document.getElementById("message");
  const charCount = document.getElementById("charCount");

  // Character counter for message
  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", function () {
      const currentLength = this.value.length;
      charCount.textContent = currentLength;

      // Update counter color based on length
      if (currentLength > 1800) {
        charCount.parentElement.classList.add("text-warning");
      } else {
        charCount.parentElement.classList.remove("text-warning");
      }
    });
  }

  // Real-time validation functions
  function validateName() {
    const value = nameInput.value.trim();
    const pattern =
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s\-]+$/;

    if (value.length < 2) {
      nameInput.setCustomValidity("Name must be at least 2 characters.");
    } else if (value.length > 100) {
      nameInput.setCustomValidity("Name cannot exceed 100 characters.");
    } else if (!pattern.test(value)) {
      nameInput.setCustomValidity(
        "Name can only contain letters (including Arabic), spaces, and hyphens."
      );
    } else {
      nameInput.setCustomValidity("");
    }

    updateFieldState(nameInput);
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }

    updateFieldState(emailInput);
  }

  function validateSubject() {
    if (!subjectSelect.value) {
      subjectSelect.setCustomValidity("Please select a subject.");
    } else {
      subjectSelect.setCustomValidity("");
    }

    updateFieldState(subjectSelect);
  }

  function validateMessage() {
    const value = messageTextarea.value.trim();

    if (value.length < 10) {
      messageTextarea.setCustomValidity(
        "Message must be at least 10 characters."
      );
    } else if (value.length > 2000) {
      messageTextarea.setCustomValidity(
        "Message cannot exceed 2000 characters."
      );
    } else {
      messageTextarea.setCustomValidity("");
    }

    updateFieldState(messageTextarea);
  }

  function updateFieldState(field) {
    if (field.checkValidity()) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    } else {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    }
  }

  // Add event listeners for real-time validation
  if (nameInput) {
    nameInput.addEventListener("input", validateName);
    nameInput.addEventListener("blur", validateName);
  }

  if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);
  }

  if (subjectSelect) {
    subjectSelect.addEventListener("change", validateSubject);
  }

  if (messageTextarea) {
    messageTextarea.addEventListener("input", validateMessage);
    messageTextarea.addEventListener("blur", validateMessage);
  }

  // Form submit handler
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // Validate all fields
      validateName();
      validateEmail();
      validateSubject();
      validateMessage();

      // Check form validity
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();

        // Focus first invalid field
        const firstInvalid = contactForm.querySelector(".is-invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }

        contactForm.classList.add("was-validated");
      } else {
        // Form is valid - show success message
        event.preventDefault();

        // Show success alert
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Message Sent!";
        submitBtn.classList.remove("btn-accent");
        submitBtn.classList.add("btn-success");

        // Reset form after 2 seconds
        setTimeout(function () {
          contactForm.reset();
          contactForm.classList.remove("was-validated");

          // Remove validation classes
          [nameInput, emailInput, subjectSelect, messageTextarea].forEach(
            function (field) {
              if (field) {
                field.classList.remove("is-valid", "is-invalid");
              }
            }
          );

          // Reset character counter
          if (charCount) {
            charCount.textContent = "0";
          }

          submitBtn.textContent = originalText;
          submitBtn.classList.remove("btn-success");
          submitBtn.classList.add("btn-accent");
        }, 2000);
      }
    });
  }
});
