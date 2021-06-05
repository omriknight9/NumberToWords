import './DarkMode.css';


const DarkMode = () => {

    const handleDarkMode = () => {
        let htmlDoc = document.body;
        let darkToggle = document.getElementById('darkToggle');
        htmlDoc.classList.toggle('darkMode');
        darkToggle.classList.toggle('dark');
    }

    return (
        <div id="darkToggle" onClick={handleDarkMode}>
        <div className="modeSwitch">
            <svg  fill="none" stroke="#fbb046" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sun feather feather-sun" viewBox="0 0 24 24">
                <defs/>
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg  fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="moon feather feather-moon" viewBox="0 0 24 24">
                <defs/>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
        </div>
    </div>
    )
}

export default DarkMode;