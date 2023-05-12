import { useEffect, useState } from "react";
import styles from '../../styles/pagination_control.module.css'
interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    tags: string[];
  }
  
  interface PageControlProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  }

export default function PageControl({currentPage, setCurrentPage,totalPages, setTotalPages} : PageControlProps){
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);

    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

      const handleStart = () => {
        if(currentPage > 1) {
            setCurrentPage(1)
        }
      }
      const handleEnd = () => {
        if(currentPage < totalPages) {
            setCurrentPage(totalPages)
        }
      }

      return (
        <div className={styles.container}>
          
            <button disabled={currentPage === 1} onClick={handleStart}>To Start</button>
            <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
            <button disabled={currentPage === totalPages} onClick={handleEnd}>To End</button>

        </div>
      );
      
}

