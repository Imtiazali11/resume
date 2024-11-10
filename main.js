// Display uploaded profile picture
document.getElementById('profile-pic').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('display-pic').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Function to add skill
function addSkill() {
  const skillInput = document.getElementById('skill-input').value;
  if (skillInput) {
    const skill = document.createElement('span');
    skill.className = 'skill';
    skill.textContent = skillInput;
    document.getElementById('skills-list').appendChild(skill);
    document.getElementById('skill-input').value = '';
  }
}

// Functions to add experience and education
function addExperience() {
  const experience = document.createElement('div');
  experience.innerHTML = `
    <input type="text" placeholder="Job Title">
    <input type="text" placeholder="Company Name">
    <input type="text" placeholder="Dates of Employment">
    <textarea placeholder="Job Description"></textarea>
  `;
  document.getElementById('experience-list').appendChild(experience);
}

function addEducation() {
  const education = document.createElement('div');
  education.innerHTML = `
    <input type="text" placeholder="Degree">
    <input type="text" placeholder="Institution Name">
    <input type="text" placeholder="Graduation Year">
    <textarea placeholder="Description"></textarea>
  `;
  document.getElementById('education-list').appendChild(education);
}

// Function to generate the resume
function generateResume() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const linkedin = document.getElementById('linkedin').value;
  const website = document.getElementById('website').value;
  const summary = document.getElementById('summary').value;

  // Collect Skills
  const skills = Array.from(document.querySelectorAll('#skills-list .skill')).map(skill => skill.textContent);
  const skillsHtml = skills.map(skill => `<li>${skill}</li>`).join('');

  // Collect Experience
  const experienceItems = document.querySelectorAll('#experience-list > div');
  const experienceHtml = Array.from(experienceItems).map(item => {
    const jobTitle = item.querySelector('input:nth-child(1)').value;
    const company = item.querySelector('input:nth-child(2)').value;
    const dates = item.querySelector('input:nth-child(3)').value;
    const description = item.querySelector('textarea').value;
    return `<div><h4>${jobTitle} - ${company} (${dates})</h4><p>${description}</p></div>`;
  }).join('');

  // Collect Education
  const educationItems = document.querySelectorAll('#education-list > div');
  const educationHtml = Array.from(educationItems).map(item => {
    const degree = item.querySelector('input:nth-child(1)').value;
    const institution = item.querySelector('input:nth-child(2)').value;
    const year = item.querySelector('input:nth-child(3)').value;
    const description = item.querySelector('textarea').value;
    return `<div><h4>${degree} - ${institution} (${year})</h4><p>${description}</p></div>`;
  }).join('');

  // Populate Resume Content
  document.getElementById('resume-content').innerHTML = `
    <h2>${name}</h2>
    <p>${title}</p>
    <p>Email: ${email} | Phone: ${phone}</p>
    <p>LinkedIn: ${linkedin} | Website: ${website}</p>
    <div class="section">
      <h3>Summary</h3>
      <p>${summary}</p>
    </div>
    <div class="section">
      <h3>Skills</h3>
      <ul>${skillsHtml}</ul>
    </div>
    <div class="section">
      <h3>Experience</h3>
      ${experienceHtml}
    </div>
    <div class="section">
      <h3>Education</h3>
      ${educationHtml}
    </div>
  `;

  // Display the resume
  document.getElementById('resume-display').style.display = 'block';
}
