import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json'

export function MessageList(props) {

  function handleDeleteMessage(id) {
    props.onDelete(id)
  }

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
              position: 'relative',
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
              <Box>
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
              {props.user === message.from && (
                <Button styleSheet={{
                  fontSize: '8px',
                  color: appConfig.theme.colors.neutrals[200],
                  padding: '0.5rem',
                  backgroundColor: 'red',
                  position: 'absolute',
                  right: '6px',
                  top: '25%'
                }}
                  onClick={() => {
                    handleDeleteMessage(message.id)
                  }}
                  label={"Excluir"}
                >
                </Button>
              )}


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