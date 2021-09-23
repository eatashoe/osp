import React from "react";

function Clock() {
    const [date, setDate] = React.useState(new Date());

   React.useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
  
    return function cleanup() {
        clearInterval(timerID);
      };
   });
  
     function tick() {
      setDate(new Date());
     }
  
     return (date.toLocaleTimeString());
  }


export default Clock;