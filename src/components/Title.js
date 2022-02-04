import appConfig from '../../config.json';

export function Title(props) {
  //Componente titulo principal
  const {children} = props; //Bem vindo ao Discooper
  const Tag = props.tag || 'h1'; //Caso receba algum valor na prop tag, receba ela, se não, é um h1
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
      `}
      </style>
    </>
  )
}