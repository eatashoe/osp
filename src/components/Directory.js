import React from "react";
import {Menu, MenuItem, SubMenu} from "@szhsin/react-menu";
import {useGlobalDirectory, useGlobalDeskItem, useGlobalFolder, useDarkMode, useGlobalOpenFolder, useGlobalDelete}from "./GlobalStates";
import { Downgraded } from "@hookstate/core";

const Directory = () =>{
    
    const globalDirectory = useGlobalDirectory();
    const globalDeskItem = useGlobalDeskItem();
    const globalFolder = useGlobalFolder();
    const globalOpenFolder = useGlobalOpenFolder();
    const globalDeleted = useGlobalDelete();
    const darkMode = useDarkMode();

    const [current, setCurrent] = React.useState([]);

    function updateDirectory(dir){
        var newDir = [];
        for(let i = dir.length-1; i >= 0; i--){
            if(!globalDeleted.get()[i+1]){
                if(dir[i].props.isFile){
                    globalDirectory.set(d => ({...d, [i+1]:
                        <MenuItem key={i} className="menu-item" onClick={() => (globalOpenFolder.get()[i+1]())}>{
                            globalFolder.get()[i+1][0].current 
                            ? 
                            globalFolder.get()[i+1][0].current.innerText 
                            : 
                            dir[i].props.title}</MenuItem>
                    }));
                }
                else{
                    if(!dir[i].props.children &&
                        !globalFolder.get()[i+1][1].current
                        ){
                        globalDirectory.set(d => ({...d, [i+1]:
                            <MenuItem key={i} className="menu-item" 
                                onClick={() => (globalOpenFolder.get()[i+1]())}
                                children={[]}>
                                {
                                globalFolder.get()[i+1][0].current.innerText === ""
                                ? 
                                "New Folder"
                                : 
                                globalFolder.get()[i+1][0].current.innerText 
                                }
                                </MenuItem>
                        }));
                    }
                    else{
                        var kids = [];
                        var children = globalFolder.get()[i+1][1].current.children[1].children;

                        // dir[i].props.children.forEach(element => {

                            // globalFolder.get()[i+1][1].children[1].children
                            // dir[i].props.children
                            
                        //     kids.push(globalOpenFolder.attach(Downgraded).get()[element.id]);
                        // });
                        for(var j = 1; j < children.length; j++){
                            kids.push(globalDirectory.attach(Downgraded).get()[parseInt(children[j].id)]);
                        }

                        globalDirectory.set(d => ({...d, [i+1]:
                            <SubMenu key={i} itemClassName="submenu-item" 
                            label={
                                globalFolder.get()[i+1][0].current 
                                ? 
                                globalFolder.get()[i+1][0].current.innerText 
                                : 
                                dir[i].props.title
                                } 
                                onClick={() => (globalOpenFolder.get()[i+1]())}
                                children={kids}>
                            </SubMenu>
                        }))
                    }
                }
                if(dir[i].props.parent === 0){
                    newDir.push(globalDirectory.attach(Downgraded).get()[i+1]);
                }
            }
        }
        return newDir.reverse();
        
    }

    React.useEffect(() =>{
        globalDirectory.set(d => ({...d, ["update"]: () => setCurrent(updateDirectory(globalDeskItem.attach(Downgraded).get()))}));
    }, [])
    React.useEffect(() =>{

        if(Object.keys(globalFolder.attach(Downgraded).get()).length-1 === globalDeskItem.get().length){
            // console.log('yo its me bog',globalFolder.get());
            setCurrent(updateDirectory(globalDeskItem.attach(Downgraded).get()));
        }
        // setCurrent(updateDirectory(globalDeskItem.attach(Downgraded).get()))

    },[globalFolder.attach(Downgraded).get()]);

    return(
        <Menu
        menuButton={<div className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>File</div>} 
        styles={{open: true}}>
            {current}
        </Menu> 
        );
}

export default Directory;