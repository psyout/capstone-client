import React from 'react';

const styles = {
	body: {
		fontFamily: "'Avenir', sans-serif",
		margin: 0,
		padding: 0,
		display: 'grid',
		gridTemplateRows: 'auto 1fr auto',
		minHeight: '100vh',
		backgroundColor: '#f9f9f9',
		color: '#333',
	},
	header: {
		color: 'white',
		padding: '2rem',
		textAlign: 'center',
	},
	main: {
		padding: '2rem 3rem',
		lineHeight: 1.6,
		maxWidth: 800,
		margin: '0 auto',
	},
	footer: {
		backgroundColor: '#333',
		color: '#fff',
		padding: '1rem',
		textAlign: 'center',
	},
	h1: {
		margin: 0,
		fontSize: '2.2rem',
		color: '#333',
		fontWeight: 'bold',
	},
};

const CoverLetter = () => (
	<div style={styles.body}>
		<header style={styles.header}>
			<h1 style={styles.h1}>Cover Letter</h1>
		</header>
		<main style={styles.main}>
			<p>Dear Hiring Manager,</p>
			<br />
			<p>
				I’m excited to apply for the <span style={{ color: '#333', fontWeight: 'bold' }}>Junior Software Engineer</span> position at{' '}
				<span style={{ color: '#333', fontWeight: 'bold' }}>WOW 1 DAY PAINTING</span>. With over four years of experience building responsive, user-focused web applications using HTML,
				CSS, JavaScript and React, I have a strong foundation in front-end development and full-stack project work.
			</p>
			<br />
			<p>
				As the founder and developer of <span style={{ color: '#333', fontWeight: 'bold' }}>VanSippy</span>, a Full-Stack web app built with the MERN stack, I designed and implemented
				dynamic API calls, managed MongoDB databases, and deployed the application through web hosting. This experience has strengthened my understanding of application architecture,
				feature development and collaborating with design-focused workflows.
			</p>
			<br />
			<p>
				What excites me even more about this role is that WOW 1 DAY PAINTING is part of the same group as <span style={{ color: '#333', fontWeight: 'bold' }}>1-800-GOT-JUNK</span>, whose
				apps I’ve used extensively in my daily work. This gives me a unique perspective on the user experience, workflows, and opportunities for improvement, allowing me to contribute not
				only as a developer but also with practical insights that can enhance the application’s functionality and usability.
			</p>
			<br />
			<p>
				I’m particularly drawn to this role because of the opportunity to contribute to a greenfield Next.js application. I have experience with React and JavaScript and am eager to expand
				my skills in TypeScript, Next.js, and cloud-based development. I thrive in fast-paced, collaborative environments, enjoy learning from experienced team members and I'm committed to
				writing clean, maintainable code that aligns with best practices.
			</p>
			<br />
			<p>I would love the chance to bring my experience, curiosity, and unique user perspective to WOW 1 DAY PAINTING and help build high-quality software from the ground up.</p>
			<br />
			<p>Thank you for considering my application. I look forward to the opportunity to discuss how I can support your team.</p>
			<br />
			<p>
				Sincerely,
				<br />
				Felipe Gonzalez
			</p>
			<br />
		</main>
		<footer style={styles.footer}>&copy; 2025 Felipe Gonzalez | Full Stack Developer</footer>
	</div>
);

export default CoverLetter;
