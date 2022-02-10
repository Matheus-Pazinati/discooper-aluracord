import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendMessage(props) {

  return (
    <Button
      label='Enviar'
      styleSheet={{
        borderRadius: '8px',
        padding: '10px',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '8px',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['900'],
        color: appConfig.theme.colors.neutrals['050'],
      }}
      onClick={() => {
        props.onSendMessage()
      }}
    />
  )
}