import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { Header } from '../src/components/Header';
import { MessageList } from '../src/components/MessageList';
import { ButtonSendMessage } from '../src/components/ButtonSendMessage';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import { Loading } from '../src/components/Loading';

const SUPABASE_URL = "https://zhjadqkmnfkoqwyyculo.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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
                        padding: '14px',
                    }}
                >
                    {/* Criação de props, pois o componente MessageList não tem acesso ao escopo da variável messageList */}
                    <MessageList messages={messageList} user={userLogged} />
                    <Loading carregando={loading} tag="div"/>
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
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
                                minWidth: '100px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                color: appConfig.theme.colors.neutrals[200],
                                focus: {
                                  border: `1px solid ${appConfig.theme.colors.primary['500']}`
                                }                                
                            }}
                        />
                        <ButtonSendMessage onSendMessage= {() => {
                          if (message.length == 0){//Se o input não possuir nenhum caractere
                            return //Não execute o restante do código
                          }
                          handleNewMessage(message)
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