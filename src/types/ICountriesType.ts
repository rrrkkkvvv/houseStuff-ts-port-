export interface ICountry {
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
}

export interface ICountriesProps {
    countries: ICountry[];
    loading: boolean;
}