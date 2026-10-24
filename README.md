# Sagar Rathod – Product Manager Portfolio

Static site, no build step. Open `index.html` to view it.

## Folder structure
```
sagar-portfolio/
├── index.html     page structure and content
├── style.css      all styling, light and dark themes
├── script.js      case studies data, prototypes, RICE calculator, theme toggle
├── images/        sagar-1.jpg ... sagar-5.jpg
└── README.md
```

## Update links
In `index.html`, replace each `href="#"` for Resume / LinkedIn / Portfolio with your real URLs.

## Push to GitHub
```bash
git init
git add .
git commit -m "Sagar Rathod portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/sagar-portfolio.git
git push -u origin main
```

## Deploy on Vercel (free)
1. vercel.com -> sign in with GitHub.
2. Add New -> Project -> import the repo.
3. Framework Preset: **Other**. Leave build and output settings empty.
4. Click **Deploy**.
