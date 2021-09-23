import React from "react";
import Clock from "./Clock";
import DeskItem from "./DeskItem";
import {Menu, MenuItem, SubMenu} from "@szhsin/react-menu";
import {useGlobalDeskItem} from "./GlobalStates"

const Desktop = ({desktop, turnOn}) => {
    const desktopSpace = React.useRef(null);
    const deskFolder = React.useRef(null);
    const center = React.useRef(null);
    const [tabs, setTabs] = React.useState(null);
    const [folder, setFolders] = React.useState(null);

    const globalDeskItem = useGlobalDeskItem();

    React.useEffect(() => {
        setTabs(center);
        setFolders(desktopSpace);

        globalDeskItem.set(deskItem => ([...deskItem, ...deskStuff]));
        globalDeskItem.set(deskItem => ([...deskItem, ...folder1Stuff]));
    },[]);
    
    const sub = [
        {id:1, value: 'hw.txt'},
        {id:2, value: 'text.txt'}
    ]
    const file = [
        {id:1, value: 'random.mp4'},
        {id:2, value: 'dog.png'},
        {id:3, value: 'pepe.jpeg'},
        {id:4, value: <SubMenu 
                        label='folder' 
                        keepMounted={false}
                        offsetY={65} 
                        offsetX={23}>
                        {sub.map(c => <MenuItem className='menu-item' key={c.id}>{c.value}</MenuItem>)}
                        </SubMenu>},
        {id:5, value: <SubMenu 
                        label='folder' 
                        keepMounted={false}
                        offsetY={89} 
                        offsetX={23}>
                        {sub.map(c => <MenuItem className='menu-item' key={c.id}>{c.value}</MenuItem>)}
                        </SubMenu>}
    ]

    const folder1Stuff = [<DeskItem id={4}  isFolder={true} center={tabs} desktopRef={folder} title={'Folder1'} x={20} y={20} children={[]}/>,
    <DeskItem id={5} isFolder={true} center={tabs} desktopRef={folder} title={'Folder2'} x={100} y={20} children={[]}/>]

    const deskStuff = [
    <DeskItem id={1} isFolder={true} center={tabs} title={'Folder'} x={20} y={20} children={folder1Stuff} desktopRef={folder}/>,
    <DeskItem id={2} isFolder={true} center={tabs} title={'hOmEWoRkforfuntodayyouknow'} x={100} y={20} desktopRef={folder}/>,
    <DeskItem id={3} isFile={true} center={tabs} title={'website for me by me yo'} x={180} y={20} desktopRef={folder}/> 
    ]

    return(
        <div ref={desktop} className="desktop">
            <nav className="nav">
                <div className="left">
                    <Menu 
                        menuButton={<div className="nav-item">
                                        <i className="fas fa-lemon"></i>
                                    </div>} 
                        align='end' 
                        offsetX={97} 
                        keepMounted={false} 
                        styles={{open: true}}>
                        <MenuItem key={1} className='menu-item'>About</MenuItem>
                        <MenuItem key={2} onClick={turnOn}className='menu-item'>Shutdown</MenuItem>
                    </Menu>
                    <Menu 
                        menuButton={<div className="nav-item">File</div>} 
                        list={file} 
                        offsetX={154}
                        align='end' 
                        keepMounted={false} 
                        styles={{open: true}}>
                        {file.map(c => <MenuItem className='menu-item' key={c.id}>{c.value}</MenuItem>)}
                    </Menu>
                    <div className="nav-item">
                        View
                    </div>
                </div>
                <div className="right">
                    <li className="nav-item">
                        <i className="fas fa-search"></i><span>Search</span>
                    </li>
                    <li className="nav-item">
                        <Clock />
                    </li>
                    <li className="nav-item">
                        <i className="fas fa-sun"></i>
                    </li>
                </div>
            </nav>
            <div ref={tabs} className="center"></div>
            <DeskItem 
                    center={tabs} 
                    desktopSpace={desktopSpace} 
                    desktopRef={folder} 
                    children={deskStuff} 
                    isDesk={true} 
                    nodeRef={deskFolder}>
            </DeskItem> 
        </div>
    );
}

export default Desktop;