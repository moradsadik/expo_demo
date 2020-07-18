import axios from "axios";

const PROD = 'https://event.sadiksoumia.com';
const DEV = 'http://10.34.103.13:8000';


const SERVER = DEV;

const LOGIN = SERVER+'/api/login';
const USERS = SERVER+'/api/users'
const CATEGORIES = SERVER+'/api/categories';
const ARTISTS = SERVER+'/api/artists';
const ARTISTSID = SERVER+'/api/artists/';
const SOCIALS = SERVER+'/api/socials';
const EVENTS = SERVER+'/api/events';
const EVENTSID = SERVER+'/api/events/';
const RENCONTRE = SERVER+'/api/rencontres';
const PARTNERS = SERVER+'/api/partners';
const FAQS = SERVER+'/api/faqs';
const PLACES = SERVER+'/api/places';
const AVATAR =  SERVER+'/uploads/images/artists/';
const PAVATAR = SERVER+'/uploads/images/partner/';

const http = axios.create({
    headers: {
        'Accept': 'application/json',
    }
});


export {axios, http,USERS,CATEGORIES,PAVATAR,RENCONTRE,PARTNERS, FAQS,PLACES,EVENTS,EVENTSID, LOGIN, ARTISTS, ARTISTSID, AVATAR, SOCIALS}