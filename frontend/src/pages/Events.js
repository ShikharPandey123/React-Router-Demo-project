import { Suspense } from 'react';
import {Await, useLoaderData,json,defer} from 'react-router-dom';
import EventsList from "../components/EventsList";

export default function Events() {
  const {events} = useLoaderData();
  return(
  <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
  <Await resolve={events}>
    {(loadedEvents)=><EventsList events={loadedEvents}/>}
  </Await>
  </Suspense>
  );
}

async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
   //
  }
  else{
    const resData=await response.json();
    return resData.events;
  }
}
export  function loader() {
   return defer({
    events: loadEvents()
   })
}