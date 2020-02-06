import React, {useState} from 'react';
import Editor from './layers/editor';
import BackgroundManager from './layers/background';

export default function App({mailer, setMailer}) {
  return <>
    {mailer != null && <BackgroundManager mailer={mailer} setMailer={setMailer}/>}
  </>;
}