import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/button-sticker'

const SUPABASE_URL = "https://zhjadqkmnfkoqwyyculo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ1NDg1NiwiZXhwIjoxOTU5MDMwODU2fQ.3qbEm0mjkJo9gl7gqfOgq_YmjwQv03RBnFhgA3vh5RI";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); //Função da biblioteca que busca, através da chave e url da minha conta, todos os bancos de dados e outras informações que tenho

function getMensagensDataBase() {//Função para pegar os dados do Banco que está no Supabase
  return supabaseClient.from('mensagens')//Pegue somente os dados do banco chamado mensagens
}

function listenMessagesOnRealTime(addMessage) {//Recebe uma função como parâmetro
  return supabaseClient
    .from('mensagens') //No banco de dados "mensagens"...
    .on('INSERT', (respostaLive) => { //Quando alguma informação for inserida no banco...Retorne essa informação
      addMessage(respostaLive.new) //Executa a função, passando o novo valor inserido
    })
    .subscribe();
}

export default function ChatPage() {

  const [message, setMessage] = React.useState('')
  const [messageList, setMessageList] = React.useState([])
  const [loading, setLoading] = React.useState(true) //Inicia variável loading como true
  const router = useRouter()

  const userLogged = router.query.username; //Pegando o nome do usuário logado através da url

  React.useEffect(() => {// Hook do React, que por padrão, executa uma função após cada renderização
    getMensagensDataBase()//Pegue a tabela mensagens do meu supabase
    .select('*')//Selecione todos os valores
    .order('id', { ascending: false })//Ordene as mensagens do menor id para o maior
    .then(({ data }) => { //Então, pegue o atributo data destes valores, que é um array com os dados da tabela
      setMessageList(data) //Inclua este array na lista de mensagens
      setLoading(false) //Quando retornar os dados, defina loading como false
    })

    //newMessage é a respostaLive.new
    listenMessagesOnRealTime((newMessage) => {//Executa a função para verificar se algo está sendo inserido no banco
      setMessageList((currentList) => { //Quando algo for inserido, pegue a lista atual que está na messageList
        return [ //Adicione na lista de mensagens, o novo valor inserido no banco, junto com a lista atual
          newMessage,
          ...currentList
        ]
      })
    });
  }, []) //O array vazio como segundo parâmetro define que este useEffect será executado apenas na primeira renderização

  function handleNewMessage(newMessage) {//Função chamada a cada vez que o usuário pressiona Enter
    const message = {
      from: userLogged,
      text: newMessage,
    }

    getMensagensDataBase()
    .insert([ //Insira no banco um array contendo o usuário e a mensagem enviada pelo usuário
      message
    ])
    .then((response) => {//Então, pegue esse array...
      console.log(response)
    })
    setMessage('') //Limpa o campo do input
  }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[300],
                backgroundImage: `url(../images/background-chat.jpg)`,
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
                    borderRadius: '8px',
                    backgroundColor: appConfig.theme.colors.neutrals[400],
                    backgroundImage: 'url(../images/background-stars.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
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
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals['000'],
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        backgroundImage: 'url(../images/background-stars.jpg)',
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Criação de props, pois o componente MessageList não tem acesso ao escopo da variável messageList */}
                    <MessageList messages={messageList} />
                    <Loading carregando={loading} tag="div"/>
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
                            onChange={(event) => {//Sempre que o valor do input mudar...
                              const messageText = event.target.value //Armazena em uma variável o valor do input
                              setMessage(messageText) //message recebe o valor do input
                            }}
                            onKeyPress={(event) => {
                              if (event.key === 'Enter'){ //Quando o usuário pressionar a tecla Enter
                                if (message.length == 0){//Se o input não possuir nenhum caractere
                                  event.preventDefault()//Previna o comportamento padrão de pular linha
                                  return //Não execute o restante do código
                                }
                                event.preventDefault()
                                handleNewMessage(message) //Adicione a mensagem na lista de mensagens
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
                        <ButtonSendSticker onStickerClick= {(sticker) => { //Recebe o sticker clicado como parâmetro
                          handleNewMessage(`:sticker: ${sticker}`)//Adiciona o sticker na lista de mensagens, com o prefixo :sticker:
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
                          backgroundColor: appConfig.theme.colors.neutrals[900],
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
                {message.text.startsWith(':sticker:') //Se a mensagem começar com :sticker:
                ? ( //Rederize um componente de imagem...
                    <Image
                    styleSheet={{
                      maxWidth: '200px',
                    }} 
                    src={message.text.replace(":sticker:", "")} //Adicione como src da image a url do sticker
                    />
                  )
                : (//Se não tiver o :sticker: no começo da mensagem...
                  message.text //Mostre a mensagem
                  )}
                </Text>
              )
            })}
        </Box>
    )
}

function Loading(props) {//Componente de Loading do chat
  const Tag = props.tag;
  return (
    props.carregando && (
      <>
        <Tag></Tag>
        <style jsx>{`
          div {
            background-image: url('../images/spinner-loading.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            margin: 64px auto;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;   
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }  

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </>
    )
  )
}