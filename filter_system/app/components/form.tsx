"use client"; 

import { use, useEffect, useState } from 'react';
import Tags from './tag';
import PageControl from './pagination_control';
import styles from '../../styles/form.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faSliders,
    faTags
  } from "@fortawesome/free-solid-svg-icons";
  



export default function Home() {
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagMode, setTagMode] = useState('all');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [users, setUsers] = useState([]);
    const [api, setApi] = useState('http://localhost:3000/api/users&limit=8')

    const [currentPage, setCurrentPage] = useState<any>();
    const [totalPages, setTotalPages] = useState<any>();
    const [totalItems, setTotalItems] = useState<any>();
  
    const limit = 8;
    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/users?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}&tagMode=${tagMode}&tags=${selectedTags}&search=${search}`;
        setApi(apiUrl)
        console.log(" Checking selected tags : ", selectedTags)
    }, [search, selectedTags, tagMode, sortBy, sortOrder, currentPage]);

    useEffect(() => {
        getTags()
        getUsers(api)
        console.log(api)
    },[api])
  
    useEffect(() => {
        console.log("Current Page: ", currentPage)
        console.log("Total Pages: ", totalPages)
        console.log("Total Items: ", totalItems)
    }, [currentPage])
    
 
  
    const getTags = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/tags');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTags(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
      
    };
    
    const getUsers = async (apiUrl:string) => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data.results);
            setCurrentPage(data.current_page);
            setTotalPages(data.total_pages);
            setTotalItems(data.total_items);
            console.log("Raw user data: " , data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
      
    };
    
    const [showTags, setShowTags] = useState(false);

    const toggleTags = () => {
        setShowTags((prevState) => {
          setSearchbar(false);
          setShowSorting(false);
          return !prevState;
        });
      };
      
    const [showSearchbar, setSearchbar] = useState(false);


    const toggleSearchbar = () => {
        setSearchbar((prevState) => {
          setShowTags(false);
          setShowSorting(false);
          return !prevState;
        });
      };
      
    const [showSorting, setShowSorting] = useState(false)
    const toggleSorting = () => {
        setShowSorting((prevState) => {
          setShowTags(false);
          setSearchbar(false);
          return !prevState;
        });
      };

      
    return (
        <>
            

            <div className={styles.tableContainer}>
            <form className={styles.form} >
        
                <div className={styles.optionsContainer}>


                        <input 
                            className={`${styles.searchbar} ${showSearchbar ? styles.slideIn : styles.slideOut}`} 
                            placeholder="search" 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />                            
                                                
                        <FontAwesomeIcon
                            onClick={toggleSearchbar}
                                icon={faSearch}
                                style={{ fontSize: 16, color: "#1a1a1a" 
                            }}
                        />
                        <div className={`${styles.sortingBtns} ${showSorting ? styles.slideIn : styles.slideOut}`}>
                                <label>
                                    Sort By:
                                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                        <option value="id">ID</option>
                                        <option value="name">Name</option>
                                        <option value="age">Age</option>
                                        <option value="email">Email</option>
                                    </select>
                                </label>
                                <label >
                                    Sort Order:
                                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </label>
                        </div>
                     
                        <FontAwesomeIcon
                            onClick={toggleSorting}
                            icon={faSliders}
                            style={{ fontSize: 16, color: "#1a1a1a" 
                            }}
                        />
                        
                        <FontAwesomeIcon
                            onClick={toggleTags}
                            icon={faTags}
                            style={{ fontSize: 16, color: "#1a1a1a" 
                            }}
                        />
                        </div>
                        <div className={styles.tagToggle}>
                        
                        {showTags && (
                            <div className={styles.tagContainer}>
                            <Tags
                                tags={tags}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                            />
                            <label>
                                Tag Mode:
                                <select
                                value={tagMode}
                                onChange={(e) => setTagMode(e.target.value)}
                                >
                                <option value="all">All</option>
                                <option value="any">Any</option>
                                </select>
                            </label>
                            </div>
                        )}
                    </div>
                
            </form>
                <table className={styles.table}>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.tags.map((tag: string) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <PageControl currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages}/>
                      
            </div>
        </>
  );
}
