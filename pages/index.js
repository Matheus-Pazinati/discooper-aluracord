import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react'
import { useRouter } from 'next/router'
import { Title } from '../src/components/Title'

export default function PaginaInicial() {
  //Rook para atualizar os dados
  const [username, setUsername] = React.useState('Matheus-Pazinati');
  //username recebe o nome do usuário
  //setUserName é a função para alterar o valor de username, em qualquer lugar que username é chamado
  const validInput = username.length > 2 //Retorna true se o numero de caracteres do input for maior que 2
  const router = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          backgroundImage: 'url(../images/background-login.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}       
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '48px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[400],
            backgroundImage: 'url(../images/background-stars.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {//Ao submeter o formulário...
              event.preventDefault()//Previna o comportamento padrão de enviar os dados
              router.push(`/chat?username=${username}`)//Adicione a página do chat na pilha de rotas e passando o nome do usuário
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h1">Bem-vindo ao Discooper</Title>
            <Text variant="body2" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username} //Valor inicial do input é a variavel username
              onChange={function (event) {//Quando o input for alterado...
                const newValue = event.target.value;//Guarda o valor que o usuário está digitando em uma variável
                setUsername(newValue)//Altera o valor de username para a variavel acima, toda vez que o input muda
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals['transparent'],
              border: '2px solid',
              borderColor: appConfig.theme.colors.neutrals['000'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={validInput ?`https://github.com/${username}.png`: ""}
              //Se o input ter mais que 2 caracteres, mostra a foto, se não, não mostra nada.
              //Como username sempre é atualizado quando o input muda, essa verificação sempre é feita
            />
            <Text
              variant="body4"
              tag= {validInput ? "a" : "span"}//Se o campo tiver mais que 2 caracteres é um link, se não um span
              target="_blank"
              href={`https://github.com/${username}`}
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              {username} 
              {/* Recebe um novo username, cada vez que o input muda */}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}