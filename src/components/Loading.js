export function Loading(props) {//Componente de Loading do chat
  const Tag = props.tag;
  return (
    props.carregando && ( //Enquanto carregando for true...
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