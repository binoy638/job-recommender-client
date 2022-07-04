import { Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';

const fetchCountires = async () => {
  const { data } = await GeneralAPI.getCountries();
  return data;
};

const fetchStates = async (countryID: number) => {
  const { data } = await GeneralAPI.getStates(countryID);
  return data;
};

const fetchCities = async (stateID: number) => {
  const { data } = await GeneralAPI.getCities(stateID);
  return data;
};

interface AddressSelectorProps {
  address: {
    country: string;
    state: string;
    city: string;
  };
  setAddress: React.Dispatch<
    React.SetStateAction<{
      country: string;
      state: string;
      city: string;
    }>
  >;
}

const AddressSelector = ({ address, setAddress }: AddressSelectorProps) => {
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);

  const [selectedCountryID, setSelectedCountryID] = useState<string | null>(
    null
  );

  const [states, setStates] = useState<{ value: string; label: string }[]>([]);

  const [selectedStateID, setSelectedStateID] = useState<string | null>(null);

  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const [selectedCityID, setSelectedCityID] = useState<string | null>(null);

  useEffect(() => {
    fetchCountires().then((data) => {
      const ct = data.countries.map((country) => ({
        value: country.id.toString(),
        label: country.name,
      }));
      setCountries(ct);
    });
  }, []);

  useEffect(() => {
    fetchStates(Number(selectedCountryID)).then((data) => {
      const st = data.states.map((state) => ({
        value: state.id.toString(),
        label: state.name,
      }));
      setStates(st);
    });

    const selectedCountry = countries.find(
      (country) => country.value === selectedCountryID
    );
    if (selectedCountry) {
      setAddress({
        ...address,
        country: selectedCountry.label,
      });
    }
  }, [selectedCountryID]);

  useEffect(() => {
    fetchCities(Number(selectedStateID)).then((data) => {
      const cit = data.cities.map((state) => ({
        value: state.name.toString(),
        label: state.name,
      }));
      setCities(cit);
    });
    const selectedState = states.find(
      (state) => state.value === selectedStateID
    );
    if (selectedState) {
      setAddress({
        ...address,
        state: selectedState.label,
      });
    }
  }, [selectedStateID]);

  useEffect(() => {
    const selectedCity = cities.find((city) => city.value === selectedCityID);
    if (selectedCity) {
      setAddress({
        ...address,
        city: selectedCity.label,
      });
    }
  }, [selectedCityID]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Select
        label="Country"
        value={selectedCountryID}
        onChange={(value) => setSelectedCountryID(value)}
        searchable
        required
        data={countries}
      />
      <div className="flex w-full gap-2">
        <Select
          label="State"
          value={selectedStateID}
          onChange={(value) => setSelectedStateID(value)}
          searchable
          style={{ width: '100%' }}
          required
          data={states}
        />
        <Select
          label="City"
          value={selectedCityID}
          onChange={(value) => setSelectedCityID(value)}
          searchable
          style={{ width: '100%' }}
          required
          data={cities}
        />
      </div>
    </div>
  );
};

export default AddressSelector;
