//export const API_ROOT = 'http://localhost:8080/register';
export const API_ROOT = 'https://around-75015.appspot.com/api/v1';
//export const API_ROOT = 'https://legacy-dot-around-75015.appspot.com/api/v1';
export const TOKEN_KEY = 'TOKEN_KEY';

export const GEO_OPTIONS = {
    enableHighAccuracy: true,
    maximumAge        : 3600000,  // time required to reload the geo location
    timeout           : 27000 // time allowed to load before failure
};

export const POS_KEY = 'POS_KEY';
export const AUTH_PREFIX = 'Bearer';
export const LOC_SHAKE = 0.02;