import React, { useEffect, useState } from 'react';

// styles
import styles from "./Nav.module.css"

// logo
import netflix from "../assets/netflix.png"
import avatar from "../assets/avatar.png"

const Nav = () => {

    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100) {
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll")
        };
    },[])

    return (
        show ?
        <div className={styles.navBlack}>
            <img
            className={styles.navLogo}
            src={netflix}
            alt="Netflix Logo"
            />
              <img
            className={styles.navAvatar}
            src={avatar}
            alt="Netflix Avatar"
            />
            
        </div>:
         <div className={styles.nav}>
         <img
         className={styles.navLogo}
         src={netflix}
         alt="Netflix Logo"
         />
           <img
         className={styles.navAvatar}
         src={avatar}
         alt="Netflix Avatar"
         />
         
     </div>
    );
};

export default Nav;