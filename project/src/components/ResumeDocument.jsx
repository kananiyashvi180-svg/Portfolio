import React from 'react';

const ResumeDocument = () => {
    return (
        <div className="resume-wrapper">
            <style>{`
                .resume-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 2rem 1rem;
                    background: transparent;
                    width: 100%;
                    overflow: hidden;
                }
                .resume-page {
                    width: 794px;
                    height: 1123px;
                    background: #fff;
                    color: #000;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    transform-origin: top center;
                    font-family: Arial, sans-serif;
                    font-size: 9pt;
                    line-height: 1.45;
                }
                .resume-page * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                /* Desktop/Tablet Scaling */
                @media (max-width: 1024px) {
                    .resume-page {
                        transform: scale(0.9);
                        margin-bottom: -112px;
                    }
                }
                @media (max-width: 850px) {
                    .resume-page {
                        transform: scale(0.7);
                        margin-bottom: -337px;
                    }
                }
                
                /* Mobile: Single Column */
                @media (max-width: 640px) {
                    .resume-wrapper {
                        padding: 1rem 0;
                    }
                    .resume-page {
                        width: 100%;
                        height: auto;
                        transform: none;
                        margin-bottom: 0;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                        border-radius: 8px;
                    }
                    .body {
                        display: flex !important;
                        flex-direction: column;
                    }
                    .col-left {
                        border-right: none !important;
                        border-bottom: 1.5px solid #bbb;
                        width: 100%;
                    }
                    .col-right {
                        width: 100%;
                    }
                }

                /* ══════════════════════════════
                   HEADER
                ══════════════════════════════ */
                .header {
                    padding: 18px 24px 10px 24px;
                    border-bottom: 3px solid #888;
                }
                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .header-name {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 26pt;
                    font-weight: 900;
                    letter-spacing: 0px;
                    line-height: 1;
                    text-transform: uppercase;
                }
                .header-contacts {
                    text-align: right;
                    font-family: Arial, sans-serif;
                    font-size: 8.5pt;
                    line-height: 2;
                    color: #000;
                }
                .header-contacts div {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 6px;
                }
                .icon-circle {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #555;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 6pt;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                .header-role {
                    font-family: Arial, sans-serif;
                    font-size: 10pt;
                    color: #333;
                    margin-top: 4px;
                    border-bottom: 1.5px solid #000;
                    padding-bottom: 6px;
                    width: fit-content;
                    min-width: 200px;
                }
                .header-links {
                    display: flex;
                    gap: 14px;
                    margin-top: 7px;
                    font-family: Arial, sans-serif;
                    font-size: 8.5pt;
                    align-items: center;
                    justify-content: space-between;
                }
                .header-links .left-links { display: flex; gap: 14px; }
                .header-links a { color: #000; text-decoration: underline; font-weight: normal; }
                
                /* ══════════════════════════════
                   SUMMARY (full width)
                ══════════════════════════════ */
                .summary-band {
                    padding: 10px 30px;
                    border-bottom: 1px solid #ccc;
                    text-align: center;
                }
                .summary-band .sec-title {
                    font-family: Arial, sans-serif;
                    font-size: 10pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border-bottom: 1.5px solid #000;
                    display: inline-block;
                    padding-bottom: 2px;
                    margin-bottom: 7px;
                }
                .summary-band p {
                    font-size: 9.5pt;
                    line-height: 1.6;
                    color: #111;
                    text-align: center;
                }

                /* ══════════════════════════════
                   BODY: LEFT + RIGHT
                ══════════════════════════════ */
                .body {
                    display: grid;
                    grid-template-columns: 40% 60%;
                    width: 100%;
                    flex: 1;
                    align-items: stretch;
                }

                /* LEFT */
                .col-left {
                    padding: 14px 10px 14px 16px;
                    border-right: 1.5px solid #bbb;
                    min-height: 100%;
                }

                /* RIGHT */
                .col-right {
                    padding: 14px 20px 14px 16px;
                    min-height: 100%;
                }

                /* ── SECTION TITLE (left) ── */
                .sec-head {
                    font-family: Arial, sans-serif;
                    font-size: 10.5pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    border-bottom: 2px solid #000;
                    padding-bottom: 2px;
                    margin-bottom: 6px;
                    margin-top: 12px;
                }
                .col-left .sec-head:first-child { margin-top: 0; }

                /* ── SKILLS (left) ── */
                .currently-exploring {
                    font-size: 9pt;
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    margin-top: 5px;
                    margin-bottom: 3px;
                }
                .exploring-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1px 4px;
                    font-size: 8.5pt;
                    font-family: Arial, sans-serif;
                    color: #222;
                }

                /* ── HACKATHON / ACHIEVEMENT / CERT (left) ── */
                .left-link-list {
                    list-style: none;
                    padding: 0;
                }
                .left-link-list li {
                    font-size: 9pt;
                    font-family: Arial, sans-serif;
                    padding: 2px 0;
                }
                .left-link-list li a, .left-link-list li span {
                    color: #000;
                    text-decoration: underline;
                }

                /* ══════════════════════════════
                   RIGHT — SECTION TITLE
                ══════════════════════════════ */
                .r-sec-head {
                    font-family: Arial, sans-serif;
                    font-size: 10.5pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    border-bottom: 2px solid #000;
                    padding-bottom: 2px;
                    margin-bottom: 8px;
                    margin-top: 12px;
                }
                .col-right .r-sec-head:first-child { margin-top: 0; }

                /* ── EXPERIENCE ── */
                .exp-item { margin-bottom: 10px; }
                .exp-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
                .exp-title {
                    font-family: Arial, sans-serif;
                    font-size: 10pt;
                    font-weight: bold;
                }
                .exp-date {
                    font-family: Arial, sans-serif;
                    font-size: 9pt;
                    color: #333;
                    font-style: italic;
                }
                .key-features-label {
                    font-family: Arial, sans-serif;
                    font-size: 9pt;
                    font-style: italic;
                    margin: 4px 0 2px 0;
                    color: #222;
                }
                .exp-bullets {
                    list-style: none;
                    padding: 0;
                    margin-bottom: 4px;
                }
                .exp-bullets li {
                    font-size: 9pt;
                    font-family: Arial, sans-serif;
                    padding: 1.5px 0 1.5px 10px;
                    position: relative;
                }
                .exp-bullets li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                }
                .tech-line {
                    font-size: 9pt;
                    font-family: Arial, sans-serif;
                    margin-top: 3px;
                }
                .tech-line strong { font-weight: bold; }
                .repo-line {
                    font-size: 9pt;
                    font-family: Arial, sans-serif;
                    margin-top: 1px;
                }
                .repo-line a { color: #000; text-decoration: underline; }

                /* ── PROJECTS ── */
                .proj-category {
                    font-family: Arial, sans-serif;
                    font-size: 9.5pt;
                    font-weight: bold;
                    margin-top: 8px;
                    margin-bottom: 2px;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
                .proj-name {
                    font-family: Arial, sans-serif;
                    font-size: 9.5pt;
                    font-weight: bold;
                    margin-bottom: 3px;
                }
                .proj-item { margin-bottom: 9px; }

                /* divider between projects */
                .proj-divider {
                    border: none;
                    border-top: 1px solid #ddd;
                    margin: 8px 0;
                }
            `}</style>
            <div className="resume-page">
                {/* ════════════ HEADER ════════════ */}
                <div className="header">
                    <div className="header-top">
                        <div>
                            <div className="header-name">Yashvi Kanani</div>
                            <div className="header-role">Full-Stack Developer</div>
                        </div>
                        <div className="header-contacts">
                            <div><span>+91 91064 54707</span><span className="icon-circle">☎</span></div>
                            <div><span>yashvi.kanani.cg&#64;gmail.com</span><span className="icon-circle">✉</span></div>
                            <div><span>Kalol, Gujarat, India</span><span className="icon-circle">⌂</span></div>
                        </div>
                    </div>
                    <div className="header-links">
                        <div className="left-links">
                            <a href="https://github.com/kananiyashvi180-svg" target="_blank" rel="noreferrer">Github</a>
                            <a href="https://www.linkedin.com/in/yashvi-kanani-8539a738a/" target="_blank" rel="noreferrer">LinkedIn</a>
                            <a href="https://leetcode.com/u/YashviKanani257/" target="_blank" rel="noreferrer">LeetCode</a>
                            <a href="https://www.sololearn.com/en/profile/34907179" target="_blank" rel="noreferrer">Sololearn</a>
                        </div>
                        <div className="location"></div>
                    </div>
                </div>

                {/* ════════════ SUMMARY ════════════ */}
                <div className="summary-band">
                    <div className="sec-title">Summary</div>
                    <p>Computer Science undergraduate with hands-on experience in building and deploying full-stack web applications.<br />
                    Skilled in frontend and backend development using React.js, Node.js, Express.js, and MongoDB.<br />
                    Currently exploring cloud deployment, database optimization, and scalable backend architecture.</p>
                </div>

                {/* ════════════ BODY ════════════ */}
                <div className="body">
                    {/* ══ LEFT COLUMN ══ */}
                    <div className="col-left">
                        {/* SKILLS */}
                        <div className="sec-head">Skills</div>
                        <div style={{ fontFamily: "Arial, sans-serif" }}>
                            <div style={{ marginBottom: "7px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>Languages &amp; Frameworks:</div>
                                <div style={{ fontSize: "8.5pt" }}>JavaScript (ES6+), C++, React.js, Tailwind CSS, HTML5, CSS3</div>
                            </div>
                            <div style={{ marginBottom: "7px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>Databases &amp; Backend:</div>
                                <div style={{ fontSize: "8.5pt" }}>MongoDB, Mongoose, REST APIs, Cloudinary, Node.js, Express.js</div>
                            </div>
                            <div style={{ marginBottom: "7px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>Tools &amp; Platforms:</div>
                                <div style={{ fontSize: "8.5pt" }}>Git, GitHub, Postman, npm, Vercel, Netlify, Render, Figma, Hostinger</div>
                            </div>
                            <div style={{ marginBottom: "7px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>UI/UX Design:</div>
                                <div style={{ fontSize: "8.5pt" }}>Figma, Wireframing, Prototyping</div>
                            </div>
                        </div>
                        <div className="currently-exploring">Currently Exploring</div>
                        <div className="exploring-grid">
                            <span>Next.js</span><span>TypeScript</span>
                            <span>AWS basics</span><span>Backend Scalability</span>
                        </div>

                        {/* INTERESTS */}
                        <div className="sec-head">Interests</div>
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "8.5pt", lineHeight: "1.6", color: "#111" }}>
                            <p style={{ marginBottom: "5px" }}>— <strong>Problem Solving &amp; Learning New Technologies</strong> — I have a strong passion for coding and enjoy building solutions through logical thinking and problem-solving. I continuously explore new technologies to enhance my technical skills.</p>
                            <p style={{ marginBottom: "5px" }}>In my free time, I enjoy playing badminton, which helps me stay active and maintain focus. It also improves my discipline and teamwork abilities.</p>
                            <p><strong>Coding &amp; Building Web Applications</strong> &nbsp;|&nbsp; <strong>Playing Badminton</strong></p>
                        </div>

                        {/* CERTIFICATIONS */}
                        <div className="sec-head">Certifications</div>
                        <ul className="left-link-list">
                            <li><a href="https://www.sololearn.com/certificates/CC-BRS73VE3" target="_blank" rel="noreferrer">Javascript Intermediate</a></li>
                            <li><a href="https://www.sololearn.com/certificates/CC-DQPR4GTK" target="_blank" rel="noreferrer">Javascript Basic</a></li>
                            <li><a href="https://www.sololearn.com/certificates/CC-LARACUY7" target="_blank" rel="noreferrer">Introduction to C++</a></li>
                            <li><a href="https://www.sololearn.com/certificates/CC-ZLVMOOEC" target="_blank" rel="noreferrer">C Intermediate</a></li>
                        </ul>

                        {/* EDUCATION */}
                        <div className="sec-head">Education</div>
                        <div style={{ fontFamily: "Arial, sans-serif" }}>
                            <div style={{ marginBottom: "8px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>Swaminarayan University</div>
                                <div style={{ fontSize: "8.5pt" }}>B.E. (Bachelor of Engineering)</div>
                                <div style={{ fontSize: "8pt", fontStyle: "italic" }}>2025 – 2029 | Kalol, Gujarat</div>
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>Dream International School</div>
                                <div style={{ fontSize: "8.5pt" }}>Higher Secondary Education (GSEB)</div>
                                <div style={{ fontSize: "8pt", fontStyle: "italic" }}>2023 – 2025 | Dhoraji, Gujarat</div>
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                                <div style={{ fontSize: "9pt", fontWeight: "bold" }}>St. Ann's High School</div>
                                <div style={{ fontSize: "8.5pt" }}>Secondary Education</div>
                                <div style={{ fontSize: "8pt", fontStyle: "italic" }}>2021 – 2023 | Dwarka, Gujarat</div>
                            </div>
                        </div>

                    </div>

                    {/* ══ RIGHT COLUMN ══ */}
                    <div className="col-right">

                        {/* FULL STACK PROJECT */}
                        <div className="r-sec-head">Full Stack Project</div>

                        <div className="exp-item">
                            <div className="exp-header">
                                <span className="exp-title">MediGuide – AI Healthcare Platform</span>
                                <span className="exp-date">Mar 2026</span>
                            </div>
                            <div className="key-features-label">Key Features:</div>
                            <ul className="exp-bullets">
                                <li>Built a full-stack healthcare platform with hospital discovery, comparison, and map-based navigation.</li>
                                <li>Designed REST APIs to manage hospital data, user queries, and geolocation-based search results.</li>
                                <li>Implemented user authentication and secure session handling with JWT.</li>
                                <li>Deployed frontend on Vercel and backend on Render with CI/CD pipeline integration.</li>
                            </ul>
                            <div className="tech-line"><strong>Tech Stack:</strong> React.js, Node.js, Express.js, MongoDB, Maps API, Tailwind CSS</div>
                            <div className="repo-line">GitHub Repository: <a href="https://github.com/kananiyashvi180-svg/mediguide" target="_blank" rel="noreferrer">Link</a> &nbsp;|&nbsp; Live Demo: <a href="https://mediguide-p7.vercel.app/" target="_blank" rel="noreferrer">Link</a></div>
                        </div>

                        {/* PROJECTS */}
                        <div className="r-sec-head">Projects</div>

                        {/* Hackathon Projects */}
                        <div className="proj-category">
                            <span>Hackathone Projects</span>
                        </div>
                        <div className="proj-name" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span>GitHub Portfolio Analyzer</span>
                            <span className="exp-date">Jan 2026</span>
                        </div>
                        <div className="proj-item">
                            <div className="key-features-label">Key Features:</div>
                            <ul className="exp-bullets">
                                <li>Built a developer analytics dashboard inspired by real-world GitHub profile tools.</li>
                                <li>Implemented repository scanning, language detection, commit tracking, stars and forks display.</li>
                                <li>Integrated dynamic charts and responsive layout for instant profile visualization.</li>
                            </ul>
                            <div className="tech-line"><strong>Tech Stack:</strong> React.js, Node.js, GitHub REST API, MongoDB, Tailwind CSS</div>
                            <div className="repo-line">Live Demo: <a href="https://github-portfolio-analyzer-pi.vercel.app/" target="_blank" rel="noreferrer">Link</a> &nbsp;|&nbsp; GitHub Repository: <a href="https://github.com/kananiyashvi180-svg/Github-Portfolio-Analyzer-Hackathon" target="_blank" rel="noreferrer">Link</a></div>
                        </div>

                        <hr className="proj-divider" />

                        {/* MERN Stack Projects */}
                        <div className="proj-category">
                            <span>MERN Stack Projects</span>
                        </div>

                        <div className="proj-name" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span>Aurexo Shopping App : <span style={{ fontWeight: "normal" }}>E-Commerce Platform</span></span>
                            <span className="exp-date">Feb 2026</span>
                        </div>
                        <div className="proj-item">
                            <div className="key-features-label">Key Features:</div>
                            <ul className="exp-bullets">
                                <li>Built a modern e-commerce app fetching real-time product data from a third-party REST API.</li>
                                <li>Product browsing, detail views, and dynamic cart with full state management.</li>
                                <li>Responsive UI using React and Tailwind CSS with optimized loading states and error handling.</li>
                            </ul>
                            <div className="tech-line"><strong>Tech Stack:</strong> React.js, Node.js, REST API, MongoDB, Tailwind CSS</div>
                            <div className="repo-line">Live Demo: <a href="https://yashvi-react-project.netlify.app/" target="_blank" rel="noreferrer">Link</a> &nbsp;|&nbsp; GitHub Repository: <a href="https://github.com/kananiyashvi180-svg/react-task" target="_blank" rel="noreferrer">Link</a></div>
                        </div>

                        <div className="proj-name" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "6px" }}>
                            <span>Pixel Perfect Website Clone : <span style={{ fontWeight: "normal" }}>Frontend Precision</span></span>
                            <span className="exp-date">Dec 2025</span>
                        </div>
                        <div className="proj-item">
                            <div className="key-features-label">Key Features:</div>
                            <ul className="exp-bullets">
                                <li>Recreated an existing website with pixel-accurate layout, typography, spacing, and colors.</li>
                                <li>Responsive UI using React and Tailwind CSS across all screen sizes with zero layout shifts.</li>
                            </ul>
                            <div className="tech-line"><strong>Tech Stack:</strong> React.js, Node.js, Express.js, MongoDB, Tailwind CSS</div>
                            <div className="repo-line">Live Link: <a href="https://kananiyashviwebsiteclone.netlify.app/pixelperfect" target="_blank" rel="noreferrer">Link</a> &nbsp;|&nbsp; GitHub Repository: <a href="https://github.com/kananiyashvi180-svg/Website-Assignments" target="_blank" rel="noreferrer">Link</a></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeDocument;
