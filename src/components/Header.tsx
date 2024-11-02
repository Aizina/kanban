import { useState } from "react";
import style from '../styles/Header.module.scss';

export const Header = () => {
    const [showProfile, setShowProfile] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className={style.headerWrap}>
            <h1>Awesome Kanban Board</h1>
            <div className={style.userWrap}>
                <img src="/user-avatar.png" className={style.userAvatar} alt="User Avatar" />
                <button onClick={toggleProfileMenu} className={style.arrowDownButton}>
                    <img 
                        src="/arrow-down.png" 
                        className={`${style.arrowDown} ${showProfile ? style.rotated : style.default}`} 
                        alt="Arrow Down" 
                    />
                </button>
                {showProfile && (
                    <div className={style.profileWrap}>
                        <button> Profile </button>
                        <button> Log Out </button>
                    </div>
                )}
            </div>
        </div>
    );
};
