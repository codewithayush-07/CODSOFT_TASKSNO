# Personal Portfolio Website

My personal portfolio, built with plain HTML, CSS and JavaScript (no frameworks). It shows who I am, what I know, the projects I've built and how to reach me.

I'm Ayush Gupta, a B.Tech Computer Science & Engineering student at SRM Institute of Science and Technology, currently getting into full stack web development.

## What's on the site

- **Home**: intro, links to my GitHub, LinkedIn and LeetCode, and a button to download my resume
- **About**: a short bio and quick facts
- **Skills**: grouped by category, with buttons to filter them
- **Projects**: cards for my four projects (Portfolio Website, Expense Tracker, To-Do List, Music Player)
- **Resume**: experience, education, certifications, plus the PDF download
- **Contact**: my details and a contact form

## Features

- Responsive layout that works on phones, tablets and desktops
- Mobile menu that opens from a hamburger button
- Smooth scrolling, and the nav highlights the section you're on
- Hover animations on cards and buttons
- Light and dark theme (follows your system setting, and the toggle remembers your choice)
- Downloadable resume (`assets/Ayush_Gupta_Resume.pdf`)
- Contact form validation: name, email, subject and message are checked before anything is sent, with error messages under each field
- Respects "reduce motion" for people who turn animations off

## Tech used

- HTML5
- CSS3 (custom properties, grid, flexbox, media queries)
- JavaScript (vanilla)
- Google Fonts: Bricolage Grotesque, Hanken Grotesk, JetBrains Mono

## Folder structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── Ayush_Gupta_Resume.pdf
```

## How to run it

No install or build step. Download or clone the project and open `index.html` in a browser.

```bash
git clone https://github.com/codewithayush-07/personal-portfolio.git
cd personal-portfolio
```

Then open `index.html`. Keep the `assets` folder next to it or the resume button won't find the PDF.

To put it online you can use GitHub Pages: push the files to a repo, then go to Settings > Pages and pick the main branch.

## Things to know

- The contact form has no backend. When the form is valid it opens your email app with the message already written, addressed to me.
- The fonts load from Google Fonts, so they need an internet connection. Without one the browser uses a normal system font and everything still works.
- The project card images are simple illustrations, not screenshots.

## Editing it

- **Colours and fonts**: the variables at the top of `style.css`
- **Text, projects and links**: `index.html`
- **Project links**: each card's "View code" link currently goes to my GitHub profile. Change them to the individual repo links.
- **Resume**: replace `assets/Ayush_Gupta_Resume.pdf` with a newer file using the same name

## Contact

- Email: ayushgupta7306@gmail.com
- GitHub: https://github.com/codewithayush-07
- LinkedIn: https://www.linkedin.com/in/ayush-gupta-a4b253326
- LeetCode: https://leetcode.com/u/Ayush_Gupta001
