// View Transitions - Stack Navigator Pattern
// Detect navigation direction and set appropriate transition type

function getPageDepth(pathname) {
  // Handle various path formats
  const cleanPath = pathname.split('/').pop() || 'index.html';
  const path = cleanPath === '' ? 'index.html' : cleanPath;

  // Define navigation depth hierarchy
  const depths = {
    'index.html': 0,
    '': 0,
    'about.html': 1,
    'products.html': 1,
    'contact.html': 1,
    'libManagementSystem.html': 2
  };
  return depths[path] !== undefined ? depths[path] : 1;
}

// On old page - before navigation
window.addEventListener("pageswap", async (e) => {
  if (!e.viewTransition) {
    console.log('View Transition not available');
    return;
  }

  const fromUrl = new URL(e.activation.from.url);
  const toUrl = new URL(e.activation.entry.url);

  const fromDepth = getPageDepth(fromUrl.pathname);
  const toDepth = getPageDepth(toUrl.pathname);

  console.log('Pageswap:', fromUrl.pathname, '->', toUrl.pathname, '| Depth:', fromDepth, '->', toDepth);

  // Determine transition type based on navigation depth
  if (e.activation.navigationType === 'reload') {
    e.viewTransition.types.add("reload");
    console.log('Transition type: reload');
  } else if (toDepth > fromDepth) {
    // Going deeper: Home -> About/Products/Contact/Library
    e.viewTransition.types.add("push");
    console.log('Transition type: push');
  } else if (toDepth < fromDepth) {
    // Going back: Any page -> Home
    e.viewTransition.types.add("pop");
    console.log('Transition type: pop');
  } else {
    // Same level: About <-> Products <-> Contact
    // Use push for visual consistency
    e.viewTransition.types.add("push");
    console.log('Transition type: push (same level)');
  }
});

// On new page - after navigation
window.addEventListener("pagereveal", async (e) => {
  if (!e.viewTransition) {
    console.log('No view transition on pagereveal');
    document.body.style.opacity = '1';
    return;
  }
  console.log('Pagereveal with transition types:', [...e.viewTransition.types]);
});

// take user input: Name, Age, grades (multiple grades)
// user enters stop or empty string -> we stop taking grades
// contraint: grades must be 3 at least, each between 0 and 100 and must be a number (errors should display a message and ask again)
// schema: student name -> string, student age -> int, student grades -> array of ints
// we calculated avg grade, highest and lowest grade
// avg is the grading number, 90+ → Excellent, 80+ → Very Good, 70+ → Good, 60+ → Pass, Less than 60 → Fail

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
        // Check for Cancel (null) or Empty
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

        // Validate: Must be Number, Must be Integer, Must be reasonable age
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
            break; // Stop taking grades
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

// Hero image scroll effect - gradual transformation
window.addEventListener("scroll", function () {
  const heroImg = document.querySelector(".hero img, .hero-section img");
  if (heroImg) {
    const scrollPosition = window.scrollY;
    const maxScroll = 500; // Maximum scroll distance for full effect

    // Calculate progress (0 to 1) based on scroll position
    const progress = Math.min(scrollPosition / maxScroll, 1);

    // Calculate scale (1 to 1.2)
    const scale = 1 + progress * 0.2;

    // Calculate brightness (0.5 to 0.35)
    const brightness = 0.5 - progress * 0.15;

    // Calculate blur (0 to 4px)
    const blur = progress * 4;

    // Apply the transformations
    heroImg.style.transform = `scale(${scale})`;
    heroImg.style.filter = `brightness(${brightness}) blur(${blur}px)`;
  }
});
