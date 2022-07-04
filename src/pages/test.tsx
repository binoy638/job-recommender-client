import React, { useEffect, useState } from 'react';

import AddressSelector from '@/components/UI/AddressSelector';

const Test = () => {
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <div>
      <AddressSelector address={address} setAddress={setAddress} />
    </div>
  );
};

export default Test;
