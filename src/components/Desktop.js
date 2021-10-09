import React from "react";
import Clock from "./Clock";
import DeskItem from "./DeskItem";
import About from "./About";
import {Menu, MenuItem} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import {useDarkMode} from "./GlobalStates";
import Directory from "./Directory";
import wgLogo from "../media/WG.svg";
import chalk from "../media/Chalk.svg";
import beyond from "../media/Beyond.svg";
import beyond2 from "../media/Logo.svg";
import paperplane from "../media/pp1.png"
import dayRender from "../media/scene1080.png";
import nightRender from "../media/sceneNight.png";
import storyboard from "../media/StoryBoard.png";
import finalRender from "../media/final.mp4";


const Desktop = ({desktop, turnOn}) => {
    const desktopSpace = React.useRef(null);
    const deskFolder = React.useRef(null);
    const center = React.useRef(null);
    const [tabs, setTabs] = React.useState(null);
    const [folder, setFolders] = React.useState(null);
    const [about,setAbout] = React.useState(false);

    const darkMode = useDarkMode();

    function showAbout(){
        if(about){
            setAbout(false);
        }
        else{
            setAbout(true);
        }
    }

    function setDarkMode(){
        if(darkMode.get()){
            darkMode.set(false);
            localStorage.setItem("darkmode", false);
        }
        else{
            darkMode.set(true);
            localStorage.setItem("darkmode", true);
        }
    }

    React.useEffect(() => {
        setTabs(center);
        setFolders(desktopSpace);

    },[]);

    const projects = [
        <DeskItem parent={2} key={5} id={5} isFile={true} center={tabs} title={'Stackotaire'} link={"https://lab2-winstongong.netlify.app/"} x={20} y={20} desktopRef={folder}
                    info={
                        <span>
                            <span>Solitaire clone played with commands typed into a terminal.</span>
                            <br></br><br></br>
                            <span>Made with JavaScript.</span>
                            <span style={{textAlign: "center"}}>
                                &emsp;
                                <a href="https://github.com/eatashoe/solitaire-web" target="_blank" rel="noreferrer">
                                    <i className="fab fa-github-square fa-2x"></i>
                                </a>
                            </span>
                        </span>
                    }
        />,
        <DeskItem parent={2} key={6} id={6} isFile={true} center={tabs} title={'Piano Sim'} link={"https://lab-winstongong.netlify.app/"} x={100} y={20} desktopRef={folder}
                    info={
                    <span>
                        <span>Virtual Piano that you can play with mouse or keyboard. Record, Playback, and Download.</span>
                        <br></br><br></br>
                        <span>Click the + to learn a song.</span>
                        <span style={{textAlign: "center"}}>
                            &emsp;&emsp;
                            <a href="https://github.com/eatashoe/Piano_Sim" target="_blank" rel="noreferrer">
                                <i className="fab fa-github-square fa-2x"></i>
                            </a>
                        </span>
                    </span>
                    }
        />,
        <DeskItem parent={2} key={7} id={7} isFile={true} center={tabs} title={'OSP'} link={"https://lab3-winstongong.netlify.app/"} x={180} y={20} desktopRef={folder}
                    info={
                    <span>
                        <span>OS Themed Portfolio you are currently looking at.</span>
                        <br></br><br></br>
                        <span>Open for Portfolioception.</span>
                        <br></br><br></br>
                        <span style={{textAlign: "center"}}>
                            &emsp;&emsp;&emsp;&emsp;
                            <a href="https://github.com/eatashoe/osp" target="_blank" rel="noreferrer">
                                <i className="fab fa-github-square fa-2x"></i>
                            </a>
                        </span>
                    </span>
                    }
        />]
    
    const graphics = [ 
        <DeskItem parent={3} key={8} id={8} isFile={true} center={tabs} title={'My Initials Logo'} img={wgLogo} x={20} y={20} desktopRef={folder} size={{width : "200px", height: "180px"}}
        />,
        <DeskItem parent={3} key={9} id={9} isFile={true} center={tabs} title={'Chalk Logo'} img={chalk} x={100} y={20} desktopRef={folder} size={{width : "200px", height: "225px"}}
        />,
        <DeskItem parent={3} key={10} id={10} isFile={true} center={tabs} title={'Beyond Logo'} img={beyond} x={180} y={20} desktopRef={folder} size={{width : "450px", height: "180px"}}
        />,
        <DeskItem parent={3} key={11} id={11} isFile={true} center={tabs} title={'Beyond Logo/Icon'} img={beyond2} x={260} y={20} desktopRef={folder} size={{width : "320px", height: "410px"}}
        />
    ];

    const blender = [
        <DeskItem parent={4} key={12} id={12} isFile={true} center={tabs} title={'Story Board'} img={storyboard} x={20} y={20} desktopRef={folder} size={{width : "450px", height: "380px"}}
        />,
        <DeskItem parent={4} key={13} id={13} isFile={true} center={tabs} title={'Paper Plane Render'} img={paperplane} x={100} y={20} desktopRef={folder} size={{width : "450px", height: "325px"}}
        />,
        <DeskItem parent={4} key={14} id={14} isFile={true} center={tabs} title={'Night Render'} img={nightRender} x={180} y={20} desktopRef={folder} size={{width : "370px", height: "270px"}}
        />,
        <DeskItem parent={4} key={15} id={15} isFile={true} center={tabs} title={'HighRes Render'} img={dayRender} x={260} y={20} desktopRef={folder} size={{width : "450px", height: "280px"}}
        />,
        <DeskItem parent={4} key={16} id={16} isFile={true} center={tabs} title={'Final Video Render'} vid={finalRender} x={340} y={20} desktopRef={folder} size={{width : "400px", height: "320px"}}
        />
    ];

    const deskStuff = [
        <DeskItem parent={0} key={1} id={1} isFile={true} center={tabs} title={'Me'} link="https://winstongong.netlify.app/" x={20} y={20} desktopRef={folder}
                    info={
                    <span>
                        <br></br><br></br>
                        <span>Open to learn more about Winston</span>
                        <span></span>
                        <br></br><br></br>
                        <span style={{textAlign: "center"}}>
                            &emsp;&emsp;&emsp;&emsp;
                            <a href="https://github.com/eatashoe/Personal-Portfolio" target="_blank" rel="noreferrer">
                                <i className="fab fa-github-square fa-2x"></i>
                            </a>
                        </span>
                    </span>}
        />,
        <DeskItem parent={0} key={2} id={2} isFolder={true} center={tabs} title={'Projects'} x={100} y={20} desktopRef={folder} children={projects} size={{width : "450px", height: "200px"}}
                    info={
                        <span>
                            <br></br><br></br><br></br>
                            <span>Winston's coding projects.</span>
                        </span>
                    }
        ></DeskItem>,
        <DeskItem parent={0} key={3} id={3} isFolder={true} center={tabs} title={'Graphic Designs'} x={180} y={20} desktopRef={folder} children={graphics} size={{width : "450px", height: "200px"}}
                    info={
                        <span>
                            <br></br><br></br><br></br>
                            <span>Some logos that I made.</span>
                        </span>
                    }
        ></DeskItem>,
        <DeskItem parent={0} key={4} id={4} isFolder={true} center={tabs} title={'Blender'} x={260} y={20} desktopRef={folder} children={blender} size={{width : "450px", height: "200px"}}
                    info={
                        <span>
                            <br></br><br></br>
                            <span>Blender 3d Modeling Projects that I did.</span>
                        </span>
                    }
        ></DeskItem>
    ]

    return(
        <div ref={desktop} className="desktop">
            <About info={
                <span> 
                    <span>This is a OS themed portfolio by Winston Gong.</span>
                    <br></br><br></br>
                    <span>Created to learn more about React.</span>
                    <br></br><br></br>
                    <span style={{textAlign: "center"}}>
                        &emsp;&emsp;
                        <a href="https://github.com/eatashoe/osp" target="_blank" rel="noreferrer">
                            <i className="fab fa-github-square fa-2x"></i>
                        </a>
                        &emsp;
                        <i className="fas fa-heart fa-2x"></i>
                    </span>
                </span>
            } 
            about={about} 
            showAbout={showAbout}
            desktopRef={folder}></About>
            <nav className={darkMode.get() ? "nav darkmode" : "nav"}>
                <div className="left">
                    <Menu 
                        menuButton={<div className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                                        <i className="fas fa-lemon"></i>
                                    </div>} 
                        styles={{open: true}}>
                        <MenuItem className="menu-item" key={1} onClick={() => {setAbout(true)}}>About</MenuItem>
                        <MenuItem className="menu-item" key={2} onClick={turnOn} >Shutdown</MenuItem>
                        {/* <SubMenu itemClassName="submenu-item" label="Test">
                            <MenuItem onClick={() => {console.log("yep",globalOpenFolder.get()[1](),globalOpenFolder.attach(Downgraded).get())}} className="menu-item">index.html</MenuItem>
                            <MenuItem onClick={() => {console.log(globalFolder.get())}} className="menu-item">example.js</MenuItem>
                            <SubMenu itemClassName="submenu-item" label="Styles">
                                <MenuItem onClick={() => {console.log(globalDeleted.attach(Downgraded).get())}} className="menu-item">about.css</MenuItem>
                                <MenuItem className="menu-item">home.css</MenuItem>
                                <MenuItem className="menu-item">index.css</MenuItem>
                            </SubMenu>
                        </SubMenu> */}
                    </Menu>
                    <Directory></Directory>
                    <div className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                        View
                    </div>
                </div>
                <div className="right">
                    <li className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                        <i className="fas fa-search"></i><span>Search</span>
                    </li>
                    <li className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                        <Clock />
                    </li>
                    <li onClick={setDarkMode} 
                        className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                        <i className={darkMode.get() ? "fas fa-moon" : "fas fa-sun"}></i>
                    </li>
                </div>
            </nav>
            <div ref={tabs} className="center"></div>
            <DeskItem 
                    id={0}
                    key={0}
                    center={tabs} 
                    desktopSpace={desktopSpace} 
                    desktopRef={folder} 
                    children={deskStuff} 
                    isDesk={true} 
                    nodeRef={deskFolder}>
            </DeskItem> 
            {/* <div ref={directoryRef}></div> */}
        </div>
    );
}

export default Desktop;