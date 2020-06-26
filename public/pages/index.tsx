import Head from 'next/head'

import styles from 'styles/index.module.scss'

const Home = () => (
	<>
		<Head>
			<title>CPM</title>
		</Head>
		<div className={styles.root}>
			<h1>Welcome to CPM</h1>
		</div>
	</>
)

export default Home
