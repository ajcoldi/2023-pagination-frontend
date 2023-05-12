import Image from 'next/image'
import styles from './page.module.css'
import Form from './components/form'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 
export default function Home() {
  return (
      <>
      <div className={styles.banner}>
        <h1>Pagination Demo</h1>
        <p>
        The pagination demo is a web application that allows users to navigate through a large amount of data using pagination, filter the data using tags, and search for specific items using a search bar. The application provides an intuitive interface that enables users to quickly and easily find the information they need.
        </p>
      </div>
        <main className={styles.main}>
        
          <Form/>
        </main>
      </>
    
  )
}
