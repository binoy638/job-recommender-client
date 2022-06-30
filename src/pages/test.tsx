import { Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import GeneralAPI from '@/API/generalAPI';
import AdminPanelLayout from '@/layouts/AdminLayout';

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

const Test = () => {
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
  }, [selectedCountryID]);

  useEffect(() => {
    fetchCities(Number(selectedStateID)).then((data) => {
      const cit = data.cities.map((state) => ({
        value: state.name.toString(),
        label: state.name,
      }));
      setCities(cit);
    });
  }, [selectedStateID]);

  return (
    <AdminPanelLayout>
      <div>
        <Select
          label="Country"
          placeholder="Select Country"
          value={selectedCountryID}
          onChange={(value) => setSelectedCountryID(value)}
          searchable
          data={countries}
        />
        <Select
          label="State"
          value={selectedStateID}
          onChange={(value) => setSelectedStateID(value)}
          placeholder="Select State"
          searchable
          data={states}
        />
        <Select
          label="City"
          value={selectedCityID}
          onChange={(value) => setSelectedCityID(value)}
          placeholder="Select City"
          searchable
          data={cities}
        />
      </div>
    </AdminPanelLayout>
  );
};

export default Test;
