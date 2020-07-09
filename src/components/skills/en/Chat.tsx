// tslint:disable: max-line-length
import axios from 'axios';
import React from 'react';
import uuidv4 from 'uuid/v4';
import skillWrapper, { ChatSkillProps } from '../ChatSkill';
import { Res } from '../../../lib/api';

const apiUrl = 'http://10.11.1.41:4242/'
// const apiUrl = 'https://7019.lnsigo.mipt.ru/';
const uid: string = uuidv4();

async function chatApi(text: string): Promise<Res> {
  const req = {
    user_id: uid,
    payload: text,
  };
  return await axios.post(apiUrl, req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

async function dialogRating(dialog_id: string, rating: number): Promise<Res> {
  const req = {
    user_id: uid,
    rating,
    dialog_id
  }
  return await axios.post(apiUrl + "rating/dialog", req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

async function utteranceRating(utt_id: string, rating: number): Promise<Res> {
  const req = {
    user_id: uid,
    rating,
    utt_id
  }
  return await axios.post(apiUrl + "rating/utterance", req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

const config: ChatSkillProps<Res> = {
  title: 'Experimental Socialbot',
  desc: <div style={{ marginTop: '1em' }}>Assistant Platform Demo. It  shows how to blend goal-oriented and open domain skills inside a single AI assistant. It's under development and will learn new things over the time.</div>,
  messageApi: chatApi,
  resetApi: async () => await chatApi('/start'),
  dialogRating,
  utteranceRating
};

const Chat = skillWrapper('chaten');
export default function () {
  return <Chat {...config}/>;
}
