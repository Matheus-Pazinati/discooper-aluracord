import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {

  const [message, setMessage] = React.useState('')
  const [messageList, setMessageList] = React.useState([])

  function handleNewMessage(newMessage) {
    const message = {
      id: messageList.length + 1,
      from: 'Matheus-Pazinati',
      messageContent: newMessage,
    }
    setMessageList([
      message,
      ...messageList
    ])
    setMessage('')
  }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url(https://www.enjpg.com/img/2020/outer-space-background-8.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    height: '100%',
                    maxWidth: '87.5%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Criação de props, pois o componente MessageList não tem acesso ao escopo da variável messageList */}
                    <MessageList messages={messageList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            value={message}
                            onChange={(event) => {
                              const messageText = event.target.value
                              setMessage(messageText)
                            }}
                            onKeyPress={(event) => {
                              if (event.key === 'Enter'){ //Quando o usuário clicar a tecla Enter
                                if (message.length == 0){//Se o input não possuir nenhum caractere
                                  event.preventDefault()//Previna o comportamento padrão de pular linha
                                  return //Não execute o restante do código
                                }
                                event.preventDefault()
                                handleNewMessage(message)
                              }                             
                            }}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {//Para cada mensagem em mensageList...
              return (
                <Text
                  tag="li"
                  key={message.id}
                  styleSheet={{
                      borderRadius: '5px',
                      padding: '6px',
                      marginBottom: '12px',
                      hover: {
                          backgroundColor: appConfig.theme.colors.neutrals[700],
                      }
                  }}
                >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${message.from}.png`}
                    />
                    <Text tag="strong">
                      {message.from}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {message.messageContent}
                </Text>
              )
            })}
        </Box>
    )
}