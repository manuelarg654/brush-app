import React from 'react';
import { settingsLinks } from '../utils/constants';
import { Link } from 'react-router-dom';

export const ConfigScreen = () => {
  return(

    <div className='settings-menu-container animate__animated animate__fadeIn'>
      <ul className='settings-links'>
      {
        settingsLinks.map((link)=>{
          const {id, text, url} = link;
          return(
            <Link to={url}>
              <li key={id} className='setting-link'>
                {
                  text
                }
              </li>
            </Link>
          )
        })
      }
      </ul>
    </div>

    )
};
