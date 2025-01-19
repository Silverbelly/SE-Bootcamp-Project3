import React, { useState, useEffect, useRef }  from 'react';

function Checkbox({id, isChecked, handleDone}) {

  const [localChecked, setlocalChecked] = useState(isChecked);
  const [localId] = useState(id);
  const cbRef = useRef(null);

  useEffect(() => {
    console.log('First useEffect: Component mounted');
    return () => {
      console.log('First useEffect: Component unmounted');
    };
  },[]);
  useEffect(() => {
    console.log('useEffect', `isChecked = ${isChecked} localChecked=${localChecked}`);
    if (localChecked != isChecked) {
      console.log(`    localChecked needs to be set to ${isChecked}`);
      setlocalChecked(isChecked);
    }
  });

  // console.log(`${listItemId} checked is now ${checked}`);

  useEffect( () => {
    console.log(`useEffect[localChecked]: localChecked=${localChecked} cbRef.current.checked=${cbRef.current.checked}`);
    //setlocalChecked(localChecked);
    cbRef.current.checked = localChecked;
  }, [localChecked]);

  const handleCheckChanged = () => {
    console.log(`handleCheckeked: set localChecked = ${!localChecked}`);
    //handleDone(newData.id);
    //newData.isDone = !newData.isDone;
    setlocalChecked(!localChecked);
    //if (localChecked) handleDone(localId);
    console.log(`handleCheckeked: localChecked changed to ${localChecked}`);
  };


  return (
    <>
      <input key={localId} id="is-done" type="checkbox" ref={cbRef} onChange={handleCheckChanged} />
    </>
  )
}

export default Checkbox;