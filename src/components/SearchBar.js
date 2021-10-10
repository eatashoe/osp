import React from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import {useDarkMode, useGlobalDeskItem, useGlobalOpenFolder, useGlobalFolder} from "./GlobalStates";
import { Downgraded } from "@hookstate/core";

const SearchBar = () => {

    const darkMode = useDarkMode();
    const globalDeskItem = useGlobalDeskItem();
    const globalOpenFolder = useGlobalOpenFolder();
    const globalFolder = useGlobalFolder();

    const iconRef = React.useRef(null);
    const searchRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const textRef = React.useRef(null);
    const [searchToggle, setSearch] = React.useState(false);
    const [resultToggle, setResult] = React.useState(false);
    const [searchText, setText] = React.useState("");
    const [searchItems, setItems] = React.useState([]);



    function startSearch(){
        setSearch(true);
        searchRef.current.style.display = "inline-block";
        searchRef.current.style.transition = "transform 0.5s";
        searchRef.current.style.transform = "translate(150px)"
        containerRef.current.style.transition = "width 0.5s";
        containerRef.current.style.width = "100px";
    }

    function endSearch(e){
        if (e.relatedTarget === null || !e.relatedTarget.className.includes("result")) {
            setSearch(false);
            setResult(false);
            setItems([]);
            setText("");
            searchRef.current.style.transform = "translate(0px)"
            containerRef.current.style.width = "70px"
        }
    }

    function search(e){
        setItems([]);
        setText(e.target.value);
        globalDeskItem.attach(Downgraded).get().map(function(x, i){
            var title = globalFolder.attach(Downgraded).get()[x.props.id][0].current.innerText;
            if(searchText.length > 0 && 
                title.substring(0,searchText.length).toLowerCase() === searchText){

                setResult(true);
                setItems(t => ([...t, <MenuItem className="result" key={i} onClick={() => 
                    {   
                        globalOpenFolder.get()[x.props.id]();
                        setSearch(false);
                        setResult(false);
                        setItems([]);
                        setText("");
                        searchRef.current.style.transform = "translate(0px)"
                        containerRef.current.style.width = "70px"
                    }
                }>{title}</MenuItem>]));
            }
        });
        // console.log(textRef.current.focus);
        // textRef.current.focus();
    }

    return(
        <React.Fragment>
            <li ref={containerRef} 
                style={{width: "70px"}} 
                tabIndex={0} 
                onFocus={startSearch} 
                onBlur={endSearch} 
                className={darkMode.get() ? "nav-item darkmode" : "nav-item"}>
                <i ref={iconRef} className="fas fa-search"></i>
                {
                    searchToggle
                    ?
                    <textarea ref={textRef} onChange={search} className={darkMode.get() ? "searchBox darkmode" : "searchBox"} autoFocus></textarea>
                    :
                    null
                }
                <span ref={searchRef}>Search</span>
            </li>
            <ControlledMenu 
                            state={searchToggle ? "open" : "closed"} 
                            anchorRef={containerRef}
                            isOpen={resultToggle}
                            reposition={"auto"}
                            align={"start"}
                            
                            >
                            {
                            searchItems
                            // ?
                            // searchItems
                            // :
                            // <MenuItem className="result">*dust*</MenuItem>
                            }
            </ControlledMenu>
            {/* <div 
                className="searchMenu"
                >
                {searchItems}
            </div> */}
        </React.Fragment>

    );
}

export default SearchBar;